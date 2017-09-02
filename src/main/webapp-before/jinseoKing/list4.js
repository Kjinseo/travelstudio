var no;
var tbody = $('.content-container');
var userOne = ''
	var posted_count = 0;
var uniqueNames;
var membernoArray=[]
var numOfPost;
var postOwner;

$.getJSON('../post/list.json', function(result) {

	console.log(result.data.list);
	var template = Handlebars.compile($('#content-template').html())
	var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	tbody.text('') // tbody의 기존 tr 태그들을 지우고
	tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.
	$('.contentSerchList').css('border-bottom',"2px solid red")

}) 

var template2=Handlebars.compile($('#content-template2').html())
//getJSON()ile(title)
$('.userclick').click(function (){
	$('.membersearchList').css('border-bottom',"2px solid red")
	$('.contentSerchList').css('border-bottom',"")
	searchmethod='user'
		$.post('../member/info.json', {
			'keyword': $('#search_bar').val()
		}, function(result) {
			console.log(result.data)
			console.log(result.data.info)
			console.log(result.data.info.length)

			for(i=0; i<result.data.info.length; i++){
				console.log(result.data.info[i].mno)
				no=result.data.info[i].mno;

				posted_count = result.data.info;
				console.log(posted_count)
			}
			console.log(no)
			for(i=0; i<result.data.info.length;i++){
				membernoArray[i]=result.data.info[i].mno

			}
			$('.content-container > li').remove(); // tbody의 기존 tr 태그들을 지우고
			var template = Handlebars.compile($('#content-template2').html())
			var template2 = Handlebars.compile($('#content-template').html())
			template2("");
//			var generatedHTML = template('') // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
			var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
			tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.

            selectLoginUserPost()
			/*address();*/
//			location.href = '../main_minkdak/main.html'
			/*usersLi()*/
            
            NoList();
		}, 'json')
		
	console.log("Nolist실행?")
})

/*function usersLi() {
	userOne = $('.user_one')
	userOne.on('click', function() {
		console.log($(this).attr("data-mno"))
	})
//	console.log($('.travel_num').parents('.user_one').attr("data-mno"))
//	userOne.find('.travel_num').text($(this).attr("data-mno"))
	$(document).ready(function() {
		$('.user_one').on('load', function() {
			console.log('okokok')
			$(this).find('.travel_num').text($(this).attr("data-mno"))
		})

	})
}*/

var template1=Handlebars.compile($('#content-template').html())
var searchmethod;
$('.essayclick').click(function (){
	$('.contentSerchList').css('border-bottom',"2px solid red")
	$('.membersearchList').css('border-bottom',"")
	$.getJSON('../post/list.json', function(result) {

		console.log(result.data.list);
		$('.content-container > a').remove();
		var template2 = Handlebars.compile($('#content-template2').html())
		var template = Handlebars.compile($('#content-template').html())
		template2("");
		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
		tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.

	}) 

})



