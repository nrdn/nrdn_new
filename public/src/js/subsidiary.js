$(document).ready(function() {
	var columns_main_scrollerrus = $('.columns_main_scrollerrus').width();
	$('.subsidiary_menu').css({'right':columns_main_scrollerrus});
		$('.column_main_inner').on('scroll', function(event) {
			var scrollVal = $(this).scrollTop();
			if (scrollVal > 150) {
				$('.subsidiary_menu').addClass('fixed');
				$('.content_title').addClass('fixedtitle');
			}
			else {
				$('.subsidiary_menu').removeClass('fixed');
				$('.content_title').removeClass('fixedtitle');
			}
		})
});