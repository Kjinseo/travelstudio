var fititle = $('#wirte_title'),
	fisdt = $('.write_start_date'),
	fiedt = $('.write_end_date'),
	ficont = $('.text_write_box');

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



setTimeout("picnosearch()",10000);
function picnosearch(){
	console.log(onlyPath1)
for(i=0;i<photo.length;i++){
	$.ajaxSettings.traditional = true;
$.post('../picture/searchthispicture.json', {
	'path': onlyPath1[i]
}, function(result) {
	var pictureparentno;
	console.log(result.pictureList)
	console.log(result.pictureList.length)
	jsPictureList.push(result.pictureList)
	/*if(result.pictureList!=null){*/
	
	
	console.log(jsPictureList)
	
	/*}*/
}, 'json')
}
setTimeout("finaladd()",5000);

}

function finaladd(){
$('.text_parent').each(function () {
	console.log(this)
	console.log($('.text_parent').children().eq(1).attr('class'))
	
	if($('.text_parent').children().eq(1).attr('class')==='tool_box'){
		$('.text_parent').children().eq(1).remove()
	}
	console.log($('.text_parent').children().eq(1).attr('class'))
	if($(this).children().eq(0).attr('class').split('_')[0]=='whole'){
		pictureparentno=$(this).attr('id').split('_')[2]
		console.log("여기 들어옴")
		var photoquantity =$(this).children().attr('class').split('_')[1].charAt(7) 
			console.log(photoquantity)
		switch(photoquantity){
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
					if(jsPictureList[z][g].path==$(casethis).children().children().children().eq(j).attr('src').substring(13,$(casethis).children().children().children().eq(j).attr('src').lastIndexOf('_'))){
						picnoparentno.push(pictureparentno)
						picnoparentno.push(jsPictureList[z][g].picno)
						}
				}
				}
			
		};
		}
		/*var imgsrc=$(this).children().children().children().attr('src')
		console.log(imgsrc.substring(13,imgsrc.lastIndexOf('_')))
		
		if(imgsrc.substring(13,imgsrc.lastIndexOf('_'))===result.pictureList[i].path){
			jsPictureList.push(pictureparentno)
			jsPictureList.push(result.pictureList[i].picno)*/
		} 
	console.log(picnoparentno)
	})
	addAllphoto()
	}

function addAllphoto(){
	$.ajaxSettings.traditional = true;
$.post('../detail/addAllphoto.json', {
	'picnoandparentno': picnoparentno
}, function(result) {
	console.log(result);
}, 'json')
}
	
	/*content.push($(this).parent().attr('id').split('_')[2])
	content.push(decodeURIComponent($(this).val()))
	console.log($(this).parent().attr('id').split('_')[2])*/
	
/*
for(i=0;i<result.pictureList.length;i++){
	
}
*/
/*미리보기 파일업로드*/
/*$('.file1').fileupload({
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

			injaeUpload();
			console.log('fileuploadprocessalways()...');
			console.log($(this).val())
			console.log(data.files);
			var no = $(this).attr('class').split('_')[1].split(' ')[0]
			console.log(no)
			console.log(no)

			var imagesDiv = $("#text_parent_"+aaa+"");
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
			$('#write_save_btn').unbind("click");

		}, 


		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data.result);
			var file = data.result.fileList[0];
			$('<p/>').text("age : " + data.result.age).appendTo(document.body);
			$.each(data.result.fileList, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
		}
});
 */
