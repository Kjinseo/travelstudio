
var userDesc= $('.user_desc');

var alias= location.href.split('?')[1]
console.log(alias)
console.log(encodeURI(alias, "UTF-8"))
if(alias!=null){
	$('#mysetting').attr('display','none;')
	$.post('/travelstudio/member/searchOneUser.json', {
		'alias': alias
		},function(result) {
			console.log(result.data)
			var template = Handlebars.compile($('#user-info-template').html())
		       var generatedHTML = template(result.data.Member) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		       tbody.text('') // tbody의 기존 tr 태그들을 지우고
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
//		      tbody.text('') // tbody의 기존 tr 태그들을 지우고
		      $('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.
			
//		       generatedHTML.appendTo($('.user_desc')).insertAfter('#mysetting');
		//.insertAfter('.')
		})
	
}else{
$.getJSON('../member/header.json', function(result) {

   console.log(result);
       var template = Handlebars.compile($('#user-info-template').html())
       var generatedHTML = template(result.data.loginMember) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
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
	
//       generatedHTML.appendTo($('.user_desc')).insertAfter('#mysetting');
//.insertAfter('.')
})

$.getJSON('../post/list.json', function(result) {
	  console.log(result.data.list);
      var template = Handlebars.compile($('#content-template').html())
      var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//      tbody.text('') // tbody의 기존 tr 태그들을 지우고
      $('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.

  console.log(result.data.list)
})


$.getJSON('../post/list.json', function(result) {
	  console.log(result.data.list);
	  console.log(result.data.list[0].badge);
	  
	  var badgeList1=[];
	  var count=0
	  for(i=0;i<result.data.list.length;i++){
		  if(result.data.list[i].badge!=undefined){
			  badgeList1[count++]=result.data.list[i].badge
		  }
	  }
	  for(i=0;i<badgeList1.length;i++){
		  console.log(badgeList1[i].indexOf("대한민국"))
		  if(badgeList1[i]!=undefined){
		  if(badgeList1[i].indexOf("대한민국")!=-1){
			  badgeList1[i]='./flags/png/south-korea.png'

		  }else if(badgeList1[i].indexOf("미국")!=-1){
			  badgeList1[i]='./flags/png/united-states-of-america.png'
		   }else if(badgeList1[i].indexOf("일본")!=-1){
			  badgeList1[i]='./flags/png/japan.png'
		  }else if(badgeList1[i].indexOf("영국")!=-1){
			  badgeList1[i]='./flags/png/united-kingdom.png'
		  }else if(badgeList1[i].indexOf("프랑스")!=-1){
			  badgeList1[i]='./flags/png/france.png'
		  }
		}
	  }
	  for(i=0;i<=badgeList1.length;i++){
		  $('<img style=width:36px; height:36px; >').attr('src',badgeList1[i]).css('margin-right','7px').appendTo($('#traveled_country'))
	  }
	  console.log(badgeList1)
	 
	  /*var data={list:badgeList1}
      var template = Handlebars.compile($('#flag-template').html())
      var generatedHTML = template(badgeList1) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//      tbody.text('') // tbody의 기존 tr 태그들을 지우고
      $('#traveled_country').append(generatedHTML) // 새 tr 태그들로 설정한다.
console.log(data)
  console.log(result.data.list)*/
  })


}
