var userDesc= $('.user_desc');
var invitingUser;
var alias= location.href.split('?')[1]
var loginMemberNo = 0;
var mno;
console.log(alias)
console.log(encodeURI(alias, "UTF-8"))

$.getJSON('../member/header.json', function(result) {
	console.log(result);
	 mno=result.data.loginMember;
	console.log(mno)
	console.log(result.data.loginMember)
	if(mno!=undefined){
		$('#slide_icon').css('display','inline-block');
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="../mypage/write.html"
		    //Other code etc.
		});
	}else{
		$('#start-my-journey').off('click');
		$('#start-my-journey').click(function(){
		   location.href="./login.html"
		    //Other code etc.
		});
	}
	    var template = Handlebars.compile($('#tbody-template4').html())
	    var generatedHTML = template(result.data.loginMember) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    $('.slide_bar_content').append(generatedHTML) // 새 tr 태그들로 설정한다.
	    
	 /*
	    console.log(mno);
	      $.post('../post/count.json',
	    		  {mno : mno}	
	      , function(result) {
	    	  console.log(result.data.list.length)
	    	  
	    var template = Handlebars.compile($('#tbody-template4').html())
	    var generatedHTML = template(result.data.list) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//	    tbody.text('') // tbody의 기존 tr 태그들을 지우고
	    generatedHTML='';
	    $('.counting1').html(result.data.list.length) // 새 tr 태그들로 설정한다.
  
  })*/
  
  }) 


if(alias!=null){
	$('#mysetting').attr('display','none;')
	$.post('../member/searchOneUser.json', {
		'alias': alias
	},function(result) {
		console.log(result.data)
		var template = Handlebars.compile($('#user-info-template').html())
		var generatedHTML = template(result.data.Member) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
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
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
		$('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.

//		generatedHTML.appendTo($('.user_desc')).insertAfter('#mysetting');
		//.insertAfter('.')
	})

}else{
	$.getJSON('../member/header.json', function(result) {

		console.log(result);
		var template = Handlebars.compile($('#user-info-template').html())
		loginMemberNo=result.data.loginMember.mno
		var generatedHTML = template(result.data.loginMember) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
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

		inviteMessage(loginMemberNo)
		selectLoginUserPost();
		address();
	})

	function selectLoginUserPost(){
		console.log(loginMemberNo)
		$.post('../post/selectOneUserPost.json',{'number':loginMemberNo}, function(result) {
			console.log(result);
			var template = Handlebars.compile($('#content-template').html())
			var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//			tbody.text('') // tbody의 기존 tr 태그들을 지우고
			$('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.
			dropdown()
			console.log(result.data.selectOneUserPost)

			 for(i=0; i<=result.data.selectOneUserPost.length; i++){
				  console.log(result.data.selectOneUserPost.length);
				  numOfPost = result.data.selectOneUserPost.length;
				  console.log(numOfPost);
				  }
			 
		  $('<input id="numOfPost">').attr('value',numOfPost).attr("readonly",true).appendTo($('.postNum'))
		   $('<input id="counting1">').attr('value',numOfPost).appendTo($('.counting1'))
		})
	}
	function address(){
		console.log(loginMemberNo)
		$.post('../detail/selectAddress.json', {
			'mno': loginMemberNo
		},
		function(result) {
			console.log(result)
			var uniqueNames = [];
			var flag_list=[];
			/*var flag_list_show=new Array();*/
			var flag_count=0;

			for(i=0;i<result.data.selectAddress.length;i++){
				if(result.data.selectAddress[i]!=null){
				if(result.data.selectAddress[i].address!=undefined){
					flag_list[flag_count++]=result.data.selectAddress[i].address
					console.log(flag_list)
					
				}
				}
			}
			for(i=0;i<flag_list.length;i++){
				console.log(flag_list[i].indexOf("대한민국"))
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
					}else if(flag_list[i].indexOf("스페인")!=-1){
						flag_list[i]='./flags/png/spain.png'
					}
				}

			}
			
			
			$.each(flag_list, function(i, el){
				if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
			});
			console.log(uniqueNames)
			console.log(uniqueNames.length)
			numOfFlag=uniqueNames.length;
			console.log(numOfFlag);
			for(i=0;i<uniqueNames.length;i++){
				$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('#traveled_country'))
				$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('.user_nation'))
			}
			
			$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.countryNum'))
			$('<input id="counting2">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.counting2'))
			})
		}
}

/* 민섭 - 여행기 삭제 */

//삭제 버튼 클릭시 타깃 넘버 받아오기.
var targetpostno=0;
$(document).on("click",".delete_travel",function(){

	targetpostno=$(this).attr('data-value')

	console.log("postno 뜰거다 ================>",targetpostno)
	$('#modal').css('display','inline-block')
	$('#delete_wrap').css('display','inline-block')
	deleteYes(targetpostno)
})

