
var content = $('#text_box');
var posted;
var no = location.href.split('?')[1].split('=')[1]
console.log(no)
var memberno=0;
var writeMemberno=0;
var picArray = [];

/*detail 출력*/
$.post('/travelstudio/detail/selectedOneDetail.json', {
	'number': no
	},function(result) {
	console.log(result);
	
	console.log(result.data.list)
	var array1=result.data
	/*result.data.list.sort(function (a, b){
		return a.srtno < b.srtno ? -1 : 1;
	})
	console.log(result.data.list);*/
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
		console.log(array1.list)
		console.log(array1.list.length)
		for(i=0; i < array1.list.length; i++){
			
		/*	picArray = */
			for(j=0 ; j < result.fileList.length ; j++){
				console.log(array1.list[i].picno)
				if(array1.list[i].picno!=0){
					if(array1.list[i].picno == result.fileList[j].picno){
						array1.list[i].picno = result.fileList[j].path
						console.log(result.fileList[j].picno)
						console.log(array1.list)
						
						
				}
				}
			}
			var picCount=0;
			if(picno.length==9){
				console.log("8888")
				for(i = 0; i < result.fileList.length ;i++){
				console.log(result.fileList[i].path);
				picArray[picCount++] = result.fileList[i].path
				console.log(picArray)
				
				
				
				
				console.log([result.fileList[i]])
				console.log(result.fileList[i].path)
				console.log(result.fileList);
				/*}*/
					{
				    $("<div class='whole_collage9'>")
				     .html("<div  id='collage9-1-big'><img id='img_4' src='ca.jpg'></div>"
				      +"<div  class='four_of_nine'>"
				      +"<div class='right_four_of_nine' id='collage9-2" +result.fileList.length +"'><img src=''></div>"
				      +"<div class='right_four_of_nine' id='collage9-3" +result.fileList.length +"'><img src=''></div>"
				      +"<div class='right_four_of_nine' id='collage9-4" +result.fileList.length +"'><img src=''></div>"
				      +"<div class='right_four_of_nine' id='collage9-5" +result.fileList.length +"'><img src=''></div>"
				      +"</div>"

				      +"<div  class='bottom_four_of_nine' id='collage9-6" +result.fileList.length +"'><img src=''></div>"
				      +"<div  class='bottom_four_of_nine' id='collage9-7" +result.fileList.length +"'><img src=''></div>"
				      +"<div  class='bottom_four_of_nine' id='collage9-8" +result.fileList.length +"'><img src=''></div>"
				      +"<div  class='bottom_four_of_nine' id='collage9-9" +result.fileList.length +"'><img src=''></div>"
				      +"</div>"
				  ).appendTo($(".without_heart_main"))
					
			    $('#collage9-1-big'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][0]+"_400.png").css('width', '397px').css('height','397px');
			    $('#collage9-2'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][1]+"_200.png").css('width', '195px').css('height','195px');
			    $('#collage9-3'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][2]+"_200.png").css('width', '195px').css('height','195px');
			    $('#collage9-4'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][3]+"_200.png").css('width', '195px').css('height','195px');
			    $('#collage9-5'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][4]+"_200.png").css('width', '195px').css('height','195px');
			    
			    $('#collage9-6'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][5]+"_200.png").css('width', '195px').css('height','191px');
			    $('#collage9-7'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][6]+"_200.png").css('width', '195px').css('height','191px');
			    $('#collage9-8'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][7]+"_200.png").css('width', '195px').css('height','191px');
			    $('#collage9-9'+ result.fileList.length +' > img').attr('src', "/travelstudio/"+picArray[i][8]+"_200.png").css('width', '195px').css('height','191px');
			    
				}
				}
			}
		}
		
		console.log(array1.list)
		console.log(result.fileList);
	
		/*var template6 = Handlebars.compile($('#content-template-6').html())
		
		var generatedHTML6 = template6(result) 
		pictures.append(generatedHTML6) */
		console.log(result)
		var template2 = Handlebars.compile($('#content-template-2').html())
		
		var generatedHTML2 = template2(array1)
		
		content.append(generatedHTML2) 
		/*console.log($('#map').attr('data-lati'));*/
		/*console.log($('#map').attr(longit));*/
		console.log($('#map'))
		console.log(array1)
		for(i=0; i<array1.list.length;i++){
			if(array1.list[i].lati!=0){
				initMap('map'+array1.list[i].srtno)
			}
		}
	}, 'json')
	console.log(array1.list)
	

	
}) // getJSON()

/*detail 출력 끝*/

function sortObject(o){
    var sorted = {},
    srtno, a = [];
    // 키이름을 추출하여 배열에 집어넣음

    for (srtno in o) {
        if (o.hasOwnProperty(srtno)) a.push(srtno);
    }
    // 키이름 배열을 정렬
    a.sort();
    // 정렬된 키이름 배열을 이용하여 object 재구성

    for (srtno=0; srtno<a.length; srtno++) {

        sorted[a[srtno]] = o[a[srtno]];
    }
    return sorted;

}


