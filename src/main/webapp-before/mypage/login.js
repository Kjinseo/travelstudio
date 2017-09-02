var fiid = $('#id-input'),
    fiEmail = $('#email-input'),
    fiPassword = $('#password-input');
    
   




  $('#login-summit').click(function() {
	  
    $.post('../auth/login.json', {
      'email': fiEmail.val(),
      'password': fiPassword.val()
    }, function(result) {
     console.log(result)
    }, 'json')
    
    location.href="../main_minkdak/main.html"
  })
