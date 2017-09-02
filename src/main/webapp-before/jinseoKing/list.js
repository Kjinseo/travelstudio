var no;
var tbody = $('.content-container');
var userOne = ''
	var posted_count = 0;
var uniqueNames;
var membernoArray=[]

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


			address();
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

function address(){
	console.log(membernoArray)
	console.log(no)
	jQuery.ajaxSettings.traditional = true;
		$.post('../detail/addFromMno.json', {
			'mno': membernoArray
		},
		function(result) {

			console.log(no)
			console.log(result)

			uniqueNames = [];
			var flag_list=[];
			/*var flag_list_show=new Array();*/
			var flag_count=0;

			for(i=0;i<result.data.addFromMno.length;i++){
				if(result.data.addFromMno[i]!=null){
					if(result.data.addFromMno[i].address!=undefined){
						flag_list[flag_count++]=result.data.addFromMno[i].address
						/*flag_list_show.push(result.data.selectAddress[i].address)*/
						/*console.log(result)*/
					}
				}
			}
			for(i=0;i<flag_list.length;i++){
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
					}
				}

			}



			$.each(flag_list, function(i, el){
				if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
			});
			posted(membernoArray[i],flag_list)
			flag_list.splice(0,flag_list.length);
			/*			for(i=0;i<=uniqueNames.length;i++){

				$('<img style=width:36px; height:36px; >'.attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('.info_nation'))
			}
			 */		})
	}//post요청끝
}

function posted(userno){
console.log(userno)
console.log(flag_list)
	$('.user_one').each(function(){
		if($(this).attr('data-mno')==userno){
			for(j=0; j<flag_list.length; j++){
				$('<img src='+flag_list[j]+'>').appendTo($('.info_nation',this))
				$('.info_nation img',this).css('margin-right','7px').css('width', '36px').css('height', '36px')
			}
		}
	})

}

/*$('<img src=result>').appendTo($(this))*/

