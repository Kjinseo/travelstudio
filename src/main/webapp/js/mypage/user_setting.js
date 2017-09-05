var aliasIp = $('#name-input'),
	introIp = $('#int-input'),
	txtAlias = $('#txt_alias'),
	txtEmail = $('#txt_email'),
	pathIp = ""
var no = 0

//header load 시키기
$(function() {
	$('.header-container').load('../main/header.html')
	
	$('.footer-container').load('../main/footer.html')


})
	
	
	



$.getJSON('/member/header.json', function(result) {
	console.log(result.data)	
	var data = result.data.loginMember
	txtAlias.text(data.alias)
	txtEmail.text(data.email)
	aliasIp.val(data.alias)
	introIp.val(data.intro)
	pathIp = data.path;
	var path = window.location.pathname;
	
	if(pathIp != null) {
		$('.user_photo_change').css({
			  'background': 'url("' + pathIp + '_100.png")' + 'center center no-repeat'
			  
		})
	}
});

$('#fileupload').fileupload({
  url: '/member/myPhotoUpload.json',        // 서버에 요청할 URL
  dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
  sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
  singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
  autoUpload: true,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
  disableImageResize: /Android(?!.*Chrome)|Opera/
        .test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
  previewMaxWidth: 170,   // 미리보기 이미지 너비
  previewMaxHeight: 170,  // 미리보기 이미지 높이 
  previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
  processalways: function(e, data) {
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
  }, 
  submit: function (e, data) { // 서버에 전송하기 직전에 호출된다.
  }, 
  done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
	  pathIp = ""
      var imlibsData = data.result;
      var file = imlibsData.data[0];
      pathIp = "/upload/" + file.filename
  }
});

$(document).on("click","#save-btn",function(){
  $.post('/member/update.json', {
	  'alias': aliasIp.val(),
	  'intro': introIp.val(),
	  'path' : pathIp
  }, function(result) {
	  location.href= "/desktop/mypage/mypage.html"
  }, 'json')
})




