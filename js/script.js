window.onload = function() {
  var mapOptions = {
    center: { lat: 59.347327, lng: 18.073537},
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    disableDefaultUI: true,
    zoomControl: true
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  
  // Go to places
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  var kth = new google.maps.LatLng(59.347327, 18.073537);

  function chicagoControl(ctrlDiv,map) {
    var ctrlUI = document.createElement('div');
    ctrlUI.id = "ctrl-ui";
    ctrlUI.title = 'Click for CHICAGO';
    ctrlDiv.appendChild(ctrlUI);

    var ctrlText = document.createElement('div');
    ctrlText.id = "chicago-btn";
    ctrlText.innerHTML = '<strong>Chicago</strong>';
    ctrlUI.appendChild(ctrlText);

    google.maps.event.addDomListener(ctrlUI, 'click', function() {
      map.setCenter(chicago)
    });
  }

  // Create a div to hold the control.
  var ctrlDiv = document.createElement('div');
  ctrlDiv.id = "ctrl-div";

  var chicagoControl = new chicagoControl(ctrlDiv,map);
  ctrlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(ctrlDiv);

  // Set marker
  function markerCtrl(markerDiv,map) {
    var markerUI = document.createElement('div');
    markerUI.id = "marker-ui";
    markerUI.title = 'Click to set marker';
    markerUI.innerHTML = '<strong>Set marker</strong>';
    markerDiv.appendChild(markerUI);

    google.maps.event.addDomListener(markerUI, 'click', function() {
      var marker = new google.maps.Marker({
        position: map.getCenter(),
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });
    });
  }

  // Create a div to hold the control.
  var markerDiv = document.createElement('div');
  markerDiv.id = "marker-div";

  var markerControl = new markerCtrl(markerDiv,map);
  markerDiv.index = 2;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(markerDiv);

  function setMapStyle(type) {
    if (type === 'TERRAIN') {
      map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    }
    else if (type === 'HYBRID') {
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    }
  }

  

};