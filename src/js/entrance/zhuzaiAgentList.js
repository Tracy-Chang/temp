/**
 * 需求主题
 * author  作者
 */
require([
	'../modules/util',
	'../modules/Alert',
	'../libs/AceTemplate',
	'../mock-data/zhuzaiAgentList'
	], function (util, Alert) {

	//接口地址
	var listUrl = location.origin + '/zhuzai/agent/queryOrder',
		manageOrder = location.origin + '/zhuzai/agent/manageOrder',
		code = '',
		type = '';

	// var listUrl = location.origin + '/agent/queryOrder',
	// 	manageOrder = location.origin + '/agent/manageOrder',
	// 	code = '',
	// 	type = '';

	function ajax(url, data, callback) {
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			success: callback
		});
	}

	/**
	 * 获取list数据并填充
	 */
	function getListData() {
		ajax(listUrl, {}, setList);
	}

	/**
	 * 设置list的DOM机构
	 * @param {[type]} data [list接口返回数据]
	 */
	function setList(data) {
		data = JSON.parse(data);
		$('.list').append(AceTemplate.format('listTemp', data));	
	}

	getListData();



	//订单已送达逻辑
	$('.list').on('click', function(e) {
		if (e.target.nodeName.toLowerCase() == 'button') {
			var code = $(e.target).attr('orderCode');
			//接单逻辑
			if ($(e.target).attr('status') == 'notGet') {
				ajax(manageOrder, {code: code, type: '1'}, function(data) {
					data = JSON.parse(data);
					if (data.resultcode == '0') {
						$(e.target).addClass('get');
						$(e.target).attr('status', 'get');
						$(e.target).next().removeClass('arrive');
						$(e.target).next().attr('status', 'notArrive');
						$(e.target).html('已到货');
					} else {
						Alert(data.resultmsg)
					}
				});
			}
			//送达逻辑
			if ($(e.target).attr('status') == 'notArrive') {
				ajax(manageOrder, {code: code, type: '2'}, function(data) {
					data = JSON.parse(data);
					if (data.resultcode == '0') {
						$(e.target).addClass('arrive');
						$(e.target).attr('status', 'arrive');
						$(e.target).html('已送达');
					} else {
						Alert(data.resultmsg)
					}
				});
			}

			e.preventDefault();
			e.stopPropagation();
		}
	})
});


















