var swiper = new Swiper('.swiper-container', {
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    slidesPerView: 4,
    centeredSlides: false,
});

$(function() {
  $('.header-container').load('../main/header.html')
  $('.footer-container').load('../main/footer.html')
})

// 국내여행 리스트 가져오기
$.getJSON('/post/koreaList.json', function(result) {
  console.log(result.data);
   var template = Handlebars.compile($('#korea-template').html())
   var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
   $('.box_slide_main_korea').append(generatedHTML) // 새 tr 태그들로 설정한다.
})

// 해외여행 리스트 가져오기
$.getJSON('/post/foreignList.json', function(result) {
  console.log(result.data);
   var template = Handlebars.compile($('#world-template').html())
   var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
   $('.box_slide_main_world').append(generatedHTML) // 새 tr 태그들로 설정한다.
}) 

// 여행작가 멤버 가져오는것 
$.getJSON('/member/info.json', function(result) {
	
   console.log(result.data);
       var template2 = Handlebars.compile($('#content-template-2').html())
       var generatedHTML2 = template2(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
       swiper.appendSlide(generatedHTML2)
       
       let str = result.data.memberPhoto;
  }) 

