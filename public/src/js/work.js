$(document).ready(function() {
	$('.dot:first').text('●');
	var count = $('.background_item').length - 1;
	var w_count = 0;

	function toggleGlow () {
		$('.background_works').toggleClass('glow');
	}

	function hideDescription () {
		$('.work_description_block').data('clicked', true);
		$('.work_description_block').addClass('hide');
		$('.work_description_block').children().hide();
		$('.work_description_block').off('mouseover mouseout');
		$('.background_works').addClass('glow');
		$(document).off('click', hideDescription);
	}

	function toggleDescription () {
		$('.work_description_block').data('clicked', !$('.work_description_block').data('clicked'));
		$('.work_description_block').toggleClass('hide');


		if ($('.work_description_block').data('clicked')) {
			$('.work_description_block').children().hide();
			$('.work_description_block').off('mouseover mouseout')
			$('.background_works').addClass('glow');
		}
		else {
			$('.work_description_block').children().show();
			$('.work_description_block').on('mouseover mouseout', toggleGlow);
		}
	}

	function backScroll(event) {
			var target = $(event.target);
			$('.round_click_block').hide();
			$('.background_works').addClass('glow');

			if (target.is( ':not(.logo, .menu_items a)' )) {
				w_count++;
				$('.work_item').hide();
				$('.work_item').eq(w_count).show();
				$('.dot').text('◦');
				$('.dot').eq(w_count).text('●');
				$('.background_item').eq(count).css('opacity', '0');
				$('.background_item').eq(count-1).css('opacity', '1');
				count--;

				if (count < 0) {
					$('.background_item').css('opacity', '1')
					count = $('.background_item').length - 1;
					w_count = 0;
					$('.work_item').eq(w_count).show();
					$('.dot').eq(w_count).text('●');
				}
			}
		}

	// $('.work_description_block').on('mouseover mouseout', toggleGlow);

	$('.work_description_block').on('click', toggleDescription);
	$(document).on('click', hideDescription);
	$(document).on('click', backScroll);
});