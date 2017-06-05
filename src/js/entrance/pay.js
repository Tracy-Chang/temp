/**
 * 需求主题
 * author  tracy
 */
require([
	'../libs/AceTemplate'/*,
	'../mock-data/pay'*/
	], function () {

	var formPort = 'formPort',
		uid = '111',
		formId = 'xxx',
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