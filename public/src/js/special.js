$(document).ready(function() {
	function nextSlide() {
		console.log('++++++NEXT++++++')
		if($(this).index() != ($('.content_photo').length - 1)) {
			$(this).hide().next().show();
		}
		else {
			$('.content_photo:last-child').hide()
			$('.content_photo:first-child').show()
		}
	}
	$('.content_photo').on('click',nextSlide);
});