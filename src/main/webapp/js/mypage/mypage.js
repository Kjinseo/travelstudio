var userDesc= $('.user_desc');

var inviteMemberNo=0;
var targetuserimage=0;
var targetpostno=0;

var isListEmpty = false;
var isCoworkListEmpty = false;



// header load 시키기
$(function() {
	$('.header-container').load('../main/header.html')
	
	$('.footer-container').load('../main/footer.html')

	$.getJSON('/member/header.json', function(result) {
		if (result) {
			
			console.log('member/header.json 결과: ')
			console.log(result.data)
			
			var template = Handlebars.compile($('#user-info-template').html())
			loginMemberNo=result.data.loginMember.mno
			var generatedHTML = template(result.data.loginMember) 
			userDesc.append(generatedHTML);
		}

	$(document.body).on('click', '#mysetting', function(event) {
		location.href = 'user_setting.html'
			event.preventDefault()
	})

	let str = result.data.loginMember.path;
	if(str == null ) {
		$('#user-img').attr('src', '/image/usercircle.png').css('width', '170px').css('height', '170px').css('border-radius', '100%')
	} else {
		$('#user-img').attr('src', str).css('width', '170px').css('height', '170px').css('border-radius', '100%')
	}
	
	selectLoginUserPost()
	
})
	

	
})

/* 친구 초대하기에서 검색후 친구 이름을 눌렀을때 확인창 부분에서 하는 함수 */
$(document).on("click",".modalForinv",function(){
	$(this).attr('data-email')
	console.log($(this).attr('data-email'))
	 inviteMemberNo = $(this).attr('data-no');
	console.log($(this).attr('data-no'))
	var str = $(this).attr('data-email')+'에게 초대장을 보내시겠습니까?'
	 
	swal({
		  title: "초대장을 보내겠습니까?",
		  text: "초대장을 받은 친구는 게시물을 함께 작성하게 됩니다.",
		  type: "warning",
		  showCancelButton: true,
		  confirmButtonColor: "lightgreen",
		  confirmButtonText: "초대하기",
		  cancelButtonText: "취소",
		  closeOnConfirm: false,
		  closeOnCancel: false
		},
		function(isConfirm){
			  if (isConfirm) {
					console.log(inviteMemberNo)
					console.log(targetpostno)
					$.post('/cowork/invite.json', {
						'mno': inviteMemberNo,
						'postno' : targetpostno
					}, function(result) {
						console.log($('.join_user_list'))
						$('.join_user_list').append($('<div class="'+inviteMemberNo+'_'+targetpostno+'">').html('<img src="'+targetuserimage+'"><a class="delete-invite-f"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>'))
					}, 'json')
			    swal("성공", "초대장을 보냈습니다.", "success");
			  } else {
			    swal("취소", "초대장 보내기를 취소합니다.", "error");
			  }
			});
	 
})
	
function test1(idMyDiv) {
  var objDiv = document.getElementById(idMyDiv);
  if (objDiv.style.display == "inline-block") {
    objDiv.style.display = "none";
  } else {
    objDiv.style.display = "inline-block";
  }
  event.preventDefault();
  event.stopPropagation()
}

function test(idMyDiv) {
  var objDiv = document.getElementById(idMyDiv);
  if (objDiv.style.display == "inline-block") {
    objDiv.style.display = "none";
  } else {
    objDiv.style.display = "inline-block";
  }
  event.preventDefault();
  event.stopPropagation()
}

function selectLoginUserPost(){
	$.post('/post/selectOneUserPost.json',{'number':loginMemberNo}, function(result) {
		if (result) {
			
			var resultLength = result.data.selectOneUserPost.length
			console.log(resultLength)
			$('.postNum').text(resultLength)
			var template = Handlebars.compile($('#content-template').html())
			if(result.data.selectOneUserPost.length<=0) {
				isListEmpty = true;
				displayNoData()
			}
			var generatedHTML = template(result.data) 
			$('.travle_list').append(generatedHTML) 
			dropdown()
			console.log("멤버넘버있냐?", loginMemberNo)
//			address()
			getMno()
		}
		
	})
}

// 여행기 거절하기
$(document).on("click",".delete-invite-f",function(){
	console.log($(this).parent())
	var img1 = $(this).parent()
	$.post('/cowork/delete.json', {
		'mno': img1.attr('class').split('_')[0],
		'postno' : img1.attr('class').split('_')[1]
	}, function(result) {
		console.log($(this))
		img1.remove()
	}, 'json')
})

function dropdown(){
	$(function() {
//		Dropdown toggle
		$('.dropdown-toggle').click(function(){
			$(this).next('.dropdown').toggle();
		});

		$(document).click(function(e) {
			var target = e.target;
			if (!$(target).is('.dropdown-toggle') && !$(target).parents().is('.dropdown-toggle')) {
				$('.dropdown').hide();
			}
		});
	});
}

// 친구 초대하기
$(document).on("click",".invite_f",function(){
	console.log(this)
	targetpostno=$(this).attr('data-value')
	$('#modal').css('display','inline-block')
	$('#invite_f_container').css('display','inline-block')
})

$('#f_search').click(function(){
	console.log('fsearch click')
	var searchusername=$('#f_search-bar').val()
	$.post('/member/search.json', {
		'keyword': searchusername
	}, function(result) {
		console.log(result.data)
		var template = Handlebars.compile($('#search-friends-template').html())
		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		$('#f_search_list').append(generatedHTML) // 새 tr 태그들로 설정한다.

	}, 'json')

})

