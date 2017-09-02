var fiid = $('#id-input'),
    fiEmail = $('#email-input'),
    fiPassword = $('#password-input'),
    fiPassword2 = $('#password2-input');
   




  $('#signup-btn').click(function() {
	  if(fiPassword.val()==fiPassword2.val()){
    $.post('../member/add.json', {
      'email': fiEmail.val(),
      'alias': fiid.val(),
      'password': fiPassword.val()
    }, function(result) {
      location.href = '../main_minkdak/main.html'
    }, 'json')
	  }
	  else{
		  alert('비밀번호를 확인해주세요')
	  }
  })
