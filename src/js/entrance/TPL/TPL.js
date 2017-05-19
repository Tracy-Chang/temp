/**
 * 需求主题
 * author  作者
 */
require(['TPL/../../mock-data/TPL/TPL-data'], function () {
	var TPLInfoUrl = 'xxx';

	function ajax(url, callback) {
		$.ajax({
			type: 'get',
			url: url,
			data: {},
			success: function (data) {
				console.log(data)
			},
			error: function () {

			}
		});
	}

	ajax(TPLInfoUrl);
	console.log('done');
});