function search(){
	$.post('../post/search.json', {
		'keyword': $('#search_bar').val()
	}, function(result) {
		console.log(result.data)
		$('.content-container > li').remove();
		var template = Handlebars.compile($('#content-template').html())
//		var generatedHTML = template('') // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		/*$('.content-container > li').text('') // tbody의 기존 tr 태그들을 지우고
		 */		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		 tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.
		 console.log(result.data)
//		 location.href = '../main_minkdak/main.html'
		 
	}, 'json')
}
var loadMno = [];
function NoList() {
//	console.log("nolist in():" + membernoArray)
	console.log(membernoArray.length)
	$.ajaxSettings.traditional = true;
	$.post('../detail/selectAddress.json', {
		'mno': membernoArray
	},
	function(result) {
		console.log("하나만나오겠지?=====>",membernoArray)
		var memberno = membernoArray[1]
		console.log("차례대로나오나 한번에 나오나?==========>",result.data)
//		console.log(postOwner)
		var uniqueNames = [];
		var flag_list=[];
		var flag_list_show=new Array();
		var flag_count=0;
		var test_count=1;
		
		//for(var l = 0; l < loadMno.length; l++){
			//console.log(loadMno[l])
		
		for(var k = 0; k < membernoArray.length; k++) {
			console.log(membernoArray[k])
			console.log(result.data[membernoArray[k]])
		}
//		console.log(result.data[5][])
		for(j=0; j < membernoArray.length;j++){
			for(var k = 0; k < result.data[membernoArray[j]].length; k++) {
				if(result.data[membernoArray[j]][k] != null) {
					if(result.data[membernoArray[j]][k] !=undefined) {
						result.data[membernoArray[j]][k].memberno = membernoArray[j]
						flag_list[flag_count++] =(result.data[membernoArray[j]][k])
						console.log(j,"=============>", result.data[membernoArray[j]][k])
				
				}
				}
			}
		}
		
		
		console.log()
		
		console.log("가공전flag_list================>",flag_list)
		
		for(i=0;i<flag_list.length;i++){
			console.log(flag_list[i].address.indexOf("한국"))
			if(flag_list[i]!=undefined){
				if(flag_list[i].address.indexOf("대한민국")!=-1 || flag_list[i].address.indexOf("한국")!=-1){
					flag_list[i].address ='./flags/png/south-korea.png'
				}else if(flag_list[i].address.indexOf("미국")!=-1){
					flag_list[i].address='./flags/png/united-states-of-america.png'
				}else if(flag_list[i].address.indexOf("일본")!=-1){
					flag_list[i].address='./flags/png/japan.png'
				}else if(flag_list[i].address.indexOf("영국")!=-1){
					flag_list[i].address='./flags/png/united-kingdom.png'
				}else if(flag_list[i].address.indexOf("프랑스")!=-1){
					flag_list[i].address='./flags/png/france.png'
				}else if(flag_list[i].address.indexOf("중국")!=-1){
					flag_list[i].address='./flags/png/china.png'
				}else if(flag_list[i].address.indexOf("조선")!=-1){
					flag_list[i].address='./flags/png/north-korea.png'
				}else if(flag_list[i].address.indexOf("스페인")!=-1){
					flag_list[i].address='./flags/png/spain.png'
				}else if(flag_list[i].address.indexOf("이탈리아")!=-1){
					flag_list[i].address='./flags/png/italy.png'
				}
			}

		}
		console.log("가공후flag_list================>",flag_list)
		
		$.each(flag_list, function(i, el){
			if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		console.log(uniqueNames)
		console.log(uniqueNames.length)
		numOfFlag=uniqueNames.length;
		console.log(numOfFlag);
		
		
		for(i=0;i <= uniqueNames.length;i++){
			$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('.member_visit_' + memberno))
		}
	//}
		/*
		$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.countryNum'))
		*/
		})
		
} // functionNoList

/*function NoList() {
//	console.log("nolist in():" + membernoArray)
	console.log(membernoArray.length)
	for(var k = 0; k < membernoArray.length; k++) {
		loadMno[k] = membernoArray[k]
	$.post('../detail/selectAddress.json', {
		'mno': membernoArray[k]
	},
	function(result) {
		console.log(loadMno)
		for(var l = 0; l < loadMno.length; l++){
			console.log(loadMno[l])
		}
//		console.log(result)
//		console.log(postOwner)
		var uniqueNames = [];
		var flag_list=[];
		var flag_list_show=new Array();
		var flag_count=0;
		var test_count=1;
		
		for(j=0;j<result.data.selectAddress.length;j++){
			
			if(result.data.selectAddress[j]!=null){
			if(result.data.selectAddress[j].address!=undefined){
//				flag_list[flag_count++]=(result.data.selectAddress[j].address)
				console.log(j,"=============>", result.data.selectAddress[j].address)
				
			}
			}
		}
		
		console.log()
		
		console.log("가공전flag_list================>",flag_list)
		
		for(i=0;i<flag_list.length;i++){
			console.log(flag_list[i].indexOf("대한민국"))
			if(flag_list[i]!=undefined){
				if(flag_list[i].indexOf("대한민국")!=-1 || flag_list[i].indexOf("한국")!=-1){
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
		console.log("가공후flag_list================>",flag_list)
		
		$.each(flag_list, function(i, el){
			if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		console.log(uniqueNames)
		console.log(uniqueNames.length)
		numOfFlag=uniqueNames.length;
		console.log(numOfFlag);
		for(i=0;i <= uniqueNames.length;i++){
			$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('#traveled_country'))
		}
		
		$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.countryNum'))
		
		})
		}
		
}*/
var loading =0
var returnPost = []

// mno로 post 가져오기 
function selectLoginUserPost(){
	console.log(membernoArray)
	
	// 멤버 번호 길이만큼 반복하면서 멤버 하나씩 요청
	for(i=0; i<membernoArray.length; i++){
		console.log(membernoArray.length, membernoArray[i])
		$.post('../post/selectOneUserPost.json',{'number':membernoArray[i]}, function(result) {
			returnPost.push(result)
			console.log(result);
			
			for(j=0; j<result.data.selectOneUserPost.length; j++){
				postOwner=result.data.selectOneUserPost[j].mno // 멤버 번호 받기.
				console.log("postOwner",postOwner);
				console.log(result.data.selectOneUserPost[j].postno);
				numOfPost = result.data.selectOneUserPost.length; // 멤버 번호로 받은 게시물 개수
				console.log("console.log(numOfPost)", numOfPost);
			}
			
			
//			$('<input id="numOfPost">').attr('value',numOfPost).attr('name',postOwner).attr("readonly",true).appendTo($('.profile_desc'))
			if(numOfPost == 0) {
			console.log(numOfPost)
				$('.txt_num' ,'div[data-mno="'+ postOwner +'"]').text('0')
			} else {
				$('.txt_num' ,'div[data-mno="'+ postOwner +'"]').text(numOfPost)
			}
			
			/*if($(this).attr('name') == $("#holding").attr('data-mno')){
				console.log("postOwner")
			}*/
			
			
			
			})
			
			/*if($("#numOfPost").attr('name') == $("#holding").attr('data-name')){
				$('<input id="numOfPost">').attr('value',numOfPost).attr('name',postOwner).attr("readonly",true).appendTo($(".info_write").attr('name',postOwner))
				
			}*/
		
	}
//	console.log("될까=====>")
//	console.log(returnPost)
//	loading =1;
//	address()
}

/*      var template = Handlebars.compile($('#content-template').html())
      var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//      tbody.text('') // tbody의 기존 tr 태그들을 지우고
      $('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.
      dropdown()
  $('<input id="numOfPost">').attr('value',numOfPost).attr("readonly",true).attr("disabled",false).appendTo($('.postNum'))
})
}*/




/*function address(){
	console.log(membernoArray)
	for(var i = 0; i < membernoArray.length; i++){
	$.post('../detail/selectAddress.json', {
		'mno': membernoArray[i]
	},
	function(result) {
		console.log(result)
		var uniqueNames = [];
		var flag_list=[];
		var flag_list_show=new Array();
		var flag_count=0;
		var test_count=1;
		
		for(j=0;j<result.data.selectAddress.length;j++){
			
			if(result.data.selectAddress[j]!=null){
			if(result.data.selectAddress[j].address!=undefined){
				flag_list[flag_count++]=(result.data.selectAddress[j].address)
				
			}
			}
		}
		console.log("가공전flag_list================>",flag_list)
		
		for(i=0;i<flag_list.length;i++){
			console.log(flag_list[i].indexOf("대한민국"))
			if(flag_list[i]!=undefined){
				if(flag_list[i].indexOf("대한민국")!=-1 || flag_list[i].indexOf("한국")!=-1){
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
		console.log("가공후flag_list================>",flag_list)
		
		$.each(flag_list, function(i, el){
			if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
		});
		console.log(uniqueNames)
		console.log(uniqueNames.length)
		numOfFlag=uniqueNames.length;
		console.log(numOfFlag);
		for(i=0;i <= uniqueNames.length;i++){
			$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('#traveled_country'))
		}
		
		$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.countryNum'))
		
		})
	}
}*/

/*
function posted(flag_list){
	
	console.log(flag_list)
console.log(userno)
	$('.user_one').each(function(){
		if($(this).attr('data-mno')==flag_list[0]){
			for(j=1; j<flag_list.length; j++){
				$('<img src='+flag_list[j]+'>').appendTo($('.info_nation', this))
				$('.info_nation img',this).css('margin-right','7px').css('width', '36px').css('height', '36px')
			}
		}
	})

}
/*	}
}*/

/*$('<img src=result>').appendTo($(this))*/

