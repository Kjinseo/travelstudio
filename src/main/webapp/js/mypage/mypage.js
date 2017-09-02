var userDesc= $('.user_desc');

var alias= location.href.split('?')[1]
var loginMemberNo =0;
console.log(alias)
console.log(encodeURI(alias, "UTF-8"))
if(alias!=null){
	$('#mysetting').attr('display','none;')
	$.post('/member/searchOneUser.json', {
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
			$('#user-img').attr('src', '/image/usercircle.png').css('width', '170px').css('height', '170px').css('border-radius', '100%')
		} else {
			$('#user-img').attr('src', '/upload/' + str).css('width', '170px').css('height', '170px').css('border-radius', '100%')
		}

		var template = Handlebars.compile($('#content-template').html())
		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
		$('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.

//		generatedHTML.appendTo($('.user_desc')).insertAfter('#mysetting');
		//.insertAfter('.')
	})

}else{
	$.getJSON('/member/header.json', function(result) {

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
			$('#user-img').attr('src', '/image/usercircle.png').css('width', '170px').css('height', '170px').css('border-radius', '100%')
		} else {
			$('#user-img').attr('src', '/upload/' + str).css('width', '170px').css('height', '170px').css('border-radius', '100%')
		}


		selectLoginUserPost()
	})

	function selectLoginUserPost(){
		console.log(loginMemberNo)
		$.post('/post/selectOneUserPost.json',{'number':loginMemberNo}, function(result) {
			console.log(result);
			var template = Handlebars.compile($('#content-template').html())
			var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//			tbody.text('') // tbody의 기존 tr 태그들을 지우고
			$('.travle_list').append(generatedHTML) // 새 tr 태그들로 설정한다.
			dropdown()
			console.log(result.data.list)
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
var inviteMemberNo=0;
var targetpostno=0;
var targetuserimage=0;
/* 친구 초대하기에서 검색후 친구 이름을 눌렀을때 확인창 부분에서 하는 함수 */

$(document).on("click",".select_friends",function(){
	console.log('selectf click')
	console.log($(this).attr('data-email'))
	var str = $(this).attr('data-email')+'에게 초대장을 보내시겠습니까?'
	$('#confirm-email').html(str)
	inviteMemberNo=$(this).attr('class').split(' ')[1]
	/* console.log($(this).children("div").first().children("div").children()) */
	targetuserimage=$(this).attr('data-path')
	console.log(inviteMemberNo)
})
/* 친구 초대하기에서 검색후 친구 이름을 눌렀을때 확인창 부분에서 하는 함수  끝 */

$('#confirm-invite-f-yes').click(function(){
	console.log(inviteMemberNo)
	console.log(targetpostno)
	$.post('../cowork/invite.json', {
		'mno': inviteMemberNo,
		'postno' : targetpostno
	}, function(result) {
		/* $('<img src='+targetuserimage+'>').appendTo($('.join_user_list')) */
		console.log($('.join_user_list'))
		$('.join_user_list').append($('<div class="'+inviteMemberNo+'_'+targetpostno+'">').html('<img src="'+targetuserimage+'"><a class="delete-invite-f"><i class="fa fa-times-circle-o" aria-hidden="true"></i></a>'))
	}, 'json')
})

$(document).on("click",".delete-invite-f",function(){
	console.log($(this).parent())
	var img1 = $(this).parent()
	$.post('../cowork/delete.json', {
		'mno': img1.attr('class').split('_')[0],
		'postno' : img1.attr('class').split('_')[1]
	}, function(result) {
		console.log($(this))
		img1.remove()
	}, 'json')
})


$('#f_search').click(function(){
	console.log('fsearch click')
	var searchusername=$('#f_search-bar').val()
	$.post('../member/search.json', {
		'keyword': searchusername
	}, function(result) {
		console.log(result)
		var template = Handlebars.compile($('#search-friends-template').html())
		var generatedHTML = template(result.data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
//		tbody.text('') // tbody의 기존 tr 태그들을 지우고
		$('#f_search_list > ul').append(generatedHTML) // 새 tr 태그들로 설정한다.

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



$(document).on("click",".invite_f",function(){
	console.log(this)
	targetpostno=$(this).attr('data-value')
	$('#modal').css('display','inline-block')
	$('#invite_f_container').css('display','inline-block')
})

$(document).on("click",".share_travel",function(){
	console.log(this)
	targetpostno=$(this).attr('data-value')
	$('#modal').css('display','inline-block')
	$('#invite_f_container').css('display','inline-block')
})

/* $(document).on("click",".delete_travel",function(){
	console.log(this)
	targetpostno=$(this).attr('value')
	$('#modal').css('display','inline-block')
	$('#invite_f_container').css('display','inline-block')
}) */

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

$('.delete_travel').on('click', function(){
	$('.wrap11, #b').toggleClass('active');
	return false;
});

$(".delete_travel > #no-btn").click(function () {
	$('.wrap11, #b').toggleClass('active');
});






