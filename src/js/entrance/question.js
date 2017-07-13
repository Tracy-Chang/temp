/**
 * 需求主题
 * author  tracy
 */
require([
	'../modules/Alert',
	'../libs/AceTemplate'
	], function (Alert) {

	//ajax接口
	var question = location.origin + '/earth/help/feedback';

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

	$('.submit').on('click', function() {
		var phone = $('#phone').val(),
			commodity = encodeURIComponent($('#commodity').val()),
			score = $(".score").find("input[type=radio]:checked").val(),
			other = encodeURIComponent($('#other').val());
		
		var obj = {
			phone: phone,
			commodity: commodity,
			score: score,
			other: other
		}
		ajax(question, obj, function(data) {
			data = JSON.parse(data);
			Alert(data.resultmsg)
		})
	});
});