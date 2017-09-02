var aliasIp = $('#name-input'),
	introIp = $('#int-input'),
	txtAlias = $('#txt_alias'),
	txtEmail = $('#txt_email')
	//	userInfo = $('.user_setting_info')
var no = 0
//no = location.href.split('?')[1].split('=')[1]
console.log(no)
//try {
//} catch (err) {}

//if(no != 0) {
//userInfo.css('display', 'none')

//$("document").ready(function(){]
$.getJSON('../member/header.json', function(result) {
	var data = result.data
	console.log(result.data.loginMember)
	txtAlias.text(result.data.loginMember.alias)
	txtEmail.text(result.data.loginMember.email)
	aliasIp.val(result.data.loginMember.alias)
	introIp.val(result.data.loginMember.intro)
	
});
/*$.getJSON('../member/detail.json', {'no': no}, function(result) {
	var data = result.data
	console.log(data)
	txtAlias.text(data.alias)
	txtEmail.text(data.email)
	aliasIp.val(data.alias)
	introIp.val(data.intro)
	
});*/

$('#save-btn').click(function() {
	console.log(aliasIp.val())
  $.post('../member/update.json', {
	  'alias': aliasIp.val(),
	  'intro': introIp.val()
  }, function(result) {
	  console.log('완료')
	 /*location.href = 'mypage.html'*/
  }, 'json')
})

$('#fileupload').fileupload({
  url: '../member/upload1.json',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
  previewMaxWidth: 170,   // 미리보기 이미지 너비
  previewMaxHeight: 170,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  processalways: function(e, data) {
      console.log('fileuploadprocessalways()...');
      console.log(data.files);
      var imagesDiv = $('.user_img');
      imagesDiv.html("");
      for (var i = 0; i < data.files.length; i++) {
        try {
          if (data.files[i].preview.toDataURL) {
            $("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '170px').css('border-radius', '100%').appendTo(imagesDiv);
          }
        } catch (err) {}
      }
      $('#save-btn').unbind("click");
      $('#save-btn').click(function() {
          data.submit();
      });
  }, 
  submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
    console.log('submit()...');
     data.formData = {
        name: $('#name').val(),
        age: $('#age').val()
        
    }; 
  }, 
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
    console.log('done()...');
    console.log(data.result + "파일 업로드할거당");
    var file = data.result.fileList[0];
    /*$('<p/>').text("name : " + data.result.name).appendTo(document.body);
    $('<p/>').text("age : " + data.result.age).appendTo(document.body);*/
    /*$.each(data.result.fileList, function(index, file) {
      $('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
    });*/
  }
});


$.getJSON('../member/header.json',function(result){
	console.log(result)
	let str = result.data.loginMember.path;
	var path = window.location.pathname;
	
	console.log(str)
	$('.user_photo_change').css({
		  'background': 'url("../mypage/upload/' + str +'")' + 'center center no-repeat'
		  
	})
}) 

//})

//};
