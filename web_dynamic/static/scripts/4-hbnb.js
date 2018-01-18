let amtys = {}; // creating an object/dict for {amty_id: amty_name}

function h4Update () { // update <h4> with a list of amenities checked
  let amtyNames = Object.values(amtys);
  if ($.isEmptyObject(amtys)) {
    $('div.amenities > h4').html('&nbsp;');
  } else if (amtyNames.length <= 2) {
    $('div.amenities > h4').text(amtyNames.join(', '));
  } else {
    $('div.amenities > h4').text(amtyNames.slice(0, -1).join(', ') + ', ' + amtyNames.slice(-1));
  }
}

// maintains a dict of checked amenities && update them in <h4>
$(function () {
  $('li input[type=checkbox]').on('click', function () {
    let id = this.dataset.id;
    let name = this.dataset.name;
    if (this.checked) { // if amenity is checked, add it to dict
      amtys[id] = name;
    } else { // if amentity is unchecked, remove it from dict
      delete amtys[id];
    }
    // update <h4> with a list of amenities checked
    if ($.isEmptyObject(amtys)) {
      $('div.amenities > h4').html('&nbsp;');
    } else {
      let amtyNames = Object.values(amtys).toString();
      $('div.amenities > h4').html(amtyNames);
    }
    h4Update();
  });
});

// change circle color based on the status of the API request
$(function () {
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function () { $('DIV#api_status').addClass('available'); },
    error: function () { $('DIV.available').removeClass('available'); }
  });
});

// load places from the places_search api
$(function () {
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}', // return data is of the form [{i: {dict of Place attributes},...] where i = 0, 1, 2,...
    success: function (data) { // loading places from api && recreating html for places
      let places = Object.values(data);
      if (places.length > 0) {
        places.forEach(function (place) {
          let placeLayout = '<article>' +
	    '<h2>' + place.name + '</h2>' + '<div class="price_by_night">' +
	    '<p>' + '$' + place.price_by_night + '</p>' + '</div>' +
	    '<div class="information">' + '<div class="max_guest">' +
	    '<div class="guest_image">' + '</div>' + '<p>' + place.max_guest +
	    '</p>' + '</div>' + '<div class="number_rooms">' +
	    '<div class="bed_image">' + '</div>' + '<p>' + place.number_rooms +
	    '</p>' + '</div>' + '<div class="number_bathrooms">' +
	    '<div class="bath_image"></div>' + '<p>' + place.number_bathrooms +
	    '</p>' + '</div>' + '</div>' + '<div class="user">' + '<p></p>' +
	    '</div>' + '<div class="description">' +
	    '<p>' + place.description + '</p>' + '</div>' + '</article>';
          $('section.places').append(placeLayout);
        });
      }
    }
  });
});

// send a POST request to places_search api when the button is clicked
$(function () {
  $('button').on('click', function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: amtys, // return data is of the form [{i: {dict of Place attributes},...] where i = 0, 1, 2,...
      success: function (data) { // loading places from api && recreating html for places
        let places = Object.values(data);
        if (places.length > 0) {
	  places.forEach(function (place) {
            let placeLayout = '<article>' +
	      '<h2>' + place.name + '</h2>' + '<div class="price_by_night">' +
	      '<p>' + '$' + place.price_by_night + '</p>' + '</div>' +
	      '<div class="information">' + '<div class="max_guest">' +
	      '<div class="guest_image">' + '</div>' + '<p>' + place.max_guest +
	      '</p>' + '</div>' + '<div class="number_rooms">' +
	      '<div class="bed_image">' + '</div>' + '<p>' + place.number_rooms +
	      '</p>' + '</div>' + '<div class="number_bathrooms">' +
	      '<div class="bath_image"></div>' + '<p>' + place.number_bathrooms +
	      '</p>' + '</div>' + '</div>' + '<div class="user">' + '<p></p>' +
	      '</div>' + '<div class="description">' +
	      '<p>' + place.description + '</p>' + '</div>' + '</article>';
            $('section.places').append(placeLayout);
	  });
        }
      }
    });
  });
});
