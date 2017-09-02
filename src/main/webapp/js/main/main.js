var mno;
var mno2;
var numOfPost;

var appendNumber = 4;
var prependNumber = 1;
var swiper = new Swiper('.swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 4,
    centeredSlides: false,
/*        paginationClickable: true,*/
//    spaceBetween: 5
});


$.getJSON('/post/list.json', function(result) {

   console.log(result.data.list);
       var template = Handlebars.compile($('#content-template1').html())
       var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
       $('.box_slide_main').append(generatedHTML) // 새 tr 태그들로 설정한다.

  }) // getJSON()ile(title)
  
  $.getJSON('/member/info.json', function(result) {
   console.log(result.data.info);
       var template = Handlebars.compile($('#content-template2').html())
       var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
       $('.swiper-wrapper').append(generatedHTML) // 새 tr 태그들로 설정한다.

  }) // getJSON()ile(title)
  
$.getJSON('/member/info.json', function(result) {
	
   console.log(result.data.info);
       var template2 = Handlebars.compile($('#content-template-2').html())
       var generatedHTML2 = template2(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
//       mainbox.append(generatedHTML2) // 새 tr 태그들로 설정한다.
       swiper.appendSlide(generatedHTML2)
       
       let str = result.data.memberPhoto;
       console.log(str)
      
     /*  if (str != undefined) {
       $('.travel_writer_photozone').css({
		  'background': 'url("/upload/' + str +'")' + 'center center no-repeat'
       	})
       }*/
       
 
  }) 

  
$.getJSON('/member/header.json', function(result) {
	console.log(result);
	 mno=result.data.loginMember;
	 mno2=result.data.loginMember.mno;
	console.log(mno)
	console.log(result.data.loginMember)
	if(mno!=undefined){
		$('#slide_icon').css('display','inline-block');
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="/desktop/article/write.html"
		    //Other code etc.
		});
	}else{
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="/desktop/login/login.html"
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
   address()
   selectLoginUserPost()
  }) // getJSON()
  
 

  
  function selectLoginUserPost(){
	console.log(mno)
$.post('/post/selectOneUserPost.json',{'number':mno2}, function(result) {
	  console.log(result);
	  for(i=0; i<=result.data.selectOneUserPost.length; i++){
	  console.log(result.data.selectOneUserPost.length);
	  numOfPost = result.data.selectOneUserPost.length;
	  console.log(numOfPost);
	  }
     
  $('<input id="numOfPost">').attr('value',numOfPost).attr("readonly",true).attr("disabled",false).appendTo($('.counting1'))
})
}

function address(){
	console.log(mno)
	$.post('/detail/selectAddress.json', {
		'mno': mno2
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
					flag_list[i] ='/image/flags/png/south-korea.png'
				}else if(flag_list[i].indexOf("미국")!=-1){
					flag_list[i]='/image/flags/png/united-states-of-america.png'
				}else if(flag_list[i].indexOf("일본")!=-1){
					flag_list[i]='/image/flags/png/japan.png'
				}else if(flag_list[i].indexOf("영국")!=-1){
					flag_list[i]='/image/flags/png/united-kingdom.png'
				}else if(flag_list[i].indexOf("프랑스")!=-1){
					flag_list[i]='/image/flags/png/france.png'
				}else if(flag_list[i].indexOf("중국")!=-1){
					flag_list[i]='/image/flags/png/china.png'
				}else if(flag_list[i].indexOf("조선")!=-1){
					flag_list[i]='/image/flags/png/north-korea.png'
				}else if(flag_list[i].indexOf("스페인")!=-1){
					flag_list[i]='/image/flags/png/spain.png'
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
		for(i=0;i<uniqueNames.length;i++){
			$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('.user_nation'))
		}
		
		$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.counting2'))
		})
	}