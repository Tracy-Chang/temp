/**
 * 需求主题
 * author  tracy
 */
require([
	'../modules/jweixin-1.1.0',
	'../modules/util',
	'../modules/Alert',
	'../libs/AceTemplate'/*,
	'../mock-data/pay'*/
	], function (wx, util, Alert) {

	var formPort = location.origin + '/earth/query',
		payPort = location.origin + '/earth/pay',
		uid = util.getCookie('uId') || '';
		formId = util.getNameInStr(location.search, 'formId'),
		arriveTime = 40,
		totalPrice = 0;

	function ajax(type, url, data, callback) {
		$.ajax({
			type: type,
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
			$('.arrive').html(arriveTime + '分钟内送达');
			$('.total-price').html('￥' + totalPrice + '元');
		}
	}


	ajax('get', formPort, {uid: uid, formId: formId}, setTemplateDom('commodityTemplate', 'commodity-info'));

	//支付
	$('#pay').on('click', function() {
		ajax('get', payPort, {uid: uid, formId: formId}, function(data) {
			data = JSON.parse(data);
			if (data.resultcode == '1') {
				var wxObj = data.result;
				if (typeof WeixinJSBridge == "undefined"){
				    if( document.addEventListener ){
				        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				    }else if (document.attachEvent){
				        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
				        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				    }
				}else{
				    onBridgeReady(wxObj);
				}
			} else {
				Alert(data.resultmsg);
			}
		});
	});

	function onBridgeReady(wxObj){
	   	WeixinJSBridge.invoke(
	        'getBrandWCPayRequest', wxObj,
	       	function(res){     
				if(res.err_msg == "get_brand_wcpay_request:ok" ) {
					location.href = './my.html';
				} else if(res.err_msg == "get_brand_wcpay_request:cancel" ) {
					
				} else if(res.err_msg == "get_brand_wcpay_request:fail" ) {
					Alert('支付失败');
				}   

				// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
	       	}
	   	); 
	}
});