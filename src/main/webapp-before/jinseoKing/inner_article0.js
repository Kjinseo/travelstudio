@@ -1,377 +1,103 @@
<!DOCTYPE html>
<html>

<head>
  <meta name="viewport" content="initial-scale=1.0">
  <meta charset="utf-8">
  <title>travel_log</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
@@ -9,8 +9,8 @@
  <!-- <link rel="stylesheet" type="text/css" href="./main.css"> -->
  <link rel="stylesheet" href="./font-awesome-4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
  <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDPuc3vcadwgSOQ2Vdyll-uUhMP7wFpRmc">

  <script src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDEsgodbW4NrW5grQitDfklBBZhS9hicSY">
  
  </script>

  <style>
    @import url(https://fonts.googleapis.com/css?family=Ropa+Sans);

    *,
    *:before,
    *:after {
      -moz-box-sizing: border-box;
      -webkit-box-sizing: border-box;
@@ -24,7 +24,7 @@
      box-sizing: border-box;
    }


   


    a {
      color: inherit;
    }

    a:link {
@@ -35,9 +35,66 @@
      border: none;
      outline: 0;
    }
    /*div{
border:1px solid black;
}*/
.slide_bar {
  background-color: white;
  width: 320px;
  height: 100%;
  position: fixed;
  left: -320px;
  z-index: 999;
}

/* 슬라이드 바 취소 버튼*/
.slide_bar_cancel {
  padding: 10px 0;
}
.icon_wrap {
  display: inline-block;
}
#cancel_icon {
  float: right;
  padding-right: 15px;

  display: inline-block;
}
#cancel_icon, #slide_icon:hover {
  cursor: pointer;

}
#slide_icon{
	margin-left:345px;
	float:none;
}
/*슬라이드 바 취소 버튼 끝  */

/*슬라이드 바 전체 컨텐츠 div*/
.member_slide {
  width: 100%;
  margin: 20px 0 ;
}

.member_slide .member_info {
  position: relative;
  width: 100%;
  height: 100%;
}


.member_slide .member_info .user_photo {
  position: relative;
  padding: 30px 0;
  text-align: center;
}

.member_slide .member_info .user_photo img {
  width: 100px;
  height: 100px;
  border-radius: 100%;
}

.member_slide .member_info .user_id {
  text-align: center;
}

.member_slide .member_info .user_url {
  text-align: center;
  color: gray;
}

.member_slide .member_info .user_mypage {
  text-align: center;
  background-color: #4a4a4a;
  width: 150px;
  height: 35px;
  color: white;
  border-radius: 30px;
  margin: 30px auto 0;
  vertical-align: center;
  font-size: 80%
}

.user_mypage {
line-height: 35px;
}

.user_nation {
  height: 30px;
  text-align: center;
  margin-top: 20px;
  list-style: none;
  padding-top: 2px;
  overflow: hidden;
}

.user_nation li {
  width: 20px;
  display: inline-block;
}

.user_nation img {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 100%;
  vertical-align: middle;
}

 .user_visited {
   width: 210px;
   font-weight: 600;
   font-size: 18px;
   color: #767676;
   text-align: center;
   margin: 25px auto 0;
   padding-bottom: 30px;
 }

  .user_visited .user_write {
    display: inline-block;
    width: 100px;
  }

  .user_visited .user_visited_count {
    display: inline-block;
    width: 100px;
  }

  .counting {
    display: block;
    margin-top: 10px;
    font-size: 130%;
    color: black;
  }

.slide_bar_classify{
  width: 80%;
  color: #d2d2d2;
}
.slide_bar_menu {
  padding-top: 30px;
  text-align: center;
}

.slide_bar_menu li {
  margin-bottom: 20px;
  font-size: 95%;
  font-weight: 400;
  color: #767676;
}

