
var content = $('.without_heart_main');

var no = location.href.split('?')[1].split('=')[1]
console.log("pageno"+no)
var memberno=0;
var writeMemberno=0;
var coworkMember;
var array1
/*detail 출력*/

$(function() {
	$('.header-container').load('../main/header.html')
	$('.footer-container').load('../main/footer.html')
})



$.post('/cowork/searchcoworker.json', {
	'no': no // 게시물 번호를 가지고 디테일 테이블에 가서 조회한다.
},function(result) {
	console.log(result)
	if(result.list != undefined){
		coworkMember=result.list
		coworkerbuttonHtml(coworkMember)
	}
	
},'json')

$.post('/detail/selectedOneDetail.json', {
	'number': no // 게시물 번호를 가지고 디테일 테이블에 가서 조회한다.
},function(result) {
	array1=result.data
	console.log(array1)
	
	writeMemberno
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
	if(picno[0]!=undefined){
		$.post('/picture/selectByPost.json', { /*픽쳐번호 리스트를 만들어서 넘기면 사진 정보를 받아온다*/
			'pictureno': picno
		}, function(result) {
			console.log(result)
			for(i=0; i < array1.list.length; i++){
				for(j=0 ; j < result.fileList.length ; j++){
					if(array1.list[i].picno!=0){
						if(array1.list[i].picno == result.fileList[j].picno){
							array1.list[i].picno = result.fileList[j].path
						}
					}
				}
			}
			console.log(array1)
			var CaptionMap = new Map();
			var Mapaa = new Map();
			for(i=0; i< array1.list.length; i++){
				if(array1.list[i].capt!=undefined){
					if(CaptionMap.get(array1.list[i].srtno)==undefined){
						CaptionMap.set(array1.list[i].srtno, array1.list[i].capt)
						array1.list.splice(i,1);
						i--;
					}
				}
			}
			console.log("Caption 만들어짐",CaptionMap)
			var dateMap = new Map();
			
			for(i=0; i< array1.list.length; i++){
				if(array1.list[i].date!=undefined){
					if(dateMap.get(array1.list[i].srtno)==undefined){
						dateMap.set(array1.list[i].srtno, array1.list[i].date)
						array1.list.splice(i,1);
						i--;
					}
				}
			}console.log("dateMap 만들어짐",dateMap)
			
			var AddressMap = new Map();
			for(i=0; i< array1.list.length; i++){
				if(array1.list[i].address!=undefined){
					if(AddressMap.get(array1.list[i].srtno)==undefined){
						AddressMap.set(array1.list[i].srtno, array1.list[i].address)
						array1.list.splice(i,1);
						i--
					}
				}
			}
			console.log("Address 만들어짐",AddressMap)
			var pictureARR=[]
			
			
			
			
			var j=0;
			
		/*	for(i=1; i<array1.list.length;i++){
				if((array1.list[i-1].srtno==array1.list[i].srtno)&&array1.list[i].picno!=0&&array1.list[i-1].picno!=0){ //만약 0번의 소트번호와 1번의 소트번호가 같다면  그게 사진이라면 배열에 담는다
					if(Mapaa.get(array1.list[i-1].srtno)==undefined){//만약 소트번호가 0번의 소트번호가 정의되지 않았다면 
						Mapaa.set(array1.list[i-1].srtno, array1.list[i-1].picno)//소트번호와 사진 패스로 저장한다 
					}
					Mapaa.set(array1.list[i-1].srtno, Mapaa.get(array1.list[i-1].srtno) +','+ array1.list[i].picno)//첫번째가 아니라면 패스를 저장한다.
					pictureARR[j++]=array1.list[i].srtno; //그리고 맵에 저장한 사진을 픽쳐 배열에도 담는다.
				}else if((array1.list[i-1].srtno==array1.list[i].srtno)&&array1.list[i].picno!=0){
					
				}
			}
			*/
			for(i=1; i<array1.list.length;i++){ // 리스트 길이까지
				if((array1.list[i-1].srtno==array1.list[i].srtno)&&array1.list[i].picno!=0&&array1.list[i-1].picno!=0){ //만약 0번의 소트번호와 1번의 소트번호가 같다면  그게 사진이라면 배열에 담는다
					if(Mapaa.get(array1.list[i-1].srtno)==undefined){//만약 소트번호가 0번의 소트번호가 정의되지 않았다면 
						Mapaa.set(array1.list[i-1].srtno, array1.list[i-1].picno)//소트번호와 사진 패스로 저장한다 
					}//연속된 번호면서 둘다 사진일떄
					Mapaa.set(array1.list[i-1].srtno, Mapaa.get(array1.list[i-1].srtno) +','+ array1.list[i].picno)//첫번째가 아니라면 패스를 저장한다.
					pictureARR[j++]=array1.list[i].srtno; //그리고 맵에 저장한 사진을 픽쳐 배열에도 담는다.
				}else if(i<=array1.list.length-1&& i>1){//소트번호가 다르다면 
					if(i==array1.list.length-1){ //마지막 번호라면 
						if(array1.list[i].picno!=0&& array1.list[i-1].srtno!=array1.list[i].srtno){//사진이 있고 소트번호가 마지막 의 번호와 다르다면 1개짜리 사진이다
							array1.list[i].writer=array1.list[i].picno
						}
					}//연속된 번호는 아니지만 사진일때 한개씩 들어간다
					else if(array1.list[i].picno!=0 && array1.list[i-1].srtno!=array1.list[i].srtno && array1.list[i+1].srtno!=array1.list[i].srtno){
						console.log("263 들어왔다 사진이 0이 아니고 앞뒤랑 소트번호가 다를때 " ,array1.list[i])
					array1.list[i].writer=array1.list[i].picno
					}//사진이 있고 
				}if(i==1){ // 첫번째 일때 첫번째 사진이 있고 페어런츠가 다르거나 또는 || 배열 0번과 1번의 소트번호가 같고 사진번호가   둘중 하나가 0이고 소트번호가 같거나  
					if(array1.list[i-1].picno!=0 && ((array1.list[i-1].srtno!=array1.list[i].srtno)||((array1.list[i-1].srtno==array1.list[i].srtno)&&(array1.list[i-1].picno==0)||(array1.list[i].picno==0)))){
							array1.list[i-1].writer=array1.list[i-1].picno
						}
				}
			}
			console.log(Mapaa)
			console.log(array1)
			console.log(pictureARR)
			
			for(i=0; i< pictureARR.length; i++){ /*같은거 담은거 길이만큼반복하면서  array1의 픽처넘버를 undefined로 바꾼다*/
				for(j=0; j<array1.list.length; j++){ /**/
					if(pictureARR[i]==array1.list[j].srtno){
						console.log(array1.list.splice(j,1))
						j--;
						
						/*&&array1.list[j].capt==undefined*/
						break;
					}
				}
			}
			
			console.log(array1)
			var aa=[]

			for (var [key, value] of Mapaa) { /*중복된 사진 담은 맵 길이만큼 나눠서 배열에 담는다*/
				var count=0;
				for(z=0; z<array1.list.length;z++){
					aa=Mapaa.get(key).split(',')
					if(array1.list[z].srtno==key){
						if(count==0){
							array1.list[z].picno=aa.length
							count++;
						}
					}
				}
			}
			/*for(l=0; l<array1.list.length;l++){
				if(array1.list[l].picno==undefined){
					array1.list.splice(l,1);
				}
			}
			for(l=0; l<array1.list.length;l++){
				if(array1.list[l].picno==undefined){
					array1.list.splice(l,1);
				}
			}*/
			console.log(array1)
			var template2 = Handlebars.compile($('#content-template-2').html())
			var generatedHTML2 = template2(array1)

			content.append(generatedHTML2) 
			for(i=0; i<array1.list.length;i++){
				if(array1.list[i].lati!=0){
					setTimeout("initMap('map"+array1.list[i].srtno+"')", 1000);
				}
			}
			
			

			
			countPhoto=0;

			setTimeout(makeCollageee(), 2000);


			function makeCollageee(){ 

				for (var [key, value] of Mapaa) {
					/*whole_collage3 0*/
					countPhoto++;
					var finalCollageArray=[]
					finalCollageArray=Mapaa.get(key).split(',')
					imagesDiv2=$($("#whole_collage" + finalCollageArray.length+'_'+key))
					var count=0;
					if (finalCollageArray.length == 2) {
						$(imagesDiv2).html("<div  class='two_photo_col' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
								+ "<div  class='two_photo_col' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
								+ "</div>"
						).appendTo(imagesDiv2)
						$('#collage2-1-count'+ countPhoto +'> img').attr('src',finalCollageArray[0]).css('width', '534px').css('height','534px');
						$('#collage2-2-count'+ countPhoto +'> img').attr('src',finalCollageArray[1]).css('height','534px');
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
							$('#collage3-3'+ countPhoto +' > img').attr('src',finalCollageArray[2]).css('width', '260px').css('height','265px');

						} catch (err) {}
					}else if (finalCollageArray.length == '4') {

						try {
							$(imagesDiv2).html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
									+ "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
									+ "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
									+ " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
									+ "</div>"
							).appendTo(imagesDiv2)

							$('#collage4-1'+ countPhoto +' > img').attr('src', finalCollageArray[0]).css('width', '397px').css('height','397px');
							$('#collage4-2'+ countPhoto +' > img').attr('src', finalCollageArray[1]).css('width', '397px').css('height','397px');
							$('#collage4-3'+ countPhoto +' > img').attr('src', finalCollageArray[2]).css('width', '397px').css('height','397px');
							$('#collage4-4'+ countPhoto +' > img').attr('src', finalCollageArray[3]).css('width', '397px').css('height','397px');

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
							$(imagesDiv2).html("<div class='collage6-big' id='collage6-1-big" +countPhoto +"'><img id='img_4' src=''></div>"
									+"<div id='collage6-2side-collage'>"
									+"<div class='side_two_collage' id='collage6-2" +countPhoto +"'><img src=''></div>"
									+"<div class='side_two_collage' id='collage6-3" +countPhoto +"'><img src=''></div>"
									+"</div>"

									+"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
									+"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
									+"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
									+"</div>"
							)
							$('#collage6-1-big'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0]).css('width', '534px').css('height','534px');
							$('#collage6-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1]).css('width', '260px').css('height','265px');
							$('#collage6-3'+ countPhoto +' > img').attr('src',"../"+finalCollageArray[2]).css('width', '260px').css('height','265px');

							$('#collage6-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3]).css('width', '264px').css('height','260px');
							$('#collage6-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4]).css('width', '264px').css('height','260px');
							$('#collage6-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5]).css('width', '264px').css('height','260px');

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
									$('#collage7-1-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0]).css('width', '192px').css('height','193px');
							$('#collage7-2-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1]).css('width', '192px').css('height','193px');
							$('#collage7-3-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2]).css('width', '192px').css('height','193px');
							$('#collage7-4-small'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3]).css('width', '192px').css('height','193px');

							$('#collage7-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4]).css('width', '397px').css('height','397px');
							$('#collage7-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5]).css('width', '397px').css('height','397px');
							$('#collage7-7'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[6]).css('width', '397px').css('height','397px');


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



							$('#collage8-1-big'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0]).css('width', '397px').css('height','397px');
							$('#collage8-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1]).css('width', '195px').css('height','195px');
							$('#collage8-3'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2]).css('width', '195px').css('height','195px');
							$('#collage8-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3]).css('width', '195px').css('height','195px');
							$('#collage8-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4]).css('width', '195px').css('height','195px');

							$('#collage8-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5]).css('width', '262px').css('height','260px');
							$('#collage8-7'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[6]).css('width', '262px').css('height','260px');
							$('#collage8-8'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[7]).css('width', '262px').css('height','260px');

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

							$('#collage9-1-big'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[0]).css('width', '397px').css('height','397px');
							$('#collage9-2'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[1]).css('width', '195px').css('height','195px');
							$('#collage9-3'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[2]).css('width', '195px').css('height','195px');
							$('#collage9-4'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[3]).css('width', '195px').css('height','195px');
							$('#collage9-5'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[4]).css('width', '195px').css('height','195px');

							$('#collage9-6'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[5]).css('width', '195px').css('height','191px');
							$('#collage9-7'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[6]).css('width', '195px').css('height','191px');
							$('#collage9-8'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[7]).css('width', '195px').css('height','191px');
							$('#collage9-9'+ countPhoto +' > img').attr('src', "../"+finalCollageArray[8]).css('width', '195px').css('height','191px');

						} catch (err) {}    
					} else {

						/* // 사진이 두장이라면
	              var str = photo[i][0].path;

	            try {
	               $("<img>").attr('src', str+"_300.png").css('width', 'auto').appendTo(textParent);
	            } catch (err) {}*/

					} //else
				}
				for (var [key, value] of CaptionMap){
				$('<div id="txt-output-'+key+'" class="capt_output">'+value+'</div>').appendTo($('#text_parent_'+key+''))
				}
				
				for (var [key, value] of dateMap){
					$('#travel_detail_date_'+key).html('<i class="fa fa-pencil-square-o" aria-hidden="true">'+value+'</i>')
					/*$('<div id="txt-output-'+key+'" class="capt_output">'+value+'</div>').appendTo()*/
					}
				for (var [key, value] of AddressMap){
					$('#travel_detail_place_'+key+'').html(value)
					/*$('<div id="txt-output-'+key+'" class="capt_output">'+value+'</div>').appendTo($('#travel_day_'+key+''))*/
					}
				$( ".travel_day" ).each(function() {
					
					  if($(this).children().children().val()==null&&$(this).children().eq(1).val()==null){
						  $(this).attr('display','none');
					  }
					});
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
	memberno=result.data.selectedPost.mno
	$('#heart-count').html(result.data.selectedPost.good)
	var template3 = Handlebars.compile($('#content-template-3').html())

	var generatedHTML3 = template3(result.data) 
	title.append(generatedHTML3)
	console.log(result.data.selectedPost.cont)	
	if(result.data.selectedPost.cont!=null){
		$('#blank-one').css({"background-image": "url("+result.data.selectedPost.cont+"_1920.png)",
			"background-position" : "right-top",
			"background-repeat" : "no-repeat",
			"background-attachment" : "fixed"});  
	}
	setTimeout('buttonHtml()',1000)
	
})


function buttonHtml(){
	if(loginmemberno==memberno){
		$('#start-my-journey').html('여행기 수정')
		$('#start-my-journey').click(function(){
			location.href="./edit.html?postno="+no
		})
	}else{
		$('#start-my-journey').html('여행기 작성')
		$('#start-my-journey').click(function(){
			location.href="./write.html"
		})
	}
}

function coworkerbuttonHtml(paraMember){
	console.log(paraMember)
	if(paraMember!=null){
	for(i=0; i< coworkMember.length; i++){
	if(loginmemberno==coworkMember[i].mno && coworkMember[i].confirm=='1'){
		$('#start-my-journey').html('여행기 수정')
		$('#start-my-journey').click(function(){
			location.href="./edit.html?postno="+no
		})
	}else{
		$('#start-my-journey').html('여행기 작성')
		$('#start-my-journey').click(function(){
			location.href="./write.html"
		})
	}
	}
	}
}
/*대표사진 div안에 들어가는 내용 끝*/

/*게시글이 끝날 때 나타나는 작성자 프로필*/
var writer = $('#profile_box');

$.post('/post/info1.json',{'number': no},function(result){
	console.log(no)
	let thismno=result.data.info[0].mno
	
	let usersInfo=function(no){$.post('/member/detail.json', {
		'mno': no
	}, function(result) {
		console.log(result)
//		writeMemberno=result.data.info[0].mno
		var template4 = Handlebars.compile($('#content-template-4').html())
		var generatedHTML4 = template4(result.data) 
		console.log(result.data)
		writer.append(generatedHTML4)

		setTimeout("pageloadsubsc()",30);
	}, 'json')
   }
	console.log(thismno)
	usersInfo(thismno)
})



/*댓글 뿌리기*/
var reply = $('.comment_container');
$.post('/comment/list.json', {
	'number': no
}, function(result) {
	var template = Handlebars.compile($('#comment-template').html())
	var generatedHTML = template(result.data)
	reply.append(generatedHTML) 
}, 'json')




/* 댓글 insert. */


$('#send_btn').click(function() {
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
//	tbody.text('') // tbody의 기존 tr 태그들을 지우고
	$('#replyer').append(generatedHTML) // 새 tr 태그들로 설정한다.

}) // getJSON()

function pageloadsubsc(){
	$.post('/follow/searchBymnomno2.json', {
		'mno': loginmemberno,
		'mno2': writeMemberno
	}, function(result) {
		if(result.status=='success'){
			$('<button type="button" id="subsc_btn">').html('구독하기').css({"border": "1px solid #2be5a4", "color": "#2be5a4"}).appendTo(".sub_box")
			/*$('#subsc_btn').*/
		}else{
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
		if(result.status==='success'){
			$('#list_heart_1').attr('class','fa fa-heart fa-3x');
		}else{
			$('#list_heart_1').attr('class','fa fa-heart-o fa-3x');
		}

	}, 'json')

}



/*$.getJSON('/follow/listByloginMember.json', function(result) {

}) // getJSON()
*/




var mapname2;
function initMap(mapname) {
	   mapname2=mapname
    var map = new google.maps.Map(document.getElementById(mapname), {
      zoom: 8,
      center: {lat: parseFloat(document.getElementById(mapname).getAttribute('data-lati')), lng: parseFloat(document.getElementById(mapname).getAttribute('data-longit'))}
    });
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;

    geocodeLatLng(geocoder, map, infowindow);
  }

  function geocodeLatLng(geocoder, map, infowindow) {
	 
    /* var input = document.getElementById('latlng').value; */
    
    /* var latlngStr = input.split(',', 2); */
    var latlng = {lat: parseFloat(document.getElementById(mapname2).getAttribute('data-lati')), lng: parseFloat(document.getElementById(mapname2).getAttribute('data-longit'))};
    geocoder.geocode({'location': latlng}, function(results, status) {
      if (status === 'OK') {
        if (results[1]) {
          map.setZoom(14);
          map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            position: latlng,
            map: map
          });
          infowindow.setContent(results[1].formatted_address);
          infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }


<!-- 하트 -->
  $("#list_heart").on({
    'click':function(){
if(loginmemberno==undefined){
	alert("'좋아요'를 하려면 로그인이 필요합니다.")
}else{
 	   var number;
     //  class="fa fa-heart fa-2x"
     //  class="fa fa-heart-o fa-2x"
      var color = ($('#list_heart>i').attr('class') === 'fa fa-heart-o fa-3x')
             ? 'fa fa-heart fa-3x'
             : 'fa fa-heart-o fa-3x';
     	 number = parseInt($('#heart-count').html())
  	if(color=='fa fa-heart fa-3x'){
 		$("#heart-count").html(number+1)
  	}else{
  		$("#heart-count").html(number-1)
  	}
 $('#list_heart_1').attr('class',color);
 likeclick(color,number); 
     }
  }})
  
  
  
function likeclick(color,number){
 	 $.post('/good/searchBymnopostno.json', {
		'postno': no,
		'mno': loginmemberno
	}, function(result) {
		if(result.status!='success'){
			number+=1;
			$.post('/good/add.json', {
 			'postno':no,
 			'mno':loginmemberno, //js의 댓글작성부분에서 memberinfo값 정의한다.
 			'gcnt':1,
 			'number':number
 		}, function(result) {
 		})
		}else{
			number-=1;
			$.post('/good/delete.json', {
 			'postno':no,
 			'mno':loginmemberno, //js의 댓글작성부분에서 memberinfo값 정의한다.
 			'number':number
 		}, function(result) {
 	
 		})
		}
	}, 'json')
}
 	 /* 구독하기 시작 */
 	 $(document).on("click",'#subsc_btn',function(){  
 	 if(loginmemberno==undefined){
 			alert("'좋아요'를 하려면 로그인이 필요합니다.")
 		}else{
      if($(this).css('color')=='rgb(0, 0, 0)'){
        $(this).css({"border": "1px solid #2be5a4", "color": "#2be5a4"});
        subClick('add')
      }
      else{
        $(this).css({"border": "1px solid black", "color": "black"});
        subClick('del')
      }
 		}
    });
  /* 구독하기 끝*/

  function subClick(res){
 		  $.post('/follow/searchBymnomno2.json', {
 				'mno': loginmemberno,
 				'mno2': writeMemberno
 			}, function(result) {
 				if(result.status!='success'){ //만약 해당하는 데이터가 없다면 add 시키고 
 					$.post('/follow/add.json', {
 		    			'mno':loginmemberno, //js의 댓글작성부분에서 memberinfo값 정의한다.
 		    			'mno2':writeMemberno,
 		    			'postno':no
 		    		}, function(result) {
 		    			
 		    		})
 				}else{ //로그인 회원 번호와 작성자 회원 번호로 데이터값 조회 했을때 있다면 delete 시킨다.
 					
 					$.post('/follow/delete.json', {
 						'mno': loginmemberno,
	    				'mno2': writeMemberno
 		    		}, function(result) {
 		    		})
	 			 } //else 끝
 			})
  }


     $('#posted').mouseover(function(){
       $('#singo').css("display", "inline-block");
     });
     $('#posted').mouseleave(function(){
       $("#singo").hide();
     });
function slideCall() {
$('#slide_icon').click(function (){
$('.slide_bar').animate({left:0}, 350);
$('.cover_dimmed').show();
})

$('#cancel_icon').click(function () {
$('.slide_bar').animate({left:-320}, 350);
$('.cover_dimmed').hide();
})
}
function slide_off() {
$('.cover_dimmed').click(function () {
 $('.slide_bar').animate({left:-320}, 350);
 $('.cover_dimmed').hide();
})
}
$(document).ready(slideCall)
$(document).ready(slide_off)
//(slideCall);


var image;
var ordering;
var collageList;
var collageCount;

$(document).ready(function(){ 
$('.without_heart_main').click(function(e){
   /*  var src = e.target.getAttribute('src'); */
    var name = e.target.parentElement.parentElement 
   /*  .parentElement.parentElement */
    if ((name != '') && (name != null)) {
    var name2 = name.children;
  
    var collageLeng = name.children.length;
    
    collageCount = 0;
    collageList = [];
    for(i=0;i<$('img',name).length;i++){
    collageList[collageCount++] = $('img',name).eq(i).attr('src');
    $('#myModal').css("display", "block");
    image = collageList[0];

    $('#img01').attr("src", image);
    // 만약 섬네일 사용해서 깔끔하게 하고 싶으면  위에서 _600 붙여서 보일것 
    // 원본으로 띄우고 싶으면 여기서 substring으로 짤라서 원본 소환!
    	}
    var photoClickcount=1;
    $('#img01').click(function(){
    	
    	$('#img01').attr("src", collageList[photoClickcount++]);
    	if(photoClickcount==collageList.length){
    		photoClickcount=0;
    	}
            })
          }
        })
        })