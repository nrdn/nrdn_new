$(document).ready(function() {
	function remove(event) {
		var id  = $(this).attr('id');
		if (confirm(event.data.description)) {
			$.post(event.data.path, {'id': id}).done(function() {
				location.reload();
			});
		}
	}

	function hide(event) {
		var id  = $(this).attr('id');
		$.post(event.data.path, {'id': id}).done(function() {
			location.reload();
		});
	}

	$('.rm_user').on('click', {path:'/auth/users/remove', description: 'Удалить пользователя?'}, remove);
	$('.rm_news').on('click', {path:'/auth/slides/remove', description: 'Удалить слайд?'}, remove);

	$('.rm_category').on('click', {path:'/auth/categorys/remove', description: 'Удалить категорию?'}, remove);
	$('.rm_subsidiary').on('click', {path:'/auth/subsidiarys/remove', description: 'Удалить категорию?'}, remove);
	$('.rm_magazine').on('click', {path:'/auth/magazines/remove', description: 'Удалить публикацию?'}, remove);


	// events
	$('.rm_event_toggle').on('click', {path:'/auth/events/hide', description: 'Удалить объект?'}, hide);
	$('.rm_event').on('click', {path:'/auth/events/remove', description: 'Удалить объект?'}, remove);
});