$('#confirm-invite-f-yes').click(function(){
	console.log(inviteMemberNo)
	console.log(targetpostno)
	$.post('/cowork/invite.json', {
		'mno': inviteMemberNo,
		'postno' : targetpostno
	}, function(result) {
		console.log($('.join_user_list'))
		$('.join_user_list').append($('<div class="'+inviteMemberNo+'_'+targetpostno+'">').html('<img src="'+targetuserimage+'"><a class="delete-invite-f"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>'))
	}, 'json')
})


// 여행기 공유하기
$(document).on("click",".share_travel",function(){
	console.log(this)
	targetpostno=$(this).attr('data-value')
	$('#modal').css('display','inline-block')
	$('#invite_f_container').css('display','inline-block')
})


//여행기 삭제하기
$(document).on("click",".delete_travel",function(){

	targetpostno=$(this).attr('data-value')

	$('#modal').css('display','inline-block')
	$('#delete_wrap').css('display','inline-block')
	deleteYes(targetpostno)
})

function deleteYes(postno) {
	$('#delete-yes-btn').click(function() {
		console.log(postno)
		$.post('/post/delete.json', {
			'postno' : postno
		}, function(result) {
			console.log(result)
		}, 'json')

		$('.post_list[data-post='+ postno +']').parent().parent().parent().remove()
	}) 
}

$('.delete_travel').on('click', function(){
	$('.wrap11, #b').toggleClass('active');
	return false;
})

$(".delete_travel > #no-btn").click(function () {
	$('.wrap11, #b').toggleClass('active');
})


displayShareList()
var requestPost = 0;
//공유한 리스트 가져오기
function displayShareList() {
  $.getJSON('/post/listCoworkPost.json', function(result) {
    console.log(result.data)
    if(result.data.invitingUserPost.length<=0) {
      isCoworkListEmpty = true;
      displayNoData()
    }
    var template = Handlebars.compile($('#content-request-template').html())
    var generatedHTML = template(result.data) 
    requestPost = result.data.invitingUserPost[0].postno
    $('.travle_list_invited').append(generatedHTML) 
    
    
    if ("postno",result.data.invitingUserPost[0].confirm == 1) {
    	$(".cowork-modal-box[data-no=" + requestPost + "]").css('display', 'none')
    }
    
    
  }, 'json')
}


//초대받은 여행기 수락하기
$(document).on("click",".btn_accept",function(){
  var no = $(this).attr("data-no")
$.post('/cowork/acceptRequest.json', {
 'postNo' : no
}, function(result) {
  console.log(result)
  $(".cowork-modal-box[data-no=" + no + "]").css('display', 'none')
}, 'json')
})

//초대받은 여행기 거절하기
$(document).on("click",".btn_reject",function(){
  var no = $(this).attr("data-no")
$.post('/cowork/refuseRequest.json', {
 'postNo' : $(this).attr("data-no")
}, function(result) {
  console.log(result)
  $(".cowork-modal-box[data-no=" + no + "]").css('display', 'none')
  $(".item_card[data-no="+ no +"]").remove()
}, 'json')
})



function displayNoData() {
  if(isListEmpty && isCoworkListEmpty)
    $('.mypage-no-data').show()
}


function getMno() {
	$.getJSON('/member/header.json', function(result) {
		if (result) {
			loginMemberNo=result.data.loginMember.mno
			console.log(loginMemberNo)
			address()
		}
	})
}
//getMno()

function address(){
	
	$.post('/detail/selectAddress.json', {
		'mno': loginMemberNo
	},
	function(result) {
		if (result) {
			
			console.log(result.data[loginMemberNo])
			console.log(result.data[loginMemberNo][0])
			var realData = result.data[loginMemberNo]
			var uniqueNames = [];
			var flag_list=[];
			/*var flag_list_show=new Array();*/
			var flag_count=0;
			
			for(i=0;i<realData.length;i++){
				if(realData[i]!=null){
					if(realData[i].address!=undefined){
						flag_list[flag_count++]=realData[i].address
						console.log(flag_list)
						
					}
				}
			}
			for(i=0;i<flag_list.length;i++){
				console.log(flag_list[i].indexOf("한국"))
				if(flag_list[i]!=undefined){
					if(flag_list[i].indexOf("한국")!=-1){
						flag_list[i] ='../../image/flags/south-korea.png'
					}else if(flag_list[i].indexOf("미국")!=-1){
						flag_list[i]='../../image/flags/united-states-of-america.png'
					}else if(flag_list[i].indexOf("일본")!=-1){
						flag_list[i]='../../image/flags/japan.png'
					}else if(flag_list[i].indexOf("영국")!=-1){
						flag_list[i]='../../image/flags/united-kingdom.png'
					}else if(flag_list[i].indexOf("프랑스")!=-1){
						flag_list[i]='../../image/flags/france.png'
					}else if(flag_list[i].indexOf("중국")!=-1){
						flag_list[i]='../../image/flags/china.png'
					}else if(flag_list[i].indexOf("조선")!=-1){
						flag_list[i]='../../image/flags/north-korea.png'
					}else if(flag_list[i].indexOf("스페인")!=-1){
						flag_list[i]='../../image/flags/spain.png'
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
			for(i=0;i<=uniqueNames.length;i++){
				$('<img style=width:36px; height:36px;>').attr('src',uniqueNames[i]).css('margin-right','7px').appendTo($('#traveled_country'))
			}
			
			$('<input id="numberOfFlag">').attr('value',numOfFlag).attr("readonly",true).attr("disabled",false).appendTo($('.countryNum'))
		}
		})
		
	}
