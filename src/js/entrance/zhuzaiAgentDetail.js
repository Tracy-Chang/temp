/**
 * 需求主题
 * author  作者
 */
require([
	'../modules/util',
	'../libs/AceTemplate',
	'../mock-data/agentDetail'
	], function (util) {

	//接口地址
	var formDetail = location.origin + '/zhuzai/agent/queryOrderDetail';
	//var formDetail = location.origin + '/agent/queryOrderDetail';

	var code = util.getNameInStr(location.href, 'orderCode');

	function ajax(url, data, callback) {
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			success: callback,
		});
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
	ajax(formDetail, {code: code}, setTemplateDom('formTemplate', 'form-detail'));
});