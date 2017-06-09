/**
 * 需求主题
 * author  tracy
 */
require([
	'../modules/util',
	'../libs/AceTemplate'/*,
	'../mock-data/pay'*/
	], function (util) {

	var formPort = 'http://localhost:8080/order/query',
		uid = util.getCookie('uId') || '';
		formId = util.getNameInStr(location.search, 'formId'),
		arriveTime = 2,
		totalPrice = 0;

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
	 * Template Dom 生成函数
	 * @param {[type]} id        [template id]
	 * @param {[type]} className [加入的DOM class]
	 */
	function setTemplateDom(id, className) {
		return function(data) {
			data = JSON.parse(data);
			arriveTime = data.result.time;
			totalPrice = data.result.totalPrice;
			$('.' + className).append(AceTemplate.format(id, data));
			$('.arrive').html(arriveTime + '小时后送达');
			$('.total-price').html('￥' + totalPrice + '元');
		}
	}

	ajax(formPort, {uid: uid, formId: formId}, setTemplateDom('commodityTemplate', 'commodity-info'));

	//支付
	$('#pay').on('click', function() {
		alert('支付');
	})
});