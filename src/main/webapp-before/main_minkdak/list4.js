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
			for(i=0; i<result.data.info.length;i++){
				membernoArray[i]=result.data.info[i].mno
				console.log(result.data.info[i])

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
		}, 'json')
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

function selectLoginUserPost(){
	console.log(membernoArray)
	for(i=0; i<membernoArray.length; i++){
		console.log(membernoArray.length, membernoArray[i])
		$.post('../post/selectOneUserPost.json',{'number':membernoArray[i]}, function(result) {

			console.log(result);

			for(i=0; i<result.data.selectOneUserPost.length; i++){
				postOwner=result.data.selectOneUserPost[i].mno
				console.log("postOwner",postOwner);
				console.log(result.data.selectOneUserPost[i].postno);
				numOfPost = result.data.selectOneUserPost.length;
				console.log("console.log(numOfPost)",numOfPost);
			}
			
			$('<input id="numOfPost">').attr('value',numOfPost).attr('name',postOwner).attr("readonly",true).appendTo($('.profile_desc'))
			if($(this).attr('name') == $("#holding").attr('data-mno')){
				console.log("postOwner")
			}
			})
			
			/*if($("#numOfPost").attr('name') == $("#holding").attr('data-name')){
				$('<input id="numOfPost">').attr('value',numOfPost).attr('name',postOwner).attr("readonly",true).appendTo($(".info_write").attr('name',postOwner))
				
			}*/
		
	}
}

/*      var template = Handlebars.compile($('#content-template').html())
      var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//      tbody.text('') // tbody의 기존 tr 태그들을 지우고
      $('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.
      dropdown()
  $('<input id="numOfPost">').attr('value',numOfPost).attr("readonly",true).attr("disabled",false).appendTo($('.postNum'))
})
}*/


/*address()

function address(){
	console.log(membernoArray)
	$.post('../detail/selectAddress.json', {
		'mno': membernoArray
	},
	function(result) {
		console.log(result)
		var uniqueNames = [];
		var flag_list=[];
		var flag_list_show=new Array();
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

}*/
/*	}
}*/

/*$('<img src=result>').appendTo($(this))*/