/*슬라이드 메뉴 끝*/
    a:-webkit-any-link {
      /*color: -webkit-link;*/
      cursor: auto;
      text-decoration: none;
    }

    .blank-one {
      position: relative;
      background: url('travel.jpg') center center no-repeat fixed;
      text-align: center;
      width: 100%;
      height: 700px;
      font-family: 'Ropa Sans', sans-serif;
      margin-bottom: 20px;
    }


    .blank-one textarea {
      font-size: 40px;
      text-transform: uppercase;
      width: 1000px;
      color: rgb(255, 255, 255);
      margin: 250px auto 0px auto;
      text-shadow: 1px 1px 2px #000;
      background-color: transparent;
      border: none;
      text-align: center;
      font-style: white;
      text-decoration-color: white;
    }

     ::-webkit-input-placeholder {
      color: white;
    /* 여기서부터 headercss */
    
    body {
      margin: 0;
    }


    #header {
     box-sizing: border-box;
      position: relative;
      height: 15%;
    header {
      border: 1px solid #c9d1dd;
      width: 100%;
      border-bottom: solid 1px #d2d2d2;
      height: 70px;
      z-index: 100;
      background-color: white;
    }


    .container_main {
      border: solid 1px white;
      width: 1220px;
      height: auto;
      margin: 0px auto;
    #logo {
      max-height: 55px;
      margin-top: 7px;
      margin-left: 15px;
      display: inline;
    }

    .icons {
      width: 130px;
      height: 400px;
    #search_bar {
      border: 1px solid white;
      border-bottom: 1px solid gray;
      font-size: 25px;
      font-weight: 600;
      margin-left: 10%;
      margin-top: 17px;
      display: inline;
      position: absolute;
      margin-left: 100px;
      margin-top: 150px;
      width: 500px;
      height: 40px;
    }

    .icons>div1 {
    #search_icon {
      position: absolute;
      margin-left: 1000px;
    }

    .icons>a>i {
      z-index: 1000;
      width: 10px;
      height: 10px;
      margin-top: 45px;
    }

    .write_select_date_start>p {
      background-color: transparent;
      border: none;
      color: white;
      text-align: center;
      font-size: 30px;
    }

    .write_select_date_start>div {
      display: inline;
    }

    .fa fa-plus-circle {
      -ms-transform: rotate(90deg); // IE 9 이상에서 사용
      -webkit-transform: rotate(90deg); // 사파리, 크롬, 오페라 브라우저 사용
      transform: rotate(90deg);
    }

    .travel_day {
      border-right: 1px black solid;
      width: 130px;
      display: inline-block;
      margin-top: 0px;
      vertical-align: top;
      margin-right: 15px;
    }

    .travel_day>div {
      display: inline-block;
      font-size: 10px;
    }

    .tool_box {
      margin-top: 30px;
      display: inline-block;
    }

    .tool_box>textarea {
      width: 500px;
      resize: none;
      margin-left: 695px;
      margin-top: 19px;
      background-color: white;
      border: none;
    }

    .travel_detail_date {
      font-size: 15px;
      display: inline-block;
    }

    .bb>#aa {
      width: 40%;
      border: 1px solid white;
    }

    .day_list {
      border: 1px solid white;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    .fa fa-plus-circle fa-3x:hover {}

    p {
      display: inline-block;
    }

    #title_in_text {
      border: 1px solid white;
      text-align: center;
      font-size: 40px;
      font-family: sans-serif;
      margin-bottom: 40px;
      width: 809px;
    }

    .content_text {
      border: 1px solid white;
      margin-top: 20px;
      margin-bottom: 100px;
      width: 750px;
      margin-left: 20px;
      padding-left: 5px;
    }

    p {
      word-break: keep-all;
      font-size: 15px;
      font-weight: 500;
     ::-webkit-input-placeholder {
      color: #aeb5c1;
    }
    /*사진1*/

    #one_whole_collage {
      width: 809px;
      height: 506px;
      overflow: hidden;
      display: inline-block;
    #start-my-journey {
      border: 1px solid black;
      width: 140px;
      height: 40px;
      border-radius: 20px;
      background-color: white;
      margin-left: 938px;
      margin-top: 13px;
      margin-bottom: 15px;
      font-size: 17px;
      position: absolute;
      display: inline;
    }

    #one_whole_collage img {
      margin: 15px 0 0 15px;
      max-height: 506px;
    /* 여기까지 headercss */
.slide_bar {
  background-color: white;
  width: 320px;
@@ -221,7 +278,7 @@ line-height: 35px;
      color: white;
    }

    .caption {
      border: 1px solid white;
      width: 750px;
      font-size: 13px;
      color: #91a1bc;
      text-align: center;
      margin-bottom: 30px;
      margin-left: 20px;
      font-weight: 600;
    }

    #googleMap {
    
    #header {
     box-sizing: border-box;
      position: relative;
