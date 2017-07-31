/**
 * 需求主题
 * author  tracy
 */
require([
	'../modules/util',
	'../modules/Alert',
	'../modules/jweixin-1.1.0',
	'../libs/AceTemplate',
	// '../mock-data/my'
	], function (util, Alert) {

	//ajax接口
	var formDetail = location.origin + '/order/queryU',
		addressDetail = location.origin + '/address/query',
		delFormPort = location.origin + '/order/delete',
		delAddressPort = location.origin + '/address/delete',
		payPort = location.origin + '/earth/pay',
		uid = util.getCookie('uId') || '';

	/*function countDown(formTime, nowTime, cutTime, className) {

		var element = $('.' + className),
			remainTime = Math.round((formTime + cutTime * 1000 * 60 - nowTime)/1000), //剩余总秒数
			remainMinutes, //剩余分钟输
			remainSeconds; //剩余秒数


		var timer;
		function timeNode() {
			if (remainTime == 0) {
				clearInterval(timer);
				element.html('已到期');
				return;
			}

			remainTime--;

			remainMinutes = Math.round(remainTime / 60); //剩余分钟输
			remainSeconds = Math.round(remainTime % 60); //剩余秒数

			if (remainMinutes < 10) {
				remainMinutes = '0' + remainMinutes;
			}
			if (remainSeconds < 10) {
				remainSeconds = '0' + remainSeconds;
			}

			element.html('剩余时间：<span>'+ remainMinutes +'</span>:<span>' + remainSeconds + '</span>');
		}
		timeNode();
		timer = setInterval(timeNode, 1000);

	}*/

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


	//var countDownObjData = [];
	/**
	 * Template Dom 生成函数
	 * @param {[type]} id        [template id]
	 * @param {[type]} className [加入的DOM class]
	 */
	function setTemplateDom(id, className) {
		return function(data) {
			data = JSON.parse(data);
			//countDownObjData = data.countDownObjData;
			if (data.result.length > 0) {
				$('.' + className).append(AceTemplate.format(id, data));
				//countDown(1497770850934, 149777234567, 40, 'time');
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


	//删除支付订单逻辑
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
			//支付
			ajax(payPort, {uid: uid, formId: formId}, function(data) {
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
		}
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