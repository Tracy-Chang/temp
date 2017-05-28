/**
 * 需求主题
 * author  tracy
 */
require([
	'../libs/AceTemplate',
	'../mock-data/my'
	], function () {

	//ajax接口
	var formDetail = 'form',
		addressDetail = 'address',
		delForm = 'delForm',
		delAddress = 'delAdd';

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
	var userImg = '../static/images/commodity.jpg' || '',
		userName = '翠西';

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
			$('.' + className).append(AceTemplate.format(id, data));
		}
	}


	//我的订单逻辑	
	//订单DOM生成
	ajax(formDetail, {}, setTemplateDom('formTemplate', 'form-detail'));
	//订单切换
	$('.form,#form_hidden').on('click', showOrHideMyList('form-detail'));


	//我的地址逻辑
	//地址DOM生成
	ajax(addressDetail, {}, setTemplateDom('addressTemplate', 'address-detail'));
	//我的地址切换
	$('.address,#address_hidden').on('click', showOrHideMyList('address-detail'));
});