@@ -375,8 +432,6 @@ line-height: 35px;
      width: 780px;
      height: 380px;
    }
@@ -380,491 +106,88 @@ line-height: 35px;
    /*6개*/

    .whole_collage6 {
      width: 824px;
      height: 824px;
      background-color: white;
    }

    #big_collage {
      width: 534px;
      height: 534px;
      overflow: hidden;
      display: inline-block;
    }

    #big_collage img {

      max-height: 534px;
    }

    #two_collage {

      display: inline-block;
      height: 534px;
      width: 265px;
    }

    #inner_two_collage {
      width: 265px;
      height: 265px;
      overflow: hidden;
      display: inline-block;
    }

    #inner_two_collage img {

      max-height: 265px;
    }

    #bottom_three_collage {
      width: 264px;
      height: 260px;
      overflow: hidden;
      display: inline-block;
    }

    #bottom_three_collage img {

      max-height: 260px;
    }
    /*3개*/

    .whole_collage3 {
      width: 824px;
      height: 549px;
      background-color: white;
    }

    #big_collage {
      width: 534px;
      height: 534px;
      overflow: hidden;
      display: inline-block;
    }

    #big_collage img {

      max-height: 534px;
    }

    #two_collage {
      width: 260px;
      height: 534px;
      display: inline-block;
    }

    #inner_two_collage {
      width: 260px;
      height: 265px;
      overflow: hidden;
      display: inline-block;
    }

    #inner_two_collage img {

      max-height: 260px;
    }

    #list_heart_1 {
