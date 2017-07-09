/**
 * 需求主题
 * author  作者
 */
require([
	'../modules/util',
	'../modules/Alert',
	'../libs/AceTemplate'/*,
	'../mock-data/shopping-cart'*/
	], function (util, Alert) {

	//接口URL
	var shoppingCart = location.origin + '/shopping/query',
		address = location.origin + '/address/query',
		orderUrl = location.origin + '/order/add';//下订单url
	var uid = util.getCookie('uId') || '';

	var commodityObj = {}; //下单商品的数量键值对-用于订单提交

	var commodityPrice = {}; //商品的价格键值对-记录商品的价格

	var commodityNumber = {}; //input中已经存在的数量-用于全选的价格计算


	var freightPrice = 0,//运费
		serverTime = util.getCookie('serviceDetail') ? decodeURIComponent(util.getCookie('serviceDetail')) : '配送时间每日早10点到晚8点';
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


	//服务时间
	$('.server-time').html(serverTime);

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

	$('.address-detail>input').on('input', function(e) {
		if($(e.target).attr('name') == 'name') {
			nameData = this.value;
		}
		if($(e.target).attr('name') == 'phone') {
			phoneData = this.value;
		}
		if($(e.target).attr('name') == 'address') {
			addressData = this.value;
		}
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
				} else if (this.value >= $(this).attr('count')) {
					//填入的值不能大于商品数量
					this.value = $(this).attr('count');
				}
			});
			$('.arrive').html(data.result.time + '分钟内送达');
			freightPrice = parseFloat(data.result.carriagePrice);
			//默认全选
			selectAll();
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
		var allPricePlus = 0;//商品的总价+运费
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
			//判断商品的数量是否充足
			if (number >= $(e.target).attr('count')) {
				Alert('商品数量不足');
				return
			}
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
				Alert('请输入正整数');
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
			allPricePlus = Math.round((allPrice + freightPrice)*100)/100;
		}
		//
		$('.allPrice')[0].innerHTML = '￥' + allPrice + '元';
		$('.allPrice')[1].innerHTML = '￥' + allPricePlus + '元';
	});

	//全部勾选操作
	$('.all-select').on('click', function(e) {
		var allPrice = 0;
		var allPricePlus = 0;//商品的总价+运费
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
				allPricePlus = Math.round((allPrice + freightPrice)*100)/100;
			}
			//
			$('.allPrice')[0].innerHTML = '￥' + allPrice + '元';
			$('.allPrice')[1].innerHTML = '￥' + allPricePlus + '元';
		}
	});

	//默认全选
	function selectAll() {
		var allPrice = 0;
		var allPricePlus = 0;//商品的总价+运费
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
			allPricePlus = Math.round((allPrice + freightPrice)*100)/100;
		}
		//
		$('.allPrice')[0].innerHTML = '￥' + allPrice + '元';
		$('.allPrice')[1].innerHTML = '￥' + allPricePlus + '元';
	}

	//购物车数据请求以及DOM结构填充
	ajax(shoppingCart, {uid: uid}, setTemplateDom('commodityTemplate', 'commodity', loseBlur(1)));


	//提交订单逻辑
	function buyCommodity() {
		//备注信息
		var remark = $('#remark').val() || '';
		if (nameData.length <= 0 || nameData.length >= 16) {
			Alert('请填写正确的收货人姓名');
			return
		}
		if (!phoneData || !/^1[1-9]\d{9}$/.test(phoneData)) {
			Alert('请填写正确的收货人电话号码');
			return
		}
		if (addressData.length <= 0 || addressData.length >= 64) {
			Alert('请填写正确的收货人准确地址');
			return
		}
		if (JSON.stringify(commodityObj) == '{}') {
			Alert('请选择购买商品');
			return
		}
		if (remark.length >= 60) {
			Alert('备注信息不能超过60个字');
			return
		}
		var data = {};
		data.uid = uid;
		data.name = nameData;
		data.phone = phoneData;
		data.address = addressData;
		data.remark = remark;
		data.list = JSON.stringify(commodityObj);
		ajax(orderUrl, data, function(data) {
			data = JSON.parse(data);
			if (data.resultcode == '1') {
				location.href = './pay.html?formId=' + data.result.formId;
			} else if (data.resultcode == '0') {
				Alert(data.resultmsg);
			}
		});
	}

	$('#buy_commodity').on('click', buyCommodity);
});