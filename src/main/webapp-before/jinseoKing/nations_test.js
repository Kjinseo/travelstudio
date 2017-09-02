var tbody = $('#flag_list');

$.getJSON('/travelstudio/detail/list.json', function(result) {

   console.log(result.data.list);
       var template = Handlebars.compile($('#flag-template').html())
       var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
       tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.

  }) // getJSON()ile(title)
  
  /**/
