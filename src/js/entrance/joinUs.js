/**
 * 需求主题
 * author  作者
 */
require([
	'../modules/Alert'
	], function (Alert) {

	var question = location.origin + '/zhuzai/help/joinin';
	//var question = location.origin + '/help/joinin';
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
		var marketName = $('#marketName').val(),
			name = $('#name').val(),
			phone = $('#phone').val(),
			address = $('#address').val();
		
		var obj = {
			companyName: marketName,
			address: address,
			phone: phone,
			name: name
		}
		loading = true;
		ajax(question, obj, function(data) {
			loading = false;
			data = JSON.parse(data);
			Alert(data.resultmsg)
		})
	});
});