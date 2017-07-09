/**
 * 需求主题
 * author  作者
 */
require([
	'../modules/util',
	'../modules/Alert',
	'../libs/AceTemplate'/*,
	'../mock-data/agentList'*/
	], function (util, Alert) {

	//接口地址
	var listUrl = location.origin + '/agent/orderQuery',
		arriveUrl = location.origin + '/agent/toOrder',
		uid =  util.getCookie('uId') || '',
		loadingImg = 'http://www.earthcenter.com.cn/images/loading.gif',
		listPage = 1,
		classfiyCode = '',
		addressCode = '',
		timer; //scroll节流

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
	 * 设置list的DOM机构
	 * @param {[type]} data [list接口返回数据]
	 */
	function setList(data) {
		//del loading
		$('.list').children().last().remove();
		data = JSON.parse(data);
		$('.list').append(AceTemplate.format('listTemp', data));	
		if (data.result.lastPage || data.resultcode == 0 || data.result.list.length == 0) {
			$(document).off('scroll');
			$('.list').append('<li><p class="no-data">没有更多数据了</p></li>');
		}
	}

	getListData();

	//分页加载
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


	//订单已送达逻辑
	$('.list').on('click', function(e) {
		if (e.target.nodeName.toLowerCase() == 'button') {
			var formId = $(e.target).attr('formId');
			ajax(arriveUrl, {uid: uid, formId: formId}, function(data) {
				data = JSON.parse(data);
				if (data.resultcode == '1') {
					$(e.target).addClass('notArrive');
				} else if (data.resultcode == '0') {
					Alert(data.resultmsg)
				}
			});
			e.preventDefault();
		}
	})
});