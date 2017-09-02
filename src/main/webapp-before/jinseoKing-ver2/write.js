var fititle = $('#wirte_title'),
fisdt = $('.write_start_date'),
fiedt = $('.write_end_date'),

ficont = $('.text_write_box');

var mno =0;   
var savecount=0;


var d = new Date(); 
var localeDate  =  d.toLocaleDateString(); 

/*
$('#write_save_btn').click(function() {

	$.post('../post/add.json', {
		'title': fititle.val(),
		'sdt': fisdt.val(),
		'edt': fiedt.val(),
		'cont':ficont.val(),
		'mno': mno
		 'pdt': localeDate,
      'cont': ficont.val()
	}, function(result) {
//		location.href = '../main_minkdak/main.html'
	}, 'json')
	
	var pictures=[];
	for(i=0;i<=count;i++){
		if($('#text_parent_'+i+'> img')){
			console.log($('#text_parent_'+i+' > img'))
			pictures[i]=$('#text_parent_'+i+' > img')
		}
		console.log(pictures)
	}
	*/
	/*$.post('../post/add.json', {
		'title': fititle.val(),
		'sdt': fisdt.val(),
		'edt': fiedt.val(),
		'cont':ficont.val(),
		'mno': mno
		 'pdt': localeDate,
      'cont': ficont.val()
	}, function(result) {
//		location.href = '../main_minkdak/main.html'
	}, 'json')
	
	
})*/

//$('#file1').fileupload({
//url: '../File/upload.json',        // 서버에 요청할 URL
//dataType: 'json', /* "서버가 보낸 데이터가 JSON 문자열이다. 자바스크립트 객체로 바꿔라." 라는 의미*/
//done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
//console.log('done()...');
//console.log(data.result);
//var file = data.result.fileList[0];
//$.each(data.result.fileList, function(index, file) {
//$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);

//});

//}
//});



var aaa=0;

/*

$('#write_save_btn').click(function() {
if(savecount==1){
	return;
}
jQuery.ajaxSettings.traditional = true;
$.post('../post/add.json', {
	'title': fititle.val(),
	'sdt': fisdt.val(),
	'edt': fiedt.val(),
	'cont':ficont.val(),
	'mno': mno,
  'cont': ficont.val()
}, function(result) {
//	location.href = '../main_minkdak/main.html'
}, 'json')

var pictures=[];
for(i=0;i<=count;i++){
	if($('#text_parent_'+i+'> img')){
		console.log($('#text_parent_'+i+' > img'))
		pictures[i]=$('#text_parent_'+i+' > img')
	}
	console.log(pictures)
}
});*/



//$('.file1').fileupload({
//    url: '../File/upload.json',        // 서버에 요청할 URL
//    dataType: 'json', /* "서버가 보낸 데이터가 JSON 문자열이다. 자바스크립트 객체로 바꿔라." 라는 의미*/
//    done: function (e, data) {
//
//		console.log($(this).val())
//		console.log(data.files);
//		var no = $(this).attr('class').split('_')[1].split(' ')[0]
//		console.log(no)
//		/*console.log(no)*/
//
//		var imagesDiv = $("#text_parent_"+aaa+"").empty();
//		adddiv()
//		imagesDiv.html("");
//		for (var i = 0; i < data.files.length; i++) {
//			try {
////				console.log($(this).attr('class').split(' ')[1]);
////				no = location.href.split('?')[1].split('=')[1]
//				if (data.files[i].preview.toDataURL) {
//					console.log($("#text_parent_" + aaa))
//					$("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '700px').appendTo(imagesDiv);
//				}
//			} catch (err) {}
//		}
//		$('#write_save_btn').unbind("click");
//		$('#write_save_btn').click(function() {
//			$.post('../post/add.json', {
//				'title': fititle.val(),
//				'sdt': fisdt.val(),
//				'edt': fiedt.val(),
//				'cont':ficont.val(),
//				'mno': mno
//				/* 'pdt': localeDate,
//		      'cont': ficont.val()*/
//			}, function(result) {
////				location.href = '../main_minkdak/main.html'
//			}, 'json')
//			
//			var pictures=[];
//			for(i=0;i<=count;i++){
//				if($('#text_parent_'+i+'> img')){
//					console.log($('#text_parent_'+i+' > img'))
//					pictures[i]=$('#text_parent_'+i+' > img')
//				}
//				console.log(pictures)
//		}
//			
//		});
//	 // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
////      console.log('done()...');
////      console.log(data.result);
//      /*
//      var file = data.result.fileList[0];
//      $.each(data.result.fileList, function(index, file) {
//        $('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
//      });*/
//      
//    }
//});

/*	var content=[];
console.log()
for(i=0; i<$('.text_write_box').length;i++){
	content[i]=$('.text_write_box').val();
	console.log(content[i])
}*/
/*var tempArray = new Array();
$('.text_write_box').each(function(){
    tempArray.push($(this).attr('value'));
});
console.log(tempArray)
*/
var date = new Date();
var content = []
$('#write_save_btn').click(function() {
	if(savecount==1){
		return;
	}
	$('.text_write_box').each(function () {
	     console.log($(this).val())
	     content.push($(this).val())
	  })
	  
	console.log($('.text_write_box'))
	console.log(ficont.val());
	if(fititle.val() == null){
		alert("제목을 입력해주세요")
	}else if(fisdt.val()== null||fiedt.val()==null){
		alert("날짜를 입력해 주세요")
	}else{
		console.log(content);
		jQuery.ajaxSettings.traditional = true;

	$.post('../post/add.json', {
		'title': fititle.val(),
		'sdt': fisdt.val(),
		'edt': fiedt.val(),
		'mno': mno,
		'content': content,
		 'pdt': localeDate,
      'cont': ficont.val()
	}, function(result) {
		console.log(result.data)
		
//		location.href = '../main_minkdak/main.html'
	}, 'json')
	}
});
/*	var pictures=[];
	for(i=0;i<=count;i++){
		if($('#text_parent_'+i+'> img')){
			console.log($('#text_parent_'+i+' > img'))
			pictures[i]=$('#text_parent_'+i+' > img')
		}
		console.log(pictures)
	}*/
	


