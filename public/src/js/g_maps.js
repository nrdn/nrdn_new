var map;
function initialize() {
	var myLatlng = new google.maps.LatLng(55.789329, 37.706222);

  var mapOptions = {
    zoom: 18,
    center: myLatlng,
    scrollwheel: false
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

	var infowindow = new google.maps.InfoWindow({
	    content: 'Народный архитектор'
	});

	var marker = new google.maps.Marker({
	    position: myLatlng,
	    map: map,
	    title: 'Народный архитектор'
	});

	google.maps.event.addListener(marker, 'click', function() {
	    infowindow.open(map, marker);
	});
}

google.maps.event.addDomListener(window, 'load', initialize);