function deleteYes(postno) {
	$('#delete-yes-btn').click(function() {
		console.log(postno)
		$.post('../post/delete.json', {
			'postno' : postno
		}, function(result) {
			console.log(result)
		}, 'json')

		$('.post_list[data-post='+ postno +']').parent().parent().parent().remove()
	}) 
}

/* 친구 초대 수락 */
var coworksave
var checkNo= ''
var requestPost =[];
var invitePost =''
var invitingUserarr = [];
function inviteMessage(memberNo) {
	$.post('../cowork/checkInvite.json', {mno: memberNo}, function(result) {
		console.log(result.data)
		if(result.data.length != 0) {
			for (var i = 0; i < result.data.length; i++) {
				requestPost.push(result.data[i].postno)
			} // for 문: i
			coworksave=result.data
			console.log(memberNo)

			jQuery.ajaxSettings.traditional = true;
//			$.post('../member/detail.json', {postno: requestPost}, function(result) {

//			})


			var inviteSender = []
			/* 초대 받은 사진 뿌리기*/
			jQuery.ajaxSettings.traditional = true;
			$.post('../post/invitingUserPost.json', {'requestPost':requestPost}, function(result) {
				for(var l = 0; l < result.data.invitingUserPost.length; l++) {
					inviteSender.push(result.data.invitingUserPost[l].mno)
					invitePost= result.data
				}

				jQuery.ajaxSettings.traditional = true;
				$.post('../member/invitingUserPost.json', {'sendermno': inviteSender}, function(result) {
					console.log("회원번호로 가져온====>", result)
					console.log(result)
					invitingUser = result.data;
					
					console.log("J======>", invitePost)
					
					for(var o = 0; o < invitePost.invitingUserPost.length; o++){
						for(var m = 0; m < result.data.invitingUserInfo.length; m++) {
							console.log(invitePost.invitingUserPost[o])
							console.log(invitingUser[m])
							if(invitePost.invitingUserPost[o].mno == result.data.invitingUserInfo[m].mno) {
							   invitePost.invitingUserPost[o].edt = result.data.invitingUserInfo[m].alias
							   invitePost.invitingUserPost[o].pdt = result.data.invitingUserInfo[m].email
							   invitePost.invitingUserPost[o].detail = result.data.invitingUserInfo[m].mpto
							}
						}
					}
					
					console.log(invitePost)
					console.log("내가 좀 바꿨거든======>",result.data)
					var template = Handlebars.compile($('#content-request-template').html())
					var generatedHTML;
					console.log(result.pdt)
					console.log(invitePost)
					generatedHTML = template(invitePost) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
					$('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.	    	  
					/*dropdown()*/
					console.log(invitingUser)
//				console.log("빨리===========>", )
					for(var j = 0; j < invitePost.invitingUserPost.length; j++){
						for(var k = 0; k < coworksave.length; k++){
							console.log("변경전======>",invitePost.invitingUserPost[j].sdt)
							if(invitePost.invitingUserPost[j].postno == coworksave[k].postno) {
								invitePost.invitingUserPost[j].sdt = coworksave[k].confirm 
								console.log("변경후=======>", invitePost.invitingUserPost[j].sdt)
							} // if 문
							
						}// for 문: k 
						if(invitePost.invitingUserPost[j].sdt == 1) {
							$('#invite_request_'+invitePost.invitingUserPost[j].postno).css('display', 'none'); 
						}
					}// for 문: j
					
//				}
					/*if(result.sdt==0){
	      }*/
					console.log(result.data)

					
					
					
				})

				console.log(result.data)
				

			}) // $.post invitingUserPost
			console.log(memberNo)
			acceptRequest(memberNo)
			refuseRequest(memberNo)
		} // if 문
	})// $.post


}

function loadRequestPost(requestPost) {

}
function acceptRequest(memberNo) {
	$(document.body).on('click', '.btn_accept', function() {
		var selectPostNo = $(this).parents('.box_request').attr('id').split('_')[2]
		console.log(selectPostNo ,memberNo)
		let PostMemberNo = []
		PostMemberNo.push(selectPostNo)
		PostMemberNo.push(memberNo)

		jQuery.ajaxSettings.traditional = true;
		$.post('../cowork/acceptRequest.json', {'memberPostNo': PostMemberNo}, function(result) {
			console.log(result)
		})

		$(this).parents('.box_request').remove();
//		event.preventDefault()
	})
}

function refuseRequest(memberNo) {
	$(document.body).on('click', '.btn_reject', function() {
		var selectPostNo = $(this).parents('.box_request').attr('id').split('_')[2]
		let PostMemberNo = []
		PostMemberNo.push(selectPostNo)
		PostMemberNo.push(memberNo)
		jQuery.ajaxSettings.traditional = true;
		$.post('../cowork/refuseRequest.json', {'memberPostNo': PostMemberNo}, function(result) {
			   console.log(result)
		})
		$(this).parents('.travel_item').remove()
	})
}