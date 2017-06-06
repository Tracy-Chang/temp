/**
 * 需求主题
 * author  作者
 */
require([
	'../libs/AceTemplate',
	'../mock-data/main'
	], function () {

	//接口地址
	var navUrl = '//www.earthcenter.com.cn:8081/lstype/query',
		listUrl = '//www.earthcenter.com.cn:8081/ls/query',
		addressUrl = '//www.earthcenter.com.cn:8081/community/query',
		shoppingCart = '//localhost:8080/shopping/add';

	var uid = '111';
	var defaultAddress = '新龙城';

	//url
	var loadingImg = 'http://localhost/static/images/loading.gif';

	//各个接口的唯一标识
	var addressCode = localStorage.getItem('addressCode') || '',  //地址code
		classfiyCode = 'qb',  //分类code
		listPage = 1,  //请求页数
		commodityCode = false || ''; //商品code

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

	/**
	 * 获取list数据并填充
	 */
	function getListData() {
		$('.list').append('<li class="loading"><img src="' + loadingImg + '"></li>');
		ajax(listUrl, {code: addressCode, classfiy: classfiyCode, page: listPage}, setList);
	}
	/**
	 * 获取nav数据并填充
	 * @return {[type]} [description]
	 */
	function getNavData() {
		ajax(navUrl, {code: addressCode}, setNav);
	}

	/**
	 * 设置nav的DOM结构
	 * @param {[type]} data [nav接口返回数据]
	 */
	function setNav(data) {
		data = JSON.parse(data);
		$('.nav')[0].innerHTML = AceTemplate.format('navTemp', data);
		//nav绑定点击事件
		$('.nav').on('click', function(e) {
			listPage = 1;
			$('.nav').children().removeClass('active');
			$(e.target).addClass('active');
			classfiyCode = $(e.target).attr('code');
			$('.list').html('');
			getListData();
		})
	}

	/**
	 * 设置list的DOM机构
	 * @param {[type]} data [list接口返回数据]
	 */
	function setList(data) {
		//del loading
		$('.list').children().last().remove();
		data = JSON.parse(data);
		if (data.result.lastPage) {
			$(document).off('scroll');
			$('.list').append('<li><p class="no-data">没有更多数据了</p></li>');
		} else {
			$('.list').append(AceTemplate.format('listTemp', data));	
		}
	}

	/**
	 * 设置address的DOM机构
	 * @param {[type]} data [address接口返回数据]
	 */
	function setAddress(data) {
		data = JSON.parse(data).result;
		var html = '';
		for (var i = 0; i < data.length; i++) {
			html += '<span code="' + data[i].code + '">' + data[i].name + '</span>';
		} 
		$('.select-address')[0].innerHTML += html;
	}

	//请求小区地址并生成DOM结构
	ajax(addressUrl, {}, setAddress);

	//判断是否有默认地址-有的话，隐藏地址，请求nav和list
	if (defaultAddress) {
		$('.address').html(defaultAddress);
		$('.select-address').hide();
		sessionStorage.setItem('defaultAddress', defaultAddress);
		getNavData();
		getListData();
	}

	//更改地址
	$('.address').on('click', function() {
		$('.select-address').show();
	})

	//选择小区地址处理事件
	$('.select-address').on('click', function(e) {
		if(e.target.nodeName.toLowerCase() == 'span') {
			$('.select-address').hide();
			$('.address').html(e.target.innerHTML);
			sessionStorage.setItem('defaultAddress', e.target.innerHTML);
			addressCode = $(e.target).attr('code');
			localStorage.setItem('addressCode', addressCode);
			getNavData();
			getListData();
		}
	})


	//分页加载
	var timer;
	$(document).on('scroll', function() {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(function() {
			if(document.body.scrollHeight - document.body.scrollTop - document.documentElement.clientHeight < 100) {
				listPage++;
				getListData()
			}
		}, 50);
	})


	//添加购物车功能
	var shoppingCartNumber = 0;
	function addShoppingCartPrice(price) {
		shoppingCartNumber += parseFloat(price);
		$('.shopping-number').html('￥' + Math.round(shoppingCartNumber*100)/100);
		$('.shopping-number').show();
	}
	//购物车点击功能
	$('.list').on('click', function(e) {
		if ($(e.target).attr('class') == 'buy-car') {
			var code = $(e.target).attr('code');
			ajax(shoppingCart, {uid: uid, code: code, cCode: addressCode}, function(data) {
				data = JSON.parse(data);
				if (data.resultcode == 1) {
					addShoppingCartPrice($(e.target).attr('price'));
				}
			});
		}
	})
});