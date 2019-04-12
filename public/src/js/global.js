$(document).ready(function() {
	var $spanLogo= $('span.logo');
	var $menuItems = $('.menu_items');
	$spanLogo.on('click', function() {
		$menuItems.toggleClass('flex');
	})

	$('body').removeClass('transparentBody');


	$('.menu_items_inner a').on('click', function(event) {
		var href = $(this).attr('href');
		console.log('href');
		event.preventDefault();
		$('body').addClass('transparentBody');
		setTimeout(function() {window.location.href = href}, 150);
	})
});