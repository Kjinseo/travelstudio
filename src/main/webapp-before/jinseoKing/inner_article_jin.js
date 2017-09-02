
var content = $('#text_box');

var no = location.href.split('?')[1].split('=')[1]
console.log(no)
var memberno=0;
var writeMemberno=0;

/*detail 출력*/
$.post('/detail/selectedOneDetail.json', {
	'number': no // 게시물 번호를 가지고 디테일 테이블에 가서 조회한다.
},function(result) {
	var array1=result.data
	var picno=[]
	var piccount=0;
	for(i=0; i<result.data.list.length;i++){
		if(result.data.list[i].picno!=0){
			picno[piccount]=result.data.list[i].picno
			piccount++
		}
	}
	jQuery.ajaxSettings.traditional = true;
	var pictures = $('.whole_collage1');
	console.log(picno[0])
	if(picno[0]!=undefined){
		$.post('/picture/selectByPost.json', {
			'pictureno': picno
		}, function(result) {
			for(i=0; i < array1.list.length; i++){
				for(j=0 ; j < result.fileList.length ; j++){
					if(array1.list[i].picno!=0){
						if(array1.list[i].picno == result.fileList[j].picno){
							array1.list[i].picno = result.fileList[j].path
						}
					}
				}
			}
			console.log(array1.list)
			var Mapaa = new Map();
			console.log(result.fileList);

			var pictureARR=[]
			var j=0;
			for(i=1; i<array1.list.length;i++){
				console.log(array1.list[i].srtno)
				if(array1.list[i-1].srtno==array1.list[i].srtno){
					if(Mapaa.get(array1.list[i-1].srtno)==undefined){
						Mapaa.set(array1.list[i-1].srtno, array1.list[i-1].picno)
					}
					Mapaa.set(array1.list[i-1].srtno, Mapaa.get(array1.list[i-1].srtno) +','+ array1.list[i].picno)
					pictureARR[j++]=array1.list[i].srtno;
				}else if(i<array1.list.length-1){
				if(array1.list[i-1].picno!=0&& array1.list[i-1].srtno!=array1.list[i].srtno&&array1.list[i+1].srtno!=array1.list[i].srtno){
					array1.list[i].writer=array1.list[i].picno
					if(i==array1.list.length-1){
						if(array1.list[i].picno!=0&& array1.list[i-1].srtno!=array1.list[i].srtno){
							array1.list[i].writer=array1.list[i].picno
						}
					}
				}
				}if(i==1){
					if(array1.list[i].picno!=0 && array1.list[i-1].srtno!=array1.list[i].srtno){
							array1.list[i-1].writer=array1.list[i-1].picno
						}
				}
			}
			console.log(pictureARR)
			console.log(Mapaa)
			for(i=0; i< pictureARR.length; i++){
				for(j=0; j<array1.list.length; j++){
					if(pictureARR[i]==array1.list[j].srtno){
						array1.list[j].picno=undefined
						continue;
					}
				}
			}
			console.log(array1)
			/*console.log(array2)*/
			console.log(Mapaa)
			console.log(Mapaa.size)
			var aa=[]

			for (var [key, value] of Mapaa) {
				var count=0;
				console.log(key + " = " + value);
				for(z=0; z<array1.list.length;z++){
					console.log()
					aa=Mapaa.get(key).split(',')
					console.log(aa.length)
					if(array1.list[z].srtno==key){
						if(count==0){
							array1.list[z].picno=aa.length
							count++;
						}
					}
				}
			}
			console.log(array1)

			console.log(typeof(array1))

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
					setTimeout(initMap('map'+array1.list[i].srtno), 1000);
				}
			}


			
			countPhoto=0;

			setTimeout(makeCollageee(), 2000);


			function makeCollageee(){ 

				for (var [key, value] of Mapaa) {
					/*whole_collage3 0*/
					countPhoto++;
					var finalCollageArray=[]
					console.log()
					finalCollageArray=Mapaa.get(key).split(',')
					console.log(key+"="+value)
					console.log($("whole_collage" + aa.length+'_'+key))
					console.log($("#whole_collage" + aa.length+'_'+key))
					imagesDiv2=$($("#whole_collage" + finalCollageArray.length+'_'+key))
					var count=0;
					console.log(key + " = " + value);
					console.log(finalCollageArray)
					if (finalCollageArray.length == 2) {

						$(imagesDiv2).html("<div  class='two_photo_col' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
								+ "<div  class='two_photo_col' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
								+ "</div>"
						).appendTo(imagesDiv2)
						$('#collage2-1-count'+ countPhoto +'> img').attr('src',finalCollageArray[0]).css('width', '534px').css('height','534px');
						$('#collage2-2-count'+ countPhoto +'> img').attr('src',finalCollageArray[1]).css('height','534px');
						/*console.log(photo[i][0])*/
						/*console.log(photo[i][1])*/


					} else if (finalCollageArray.length == '3') {


						try {
							$(imagesDiv2).html("<div class='collage3-big' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
									+ "<div class='collage3_2inner_collage'>"
									+ "<div class='inner_two_collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
									+ "<div class='inner_two_collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
									+ "</div></div>"
							).appendTo(imagesDiv2)
							$('#collage3-1-big'+ countPhoto +' > img').attr('src',finalCollageArray[0]).css('width', '534px').css('height','534px');
							$('#collage3-2'+ countPhoto +' > img').attr('src', finalCollageArray[1]).css('width', '260px').css('height','265px');
							$('#collage3-3'+ countPhoto +' > img').attr('src',"../"+finalCollageArray[2]).css('width', '260px').css('height','265px');

						} catch (err) {}
					}else if (finalCollageArray.length == '4') {

						try {
							$(imagesDiv2).html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
									+ "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
									+ "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
									+ " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
									+ "</div>"
							).appendTo(imagesDiv2)

							$('#collage4-1'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0]).css('width', '397px').css('height','397px');
							$('#collage4-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1]).css('width', '397px').css('height','397px');
							$('#collage4-3'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2]).css('width', '397px').css('height','397px');
							$('#collage4-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3]).css('width', '397px').css('height','397px');

						} catch (err) {}    
					} else if (finalCollageArray.length == '5') {

						try {

							$(imagesDiv2).html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
									+ "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
									+ "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

									+ "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
									+ "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
									+ "</div>"
							)
							$('#collage5-1'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0]).css('width', '260px').css('height','260px');
							$('#collage5-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1]).css('width', '259px').css('height','260px');
							$('#collage5-3'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2]).css('width', '260px').css('height','260px');

							$('#collage5-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3]).css('width', '397px').css('height','397px');
							$('#collage5-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4]).css('width', '397px').css('height','397px');

						} catch (err) {}    
					} else if (finalCollageArray.length == '6') {

						try {

							$(imagesDiv2).html("<div class='collage6-big' id='collage6-1-big'" +countPhoto +"><img id='img_4' src=''></div>"
									+"<div id='collage6-2side-collage'>"
									+"<div class='side_two_collage' id='collage6-2'" +countPhoto +"><img src=''></div>"
									+"<div class='side_two_collage' id='collage6-3'" +countPhoto +"><img src=''></div>"
									+"</div>"

									+"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
									+"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
									+"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
									+"</div>"
							)
							$('#collage6-1-big'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0]).css('width', '534px').css('height','534px');
							$('#collage6-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1]).css('width', '260px').css('height','265px');
							$('#collage6-3'+ countPhoto +' > img').attr('src',"../"+finalCollageArray[2]).css('width', '260px').css('height','265px');

							$('#collage6-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3] + "_700.png").css('width', '264px').css('height','260px');
							$('#collage6-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4] + "_700.png").css('width', '264px').css('height','260px');
							$('#collage6-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5] + "_700.png").css('width', '264px').css('height','260px');

						} catch (err) {}    
					} else if (finalCollageArray.length == '7') {
						try {
							$(imagesDiv2).html("<div class='four_of_seven'>"
									+"<div class='right_four_of_seven' id='collage7-1-small" +countPhoto +"'>").html("<img src=''></div>"
											+"<div class='right_four_of_seven' id='collage7-2-small" +countPhoto +"'><img src=''></div>"
											+"<div class='right_four_of_seven' id='collage7-3-small" +countPhoto +"'><img src=''></div>"
											+"<div class='right_four_of_seven' id='collage7-4-small" +countPhoto +"'><img src=''></div>"
											+"</div>"


											+"<div  class='bottom_three_of_seven' id='collage7-5" +countPhoto +"'><img src=''></div>"
											+"<div  class='bottom_three_of_seven' id='collage7-6" +countPhoto +"'><img src=''></div>"
											+"<div  class='bottom_three_of_seven' id='collage7-7" +countPhoto +"'><img src=''></div>"
											+"</div>"
									)
									$('#collage7-1-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0] + "_700.png").css('width', '192px').css('height','193px');
							$('#collage7-2-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1] + "_700.png").css('width', '192px').css('height','193px');
							$('#collage7-3-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2] + "_700.png").css('width', '192px').css('height','193px');
							$('#collage7-4-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3] + "_700.png").css('width', '192px').css('height','193px');

							$('#collage7-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4] + "_700.png").css('width', '397px').css('height','397px');
							$('#collage7-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5] + "_700.png").css('width', '397px').css('height','397px');
							$('#collage7-7'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[6] + "_700.png").css('width', '397px').css('height','397px');


						} catch (err) {}    
					} else if (finalCollageArray.length == '8') {

						try {
							$(imagesDiv2).html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
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
							)



							$('#collage8-1-big'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0] + "_700.png").css('width', '397px').css('height','397px');
							$('#collage8-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1] + "_700.png").css('width', '195px').css('height','195px');
							$('#collage8-3'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2] + "_700.png").css('width', '195px').css('height','195px');
							$('#collage8-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3] + "_700.png").css('width', '195px').css('height','195px');
							$('#collage8-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4] + "_700.png").css('width', '195px').css('height','195px');

							$('#collage8-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5] + "_700.png").css('width', '262px').css('height','260px');
							$('#collage8-7'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[6] + "_700.png").css('width', '262px').css('height','260px');
							$('#collage8-8'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[7] + "_700.png").css('width', '262px').css('height','260px');

						} catch (err) {}    
					} else if (finalCollageArray.length == '9') {

						try {
							$(imagesDiv2)
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
							)

							$('#collage9-1-big'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0] + "_700.png").css('width', '397px').css('height','397px');
							$('#collage9-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1] + "_700.png").css('width', '195px').css('height','195px');
							$('#collage9-3'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2] + "_700.png").css('width', '195px').css('height','195px');
							$('#collage9-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3] + "_700.png").css('width', '195px').css('height','195px');
							$('#collage9-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4] + "_700.png").css('width', '195px').css('height','195px');

							$('#collage9-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5] + "_700.png").css('width', '195px').css('height','191px');
							$('#collage9-7'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[6] + "_700.png").css('width', '195px').css('height','191px');
							$('#collage9-8'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[7] + "_700.png").css('width', '195px').css('height','191px');
							$('#collage9-9'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[8] + "_700.png").css('width', '195px').css('height','191px');

						} catch (err) {}    
					} else {

						/* // 사진이 두장이라면
	              var str = photo[i][0].path;

	            try {
	               $("<img>").attr('src', str+"_300.png").css('width', 'auto').appendTo(textParent);
	            } catch (err) {}*/

					} //else
				}
			}

		}, 'json')
	}



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
$.post('/post/selectOne.json', {
	'number': no
}, function(result) {
	console.log(result.data.selectedPost.path);
	memberno=result.data.selectedPost.mno
	$('#heart-count').html(result.data.selectedPost.good)
	var template3 = Handlebars.compile($('#content-template-3').html())

	var generatedHTML3 = template3(result.data) 
	title.append(generatedHTML3)
	if(result.data.selectedPost.cont!=null){
		$('#blank-one').css({"background-image": "url(.."+result.data.selectedPost.cont+"_1920.png)",
			"background-position" : "right-top",
			"background-repeat" : "no-repeat",
			"background-attachment" : "fixed"});  
	}

})


/*대표사진 div안에 들어가는 내용 끝*/

/*게시글이 끝날 때 나타나는 작성자 프로필*/
var writer = $('#profile_box');
$.post('/post/info1.json', {
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
$.post('/comment/list.json', {
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

			}
		});// ajax작업 끝나고
	}
	$('#text_reply').val("");
	$('.comment_container > #posted').remove();// 기존에 뿌려졌던 댓글 지워버림

	/*새로 포함된 댓글과 함께 뿌림..ha*/
	var reply = $('.comment_container');
	$.post('/comment/list.json', {
		'number': no
	}, function(result) {
		console.log(result.data.list);
		var template = Handlebars.compile($('#comment-template').html())
		var generatedHTML = template(result.data)
		reply.append(generatedHTML) 
	}, 'json')
})



var loginmemberno;
$.getJSON('/member/header.json', function(result) {
	var template = Handlebars.compile($('#comment-template-write').html())
	var generatedHTML = template(result) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
	if(result.data.loginMember!=undefined){
		loginmemberno=result.data.loginMember.mno
		searchheart(loginmemberno)
	}
	console.log(loginmemberno)
//	tbody.text('') // tbody의 기존 tr 태그들을 지우고
	$('#replyer').append(generatedHTML) // 새 tr 태그들로 설정한다.

}) // getJSON()

function pageloadsubsc(){
	console.log(writeMemberno)
	console.log(loginmemberno)
	$.post('/follow/searchBymnomno2.json', {
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
	$.post('/good/searchBymnopostno.json', {
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



$.getJSON('/follow/listByloginMember.json', function(result) {
	console.log(result)
	console.log('11')

}) // getJSON()
