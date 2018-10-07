function getRandom (min, max) {
	var rand = min - 0.5 + Math.random()*(max-min)
	return Math.round(rand);
}

$(document).ready(function() {
	var count = $('.background_item').length - 1;
	var w_count = getRandom(0, count);
	var interval = 5000;
	var runSlideShow = null;

	var changeSlide = function() {
		var old_rand = w_count;

		if (w_count === old_rand) {
			w_count++;
			if (w_count > count) {
				w_count = 0
			};
			old_rand = w_count;
		}
		else {
			old_rand = w_count;
		}

		$('.work_item').hide();
		$('.work_item').eq(w_count).show();
		$('.background_item').css('opacity', '0');
		$('.background_item').eq(w_count).css('opacity', '1');
	}

	$('.work_item').eq(w_count).show();
	$('.background_item').eq(w_count).css('opacity', '1');

	$(document).click(function(event) {
		clearInterval(runSlideShow);
		var target = $( event.target );
		if (target.is( ':not(.logo, .menu_items a, .work_title a)')) {
			changeSlide();
			runSlideShow = setInterval(changeSlide, interval);
		}
	});
	runSlideShow = setInterval(changeSlide, interval);
});