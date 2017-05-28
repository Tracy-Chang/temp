/**
 * 需求主题
 * author  作者
 */
require([
	'../libs/AceTemplate'/*,
	'../mock-data/main'*/
	], function () {

	//接口地址
	var navUrl = '//www.earthcenter.com.cn:8081/lstype/query',
		listUrl = '//www.earthcenter.com.cn:8081/ls/query',
		addressUrl = '//www.earthcenter.com.cn:8081/community/query';

	//url
	var loadingImg = 'http://localhost/static/images/loading.gif';

	//各个接口的唯一标识
	var addressCode = false || '',  //地址code
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
			$('.nav').children().removeClass('active');
			$(e.target).addClass('active');
			classfiyCode = $(e.target).attr('code');
			getListData();
		})
	}

	/**
	 * 设置list的DOM机构
	 * @param {[type]} data [list接口返回数据]
	 */
	function setList(data) {
		$('.list').children().last().remove();
		data = JSON.parse(data);
		$('.list').append(AceTemplate.format('listTemp', data));
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
	var defaultAddress = '';
	if (defaultAddress) {
		$('.address').html(defaultAddress);
		$('.select-address').hide();
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
			addressCode = $(e.target).attr('code');
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
				console.log('done');
			}
		}, 50);
	})


	//添加购物车功能
	var shoppingCartNumber = 0;
	function addShoppingCartPrice(price) {
		shoppingCartNumber += parseInt(price);
		$('.shopping-number').html('￥' + shoppingCartNumber);
		$('.shopping-number').show();
	}
	$('.list').on('click', function(e) {
		/*if ($(e.target).attr('class') == 'buy-car') {
			$(e.target).hide();
			$(e.target).next().show();
			addOrReduceShoppingCartNumber('add');
		}

		if ($(e.target).attr('changeNum') == 'reduce') {
			//减掉数量
			var next = parseInt(e.target.nextSibling.innerHTML)
			if (next - 1 == 0) {
				//数量少于一个的情况
				addOrReduceShoppingCartNumber('reduce');
				$(e.target).parent().hide();
				$(e.target).parent().prev().show();
			} else {
				//大于一个，减一
				e.target.nextSibling.innerHTML = next - 1;
				addOrReduceShoppingCartNumber('reduce');
			}
		} else if ($(e.target).attr('changeNum') == 'add') {
			//增加数量
			e.target.previousSibling.innerHTML = parseInt(e.target.previousSibling.innerHTML) + 1;
			addOrReduceShoppingCartNumber('add');
		}*/
		if($(e.target).attr('class') == 'buy-car') {
			addShoppingCartPrice($(e.target).attr('price'));
		}
	})
});