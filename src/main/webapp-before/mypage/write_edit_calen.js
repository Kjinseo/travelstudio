var fititle = $('#wirte_title'),
fisdt = $('.write_start_date'),
fiedt = $('.write_end_date'),
ficont = $('.text_write_box');
jQuery.ajaxSettings.traditional = true;
var mno =0;   
var savecount=0;
var d = new Date(); 
var localeDate  =  d.toLocaleDateString(); 
var date = new Date();
var content = []

var aaa=0;
var jsPictureList=[];
var photo1=[];
var picnoparentno=[];
var captionArray = []
var detailDateArr = [];
var detailLocArr = [];
var aaa=0;

var countPhoto=0;
setFileUploadToInputTag() // 처음 한 번은 호출하고, 그 다음부터는 태그를 만들 때 호출한다.
imagecount=0;
var submitcount=0;
imagesDiv2=0;



function setFileUploadToInputTag() {
	$('.file1').fileupload({
		url: '../File/upload.json',        // 서버에 요청할 URL
		dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
		sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
		singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
		autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
		disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 700,   // 미리보기 이미지 너비
		previewMaxHeight: 560,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {
			/*injaeUpload();*/
			console.log('fileuploadprocessalways()...');
			console.log($(this).val())
			console.log(data.files);
			var no = $(this).attr('class').split('_')[1].split(' ')[0]
			console.log(no)
			/*console.log(no)*/
			var imagesDiv = $("#text_parent_"+aaa+"");
			imagesDiv2=$("#text_parent_"+aaa+"");
			imagesDiv.html('');
			/*console.log("파일1 업로드 들어옴")
			console.log("파일1 업로드 들어옴")
			console.log("파일1 업로드 들어옴")*/
			if(submitcount==0){
				data.submit();
				submitcount++
			} else {
				return;
			}
		}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
			console.log('submit()...');
			console.log("data-->", data)
			console.log(aaa)
			/*data.formData = {
				srtno: aaa
			}*/
			/*  name: $('#name').val(),
			        age: $('#age').val()
			    };*/
		},
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data.result);
			countPhoto=aaa;
			var file = data.result.fileList[0];
			console.log(data)
			console.log(imagesDiv2)
			for(k=0;k<data.result.fileList.length;k++){
				onlyPath1.push(data.result.fileList[k].filename)
			}
			console.log(data.result.fileList.length)
			if (data.result.fileList.length == 1) {
				$("<div class='whole_collage1' data-countPhoto="+countPhoto+">")
				.html("<div  class='one_photo_col' id='collage1-1" +countPhoto +"'><img id='img_4' src=''></div>"
						+ "</div>"
				).appendTo(imagesDiv2)
				$('#collage1-1'+ countPhoto +'> img').attr('src',data.result.fileList[0].filename + "_700.png").css('width', '809px').css('height','606px');
			} else if (data.result.fileList.length == 2) {
				$("<div class='whole_collage2'>")
				.html("<div  class='two_photo_col' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
						+ "<div  class='two_photo_col' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
						+ "</div>"
				).appendTo(imagesDiv2)
				$('#collage2-1-count'+ countPhoto +'> img').attr('src',data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
				$('#collage2-2-count'+ countPhoto +'> img').attr('src',data.result.fileList[1].filename + "_700.png").css('width', '534px').css('height','534px');
			} else if (data.result.fileList.length == '3') {
				try {
					$("<div class='whole_collage3' data-countPhoto="+countPhoto+">")
					.html("<div class='collage3-big' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
							+ "<div class='collage3_2inner_collage'>"
							+ "<div class='inner_two_collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
							+ "<div class='inner_two_collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
							+ "</div></div>"
					).appendTo(imagesDiv2)
					$('#collage3-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
					$('#collage3-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '260px').css('height','265px');
					$('#collage3-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','265px');

				} catch (err) {}
			}else if (data.result.fileList.length == 4) {
				try {
					$("<div class='whole_collage4' data-countPhoto="+countPhoto+">")
					.html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
							+ "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
							+ "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
							+ " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
							+ "</div>"
					).appendTo(imagesDiv2)

					$('#collage4-1'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage4-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage4-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage4-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '397px').css('height','397px');
				} catch (err) {}    
			} else if (data.result.fileList.length == 5) {
				try {
					$("<div class='whole_collage5' data-countPhoto="+countPhoto+">")
					.html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
							+ "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
							+ "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

							+ "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
							+ "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
							+ "</div>"
					).appendTo(imagesDiv2) 
					$('#collage5-1'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '260px').css('height','260px');
					$('#collage5-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '259px').css('height','260px');
					$('#collage5-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','260px');

					$('#collage5-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage5-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '397px').css('height','397px');
				} catch (err) {}    
			} else if (data.result.fileList.length == 6) {
				try {
					$("<div class='whole_collage6' data-countPhoto="+countPhoto+">")
					.html("<div class='collage6-big' id='collage6-1-big" +countPhoto +"'><img id='img_4' src=''></div>"
							+"<div id='collage6-2side-collage'>"
							+"<div class='side_two_collage' id='collage6-2" +countPhoto +"'><img src=''></div>"
							+"<div class='side_two_collage' id='collage6-3" +countPhoto +"'><img src=''></div>"
							+"</div>"

							+"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
							+"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
							+"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
							+"</div>"
					).appendTo(imagesDiv2) 
					$('#collage6-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
					$('#collage6-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '260px').css('height','265px');
					$('#collage6-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','265px');

					$('#collage6-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '264px').css('height','260px');
					$('#collage6-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '264px').css('height','260px');
					$('#collage6-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '264px').css('height','260px');

				} catch (err) {}    
			} else if (data.result.fileList.length == 7) {
				try {
					$("<div class='whole_collage7' data-countPhoto="+countPhoto+">")
					.html("<div class='four_of_seven'>"
							+"<div class='right_four_of_seven' id='collage7-1-small" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_seven' id='collage7-2-small" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_seven' id='collage7-3-small" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_seven' id='collage7-4-small" +countPhoto +"'><img src=''></div>"
							+"</div>"


							+"<div  class='bottom_three_of_seven' id='collage7-5" +countPhoto +"'><img src=''></div>"
							+"<div  class='bottom_three_of_seven' id='collage7-6" +countPhoto +"'><img src=''></div>"
							+"<div  class='bottom_three_of_seven' id='collage7-7" +countPhoto +"'><img src=''></div>"
							+"</div>"
					).appendTo(imagesDiv2)  
					$('#collage7-1-small'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '192px').css('height','193px');
					$('#collage7-2-small'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '192px').css('height','193px');
					$('#collage7-3-small'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '192px').css('height','193px');
					$('#collage7-4-small'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '192px').css('height','193px');

					$('#collage7-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage7-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage7-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '397px').css('height','397px');


				} catch (err) {}    
			} else if (data.result.fileList.length == 8) {
				try {
					$("<div class='whole_collage8' data-countPhoto="+countPhoto+">")
					.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
							+"<div  id='four_of_eight'>"
							+"<div class='right_four_of_eight' id='collage8-2" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_eight' id='collage8-3" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_eight' id='collage8-4" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_eight' id='collage8-5" +countPhoto +"'><img src=''></div>"
							+"</div>"

							+"<div  class='bottom_three_of_eight' id='collage8-6" +countPhoto +"'><img src=''></div>"
							+"<div  class='bottom_three_of_eight' id='collage8-7" +countPhoto +"'><img src=''></div>"
							+"<div  class='bottom_three_of_eight' id='collage8-8" +countPhoto +"'><img src=''></div>"
							+"</div>"
					).appendTo(imagesDiv2)



					$('#collage8-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage8-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '195px').css('height','195px');
					$('#collage8-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '195px').css('height','195px');
					$('#collage8-4'+ countPhoto +' > img').attr('src',data.result.fileList[3].filename + "_700.png").css('width', '195px').css('height','195px');
					$('#collage8-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '195px').css('height','195px');

					$('#collage8-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '262px').css('height','260px');
					$('#collage8-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '262px').css('height','260px');
					$('#collage8-8'+ countPhoto +' > img').attr('src', data.result.fileList[7].filename + "_700.png").css('width', '262px').css('height','260px');

				} catch (err) {}    
			} else if (data.result.fileList.length == 9) {

				try {
					$("<div class='whole_collage9' data-countPhoto="+countPhoto+">")
					.html("<div  id='collage9-1-big'><img id='img_4' src='ca.jpg'></div>"
							+"<div  class='four_of_nine'>"
							+"<div class='right_four_of_nine' id='collage9-2" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_nine' id='collage9-3" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_nine' id='collage9-4" +countPhoto +"'><img src=''></div>"
							+"<div class='right_four_of_nine' id='collage9-5" +countPhoto +"'><img src=''></div>"
							+"</div>"

							+"<div  class='bottom_four_of_nine' id='collage9-6" +countPhoto +"'><img src=''></div>"
							+"<div  class='bottom_four_of_nine' id='collage9-7" +countPhoto +"'><img src=''></div>"
							+"<div  class='bottom_four_of_nine' id='collage9-8" +countPhoto +"'><img src=''></div>"
							+"<div  class='bottom_four_of_nine' id='collage9-9" +countPhoto +"'><img src=''></div>"
							+"</div>"
					).appendTo(imagesDiv2)

					$('#collage9-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
					$('#collage9-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '195px').css('height','195px');
					$('#collage9-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '195px').css('height','195px');
					$('#collage9-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '195px').css('height','195px');
					$('#collage9-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '195px').css('height','195px');

					$('#collage9-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '195px').css('height','191px');
					$('#collage9-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '195px').css('height','191px');
					$('#collage9-8'+ countPhoto +' > img').attr('src', data.result.fileList[7].filename + "_700.png").css('width', '195px').css('height','191px');
					$('#collage9-9'+ countPhoto +' > img').attr('src', data.result.fileList[8].filename + "_700.png").css('width', '195px').css('height','191px');

				} catch (err) {}    
			} else {

				/* // 사진이 두장이라면
		              var str = photo[i][0].path;

		            try {
		               $("<img>").attr('src', str+"_300.png").css('width', 'auto').appendTo(textParent);
		            } catch (err) {}*/

			} //else
			countPhoto++
			submitcount=0;
			makeDropable($(imagesDiv2).children())
			makeDragable($(imagesDiv2).children())
			adddiv()


		}
	});
}
/*미리보기 파일업로드 끝*/

/*back file 업로드 시작*/
var change=0;

$('#write_save_btn').click(function() {
	console.log("aaaaaaaa")
	if(savecount!=1){
		$('.text_write_box').each(function () {
			/*console.log($(this).val())*/
			content.push($(this).parent().attr('id').split('_')[2])
			content.push(decodeURIComponent($(this).val()))
			console.log($(this).parent().attr('id').split('_')[2])
			/*.attr('class').split('_')[1]*/
			/*console.log(data.files[0])*/
		})

		console.log("저장버튼 눌렀다")
		console.log(ficont.val());
		if(fititle.val() == null){
			alert("제목을 입력해주세요")
		}else if(fisdt.val()== null||fiedt.val()==null){
			alert("날짜를 입력해 주세요")
		}else{
			console.log(content);
			picnosearch()
		}
	}else{
		picnosearch()
	}
});
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
			for (var i = 0; i < data.files.length; i++) {
				try {
					if (data.files[i].preview.toDataURL) {
						console.log($("#text_parent_" + aaa))
						var a = data.files[i].preview.toDataURL()
						console.log(a)
						var img = new Image();
						img.src = a;
						$(".blank-one").css("background-image", "url('" + img.src + "')");

					}
				} catch (err) {}
			} 
			  $(".innerClick").on('click', function () {
		            data.submit();
		        });
		
		}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
			if(change==0){
				console.log('submit()...');
				$('.text_write_box').each(function () {
					console.log($(this).val())
					content.push($(this).parent().attr('id').split('_')[2])
					content.push(decodeURIComponent($(this).val()))
					console.log($(this).parent().attr('id').split('_')[2])
					/*.attr('class').split('_')[1]*/
					console.log(data.files[0])
				})
				console.log(content)

				$('.capt_output').each(function () {
				console.log($(this).attr('id').split('-')[2],$(this).text())
				captionArray.push($(this).attr('id').split('-')[2])
				captionArray.push($(this).text())
			})
			
			$('.travel_detail_date').each(function () {
				var textParentDiv= $('.text_parent',$(this).parents('.day1'))
				if($(this).val() != "" && $('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
					detailDateArr.push(textParentDiv.attr('id').split('_')[2])
					detailDateArr.push($(this).val())
				}
			})
			
			$('.gpsInfo').each(function () {
				var textParentDiv= $('.text_parent',$(this).parents('.day1'))
				if($(this).val() != "" && $('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
					detailLocArr.push(textParentDiv.attr('id').split('_')[2])
					detailLocArr.push($(this).val())
				}
			})
			
			console.log(captionArray)
			
				data.formData = {
					title : decodeURIComponent(fititle.val()),
					sdt: fisdt.val(),
					edt: fiedt.val(),
					mno: mno,
					content: content,
					caption: captionArray,
					travelDate: detailDateArr,
					location: detailLocArr
				}
				change=1;
			};
		},
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('writedone()...');
			console.log(data);
			/*$('<p/>').text("name : " + data.result.name).appendTo(document.body);
	$('<p/>').text("age : " + data.result.age).appendTo(document.body);
	$.each(data.result.fileList, function(index, file) {
		$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
	});*/
			location.href="../jinseoKing/main01.html"
		}
});
/*function saveBtnClick(){
	picnosearch()
	$('#write_save_btn').unbind("click");
}*/

function picnosearch(data){
	console.log("onlypath다")
	console.log(onlyPath1)
	for(i=0;i<onlyPath1.length;i++){
		$.ajaxSettings.traditional = true;
		$.post('../picture/searchthispicture.json', {
			'path': onlyPath1[i]
		}, function(result) {
			var pictureparentno;
			console.log(result.pictureList)
			console.log(result.pictureList.length)
			jsPictureList.push(result.pictureList)
			console.log(jsPictureList)
		}, 'json')
	}
	/*finaladd()*/
	setTimeout("finaladd()",4000);
	setTimeout(console.log(jsPictureList),1000)
}

function finaladd(data){
	console.log(data)
	$('.text_parent').each(function () {
		console.log(this)
		console.log($('.text_parent').children().eq(1).attr('class'))

		if($('.text_parent').children().eq(1).attr('class') ==='tool_box'){
			$('.text_parent').children().eq(1).remove()
		}
		console.log($('.text_parent').children().eq(1).attr('class'))
		console.log($(this).children())

		if($(this).children().eq(0).attr('class') != undefined) {

			if($(this).children().eq(0).attr('class').split('_')[0]=='whole'){
				pictureparentno=$(this).attr('id').split('_')[2]
				console.log("여기 들어옴")
				var photoquantity =$(this).children().attr('class').split('_')[1].charAt(7) 
				console.log(photoquantity)
				switch(photoquantity){

				case '1':compareDbsrcParentsrc(this); break;
				case '2':compareDbsrcParentsrc(this); break;
				case '3':compareDbsrcParentsrc(this); break;
				case '4':compareDbsrcParentsrc(this); break;
				case '5':compareDbsrcParentsrc(this); break;
				case '6':compareDbsrcParentsrc(this); break;
				case '7':compareDbsrcParentsrc(this); break;
				case '8':compareDbsrcParentsrc(this); break;
				case '9': compareDbsrcParentsrc(this); break;
				}
				function compareDbsrcParentsrc(casethis){
					for(z=0; z < jsPictureList.length ;z++){
						for(g=0; g<jsPictureList[z].length;g++){
							for(j=0 ;j<photoquantity;j++){
								console.log($('img',casethis).eq(j).attr('src').substring(0,$('img',casethis).eq(j).attr('src').lastIndexOf('_')))
								if(jsPictureList[z][g].path==$('img',casethis).eq(j).attr('src').substring(0,$('img',casethis).eq(j).attr('src').lastIndexOf('_'))){
									picnoparentno.push(pictureparentno)
									picnoparentno.push(jsPictureList[z][g].picno)
								}
							}
						}
					};
					console.log(picnoparentno);
				}
			} 
		}

		console.log(picnoparentno)
	})

	addAllphoto()

}

function addAllphoto(data){

	$.ajaxSettings.traditional = true;
	$.post('../detail/addAllphoto.json', {
		'picnoandparentno': picnoparentno
	}, function(result) {
		console.log(result);
	}, 'json')
	if(savecount!=1){
		setTimeout("noBackgroundSave()",2000)
	}else{
		setTimeout($('.innerClick').click(),3000);
		console.log('innerclick')
	}
}

function noBackgroundSave(){
	jQuery.ajaxSettings.traditional = true;
	$.post('../post/add.json', {
		title : decodeURIComponent(fititle.val()),
		sdt: fisdt.val(),
		edt: fiedt.val(),
		mno: mno,
		content: content
	}, function(result) {
		console.log(result.data)
	}, 'json')
}

/* 민섭 파일 전체 올리기*/


$('#fileAllUpload').fileupload({
	url: '../File/upload3.json',        // 서버에 요청할 URL
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

			console.log('fileuploadprocessalways()...', data.loaded, data.total);
			console.log($(this).val())
			console.log(data.files);
			/*console.log(no)*/
			
	        var progress = parseInt(data.loaded / data.total * 100, 10);
	        $('#progress .bar').css(
	            'width',
	            progress + '%'
	        );
			
/*			var imagesDiv = $("#text_parent_"+aaa+"").empty();
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
			}*/
			/*$('#write_save_btn').unbind("click");*/
		}, 
		
		
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data._response);
			console.log(data._response.result[0].path)
			var file = data.result.fileList;
			/*$('<p/>').text("name : " + data.result.name).appendTo(document.body);
			$('<p/>').text("age : " + data.result.age).appendTo(document.body);*/
			$.each(data.result.fileList, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
			console.log(data.result.length);
			var imagesDiv = $("#text_parent_"+aaa+"").empty();
			imagesDiv.html("");
//			$('#p_save_btn').click(function() {
			plus(data);
			onlyPath(data);
			var countPhoto = aaa;
			console.log("photo길이 =======>")
			console.log(photo.length)
			for(var i = 0; i < photo.length; i++){

			
			var textParent= $("#text_parent_"+countPhoto+"")
			if (photo[i].length == 1) {
               $("<div class='whole_collage1' data-countPhoto="+countPhoto+">")
               .html("<div  class='one_photo_col' id='collage1-1" +countPhoto +"'><img id='img_4' src=''></div>"
                     + "</div>"
                     + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
                     + "<ul class='clrfix' >"
    			     + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
    			     + "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
    			     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
    			     + "</ul>"
    			     + "</div>"
    			     + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
               ).appendTo(textParent)
               $('#collage1-1'+ countPhoto +'> img').attr('src',photo[i][0].path + "_600.png").css('width', '809px').css('height','606px');
               $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
               if(photo[i][0].lati != null && photo[i][0].longit != null) {
                  var lat = photo[i][0].lati
                  var long = photo[i][0].longit
                  googleapisView(lat, long, countPhoto)
               }
               $('.tool_box').remove()
               deletephoto(countPhoto)
//               popCaptionModal(countPhoto)
			

            } else if (photo[i].length == 2) {
			    $("<div class='whole_collage2' data-countPhoto="+countPhoto+" id='TP-collage-" +countPhoto +"'>")
			    .html("<div  class='two_photo_col 2-collage' id='collage2-1-count-" +countPhoto +"'><img id='img_4' src=''></div>"
			     + "<div  class='two_photo_col 2-collage ' id='collage2-2-count-" +countPhoto +"'><img id='img_4' src=''></div>"
			     + "</div>"
			     + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
			     + "<ul class='clrfix' >"
			     + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
			     + "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
			     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
			     + "</ul>"
			     + "</div>"
			     + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
			     
			     ).appendTo(textParent)
			     $('#collage2-1-count-'+ countPhoto +'> img').attr('src', photo[i][0].path + "_600.png").css('width', '534px').css('height','534px');
			     $('#collage2-2-count-'+ countPhoto +'> img').attr('src', photo[i][1].path + "_600.png").css('width', '534px').css('height','534px');
			     $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			     
			     if(photo[i][0].lati != null && photo[i][0].longit != null) {
			    	 var lat = photo[i][0].lati
			    	 var long = photo[i][0].longit
			    	 googleapisView(lat, long, countPhoto)
			     }
			     
			     $('.tool_box').remove()
			     deletephoto(countPhoto)
//			     popCaptionModal(countPhoto)
//			     saveBtn(countPhoto)
//			     modalOpen()
			     
			} else if (photo[i].length == 3) {
				
//				var str = ".." + data._response.result[i].path;
//				var dataSource = data._response.result[i].path
				
				try {
				  $("<div class='whole_collage3' data-countPhoto="+countPhoto+">")
				  .html("<div class='collage3-big 3-collage' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
				   + "<div class='collage3_2inner_collage'>"
				   + "<div class='inner_two_collage 3-collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
				   + "<div class='inner_two_collage 3-collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
				   + "</div></div>"
				   
				   + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
				     + "<ul class='clrfix'>"
				     + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
				     + "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
				     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				     + "</ul>"
				     + "</div>"
				     + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
				   ).appendTo(textParent)
					$('#collage3-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_600.png").css('width', '534px').css('height','534px');
					$('#collage3-2'+ countPhoto +' > img').attr('src', photo[i][1].path +"_300.png").css('width', '260px').css('height','265px');
					$('#collage3-3'+ countPhoto +' > img').attr('src', photo[i][2].path +"_300.png").css('width', '260px').css('height','265px');
					
					$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
					if(photo[i][0].lati != null && photo[i][0].longit != null) {
			    	 var lat = photo[i][0].lati
			    	 var long = photo[i][0].longit
			    	 googleapisView(lat, long, countPhoto)
					}
			     $('.tool_box').remove()
			     deletephoto(countPhoto)
			     
				} catch (err) {}
			}else if (photo[i].length == 4) {
				
				try {
			    $("<div class='whole_collage4' data-countPhoto="+countPhoto+">")
			    .html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
			     + "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
			     + "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
			     + " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
			     + "</div>"
			     
			     + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
			     + "<ul class='clrfix'>"
			     + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
			     
			     + "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
			     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
			     + "</ul>"
			     + "</div>"
			     + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
			     ).appendTo(textParent)
			     
			    $('#collage4-1'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage4-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage4-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage4-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			    
				if(photo[i][0].lati != null && photo[i][0].longit != null) {
		    	 var lat = photo[i][0].lati
		    	 var long = photo[i][0].longit
		    	 googleapisView(lat, long, countPhoto)
				}
			    
			    $('.tool_box').remove()
			    deletephoto(countPhoto)
				} catch (err) {} 	
			} else if (photo[i].length == 5) {
				
				try {
				  $("<div class='whole_collage5' data-countPhoto="+countPhoto+">")
				  .html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
				  + "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
				  + "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

				  + "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
				  + "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
				  + "</div>"
				  
  			      + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
			      + "<ul class='clrfix'>"
			      + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
			      
			      + "<li><button type='button' class='btn_caption'>캡션</button></li>"
			      + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
			      + "</ul>"
			      + "</div>"
			      + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
			      
			    ).appendTo(textParent) 
			    $('#collage5-1'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '260px').css('height','260px');
			    $('#collage5-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '259px').css('height','260px');
			    $('#collage5-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','260px');
			    
			    $('#collage5-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage5-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			    
			    if(photo[i][0].lati != null && photo[i][0].longit != null) {
		    	 var lat = photo[i][0].lati
		    	 var long = photo[i][0].longit
		    	 googleapisView(lat, long, countPhoto)
				}
			    
			    $('.tool_box').remove()
			    deletephoto(countPhoto)
				} catch (err) {} 	
			} else if (photo[i].length == 6) {
				
				try {
				  $("<div class='whole_collage6' data-countPhoto="+countPhoto+">")
				   .html("<div class='collage6-big' id='collage6-1-big" +countPhoto +"'><img id='img_4' src=''></div>"
				    +"<div id='collage6-2side-collage'>"
				    +"<div class='side_two_collage' id='collage6-2" +countPhoto +"'><img src=''></div>"
				    +"<div class='side_two_collage' id='collage6-3" +countPhoto +"'><img src=''></div>"
				    +"</div>"

				    +"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
				    +"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
				    +"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
				    +"</div>"
				    
				    + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
				    + "<ul class='clrfix'>"
				    + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
				    
				    + "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
				    + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				    + "</ul>"
				    + "</div>"
				    + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
				    ).appendTo(textParent)
				    
			    $('#collage6-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_600.png").css('width', '534px').css('height','534px');
			    $('#collage6-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '260px').css('height','265px');
			    $('#collage6-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','265px');
			    
			    $('#collage6-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '264px').css('height','260px');
			    $('#collage6-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '264px').css('height','260px');
			    $('#collage6-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '264px').css('height','260px');
			    $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			    
			    if(photo[i][0].lati != null && photo[i][0].longit != null) {
		    	 var lat = photo[i][0].lati
		    	 var long = photo[i][0].longit
		    	 googleapisView(lat, long, countPhoto)
				}
			    
			    $('.tool_box').remove()
			    deletephoto(countPhoto)
			    
				} catch (err) {} 	
			} else if (photo[i].length == 7) {
				try {
				  $("<div class='whole_collage7' data-countPhoto="+countPhoto+">")
			       .html("<div class='four_of_seven'>"
			       +"<div class='right_four_of_seven 7-collage' id='collage7-1-small" +countPhoto +"'><img src=''></div>"
			       +"<div class='right_four_of_seven 7-collage' id='collage7-2-small" +countPhoto +"'><img src=''></div>"
			       +"<div class='right_four_of_seven 7-collage' id='collage7-3-small" +countPhoto +"'><img src=''></div>"
			       +"<div class='right_four_of_seven 7-collage' id='collage7-4-small" +countPhoto +"'><img src=''></div>"
			       +"</div>"


			       +"<div  class='bottom_three_of_seven 7-collage' id='collage7-5" +countPhoto +"'><img src=''></div>"
			       +"<div  class='bottom_three_of_seven 7-collage' id='collage7-6" +countPhoto +"'><img src=''></div>"
			       +"<div  class='bottom_three_of_seven 7-collage' id='collage7-7" +countPhoto +"'><img src=''></div>"
			       +"</div>"
			       
			       	 + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
				     + "<ul class='clrfix'>"
				     + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
				     
				     + "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
				     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				     + "</ul>"
				     + "</div>"
				     + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
				    ).appendTo(textParent)  
				    $('#collage7-1-small'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '192px').css('height','193px');
				    $('#collage7-2-small'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '192px').css('height','193px');
				    $('#collage7-3-small'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '192px').css('height','193px');
				    $('#collage7-4-small'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '192px').css('height','193px');
				    
				    $('#collage7-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '397px').css('height','397px');
				    $('#collage7-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '397px').css('height','397px');
				    $('#collage7-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '397px').css('height','397px');
				    $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			     console.log(photo[i][0])
			     console.log(photo[i][1])
			     if(photo[i][0].lati != null && photo[i][0].longit != null) {
			    	 var lat = photo[i][0].lati
			    	 var long = photo[i][0].longit
			    	 googleapisView(lat, long, countPhoto)
			     }
			     $('.tool_box').remove()
//			     showControlBox()
			     deletephoto(countPhoto)
				} catch (err) {} 	
			} else if (photo[i].length == 8) {
				
				try {
					$("<div class='whole_collage8' data-countPhoto="+countPhoto+">")
					.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
				     +"<div  id='four_of_eight'>"
				     +"<div class='right_four_of_eight' id='collage8-2" +countPhoto +"'><img src=''></div>"
				     +"<div class='right_four_of_eight' id='collage8-3" +countPhoto +"'><img src=''></div>"
				     +"<div class='right_four_of_eight' id='collage8-4" +countPhoto +"'><img src=''></div>"
				     +"<div class='right_four_of_eight' id='collage8-5" +countPhoto +"'><img src=''></div>"
				     +"</div>"

				     +"<div  class='bottom_three_of_eight' id='collage8-6" +countPhoto +"'><img src=''></div>"
				     +"<div  class='bottom_three_of_eight' id='collage8-7" +countPhoto +"'><img src=''></div>"
				     +"<div  class='bottom_three_of_eight' id='collage8-8" +countPhoto +"'><img src=''></div>"
				     +"</div>"
				     
				     + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
				     + "<ul class='clrfix'>"
				     + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
				     
				     + "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
				     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				     + "</ul>"
				     + "</div>"
				     + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
				     ).appendTo(textParent)
				  

					
			    $('#collage8-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage8-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage8-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage8-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage8-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '195px').css('height','195px');
			    
			    $('#collage8-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '262px').css('height','260px');
			    $('#collage8-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '262px').css('height','260px');
			    $('#collage8-8'+ countPhoto +' > img').attr('src', photo[i][7].path+"_300.png").css('width', '262px').css('height','260px');
			    $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			    
			    if(photo[i][0].lati != null && photo[i][0].longit != null) {
			    	 var lat = photo[i][0].lati
			    	 var long = photo[i][0].longit
			    	 googleapisView(lat, long, countPhoto)
			     }
			     $('.tool_box').remove()
//			     showControlBox()
			     deletephoto(countPhoto)
			     
				} catch (err) {} 	
			} else if (photo[i].length == 9) {
				try {
				    $("<div class='whole_collage9' data-countPhoto="+countPhoto+">")
				     .html("<div class='one_of_nine' id='collage9-1-big"+countPhoto+"'><img id='img_4' src=''></div>"
				      +"<div  class='four_of_nine'>"
				      +"<div class='right_four_of_nine' id='collage9-2" +countPhoto +"'><img src=''></div>"
				      +"<div class='right_four_of_nine' id='collage9-3" +countPhoto +"'><img src=''></div>"
				      +"<div class='right_four_of_nine' id='collage9-4" +countPhoto +"'><img src=''></div>"
				      +"<div class='right_four_of_nine' id='collage9-5" +countPhoto +"'><img src=''></div>"
				      +"</div>"

				      +"<div  class='bottom_four_of_nine' id='collage9-6" +countPhoto +"'><img src=''></div>"
				      +"<div  class='bottom_four_of_nine' id='collage9-7" +countPhoto +"'><img src=''></div>"
				      +"<div  class='bottom_four_of_nine' id='collage9-8" +countPhoto +"'><img src=''></div>"
				      +"<div  class='bottom_four_of_nine' id='collage9-9" +countPhoto +"'><img src=''></div>"
				      +"</div>"
				      
				      + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
					  + "<ul class='clrfix'>"
					  + "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
					  
					  + "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
					  + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
					  + "</ul>"
					  + "</div>"
					  + "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
					  
//					  + "</div>"
				  ).appendTo(textParent)
					
			    $('#collage9-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage9-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage9-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage9-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage9-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '195px').css('height','195px');
			    
			    $('#collage9-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '195px').css('height','191px');
			    $('#collage9-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '195px').css('height','191px');
			    $('#collage9-8'+ countPhoto +' > img').attr('src', photo[i][7].path+"_300.png").css('width', '195px').css('height','191px');
			    $('#collage9-9'+ countPhoto +' > img').attr('src', photo[i][8].path+"_300.png").css('width', '195px').css('height','191px');
			    $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			    
			    if(photo[i][0].lati != null && photo[i][0].longit != null) {
			    	 var lat = photo[i][0].lati
			    	 var long = photo[i][0].longit
			    	 googleapisView(lat, long, countPhoto)
			     }
			     $('.tool_box').remove()
//			     showControlBox()
			     deletephoto(countPhoto)
				} catch (err) {} 	
			} else {
			
				// 사진이 두장이라면
				  var str = photo[i][0].path;
				  
				try {
					$("<img>").attr('src', str+"_300.png").css('width', 'auto').appendTo(textParent);
				} catch (err) {}

			} //else
			countPhoto++
			adddiv()
			
			makeDropable($(textParent).children())
			makeDragable($(textParent).children())
			} // 사진 for문
		} //done
});

function showControlBox(count) {
	$(document).ready(function() {
	    if($('#control-box-div-'+count).css("display") == "block") {
	      $('#control-box-div-'+count).css('display', 'none');
	    } else {
	  $('#control-box-div-'+count).css('display', 'block');
	}
	console.log("누름")
	})
	return false;
}

$(document.body).on('click','.btn_caption', function() {
	console.log(this)
	thisPP = $(this)
	console.log("되라좀")
	$('.caption_modal').css('display', 'block')
})

$(document.body).on('click','.btn_add', function() {
			console.log('add==========>')
			var divThis = $(this).attr('data-addno')
			findNeedUpdateNo(divThis)
			addbtn_adddiv(divThis)
			console.log(divThis)

})


function findNeedUpdateNo(beforePlus) {
	var nextPlusSpot = parseInt(beforePlus) + 1
	var textParentDiv;
	console.log($('.text_parent').size())
	console.log(nextPlusSpot)
	for (var i = $('.text_parent').size()-1 ; i >= nextPlusSpot ; i--) {
		
//		textParentDiv = $('#text_parent_'+ i).children()
//		var test = $('img' ,textParentDiv).parent().attr('id');
//		var testSplit = test.split('-')
//		console.log(textParentDiv)
//		console.log($('img' ,$('#text_parent_'+ i).children()).parent(''))
//		console.log($('img' ,textParentDiv).parent().attr('id').split('-'))
		
		
		$('.btn_add','#text_parent_'+ i).attr('data-addno', i+1)
		$('.btn_add','#text_parent_'+ i).attr('id', 'addbtn-' + (i+1))
		
		$('.btn_caption','#text_parent_'+ i).attr('data-capno', i+1)
		$('.btn_caption','#text_parent_'+ i).attr('id', 'edtbtn-' + (i+1))		
		$('.btn_del','#text_parent_'+ i).attr('id', 'delbtn-' + (i+1))
		
		console.log('확인하세요')
		if($('.control_box','#text_parent_'+ i).attr('id') != undefined) {
			$('.control_box','#text_parent_'+ i).attr('id','control-box-div-' + (i+1))
		}
		$('.capt_output', '#text_parent_'+ i).attr('id', 'txt-output-'+(i+1))
		
		if($('.file_browse', '#text_parent_'+ i).attr('class') != undefined) {
			$('.file_browse', '#text_parent_'+ i).attr('href','javascript:file_browse('+ (i+1) +')')
		}
		
		if($('.create_box', '#text_parent_'+ i).attr('class') != undefined) {
			$('.create_box','#text_parent_'+ i).attr('onclick', 'createtextbox('+ (i+1) +')')
		}
		
		console.log($('#text_parent_'+ i).attr('onclick','showControlBox('+ (i+1) +')'))
		$('#text_parent_'+ i).attr('data-textparent', (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) + 1))
		$('#text_parent_'+ i).attr('id', 'text_parent_' + (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) + 1))
		
	}
}

$(document.body).on('click','#capt-save', function() {
	console.log(thisPP.attr('data-capno'))
	
	console.log("되라좀aa")
	event.stopPropagation()
	let capTxt = $('#cap-txt').val()
	console.log($('.capt_output' ,'div[data-textparent='+ thisPP.attr('data-capno') +']'))
	$('.capt_output' ,'div[data-textparent='+ thisPP.attr('data-capno') +']').text(capTxt);
	console.log(capTxt)
	
	captionArray.push()
	
})
captionArray=[]
$(document).ready(function () {

	
	$('#capt-cancel').click(function() {
		$('.caption_modal').css('display', 'none')
		$('#control-box-div-'+count).css('display', 'none');
		$('#cap-txt').val('');
		console.log("닫히냐")
	})

})


/*function popCaptionModal(countPhoto) {
	$('#edtbtn-'+countPhoto).click(function() {
		console.log("눌렀냐")
		$('.caption_modal').css('display', 'block') 
		event.stopPropagation()
	})
}*/
var deleteTextParent = [];
var deletePhoto = [];

function deletephoto(countPhoto) {
//	$(document).ready(function() {
	$('#delbtn-'+countPhoto).click(function() {
		deleteTextParent = $(this).parents('.text_parent')
		console.log($(this).parents('.text_parent'))
		var deleteTextParentChild =deleteTextParent.children();

//		console.log(deleteTextParent.children('#whole_collage2'+countPhoto))
		
		for (var i = 0;i < $('img',deleteTextParentChild).length; i++) {
			console.log("ㅇㅇ")
			console.log($('img',deleteTextParentChild).eq(i).attr('src').slice(0, -8))
			console.log("경로 자르기")
			var cut = [];
			deletePhoto.push($('img',deleteTextParentChild).eq(i).attr('src').slice(0, -8))

		} //for 
		
		// 태그 번호 끝 자리부터 감소
		var presentSpot = $(this).parents('.text_parent').attr('id').split('_')[2]
		console.log(presentSpot)
		for (var i = $('.text_parent').size()-1 ; i > presentSpot  ; i--) {
			$('.btn_add','#text_parent_'+ i).attr('data-addno', i-1)
			$('.btn_add','#text_parent_'+ i).attr('id', 'addbtn-' + (i-1))
			
			$('.btn_caption','#text_parent_'+ i).attr('data-capno', i-1)
			$('.btn_caption','#text_parent_'+ i).attr('id', 'edtbtn-' + (i-1))		
			$('.btn_del','#text_parent_'+ i).attr('id', 'delbtn-' + (i-1))
			
			console.log('확인하세요')
			if($('.control_box','#text_parent_'+ i).attr('id') != undefined) {
				$('.control_box','#text_parent_'+ i).attr('id','control-box-div-' + (i-1))
			}
			$('.capt_output', '#text_parent_'+ i).attr('id', 'txt-output-'+(i-1))
			
			if($('.file_browse', '#text_parent_'+ i).attr('class') != undefined) {
				$('.file_browse', '#text_parent_'+ i).attr('href','javascript:file_browse('+ (i-1) +')')
			}
			
			if($('.create_box', '#text_parent_'+ i).attr('class') != undefined) {
				$('.create_box','#text_parent_'+ i).attr('onclick', 'createtextbox('+ (i-1) +')')
			}
			
			console.log($('#text_parent_'+ i).attr('onclick','showControlBox('+ (i-1) +')'))
			$('#text_parent_'+ i).attr('data-textparent', (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) - 1))
			$('#text_parent_'+ i).attr('id', 'text_parent_' + (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) - 1))
			
		}
		
		
		console.log(countPhoto)
		delPhotoTransm()
		event.stopPropagation()
		console.log(deletePhoto)
		console.log($(this).parents('.text_parent').parent())
		$(this).parents('.text_parent').parent().remove()
	})
}

var photo = [];
var dataa=[]



function delPhotoTransm() {
	$.ajaxSettings.traditional = true;
	$.post('../picture/delete.json', {
		'deletePhoto' : deletePhoto 
	}, function(result) {
		console.log(result);
		deletePhoto.splice(0,deletePhoto.length); 
	}, 'json')
//	removeDiv(countPhoto)
}

function plus(dataa){

	//사진 sortNo 중복값 제거하고 배열에 담기
	var sortNo = []
	for(j = 0; j < dataa.result.length; j++) {
		sortNo[j] = dataa.result[j].sortno;
		var classify = sortNo.filter(function(itm,k,sortNo) {
			return k==sortNo.indexOf(itm);
		})
	}
	//사진 sortNo 중복값 제거하고 배열에 담기 끝

	var photoData = []
	var countaa=0
	console.log("==============>")


	for(var i = 0; i< dataa.result.length; i++) {
		var sortno = dataa.result[i].sortno
		if (photo[sortno] == undefined) {
			photo[sortno] = []
		}
		photo[sortno].push(dataa.result[i])

	}
	console.log("함수안에서 photo 출력=====>")
	console.log(photo)
	return photo

}

function onlyPath(dataa){

	//사진 sortNo 중복값 제거하고 배열에 담기
	var sortNo = []
	for(j = 0; j < dataa.result.length; j++) {
		sortNo[j] = dataa.result[j].sortno;
		var classify = sortNo.filter(function(itm,k,sortNo) {
			return k==sortNo.indexOf(itm);
		})
	}
	//사진 sortNo 중복값 제거하고 배열에 담기 끝

	var photoData = []
	var countaa=0
	console.log("==============>")


	for(var i = 0; i< dataa.result.length; i++) {
		var sortno = dataa.result[i].sortno
		if (photo[sortno] == undefined) {
			photo[sortno] = []
		}
		photo[sortno].push(dataa.result[i].path)

	}
	console.log("함수안에서 photo 출력=====>")
	console.log(photo)
	return photo

}

function filePath(dataSource, no) {
	var str = ".." + data._response.result[no].path
	return str;	
}



function googleapisView(lat, lon, countPhoto) {
	var lat = lat; // 위도
	var lng = lon; // 경도

	var geocode = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false";
	jQuery.ajax({
		url: geocode,
		type: 'POST',
		success: function(myJSONResult){
			if(myJSONResult.status == 'OK') {
				var tag = "";
				var i;
				var koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
					//				var englishCheck = /^[0-9]/ 
					var englishCheck = /[a-zA-Z]/
						var gpsinfo = myJSONResult.results[1].formatted_address
						var nationName = gpsinfo.split(' ')[0]
				var cityName = gpsinfo.split(' ')[1]


				if(koreanCheck.test(nationName) == false) {
					console.log("야")
					cityName = gpsinfo.split(' ')[gpsinfo.split(' ').length-2]

					if(koreanCheck.test(cityName) == false) {
						for (var cn = 0; cn < gpsinfo.split(' ').length-1 ; cn++) {
							cityName = gpsinfo.split(' ')[cn]
							if(koreanCheck.test(cityName) == true) {
								console.log("도시이름 한글체크")
								cityName = gpsinfo.split(' ')[cn]
								console.log(cityName)
								break;
							} else if(englishCheck.test(cityName) == true) {
								console.log("도시이름 영어체크")
								cityName = gpsinfo.split(' ')[cn]
								console.log(cityName)
								break;
							}
						}
					}
					nationName =gpsinfo.split(' ')[gpsinfo.split(' ').length-1]

				} else {
					if (nationName == "대한민국") {
						nationName= "한국"	
					} else {
						nationName = gpsinfo.split(' ')[0]
						cityName = gpsinfo.split(' ')[1]
					} 	
				}
				console.log(gpsinfo.split(' '))
				$("#location-info-"+countPhoto).attr("value", nationName + " " + cityName)

			} else if(myJSONResult.status == 'ZERO_RESULTS') {
				alert("지오코딩이 성공했지만 반환된 결과가 없음을 나타냅니다.\n\n이는 지오코딩이 존재하지 않는 address 또는 원격 지역의 latlng을 전달받는 경우 발생할 수 있습니다.")
			} else if(myJSONResult.status == 'OVER_QUERY_LIMIT') {
				alert("할당량이 초과되었습니다.");
			} else if(myJSONResult.status == 'REQUEST_DENIED') {
				alert("요청이 거부되었습니다.\n\n대부분의 경우 sensor 매개변수가 없기 때문입니다.");
			} else if(myJSONResult.status == 'INVALID_REQUEST') {
				alert("일반적으로 쿼리(address 또는 latlng)가 누락되었음을 나타냅니다.");
			}
		}
	});

}


var onlyPath1=[]
function onlyPath(dataa){

	//사진 sortNo 중복값 제거하고 배열에 담기
	var sortNo = []
	for(j = 0; j < dataa.result.length; j++) {
		sortNo[j] = dataa.result[j].sortno;
		var classify = sortNo.filter(function(itm,k,sortNo) {
			return k==sortNo.indexOf(itm);
		})
	}
	//사진 sortNo 중복값 제거하고 배열에 담기 끝

	var photoData = []
	var countaa=0
	console.log("==============>")


	for(var i = 0; i< dataa.result.length; i++) {
		var sortno = dataa.result[i].sortno
		if (onlyPath1[sortno] == undefined) {
			onlyPath1[sortno] = []
		}
		onlyPath1[sortno].push(dataa.result[i].path)

	}
	console.log("함수안에서 photo 출력=====>")
	console.log(onlyPath1)
	return onlyPath1

}

/*back file up 끝*/




/* 드래그드롭 시작*/

function makeDragable($thisclass){
	console.log('makedraggable')
	for(i=0; i< $("img",$thisclass).length;i++){
		console.log($("img",$thisclass).parent())
		$(function() {
			$( $("img",$thisclass).eq(i).parent() ).draggable({
				revert: 'invalid', 	
				start: function(){
					console.log('start')
					/*currentCollageSize=$(this).parent().attr('class').split('_')[1].charAt(7)*/
				},/* start끝 */
				stop: function() {
					console.log(this)
					currentParent = $thisclass
					console.log(currentParent)
					console.log($($thisclass).attr('class'))
					console.log(this.parents('.text_parent').children().attr('class'))
					if($thisclass==this.parents('.text_parent').children())
					console.log('stop')
					/*if(dropdiv!=currentCollageSize){
					stopFunction(currentParent,this,currentParent.attr('data-countPhoto'))
					}*/
				}  
			});
		})
	}
}



function stopFunction(currentParent,$this,stopCountPhoto){ //currentParent는 wholecollage this는 이미지의 페어런츠태그
	var stopFunctionArray=[];
	arraycount=0;

	console.log('stop펑션의 카운트포토',stopCountPhoto)
	var textParentNo=$(currentParent).parent().attr('id').split('_')[1]
	for(i=0; i<$('img', currentParent).length;i++){
		if($('img', currentParent).eq(i).attr('src')!=$($this).children().attr('src')){
			stopFunctionArray.push($('img',currentParent).eq(i).attr('src'))
		}
		console.log('커런트 페어런츠 소스',$('img',currentParent).eq(i).attr('src'))
		console.log('디스 이미지 소스',$('img',$this).attr('src'))
		console.log('디스 이미지 소스 차일드로 찾기',$($this).children().attr('src'))
		console.log(stopFunctionArray[i])
	}
	console.log(currentParent)
	console.log($(currentParent).parent())
	console.log(stopFunctionArray)
	countPhoto=0;
	/* if(currentCollageSize */
	console.log($(currentParent).attr('class').split('_')[1].charAt(7))
	var textParent= $("#text_parent_"+countPhoto+"")
	if ($(currentParent).attr('class').split('_')[1].charAt(7) == '1') {
		var textParentNo=$(currentParent).parent().attr('id').split('_')[1]
		$('.text_parent').each(function(){
			if($(this).attr('id').split('_')[1]>textParentNo){
				$(this).attr('id',$(this).attr('id').split('_')[0]+"_"+$(this).attr('id').split('_')[1]-1).split[i]
			}
		})
		$(currentParent).parent().parent().remove();
		$("<div class='whole_collage1'>")
		stopFunctionArray=[]
		uiremove($this)
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '2') {

		$(currentParent)
		.html("<div  class='one_photo_col' id='collage1-1" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+ "</div>"
				+ "<div class='control_box' id='control-box-div-"+stopCountPhoto+"'>"
				+ "<ul class='clrfix'>"
				+ "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				+ "<li><button type='button' class='btn_edit'>편집</button></li>"
				+ "<li><button type='button' class='btn_caption' id='edtbtn-"+stopCountPhoto+"'>캡션</button></li>"
				+ "<li><button type='button' class='btn_del' id='delbtn-"+stopCountPhoto+"'>삭제</button></li>"
				+ "</ul>"
				+ "</div>"
		)
		$('#collage1-1'+ stopCountPhoto +'> img').attr('src',stopFunctionArray[0]).css('width', '809px').css('height','606px');
		$(currentParent).attr("class","whole_collage1")
		makeDropable($(currentParent))
		makeDragable($(currentParent))
		stopFunctionArray=[]
		uiremove($this)
	}else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '3') {
		$(currentParent)
		.html("<div  class='two_photo_col draggable' id='collage2-1-count" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+ "<div  class='two_photo_col draggable' id='collage2-2-count" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+ "</div>")
				$('#collage2-1-count'+ stopCountPhoto +'> img').attr('src',stopFunctionArray[0]).css('width', '534px').css('height','534px');
		$('#collage2-2-count'+ stopCountPhoto +'> img').attr('src',stopFunctionArray[1]).css('height','534px');
		/*      console.log(photo[i][0])
	              console.log(photo[i][1]) */
		$(currentParent).attr("class","whole_collage2")
		makeDropable($(currentParent))
		makeDragable($(currentParent))
		stopFunctionArray.splice(0,stopFunctionArray.length)
		uiremove($this)
		stopFunctionArray=[]
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '4') {


		$(currentParent)
		.html("<div class='collage3-big' id='collage3-1-big"+stopCountPhoto+"'><img src=''></div>"
				+ "<div class='collage3_2inner_collage'>"
				+ "<div class='inner_two_collage' id='collage3-2"+stopCountPhoto+"'><img src=''></div>"
				+ "<div class='inner_two_collage' id='collage3-3"+stopCountPhoto+"'><img src=''></div>"
				+ "</div></div>")
				$('#collage3-1-big'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '534px').css('height','534px');
		$('#collage3-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '260px').css('height','265px');
		$('#collage3-3'+ stopCountPhoto +' > img').attr('src',stopFunctionArray[2]).css('width', '260px').css('height','265px');
		$(currentParent).attr("class","whole_collage3")
		makeDropable($(currentParent))
		makeDragable($(currentParent))
		stopFunctionArray=[]
	}else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '5') {

		$(currentParent)
		.html("<div class='four_photo_collage' id='collage4-1" +stopCountPhoto +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-2" +stopCountPhoto +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-3" +stopCountPhoto +"'><img src=''></div>"
				+ " <div class='four_photo_collage' id='collage4-4" +stopCountPhoto +"'><img src=''></div>"
		)

		$('#collage4-1'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '397px').css('height','397px');
		$('#collage4-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '397px').css('height','397px');
		$('#collage4-3'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '397px').css('height','397px');
		$('#collage4-4'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '397px').css('height','397px');
		$(currentParent).attr("class","whole_collage4")
		stopFunctionArray=[]
		makeDropable($(currentParent))
		makeDragable($(currentParent))
		uiremove($this)
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '6') {

		$(currentParent)
		.html("<div  class='top_three_collage' id='collage5-1" +stopCountPhoto +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-2" +stopCountPhoto +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-3" +stopCountPhoto +"'><img src=''></div>"

				+ "<div  class='bottom_two_collage' id='collage5-4" +stopCountPhoto +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-5" +stopCountPhoto +"'><img src=''></div>")
				$('#collage5-1'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '260px').css('height','260px');
		$('#collage5-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '259px').css('height','260px');
		$('#collage5-3'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '260px').css('height','260px');

		$('#collage5-4'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '397px').css('height','397px');
		$('#collage5-5'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[4]).css('width', '397px').css('height','397px');
		$(currentParent).attr("class","whole_collage5")
		stopFunctionArray=[]
		makeDropable($(currentParent))
		makeDragable($(currentParent))
		uiremove($this)
	}else if($(currentParent).attr('class').split('_')[1].charAt(7)=='7'){

		$(currentParent)
		.html("<div class='collage6-big' id='collage6-1-big'" +stopCountPhoto +"><img id='img_4' src=''></div>"
				+"<div id='collage6-2side-collage'>"
				+"<div class='side_two_collage' id='collage6-2'" +stopCountPhoto +"><img src=''></div>"
				+"<div class='side_two_collage' id='collage6-3'" +stopCountPhoto +"><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_three_collage' id='collage6-4" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-5" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-6" +stopCountPhoto +"'><img id='img_4' src=''></div>"
		)
		$('#collage6-1-big'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '534px').css('height','534px');
		$('#collage6-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '260px').css('height','265px');
		$('#collage6-3'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '260px').css('height','265px');

		$('#collage6-4'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '264px').css('height','260px');
		$('#collage6-5'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[4]).css('width', '264px').css('height','260px');
		$('#collage6-6'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[5]).css('width', '264px').css('height','260px');
		$(currentParent).attr("class","whole_collage6")
		stopFunctionArray.splice(0,stopFunctionArray.length)
		makeDropable($(currentParent))
		makeDragable($(currentParent))
		uiremove($this)
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '8') {
		$(currentParent)
		.html("<div class='four_of_seven'>"
				+"<div class='right_four_of_seven' id='collage7-1-small" +stopCountPhoto +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-2-small" +stopCountPhoto +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-3-small" +stopCountPhoto +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-4-small" +stopCountPhoto +"'><img src=''></div>"
				+"</div>"


				+"<div  class='bottom_three_of_seven' id='collage7-5" +stopCountPhoto +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-6" +stopCountPhoto +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-7" +stopCountPhoto +"'><img src=''></div>"
				+"</div>"
		)
		$('#collage7-1-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '192px').css('height','193px');
		$('#collage7-2-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '192px').css('height','193px');
		$('#collage7-3-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '192px').css('height','193px');
		$('#collage7-4-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '192px').css('height','193px');

		$('#collage7-5'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[4]).css('width', '397px').css('height','397px');
		$('#collage7-6'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[5]).css('width', '397px').css('height','397px');
		$('#collage7-7'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[6]).css('width', '397px').css('height','397px');
		$(currentParent).attr("class","whole_collage7")
		stopFunctionArray.splice(0,stopFunctionArray.length)
		makeDropable($(currentParent))
		makeDragable($(currentParent))
		uiremove($this)
	}
	countPhoto++;
	stopFunctionArray.splice(0,stopFunctionArray.length)
}

function uiremove($this){
	$($this).remove();
}
function resizeCollage($this, $item,countPhotoresize) { //디스는 콜라주, 아이템은 들어온 사진
	/* console.log($this)
	  console.log($($item).children().attr('src'))
	  console.log($($this).attr('class').split('_')[1].charAt(7))
	  console.log($('img', $this)) */ 

	console.log($item)
	console.log($($item).children().attr('src'))
	var resizeCollageArray=[]
	for(i=0; i<$('img', $this).length;i++){
		resizeCollageArray[i]=$('img', $this).eq(i).attr('src')
		console.log(resizeCollageArray[i])
	}

	console.log('resize함수안의 countPhoto' ,countPhotoresize)

	if ($($this).attr('class').split('_')[1].charAt(7)=='1') {
		$($this)
		.html("<div  class='two_photo_col 2-collage' id='collage2-1-count" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+ "<div  class='two_photo_col 2-collage ' id='collage2-2-count" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+ "</div>"
				+ "<div class='control_box' id='control-box-div-"+countPhotoresize+"'>"
				+ "<ul class='clrfix'>"
				+ "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				+ "<li><button type='button' class='btn_edit'>편집</button></li>"
				+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"'>캡션</button></li>"
				+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				+ "</ul>"
				+ "</div>"
		)
		$('#collage2-1-count'+ countPhotoresize +'> img').attr('src', resizeCollageArray[0]).css('width', '534px').css('height','534px');
		$('#collage2-2-count'+ countPhotoresize +'> img').attr('src', $($item).children().attr('src')).css('width', '534px').css('height','534px');
		$('#detail-date-div-'+ countPhotoresize).text(photo[i][0].time)
		$($this).attr("class","whole_collage2")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='2') {
		$($this)
		.html("<div class='collage3-big 3-collage' id='collage3-1-big"+countPhotoresize+"'><img src=''></div>"
				+ "<div class='collage3_2inner_collage'>"
				+ "<div class='inner_two_collage 3-collage' id='collage3-2"+countPhotoresize+"'><img src=''></div>"
				+ "<div class='inner_two_collage 3-collage' id='collage3-3"+countPhotoresize+"'><img src=''></div>"
				+ "</div></div>"

				+ "<div class='control_box' id='control-box-div-"+countPhotoresize+"'>"
				+ "<ul class='clrfix'>"
				+ "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				+ "<li><button type='button' class='btn_edit'>편집</button></li>"
				+ "<li><button type='button' class='btn_caption'>캡션</button></li>"
				+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhotoresize+"'>삭제</button></li>"
				+ "</ul>"
				+ "</div>"

		)
		$('#collage3-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '534px').css('height','534px');
		$('#collage3-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '260px').css('height','265px');
		$('#collage3-3'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '260px').css('height','265px');

		/*$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)*/

		$($this).attr("class","whole_collage3")
		makeDropable($($this))
		makeDragable($($this))
	}else if ($($this).attr('class').split('_')[1].charAt(7)=='3') {

		$($this)
		.html("<div class='four_photo_collage' id='collage4-1" +countPhotoresize +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-2" +countPhotoresize +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-3" +countPhotoresize +"'><img src=''></div>"
				+ " <div class='four_photo_collage' id='collage4-4" +countPhotoresize +"'><img src=''></div>"
				+ "</div>"

				+ "<div class='control_box' id='control-box-div-"+countPhotoresize+"'>"
				+ "<ul class='clrfix'>"
				+ "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				+ "<li><button type='button' class='btn_edit'>편집</button></li>"
				+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhotoresize+"'>캡션</button></li>"
				+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhotoresize+"'>삭제</button></li>"
				+ "</ul>"
				+ "</div>"
		)

		$('#collage4-1'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '397px').css('height','397px');
		$('#collage4-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '397px').css('height','397px');
		$('#collage4-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '397px').css('height','397px');
		$('#collage4-4'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '397px').css('height','397px');
		/*$('#detail-date-div-'+ countPhoto).text(photo[i][0].time)*/
		/*
			if(photo[i][0].lati != null && photo[i][0].longit != null) {
				var lat = photo[i][0].lati
				var long = photo[i][0].longit
				googleapisView(lat, long, countPhoto)
			}*/
		$($this).attr("class","whole_collage4")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='4') {
		$($this)
		.html("<div  class='top_three_collage' id='collage5-1" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-2" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-3" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-4" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-5" +countPhotoresize +"'><img src=''></div>"
				+ "</div>"
				+ "<div class='control_box' id='control-box-div-"+countPhotoresize+"'>"
				+ "<ul class='clrfix'>"
				+ "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				+ "<li><button type='button' class='btn_edit'>편집</button></li>"
				+ "<li><button type='button' class='btn_caption'>캡션</button></li>"
				+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhotoresize+"'>삭제</button></li>"
				+ "</ul>"
				+ "</div>")
				$('#collage5-1'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '260px').css('height','260px');
		$('#collage5-2'+ countPhotoresize +' > img').attr('src',resizeCollageArray[1]).css('width', '259px').css('height','260px');
		$('#collage5-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '260px').css('height','260px');

		$('#collage5-4'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '397px').css('height','397px');
		$('#collage5-5'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '397px').css('height','397px');
		/*$('#detail-date-div-'+ countPhoto).text(photo[i][0].time)*/
		$($this).attr("class","whole_collage5")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
	} else if($($this).attr('class').split('_')[1].charAt(7)=='5'){
		$($this)
		.html("<div class='collage6-big' id='collage6-1-big" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"<div id='collage6-2side-collage'>"
				+"<div class='side_two_collage' id='collage6-2" +countPhotoresize +"'><img src=''></div>"
				+"<div class='side_two_collage' id='collage6-3" +countPhotoresize +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_three_collage' id='collage6-4" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-5" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-6" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"</div>"
		)
		$('#collage6-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '534px').css('height','534px');
		$('#collage6-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '260px').css('height','265px');
		$('#collage6-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '260px').css('height','265px');

		$('#collage6-4'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '264px').css('height','260px');
		$('#collage6-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '264px').css('height','260px');
		$('#collage6-6'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '264px').css('height','260px');
		$($this).attr("class","whole_collage6")
		makeDropable($($this))
		makeDragable($($this))
		resizeCollageArray.splice(0,resizeCollageArray.length)
		return;
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='6') {
		$($this)
		.html("<div class='four_of_seven'>"
				+"<div class='right_four_of_seven' id='collage7-1-small" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-2-small" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-3-small" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-4-small" +countPhotoresize +"'><img src=''></div>"
				+"</div>"


				+"<div  class='bottom_three_of_seven' id='collage7-5" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-6" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-7" +countPhotoresize +"'><img src=''></div>"
				+"</div>"
		)
		$('#collage7-1-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '192px').css('height','193px');
		$('#collage7-2-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '192px').css('height','193px');
		$('#collage7-3-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '192px').css('height','193px');
		$('#collage7-4-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '192px').css('height','193px');

		$('#collage7-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '397px').css('height','397px');
		$('#collage7-6'+ countPhotoresize +' > img').attr('src', resizeCollageArray[5]).css('width', '397px').css('height','397px');
		$('#collage7-7'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '397px').css('height','397px');
		aaa=[]
		$($this).attr("class","whole_collage7")
		makeDropable($($this))
		makeDragable($($this))
		resizeCollageArray.splice(0,resizeCollageArray.length)
		return;
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='7') {
		$($this)
		.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
				+"<div  id='four_of_eight'>"
				+"<div class='right_four_of_eight' id='collage8-2" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-3" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-4" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-5" +countPhotoresize +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_three_of_eight' id='collage8-6" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_eight' id='collage8-7" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_eight' id='collage8-8" +countPhotoresize +"'><img src=''></div>"
				+"</div>"
		)
		$('#collage8-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '397px').css('height','397px');
		$('#collage8-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '195px').css('height','195px');
		$('#collage8-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '195px').css('height','195px');
		$('#collage8-4'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '195px').css('height','195px');
		$('#collage8-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '195px').css('height','195px');

		$('#collage8-6'+ countPhotoresize +' > img').attr('src', resizeCollageArray[5]).css('width', '262px').css('height','260px');
		$('#collage8-7'+ countPhotoresize +' > img').attr('src', resizeCollageArray[6]).css('width', '262px').css('height','260px');
		$('#collage8-8'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '262px').css('height','260px');

		$($this).attr("class","whole_collage8")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
		return;
	}else if ($($this).attr('class').split('_')[1].charAt(7)=='8') {
		$($this)
		.html("<div class='one_of_nine' id='collage9-1-big"+countPhotoresize+"'><img id='img_4' src=''></div>"
				+"<div  class='four_of_nine'>"
				+"<div class='right_four_of_nine' id='collage9-2" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-3" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-4" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-5" +countPhotoresize +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_four_of_nine' id='collage9-6" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-7" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-8" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-9" +countPhotoresize +"'><img src=''></div>"
				+"</div>"

				+ "<div class='control_box' id='control-box-div-"+countPhotoresize+"'>"
				+ "<ul class='clrfix'>"
				+ "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				+ "<li><button type='button' class='btn_edit'>편집</button></li>"
				+ "<li><button type='button' class='btn_caption'>캡션</button></li>"
				+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhotoresize+"'>삭제</button></li>"
				+ "</ul>"
				+ "</div>"
		)

		$('#collage9-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '397px').css('height','397px');
		$('#collage9-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '195px').css('height','195px');
		$('#collage9-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '195px').css('height','195px');
		$('#collage9-4'+ countPhotoresize +' > img').attr('src',resizeCollageArray[2]).css('width', '195px').css('height','195px');
		$('#collage9-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '195px').css('height','195px');

		$('#collage9-6'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '195px').css('height','191px');
		$('#collage9-7'+ countPhotoresize +' > img').attr('src', resizeCollageArray[5]).css('width', '195px').css('height','191px');
		$('#collage9-8'+ countPhotoresize +' > img').attr('src', resizeCollageArray[6]).css('width', '195px').css('height','191px');
		$('#collage9-9'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '195px').css('height','191px');
		/*	$('#detail-date-div-'+ countPhotoresize).text(photo[i][0].time)

			if(photo[i][0].lati != null && photo[i][0].longit != null) {
				var lat = photo[i][0].lati
				var long = photo[i][0].longit
				googleapisView(lat, long, countPhoto)
			}
			$('.tool_box').remove()*/
//		showControlBox()
		deletephoto(countPhoto)
		$($this).attr("class","whole_collage9")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDragable($($this))
		return;
	} 
	resizeCollageArray.splice(0,resizeCollageArray.length)
	console.log($item)
}


var dropcollageArray=[];
function makeDropable($thisclass){
	dropcollageArray.push($thisclass)
	console.log($thisclass)
	console.log($('img',$thisclass).parent())
	console.log($('img').parent())
	$($thisclass).droppable({
		accept:  (function(){
			for(i=0; i< dropcollageArray.length ; i++){
				for(j=0; j< $('img',dropcollageArray[i]).parent().length; j++){
					return $('img',dropcollageArray[i]).parent().eq(j)}}
		}), 
		drop: function( event, ui ) {
			/*    	  console.log(this)
	    	   console.log($(ui.draggable).parent().attr('class').split('_')[1].charAt(7)) 
	    	  dropdiv=$(this).attr('class').split('_')[1].charAt(7)
	    	   console.log($(this).attr('class').split('_')[1].charAt(7)) 
	    	  console.log($(this).attr('class'))
	    	  if($(ui.draggable).parent().attr('class') == undefined||$(ui.draggable).parent().attr('class').split('_')[0]!='whole'){
	    		  if($(this).attr('class').split('_')[1].charAt(7)!=$(ui.draggable).parent().parent().attr('class').split('_')[1].charAt(7)){
	    	    	  resizeCollage( this, ui.draggable);}
	    	  	}else{
	    	  if($(this).attr('class').split('_')[1].charAt(7)!=$(ui.draggable).parent().attr('class').split('_')[1].charAt(7)||$(ui.draggable).parent().attr('class')==undefined){*/
			$item=ui.draggable
			/*$(ui.draggable).remove();*/
			console.log($(this).attr('data-countPhoto'))
			resizeCollage(this, $item,$(this).attr('data-countPhoto')); //this는 이 콜라쥬, ui 드래그에이블은 들어온값

		}
	})
}; 

function showControlBox(count) {
	$(document).ready(function() {
//		contBoxCount = $(this).prop('id').split('_')[2]
//		console.log('#control-box-div-'+contBoxCount)
		if($('#control-box-div-'+count).css("display") == "block") {
			$('#control-box-div-'+count).css('display', 'none');
		} else {
			$('#control-box-div-'+count).css('display', 'block');
		}
		console.log("누름")
	})
	return false;
}

$.getJSON('../member/header.json', function(result) {
	console.log(result);
	 mno=result.data.loginMember;
	console.log(mno)
	console.log(result.data.loginMember)
	if(mno!=undefined){
		$('#slide_icon').css('display','inline-block');
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="../mypage/write.html"
		    //Other code etc.
		});
	}else{
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="./login.html"
		    //Other code etc.
		    selectLoginUserPost()
		});
	}
	    var template = Handlebars.compile($('#tbody-template4').html())
	    var generatedHTML = template(result.data.loginMember) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    $('.slide_bar_content').append(generatedHTML) // 새 tr 태그들로 설정한다.
	    
	 /*
	    console.log(mno);
	      $.post('../post/count.json',
	    		  {mno : mno}	
	      , function(result) {
	    	  console.log(result.data.list.length)
	    	  
	    var template = Handlebars.compile($('#tbody-template4').html())
	    var generatedHTML = template(result.data.list) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    generatedHTML='';
	    $('.counting1').html(result.data.list.length) // 새 tr 태그들로 설정한다.
  
  })*/
  
  }) 
  function selectLoginUserPost(){
	console.log(mno)
$.post('../post/selectOneUserPost.json',{'number':mno}, function(result) {
	  console.log(result);
	  for(i=0; i<=result.data.selectOneUserPost.length; i++){
	  console.log(result.data.selectOneUserPost.length);
	  numOfPost = result.data.selectOneUserPost.length;
	  console.log(numOfPost);
	  }
      var template = Handlebars.compile($('#content-template').html())
      var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//      tbody.text('') // tbody의 기존 tr 태그들을 지우고
      $('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.
      dropdown()
  $('<input id="numOfPost">').attr('value',numOfPost).attr("readonly",true).attr("disabled",false).appendTo($('.postNum'))
})
}


function address(){
	console.log(mno)
	$.post('../detail/selectAddress.json', {
		'mno': mno
	},
	function(result) {
		console.log(result)
		var uniqueNames = [];
		var flag_list=[];
		/*var flag_list_show=new Array();*/
		var flag_count=0;

		for(i=0;i<result.data.selectAddress.length;i++){
			if(result.data.selectAddress[i]!=null){
			if(result.data.selectAddress[i].address!=undefined){
				flag_list[flag_count++]=result.data.selectAddress[i].address
				console.log(flag_list)
				
			}
			}
		}
		for(i=0;i<flag_list.length;i++){
			console.log(flag_list[i].indexOf("대한민국"))
			if(flag_list[i]!=undefined){
				if(flag_list[i].indexOf("대한민국")!=-1){
					flag_list[i] ='./flags/png/south-korea.png'
				}else if(flag_list[i].indexOf("미국")!=-1){
					flag_list[i]='./flags/png/united-states-of-america.png'
				}else if(flag_list[i].indexOf("일본")!=-1){
					flag_list[i]='./flags/png/japan.png'
				}else if(flag_list[i].indexOf("영국")!=-1){
					flag_list[i]='./flags/png/united-kingdom.png'
				}else if(flag_list[i].indexOf("프랑스")!=-1){
					flag_list[i]='./flags/png/france.png'
				}else if(flag_list[i].indexOf("중국")!=-1){
					flag_list[i]='./flags/png/china.png'
				}else if(flag_list[i].indexOf("조선")!=-1){
					flag_list[i]='./flags/png/north-korea.png'
				}else if(flag_list[i].indexOf("스페인")!=-1){
					flag_list[i]='./flags/png/spain.png'
				}
			}

		}
		
		
		$.each(flag_list, function(i, el){
			if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		console.log(uniqueNames)
		console.log(uniqueNames.length)
		numOfFlag=uniqueNames.length;
		console.log(numOfFlag);
		for(i=0;i<=uniqueNames.length;i++){
			$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('#traveled_country'))
		}
		
		$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.countryNum'))
		})
	}


/*드래그드롭끝*/