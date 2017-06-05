/**
 * 需求主题
 * author  作者
 */
require([
	'../libs/AceTemplate'/*,
	'../mock-data/shopping-cart'*/
	], function () {

	//接口URL
	var shoppingCart = 'http://localhost:8080/shopping/query',
		address = 'http://localhost:8080/address/query',
		orderUrl = 'orderUrl';//下订单url
	var uid = '111';

	var commodityObj = {}; //下单商品的数量键值对-用于订单提交

	var commodityPrice = {}; //商品的价格键值对-记录商品的价格

	var commodityNumber = {}; //input中已经存在的数量-用于全选的价格计算

	var addressData = '',  //详细地址-用于数据提交
		nameData = '',
		phoneData = ''; 

	function ajax(url, data, callback) {
		$.ajax({
			type: 'get',
			url: url,
			data: data,
			success: callback,
			error: function () {

			}
		});
	}

	//地址逻辑
	
	if (sessionStorage.getItem('defaultAddress')) {
		$('.address>span').html(sessionStorage.getItem('defaultAddress'));
	}
	
	function setAddress(data) {
		data = JSON.parse(data);
		if (!!data.resultcode && !!data.result) {
			var name = data.result[0].name;
			var phone = data.result[0].phone;
			var address = data.result[0].address;
			nameData = name;
			phoneData = phone;
			addressData = address;
			$('.address-detail>input')[0].value = name || '';
			$('.address-detail>input')[1].value = phone || '';
			$('.address-detail>input')[2].value = address || '';
		}
	}

	ajax(address, {uid: uid}, setAddress);

	$('.address-detail>input').on('input', function() {
		addressData = this.value;
		nameData = this.value;
		phoneData = this.value;
	});

	//购物车逻辑

	/**
	 * Template Dom 生成函数
	 * @param {[type]} id        [template id]
	 * @param {[type]} className [加入的DOM class]
	 */
	function setTemplateDom(id, className, callback) {
		return function(data) {
			data = JSON.parse(data);
			var list = data.result.list;
			if (list) {
				for(var i = 0; i < list.length; i++) {
					commodityPrice[list[i].code] = parseFloat(list[i].price);
				}
			}
			$('.' + className).append(AceTemplate.format(id, data));
			if (callback) {
				callback(data);
			}
		}
	}

	//input失去焦点的处理手段
	function loseBlur(value) {
		return function(data) {
			$('.commodity-number').on('blur', function() {
				if (this.value == '') {
					this.value = value;
				}
			});
			$('.arrive').html(data.result.time + '小时后送达');
			$('.carriagePrice').html('￥' + data.result.carriagePrice + '元');
		}
	}

	//选择商品并收集选择的商品以及数量，之后可以直接下订单
	$('.commodity').on('click input', function(e) {
		//点到li的地方，不做操作
		if (e.target.nodeName.toLowerCase() == 'li') {
			return;
		}
		var allPrice = 0;//商品的总价
		var inputBabel = $(e.target).parents('li').find('input')[0];
		var code = $(inputBabel).attr('name'), 
			number = parseInt(inputBabel.value) || 1;//如果input输入没有，默认值为1
		//勾选逻辑
		if (e.target.nodeName.toLowerCase() == 'i' && e.target.className.indexOf('active') >= 0) {
			$(e.target).removeClass('active');
			$('.all-select').find('i').removeClass('active');
			delete commodityObj[code];
		} else if (e.target.nodeName.toLowerCase() == 'i') {
			$(e.target).addClass('active');
			commodityObj[code] = number;
		}
		//数量加减逻辑
		if ($(e.target).attr('do') == 'reduce' && number > 1) {
			//减的数量最小值为1
			number -= 1; 
			inputBabel.value = number;
			commodityNumber[code] = number;
			//只有勾选的时候，才会把code放入下单对象中
			if (commodityObj[code]) {
				commodityObj[code] = number;
			}
		}
		if ($(e.target).attr('do') == 'add') {
			number += 1; 
			inputBabel.value = number;
			commodityNumber[code] = number;
			//只有勾选的时候，才会把code放入下单对象中
			if (commodityObj[code]) {
				commodityObj[code] = number;
			}
		}
		//input填写事件控制
		//触发input标签并且勾选
		if (e.target.nodeName.toLowerCase() == 'input') {
			//非空值且非正整数，进入判断
			if (inputBabel.value !== '' && !/^[1-9]\d*$/.test(inputBabel.value)) {
				alert('请输入正整数');
				number = Math.abs(number);
				inputBabel.value = number;
			}
			commodityNumber[code] = number;
			//勾选的时候才收集数据
			if (commodityObj[code]) {
				commodityObj[code] = number;
			}
		}

		//计算总价逻辑
		for (var key in commodityObj) {
			allPrice += parseFloat(commodityPrice[key]) * parseFloat(commodityObj[key]);
			allPrice = Math.round(allPrice * 100)/100;
		}
		//
		$('.allPrice').html('￥' + allPrice + '元');
	});

	//全部勾选操作
	$('.all-select').on('click', function(e) {
		var allPrice = 0;
		//勾选逻辑
		if (e.target.className.indexOf('active') >= 0){
			$('.select').removeClass('active');
			$('.allPrice').html('￥0元');
			commodityObj = {};
		} else {
			$('.select').addClass('active');
			//计算总价逻辑
			for (var key in commodityPrice) {
				if (commodityNumber[key]) {
					allPrice += parseFloat(commodityPrice[key]) * parseFloat(commodityNumber[key]);
					commodityObj[key] = commodityNumber[key];
				} else {
					allPrice += parseFloat(commodityPrice[key]);
					commodityObj[key] = 1;
				}
				allPrice = Math.round(allPrice * 100)/100;
			}
			//
			$('.allPrice').html('￥' + allPrice + '元');
		}
	});

	//购物车数据请求以及DOM结构填充
	ajax(shoppingCart, {uid: uid}, setTemplateDom('commodityTemplate', 'commodity', loseBlur(1)));


	//提交订单逻辑
	function buyCommodity() {
		if (!nameData && name.length <= 16) {
			alert('请填写正确的收货人姓名');
			return
		}
		if (!phoneData && /^1[1-9]\d{9}$/.test(phoneData)) {
			alert('请填写正确的收货人电话号码');
			return
		}
		if (!addressData && addressData <= 64) {
			alert('请填写正确的收货人准确地址');
			return
		}
		if (JSON.stringify(commodityObj) == '{}') {
			alert('请选择购买商品');
			return
		}
		var data = commodityObj;
		data.uid = uid;
		data.name = nameData;
		data.phone = phoneData;
		data.address = addressData;
		ajax('orderUrl', data, function(data) {
			data = JSON.parse(data);
			if (data.resultcode == '1') {
				location.href = './pay.html';
			}
		});
	}

	$('#buy_commodity').on('click', buyCommodity);
});