/*대표사진 div안에 들어가는 내용*/
var title = $('#blank-one');
	$.post('/travelstudio/post/selectOne.json', {
		'number': no
	}, function(result) {
		console.log(result.data.selectedPost.path);
		memberno=result.data.selectedPost.mno
		console.log(result.data.selectedPost.like)
		$('#heart-count').html(result.data.selectedPost.good)
		var template3 = Handlebars.compile($('#content-template-3').html())
		
		var generatedHTML3 = template3(result.data) 
		title.append(generatedHTML3) 
		$('#blank-one').css({"background-image": "url(.."+result.data.selectedPost.cont+"_1920.png)",
			                 "background-position" : "right-top",
			                 "background-repeat" : "no-repeat",
			                 "background-attachment" : "fixed"});  
		
		
	
		})
		/*console.log(result.data)*/
		
/*	}, 'json')*/
	
/*대표사진 div안에 들어가는 내용 끝*/

/*게시글이 끝날 때 나타나는 작성자 프로필*/
var writer = $('#profile_box');
$.post('/travelstudio/post/info1.json', {
		'number': no
	}, function(result) {
		console.log(result.data);
		writeMemberno=result.data.info[0].mno
		console.log(result.data.info[0].mno)
		var template4 = Handlebars.compile($('#content-template-4').html())
		var generatedHTML4 = template4(result.data) 
		writer.append(generatedHTML4)
		console.log(result.data)
		
		setTimeout("pageloadsubsc()",30);
	}, 'json')
	


/*댓글 뿌리기*/
var reply = $('.comment_container');
$.post('/travelstudio/comment/list.json', {
		'number': no
	}, function(result) {
		console.log(result.data.list);
		var template = Handlebars.compile($('#comment-template').html())
		var generatedHTML = template(result.data)
		reply.append(generatedHTML) 
	}, 'json')

	
	
	
/* 댓글 insert. */
	
	
$('#send_btn').click(function() {
	console.log($('#text_reply').val())
	if($('#text_reply').val()==''){
		alert("내용을 입력하세요")
	}else{
		$.ajax({
			type: 'POST',
			url: '../comment/add.json',
			data: {'cont' : $('#text_reply').val(), 'postno':no}, 
			async: false,
			success: function(data) {

//				/*새로 insert된거만 어떻게 뿌림?*/
//				$.getJSON('../comment/list.json', function(result){
//					console.log(result.data.list);
//
////					var template = Handlebars.compile($('#comment-template').html())
////					var generatedHTML = template(result.data) 
////					reply.append(generatedHTML) 
//				})
				
			}
		});// ajax작업 끝나고
	}
	$('#text_reply').val("");
	$('.comment_container > #posted').remove();// 기존에 뿌려졌던 댓글 지워버림

/*새로 포함된 댓글과 함께 뿌림..ha*/
	var reply = $('.comment_container');
	$.post('/travelstudio/comment/list.json', {
		'number': no
	}, function(result) {
		console.log(result.data.list);
		var template = Handlebars.compile($('#comment-template').html())
		var generatedHTML = template(result.data)
		reply.append(generatedHTML) 
	}, 'json')
})



var loginmemberno;
$.getJSON('/travelstudio/member/header.json', function(result) {
	    var template = Handlebars.compile($('#comment-template-write').html())
	    var generatedHTML = template(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
	    if(result.data.loginMember!=undefined){
	    loginmemberno=result.data.loginMember.mno
	    searchheart(loginmemberno)
	    }
	    console.log(loginmemberno)
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    $('#replyer').append(generatedHTML) // 새 tr 태그들로 설정한다.

  }) // getJSON()

  function pageloadsubsc(){
	console.log(writeMemberno)
	console.log(loginmemberno)
  $.post('/travelstudio/follow/searchBymnomno2.json', {
    				'mno': loginmemberno,
    				'mno2': writeMemberno
    			}, function(result) {
    				console.log(result)
    			if(result.status=='success'){
    				console.log('success')
    				$('<button type="button" id="subsc_btn">').html('구독하기').css({"border": "1px solid #2be5a4", "color": "#2be5a4"}).appendTo(".sub_box")
    				/*$('#subsc_btn').*/
    			}else{
    				console.log('11')
    				$('<button type="button" id="subsc_btn">').html('구독하기').css({"border": "1px solid black", "color": "black"}).appendTo(".sub_box")
    				/*$('#subsc_btn').css({"border": "1px solid black", "color": "black"});*/
    			}
    			})
  
    			}
 function searchheart(loginmemberno){
	 $.post('/travelstudio/good/searchBymnopostno.json', {
		'postno': no,
		'mno': loginmemberno
	}, function(result) {
		console.log('1')
		console.log(result)
		if(result.status==='success'){
			$('#list_heart_1').attr('class','fa fa-heart fa-3x');
		}else{
			$('#list_heart_1').attr('class','fa fa-heart-o fa-3x');
		}
		
	}, 'json')
 
}

 
 
 $.getJSON('/travelstudio/follow/listByloginMember.json', function(result) {
	 console.log(result)
	 console.log('11')

}) // getJSON()


