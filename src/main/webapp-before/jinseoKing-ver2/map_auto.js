
  $('#search_place').click(function() {
    $.detail('add.json', {
      'lati': lat.val(),
      'longit': lng.val()
    }, function(result) {
    	console.log("위도 경도 넘어간다.");
      location.href = 'index.html'
    }, 'json')
  })

  
 