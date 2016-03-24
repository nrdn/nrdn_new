$(document).ready(function() {
	$('.post_news_titles').eq(0).addClass('active');

	$('.post_news_titles').on('click', function(){
		$('.post_news_titles').removeClass('active');
		$(this).addClass('active');

		$('.post_item_block').hide().eq($(this).index()).show();
	})

	function t(t) {
			console.log("++++++NEXT++++++");
			$(this).parent().siblings('.content_photo');
			if ($(this).parent().index() != $(this).parents('.post_item_block').find('.content_photo').length - 1 ) {
				$(this).parent().hide().next().show();
			}
			else {
				$(".content_photo:last-child").hide();
				$(".content_photo:first-child").show()
			}
	}
	function o(t) {
			console.log("++++++PREV++++++"),
			0 != $(this).parent().index() ? $(this).parent().hide().prev().show() : ($(".content_photo:last-child").show(),
			$(".content_photo:first-child").hide())
	}
	$(".prev_arrow").on("click", o),
	$(".content_image_hover").on("click", t)

});