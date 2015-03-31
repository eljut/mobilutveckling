// Position controllers
var positionDiv = document.createElement('div');
positionDiv.id = "position-ctrl";
// Up button
var upCtrl = document.createElement('div');
upCtrl.id = "up-btn";
upCtrl.className = "map-btn";
upCtrl.title = 'Up!';
upCtrl.innerHTML = '<strong>Up</strong>';
google.maps.event.addDomListener(upCtrl, 'click', function() {
  changePos(0.001,0);
});
// Left button
var leftCtrl = document.createElement('div');
leftCtrl.className = "map-btn";
leftCtrl.id = "left-btn";
leftCtrl.title = 'Left!';
leftCtrl.innerHTML = '<strong>Left</strong>';
google.maps.event.addDomListener(leftCtrl, 'click', function() {
  changePos(0,-0.001);
});
// Down button
var downCtrl = document.createElement('div');
downCtrl.className = "map-btn";
downCtrl.id = "down-btn";
downCtrl.title = 'Down!';
downCtrl.innerHTML = '<strong>Down</strong>';
google.maps.event.addDomListener(downCtrl, 'click', function() {
  changePos(-0.001,0);
});
// Right button
var rightCtrl = document.createElement('div');
rightCtrl.className = "map-btn";
rightCtrl.id = "right-btn";
rightCtrl.title = 'Right!';
rightCtrl.innerHTML = '<strong>Right</strong>';
google.maps.event.addDomListener(rightCtrl, 'click', function() {
  changePos(0,0.001);
});

// Add controllers to positionDiv
positionDiv.appendChild(upCtrl);
positionDiv.appendChild(leftCtrl);
positionDiv.appendChild(downCtrl);
positionDiv.appendChild(rightCtrl);

// Add to DOM
var bottomDiv = document.getElementById("bottom");
bottomDiv.appendChild(positionDiv);

function changePos(lat,lng) {
  var center = map.getCenter();
  var newCenter = new google.maps.LatLng(center.lat() + lat, center.lng() + lng);
  map.setCenter(newCenter);
  console.log(newCenter)
}