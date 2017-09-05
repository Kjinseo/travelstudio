var membernoArray=[],
    returnPost = []

$(function() {
  $('.header-container').load('../main/header.html')
  $('.footer-container').load('../main/footer.html')
  List()
})

function List() {
  $.post('/member/infosub.json', {
  }, function(result) {
    console.log(result.data)

    for(i=0; i<result.data.info.length; i++){
      no=result.data.info[i].mno;
      posted_count = result.data.info;
    }
    for(i=0; i<result.data.info.length;i++){
      membernoArray[i]=result.data.info[i].mno
    }

    var template = Handlebars.compile($('#content-template').text())
    var generatedHTML = template(result.data)
    var container = $('.content-container')
    container.html(generatedHTML)

    selectLoginUserPost()
    NoList()
  }, 'json')
}

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
    
    // 나라 중복 제거
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
    } // 나라 중복 제거 끝

    for(i=0;i < uniqueNames.length;i++) {
      $('<img>').attr('src',uniqueNames[i].address).css('margin-right','7px').appendTo($('.member_visit_' + uniqueNames[i].memberno))
    }
  })

} // functionNoList