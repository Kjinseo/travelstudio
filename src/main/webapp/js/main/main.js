var mno;
var mno2;
var numOfPost;

var appendNumber = 4;
var prependNumber = 1;
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


// 게시글 리스트 가져오는
$.getJSON('/post/list.json', function(result) {

  console.log(result.data);
   var template = Handlebars.compile($('#content-template1').html())
   var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//       tbody.text('') // tbody의 기존 tr 태그들을 지우고
   $('.box_slide_main').append(generatedHTML) // 새 tr 태그들로 설정한다.

}) // getJSON()ile(title)
  
// 여행작가 멤버 가져오는것 
$.getJSON('/member/info.json', function(result) {
	
   console.log(result.data);
       var template2 = Handlebars.compile($('#content-template-2').html())
       var generatedHTML2 = template2(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
       swiper.appendSlide(generatedHTML2)
       
       let str = result.data.memberPhoto;
  }) 

