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
var aaa=0;

setTimeout("picnosearch()",10000);
function picnosearch(){
	console.log("onlypath다")
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
			/*var imgsrc=$(this).children().children().children().attr('src')
			console.log(imgsrc.substring(13,imgsrc.lastIndexOf('_')))
			
			if(imgsrc.substring(13,imgsrc.lastIndexOf('_'))===result.pictureList[i].path){
				jsPictureList.push(pictureparentno)
				jsPictureList.push(result.pictureList[i].picno)*/
			} 
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
			
		}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
			console.log('submit()...');
			console.log("data-->", data)
			console.log(aaa)
			data.formData = {
				srtno: aaa
			}
			/*  name: $('#name').val(),
			        age: $('#age').val()
			    };*/

		},


		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data.result);
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
			/*  name: $('#name').val(),
			        age: $('#age').val()
			    };*/
			change=1;
			}
		}, // submit 


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
//			$('#write_save_btn').unbind("click");
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
			if (photo[i].length == 2) {
			    $("<div class='whole_collage2' id='TP-collage-" +countPhoto +"'>")
			    .html("<div  class='two_photo_col 2-collage' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
			     + "<div  class='two_photo_col 2-collage ' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
			     + "</div>"
			     + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
			     + "<ul class='clrfix'>"
			     + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
			     + "<li><button type='button' class='btn_edit'>편집</button></li>"
			     + "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"'>캡션</button></li>"
			     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
			     + "</ul>"
			     + "</div>"
			     
			     ).appendTo(textParent)
			     $('#collage2-1-count'+ countPhoto +'> img').attr('src', photo[i][0].path + "_600.png").css('width', '534px').css('height','534px');
			     $('#collage2-2-count'+ countPhoto +'> img').attr('src', photo[i][1].path + "_600.png").css('width', '534px').css('height','534px');
			     $('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
			     
			     if(photo[i][0].lati != null && photo[i][0].longit != null) {
			    	 var lat = photo[i][0].lati
			    	 var long = photo[i][0].longit
			    	 googleapisView(lat, long, countPhoto)
			     }
			     
			     $('.tool_box').remove()
			     deletephoto(countPhoto)
			     popCaptionModal(countPhoto)
			} else if (photo[i].length == 3) {
				
//				var str = ".." + data._response.result[i].path;
//				var dataSource = data._response.result[i].path
				
				try {
				  $("<div class='whole_collage3'>")
				  .html("<div class='collage3-big 3-collage' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
				   + "<div class='collage3_2inner_collage'>"
				   + "<div class='inner_two_collage 3-collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
				   + "<div class='inner_two_collage 3-collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
				   + "</div></div>"
				   
				   + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
				     + "<ul class='clrfix'>"
				     + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				     + "<li><button type='button' class='btn_edit'>편집</button></li>"
				     + "<li><button type='button' class='btn_caption'>캡션</button></li>"
				     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				     + "</ul>"
				     + "</div>"
				     
				   ).appendTo(textParent)
					$('#collage3-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_600.png").css('width', '534px').css('height','534px');
					$('#collage3-2'+ countPhoto +' > img').attr('src', photo[i][1].path +"_300.png").css('width', '260px').css('height','265px');
					$('#collage3-3'+ countPhoto +' > img').attr('src', photo[i][2].path +"_300.png").css('width', '260px').css('height','265px');
					
					$('#detail-date-div-'+ countPhoto).attr("value",photo[i][0].time)
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
			    $("<div class='whole_collage4'>")
			    .html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
			     + "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
			     + "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
			     + " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
			     + "</div>"
			     
			     + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
			     + "<ul class='clrfix'>"
			     + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
			     + "<li><button type='button' class='btn_edit'>편집</button></li>"
			     + "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"'>캡션</button></li>"
			     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
			     + "</ul>"
			     + "</div>"
			     ).appendTo(textParent)
			     
			    $('#collage4-1'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage4-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage4-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage4-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#detail-date-div-'+ countPhoto).attr("value",photo[i][0].time)
			    
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
				  $("<div class='whole_collage5'>")
				  .html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
				  + "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
				  + "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

				  + "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
				  + "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
				  + "</div>"
				  
  			      + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
			      + "<ul class='clrfix'>"
			      + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
			      + "<li><button type='button' class='btn_edit'>편집</button></li>"
			      + "<li><button type='button' class='btn_caption'>캡션</button></li>"
			      + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
			      + "</ul>"
			      + "</div>"
			      
			    ).appendTo(textParent) 
			    $('#collage5-1'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '260px').css('height','260px');
			    $('#collage5-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '259px').css('height','260px');
			    $('#collage5-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','260px');
			    
			    $('#collage5-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage5-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#detail-date-div-'+ countPhoto).attr("value",photo[i][0].time)
			    
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
				  $("<div class='whole_collage6'>")
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
				    + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				    + "<li><button type='button' class='btn_edit'>편집</button></li>"
				    + "<li><button type='button' class='btn_caption'>캡션</button></li>"
				    + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				    + "</ul>"
				    + "</div>"
				    ).appendTo(textParent)
				    
			    $('#collage6-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_600.png").css('width', '534px').css('height','534px');
			    $('#collage6-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '260px').css('height','265px');
			    $('#collage6-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','265px');
			    
			    $('#collage6-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '264px').css('height','260px');
			    $('#collage6-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '264px').css('height','260px');
			    $('#collage6-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '264px').css('height','260px');
			    $('#detail-date-div-'+ countPhoto).attr("value",photo[i][0].time)
			    
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
				  $("<div class='whole_collage7'>")
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
				     + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				     + "<li><button type='button' class='btn_edit'>편집</button></li>"
				     + "<li><button type='button' class='btn_caption'>캡션</button></li>"
				     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				     + "</ul>"
				     + "</div>"
				    ).appendTo(textParent)  
				    $('#collage7-1-small'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '192px').css('height','193px');
				    $('#collage7-2-small'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '192px').css('height','193px');
				    $('#collage7-3-small'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '192px').css('height','193px');
				    $('#collage7-4-small'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '192px').css('height','193px');
				    
				    $('#collage7-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '397px').css('height','397px');
				    $('#collage7-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '397px').css('height','397px');
				    $('#collage7-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '397px').css('height','397px');
				    $('#detail-date-div-'+ countPhoto).attr("value",photo[i][0].time)
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
				     
				     + "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
				     + "<ul class='clrfix'>"
				     + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
				     + "<li><button type='button' class='btn_edit'>편집</button></li>"
				     + "<li><button type='button' class='btn_caption'>캡션</button></li>"
				     + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
				     + "</ul>"
				     + "</div>"
				     ).appendTo(textParent)
				  

					
			    $('#collage8-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
			    $('#collage8-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage8-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage8-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '195px').css('height','195px');
			    $('#collage8-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '195px').css('height','195px');
			    
			    $('#collage8-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '262px').css('height','260px');
			    $('#collage8-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '262px').css('height','260px');
			    $('#collage8-8'+ countPhoto +' > img').attr('src', photo[i][7].path+"_300.png").css('width', '262px').css('height','260px');
			    $('#detail-date-div-'+ countPhoto).attr("value",photo[i][0].time)
			    
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
				    $("<div class='whole_collage9'>")
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
					  + "<li><button type='button' class='btn_add'>추가</button><input type='file' accept='image/*' multiple='' style='display: none;'></li>"
					  + "<li><button type='button' class='btn_edit'>편집</button></li>"
					  + "<li><button type='button' class='btn_caption'>캡션</button></li>"
					  + "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
					  + "</ul>"
					  + "</div>"
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
			    $('#detail-date-div-'+ countPhoto).attr("value",photo[i][0].time)
			    
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
			} // 사진 for문
//		})
		} //done
});
function showControlBox(count) {
	$(document).ready(function() {
//			  contBoxCount = $(this).prop('id').split('_')[2]
//			  console.log('#control-box-div-'+contBoxCount)
		    if($('#control-box-div-'+count).css("display") == "block") {
		      $('#control-box-div-'+count).css('display', 'none');
		    } else {
		  $('#control-box-div-'+count).css('display', 'block');
		}
		console.log("누름")
		})
//	event.preventDefault()
	return false;
	}
function popCaptionModal(countPhoto) {
	  $('#edtbtn-'+countPhoto).click(function() {
		  console.log("눌렀냐")
		  $('.caption_modal').css('display', 'block') 
		  event.stopPropagation()
	  })
}
	var deleteTextParent = [];
	var deletePhoto = [];
	
function deletephoto(countPhoto) {
//		$(document).ready(function() {
  $('#delbtn-'+countPhoto).click(function() {
	  deleteTextParent = $(this).parents('#text_parent_'+countPhoto)
	  var deleteTextParentChild =deleteTextParent.children();

//				console.log(deleteTextParent.children('#whole_collage2'+countPhoto))
	  console.log(deleteTextParentChild.eq(1).children('img').attr('src'))
	  console.log(deleteTextParentChild.eq(0).children('img').attr('src'))
	  console.log(deleteTextParentChild.eq(0).attr('class'))

	  for (var i = 0;i < $('img',deleteTextParentChild).length; i++) {
		  console.log("ㅇㅇ")
		  console.log($('img',deleteTextParentChild).eq(i).attr('src').slice(0, -8))
		  console.log("경로 자르기")
		  var cut = [];
//					   console.log((deleteTextParentChild.eq(i).children('img').attr('src').split('/')[2]))
//					   console.log((deleteTextParentChild.eq(i).children('img').attr('src').split('/')[2]).slice(0, -8))
		  deletePhoto.push($('img',deleteTextParentChild).eq(i).attr('src').slice(0, -8))
	
	  } //for 
	  console.log(countPhoto)
	  delPhotoTransm()
	  event.stopPropagation()
	  console.log(deletePhoto)
	  $('#text_parent_'+countPhoto).parent().remove()
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
//	var lat = 50.66689945219873
//    var lng = 10.945107824227307
//	var lat = 55.20289983692148
//	var lng = -112.2676599030092	
//	var lat = 33.506907295397205
//	var lng = 130.50981089429115
//	var lat = 30.632815790300985 중국
//	var lng = 119.59173560098864
	
    var geocode = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false";
    jQuery.ajax({
        url: geocode,
        type: 'POST',
           success: function(myJSONResult){
                    if(myJSONResult.status == 'OK') {
                        var tag = "";
                        var i;
                        var koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
//                        var englishCheck = /^[0-9]/ 
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

//googleapisView();

/*back file up 끝*/