/*$('body').on("click",'.file1',function(){
	console.log(this)	*/
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
			
		console.log("파일1 업로드 들어옴")
		console.log("파일1 업로드 들어옴")
		console.log("파일1 업로드 들어옴")
				
			if(submitcount==0){
				data.submit();
				submitcount++
			} else {
				return;
			}

			/**/
		}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
			console.log('submit()...')
			console.log("data-->", data)
			console.log(aaa)
			data.formData = {
				srtno: aaa
			}
			
		},

		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data.result);
			adddiv()
			
			var file = data.result.fileList[0];
			$('<p/>').text("age : " + data.result.age).appendTo(document.body);
			$.each(data.result.fileList, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
			
			console.log(imagesDiv2)
			console.log(data.result.fileList.length)
				if (data.result.fileList.length == 2) {
		             $("<div class='whole_collage2'>")
		             .html("<div  class='two_photo_col' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
		              + "<div  class='two_photo_col' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
		              + "</div>"
		              ).appendTo(imagesDiv2)
		              $('#collage2-1-count'+ countPhoto +'> img').attr('src',+  data.result.filename[0]).css('width', '534px').css('height','534px');
		              $('#collage2-2-count'+ countPhoto +'> img').attr('src',+  data.result.filename[1]).css('width', '534px').css('height','534px');
		              console.log(photo[i][0])
		              console.log(photo[i][1])
		              
		              
		         } else if (data.result.fileList.length == '3') {
		            
//		           
		            try {
		              $("<div class='whole_collage3'>")
		              .html("<div class='collage3-big' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
		               + "<div class='collage3_2inner_collage'>"
		               + "<div class='inner_two_collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
		               + "<div class='inner_two_collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
		               + "</div></div>"
		               ).appendTo(imagesDiv2)
		               $('#collage3-1-big'+ countPhoto +' > img').attr('src', "../../travelstudio"+data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
		               $('#collage3-2'+ countPhoto +' > img').attr('src', "../../travelstudio"+data.result.fileList[1].filename + "_700.png").css('width', '260px').css('height','265px');
		               $('#collage3-3'+ countPhoto +' > img').attr('src',"../../travelstudio"+ data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','265px');
		               
		            } catch (err) {}
		         }else if (data.result.fileList.length == 4) {
		            
		            try {
		             $("<div class='whole_collage4'>")
		             .html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
		              + "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
		              + "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
		              + " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
		              + "</div>"
		              ).appendTo(imagesDiv2)
		              
		             $('#collage4-1'+ countPhoto +' > img').attr('src', "./"+data.result.fileList[2].filename+".png").css('width', '397px').css('height','397px');
		             $('#collage4-2'+ countPhoto +' > img').attr('src', "./"+data.result.fileList[2].filename).css('width', '397px').css('height','397px');
		             $('#collage4-3'+ countPhoto +' > img').attr('src', "./"+data.result.fileList[2].filename).css('width', '397px').css('height','397px');
		             $('#collage4-4'+ countPhoto +' > img').attr('src', "./"+data.result.fileList[2].filename).css('width', '397px').css('height','397px');
		             
		            } catch (err) {}    
		         } else if (data.result.fileList.length == 5) {
		            
		            try {
		              $("<div class='whole_collage5'>")
		              .html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
		              + "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
		              + "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

		              + "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
		              + "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
		              + "</div>"
		             ).appendTo(imagesDiv2) 
		             $('#collage5-1'+ countPhoto +' > img').attr('src', data.result[0].filename+"_300.png").css('width', '260px').css('height','260px');
		             $('#collage5-2'+ countPhoto +' > img').attr('src', data.result[1].filename+"_300.png").css('width', '259px').css('height','260px');
		             $('#collage5-3'+ countPhoto +' > img').attr('src', data.result[2].filename+"_300.png").css('width', '260px').css('height','260px');
		             
		             $('#collage5-4'+ countPhoto +' > img').attr('src', data.result[3].filename+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage5-5'+ countPhoto +' > img').attr('src', data.result[4].filename+"_400.png").css('width', '397px').css('height','397px');
		             
		            } catch (err) {}    
		         } else if (data.result.fileList.length == 6) {
		            
		            try {
		              $("<div class='whole_collage6'>")
		               .html("<div class='collage6-big' id='collage6-1-big'" +countPhoto +"><img id='img_4' src=''></div>"
		                +"<div id='collage6-2side-collage'>"
		                +"<div class='side_two_collage' id='collage6-2'" +countPhoto +"><img src=''></div>"
		                +"<div class='side_two_collage' id='collage6-3'" +countPhoto +"><img src=''></div>"
		                +"</div>"

		                +"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
		                +"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
		                +"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
		                +"</div>"
		                ).appendTo(imagesDiv2) 
		             $('#collage6-1-big'+ countPhoto +' > img').attr('src', data.result[0].filename+"_600.png").css('width', '534px').css('height','534px');
		             $('#collage6-2'+ countPhoto +' > img').attr('src', data.result[1].filename+"_300.png").css('width', '260px').css('height','265px');
		             $('#collage6-3'+ countPhoto +' > img').attr('src', data.result[2].filename+"_300.png").css('width', '260px').css('height','265px');
		             
		             $('#collage6-4'+ countPhoto +' > img').attr('src', data.result[3].filename+"_300.png").css('width', '264px').css('height','260px');
		             $('#collage6-5'+ countPhoto +' > img').attr('src', data.result[4].filename+"_300.png").css('width', '264px').css('height','260px');
		             $('#collage6-6'+ countPhoto +' > img').attr('src', data.result[5].filename+"_300.png").css('width', '264px').css('height','260px');
		             
		            } catch (err) {}    
		         } else if (data.result.fileList.length == 7) {
		            try {
		              $("<div class='whole_collage7'>")
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
		                $('#collage7-1-small'+ countPhoto +' > img').attr('src', data.result[0].filename+"_200.png").css('width', '192px').css('height','193px');
		                $('#collage7-2-small'+ countPhoto +' > img').attr('src', data.result[1].filename+"_200.png").css('width', '192px').css('height','193px');
		                $('#collage7-3-small'+ countPhoto +' > img').attr('src', data.result[2].filename+"_200.png").css('width', '192px').css('height','193px');
		                $('#collage7-4-small'+ countPhoto +' > img').attr('src', data.result[3].filename+"_200.png").css('width', '192px').css('height','193px');
		                
		                $('#collage7-5'+ countPhoto +' > img').attr('src', data.result[4].filename+"_400.png").css('width', '397px').css('height','397px');
		                $('#collage7-6'+ countPhoto +' > img').attr('src', data.result[5].filename+"_400.png").css('width', '397px').css('height','397px');
		                $('#collage7-7'+ countPhoto +' > img').attr('src', data.result[6].filename+"_400.png").css('width', '397px').css('height','397px');
		                    
		             
		            } catch (err) {}    
		         } else if (data.result.fileList.length == 8) {
		            
		            try {
		               $("<div class='whole_collage8'>")
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
		              

		               
		             $('#collage8-1-big'+ countPhoto +' > img').attr('src', data.result[0].filename+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage8-2'+ countPhoto +' > img').attr('src', data.result[1].filename+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage8-3'+ countPhoto +' > img').attr('src', data.result[2].filename+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage8-4'+ countPhoto +' > img').attr('src', data.result[3].filename+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage8-5'+ countPhoto +' > img').attr('src', data.result[4].filename+"_200.png").css('width', '195px').css('height','195px');
		             
		             $('#collage8-6'+ countPhoto +' > img').attr('src', data.result[5].filename+"_300.png").css('width', '262px').css('height','260px');
		             $('#collage8-7'+ countPhoto +' > img').attr('src', data.result[6].filename+"_300.png").css('width', '262px').css('height','260px');
		             $('#collage8-8'+ countPhoto +' > img').attr('src', data.result[7].filename+"_300.png").css('width', '262px').css('height','260px');
		             
		            } catch (err) {}    
		         } else if (data.result.fileList.length == 9) {
		            
		            try {
		                $("<div class='whole_collage9'>")
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
		               
		             $('#collage9-1-big'+ countPhoto +' > img').attr('src', data.result[0].filename+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage9-2'+ countPhoto +' > img').attr('src', data.result[1].filename+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage9-3'+ countPhoto +' > img').attr('src', data.result[2].filename+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage9-4'+ countPhoto +' > img').attr('src', data.result[3].filename+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage9-5'+ countPhoto +' > img').attr('src', data.result[4].filename+"_200.png").css('width', '195px').css('height','195px');
		             
		             $('#collage9-6'+ countPhoto +' > img').attr('src', data.result[5].filename+"_200.png").css('width', '195px').css('height','191px');
		             $('#collage9-7'+ countPhoto +' > img').attr('src', data.result[6].filename+"_200.png").css('width', '195px').css('height','191px');
		             $('#collage9-8'+ countPhoto +' > img').attr('src', data.result[7].filename+"_200.png").css('width', '195px').css('height','191px');
		             $('#collage9-9'+ countPhoto +' > img').attr('src', data.result[8].filename+"_200.png").css('width', '195px').css('height','191px');
		             
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
		}
		
  });
}
/*})*/
/*미리보기 파일업로드 끝*/

