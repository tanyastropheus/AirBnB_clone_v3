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

$(function () { // maintains a dict of checked amenities && update them in <h4>
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
$.ajax({
  type: 'GET',
  url: 'http://0.0.0.0:5001/api/v1/status/',
  success: function () { $('DIV#api_status').addClass('available'); },
  error: function () { $('DIV.available').removeClass('available'); }
});

// fetch places
$.ajax({
  type: 'GET',
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  success: function ()
});
