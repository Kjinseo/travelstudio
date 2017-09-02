var tbody = $('.box_slide_main');

$.getJSON('/travelstudio/post/list.json', function(result) {

   console.log(result.data.list);
       var template = Handlebars.compile($('#content-template').html())
       var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
       tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.

  }) // getJSON()ile(title)
  
  
  var mainbox = $('.owl-stage');

$.getJSON('/travelstudio/member/info.json', function(result) {

   console.log(result.data.info);
       var template2 = Handlebars.compile($('#content-template-2').html())
       var generatedHTML2 = template2(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
       mainbox.append(generatedHTML2) // 새 tr 태그들로 설정한다.

  }) // getJSON()ile(title)