@@ -469,10 +524,10 @@ line-height: 35px;
      color: #fc5549;
      margin-left:49%;
      margin-bottom: 80px;

      
    }


    
   



    .without_heart_main {
@@ -480,11 +535,11 @@ line-height: 35px;
      border: 1px solid white;
      display: inline-block;
      margin-left: 53px;

     
    }
    /*header*/

    header {
   /* header {
      border: 1px solid #c9d1dd;
      width: 100%;
      height: 70px;
      position: fixed;
      z-index: 100;
      background-color: white;
    }

    #logo {
      max-height: 55px;
      margin-top: 5px;
      margin-left: 20px;
    }

    #start-my-journey {
      border: 1px solid black;
      width: 140px;
      height: 40px;
      border-radius: 20px;
      background-color: white;
      margin-left: 398px;
      margin-top: 13px;
      font-size: 17px;
    }

    #title_of_article {
      border: 1px solid white;
      font-size: 25px;
@@ -516,7 +571,7 @@ line-height: 35px;
      font-weight: bold;
      margin-left: 21%;
    }

*/
    .tag {
      border: 1px solid black;
      width: 200px;
      height: 100px;
      margin-right: 100px;
    }

    .tag_hash {
      font-weight: bold;
      color: white;
      margin-right: 7px;
      font-size: 18px;
    }

    #KR_flag {
      width: 30px;
      margin-top: 20px;
      margin-left: auto;
      margin-right: auto;
@@ -539,8 +594,8 @@ line-height: 35px;
    }

    .blank-one {
      border: 1px solid black;
      margin-top: 69px;
      
      margin-top: -5px;
    }

    #gotop {
      border: 1px solid black;
      width: 100px;
      height: 40px;
      border-radius: 20px;
      font-size: 19px;
      background-size: cover;
      padding-top: 6px;
      padding-bottom: 3px;
      /*padding-left: 17px;*/
      /*padding-right: 18px;*/
      margin-left: 100px;
      margin-top: 50px;
      position: fixed;
      text-align: center;
    }

    .hidden {
      transform: translateY(-100%);
    }
    /*header*/
    /*root*/

    .root {
      border: 1px solid white;
      width: 811px;
      height: auto;
    }



    .root_way_first {
      border: 1px solid white;
      width: 811px;
      height: 90px;
      margin-left: 20px;
      margin-top: 10px;
      padding-top: 10px;
    }

    #root_way_first_img {
      margin-right: 50px;
    }

    .root_way_more {
      border: 1px solid white;
      width: 811px;
      height: 90px;
      margin-left: 20px;
      margin-top: 3px;
    }

    #rooting_img {
      margin-right: 50px;
    }

    .root_way_last {
      border: 1px solid white;
      width: 811px;
      height: 90px;
      margin-left: 20px;
      padding-top: 15px;
    }

    #rootend_img {
      margin-right: 50px;
    }

    #name_root1,
    #name_root2,
    #name_root3 {
      font-size: 18px;
      font-weight: bold;
      color: #3a68b2;
    }



    #KR_root {
      width: 30px;
    }

    #next_flag {
      color: #a0abbc;
      font-weight: bold;
    }

    #airplane {
      height: 50px;
    }

    .faces {
      /*border: 1px solid black;*/
      height: 60px;
      min-width: 300px;
      margin-left: 1200px;
      margin-top: 70px;
    }

    .faces>div {
      margin-left: 15px;
    }

    .face {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      display: inline-block;
    }

    #yunakim {
      width: 50px;
    }

    .face2 {
      width: 50px;
      height: 50px;
      overflow: hidden;
      border-radius: 50%;
      display: inline-block;
    }

    #Emma {
      height: 50px;
    }
    /*구독 버튼 있는 곳*/

    .author_pic {
@@ -675,7 +730,7 @@ line-height: 35px;
      max-width: 90px;
      max-height: 90px;
      overflow: hidden;
      border-radius: 50%;
      border-radius: 100%;
      margin-left: auto;
      margin-right: auto;
    }

    #author {
      width: 90px;
    }

    .alias {
      border: 1px solid white;
      font-size: 17px;
      font-weight: bolder;
      width: 100%;
      text-align: center;
      margin-top: 15px;
    }

     #short_intro {
       text-align: center;
       width: 100%;
       font-size: 15px;
       color:#a2a4a5;
    }
    .sub_box{
      border: 1px solid white;
      width: 100%;
      text-align: center;
      margin-top: 40px;
      margin-bottom: 100px;
    }

    #subsc_btn{
      border: 1px solid black;
      width:90px;
      height: 35px;
      color:black;
      background-color: white;
      border-radius: 17.5px;
    }


    /*댓글*/

    .comment_container {
      border: none;
      width: 809px;
      height: auto;
      margin-left: auto;
      margin-right: auto;
    }

    .title_comment_container {
      border: none;

      font-size: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
    }

    #replyer {
      max-height: 50px;
      max-width: 50px;
      border-radius: 50%;
      overflow: hidden;
      display: block;
    }

    #replyer>img {
      height: 50px;
    }

    li {
      border: none;
      border-top: 1px solid #d6d7d8;
      height: 150px;
      ;
      padding-left: 20px;
      list-style: none;
      padding: 16px;
      padding-bottom: 10px;
    }

@@ -761,7 +816,7 @@ line-height: 35px;
    #posted {
      min-height: 150px;
      height: auto;

      
    }

    #posted:hover {
      min-height: 150px;
      height: auto;
      background-color: #f2f2f2;
    }

    #posted_command_wrap {
      border: none;
      width: 698px;
      min-height: 108px;
      height: auto;
      border-radius: 2px;
    }

    .command_box {
      border: none;
      width: 625px;
      min-height: 100px;
      height: auto;
      margin-top: 6px;
    }

    #singo {
      margin-top: -80px;
      float: right;
      margin-right: 15px;
      display: none;
    }

    .content_reply {
      border: none;
      display: block;
      margin-left: 70px;
      margin-top: -50px;
    }

    #text_relpy {
      height: auto;
      border: 1px solid white;
      resize: none;
      font-size: 14px;

      -ms-overflow-style: none;
    }

     ::-webkit-scrollbar {
      display: none;
    }

    #id {
      border: none;
      text-decoration: none;
      margin-right: 5px;
      display: inline-block;
      font-size: 12px;
      font-weight: bold;
    }



    #posted_date {
      display: inline-block;
      margin-left: 20px;
      font-size: 13px;
      font-weight: bolder;
      color: #93a4bf;
      font-style: italic;
    }

    #send_btn {
      border: 1px solid #858787;
      width: 48px;
      height: 28px;
      background-color: white;
      border-radius: 15px;
      float: right;
      margin-right: 10px;
      margin-top: 70px;
      font-size: 13px;
      color: #858787;
    }

    #textarea_plus_button {
      border: 1px solid #bbcdea;
      width: 698px;
      height: 108px;
      border-radius: 2px;
    }

