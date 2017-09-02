var mno;
var userDesc= $('.user_desc');
var numOfFlag;
var numOfPost;
var mno2;



var alias= location.href.split('?')[1]
console.log(encodeURI(alias, "UTF-8"))

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


if(alias!=null){
	$('#mysetting').attr('display','none;')
	$.post('/travelstudio/member/searchOneUser.json', {
		'alias': alias
	},function(result) {
		console.log(alias)
		console.log(result.data)
		var template = Handlebars.compile($('#user-info-template').html())
		var generatedHTML = template(result.data.Member) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
		userDesc.append(generatedHTML);

		$(document.body).on('click', '#mysetting', function(event) {
			location.href = 'user_setting.html'
				event.preventDefault()
				
		})

		let str = result.path;
		if(str == null ) {
			$('#user-img').attr('src', './usercircle.png').css('width', '170px').css('height', '170px').css('border-radius', '100%')
		} else {
			$('#user-img').attr('src', '../upload/' + str).css('width', '170px').css('height', '170px').css('border-radius', '100%')
		}

		var template = Handlebars.compile($('#content-template').html())
		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
		$('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.

//		generatedHTML.appendTo($('.user_desc')).insertAfter('#mysetting');
		//.insertAfter('.')
		
	
	})


}else{
	$.getJSON('../member/header.json', function(result) {
		mno2 = parseInt(result.data.loginMember.mno);
		console.log("---------------------");
		console.log(mno2);
		console.log(result);
		console.log(result.status);
		console.log(result.data.loginMember.mno);
		var template = Handlebars.compile($('#user-info-template').html())
		var generatedHTML = template(result.data.loginMember) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
		userDesc.append(generatedHTML);

		$(document.body).on('click', '#mysetting', function(event) {
			location.href = 'user_setting.html'
				event.preventDefault()

		})


		let str = result.data.loginMember.path;
		if(str == null ) {
			$('#user-img').attr('src', './usercircle.png').css('width', '170px').css('height', '170px').css('border-radius', '100%')
		} else {
			$('#user-img').attr('src', '../upload/' + str).css('width', '170px').css('height', '170px').css('border-radius', '100%')
		}

//		generatedHTML.appendTo($('.user_desc')).insertAfter('#mysetting');
//		.insertAfter('.')
		address();
		selectLoginUserPost();
	})

function selectLoginUserPost(){
	console.log(mno)
$.post('../post/selectOneUserPost.json',{'number':mno2}, function(result) {
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
   $('<input id="counting1">').attr('value',numOfPost).attr("readonly",true).attr("disabled",false).appendTo($('.counting1'))
})
}


function address(){
	console.log(mno2)
	$.post('../detail/selectAddress.json', {
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
		for(i=0;i<uniqueNames.length;i++){
			$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('#traveled_country'))
			$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('.user_nation'))
		}
		
		$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.countryNum'))
		$('<input id="counting2">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.counting2'))
		})
	}
}
