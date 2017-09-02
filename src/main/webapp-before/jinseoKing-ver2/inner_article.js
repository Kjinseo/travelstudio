
var content = $('#text_box');

var no = location.href.split('?')[1].split('=')[1]
console.log(no)
var memberno=0;

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
		console.log(array1.list.length)
		for(i=0; i < array1.list.length; i++){
			for(j=0 ; j < result.fileList.length ; j++){
				console.log(array1.list[i].picno)
				if(array1.list[i].picno!=0){
					if(array1.list[i].picno == result.fileList[j].picno){
						array1.list[i].picno = result.fileList[j].path
						console.log(result.fileList[j].picno)
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
		console.log(result.data.info);
		var template4 = Handlebars.compile($('#content-template-4').html())
		var generatedHTML4 = template4(result.data) 
		writer.append(generatedHTML4)
		console.log(result.data)
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




$.getJSON('/travelstudio/member/header.json', function(result) {
	    var template = Handlebars.compile($('#comment-template-write').html())
	    var generatedHTML = template(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    $('#replyer').append(generatedHTML) // 새 tr 태그들로 설정한다.

  }) // getJSON()

/*

$.getJSON('/travelstudio/member/header.json', function(result) {
	var mno=parseInt(result.mno);
	if(mno==null){
		
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="./login.html"
		    //Other code etc.
		});
	}else if(mno=!memberno){
		$('#slide_icon').css('display','inline-block');
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="../mypage/write.html"
		    //Other code etc.
		});
	}else if(mno=!memberno){
		
	}
	    var template = Handlebars.compile($('#tbody-template4').html())
	    var generatedHTML = template(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    $('.slide_bar_content').append(generatedHTML) // 새 tr 태그들로 설정한다.
	      $.post('/post/count.json',
	    		  {mno : mno}	
	      , function(result) {
	    	  console.log(result.data.list.length)
	    	  
	    var template = Handlebars.compile($('#tbody-template4').html())
	    var generatedHTML = template(result.data.list) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    generatedHTML='';
	    $('.counting1').html(result.data.list.length) // 새 tr 태그들로 설정한다.

  })

  }) // getJSON()
*/