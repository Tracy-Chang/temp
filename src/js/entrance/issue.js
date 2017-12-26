/**
 * 需求主题
 * author  作者
 */
require([
	'../modules/Alert'
	], function (Alert) {

	var question = location.origin + '/zhuzai/help/feedback';
	//var question = location.origin + '/help/feedback';
	var loading = false;

	function ajax(url, data, callback) {
		$.ajax({
			type: 'post',
			url: url,
			data: data,
			success: callback,
			error: function () {

			}
		});
	}

	$('.submit').on('click', function() {
		if (loading) {
			Alert('正在提交，请稍后');
			return
		}
		var phone = $('#phone').val(),
			issue = $('#other').val();
		
		var obj = {
			phone: phone,
			issue: issue
		}
		loading = true;
		ajax(question, obj, function(data) {
			loading = false;
			data = JSON.parse(data);
			Alert(data.resultmsg);
		})
	});
});