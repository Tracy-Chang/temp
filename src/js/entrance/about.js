/**
 * 需求主题
 * author  tracy
 */
require([
	'../modules/util',
	'../libs/AceTemplate'/*,
	'../mock-data/my'*/
	], function (util) {

	//ajax接口
	var formDetail = location.origin + '/order/queryU',
		addressDetail = location.origin + '/address/query',
		delFormPort = 'delForm',
		delAddressPort = location.origin + '/address/delete';

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

	//用户状态逻辑
	var userImg = util.getCookie('headimgurl') || '../static/images/default.jpg' || '',
		userName = decodeURIComponent(util.getCookie('nickName')) || '',
		uid = util.getCookie('uId') || '';

	if (userImg) {
		var userHtml = '<img src="' + userImg + '"/>' + '<p>' + userName + '</p>';
		$('.user div').html(userHtml);
	} else {
		$('.user').html('请登录');
	}

	/**
	 * [切换DOM结构的展示或隐藏]
	 * @param  {[type]} className [切换的类名]
	 * @return {[type]}           [description]
	 */
	function showOrHideMyList(className) {
		return function() {
			if ($('.' + className).css('display') == 'block') {
				$('.' + className).hide();
			} else {
				$('.' + className).show();
			}
		}
	}


	/**
	 * Template Dom 生成函数
	 * @param {[type]} id        [template id]
	 * @param {[type]} className [加入的DOM class]
	 */
	function setTemplateDom(id, className) {
		return function(data) {
			data = JSON.parse(data);
			if (data.result.length > 0) {
				$('.' + className).append(AceTemplate.format(id, data));
			} else {
				$('.' + className).append('<div class="no-data">没有更多数据了~</div>');
			}
		}
	}


	//我的订单逻辑	
	//订单DOM生成
	ajax(formDetail, {}, setTemplateDom('formTemplate', 'form-detail'));
	//订单切换
	$('.form,#form_hidden').on('click', showOrHideMyList('form-detail'));

	//删除订单逻辑
	$('.form-detail').on('click', function(e) {
		var dom = $(e.target),
			formId = dom.attr('formId');
		if (dom.attr('do') == 'delete') {
			ajax(delFormPort, {uid: uid, formId: formId}, function(data) {
				data = JSON.parse(data);
				if (data.resultcode == 1) {
					dom.parents('dl').remove()
				}
			});
		} else if (dom.attr('do') == 'pay') {
			console.log('支付');
		}
	});


	//我的地址逻辑
	//地址DOM生成
	ajax(addressDetail, {}, setTemplateDom('addressTemplate', 'address-list'));
	//我的地址切换
	$('.address,#address_hidden').on('click', showOrHideMyList('address-detail'));

	/**
	 * 删除地址后的callback
	 * @param  {[type]} e [获取点击DOM结构]
	 * @return {[type]}      [description]
	 */
	function delAddress(e) {
		return function(data) {
			data = JSON.parse(data);
			if (data.resultcode == 1) {
				$(e.target).parents('li').remove();
			}
		}
	}

	//我的地址编辑或删除
	$('.address-list').on('click', function(e) {
		var code;
		if($(e.target).attr('action') == 'edit') {
			console.log('编辑');
		} else if($(e.target).attr('action') == 'delete') {
			code = $(e.target).attr('code');
			ajax(delAddressPort, {uid: uid, code: code}, delAddress(e));
		}
	});
});