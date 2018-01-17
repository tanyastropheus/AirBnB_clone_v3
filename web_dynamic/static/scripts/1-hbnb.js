let amtys = {}; // creating an object/dict for {amty_id: amty_name}

function h4Update () {  // update <h4> with a list of amenities checked
  let amtyNames = Object.values(amtys);
  if (amtyNames.length <= 2) {
    $('H4#amty_list').text(amtyNames.join(', '));
  } else {
    $('H4#amty_list').text(amtyNames.slice(0, -1).join(', ') + ', ' + amtyNames.slice(-1));
  }
}

$(function () {  // maintains a dict of checked amenities && update them in <h4>
  $('li input:checkbox').on('click', function () {
    let id = this.dataset.id;
    let name = this.dataset.name;
    if (this.checked) { // if amenity is checked, add it to dict
      amtys[id] = name;
    } else { // if amentity is unchecked, remove it from dict
      delete amtys[id];
    }
    h4Update();
  });
});
