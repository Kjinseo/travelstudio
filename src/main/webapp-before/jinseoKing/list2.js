 $.getJSON('../member/countPost.json', function(result) {
   console.log(result);
       var template = Handlebars.compile($('#content-template2').html())
       var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
       $('.content-container2').append(generatedHTML) // 새 tr 태그들로 설정한다.

  }) // getJSON()ile(title)
  
    function search(){
  $.post('../member/search.json', {
		'keyword': $('#search_bar').val()
	}, function(result) {
		console.log(result.data)
		$('.content-container2 > .user_one').remove();
		var template = Handlebars.compile($('#content-template2').html())
//		var generatedHTML = template('') // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		/*$('.content-container > li').text('') // tbody의 기존 tr 태그들을 지우고
		 */		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		  $('.content-container2').append(generatedHTML) // 새 tr 태그들로 설정한다.
		 console.log(result.data)

//		 location.href = '../main_minkdak/main.html'
	}, 'json')
}