@@ -856,38 +911,20 @@ line-height: 35px;
    #inner_command {
      font-size: 13px;
    }

    
    #edit, #delete{
    border:1px solid gray;
    background-color: white;
    height: 25px;
    border-radius: 15px;

    
    }

    
    #text_reply{
    border: 1px solid white;
    }
@@ -888,27 +211,19 @@ background-color: white;
margin-left:660px;
}

    
   
/*
   .other_article_of_author{
     border:1px solid black;
     max-height: 200px;
     overflow: hidden;
   }
    #prev, #after{
      display: inline-block;
      width: 48%;
    }*/
  </style>



</head>

@@ -907,22 +944,30 @@ margin-left:660px;
<body>
  <!--header-->


<!-- 
  <header class="header">
   
   <img src="img/slidecall.png" id="slide_icon">

    <a href="../main_minkdak/main.html"><img id="logo" src="./pictures/ourlogo.png"></a>
@@ -916,86 +231,85 @@ margin-left:660px;
    <button type="button" onclick="location.href='../mypage/write.html'" id="start-my-journey">여행기 작성</button>
  </header>
 
   -->
  <!--header-->

  <!--글쓰기랑 이이디 클래스 이름 똑같음-->
  <div class="header" id="header"></div>
  <div id="blank-one" class="blank-one">
  <div class="header" id="header">
  <img src="img/slidecall.png" id="slide_icon">
    <a href="../jinseoKing/main01.html"><img id="logo" src="./pictures/ourlogo.png"></a>
    <input type="search" id="search_bar" placeholder="검색">
    <button id="search_icon" class="fa fa-search fa-2x" onclick="search()" aria-hidden="true"></button>
    <button type="button" id="start-my-journey">여행기 작성</button>
  </div> -
  
  
