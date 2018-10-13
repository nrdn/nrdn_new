$(document).ready(function() {
	var $spanLogo= $('span.logo');
	var $menuItems = $('.menu_items');
	$spanLogo.on('click', function() {
		$menuItems.toggleClass('flex');
	})
});