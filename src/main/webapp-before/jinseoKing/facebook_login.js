function checkLoginState() {
  FB.getLoginStatus(function(response) {
    console.log("하하하하")
    console.log(response)
  });
}



 window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '1932124593728840',
                    xfbml      : true,
                    version    : 'v2.9'
                  });
                  FB.AppEvents.logPageView();
                };

                (function(d, s, id){
                   var js, fjs = d.getElementsByTagName(s)[0];
                   if (d.getElementById(id)) {return;}
                   js = d.createElement(s); js.id = id;
                   js.src = "//connect.facebook.net/ko_KR/sdk.js";
                   fjs.parentNode.insertBefore(js, fjs);
                 }(document, 'script', 'facebook-jssdk'));

         function facebooklogin() {
        	  FB.login(function(response) {
        		    FB.api('/me?fields=id,name,email', function (response) {
                     console.log(response);
                     console.log(response.email)
						  $.post('../auth/login.json', {
						    'id': response.email,
						    'password': response.email
						  }, function(result) {
						    console.log('로그인result:')
						    console.log(result)
						    if (result.data == 'ok') {
						    location.href = 'web/movieperson/mypage.html'
						   } else {
			                $.post('/travelstudio/member/add.json', {'id': response.email, 'password': response.email, 'loginType': 'facebook'}, function(){console.log("okok")/*})*/
			                $.post('../auth/login.json', {
			                	'id': response.email,
							    'password': response.email
			                  }, function(result) {
			                    console.log('로그인result:')
			                    console.log(result)
			                    if (result.data == 'ok') {
			                    location.href = 'web/movieperson/mypage.html'
			                   } else {
			                	   alert('facebook로그인이 왜 안될까~~~요?')
			                   }
			                  }, 'json') })//add.json
						   }
						  }, 'json')  //login.json 
        		  });

        		   }, {scope: 'public_profile,email'});
        	
			}

         
         function facebookRegister() {
       	  FB.login(function(response) {
       		    FB.api('/me?fields=id,name,email', function (response) {
                    console.log(response);
                    console.log(response.email)
						  $.post('../auth/login.json', {
						    'id': response.email,
						    'password': response.email
						  }, function(result) {
						    console.log('로그인result:')
						    console.log(result)
						    if (result.data == 'ok') {
						    	 alert('이미 가입된 회원입니다.')
						   } else {//회원정보가 없으면 회원가입
			                $.post('/travelstudio/member/add.json', 
			                		{'id': response.email, 'password': response.email, 'loginType': 'facebook'}, 
			                		function(){
			                			 alert('회원가입 완료.')
			                		}) //add.json
						   }
						  }, 'json')  //login.json 
       		  });//FB.api

       		   }, {scope: 'public_profile,email'});
       	
			}

								
								