/*back file 업로드 시작*/
var change=0;
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
			if(change==0){
			console.log('submit()...');
			$('.text_write_box').each(function () {
				
				/*console.log($(this).val())*/
				content.push($(this).parent().attr('id').split('_')[2])
				content.push(decodeURIComponent($(this).val()))
				console.log($(this).parent().attr('id').split('_')[2])
				/*.attr('class').split('_')[1]*/
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
		
			change=1;
			}
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
			/*location.href='./mypage.html'*/
		}

});




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
			$('#write_save_btn').unbind("click");
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
		         adddiv()
		         var textParent= $("#text_parent_"+countPhoto+"")
		         if (photo[i].length == 2) {
		             $("<div class='whole_collage2'>")
		             .html("<div  class='two_photo_col' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
		              + "<div  class='two_photo_col' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
		              + "</div>"
		              ).appendTo(textParent)
		              $('#collage2-1-count'+ countPhoto +'> img').attr('src',"/travelstudio"+  photo[i][0].path + "_500.png").css('width', '534px').css('height','534px');
		              $('#collage2-2-count'+ countPhoto +'> img').attr('src',"/travelstudio"+  photo[i][1].path + "_500.png").css('width', '534px').css('height','534px');
		              console.log(photo[i][0])
		              console.log(photo[i][1])
		              
		              
		         } else if (photo[i].length == 3) {
		            
//		            var str = ".." + data._response.result[i].path;
//		            var dataSource = data._response.result[i].path
		            
		            try {
		              $("<div class='whole_collage3'>")
		              .html("<div class='collage3-big' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
		               + "<div class='collage3_2inner_collage'>"
		               + "<div class='inner_two_collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
		               + "<div class='inner_two_collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
		               + "</div></div>"
		               ).appendTo(textParent)
		               $('#collage3-1-big'+ countPhoto +' > img').attr('src',"/travelstudio"+ photo[i][0].path+"_500.png").css('width', '534px').css('height','534px');
		               $('#collage3-2'+ countPhoto +' > img').attr('src', "/travelstudio"+photo[i][1].path +"_300.png").css('width', '260px').css('height','265px');
		               $('#collage3-3'+ countPhoto +' > img').attr('src', "/travelstudio"+photo[i][2].path +"_300.png").css('width', '260px').css('height','265px');
		               
		            } catch (err) {}
		         }else if (photo[i].length == 4) {
		            
		            try {
		             $("<div class='whole_collage4'>")
		             .html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
		              + "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
		              + "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
		              + " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
		              + "</div>"
		              ).appendTo(textParent)
		              
		             $('#collage4-1'+ countPhoto +' > img').attr('src', "/travelstudio"+photo[i][0].path+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage4-2'+ countPhoto +' > img').attr('src', "/travelstudio"+photo[i][1].path+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage4-3'+ countPhoto +' > img').attr('src', "/travelstudio"+photo[i][2].path+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage4-4'+ countPhoto +' > img').attr('src', "/travelstudio"+photo[i][3].path+"_400.png").css('width', '397px').css('height','397px');
		             
		            } catch (err) {}    
		         } else if (photo[i].length == 5) {
		            
		            try {
		              $("<div class='whole_collage5'>")
		              .html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
		              + "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
		              + "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

		              + "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
		              + "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
		              + "</div>"
		             ).appendTo(textParent) 
		             $('#collage5-1'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '260px').css('height','260px');
		             $('#collage5-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '259px').css('height','260px');
		             $('#collage5-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','260px');
		             
		             $('#collage5-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage5-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_400.png").css('width', '397px').css('height','397px');
		             
		            } catch (err) {}    
		         } else if (photo[i].length == 6) {
		            
		            try {
		              $("<div class='whole_collage6'>")
		               .html("<div class='collage6-big' id='collage6-1-big'" +countPhoto +"><img id='img_4' src=''></div>"
		                +"<div id='collage6-2side-collage'>"
		                +"<div class='side_two_collage' id='collage6-2'" +countPhoto +"><img src=''></div>"
		                +"<div class='side_two_collage' id='collage6-3'" +countPhoto +"><img src=''></div>"
		                +"</div>"

		                +"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
		                +"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
		                +"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
		                +"</div>"
		                ).appendTo(textParent) 
		             $('#collage6-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_600.png").css('width', '534px').css('height','534px');
		             $('#collage6-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '260px').css('height','265px');
		             $('#collage6-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','265px');
		             
		             $('#collage6-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '264px').css('height','260px');
		             $('#collage6-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '264px').css('height','260px');
		             $('#collage6-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '264px').css('height','260px');
		             
		            } catch (err) {}    
		         } else if (photo[i].length == 7) {
		            try {
		              $("<div class='whole_collage7'>")
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
		                ).appendTo(textParent)  
		                $('#collage7-1-small'+ countPhoto +' > img').attr('src', photo[i][0].path+"_200.png").css('width', '192px').css('height','193px');
		                $('#collage7-2-small'+ countPhoto +' > img').attr('src', photo[i][1].path+"_200.png").css('width', '192px').css('height','193px');
		                $('#collage7-3-small'+ countPhoto +' > img').attr('src', photo[i][2].path+"_200.png").css('width', '192px').css('height','193px');
		                $('#collage7-4-small'+ countPhoto +' > img').attr('src', photo[i][3].path+"_200.png").css('width', '192px').css('height','193px');
		                
		                $('#collage7-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_400.png").css('width', '397px').css('height','397px');
		                $('#collage7-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_400.png").css('width', '397px').css('height','397px');
		                $('#collage7-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_400.png").css('width', '397px').css('height','397px');
		                    
		             
		            } catch (err) {}    
		         } else if (photo[i].length == 8) {
		            
		            try {
		               $("<div class='whole_collage8'>")
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
		                 ).appendTo(textParent)
		              

		               
		             $('#collage8-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage8-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage8-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage8-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage8-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_200.png").css('width', '195px').css('height','195px');
		             
		             $('#collage8-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '262px').css('height','260px');
		             $('#collage8-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '262px').css('height','260px');
		             $('#collage8-8'+ countPhoto +' > img').attr('src', photo[i][7].path+"_300.png").css('width', '262px').css('height','260px');
		             
		            } catch (err) {}    
		         } else if (photo[i].length == 9) {
		            
		            try {
		                $("<div class='whole_collage9'>")
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
		              ).appendTo(textParent)
		               
		             $('#collage9-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_400.png").css('width', '397px').css('height','397px');
		             $('#collage9-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage9-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage9-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_200.png").css('width', '195px').css('height','195px');
		             $('#collage9-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_200.png").css('width', '195px').css('height','195px');
		             
		             $('#collage9-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_200.png").css('width', '195px').css('height','191px');
		             $('#collage9-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_200.png").css('width', '195px').css('height','191px');
		             $('#collage9-8'+ countPhoto +' > img').attr('src', photo[i][7].path+"_200.png").css('width', '195px').css('height','191px');
		             $('#collage9-9'+ countPhoto +' > img').attr('src', photo[i][8].path+"_200.png").css('width', '195px').css('height','191px');
		             
		            } catch (err) {}    
		         } else {
		         
		            // 사진이 두장이라면
		              var str = photo[i][0].path;
		              
		            try {
		               $("<img>").attr('src', str+"_300.png").css('width', 'auto').appendTo(textParent);
		            } catch (err) {}

		         } //else
		         countPhoto++
		         } // 사진 for문
			
//		})
			
		} //done
});

var photo = [];
var dataa=[]
/*function plus(dataa){
	사진 sortNo 중복값 제거하고 배열에 담기
	var sortNo = []
	for(j = 0; j < dataa.result.length; j++) {
		sortNo[j] = dataa._response.result[j].sortno;
		var classify = sortNo.filter(function(itm,k,sortNo) {
			return k==sortNo.indexOf(itm);
		})
	}
	사진 sortNo 중복값 제거하고 배열에 담기 끝
	
	var photoData = []
	var m = 0;
	console.log(photoData)
	
//	console.log(dataa._response)
	
	var sortnoa=0
	for(i=0;i<=dataa.result[dataa.result.length-1].sortno;i++){
		console.log(dataa.result[0].sortno)
		for(j=0; sortnoa == i;j++){
			console.log(countcc)
			console.log(dataa.result)
			sortnoa=dataa.result[j].sortno
			photoData[i] = new Array();
			photoData[i][j] = dataa._response.result[countcc]
			countcc++;
		}
	}
	for(var i = 0; i< dataa.result.length; i++) {
		console.log(dataa._response.result[0].sortno)
		var sortno= dataa._response.result[count].sortno
//		for(var l = 0; l < classify.length; l++){
		for(var l = 0; sortno == i ; l++){
			photoData[i] = new Array();
			photoData[i][l] = dataa._response.result[count]
			count++;
//			if (dataa._response.result[i].sortno == classify[l]) {
//				photoData[i][l]=
//		    photoData[l] = new Array();
//		    console.log(photoData[l])
//			photoData[l][m++] = dataa._response.result[i];
//			photoData[l].push(dataa._response.result[i])
//			}

			}
		photo[i][i] = ".."+dataa._response.result[i].path;
	}
	
	console.log(photoData)
	return photo[i]
}*/


function plus(dataa){
	   
	   //사진 sortNo 중복값 제거하고 배열에 담기
	   var sortNo = []
	   for(j = 0; j < dataa.result.length; j++) {
	      sortNo[j] = dataa.result[j].sortno;
	      var classify = sortNo.filter(function(itm,k,sortNo) {
	         return k==sortNo.indexOf(itm);
	      })
	   }
	//   console.log(classify)
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
/*back file up 끝*/