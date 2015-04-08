window.onload = function() {
  var mapOptions = {
    center: { lat: 59.347327, lng: 18.073537},
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    disableDefaultUI: true,
    zoomControl: true
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  
  // Places we can go!
  var newYork = new google.maps.LatLng(40.714764, -74.008177);
  var kth = new google.maps.LatLng(59.347327, 18.073537);
  var ellinorsHus = new google.maps.LatLng(59.427744, 18.083370);
  var hammarbyB = new google.maps.LatLng(59.298957, 18.109252);

  // Create KTH button
  var kthBtn = document.createElement('div');
  kthBtn.id = "kth-btn";
  kthBtn.title = 'Click for KTH';
  kthBtn.className = "map-btn";
  kthBtn.innerHTML = '<strong>KTH</strong>';
  google.maps.event.addDomListener(kthBtn, 'click', function() {
    map.setCenter(kth);
    map.setZoom(18);
  });
  kthBtn.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(kthBtn);

  // Create newYork button
  var newYorkBtn = document.createElement('div');
  newYorkBtn.id = "new-york-btn";
  newYorkBtn.className = "map-btn";
  newYorkBtn.title = 'Click for New York';
  newYorkBtn.innerHTML = '<strong>New York</strong>';
  google.maps.event.addDomListener(newYorkBtn, 'click', function() {
    map.setCenter(newYork);
    map.setZoom(18);
  });
  newYorkBtn.index = 2;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(newYorkBtn);

  // Create changeMapType button
  var changeMapBtn = document.createElement('div');
  changeMapBtn.id = "changemap-btn";
  changeMapBtn.title = 'Change View';
  changeMapBtn.innerHTML = '<select id="map-options">'+
                            '<option value="SATELLITE">Satellite</option>'+
                            '<option value="ROADMAP">Roadmap</option>'+
                            '<option value="TERRAIN">Terrain</option>'+
                            '</select>';
  changeMapBtn.index = 3;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(changeMapBtn);
  
  google.maps.event.addDomListener(changeMapBtn, 'change', function() {
    var selectedOpt = document.getElementById("map-options");
    var mapType = selectedOpt.options[selectedOpt.selectedIndex].value;
    console.log(mapType);
    map.setMapTypeId(google.maps.MapTypeId[mapType]);
  });

  // Create marker controller
  function markerCtrl(markerBtn,map,drag) {
    markerBtn.title = 'Click to set marker';
    markerBtn.className = "map-btn";
    if (drag) {
      markerBtn.innerHTML = '<strong>Set drag marker</strong>';
      var pinColor = "47C399";
    } else {
      markerBtn.innerHTML = '<strong>Set non-drag marker</strong>';
      var pinColor = "692049";
    }

    // Custom pin
    var pinImage = new google.maps.MarkerImage(
      "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      null,
      null,
      null,
      new google.maps.Size(25, 41)
    );
    var swePin = new google.maps.MarkerImage(
      "https://chart.googleapis.com/chart?chst=d_bubble_icon_text_small&chld=flag_se|bb|KTH!|"+pinColor+"|FFFFFF",
      null,
      null,
      new google.maps.Point(0,45), // offset point
      null
    );

    // Add pin on click
    google.maps.event.addDomListener(markerBtn, 'click', function() {
      var center = map.getCenter();
      if (center.lat() === kth.lat() && center.lng() === kth.lng()) {
        var marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          draggable: drag,
          icon: swePin,
          animation: google.maps.Animation.DROP
        });
      } else {
        var marker = new google.maps.Marker({
          position: map.getCenter(),
          map: map,
          draggable: drag,
          icon: pinImage,
          animation: google.maps.Animation.DROP
        });
      }

      if (drag) {
        // Bounce when mouseover a draggable marker
        google.maps.event.addListener(marker, 'mouseover', function() {
          if (this.getAnimation() == null) {
            this.setAnimation(google.maps.Animation.BOUNCE);
          }
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
          if (this.getAnimation() != null) {
            this.setAnimation(null);
          }
        });
      }
    });
  }

  // Draggable marker div
  var markerBtn = document.createElement('div');
  markerBtn.id = "drag-marker-btn";
  var markerControl = new markerCtrl(markerBtn,map,true);
  markerBtn.index = 1;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(markerBtn);

  // Non-draggable marker div
  var markerBtn = document.createElement('div');
  markerBtn.id = "non-drag-marker-btn";
  var markerControl = new markerCtrl(markerBtn,map,false);
  markerBtn.index = 2;
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(markerBtn);

  // Sidebar
  var sidebarToggle = document.getElementById("sidebar-toggle");
  var sidebar = document.getElementById("sidebar");
  sidebarToggle.onclick = function() {
    if (sidebarToggle.checked) {
      sidebar.className = "animated fadeInRight";
    } else {
      sidebar.className = "animated fadeOutRight";
    }
  }
  //$('#sidebar').addClass('animated bounceOutLeft');

  // Markers with infoWindow
  var ellinorMarker = new google.maps.Marker({
    position: ellinorsHus,
    map: map,
    title: 'Ellinors Hus'
  });

  var ellinorContent = '<div id="ellinorInfo">'+
      '<h1 class="firstHeading">Ellinors Hus</h1>'+
      '<div class="bodyContent">'+
      '<p>Here be monsters</p>'+
      '<img src="http://1.media.dorkly.cvcdn.com/29/82/20befd0953a3cc8f9cd8b2aaa8a4d3d7.gif" alt="smashing" height="100">'+
      '</div>'+
      '</div>';

  var ellinorInfo = new google.maps.InfoWindow({
      content: ellinorContent
  });

  google.maps.event.addListener(ellinorMarker, 'click', function() {
    ellinorInfo.open(map,ellinorMarker);
  });

  var hammarbyMarker = new google.maps.Marker({
    position: hammarbyB,
    map: map,
    title: 'Hammarbybacken'
  });

  var hammarbyContent = '<div id="hammarbyInfo">'+
    '<div id="hammarbyImgDiv"></div>'+
    '<h1 class="firstHeading">Hammarbybacken</h1>'+
    '<div class="bodyContent">'+
    '<p>Här kan vara om man känner för att vara någonstans.</p>'+
    '</div>'+
    '</div>';

  var hammarbyInfo = new google.maps.InfoWindow({
      content: hammarbyContent
  });

  google.maps.event.addListener(hammarbyMarker, 'click', function() {
    hammarbyInfo.open(map,hammarbyMarker);
  });

};
