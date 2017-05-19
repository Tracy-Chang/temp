/**
 * 需求主题
 * author  作者
 */
require(['../modules/alert'], function (Alert) {

	function buyCommodity() {
		if (!'address') {
			alert('请选择准确地址');
			return
		}
		if (!'commodity') {
			alert('请选择购买商品');
			return
		}
		alert('支付')
	}

	$('#buy_commodity').on('click', buyCommodity);
});