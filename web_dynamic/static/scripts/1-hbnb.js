let amtys = {}; // creating an object/dict for {amty_id: amty_name}

$(function () {
  $('li input:checkbox').on('click', function () {
    let id = this.dataset.id;
    let name = this.dataset.name;

    if (this.checked) { // if amenity is checked, add it to dict
      amtys[id] = name;
      if (document.getElementById('amty_list').innerHTML === '&nbsp;') {
        $('H4#amty_list').text(name);
      } else {
        $('H4#amty_list').append(', ' + name);
      }
    } else { // if amentity is unchecked, remove it from dict
      delete amtys[id];
    }
    console.log(amtys);
  });
});
