var no;
var tbody = $('.content-container');
var userOne = ''
	var posted_count = 0;
var uniqueNames = [];
var uniqueNum=[];
var membernoArray=[]
var numOfPost;
var postOwner;

$(function() {
	$('.header-container').load('../header.html')
	$('.footer-container').load('../footer.html')
})


$.getJSON('/post/list.json', function(result) {
	var template = Handlebars.compile($('#content-template').html())
	var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	tbody.text('') // tbody의 기존 tr 태그들을 지우고
	tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.
	$('.contentSerchList').css('border-bottom',"2px solid red")
}) 

var template2=Handlebars.compile($('#content-template2').html())
$('.userclick').click(function (){
	$('.membersearchList').css('border-bottom',"2px solid red")
	$('.contentSerchList').css('border-bottom',"")
	searchmethod='user'
		$.post('/member/info.json', {
			'keyword': $('#search_bar').val()
		}, function(result) {
			for(i=0; i<result.data.info.length; i++){
				no=result.data.info[i].mno;
				posted_count = result.data.info;
			}
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

			NoList();
		}, 'json')
})

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
	$.post('/post/search.json', {
		'keyword': $('#search_bar').val()
	}, function(result) {
		$('.content-container > li').remove();
		var template = Handlebars.compile($('#content-template').html())
//		var generatedHTML = template('') // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		/*$('.content-container > li').text('') // tbody의 기존 tr 태그들을 지우고
		 */		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		 tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.
	}, 'json')
}
var loadMno = [];
function NoList() {
	$.ajaxSettings.traditional = true;
	$.post('/detail/selectAddress.json', {
		'mno': membernoArray
	},
	function(result) {
		var memberno = membernoArray[1]
		var uniqueNames = [];
		var flag_list=[];
		var flag_list_show=new Array();
		var flag_count=0;
		var test_count=1;
		for(j=0; j < membernoArray.length;j++){
			for(var k = 0; k < result.data[membernoArray[j]].length; k++) {
				if(result.data[membernoArray[j]][k] != null) {
					if(result.data[membernoArray[j]][k] !=undefined) {
						result.data[membernoArray[j]][k].memberno = membernoArray[j]
						flag_list[flag_count++] =(result.data[membernoArray[j]][k])
					}
				}
			}
		}

		for(i=0;i<flag_list.length;i++){
			console.log(flag_list[i].address.indexOf("한국"))
			if(flag_list[i]!=undefined){
				if(flag_list[i].address.indexOf("대한민국")!=-1 || flag_list[i].address.indexOf("한국")!=-1){
					flag_list[i].address ='../../../image/flags/south-korea.png'
				}else if(flag_list[i].address.indexOf("미국")!=-1){
					flag_list[i].address='../../../image/flags/united-states-of-america.png'
				}else if(flag_list[i].address.indexOf("일본")!=-1){
					flag_list[i].address='../../../image/flags/japan.png'
				}else if(flag_list[i].address.indexOf("영국")!=-1){
					flag_list[i].address='../../../image/flags/united-kingdom.png'
				}else if(flag_list[i].address.indexOf("프랑스")!=-1){
					flag_list[i].address='../../../image/flags/france.png'
				}else if(flag_list[i].address.indexOf("중국")!=-1){
					flag_list[i].address='../../../image/flags/china.png'
				}else if(flag_list[i].address.indexOf("조선")!=-1){
					flag_list[i].address='../../../image/flags/north-korea.png'
				}else if(flag_list[i].address.indexOf("스페인")!=-1){
					flag_list[i].address='../../../image/flags/spain.png'
				}else if(flag_list[i].address.indexOf("이탈리아")!=-1){
					flag_list[i].address='../../../image/flags/italy.png'
				}
			}
		}

		var count = 0;
		uniqueNames = flag_list

		for (var i = 0; i < flag_list.length; i++) {
			count = 0;

			for (var j = 1; j < flag_list.length; j++){
				if (j != i) {
					if ((uniqueNames[i].memberno == flag_list[j].memberno) 
							&& (uniqueNames[i].address == flag_list[j].address)) {
						uniqueNames.splice(i, 1)
						console.log(uniqueNames)
					}
				}
			}
		}

		for (var i = 0; i < uniqueNames.length; i++) {
			count = 0;
			for(var j = 0; j < uniqueNames.length; j++) {
				if (uniqueNames[i].memberno == uniqueNames[j].memberno) {
					count++
					i = j
				}
			}
			$('.total_' + uniqueNames[i].memberno).text(count)
		}

		for(i=0;i < uniqueNames.length;i++) {
			$('<img style=width:25px; height:25px;>').attr('src',uniqueNames[i].address).css('margin-right','7px').appendTo($('.member_visit_' + uniqueNames[i].memberno))
		}
	})

} // functionNoList

var loading =0
var returnPost = []

//mno로 post 가져오기 
function selectLoginUserPost(){
	// 멤버 번호 길이만큼 반복하면서 멤버 하나씩 요청
	for(i=0; i<membernoArray.length; i++) {
		$.post('/post/selectOneUserPost.json',{'number':membernoArray[i]}, function(result) {
			returnPost.push(result)

			for(j=0; j<result.data.selectOneUserPost.length; j++){
				postOwner=result.data.selectOneUserPost[j].mno // 멤버 번호 받기.
				numOfPost = result.data.selectOneUserPost.length; // 멤버 번호로 받은 게시물 개수
			}


			if(numOfPost == 0) {
				$('.travel_num' ,'div[data-mno="'+ postOwner +'"]').text('0')
			} else {
				$('.travel_num' ,'div[data-mno="'+ postOwner +'"]').text(numOfPost)
			}
		})
	}
}