/*미리보기 파일업로드*/

$('.file1').fileupload({
	url: '../File/upload.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: true,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 700,   // 미리보기 이미지 너비
		previewMaxHeight: 560,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {

			console.log('fileuploadprocessalways()...');
			console.log($(this).val())
			console.log(data.files);
			var no = $(this).attr('class').split('_')[1].split(' ')[0]
			console.log(no)
			/*console.log(no)*/

			var imagesDiv = $("#text_parent_"+aaa+"").empty();
			adddiv()
			imagesDiv.html("");
			for (var i = 0; i < data.files.length; i++) {
				try {
					
//					console.log($(this).attr('class').split(' ')[1]);
//					no = location.href.split('?')[1].split('=')[1]
					if (data.files[i].preview.toDataURL) {
						console.log($("#text_parent_" + aaa))
						$("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '700px').appendTo(imagesDiv);
					}
				} catch (err) {}
			}
			/*$('#write_save_btn').unbind("click");*/
			
		}, 
		
		
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data.result);
			var file = data.result.fileList[0];
			/*$('<p/>').text("name : " + data.result.name).appendTo(document.body);
			$('<p/>').text("age : " + data.result.age).appendTo(document.body);*/
			$.each(data.result.fileList, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
		}
});




/*미리보기 파일업로드 끝*/

/*back file 업로드 시작*/

$('#title_fileupload').fileupload({
	url: '../post/add.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: false,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: true, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 1920,   // 미리보기 이미지 너비
		previewMaxHeight: 800,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {
			savecount=1;
			console.log('fileuploadprocessalways()...');
			console.log($(this).val())
			console.log(data.files);
			/*var no = $(this).attr('class').split('_')[1].split(' ')[0]*/
			/*console.log(no)*/
			/*console.log(no)*/

			/*var imagesDiv = $("#text_parent_"+aaa+"").empty();*/
			
			/*imagesDiv.html("");*/
			for (var i = 0; i < data.files.length; i++) {
				try {
//					console.log($(this).attr('class').split(' ')[1]);
//					no = location.href.split('?')[1].split('=')[1]
					if (data.files[i].preview.toDataURL) {
						/*console.log($("#text_parent_" + aaa))*/
						var a = data.files[i].preview.toDataURL()
						console.log(a)
						var img = new Image();
						img.src = a;
						$(".blank-one").css("background-image", "url('" + img.src + "')");
						
					}
				} catch (err) {}
			} 
			/*$('#write_save_btn').unbind("click");*/
		      $('#write_save_btn').click(function() {
		    	 		          data.submit();
		      }); 
		}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
			    console.log('submit()...');
			    $('.text_write_box').each(function () {
	    		     /*console.log($(this).val())*/
	    		     content.push(decodeURIComponent($(this).val()))
	    		   console.log(data.files[0])
	    		  })
	    		  console.log(content)
			    data.formData = {
			    		title : decodeURIComponent(fititle.val()),
			    		sdt: fisdt.val(),
			    		edt: fiedt.val(),
			    		mno: mno,
			    		content: content
			    }
			      /*  name: $('#name').val(),
			        age: $('#age').val()
			    };*/
			
		}, 
		
		
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data);
			
			/*$('<p/>').text("name : " + data.result.name).appendTo(document.body);
			$('<p/>').text("age : " + data.result.age).appendTo(document.body);*/
			$.each(data.result.fileList, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
			savecount=0;
		}
		
});


/* 민섭 파일 전체 올리기*/
$('#fileAllUpload').fileupload({
	url: '../File/upload4.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: true,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 700,   // 미리보기 이미지 너비
		previewMaxHeight: 560,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {

			console.log('fileuploadprocessalways()...');
			console.log($(this).val())
			console.log(data.files);
			/*console.log(no)*/

			var imagesDiv = $("#text_parent_"+aaa+"").empty();
			adddiv()
			imagesDiv.html("");
			for (var i = 0; i < data.files.length; i++) {
				try {
//					console.log($(this).attr('class').split(' ')[1]);
//					no = location.href.split('?')[1].split('=')[1]
					if (data.files[i].preview.toDataURL) {
						console.log($("#text_parent_" + aaa))
						$("<img>").attr('src', data.files[i].preview.toDataURL()).css('width', '100px').appendTo(imagesDiv);
					}
				} catch (err) {}
			}
			$('#write_save_btn').unbind("click");
			
		}, 
		
		
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data.result);
			var file = data.result.fileList;
			/*$('<p/>').text("name : " + data.result.name).appendTo(document.body);
			$('<p/>').text("age : " + data.result.age).appendTo(document.body);*/
			$.each(data.result.fileList, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
		}
});

var tbody = $('#floating-panel');
/*
$.getJSON('/travelstudio/detail/list.json', function(result) {

   console.log(result.data.list);
       var template = Handlebars.compile($('#map-template').html())
       var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
       tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.


  }) // getJSON(
*/


/*back file up 끝*/