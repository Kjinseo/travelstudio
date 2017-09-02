var fititle = $('#wirte_title'),
fisdt = $('.write_start_date'),
fiedt = $('.write_end_date'),

ficont = $('.text_write_box');
var no = location.href.split('?')[1].split('=')[1]
var mno =0;   
var savecount=0;
$.getJSON('../member/header.json', function(result) {

	console.log(result);
	mno=parseInt(result.mno);
	var template = Handlebars.compile($('#tbody-template2').html())
	var generatedHTML = template(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	tbody.text('') // tbody의 기존 tr 태그들을 지우고
	tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.
})

var d = new Date(); 
var localeDate  =  d.toLocaleDateString(); 


var aaa=0;

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
		
	}, 'json')
	}
});


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



/*back file up 끝*/
/*---------------------------  이 위에는 저장부분    ------------------------*/
/*---------------------------- 여기부터 출력하는 부분-------------*/





var content = $('#text_box');

console.log(no)
var memberno=0;
/*detail 출력*/
var count = 1;
var tbody = $('.day_list')
$.post('/travelstudio/detail/selectedOneDetail.json', {
	'number': no
	},function(result) {
	console.log(result.data.list);
	
	console.log(count)
	for(i=0;i<result.data.list.length;i++){
		console.log(result.data.list[i].cont)
		if(result.data.list[i].cont!=undefined){
	
    $("<div class='day1' onmouseover='onfocus2(ab"+count+", day_btn"+count+")' onmouseleave='onblur2("+"ab"+count+", day_btn"+count+", testdiv"+count+")'>")
    .html(
      "<div class='write_day'> <button onclick='changebuttontoday(day_btn"+count+")' id='day_btn"+count+"'>+ 일차</button>"
      + "<div class='travel_detail_date'></div></div><div class='tool_box'>"
      + "<a href='#' onclick='test("
      + '&#39;'
      + "testdiv"
      + count
      + '&#39;'
      + "); return false;'><span id='ab"+count+"' class='fa fa-plus-circle fa-2x' aria-hidden='true'></span></a>"
      + "<div id='testdiv"+count+"' style='display:none'>"
      + "<a href='javascript:file_browse("+count+")' onclick='test('testdiv_1'); return false;' multiple><img id='testdiv_1' src='./image.png'><input id='file' value="+count+" type='file' style='display:none' name='files' class='file1_"+count+" file1' multiple ></input></a>"
      + "<a href='#' onclick='test("
      + '&#39;'
      + "map_container"
      + '&#39;'
      + "); initialize(); test1("
      + '&#39;'
      + "modal"
      + '&#39;'
      + "); return false;'><img id='testdiv_2' src='./marker.png'></a>"
      + "<a href='#' onclick='test('testdiv_3'); return false;'><img id='testdiv_2' src='./route.png'></img></a>"
      + "</div><br><div id='text_parent_"+count+"'><textarea id='cc' onchange='addition_p("
      + '&#39;'
      + "write_addition"
      + '&#39;'
      + ",&#39;testdiv"+count+"&#39;);' onkeydown='resize(this)' onkeyup='resize(this)' class='text_write_box' placeholder='내용을 입력하세요'>"+result.data.list[i].cont+"</textarea></div><br></div>")
      .appendTo(tbody)
      
      
      count++;
}
		}

      $('#write_addition').css('display', "none");


	
	/*
	var template2 = Handlebars.compile($('#content-template-2').html())
	var generatedHTML2 = template2(result.data)
	content.append(generatedHTML2)*/ 
	
	
	console.log(result.data.list)
	var picno=[]
	var piccount=0;
	for(i=0; i<result.data.list.length;i++){
		if(result.data.list[i].picno!=0){
			
			picno[piccount]=result.data.list[i].picno
			piccount++
		}
	}
	console.log(picno)
	jQuery.ajaxSettings.traditional = true;
	
	var pictures = $('.whole_collage1');
	$.post('/travelstudio/picture/selectByPost.json', {
		'pictureno': picno
	}, function(result) {
		
		console.log(result.fileList)
		for(i=0;i<result.fileList.length;i++){
			console.log(result.fileList[i].path)
			if(result.fileList[i].path!=undefined){
		
	    $("<div class='day1' onmouseover='onfocus2(ab"+count+", day_btn"+count+")' onmouseleave='onblur2("+"ab"+count+", day_btn"+count+", testdiv"+count+")'>")
	    .html(
	      "<div class='write_day'> <button onclick='changebuttontoday(day_btn"+count+")' id='day_btn"+count+"'>+ 일차</button>"
	      + "<div class='travel_detail_date'></div></div><div class='tool_box'>"
	      + "<a href='#' onclick='test("
	      + '&#39;'
	      + "testdiv"
	      + count
	      + '&#39;'
	      + "); return false;'><span id='ab"+count+"' class='fa fa-plus-circle fa-2x' aria-hidden='true'></span></a>"
	      + "<div id='testdiv"+count+"' style='display:none'>"
	      + "<a href='javascript:file_browse("+count+")' onclick='test('testdiv_1'); return false;' multiple><img id='testdiv_1' src='./image.png'><input id='file' value="+count+" type='file' style='display:none' name='files' class='file1_"+count+" file1' multiple ></input></a>"
	      + "<a href='#' onclick='test("
	      + '&#39;'
	      + "map_container"
	      + '&#39;'
	      + "); initialize(); test1("
	      + '&#39;'
	      + "modal"
	      + '&#39;'
	      + "); return false;'><img id='testdiv_2' src='./marker.png'></a>"
	      + "<a href='#' onclick='test('testdiv_3'); return false;'><img id='testdiv_2' src='./route.png'></img></a>"
	      + "</div><br><div id='text_parent_"+count+"'><img src=../"+result.fileList[i].path+"></img></div><br></div>")
	      .appendTo(tbody)
	      
	      
	      count++;
	}
			}
		
		$("<div class='day1' onmouseover='onfocus2(ab"+count+", day_btn"+count+")' onmouseleave='onblur2("+"ab"+count+", day_btn"+count+", testdiv"+count+")'>")
	    .html(
	      "<div class='write_day'> <button onclick='changebuttontoday(day_btn"+count+")' id='day_btn"+count+"'>+ 일차</button>"
	      + "<div class='travel_detail_date'></div></div><div class='tool_box'>"
	      + "<a href='#' onclick='test("
	      + '&#39;'
	      + "testdiv"
	      + count
	      + '&#39;'
	      + "); return false;'><span id='ab"+count+"' class='fa fa-plus-circle fa-2x' aria-hidden='true'></span></a>"
	      + "<div id='testdiv"+count+"' style='display:none'>"
	      + "<a href='javascript:file_browse("+count+")' onclick='test('testdiv_1'); return false;' multiple><img id='testdiv_1' src='./image.png'><input id='file' value="+count+" type='file' style='display:none' name='files' class='file1_"+count+" file1' multiple ></input></a>"
	      + "<a href='#' onclick='test("
	      + '&#39;'
	      + "map_container"
	      + '&#39;'
	      + "); initialize(); test1("
	      + '&#39;'
	      + "modal"
	      + '&#39;'
	      + "); return false;'><img id='testdiv_2' src='./marker.png'></a>"
	      + "<a href='#' onclick='test('testdiv_3'); return false;'><img id='testdiv_2' src='./route.png'></img></a>"
	      + "</div><br><div id='text_parent_"+count+"'><textarea id='cc' onchange='addition_p("
	      + '&#39;'
	      + "write_addition"
	      + '&#39;'
	      + ",&#39;testdiv"+count+"&#39;);' onkeydown='resize(this)' onkeyup='resize(this)' class='text_write_box' placeholder='내용을 입력하세요'></textarea></div><br></div>")
	      .appendTo(tbody)
		
		
		console.log(result.fileList);
		for(i=0;i<result.length;i++){
			console.log(result.fileList);
		}
		console.log(result)
	}, 'json')
	
}) // getJSON()
/*detail 출력 끝*/



/*대표사진 div안에 들어가는 내용*/
var title = $('#blank-one');
/*$.post('/woojinseop2/post/selectOne.json', {},function(result) {
	
}) // getJSON()
*/


	$.post('/travelstudio/post/selectOne.json', {
		'number': no
	}, function(result) {
		console.log(result.data.selectedPost.path);
		memberno=result.data.selectedPost.mno
		$('#blank-one').css("background-image", "url(.."+result.data.selectedPost.cont+"_1920.png)");  
		/*console.log(result.data)*/
		fititle.val(result.data.selectedPost.title)
		fisdt.val(result.data.selectedPost.sdt)
		fiedt.val(result.data.selectedPost.edt)
		
		
	}, 'json')
	
/*대표사진 div안에 들어가는 내용 끝*/





