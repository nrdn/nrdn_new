var old_position = 0;
var step = 10000;
var b = 0;

function getRandom (min, max) {
	var rand = min - 0.5 + Math.random()*(max-min)
	return Math.round(rand);
}

function getUnique(arr) {
	var obj = {};

	for (var key in arr)
		obj[ arr[key] ] = true;

	return Object.keys(obj);
}

$(document).ready(function() {
	var old_items = $('.work_item');

	function bg_out() {
		$work_images = $(this).find('.work_image');
		var max = $work_images.length;
		var rand = getRandom(0, max);

		$work_images.css('opacity', 0).eq(rand).css('opacity', 1);

		// $(this).children('.work_logo, .work_title').show();
		// $(this).children('.work_images').hide();
	}


	// $(document).on('mouseenter', '.work_item', bg_over);
	$(document).on('mouseleave', '.work_item', bg_out);
	// $(document).on('mousemove', '.work_item', bg_move);




	$('.sort_item.tags').click(function() {
		$('.works_block').removeClass('works_big');
		$('.sort_item').removeAttr('style');
		$(this).css('border-bottom','black 1px dotted');

		var items = $('.work_item');
		$('.work_tag').remove();
		$('.work_item.archive').hide();
		var arr_items_tags = [];

		items.each(function(index, el) {
			arr_items_tags.push(el.className.split(' ')[1]);
		});

		var tags = getUnique(arr_items_tags);

		console.log('tags', tags);

		// var direction = ['urbanism', 'architecture', 'urban_projects', 'exhibitions', 'industrial_design', 'installation', 'navigation', 'graphic_design'];
		var result = [];


		console.log('DIRECTION::::', direction);

		for (var i = 0; i < direction.length; ++i){
			for (var j = 0; j < tags.length; ++j){
				if (direction[i] == tags[j])
						result.push(direction[i]);
			}
		}

		console.log('RESULT::', result);


		$.each(result, function(index, tag) {
			// var tagsArray = {'urbanism':'Урбанизм', 'architecture':'Архитектура', 'urban_projects':'Специальные проекты', 'exhibitions':'Выставки', 'industrial_design':'Промышленный дизайн', 'installation': 'Инсталяции', 'navigation':'Навигация', 'graphic_design':'Графический дизайн'}
			console.log('index:::::', index);
			console.log('RESULT:::::', result);
			console.log('tagsArray:::::', tagsArray);

			var tag_items = $(items).filter('.' + tag);
			var work_tag = $('<div />', {'class':'work_tag ' + tag});
			var work_tag_title = $('<div />', {'class':'work_tag_title', 'text':tagsArray[tag]});

			console.log('work_tag_title:::', work_tag_title);

			$('.works_block').append(work_tag.append(work_tag_title).append(tag_items));


		});

	});


	$('.sort_item.year').click(function() {
		$('.sort_item').removeAttr('style');
		$('.works_block').removeClass('works_big');
		$(this).css('border-bottom','black 1px dotted');

		var items = $('.work_item');
		$('.work_tag').remove();
		$('.work_item.archive').hide();
		var arr_items_years = [];

		items.each(function(index, el) {
			arr_items_years.push(el.className.split(' ')[2]);
		});

		var years = getUnique(arr_items_years);

		$.each(years.reverse(), function(index, year) {
			var year_items = $(items).filter('.' + year);
			var work_tag = $('<div />', {'class':'work_tag ' + year});
			var work_tag_title = $('<div />', {'class':'work_tag_title', 'text':year});
			$('.works_block').append(work_tag.append(work_tag_title).append(year_items));
		});

	});


	$('.sort_item.clear').click(function() {
		$('.sort_item').removeAttr('style');
		$('.works_block').addClass('works_big');
		$(this).css('border-bottom','black 1px dotted');

		$('.work_tag').remove();

		old_items.each(function(index, el) {
			$('.works_block').append(el);
		});
	});


	$('.sort_item.archive').click(function() {
		$('.sort_item').removeAttr('style');
		$('.works_block').addClass('works_big');
		$(this).css('border-bottom','black 1px dotted');

		$('.work_tag').remove();
		old_items.each(function(index, el) {
			$('.works_block').append(el);
		});
		if (b == 0) {$('.work_item.archive').show().css({'opacity':0.4}); b = 1}
		else {$('.work_item.archive').hide(); b = 0; $(this).css('border-bottom','none')}

	});


});