var userDesc= $('.user_desc');

var inviteMemberNo=0;
var targetuserimage=0;
var targetpostno=0;

// header load 시키기
$(function() {
	$('.header-container').load('../main/header.html')
	
	$('.footer-container').load('../main/footer.html')

	
	$.getJSON('/member/header.json', function(result) {
	console.log(result.data)

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
	$(this).attr('data-no')
	var str = $(this).attr('data-email')+'에게 초대장을 보내시겠습니까?'
	 
	swal({
	    title: "에게 초대장을 보내시겠습니까?",
	    type: "warning",
	    showCancelButton: true,
	    confirmButtonColor: "lightseagreen",
	    confirmButtonText: "네",
	    closeOnConfirm: true,
	    cancelButtonText: "아니요"
	  },
	  function(){
	  
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
		var template = Handlebars.compile($('#content-template').html())
		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
		$('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.
		dropdown()
	})
}

// 초대받은 여행기 거절하기
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

	console.log("postno 뜰거다 ================>",targetpostno)
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

