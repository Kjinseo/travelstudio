var fiid = $('#id-input'),
    fiEmail = $('#email-input'),
    fiPassword = $('#password-input');

$(function() {
	$('.header-container').load('../main/header.html')
	$('.footer-container').load('../main/footer.html')
})

$('#login-summit').click(function() {
	  
    $.post('/auth/login.json', {
      'email': fiEmail.val(),
      'password': fiPassword.val()
    }, function(result) {
     console.log(result)
     if(result.data=='ok'){
    	 location.href="/desktop/main/main.html"
     }else{
    	 alert("아이디/비밀번호를 확인해주세요")
     }
    }, 'json')
    
})
