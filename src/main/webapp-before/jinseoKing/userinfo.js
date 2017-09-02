var mno = 0
  $.getJSON('/auth/userinfo.json', function(result) {
    if (result.data) {
      $('#login1').css('display','none')
      $('#logout1').css('display','inline-block')
    }
 })  
$(document.body).on('click', '#logout1', function(event) {
  $.getJSON('/auth/logout.json', function(result) {
    location.href = '../main.html'
  })
})