<div id="blank-one" class="blank-one">
  <script id="content-template-3" type="text/x-handlebars-template">
{{#each list}}
{{#selectedPost}}
    <textarea>{{title}}</textarea>
    <div class="bb">

      <a href="#" class="write_select_date_start">
        <p class="write_start_date">{{sdt}}</p>
        <p>~</p>
        <p class="write_end_date">{{edt}}</p>
      </a>
      <hr id="aa">
    </div>
@@ -936,19 +981,19 @@ margin-left:660px;

    <div class="tags">
      <span class="tag_hash">{{tag}}</span>

      
    </div>
    <img src="./pictures/KR.png" id="KR_flag">

    <div class="faces">
      <div class="face">
        <a href="#"><img src="./pictures/yunakim.jpg" id="yunakim"></a>
        <a href="#"><img src="../upload/{{path}}" ></a>
      </div>
      <div class="face2">
        <a href="#"><img src="./pictures/emma.jpg" id="Emma"></a>
        <a href="#"><img src="../upload/{{path}}" id="Emma"></a>
      </div>
    </div>
{{/each}}
{{/selectedPost}}
  </script>
  </div>

  <!--내용상자-->
  <div class="container_main">


    <div class="day_list">
      <div class="travel_day">
        <h2>1일차<h2>
  <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
  <div class="travel_detail_date">2017.05.05</div>
</div>

@@ -966,7 +1011,7 @@ margin-left:660px;

<div class="without_heart_main">

  <div class="root">
 <!--  <div class="root">
  <div class="root_way_first">
    <img id="root_way_first_img" src="./pictures/rootstart.PNG">
    <p id="name_root1">인천국제공항<br><img id="KR_root"src="./pictures/KR.png"><span id="next_flag">KR</span></p>
  </div>

  <span><img id="airplane" src="./pictures/airplane.png"></span>

  <div class="root_way_more">
    <img id="rooting_img" src="./pictures/rooting.PNG">

    <p id="name_root2">비엔나 국제 공항<br><img src="./pictures/austria.png"><span id="next_flag">AT</span></p>
  </div>

  <span><img id="airplane" src="./pictures/airplane.png"></span>

  <div class="root_way_last">
@@ -986,28 +1031,34 @@ margin-left:660px;
     <img id="rootend_img" src="./pictures/rootend.PNG">
     <p id="name_root3">오를리 국제 공항<br><img id="FR_root" src="./pictures/france.png"><span id="next_flag">FR</span></p>
  </div>
  </div>
  </div> -->

<div class="tool_box">

  <div id="title_in_text">여행의 시작은 기내식</div>
<!--   <div id="title_in_text">여행의 시작은 기내식</div>
  <div id="googleMap"></div>
  <div class="content_text">

  <p>아침 일찍 움직여야 한다는 생각이 들면 늘 잠을 설치면서 훨씬 일찍 깨게 된다. 그럼 또 억울해서 1, 20분 더 자려고 들고, 그런 악순환의 반복이다. 아침에 짐 정리해야지, 라고 생각하니 마음이 조급했는데, 다행히 생각보다 정리가 일찍 끝났다. 여유 있게 아침 먹으러 갔다 와서 시트를 싹 걷어들고 당당하게 내려왔...으나 알고 보니 이어폰을 침대등 위에 당당히 놓고 왔다. 😓 아침에 일어나면서 '잘 하면 놓고 가겠는데'라는 생각까지 했었건만. 자가예지력 짱임. 나오면서 짐을 맡기고 왔으니 어차피 돌아가야 하니까 그때 물어보던가 해야겠다. 뭐, 이럴까봐 이어폰도 두 개나 더 챙겨왔...지만 지금은 다 캐리어 안에 있네. 으흐흐흐. 여행이 절반쯤 지나가니 슬슬 정신줄이 빠져나간다.</p>
</div>
 -->
  <div class="whole_collage1">
<script id="content-template-6" type="text/x-handlebars-template">
{{#each fileList}}
  <div  id="one_whole_collage"><img id="img_4" src="../{{path}}"></div>
</div>
{{/each}}
</script>

<div id="text_box">
	<script id="content-template-2" type="text/x-handlebars-template">
@@ -1005,54 +319,43 @@ margin-left:660px;

</div>
<div class="caption">{{capt}}</div>
{{#if cont}}
<div class="caption">{{cont}}</div>
<div class="content_text">
<p>{{cont}}</p>
  </div>
{{/if}}
{{/each}}
</script>
</div>

</div><!--whole_collage-->
</div>
<a id="gotop"href="#top" title="맨 위로가는 버튼"></i>▲TOP</a>
</div>
</div>
<br>

<a id="list_heart" href="javascript:;"><i id="list_heart_1" class="fa fa-heart-o fa-3x" aria-hidden="true"></i></a>


<!--글쓴이 프로필-->

<div id="profile_box">

@@ -1029,7 +1080,7 @@ margin-left:660px;
	<script id="content-template-4" type="text/x-handlebars-template">
{{#each info}}
<div class="author_pic">
  <a href="#"><img id="author" src="./pictures/yunakim.jpg"></a>
  <a href="#"><img id="author" src="../upload/{{path}}"></a>
</div>

<p class="alias">{{alias}}</p><br>
<p id="short_intro">{{intro}}</p>

{{/each}}
</script>

</div>
<div class="sub_box">
<button type="button" id="subsc_btn">구독하기</button>
@@ -1044,55 +1095,60 @@ margin-left:660px;
</div>


<!-- 댓글 시작 -->


	<div class="comment_container">
		<div class="title_comment_container">댓글</div>
		<div>
		<li>

		
			<div id="replyer">
				<img src="./pictures/emma.jpg">
			<script id="comment-template-write" type="text/x-handlebars-template">

				<img src="../upload/{{path}}">
 </script>
			</div> <span class="content_reply">


@@ -1060,6 +363,7 @@ margin-left:660px;
					<textarea id="text_reply" rows="5" cols="86"
						placeholder="작가와 직접 소통하세요."></textarea>
					<span><button type="summit" id="send_btn"><a href="#gobottom">확인</a></button></span>
					<span><button type="summit" id="send_btn">확인</button></span>
				</div>
		</span>
		</li>
@@ -1067,17 +371,21 @@ margin-left:660px;
	</div>


	
		<script id="comment-template" type="text/x-handlebars-template">
		{{#each list}}
		<li id="posted">
			<div id="replyer">
				<img src="./pictures/emma.jpg">
				<img src="../upload/{{path}}">
			</div> <span class="content_reply"> <a id="id">{{alias}}</a>
			<span id="posted_date">{{date}}</span>
				<div id="posted_command_wrap">
					<div class="command_box">
						<p id="inner_command">{{cont}}</p>
					</div><span><a href="../mypage/report.html" id="singo">신고</a></span>
          <button id="edit_btn">수정</button>
          <button type="button" id="delete_btn">삭제</button>
				</div>
         <button type="button" id="delete_btn" onclick="deletebtn({{reno}})">삭제</button>
       
@@ -1090,16 +398,22 @@ margin-left:660px;
<div id=""></div>


 
  
		

<!-- 댓글 끝 -->
  
  
  
    
 

		




<!--내용상자-->

<!--구글지도-->
@@ -1103,10 +1159,8 @@ margin-left:660px;
<script src="./node_modules/jquery/dist/jquery.min.js"></script>
<script src="./node_modules/handlebars/dist/handlebars.min.js"></script>
<script src="./inner_article.js"></script>
@@ -1107,132 +421,26 @@ margin-left:660px;
/*댓글 delete*/

  
   <script>
      function initialize()
      {
       var mapProp = {
         center: new google.maps.LatLng(37.250943, 127.028344),
         zoom:7,
         zoomControl:true,
         zoomControlOptions: {
           style:google.maps.ZoomControlStyle.SMALL
         },
         mapTypeId: google.maps.MapTypeId.ROADMAP
       };
       var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
      }
      google.maps.event.addDomListener(window, 'load', initialize);




 <!-- 하트 -->
     $("#list_heart").on({
       'click':function(){

        //  class="fa fa-heart fa-2x"
        //  class="fa fa-heart-o fa-2x"
         var color = ($('#list_heart>i').attr('class') === 'fa fa-heart-o fa-3x')
                ? 'fa fa-heart fa-3x'
                : 'fa fa-heart-o fa-3x';


    $('#list_heart_1').attr('class',color);
@@ -1140,7 +1194,7 @@ margin-left:660px;
        }
     })


<!--header숨는거
        var prev = 0;
        var view = $(window);
        var mast = $('.header');

        view.on('scroll', function(){
        var scrollTop = view.scrollTop();
        mast.toggleClass('hidden', scrollTop > prev);
@@ -1151,7 +1205,8 @@ margin-left:660px;
        console.log(scrollTop);
        prev = scrollTop;
        });
        
        -->

        $('#posted').mouseover(function(){
          $('#singo').css("display", "inline-block");
        });


        $('#posted').mouseleave(function(){
          $("#singo").hide();
        });

        $('#subsc_btn').click(function(){
          console.log($(this).css('color')=='rgb(0, 0, 0)')
          if($(this).css('color')=='rgb(0, 0, 0)'){
            $(this).css({"border": "1px solid #2be5a4", "color": "#2be5a4"});
          }
          else{
            $(this).css({"border": "1px solid black", "color": "black"});
          }
        });

        // $('#subsc_btn').click(function(){
        //   $(this).css({"border": "1px solid #2be5a4", "color": "#2be5a4"});
        // });


function slideCall() {
$('#slide_icon').click(function (){
  $('.slide_bar').animate({left:0}, 350);
  $('.cover_dimmed').show();
})

$('#cancel_icon').click(function () {
  $('.slide_bar').animate({left:-320}, 350);
  $('.cover_dimmed').hide();
})

}

function slide_off() {
  $('.cover_dimmed').click(function () {
    $('.slide_bar').animate({left:-320}, 350);
    $('.cover_dimmed').hide();
})
}

$(document).ready(slideCall)
$(document).ready(slide_off)
// (slideCall);

$(document).ready(function(){
  //자동회전과 꽉찬 1개의 슬라이드만 나오도록 설정
  $(".owl-carousel").owlCarousel({
    items:1,
    loop:true,
    autoplay:true,
    autoplayTimeout:20,
    autoplayHoverPause:true
  });
});

$('.owl-carousel').owlCarousel({
  loop:false,
  margin:10,
  nav:true,
  autoWidth:true,
  responsive:{
    0:{
      items:1
    },
    600:{
      items:4
    },
    1000:{
      items:5
    }
  }
})



   </script>


  </body>
</html>
        });
\ No newline at end of file