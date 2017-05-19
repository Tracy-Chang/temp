/**
 * 需求主题
 * author  tracy
 */
require([], function () {

	function showOrHideMyList(className) {
		return function() {
			if ($('.' + className).css('display') == 'block') {
				$('.' + className).hide();
			} else {
				$('.' + className).show();
			}
		}
	}
	$('.form,#form_hidden').on('click', showOrHideMyList('form-detail'));
	$('.address,#address_hidden').on('click', showOrHideMyList('address-detail'));
});