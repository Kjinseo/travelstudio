var fititle = $('#wirte_title'),
fisdt = $('.write_start_date'),
fiedt = $('.write_end_date'),
ficont = $('.text_write_box'),
MapArray=[];
var mno =0,
savecount=0,
d = new Date(), 
localeDate  =  d.toLocaleDateString(), 
date = new Date(),
content = []

var aaa=0,
jsPictureList=[],
photo1=[],
picnoparentno=[],
captionArray = [],
detailDateArr = [],
detailLocArr = [],
mapArr=[];

var countPhoto=0;
setFileUploadToInputTag() // 처음 한 번은 호출하고, 그 다음부터는 태그를 만들 때 호출한다.
imagecount=0;
var submitcount=0;
imagesDiv2=0;

var parentno;
registMapFunction()


function registMapFunction(){
	$(document.body).on('click', '#showMapModal', function(event) {
		parentno=$(this).parent().parent().parent().parent().attr('id').split('_')[2]
		console.log(parentno)
	});
} // function registMapFunction()

//텍스트상자 크기 자동조절
function cmaTextareaSize(obj, bsize) { // 객체명, 기본사이즈
	var sTextarea = document.getElementById(obj);
	var csize = (sTextarea.scrollHeight >= bsize) ? sTextarea.scrollHeight
			+ "px"
			: bsize + "px";
	sTextarea.style.height = bsize + "px";
	sTextarea.style.height = csize;
}
//function cmaTextareaSize(obj, bsize)

function createtextbox(parentno) {
	$('#text_parent_' + parentno).empty();
	$('<textarea class="text_write_box" style="width:800px; height:150px;">').appendTo($('#text_parent_' + parentno))
	addition_p('write_addition', 'testdiv');
	addTextfunc()
} // function createtextbox(parentno)

function addTextfunc() {
	if($('.text_write_box').val()==""){
		$('.text_write_box').keyup( function(event){
			console.log(this)
		});
	}
	$('.text_write_box').keyup( function(event){
		console.log($('.text_write_box').val())
		console.log(this)
	});
}

//작은 + 구현
function test(idMyDiv) {
	var objDiv = document.getElementById(idMyDiv);
	console.log($('#testdiv'));

	if (objDiv.style.display == "inline-block") {
		objDiv.style.display = "none";

	} else {
		objDiv.style.display = "inline-block";
	}
} 

function file_browse(a) {
	console.log("==============>")
	aaa = a;

	console.log($('.file1'))
	$('.file1').click()
}

function file_browse1(a) {
	aaa = a;

	$('.file2').click()
}

function title_file_browse() {
	$('#title_fileupload').click()
}

function file_browse_none() {
	$('#fileAllup').click()
	$('#fileAllUpload').click();
}

function test1(idMyDiv) {
	var objDiv = document.getElementById(idMyDiv);
	if (objDiv.style.display == "inline-block") {
		objDiv.style.display = "none";
	} else {
		objDiv.style.display = "inline-block";
	}
}
//작은 + 끝

//큰 +버튼 생성
function addition_p(aa, bb) {
	var objDiv = document.getElementById(aa);
	objDiv.style.display = "inline-block";

}
var divcount = 1;

//큰+버튼시 글상자창 추가
var tbody = $('.day_list')
function adddiv() {
	var data = {aa:[{count:divcount}]}

	var template = Handlebars.compile($('#dayplus-template').html())
	var generatedHTML = template(data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
	tbody.append(generatedHTML) // 새 tr 태그들로 설정한다.

	setFileUploadToInputTag()
	registMapFunction()
	divcount++;

	$('#write_addition').css('display', "none");
}

function addbtn_adddiv(divThisCount) {

	//add btn 클릭시 해당 div에서 countPhoto 번호를 저장한 divThisCount 저장.
	var afterTbody = $('#text_parent_'+ divThisCount).parent() // 넘겨받은 div번호 뒤에 태그 after하기 위해 변수 선언

	var beforePlus = parseInt(divThisCount) + 1 // 추가된 div 번호 설정 변수 초기화
	var data = {insertDiv:[{count:beforePlus}]} // 추가된 div 모든 자식노드 count 설정할 변수

	var template = Handlebars.compile($('#addbtn-dayplus-template').html())
	var generatedHTML = template(data) // 템플릿 함수에 데이터를 넣고 HTML을 생성한다.
	afterTbody.after(generatedHTML) // 새 tr 태그들로 설정한다.

	setFileUploadToInputTag()
	registMapFunction()

	$('#write_addition').css('display', "none");
}    

function resize(obj) {
	obj.style.height = "1px";
	obj.style.height = (12 + obj.scrollHeight) + "px";
}

//+일차 버튼 클릭시
function changebuttontoday(ab) {
	$('<h2>').html("2일차</h2><br><i class='fa fa-pencil-square-o' aria-hidden='true'></i>"
			+ "<div class='travel_detail_date' >2017.05.05</div><span id='"
			+ $(ab).attr('id') + "'></span>").appendTo(
					$(ab).closest('div'))
					ab.remove();
}

//마우스 오버시 작은+와 +날짜 보이게
function onfocus1(objDiv) {
	objDiv.style.display = "inline-block";
}

function onblur1(objDiv) {
	objDiv.style.display = "none";
	if ($("#testdiv").css("display") == "inline-block") {
		$("#testdiv").css("display", "none")
	}

}

function onfocus2(objDiv, bb) {
	$('#objDiv').show();
	objDiv.style.display = "inline-block";
	$('#bb').show();
	bb.style.display = "inline-block";
}

function onblur2(objDiv, bb, cc) {
	$('#objDiv').hide();
	objDiv.style.display = "none";
	console.log(bb)
	$('#bb').hide();
	bb.style.display = "none";
	$(cc).css("display", "none")
}
//마우스 오버시 작은 + 와 날짜 보이게 끝



$(function() {
	$("#datepicker").datepicker({
		showButtonPanel : true,
		dateFormat : 'yy/mm/dd'
	});
});

$(function() {
	$("#datepicker1").datepicker({
		showButtonPanel : true,
		dateFormat : 'yy/mm/dd'
	});
});

$(function() {
	$( ".travel_detail_date" ).datepicker({
		showButtonPanel : true,
		dateFormat : 'yy-mm-dd'
	});
	console.log("날짜 누름")
});

function datePick() {
	$( ".travel_detail_date" ).datepicker({
		showButtonPanel : true,
		dateFormat : 'yy-mm-dd'
	});
	console.log("날짜 누름")
}; 

var date = $('.files_date')
function checked(ab) {
	var ac = document.getElementById(ab)
	if ($(ac).css('display') == 'block') {
		$(ac).css('display', 'none')
		$(ac).removeClass();

	} else {
		$(ac).addClass('checked');
		$(ac).css('display', 'inline-block')
	}
}

var a = 0;
$(document).ready(function() 
		{$(".edit_group").click(function() {
			$('<div>2017. 07. 29</div>').attr('class', 'files_date').appendTo($('<div class="table_files'+a+'" + >')
					.insertAfter($('.table_files')));
			$('.checked').parent().appendTo($('<div class="files_wrap">').appendTo($('.table_files' + a)));
			$('.checked').css('display',
			'none');

			$('.checked').removeClass();

			$('.files_wrap:empty').parent()
			.remove();
			a++
		})
		})

		$(document).ready(
				function() {
					$(".edit_ungroup").click(function() {
						var divs = $('.checked').toArray();
								console.log(divs[1])
								for (i = 0; i < divs.length; i++) {
									$('<div>aa</div>').attr('class','files_date').appendTo(
											$('<div class="table_files' +a+'" + >').insertAfter($('.table_files')));
									$(divs[i]).parent().appendTo($('<div class="files_wrap">').appendTo($('.table_files'+ a)));
									a++
								}
								$('.checked').css('display',
								'none');
								$('.checked').removeClass()

								$('.files_wrap:empty').parent()
								.remove();
							})
				})

				$(document).ready(function() {
					$(".edit_delete").click(function() {
						$('.checked').parent().parent().empty();
						$('.checked').parent().parent().remove();
						$('.files_wrap:empty').parent().remove();
					})

				})

				$(document).ready(function() {
					$('.help_btn').click(function() {
						$('.edit_react_window').show();
						$('html, body').css({
							'overflow' : 'hidden'
						});
						$('body').on('scroll touchmove mousewheel', function(event) {
							event.preventDefault();
							event.stopPropagation();

							//  return false;
						});

					})
				})




				function test1(idMyDiv) {
	var objDiv = document.getElementById(idMyDiv);
	if (objDiv.style.display == "inline-block") {
		objDiv.style.display = "none";
	} else {
		objDiv.style.display = "inline-block";
	}
	initAutocomplete();
}

var latNum;
var lngNum;
var center;
var count = 0;

function initAutocomplete() {
	var map = new google.maps.Map(document.getElementById('map'), {
		center : {
			lat : 37.5665,
			lng : 126.9780
		},
		zoom : 10,
		mapTypeId : 'roadmap'
	});
	console.log("지도 나온당");

	var clickcount = 0;
	var a;
	var b;
	var input = document.getElementById('pac-input');
	var searchBox = new google.maps.places.SearchBox(input);

	map.addListener('bounds_changed', function() {
		searchBox.setBounds(map.getBounds());

		console.log(map.center.lat());
		console.log(map.center.lng());
		map.addListener('click', function(e) {
			if (clickcount == 0) {
				placeMarkerAndPanTo(e.latLng, map);
				clickcount++;
			} else {
				marker.setMap(null);

				placeMarkerAndPanTo(e.latLng, map);
			}

			latNum = map.center.lat()
			lngNum = map.center.lng()

			console.log(latNum);
			console.log(lngNum);

		});
		var marker = new google.maps.Marker();
		function placeMarkerAndPanTo(latLng, map) {
			marker = new google.maps.Marker({
				position : latLng,
				map : map,
			});

			map.panTo(latLng);
			map.setZoom(15);
			console.log("마크 찍힘");
			console.log(marker);

		}

	});


	var markers = [];
	searchBox.addListener('places_changed', function() {
		var places = searchBox.getPlaces();

		if (places.length == 0) {
			return;
		}

		markers.forEach(function(marker) {
			marker.setMap(null);
		});
		markers = [];

		var bounds = new google.maps.LatLngBounds();
		places.forEach(function(place) {
			if (!place.geometry) {
				console.log("Returned place contains no geometry");
				return;
			}

			if (place.geometry.viewport) {
				// Only geocodes have viewport.
				bounds.union(place.geometry.viewport);
			} else {
				bounds.extend(place.geometry.location);
			}
		});
		map.fitBounds(bounds);

	});

}



function initMap2(mapDelId, slati, slongit) {
	var map2 = new google.maps.Map(document.getElementById(mapDelId), {
		zoom : 8,
		center : {
			lat : 40.731,
			lng : -73.997
		}
	});
	var geocoder = new google.maps.Geocoder;
	var infowindow = new google.maps.InfoWindow;

	geocodeLatLng(geocoder, map2, infowindow, slati, slongit)
}

function geocodeLatLng(geocoder, map2, infowindow, slati, slongit) {
	var latlng = {
			lat : parseFloat(slati),
			lng : parseFloat(slongit)
	};
	geocoder.geocode({
		'location' : latlng
	}, function(results, status) {
		if (status === 'OK') {
			if (results[1]) {
				map2.setZoom(14);
				map2.setCenter(results[0].geometry.location);
				var marker = new google.maps.Marker({
					position : latlng,
					map : map2
				});

				infowindow.setContent(results[1].formatted_address);
				infowindow.open(map2, marker);

			}
		}
	});
}

var body33 = $('#text_parent_0')

var mapcount = 3;
function createMap() {
	slati = latNum.toFixed(8);
	slongit = lngNum.toFixed(8);
	/* $('#text_parent_0').html(''); */
	$('#text_parent_'+parentno).html('');
	$("<div class='map' data-lati="+slati+" data-longit="+slongit+" id='map"+mapcount+"'style='width:809px; height:380px; border:1px solid white; margin-bottom: 70px;'>").appendTo($('#text_parent_'+parentno))
	console.log("aaaa")
	var mapDelId = 'map' + mapcount
	console.log(mapDelId, slati, slongit)
	initMap2(mapDelId, slati, slongit)
	mapcount++

};

var slati;
var slongit;
/*function saveMap() {
  console.log("위치 데이터 넘어감");
  $.post('/detail/addMap.json', {
    'lati' : latNum.toFixed(8),
    'longit' : lngNum.toFixed(8),
    'srtno' : parentno
  }, function(result) {
  }, 'json')
}*/


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


//HTML 에서 있던 코드 



function setFileUploadToInputTag() {
	$('.file1').fileupload({
		url: '/File/upload.json',        // 서버에 요청할 URL
		dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
		sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
		singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
		autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
		disableImageResize: /Android(?!.*Chrome)|Opera/
			.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
			previewMaxWidth: 700,   // 미리보기 이미지 너비
			previewMaxHeight: 560,  // 미리보기 이미지 높이 
			previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
			processalways: function(e, data) {
				/*injaeUpload();*/
				console.log('fileuploadprocessalways()...');
				console.log($(this).val())
				console.log(data.files);
				var no = $(this).attr('class').split('_')[1].split(' ')[0]
				console.log(no)
				/*console.log(no)*/
				var imagesDiv = $("#text_parent_"+aaa+"");
				imagesDiv2=$("#text_parent_"+aaa+"");
				imagesDiv.html('');
				/*console.log("파일1 업로드 들어옴")
			console.log("파일1 업로드 들어옴")
			console.log("파일1 업로드 들어옴")*/
				if(submitcount==0){
					data.submit();
					submitcount++
				} else {
					return;
				}
			}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
				console.log('submit()...');
				console.log("data-->", data)
				console.log(aaa)
			},
			done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
				console.log('done()...');
				console.log(data.result);
				countPhoto=aaa;
				var file = data.result.fileList[0];
				console.log(data)
				console.log(imagesDiv2)

				for(k=0;k<data.result.fileList.length;k++){
					onlyPath1.push(data.result.fileList[k].filename)
				}
				console.log(onlyPath1)
				console.log(data.result.fileList.length)
				if (data.result.fileList.length == 1) {
					$("<div class='whole_collage1' data-countPhoto="+countPhoto+">")
					.html("<div  class='one_photo_col' id='collage1-1" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "</div>"
					).appendTo(imagesDiv2)
					$('#collage1-1'+ countPhoto +'> img').attr('src',data.result.fileList[0].filename + "_700.png").css('width', '809px').css('height','606px');
				} else if (data.result.fileList.length == 2) {
					$("<div class='whole_collage2'>")
					.html("<div  class='two_photo_col' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "<div  class='two_photo_col' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "</div>"
					).appendTo(imagesDiv2)
					$('#collage2-1-count'+ countPhoto +'> img').attr('src',data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
					$('#collage2-2-count'+ countPhoto +'> img').attr('src',data.result.fileList[1].filename + "_700.png").css('width', '534px').css('height','534px');
				} else if (data.result.fileList.length == '3') {
					try {
						$("<div class='whole_collage3' data-countPhoto="+countPhoto+">")
						.html("<div class='collage3-big' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
								+ "<div class='collage3_2inner_collage'>"
								+ "<div class='inner_two_collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
								+ "<div class='inner_two_collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
								+ "</div></div>"
						).appendTo(imagesDiv2)
						$('#collage3-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
						$('#collage3-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '260px').css('height','265px');
						$('#collage3-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','265px');

					} catch (err) {}
				}else if (data.result.fileList.length == 4) {
					try {
						$("<div class='whole_collage4' data-countPhoto="+countPhoto+">")
						.html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
								+ "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
								+ "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
								+ " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
								+ "</div>"
						).appendTo(imagesDiv2)

						$('#collage4-1'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage4-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage4-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage4-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '397px').css('height','397px');
					} catch (err) {}    
				} else if (data.result.fileList.length == 5) {
					try {
						$("<div class='whole_collage5' data-countPhoto="+countPhoto+">")
						.html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
								+ "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
								+ "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

								+ "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
								+ "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
								+ "</div>"
						).appendTo(imagesDiv2) 
						$('#collage5-1'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '260px').css('height','260px');
						$('#collage5-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '259px').css('height','260px');
						$('#collage5-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','260px');

						$('#collage5-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage5-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '397px').css('height','397px');
					} catch (err) {}    
				} else if (data.result.fileList.length == 6) {
					try {
						$("<div class='whole_collage6' data-countPhoto="+countPhoto+">")
						.html("<div class='collage6-big' id='collage6-1-big" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div id='collage6-2side-collage'>"
								+"<div class='side_two_collage' id='collage6-2" +countPhoto +"'><img src=''></div>"
								+"<div class='side_two_collage' id='collage6-3" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2) 
						$('#collage6-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
						$('#collage6-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '260px').css('height','265px');
						$('#collage6-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','265px');

						$('#collage6-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '264px').css('height','260px');
						$('#collage6-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '264px').css('height','260px');
						$('#collage6-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '264px').css('height','260px');

					} catch (err) {}    
				} else if (data.result.fileList.length == 7) {
					try {
						$("<div class='whole_collage7' data-countPhoto="+countPhoto+">")
						.html("<div class='four_of_seven'>"
								+"<div class='right_four_of_seven' id='collage7-1-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven' id='collage7-2-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven' id='collage7-3-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven' id='collage7-4-small" +countPhoto +"'><img src=''></div>"
								+"</div>"


								+"<div  class='bottom_three_of_seven' id='collage7-5" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_seven' id='collage7-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_seven' id='collage7-7" +countPhoto +"'><img src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2)  
						$('#collage7-1-small'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '192px').css('height','193px');
						$('#collage7-2-small'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '192px').css('height','193px');
						$('#collage7-3-small'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '192px').css('height','193px');
						$('#collage7-4-small'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '192px').css('height','193px');

						$('#collage7-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage7-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage7-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '397px').css('height','397px');


					} catch (err) {}    
				} else if (data.result.fileList.length == 8) {
					try {
						$("<div class='whole_collage8' data-countPhoto="+countPhoto+">")
						.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
								+"<div  id='four_of_eight'>"
								+"<div class='right_four_of_eight' id='collage8-2" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-3" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-4" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-5" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_three_of_eight' id='collage8-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_eight' id='collage8-7" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_eight' id='collage8-8" +countPhoto +"'><img src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2)



						$('#collage8-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage8-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage8-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage8-4'+ countPhoto +' > img').attr('src',data.result.fileList[3].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage8-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '195px').css('height','195px');

						$('#collage8-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '262px').css('height','260px');
						$('#collage8-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '262px').css('height','260px');
						$('#collage8-8'+ countPhoto +' > img').attr('src', data.result.fileList[7].filename + "_700.png").css('width', '262px').css('height','260px');

					} catch (err) {}    
				} else if (data.result.fileList.length == 9) {

					try {
						$("<div class='whole_collage9' data-countPhoto="+countPhoto+">")
						.html("<div  id='collage9-1-big'><img id='img_4' src='ca.jpg'></div>"
								+"<div  class='four_of_nine'>"
								+"<div class='right_four_of_nine' id='collage9-2" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-3" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-4" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-5" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_four_of_nine' id='collage9-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-7" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-8" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-9" +countPhoto +"'><img src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2)

						$('#collage9-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage9-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage9-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage9-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage9-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '195px').css('height','195px');

						$('#collage9-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '195px').css('height','191px');
						$('#collage9-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '195px').css('height','191px');
						$('#collage9-8'+ countPhoto +' > img').attr('src', data.result.fileList[7].filename + "_700.png").css('width', '195px').css('height','191px');
						$('#collage9-9'+ countPhoto +' > img').attr('src', data.result.fileList[8].filename + "_700.png").css('width', '195px').css('height','191px');

					} catch (err) {}    
				} else {

					/* // 사진이 두장이라면
			              var str = photo[i][0].path;

			            try {
			               $("<img>").attr('src', str+"_300.png").css('width', 'auto').appendTo(textParent);
			            } catch (err) {}*/

				} //else


				submitcount=0;
				makeDropable($(imagesDiv2).children())
				makeDragable($(imagesDiv2).children())
				$($(imagesDiv2).children()).append($("<div class='control_box' id='control-box-div-"+countPhoto+"'>"
						+ "<ul class='clrfix' >"
						+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
						+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
						+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
						+ "</ul>"
						+ "</div>" 
						+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
				))
				deletephoto(countPhoto)
			}
	});
}

/*
function setFileUploadToInputTag() {
	$('.file1').fileupload({
		url: '/File/upload.json',        // 서버에 요청할 URL
		dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
		sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
		singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
		autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
		disableImageResize: /Android(?!.*Chrome)|Opera/
			.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
			previewMaxWidth: 700,   // 미리보기 이미지 너비
			previewMaxHeight: 560,  // 미리보기 이미지 높이 
			previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
			processalways: function(e, data) {
				console.log('fileuploadprocessalways()...');
				console.log($(this).val())
				console.log(data.files);
				var no = $(this).attr('class').split('_')[1].split(' ')[0]
				console.log(no)
				var imagesDiv = $("#text_parent_"+aaa+"");
				imagesDiv2=$("#text_parent_"+aaa+"");
				imagesDiv.html('');
				data.submit();
			}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
				console.log('submit()...');
				console.log("data-->", data)
				console.log(aaa)
			},
			done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
				console.log('done()...');
				console.log(data.result);
				countPhoto=aaa;
				var file = data.result.fileList[0];
				console.log(data)
				console.log(imagesDiv2)

				for(k=0;k<data.result.fileList.length;k++){
					onlyPath1.push(data.result.fileList[k].filename)
				}
				console.log(onlyPath1)
				console.log(data.result.fileList.length)
				if (data.result.fileList.length == 1) {
					$("<div class='whole_collage1' data-countPhoto="+countPhoto+">")
					.html("<div  class='one_photo_col' id='collage1-1" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "</div>"
					).appendTo(imagesDiv2)
					$('#collage1-1'+ countPhoto +'> img').attr('src',data.result.fileList[0].filename + "_700.png").css('width', '809px').css('height','606px');
				} else if (data.result.fileList.length == 2) {
					$("<div class='whole_collage2'>")
					.html("<div  class='two_photo_col' id='collage2-1-count" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "<div  class='two_photo_col' id='collage2-2-count" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "</div>"
					).appendTo(imagesDiv2)
					$('#collage2-1-count'+ countPhoto +'> img').attr('src',data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
					$('#collage2-2-count'+ countPhoto +'> img').attr('src',data.result.fileList[1].filename + "_700.png").css('width', '534px').css('height','534px');
				} else if (data.result.fileList.length == '3') {
					try {
						$("<div class='whole_collage3' data-countPhoto="+countPhoto+">")
						.html("<div class='collage3-big' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
								+ "<div class='collage3_2inner_collage'>"
								+ "<div class='inner_two_collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
								+ "<div class='inner_two_collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
								+ "</div></div>"
						).appendTo(imagesDiv2)
						$('#collage3-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
						$('#collage3-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '260px').css('height','265px');
						$('#collage3-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','265px');

					} catch (err) {}
				}else if (data.result.fileList.length == 4) {
					try {
						$("<div class='whole_collage4' data-countPhoto="+countPhoto+">")
						.html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
								+ "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
								+ "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
								+ " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
								+ "</div>"
						).appendTo(imagesDiv2)

						$('#collage4-1'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage4-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage4-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage4-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '397px').css('height','397px');
					} catch (err) {}    
				} else if (data.result.fileList.length == 5) {
					try {
						$("<div class='whole_collage5' data-countPhoto="+countPhoto+">")
						.html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
								+ "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
								+ "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

								+ "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
								+ "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
								+ "</div>"
						).appendTo(imagesDiv2) 
						$('#collage5-1'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '260px').css('height','260px');
						$('#collage5-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '259px').css('height','260px');
						$('#collage5-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','260px');

						$('#collage5-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage5-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '397px').css('height','397px');
					} catch (err) {}    
				} else if (data.result.fileList.length == 6) {
					try {
						$("<div class='whole_collage6' data-countPhoto="+countPhoto+">")
						.html("<div class='collage6-big' id='collage6-1-big" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div id='collage6-2side-collage'>"
								+"<div class='side_two_collage' id='collage6-2" +countPhoto +"'><img src=''></div>"
								+"<div class='side_two_collage' id='collage6-3" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2) 
						$('#collage6-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '534px').css('height','534px');
						$('#collage6-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '260px').css('height','265px');
						$('#collage6-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '260px').css('height','265px');

						$('#collage6-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '264px').css('height','260px');
						$('#collage6-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '264px').css('height','260px');
						$('#collage6-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '264px').css('height','260px');

					} catch (err) {}    
				} else if (data.result.fileList.length == 7) {
					try {
						$("<div class='whole_collage7' data-countPhoto="+countPhoto+">")
						.html("<div class='four_of_seven'>"
								+"<div class='right_four_of_seven' id='collage7-1-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven' id='collage7-2-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven' id='collage7-3-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven' id='collage7-4-small" +countPhoto +"'><img src=''></div>"
								+"</div>"


								+"<div  class='bottom_three_of_seven' id='collage7-5" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_seven' id='collage7-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_seven' id='collage7-7" +countPhoto +"'><img src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2)  
						$('#collage7-1-small'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '192px').css('height','193px');
						$('#collage7-2-small'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '192px').css('height','193px');
						$('#collage7-3-small'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '192px').css('height','193px');
						$('#collage7-4-small'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '192px').css('height','193px');

						$('#collage7-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage7-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage7-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '397px').css('height','397px');


					} catch (err) {}    
				} else if (data.result.fileList.length == 8) {
					try {
						$("<div class='whole_collage8' data-countPhoto="+countPhoto+">")
						.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
								+"<div  id='four_of_eight'>"
								+"<div class='right_four_of_eight' id='collage8-2" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-3" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-4" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-5" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_three_of_eight' id='collage8-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_eight' id='collage8-7" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_eight' id='collage8-8" +countPhoto +"'><img src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2)



						$('#collage8-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage8-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage8-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage8-4'+ countPhoto +' > img').attr('src',data.result.fileList[3].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage8-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '195px').css('height','195px');

						$('#collage8-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '262px').css('height','260px');
						$('#collage8-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '262px').css('height','260px');
						$('#collage8-8'+ countPhoto +' > img').attr('src', data.result.fileList[7].filename + "_700.png").css('width', '262px').css('height','260px');

					} catch (err) {}    
				} else if (data.result.fileList.length == 9) {

					try {
						$("<div class='whole_collage9' data-countPhoto="+countPhoto+">")
						.html("<div  id='collage9-1-big'><img id='img_4' src='ca.jpg'></div>"
								+"<div  class='four_of_nine'>"
								+"<div class='right_four_of_nine' id='collage9-2" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-3" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-4" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-5" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_four_of_nine' id='collage9-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-7" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-8" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-9" +countPhoto +"'><img src=''></div>"
								+"</div>"
						).appendTo(imagesDiv2)

						$('#collage9-1-big'+ countPhoto +' > img').attr('src', data.result.fileList[0].filename + "_700.png").css('width', '397px').css('height','397px');
						$('#collage9-2'+ countPhoto +' > img').attr('src', data.result.fileList[1].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage9-3'+ countPhoto +' > img').attr('src', data.result.fileList[2].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage9-4'+ countPhoto +' > img').attr('src', data.result.fileList[3].filename + "_700.png").css('width', '195px').css('height','195px');
						$('#collage9-5'+ countPhoto +' > img').attr('src', data.result.fileList[4].filename + "_700.png").css('width', '195px').css('height','195px');

						$('#collage9-6'+ countPhoto +' > img').attr('src', data.result.fileList[5].filename + "_700.png").css('width', '195px').css('height','191px');
						$('#collage9-7'+ countPhoto +' > img').attr('src', data.result.fileList[6].filename + "_700.png").css('width', '195px').css('height','191px');
						$('#collage9-8'+ countPhoto +' > img').attr('src', data.result.fileList[7].filename + "_700.png").css('width', '195px').css('height','191px');
						$('#collage9-9'+ countPhoto +' > img').attr('src', data.result.fileList[8].filename + "_700.png").css('width', '195px').css('height','191px');

					} catch (err) {}    
				} else {

				} //else

				adddiv()
				$(imagesDiv2).children().append($("<div class='control_box' id='control-box-div-"+countPhoto+"'>"
						+ "<ul class='clrfix'>"
						+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"

						+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
						+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
						+ "</ul>"
						+ "</div>"
				))

				console.log($(imagesDiv2).attr('data-countPhoto'))
				$(imagesDiv2).parent().attr('onclick','showControlBox('+$(imagesDiv2).attr('data-countPhoto')+')')
				makeDragable(imagesDiv2)
				makeDropable(imagesDiv2)
				deletephoto(countPhoto)
			}
	});
}*/
/*미리보기 파일업로드 끝*/

/*back file 업로드 시작*/
var change=0;

$('#write_save_btn').click(function() {
	/*console.log("저장버튼 눌렀다")
		console.log(ficont.val());
		if(fititle.val() == null){
			alert("제목을 입력해주세요")
		}else if(fisdt.val()== null||fiedt.val()==null){
			alert("날짜를 입력해 주세요")
		}else{
			console.log(content);
			picnosearch()
		}*/
	emptyParentRemove()
});
$('#title_fileupload').fileupload({
	url: '/post/add.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: false,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: true, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: false,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 1920,   // 미리보기 이미지 너비
		previewMaxHeight: 800,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {
			savecount=1;
			console.log('fileuploadprocessalways()...');
			for (var i = 0; i < data.files.length; i++) {
				try {
					if (data.files[i].preview.toDataURL) {
						var a = data.files[i].preview.toDataURL()

						var img = new Image();
						img.src = a;
						$(".blank-one").css("background-image", "url('" + img.src + "')");
					}
				} catch (err) {}
			} 
			$(".innerClick").on('click', function () {
				data.submit();
			});

		}, submit: function (e, data){ // 서버에 전송하기 직전에 호출된다.
			if(change==0){
				console.log('submit()...');
				$('.text_write_box').each(function () {
					console.log($(this).val())
					content.push($(this).parent().attr('id').split('_')[2])
					var mystring = decodeURIComponent($(this).val())
					var mystring2 = 'a,b,ccc'
					mystring2.replace(/,/g , "newchar");
					console.log(mystring2)
					content.push(mystring)
					console.log($(this).parent().attr('id').split('_')[2])
					console.log(data.files[0])
				})
				console.log(content)

				$('.capt_output').each(function () {
					console.log($(this).attr('id').split('-')[2],$(this).text())
					captionArray.push($(this).attr('id').split('-')[2])
					captionArray.push($(this).text())
				})

				$('.travel_detail_date').each(function () {
					var textParentDiv= $('.text_parent',$(this).parents('.day1'))
					if($(this).val() != "" && $('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
						detailDateArr.push(textParentDiv.attr('id').split('_')[2])
						detailDateArr.push($(this).val())
					}
				})

				$('.gpsInfo').each(function () {
					var textParentDiv= $('.text_parent',$(this).parents('.day1'))
					if($(this).val() != "" && $('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
						detailLocArr.push(textParentDiv.attr('id').split('_')[2])
						detailLocArr.push($(this).val())
					}
				})
				$('.map').each(function () {
					var textParentDiv= $('.text_parent',$(this).parents('.day1'))
					if($('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
						mapArr.push(textParentDiv.attr('id').split('_')[2])
						mapArr.push($(this).attr('data-lati'))
						mapArr.push($(this).attr('data-longit'))
						console.log($(this).attr('data-longit'))
						console.log($(this).attr('data-lati'))
					}
				})
				console.log(captionArray)
				console.log(mapArr)
				data.formData = {
					title : decodeURIComponent(fititle.val()),
					sdt: fisdt.val(),
					edt: fiedt.val(),
					mno: mno,
					content: content,
					caption: captionArray,
					travelDate: detailDateArr,
					location: detailLocArr,
					map: mapArr
				}
				/*change=1;*/
			};
		},
		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('writedone()...');
			/*console.log(data);*/
		}
});

var mystring2 = 'a,b,ccc'
	mystring2.replace(/,/g, 'hh');
	console.log(mystring2)

function emptyParentRemove(){
	for (var i = 0; i < $('.text_parent').size() ; i++) {
		if($(this).children().eq(0).attr('class')=='tool_box'){
			$(this).children().eq(0).remove()
			if($(this).children()==null){
				$(this).remove()
			}
		}

	}
	resortParentId()
}

function resortParentId(){
	var resortParentCount=0;
	$('.text_parent').each(function(){
		$(this).attr('id',"text_parent_"+resortParentCount+"")
		$(this).siblings('.write_day').attr('data-srtno',resortParentCount)
		resortParentCount++
	})
	picnosearch()
}


function picnosearch(){
	console.log("onlypath다")
	console.log(onlyPath1)
	for(i=0;i<onlyPath1.length;i++){
		$.ajaxSettings.traditional = true;
		$.post('/picture/searchthispicture.json', {
			'path': onlyPath1[i]
		}, function(result) {
			var pictureparentno;
			console.log(result.pictureList)
			console.log(result.pictureList.length)
			jsPictureList.push(result.pictureList)
			console.log(jsPictureList)
		}, 'json')
	}
	setTimeout("finaladd()",4000);
	setTimeout(console.log(jsPictureList),1000)
}

function finaladd(data){
	console.log(data)
	$('.text_parent').each(function () {
		console.log(this)
		console.log($('.text_parent').children().eq(1).attr('class'))

		if($('.text_parent').children().eq(1).attr('class') ==='tool_box'){
			$('.text_parent').children().eq(1).remove()
		}
		console.log($('.text_parent').children().eq(1).attr('class'))
		console.log($(this).children())

		if($(this).children().eq(0).attr('class') != undefined) {

			if($(this).children().eq(0).attr('class').split('_')[0]=='whole'){
				pictureparentno=$(this).attr('id').split('_')[2]
				console.log("여기 들어옴")
				var photoquantity =$(this).children().attr('class').split('_')[1].charAt(7) 
				console.log(photoquantity)
				switch(photoquantity){

				case '1':compareDbsrcParentsrc(this); break;
				case '2':compareDbsrcParentsrc(this); break;
				case '3':compareDbsrcParentsrc(this); break;
				case '4':compareDbsrcParentsrc(this); break;
				case '5':compareDbsrcParentsrc(this); break;
				case '6':compareDbsrcParentsrc(this); break;
				case '7':compareDbsrcParentsrc(this); break;
				case '8':compareDbsrcParentsrc(this); break;
				case '9': compareDbsrcParentsrc(this); break;
				}
				function compareDbsrcParentsrc(casethis){
					for(z=0; z < jsPictureList.length ;z++){
						for(g=0; g<jsPictureList[z].length;g++){
							for(j=0 ;j<photoquantity;j++){
								console.log($('img',casethis).eq(j).attr('src').substring(0,$('img',casethis).eq(j).attr('src').lastIndexOf('_')))
								if(jsPictureList[z][g].path==$('img',casethis).eq(j).attr('src').substring(0,$('img',casethis).eq(j).attr('src').lastIndexOf('_'))){
									picnoparentno.push(pictureparentno)
									picnoparentno.push(jsPictureList[z][g].picno)
								}
							}
						}
					};
					console.log(picnoparentno);
				}
			} 
		}

		console.log(picnoparentno)
	})

	addAllphoto()

}

function addAllphoto(data){

	$.ajaxSettings.traditional = true;
	$.post('/detail/addAllphoto.json', {
		'picnoandparentno': picnoparentno
	}, function(result) {
		console.log(result);
	}, 'json')
	if(savecount!=1){
		setTimeout("noBackgroundSave()",2000)
	}else{
		setTimeout($('.innerClick').click(),3000);
		console.log('innerclick')
	}
}




console.log(captionArray)

function noBackgroundSave(){
	$('.capt_output').each(function () {
		console.log($(this).attr('id').split('-')[2],$(this).text())
		captionArray.push($(this).attr('id').split('-')[2])
		captionArray.push($(this).text())
	})

	$('.travel_detail_date').each(function () {
		var textParentDiv= $('.text_parent',$(this).parents('.day1'))
		if($(this).val() != "" && $('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
			detailDateArr.push(textParentDiv.attr('id').split('_')[2])
			detailDateArr.push($(this).val())
		}
	})

	$('.gpsInfo').each(function () {
		var textParentDiv= $('.text_parent',$(this).parents('.day1'))
		if($(this).val() != "" && $('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
			detailLocArr.push(textParentDiv.attr('id').split('_')[2])
			detailLocArr.push($(this).val())
		}
	})
	$('.map').each(function () {
		var textParentDiv= $('.text_parent',$(this).parents('.day1'))
		if($(this).val() != "" && $('.text_parent', $('img', $('.text_parent',$(this).parents('.day1')))) != undefined){
			mapArr.push(textParentDiv.attr('id').split('_')[2])
			mapArr.push($(this).attr('data-lati'))
			mapArr.push($(this).attr('data-longit'))

		}
	})

	jQuery.ajaxSettings.traditional = true;
	$.post('/post/add.json', {
		title : decodeURIComponent(fititle.val()),
		sdt: fisdt.val(),
		edt: fiedt.val(),
		mno: mno,
		caption: captionArray,
		travelDate: detailDateArr,
		map:mapArr,
		content: content,
		location: detailLocArr
	}, function(result) {
		console.log(result.data)
	}, 'json')
}

/* 민섭 파일 전체 올리기*/

$('#fileAllUpload').fileupload({
	url: '/File/upload3.json',        // 서버에 요청할 URL
	dataType: 'json',         // 서버가 보낸 응답이 JSON임을 지정하기
	sequentialUploads: true,  // 여러 개의 파일을 업로드 할 때 순서대로 요청하기.
	singleFileUploads: false, // 한 요청에 여러 개의 파일을 전송시키기.
	autoUpload: true,        // 파일을 추가할 때 자동 업로딩 하지 않도록 설정.
	disableImageResize: /Android(?!.*Chrome)|Opera/
		.test(window.navigator && navigator.userAgent), // 안드로이드와 오페라 브라우저는 크기 조정 비활성 시키기
		previewMaxWidth: 700,   // 미리보기 이미지 너비
		previewMaxHeight: 560,  // 미리보기 이미지 높이 
		previewCrop: true,      // 미리보기 이미지를 출력할 때 원본에서 지정된 크기로 자르기
		processalways: function(e, data) {
			console.log('fileuploadprocessalways()...', data.loaded, data.total);
			console.log($(this).val())
			console.log(data.files);
			/*console.log(no)*/

			var progress = parseInt(data.loaded / data.total * 100, 10);
			$('#progress .bar').css(
					'width',
					progress + '%'
			);

		}, 


		done: function (e, data) { // 서버에서 응답이 오면 호출된다. 각 파일 별로 호출된다.
			console.log('done()...');
			console.log(data._response);
			console.log(data._response.result[0].path)
			var file = data.result.fileList;
			$.each(data.result.fileList, function(index, file) {
				$('<p/>').text(file.filename + " : " + file.filesize).appendTo(document.body);
			});
			console.log(data.result.length);
			var imagesDiv = $("#text_parent_"+aaa+"").empty();
			imagesDiv.html("");
			plus(data);
			onlyPath(data);
			var countPhoto = aaa;
			console.log("photo길이 =======>")
			console.log(photo.length)
			for(var i = 0; i < photo.length; i++){


				var textParent= $("#text_parent_"+countPhoto+"")
				if (photo[i].length == 1) {
					$("<div class='whole_collage1' data-countPhoto="+countPhoto+">")
					.html("<div  class='one_photo_col' id='collage1-1" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "</div>"
							+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
							+ "<ul class='clrfix' >"
							+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
							+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
							+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
							+ "</ul>"
							+ "</div>"
							+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
					).appendTo(textParent)
					$('#collage1-1'+ countPhoto +'> img').attr('src',photo[i][0].path + "_600.png").css('width', '809px').css('height','606px');
					$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
					if(photo[i][0].lati != null && photo[i][0].longit != null) {
						var lat = photo[i][0].lati
						var long = photo[i][0].longit
						googleapisView(lat, long, countPhoto)
					}
					$('.tool_box').remove()
					deletephoto(countPhoto)


				} else if (photo[i].length == 2) {
					$("<div class='whole_collage2' data-countPhoto="+countPhoto+" id='TP-collage-" +countPhoto +"'>")
					.html("<div  class='two_photo_col 2-collage' id='collage2-1-count-" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "<div  class='two_photo_col 2-collage ' id='collage2-2-count-" +countPhoto +"'><img id='img_4' src=''></div>"
							+ "</div>"
							+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
							+ "<ul class='clrfix' >"
							+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
							+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
							+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
							+ "</ul>"
							+ "</div>"
							+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"

					).appendTo(textParent)
					$('#collage2-1-count-'+ countPhoto +'> img').attr('src', photo[i][0].path + "_600.png").css('width', '534px').css('height','534px');
					$('#collage2-2-count-'+ countPhoto +'> img').attr('src', photo[i][1].path + "_600.png").css('height','534px').css('height','534px');
					$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)

					if(photo[i][0].lati != null && photo[i][0].longit != null) {
						var lat = photo[i][0].lati
						var long = photo[i][0].longit
						googleapisView(lat, long, countPhoto)
					}

					$('.tool_box').remove()
					deletephoto(countPhoto)
//					popCaptionModal(countPhoto)
//					saveBtn(countPhoto)
//					modalOpen()

				} else if (photo[i].length == 3) {

//					var str = ".." + data._response.result[i].path;
//					var dataSource = data._response.result[i].path

					try {
						$("<div class='whole_collage3' data-countPhoto="+countPhoto+">")
						.html("<div class='collage3-big 3-collage' id='collage3-1-big"+countPhoto+"'><img src=''></div>"
								+ "<div class='collage3_2inner_collage'>"
								+ "<div class='inner_two_collage 3-collage' id='collage3-2"+countPhoto+"'><img src=''></div>"
								+ "<div class='inner_two_collage 3-collage' id='collage3-3"+countPhoto+"'><img src=''></div>"
								+ "</div></div>"

								+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
								+ "<ul class='clrfix'>"
								+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"
								+ "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
								+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
								+ "</ul>"
								+ "</div>"
								+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
						).appendTo(textParent)
						$('#collage3-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_600.png").css('width', '534px').css('height','534px');
						$('#collage3-2'+ countPhoto +' > img').attr('src', photo[i][1].path +"_300.png").css('width', '260px').css('height','265px');
						$('#collage3-3'+ countPhoto +' > img').attr('src', photo[i][2].path +"_300.png").css('width', '260px').css('height','265px');

						$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
						if(photo[i][0].lati != null && photo[i][0].longit != null) {
							var lat = photo[i][0].lati
							var long = photo[i][0].longit
							googleapisView(lat, long, countPhoto)
						}
						$('.tool_box').remove()
						deletephoto(countPhoto)

					} catch (err) {}
				}else if (photo[i].length == 4) {

					try {
						$("<div class='whole_collage4' data-countPhoto="+countPhoto+">")
						.html("<div class='four_photo_collage' id='collage4-1" +countPhoto +"'><img src=''></div>"
								+ "<div class='four_photo_collage' id='collage4-2" +countPhoto +"'><img src=''></div>"
								+ "<div class='four_photo_collage' id='collage4-3" +countPhoto +"'><img src=''></div>"
								+ " <div class='four_photo_collage' id='collage4-4" +countPhoto +"'><img src=''></div>"
								+ "</div>"

								+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
								+ "<ul class='clrfix'>"
								+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"

								+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhoto+"' data-capno='"+countPhoto+"'>캡션</button></li>"
								+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
								+ "</ul>"
								+ "</div>"
								+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
						).appendTo(textParent)

						$('#collage4-1'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage4-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage4-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage4-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '397px').css('height','397px');
						$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)

						if(photo[i][0].lati != null && photo[i][0].longit != null) {
							var lat = photo[i][0].lati
							var long = photo[i][0].longit
							googleapisView(lat, long, countPhoto)
						}

						$('.tool_box').remove()
						deletephoto(countPhoto)
					} catch (err) {} 	
				} else if (photo[i].length == 5) {

					try {
						$("<div class='whole_collage5' data-countPhoto="+countPhoto+">")
						.html("<div  class='top_three_collage' id='collage5-1" +countPhoto +"'><img src=''></div>"
								+ "<div  class='top_three_collage' id='collage5-2" +countPhoto +"'><img src=''></div>"
								+ "<div  class='top_three_collage' id='collage5-3" +countPhoto +"'><img src=''></div>"

								+ "<div  class='bottom_two_collage' id='collage5-4" +countPhoto +"'><img src=''></div>"
								+ "<div  class='bottom_two_collage' id='collage5-5" +countPhoto +"'><img src=''></div>"
								+ "</div>"

								+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
								+ "<ul class='clrfix'>"
								+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"

								+ "<li><button type='button' class='btn_caption'>캡션</button></li>"
								+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
								+ "</ul>"
								+ "</div>"
								+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"

						).appendTo(textParent) 
						$('#collage5-1'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '260px').css('height','260px');
						$('#collage5-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '259px').css('height','260px');
						$('#collage5-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','260px');

						$('#collage5-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage5-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '397px').css('height','397px');
						$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)

						if(photo[i][0].lati != null && photo[i][0].longit != null) {
							var lat = photo[i][0].lati
							var long = photo[i][0].longit
							googleapisView(lat, long, countPhoto)
						}

						$('.tool_box').remove()
						deletephoto(countPhoto)
					} catch (err) {} 	
				} else if (photo[i].length == 6) {

					try {
						$("<div class='whole_collage6' data-countPhoto="+countPhoto+">")
						.html("<div class='collage6-big' id='collage6-1-big" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div id='collage6-2side-collage'>"
								+"<div class='side_two_collage' id='collage6-2" +countPhoto +"'><img src=''></div>"
								+"<div class='side_two_collage' id='collage6-3" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_three_collage' id='collage6-4" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div  class='bottom_three_collage' id='collage6-5" +countPhoto +"'><img id='img_4' src=''></div>"
								+"<div  class='bottom_three_collage' id='collage6-6" +countPhoto +"'><img id='img_4' src=''></div>"
								+"</div>"

								+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
								+ "<ul class='clrfix'>"
								+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"

								+ "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
								+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
								+ "</ul>"
								+ "</div>"
								+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
						).appendTo(textParent)

						$('#collage6-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_600.png").css('width', '534px').css('height','534px');
						$('#collage6-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '260px').css('height','265px');
						$('#collage6-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '260px').css('height','265px');

						$('#collage6-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '264px').css('height','260px');
						$('#collage6-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '264px').css('height','260px');
						$('#collage6-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '264px').css('height','260px');
						$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)

						if(photo[i][0].lati != null && photo[i][0].longit != null) {
							var lat = photo[i][0].lati
							var long = photo[i][0].longit
							googleapisView(lat, long, countPhoto)
						}

						$('.tool_box').remove()
						deletephoto(countPhoto)

					} catch (err) {} 	
				} else if (photo[i].length == 7) {
					try {
						$("<div class='whole_collage7' data-countPhoto="+countPhoto+">")
						.html("<div class='four_of_seven'>"
								+"<div class='right_four_of_seven 7-collage' id='collage7-1-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven 7-collage' id='collage7-2-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven 7-collage' id='collage7-3-small" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_seven 7-collage' id='collage7-4-small" +countPhoto +"'><img src=''></div>"
								+"</div>"


								+"<div  class='bottom_three_of_seven 7-collage' id='collage7-5" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_seven 7-collage' id='collage7-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_seven 7-collage' id='collage7-7" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
								+ "<ul class='clrfix'>"
								+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"

								+ "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
								+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
								+ "</ul>"
								+ "</div>"
								+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
						).appendTo(textParent)  
						$('#collage7-1-small'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '192px').css('height','193px');
						$('#collage7-2-small'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '192px').css('height','193px');
						$('#collage7-3-small'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '192px').css('height','193px');
						$('#collage7-4-small'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '192px').css('height','193px');

						$('#collage7-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage7-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage7-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '397px').css('height','397px');
						$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)
						if(photo[i][0].lati != null && photo[i][0].longit != null) {
							var lat = photo[i][0].lati
							var long = photo[i][0].longit
							googleapisView(lat, long, countPhoto)
						}
						$('.tool_box').remove()
						deletephoto(countPhoto)
					} catch (err) {} 	
				} else if (photo[i].length == 8) {

					try {
						$("<div class='whole_collage8' data-countPhoto="+countPhoto+">")
						.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
								+"<div  id='four_of_eight'>"
								+"<div class='right_four_of_eight' id='collage8-2" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-3" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-4" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_eight' id='collage8-5" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_three_of_eight' id='collage8-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_eight' id='collage8-7" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_three_of_eight' id='collage8-8" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
								+ "<ul class='clrfix'>"
								+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"

								+ "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
								+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
								+ "</ul>"
								+ "</div>"
								+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"
						).appendTo(textParent)



						$('#collage8-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage8-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '195px').css('height','195px');
						$('#collage8-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '195px').css('height','195px');
						$('#collage8-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '195px').css('height','195px');
						$('#collage8-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '195px').css('height','195px');

						$('#collage8-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '262px').css('height','260px');
						$('#collage8-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '262px').css('height','260px');
						$('#collage8-8'+ countPhoto +' > img').attr('src', photo[i][7].path+"_300.png").css('width', '262px').css('height','260px');
						$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)

						if(photo[i][0].lati != null && photo[i][0].longit != null) {
							var lat = photo[i][0].lati
							var long = photo[i][0].longit
							googleapisView(lat, long, countPhoto)
						}
						$('.tool_box').remove()
						deletephoto(countPhoto)

					} catch (err) {} 	
				} else if (photo[i].length == 9) {
					try {
						$("<div class='whole_collage9' data-countPhoto="+countPhoto+">")
						.html("<div class='one_of_nine' id='collage9-1-big"+countPhoto+"'><img id='img_4' src=''></div>"
								+"<div  class='four_of_nine'>"
								+"<div class='right_four_of_nine' id='collage9-2" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-3" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-4" +countPhoto +"'><img src=''></div>"
								+"<div class='right_four_of_nine' id='collage9-5" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+"<div  class='bottom_four_of_nine' id='collage9-6" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-7" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-8" +countPhoto +"'><img src=''></div>"
								+"<div  class='bottom_four_of_nine' id='collage9-9" +countPhoto +"'><img src=''></div>"
								+"</div>"

								+ "<div class='control_box' id='control-box-div-"+countPhoto+"'>"
								+ "<ul class='clrfix'>"
								+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhoto+"' data-addno='"+countPhoto+"'>추가</button></li>"

								+ "<li><button type='button' class='btn_caption' data-capno='"+countPhoto+"'>캡션</button></li>"
								+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhoto+"'>삭제</button></li>"
								+ "</ul>"
								+ "</div>"
								+ "<div class='capt_output' id='txt-output-"+countPhoto+"'>안녕하세요</div>"

						).appendTo(textParent)

						$('#collage9-1-big'+ countPhoto +' > img').attr('src', photo[i][0].path+"_300.png").css('width', '397px').css('height','397px');
						$('#collage9-2'+ countPhoto +' > img').attr('src', photo[i][1].path+"_300.png").css('width', '195px').css('height','195px');
						$('#collage9-3'+ countPhoto +' > img').attr('src', photo[i][2].path+"_300.png").css('width', '195px').css('height','195px');
						$('#collage9-4'+ countPhoto +' > img').attr('src', photo[i][3].path+"_300.png").css('width', '195px').css('height','195px');
						$('#collage9-5'+ countPhoto +' > img').attr('src', photo[i][4].path+"_300.png").css('width', '195px').css('height','195px');

						$('#collage9-6'+ countPhoto +' > img').attr('src', photo[i][5].path+"_300.png").css('width', '195px').css('height','191px');
						$('#collage9-7'+ countPhoto +' > img').attr('src', photo[i][6].path+"_300.png").css('width', '195px').css('height','191px');
						$('#collage9-8'+ countPhoto +' > img').attr('src', photo[i][7].path+"_300.png").css('width', '195px').css('height','191px');
						$('#collage9-9'+ countPhoto +' > img').attr('src', photo[i][8].path+"_300.png").css('width', '195px').css('height','191px');
						$('#detail-date-div-'+ countPhoto).attr("value", photo[i][0].time)

						if(photo[i][0].lati != null && photo[i][0].longit != null) {
							var lat = photo[i][0].lati
							var long = photo[i][0].longit
							googleapisView(lat, long, countPhoto)
						}
						$('.tool_box').remove()
						deletephoto(countPhoto)
					} catch (err) {} 	
				} else {

					var str = photo[i][0].path;

					try {
						$("<img>").attr('src', str+"_300.png").css('width', 'auto').appendTo(textParent);
					} catch (err) {}

				} //else
				countPhoto++
				adddiv()

				makeDropable($(textParent).children())
				makeDragable($(textParent).children())
			} // 사진 for문
		} //done
});

function showControlBox(count) {
	$(document).ready(function() {
		if($('#control-box-div-'+count).css("display") == "block") {
			$('#control-box-div-'+count).css('display', 'none');
		} else {
			$('#control-box-div-'+count).css('display', 'block');
		}
		console.log("누름")
	})
	return false;
}

$(document.body).on('click','.btn_caption', function() {
	thisPP = $(this)
	$('.caption_modal').css('display', 'block')
})

$(document.body).on('click','.btn_add', function() {
	var divThis = $(this).attr('data-addno')
	findNeedUpdateNo(divThis)
	addbtn_adddiv(divThis)

})


function findNeedUpdateNo(beforePlus) {
	var nextPlusSpot = parseInt(beforePlus) + 1
	var textParentDiv;
	console.log($('.text_parent').size())
	console.log(nextPlusSpot)
	for (var i = $('.text_parent').size()-1 ; i >= nextPlusSpot ; i--) {
//		textParentDiv = $('#text_parent_'+ i).children()
//		var test = $('img' ,textParentDiv).parent().attr('id');
//		var testSplit = test.split('-')

		$('.btn_add','#text_parent_'+ i).attr('data-addno', i+1)
		$('.btn_add','#text_parent_'+ i).attr('id', 'addbtn-' + (i+1))

		$('#text_parent_'+ i).attr('onclick', 'showControlBox('+ (i+1) +')')
		$('#text_parent_'+ i).children().eq(0).attr('data-countPhoto', i+1)

		$('.btn_caption','#text_parent_'+ i).attr('data-capno', i+1)
		$('.btn_caption','#text_parent_'+ i).attr('id', 'edtbtn-' + (i+1))		
		$('.btn_del','#text_parent_'+ i).attr('id', 'delbtn-' + (i+1))

		$('#text_parent_'+i).siblings('.write_day').attr('data-srtno', i+1)




		if($('.control_box','#text_parent_'+ i).attr('id') != undefined) {
			$('.control_box','#text_parent_'+ i).attr('id','control-box-div-' + (i+1))
		}
		$('.capt_output', '#text_parent_'+ i).attr('id', 'txt-output-'+(i+1))

		if($('.file_browse', '#text_parent_'+ i).attr('class') != undefined) {
			$('.file_browse', '#text_parent_'+ i).attr('href','javascript:file_browse('+ (i+1) +')')
		}

		if($('.create_box', '#text_parent_'+ i).attr('class') != undefined) {
			$('.create_box','#text_parent_'+ i).attr('onclick', 'createtextbox('+ (i+1) +')')
		}
		console.log(i)
		console.log($('#text_parent_'+ i))
		$('#text_parent_'+ i).attr('data-textparent', (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) + 1))
		$('#text_parent_'+ i).attr('id', 'text_parent_' + (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) + 1))
	}
}

$(document.body).on('click','#capt-save', function() {
	console.log(thisPP.attr('data-capno'))

	console.log("되라좀aa")
	event.stopPropagation()
	let capTxt = $('#cap-txt').val()
	console.log($('.capt_output' ,'div[data-textparent='+ thisPP.attr('data-capno') +']'))
	$('.capt_output' ,'div[data-textparent='+ thisPP.attr('data-capno') +']').text(capTxt);
	console.log(capTxt)

	captionArray.push()

})
captionArray=[]
$(document).ready(function () {

	$('#capt-cancel').click(function() {
		$('.caption_modal').css('display', 'none')
		$('#control-box-div-'+count).css('display', 'none');
		$('#cap-txt').val('');
		console.log("닫히냐")
	})

})


var deleteTextParent = [];
var deletePhoto = [];

function deletephoto(countPhoto) {
	$('#delbtn-'+countPhoto).click(function() {
		deleteTextParent = $(this).parents('.text_parent')
		console.log($(this).parents('.text_parent'))
		var deleteTextParentChild =deleteTextParent.children();


		for (var i = 0;i < $('img',deleteTextParentChild).length; i++) {
			console.log("ㅇㅇ")
			console.log($('img',deleteTextParentChild).eq(i).attr('src').slice(0, -8))
			console.log("경로 자르기")
			var cut = [];
			deletePhoto.push($('img',deleteTextParentChild).eq(i).attr('src').slice(0, -8))

		} //for 

		// 태그 번호 끝 자리부터 감소
		var presentSpot = $(this).parents('.text_parent').attr('id').split('_')[2]
		console.log(presentSpot)
		for (var i = $('.text_parent').size()-1 ; i > presentSpot  ; i--) {
			$('.btn_add','#text_parent_'+ i).attr('data-addno', i-1)
			$('.btn_add','#text_parent_'+ i).attr('id', 'addbtn-' + (i-1))

			$('.btn_caption','#text_parent_'+ i).attr('data-capno', i-1)
			$('.btn_caption','#text_parent_'+ i).attr('id', 'edtbtn-' + (i-1))		
			$('.btn_del','#text_parent_'+ i).attr('id', 'delbtn-' + (i-1))

			console.log('확인하세요')
			if($('.control_box','#text_parent_'+ i).attr('id') != undefined) {
				$('.control_box','#text_parent_'+ i).attr('id','control-box-div-' + (i-1))
			}
			$('.capt_output', '#text_parent_'+ i).attr('id', 'txt-output-'+(i-1))

			if($('.file_browse', '#text_parent_'+ i).attr('class') != undefined) {
				$('.file_browse', '#text_parent_'+ i).attr('href','javascript:file_browse('+ (i-1) +')')
			}

			if($('.create_box', '#text_parent_'+ i).attr('class') != undefined) {
				$('.create_box','#text_parent_'+ i).attr('onclick', 'createtextbox('+ (i-1) +')')
			}

			console.log($('#text_parent_'+ i).attr('onclick','showControlBox('+ (i-1) +')'))
			$('#text_parent_'+ i).attr('data-textparent', (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) - 1))
			$('#text_parent_'+ i).attr('id', 'text_parent_' + (parseInt($('#text_parent_'+ i).attr('id').split('_')[2]) - 1))

		}


		console.log(countPhoto)
		delPhotoTransm()
		event.stopPropagation()
		console.log(deletePhoto)
		console.log($(this).parents('.text_parent').parent())
		$(this).parents('.text_parent').parent().remove()
	})
}

var photo = [];
var dataa=[]



function delPhotoTransm() {
	$.ajaxSettings.traditional = true;
	$.post('/picture/delete.json', {
		'deletePhoto' : deletePhoto 
	}, function(result) {
		console.log(result);
		deletePhoto.splice(0,deletePhoto.length); 
	}, 'json')
}

function plus(dataa){

	//사진 sortNo 중복값 제거하고 배열에 담기
	var sortNo = []
	for(j = 0; j < dataa.result.length; j++) {
		sortNo[j] = dataa.result[j].sortno;
		var classify = sortNo.filter(function(itm,k,sortNo) {
			return k==sortNo.indexOf(itm);
		})
	}
	//사진 sortNo 중복값 제거하고 배열에 담기 끝

	var photoData = []
	var countaa=0
	console.log("==============>")


	for(var i = 0; i< dataa.result.length; i++) {
		var sortno = dataa.result[i].sortno
		if (photo[sortno] == undefined) {
			photo[sortno] = []
		}
		photo[sortno].push(dataa.result[i])

	}
	console.log("함수안에서 photo 출력=====>")
	console.log(photo)
	return photo

}

function onlyPath(dataa){

	//사진 sortNo 중복값 제거하고 배열에 담기
	var sortNo = []
	for(j = 0; j < dataa.result.length; j++) {
		sortNo[j] = dataa.result[j].sortno;
		var classify = sortNo.filter(function(itm,k,sortNo) {
			return k==sortNo.indexOf(itm);
		})
	}
	//사진 sortNo 중복값 제거하고 배열에 담기 끝

	var photoData = []
	var countaa=0
	console.log("==============>")


	for(var i = 0; i< dataa.result.length; i++) {
		var sortno = dataa.result[i].sortno
		if (photo[sortno] == undefined) {
			photo[sortno] = []
		}
		photo[sortno].push(dataa.result[i].path)

	}
	console.log("함수안에서 photo 출력=====>")
	console.log(photo)
	return photo

}

function filePath(dataSource, no) {
	var str = ".." + data._response.result[no].path
	return str;	
}



function googleapisView(lat, lon, countPhoto) {
	var lat = lat; // 위도
	var lng = lon; // 경도

	var geocode = "http://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng+"&sensor=false";
	jQuery.ajax({
		url: geocode,
		type: 'POST',
		success: function(myJSONResult){
			if(myJSONResult.status == 'OK') {
				var tag = "";
				var i;
				var koreanCheck = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/
					//				var englishCheck = /^[0-9]/ 
					var englishCheck = /[a-zA-Z]/
						var gpsinfo = myJSONResult.results[1].formatted_address
						var nationName = gpsinfo.split(' ')[0]
				var cityName = gpsinfo.split(' ')[1]


				if(koreanCheck.test(nationName) == false) {
					console.log("야")
					cityName = gpsinfo.split(' ')[gpsinfo.split(' ').length-2]

					if(koreanCheck.test(cityName) == false) {
						for (var cn = 0; cn < gpsinfo.split(' ').length-1 ; cn++) {
							cityName = gpsinfo.split(' ')[cn]
							if(koreanCheck.test(cityName) == true) {
								console.log("도시이름 한글체크")
								cityName = gpsinfo.split(' ')[cn]
								console.log(cityName)
								break;
							} else if(englishCheck.test(cityName) == true) {
								console.log("도시이름 영어체크")
								cityName = gpsinfo.split(' ')[cn]
								console.log(cityName)
								break;
							}
						}
					}
					nationName =gpsinfo.split(' ')[gpsinfo.split(' ').length-1]

				} else {
					if (nationName == "대한민국") {
						nationName= "한국"	
					} else {
						nationName = gpsinfo.split(' ')[0]
						cityName = gpsinfo.split(' ')[1]
					} 	
				}
				console.log(gpsinfo.split(' '))
				$("#location-info-"+countPhoto).attr("value", nationName + " " + cityName)

			} else if(myJSONResult.status == 'ZERO_RESULTS') {
				alert("지오코딩이 성공했지만 반환된 결과가 없음을 나타냅니다.\n\n이는 지오코딩이 존재하지 않는 address 또는 원격 지역의 latlng을 전달받는 경우 발생할 수 있습니다.")
			} else if(myJSONResult.status == 'OVER_QUERY_LIMIT') {
				alert("할당량이 초과되었습니다.");
			} else if(myJSONResult.status == 'REQUEST_DENIED') {
				alert("요청이 거부되었습니다.\n\n대부분의 경우 sensor 매개변수가 없기 때문입니다.");
			} else if(myJSONResult.status == 'INVALID_REQUEST') {
				alert("일반적으로 쿼리(address 또는 latlng)가 누락되었음을 나타냅니다.");
			}
		}
	});

}


var onlyPath1=[]
function onlyPath(dataa){

	//사진 sortNo 중복값 제거하고 배열에 담기
	var sortNo = []
	for(j = 0; j < dataa.result.length; j++) {
		sortNo[j] = dataa.result[j].sortno;
		var classify = sortNo.filter(function(itm,k,sortNo) {
			return k==sortNo.indexOf(itm);
		})
	}
	//사진 sortNo 중복값 제거하고 배열에 담기 끝

	var photoData = []
	var countaa=0
	console.log("==============>")


	for(var i = 0; i< dataa.result.length; i++) {
		var sortno = dataa.result[i].sortno
		if (onlyPath1[sortno] == undefined) {
			onlyPath1[sortno] = []
		}
		onlyPath1[sortno].push(dataa.result[i].path)

	}
	console.log("함수안에서 photo 출력=====>")
	console.log(onlyPath1)
	return onlyPath1

}

/*back file up 끝*/




/*드래그 드롭 시작*/
function makeDragable($thisclass){
	console.log('makedraggable')
	for(i=0; i< $("img",$thisclass).length;i++){
		console.log($("img",$thisclass).parent())
		$(function() {
			$( $("img",$thisclass).eq(i).parent() ).draggable({
				revert: 'invalid', 	
				start: function(){
					console.log('start')
					/*currentCollageSize=$(this).parent().attr('class').split('_')[1].charAt(7)*/
				},/* start끝 */
				stop: function() {
					console.log(this)
					currentParent = $thisclass
					console.log(currentParent)


					if($($thisclass).parent().attr('id')!=$(this).parents('.text_parent').attr('id')){
						stopFunction(currentParent,this,currentParent.attr('data-countPhoto'))
					}else{
						stoponParent(currentParent,this,currentParent.attr('data-countPhoto'))
					}
					console.log('stop')
				}  
			});
		})
	}
}


function stoponParent($this, $item,StoponParentCount) { //디스는 콜라주, 아이템은 들어온 사진
	console.log('stoponparent들어옴')
	var stoponParentArray=[]
	for(i=0; i<$('img', $this).length;i++){
		stoponParentArray[i]=$('img', $this).eq(i).attr('src')
	}
	console.log($($this))
	console.log($($this).attr('class').split('_')[1].charAt(7))
	console.log('stoponParent함수안의 countPhoto' ,StoponParentCount)

	if ($($this).attr('class').split('_')[1].charAt(7)=='2') {
		$($this)
		.html("<div  class='two_photo_col 2-collage' id='collage2-1-count" +StoponParentCount +"'><img id='img_4' src=''></div>"
				+ "<div  class='two_photo_col 2-collage ' id='collage2-2-count" +StoponParentCount +"'><img id='img_4' src=''></div>"
				+ "</div>"


		)
		$('#collage2-1-count'+ StoponParentCount +'> img').attr('src', stoponParentArray[0]).css('width', '534px').css('height','534px');
		$('#collage2-2-count'+ StoponParentCount +'> img').attr('src', stoponParentArray[1]).css('width', '534px').css('height','534px');
		$($this).attr("class","whole_collage2")
		stoponParentArray.splice(0,stoponParentArray.length)
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='3') {
		$($this)
		.html("<div class='collage3-big 3-collage' id='collage3-1-big"+StoponParentCount+"'><img src=''></div>"
				+ "<div class='collage3_2inner_collage'>"
				+ "<div class='inner_two_collage 3-collage' id='collage3-2"+StoponParentCount+"'><img src=''></div>"
				+ "<div class='inner_two_collage 3-collage' id='collage3-3"+StoponParentCount+"'><img src=''></div>"
				+ "</div></div>"

		)
		$('#collage3-1-big'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '534px').css('height','534px');
		$('#collage3-2'+ StoponParentCount +' > img').attr('src', stoponParentArray[1]).css('width', '260px').css('height','265px');
		$('#collage3-3'+ StoponParentCount +' > img').attr('src', stoponParentArray[2]).css('width', '260px').css('height','265px');


		$($this).attr("class","whole_collage3")
	}else if ($($this).attr('class').split('_')[1].charAt(7)=='4') {

		$($this)
		.html("<div class='four_photo_collage' id='collage4-1" +StoponParentCount +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-2" +StoponParentCount +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-3" +StoponParentCount +"'><img src=''></div>"
				+ " <div class='four_photo_collage' id='collage4-4" +StoponParentCount +"'><img src=''></div>"
				+ "</div>"


		)

		$('#collage4-1'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '397px').css('height','397px');
		$('#collage4-2'+ StoponParentCount +' > img').attr('src', stoponParentArray[1]).css('width', '397px').css('height','397px');
		$('#collage4-3'+ StoponParentCount +' > img').attr('src', stoponParentArray[2]).css('width', '397px').css('height','397px');
		$('#collage4-4'+ StoponParentCount +' > img').attr('src', stoponParentArray[3]).css('width', '397px').css('height','397px');
		/*
			if(photo[i][0].lati != null && photo[i][0].longit != null) {
				var lat = photo[i][0].lati
				var long = photo[i][0].longit
				googleapisView(lat, long, countPhoto)
			}*/
		$($this).attr("class","whole_collage4")
		stoponParentArray.splice(0,stoponParentArray.length)
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='5') {
		$($this)
		.html("<div  class='top_three_collage' id='collage5-1" +StoponParentCount +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-2" +StoponParentCount +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-3" +StoponParentCount +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-4" +StoponParentCount +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-5" +StoponParentCount +"'><img src=''></div>"
				+ "</div>"


		)
		$('#collage5-1'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '260px').css('height','260px');
		$('#collage5-2'+ StoponParentCount +' > img').attr('src',stoponParentArray[1]).css('width', '259px').css('height','260px');
		$('#collage5-3'+ StoponParentCount +' > img').attr('src', stoponParentArray[2]).css('width', '260px').css('height','260px');

		$('#collage5-4'+ StoponParentCount +' > img').attr('src', stoponParentArray[3]).css('width', '397px').css('height','397px');
		$('#collage5-5'+ StoponParentCount +' > img').attr('src', stoponParentArray[4]).css('width', '397px').css('height','397px');
		/*$('#detail-date-div-'+ countPhoto).text(photo[i][0].time)*/
		$($this).attr("class","whole_collage5")
		stoponParentArray.splice(0,stoponParentArray.length)
	} else if($($this).attr('class').split('_')[1].charAt(7)=='6'){
		$($this)
		.html("<div class='collage6-big' id='collage6-1-big" +StoponParentCount +"'><img id='img_4' src=''></div>"
				+"<div id='collage6-2side-collage'>"
				+"<div class='side_two_collage' id='collage6-2" +StoponParentCount +"'><img src=''></div>"
				+"<div class='side_two_collage' id='collage6-3" +StoponParentCount +"'><img src=''></div>"
				+"</div>"

		)
		$('#collage6-1-big'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '534px').css('height','534px');
		$('#collage6-2'+ StoponParentCount +' > img').attr('src', stoponParentArray[1]).css('width', '260px').css('height','265px');
		$('#collage6-3'+ StoponParentCount +' > img').attr('src', stoponParentArray[2]).css('width', '260px').css('height','265px');

		$('#collage6-4'+ StoponParentCount +' > img').attr('src', stoponParentArray[3]).css('width', '264px').css('height','260px');
		$('#collage6-5'+ StoponParentCount +' > img').attr('src', stoponParentArray[4]).css('width', '264px').css('height','260px');
		$('#collage6-6'+ StoponParentCount +' > img').attr('src', stoponParentArray[5]).css('width', '264px').css('height','260px');
		$($this).attr("class","whole_collage6")
		stoponParentArray.splice(0,stoponParentArray.length)
		return;
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='7') {
		$($this)
		.html("<div class='four_of_seven'>"
				+"<div class='right_four_of_seven' id='collage7-1-small" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-2-small" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-3-small" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-4-small" +StoponParentCount +"'><img src=''></div>"
				+"</div>"


				+"<div  class='bottom_three_of_seven' id='collage7-5" +StoponParentCount +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-6" +StoponParentCount +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-7" +StoponParentCount +"'><img src=''></div>"
				+"</div>"

		)
		$('#collage7-1-small'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '192px').css('height','193px');
		$('#collage7-2-small'+ StoponParentCount +' > img').attr('src', stoponParentArray[1]).css('width', '192px').css('height','193px');
		$('#collage7-3-small'+ StoponParentCount +' > img').attr('src', stoponParentArray[2]).css('width', '192px').css('height','193px');
		$('#collage7-4-small'+ StoponParentCount +' > img').attr('src', stoponParentArray[3]).css('width', '192px').css('height','193px');

		$('#collage7-5'+ StoponParentCount +' > img').attr('src', stoponParentArray[4]).css('width', '397px').css('height','397px');
		$('#collage7-6'+ StoponParentCount +' > img').attr('src', stoponParentArray[5]).css('width', '397px').css('height','397px');
		$('#collage7-7'+ StoponParentCount +' > img').attr('src', stoponParentArray[6]).css('width', '397px').css('height','397px');
		aaa=[]
		$($this).attr("class","whole_collage7")
		stoponParentArray.splice(0,stoponParentArray.length)
		return;
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='8') {
		$($this)
		.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
				+"<div  id='four_of_eight'>"
				+"<div class='right_four_of_eight' id='collage8-2" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-3" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-4" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-5" +StoponParentCount +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_three_of_eight' id='collage8-6" +StoponParentCount +"'><img src=''></div>"
				+"<div  class='bottom_three_of_eight' id='collage8-7" +StoponParentCount +"'><img src=''></div>"
				+"<div  class='bottom_three_of_eight' id='collage8-8" +StoponParentCount +"'><img src=''></div>"
				+"</div>"

		)
		$('#collage8-1-big'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '397px').css('height','397px');
		$('#collage8-2'+ StoponParentCount +' > img').attr('src', stoponParentArray[1]).css('width', '195px').css('height','195px');
		$('#collage8-3'+ StoponParentCount +' > img').attr('src', stoponParentArray[2]).css('width', '195px').css('height','195px');
		$('#collage8-4'+ StoponParentCount +' > img').attr('src', stoponParentArray[3]).css('width', '195px').css('height','195px');
		$('#collage8-5'+ StoponParentCount +' > img').attr('src', stoponParentArray[4]).css('width', '195px').css('height','195px');

		$('#collage8-6'+ StoponParentCount +' > img').attr('src', stoponParentArray[5]).css('width', '262px').css('height','260px');
		$('#collage8-7'+ StoponParentCount +' > img').attr('src', stoponParentArray[6]).css('width', '262px').css('height','260px');
		$('#collage8-8'+ StoponParentCount +' > img').attr('src', stoponParentArray[7]).css('width', '262px').css('height','260px');

		$($this).attr("class","whole_collage8")
		stoponParentArray.splice(0,stoponParentArray.length)

		return;
	}else if ($($this).attr('class').split('_')[1].charAt(7)=='9') {
		$($this)
		.html("<div class='one_of_nine' id='collage9-1-big"+StoponParentCount+"'><img id='img_4' src=''></div>"
				+"<div  class='four_of_nine'>"
				+"<div class='right_four_of_nine' id='collage9-2" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-3" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-4" +StoponParentCount +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-5" +StoponParentCount +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_four_of_nine' id='collage9-6" +StoponParentCount +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-7" +StoponParentCount +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-8" +StoponParentCount +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-9" +StoponParentCount +"'><img src=''></div>"
				+"</div>"
		)

		$('#collage9-1-big'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '397px').css('height','397px');
		$('#collage9-2'+ StoponParentCount +' > img').attr('src', stoponParentArray[0]).css('width', '195px').css('height','195px');
		$('#collage9-3'+ StoponParentCount +' > img').attr('src', stoponParentArray[1]).css('width', '195px').css('height','195px');
		$('#collage9-4'+ StoponParentCount +' > img').attr('src',stoponParentArray[2]).css('width', '195px').css('height','195px');
		$('#collage9-5'+ StoponParentCount +' > img').attr('src', stoponParentArray[3]).css('width', '195px').css('height','195px');

		$('#collage9-6'+ StoponParentCount +' > img').attr('src', stoponParentArray[4]).css('width', '195px').css('height','191px');
		$('#collage9-7'+ StoponParentCount +' > img').attr('src', stoponParentArray[5]).css('width', '195px').css('height','191px');
		$('#collage9-8'+ StoponParentCount +' > img').attr('src', stoponParentArray[6]).css('width', '195px').css('height','191px');
		$('#collage9-9'+ StoponParentCount +' > img').attr('src', stoponParentArray[7]).css('width', '195px').css('height','191px');


		$($this).attr("class","whole_collage9")
		stoponParentArray.splice(0,stoponParentArray.length)
		return;
	} 
	makeDropable($($this))
	makeDragable($($this))
	$($this).append($("<div class='control_box' id='control-box-div-"+StoponParentCount+"'>"
			+ "<ul class='clrfix' >"
			+ "<li><button type='button' class='btn_add' id='addbtn-"+StoponParentCount+"' data-addno='"+StoponParentCount+"'>추가</button></li>"
			+ "<li><button type='button' class='btn_caption' id='edtbtn-"+StoponParentCount+"' data-capno='"+StoponParentCount+"'>캡션</button></li>"
			+ "<li><button type='button' class='btn_del' id='delbtn-"+StoponParentCount+"'>삭제</button></li>"
			+ "</ul>"
			+ "</div>"
	))
	stoponParentArray.splice(0,stoponParentArray.length)
	console.log($item)
	deletephoto(StoponParentCount)
}



function stopFunction(currentParent,$this,stopCountPhoto){ //currentParent는 wholecollage this는 이미지의 페어런츠태그
	var stopFunctionArray=[];
	arraycount=0;

	console.log('stop펑션의 카운트포토',stopCountPhoto)
	var textParentNo=$(currentParent).parent().attr('id').split('_')[1]
	for(i=0; i<$('img', currentParent).length;i++){
		if($('img', currentParent).eq(i).attr('src')!=$($this).children().attr('src')){
			stopFunctionArray.push($('img',currentParent).eq(i).attr('src'))
		}
		console.log('커런트 페어런츠 소스',$('img',currentParent).eq(i).attr('src'))
		console.log('디스 이미지 소스',$('img',$this).attr('src'))
		console.log('디스 이미지 소스 차일드로 찾기',$($this).children().attr('src'))
		console.log(stopFunctionArray[i])
	}
	console.log(currentParent)
	console.log($(currentParent).parent())
	console.log(stopFunctionArray)
	countPhoto=0;
	/* if(currentCollageSize */
	console.log($(currentParent).attr('class').split('_')[1].charAt(7))
	var textParent= $("#text_parent_"+countPhoto+"")
	if ($(currentParent).attr('class').split('_')[1].charAt(7) == '1') {
		var textParentNo=$(currentParent).parent().attr('id').split('_')[1]
		$('.text_parent').each(function(){
			if($(this).attr('id').split('_')[1]>textParentNo){
				$(this).attr('id',$(this).attr('id').split('_')[0]+"_"+$(this).attr('id').split('_')[1]-1).split[i]
			}
		})
		$(currentParent).parent().parent().remove();
		$("<div class='whole_collage1'>")
		stopFunctionArray=[]
		uiremove($this)
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '2') {

		$(currentParent)
		.html("<div  class='one_photo_col' id='collage1-1" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+ "</div>"
		)
		$('#collage1-1'+ stopCountPhoto +'> img').attr('src',stopFunctionArray[0]).css('width', '809px').css('height','606px');
		$(currentParent).attr("class","whole_collage1")
		stopFunctionArray=[]
		uiremove($this)
	}else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '3') {
		$(currentParent)
		.html("<div  class='two_photo_col draggable' id='collage2-1-count" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+ "<div  class='two_photo_col draggable' id='collage2-2-count" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+ "</div>")

				$('#collage2-1-count'+ stopCountPhoto +'> img').attr('src',stopFunctionArray[0]).css('width', '534px').css('height','534px');
		$('#collage2-2-count'+ stopCountPhoto +'> img').attr('src',stopFunctionArray[1]).css('width', '534px').css('height','534px');
		$(currentParent).attr("class","whole_collage2")
		stopFunctionArray.splice(0,stopFunctionArray.length)
		uiremove($this)
		stopFunctionArray=[]
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '4') {


		$(currentParent)
		.html("<div class='collage3-big' id='collage3-1-big"+stopCountPhoto+"'><img src=''></div>"
				+ "<div class='collage3_2inner_collage'>"
				+ "<div class='inner_two_collage' id='collage3-2"+stopCountPhoto+"'><img src=''></div>"
				+ "<div class='inner_two_collage' id='collage3-3"+stopCountPhoto+"'><img src=''></div>"
				+ "</div></div>")

				$('#collage3-1-big'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '534px').css('height','534px');
		$('#collage3-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '260px').css('height','265px');
		$('#collage3-3'+ stopCountPhoto +' > img').attr('src',stopFunctionArray[2]).css('width', '260px').css('height','265px');
		$(currentParent).attr("class","whole_collage3")
		stopFunctionArray=[]
	}else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '5') {

		$(currentParent)
		.html("<div class='four_photo_collage' id='collage4-1" +stopCountPhoto +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-2" +stopCountPhoto +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-3" +stopCountPhoto +"'><img src=''></div>"
				+ " <div class='four_photo_collage' id='collage4-4" +stopCountPhoto +"'><img src=''></div>"

		)

		$('#collage4-1'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '397px').css('height','397px');
		$('#collage4-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '397px').css('height','397px');
		$('#collage4-3'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '397px').css('height','397px');
		$('#collage4-4'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '397px').css('height','397px');
		$(currentParent).attr("class","whole_collage4")
		stopFunctionArray=[]
		uiremove($this)
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '6') {

		$(currentParent)
		.html("<div  class='top_three_collage' id='collage5-1" +stopCountPhoto +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-2" +stopCountPhoto +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-3" +stopCountPhoto +"'><img src=''></div>"

				+ "<div  class='bottom_two_collage' id='collage5-4" +stopCountPhoto +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-5" +stopCountPhoto +"'><img src=''></div>")
				$('#collage5-1'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '260px').css('height','260px');
		$('#collage5-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '259px').css('height','260px');
		$('#collage5-3'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '260px').css('height','260px');

		$('#collage5-4'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '397px').css('height','397px');
		$('#collage5-5'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[4]).css('width', '397px').css('height','397px');
		$(currentParent).attr("class","whole_collage5")
		stopFunctionArray=[]
		uiremove($this)
	}else if($(currentParent).attr('class').split('_')[1].charAt(7)=='7'){

		$(currentParent)
		.html("<div class='collage6-big' id='collage6-1-big'" +stopCountPhoto +"><img id='img_4' src=''></div>"
				+"<div id='collage6-2side-collage'>"
				+"<div class='side_two_collage' id='collage6-2'" +stopCountPhoto +"><img src=''></div>"
				+"<div class='side_two_collage' id='collage6-3'" +stopCountPhoto +"><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_three_collage' id='collage6-4" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-5" +stopCountPhoto +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-6" +stopCountPhoto +"'><img id='img_4' src=''></div>"

		)
		$('#collage6-1-big'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '534px').css('height','534px');
		$('#collage6-2'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '260px').css('height','265px');
		$('#collage6-3'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '260px').css('height','265px');

		$('#collage6-4'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '264px').css('height','260px');
		$('#collage6-5'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[4]).css('width', '264px').css('height','260px');
		$('#collage6-6'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[5]).css('width', '264px').css('height','260px');
		$(currentParent).attr("class","whole_collage6")
		stopFunctionArray.splice(0,stopFunctionArray.length)
		uiremove($this)
	} else if ($(currentParent).attr('class').split('_')[1].charAt(7) == '8') {
		$(currentParent)
		.html("<div class='four_of_seven'>"
				+"<div class='right_four_of_seven' id='collage7-1-small" +stopCountPhoto +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-2-small" +stopCountPhoto +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-3-small" +stopCountPhoto +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-4-small" +stopCountPhoto +"'><img src=''></div>"
				+"</div>"


				+"<div  class='bottom_three_of_seven' id='collage7-5" +stopCountPhoto +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-6" +stopCountPhoto +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-7" +stopCountPhoto +"'><img src=''></div>"
				+"</div>"


		)
		$('#collage7-1-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[0]).css('width', '192px').css('height','193px');
		$('#collage7-2-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[1]).css('width', '192px').css('height','193px');
		$('#collage7-3-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[2]).css('width', '192px').css('height','193px');
		$('#collage7-4-small'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[3]).css('width', '192px').css('height','193px');

		$('#collage7-5'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[4]).css('width', '397px').css('height','397px');
		$('#collage7-6'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[5]).css('width', '397px').css('height','397px');
		$('#collage7-7'+ stopCountPhoto +' > img').attr('src', stopFunctionArray[6]).css('width', '397px').css('height','397px');
		$(currentParent).attr("class","whole_collage7")
		stopFunctionArray.splice(0,stopFunctionArray.length)
		uiremove($this)
	}
	stopFunctionArray.splice(0,stopFunctionArray.length)
	makeDropable($(currentParent))
	makeDragable($(currentParent))
	$(currentParent).append($("<div class='control_box' id='control-box-div-"+stopCountPhoto+"'>"
			+ "<ul class='clrfix' >"
			+ "<li><button type='button' class='btn_add' id='addbtn-"+stopCountPhoto+"' data-addno='"+stopCountPhoto+"'>추가</button></li>"
			+ "<li><button type='button' class='btn_caption' id='edtbtn-"+stopCountPhoto+"' data-capno='"+stopCountPhoto+"'>캡션</button></li>"
			+ "<li><button type='button' class='btn_del' id='delbtn-"+stopCountPhoto+"'>삭제</button></li>"
			+ "</ul>"
			+ "</div>"))
			deletephoto(stopCountPhoto)
}

function uiremove($this){
	$($this).remove();
}
function resizeCollage($this, $item,countPhotoresize) { //디스는 콜라주, 아이템은 들어온 사진
	var resizeCollageArray=[]
	for(i=0; i<$('img', $this).length;i++){
		resizeCollageArray[i]=$('img', $this).eq(i).attr('src')
		console.log(resizeCollageArray[i])
	}

	if ($($this).attr('class').split('_')[1].charAt(7)=='1') {
		$($this)
		.html("<div  class='two_photo_col 2-collage' id='collage2-1-count" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+ "<div  class='two_photo_col 2-collage ' id='collage2-2-count" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+ "</div>"
		)
		$('#collage2-1-count'+ countPhotoresize +'> img').attr('src', resizeCollageArray[0]).css('width', '534px').css('height','534px');
		$('#collage2-2-count'+ countPhotoresize +'> img').attr('src', $($item).children().attr('src')).css('width', '534px').css('height','534px');
		$($this).attr("class","whole_collage2")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='2') {
		$($this)
		.html("<div class='collage3-big 3-collage' id='collage3-1-big"+countPhotoresize+"'><img src=''></div>"
				+ "<div class='collage3_2inner_collage'>"
				+ "<div class='inner_two_collage 3-collage' id='collage3-2"+countPhotoresize+"'><img src=''></div>"
				+ "<div class='inner_two_collage 3-collage' id='collage3-3"+countPhotoresize+"'><img src=''></div>"
				+ "</div></div>"


		)
		$('#collage3-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '534px').css('height','534px');
		$('#collage3-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '260px').css('height','265px');
		$('#collage3-3'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '260px').css('height','265px');

		$($this).attr("class","whole_collage3")
		makeDropable($($this))
		makeDragable($($this))
	}else if ($($this).attr('class').split('_')[1].charAt(7)=='3') {

		$($this)
		.html("<div class='four_photo_collage' id='collage4-1" +countPhotoresize +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-2" +countPhotoresize +"'><img src=''></div>"
				+ "<div class='four_photo_collage' id='collage4-3" +countPhotoresize +"'><img src=''></div>"
				+ " <div class='four_photo_collage' id='collage4-4" +countPhotoresize +"'><img src=''></div>"
				+ "</div>"


		)

		$('#collage4-1'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '397px').css('height','397px');
		$('#collage4-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '397px').css('height','397px');
		$('#collage4-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '397px').css('height','397px');
		$('#collage4-4'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '397px').css('height','397px');
		$(this).attr("class","whole_collage4")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='4') {
		$($this)
		.html("<div  class='top_three_collage' id='collage5-1" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-2" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='top_three_collage' id='collage5-3" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-4" +countPhotoresize +"'><img src=''></div>"
				+ "<div  class='bottom_two_collage' id='collage5-5" +countPhotoresize +"'><img src=''></div>"
				+ "</div>"
		)
		$('#collage5-1'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '260px').css('height','260px');
		$('#collage5-2'+ countPhotoresize +' > img').attr('src',resizeCollageArray[1]).css('width', '259px').css('height','260px');
		$('#collage5-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '260px').css('height','260px');

		$('#collage5-4'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '397px').css('height','397px');
		$('#collage5-5'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '397px').css('height','397px');
		/*$('#detail-date-div-'+ countPhoto).text(photo[i][0].time)*/
		$($this).attr("class","whole_collage5")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
	} else if($($this).attr('class').split('_')[1].charAt(7)=='5'){
		$($this)
		.html("<div class='collage6-big' id='collage6-1-big" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"<div id='collage6-2side-collage'>"
				+"<div class='side_two_collage' id='collage6-2" +countPhotoresize +"'><img src=''></div>"
				+"<div class='side_two_collage' id='collage6-3" +countPhotoresize +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_three_collage' id='collage6-4" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-5" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"<div  class='bottom_three_collage' id='collage6-6" +countPhotoresize +"'><img id='img_4' src=''></div>"
				+"</div>"
		)
		$('#collage6-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '534px').css('height','534px');
		$('#collage6-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '260px').css('height','265px');
		$('#collage6-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '260px').css('height','265px');

		$('#collage6-4'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '264px').css('height','260px');
		$('#collage6-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '264px').css('height','260px');
		$('#collage6-6'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '264px').css('height','260px');
		$($this).attr("class","whole_collage6")
		makeDropable($($this))
		makeDragable($($this))
		resizeCollageArray.splice(0,resizeCollageArray.length)
		return;
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='6') {
		$($this)
		.html("<div class='four_of_seven'>"
				+"<div class='right_four_of_seven' id='collage7-1-small" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-2-small" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-3-small" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_seven' id='collage7-4-small" +countPhotoresize +"'><img src=''></div>"
				+"</div>"


				+"<div  class='bottom_three_of_seven' id='collage7-5" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-6" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_seven' id='collage7-7" +countPhotoresize +"'><img src=''></div>"
				+"</div>"
		)
		$('#collage7-1-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '192px').css('height','193px');
		$('#collage7-2-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '192px').css('height','193px');
		$('#collage7-3-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '192px').css('height','193px');
		$('#collage7-4-small'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '192px').css('height','193px');

		$('#collage7-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '397px').css('height','397px');
		$('#collage7-6'+ countPhotoresize +' > img').attr('src', resizeCollageArray[5]).css('width', '397px').css('height','397px');
		$('#collage7-7'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '397px').css('height','397px');
		aaa=[]
		$($this).attr("class","whole_collage7")
		makeDropable($($this))
		makeDragable($($this))
		resizeCollageArray.splice(0,resizeCollageArray.length)
		return;
	} else if ($($this).attr('class').split('_')[1].charAt(7)=='7') {
		$($this)
		.html("<div class='collage8-1' id='collage8-1-big" +countPhoto +"'><img src=''></div>"
				+"<div  id='four_of_eight'>"
				+"<div class='right_four_of_eight' id='collage8-2" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-3" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-4" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_eight' id='collage8-5" +countPhotoresize +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_three_of_eight' id='collage8-6" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_eight' id='collage8-7" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_three_of_eight' id='collage8-8" +countPhotoresize +"'><img src=''></div>"
				+"</div>"
		)
		$('#collage8-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '397px').css('height','397px');
		$('#collage8-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '195px').css('height','195px');
		$('#collage8-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[2]).css('width', '195px').css('height','195px');
		$('#collage8-4'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '195px').css('height','195px');
		$('#collage8-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '195px').css('height','195px');

		$('#collage8-6'+ countPhotoresize +' > img').attr('src', resizeCollageArray[5]).css('width', '262px').css('height','260px');
		$('#collage8-7'+ countPhotoresize +' > img').attr('src', resizeCollageArray[6]).css('width', '262px').css('height','260px');
		$('#collage8-8'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '262px').css('height','260px');

		$($this).attr("class","whole_collage8")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDropable($($this))
		makeDragable($($this))
		return;
	}else if ($($this).attr('class').split('_')[1].charAt(7)=='8') {
		$($this)
		.html("<div class='one_of_nine' id='collage9-1-big"+countPhotoresize+"'><img id='img_4' src=''></div>"
				+"<div  class='four_of_nine'>"
				+"<div class='right_four_of_nine' id='collage9-2" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-3" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-4" +countPhotoresize +"'><img src=''></div>"
				+"<div class='right_four_of_nine' id='collage9-5" +countPhotoresize +"'><img src=''></div>"
				+"</div>"

				+"<div  class='bottom_four_of_nine' id='collage9-6" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-7" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-8" +countPhotoresize +"'><img src=''></div>"
				+"<div  class='bottom_four_of_nine' id='collage9-9" +countPhotoresize +"'><img src=''></div>"
				+"</div>"
		)

		$('#collage9-1-big'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '397px').css('height','397px');
		$('#collage9-2'+ countPhotoresize +' > img').attr('src', resizeCollageArray[0]).css('width', '195px').css('height','195px');
		$('#collage9-3'+ countPhotoresize +' > img').attr('src', resizeCollageArray[1]).css('width', '195px').css('height','195px');
		$('#collage9-4'+ countPhotoresize +' > img').attr('src',resizeCollageArray[2]).css('width', '195px').css('height','195px');
		$('#collage9-5'+ countPhotoresize +' > img').attr('src', resizeCollageArray[3]).css('width', '195px').css('height','195px');

		$('#collage9-6'+ countPhotoresize +' > img').attr('src', resizeCollageArray[4]).css('width', '195px').css('height','191px');
		$('#collage9-7'+ countPhotoresize +' > img').attr('src', resizeCollageArray[5]).css('width', '195px').css('height','191px');
		$('#collage9-8'+ countPhotoresize +' > img').attr('src', resizeCollageArray[6]).css('width', '195px').css('height','191px');
		$('#collage9-9'+ countPhotoresize +' > img').attr('src', $($item).children().attr('src')).css('width', '195px').css('height','191px');

		$($this).attr("class","whole_collage9")
		resizeCollageArray.splice(0,resizeCollageArray.length)
		makeDragable($($this))
		return;
	} 
	console.log($item)

	$($this).append($("<div class='control_box' id='control-box-div-"+countPhotoresize+"'>"
			+ "<ul class='clrfix' >"
			+ "<li><button type='button' class='btn_add' id='addbtn-"+countPhotoresize+"' data-addno='"+countPhotoresize+"'>추가</button></li>"
			+ "<li><button type='button' class='btn_caption' id='edtbtn-"+countPhotoresize+"' data-capno='"+countPhotoresize+"'>캡션</button></li>"
			+ "<li><button type='button' class='btn_del' id='delbtn-"+countPhotoresize+"'>삭제</button></li>"
			+ "</ul>"
			+ "</div>"
	))
	deletephoto(countPhotoresize)
}


var dropcollageArray=[];
function makeDropable($thisclass){
	dropcollageArray.push($thisclass)
	console.log($thisclass)
	console.log($('img',$thisclass).parent())
	console.log($('img').parent())
	$($thisclass).droppable({
		accept:  (function(){
			for(i=0; i< dropcollageArray.length ; i++){
				for(j=0; j< $('img',dropcollageArray[i]).parent().length; j++){
					return $('img',dropcollageArray[i]).parent().eq(j)}}
		}), 
		drop: function( event, ui ) {
			/*    	  console.log(this)
	    	   console.log($(ui.draggable).parent().attr('class').split('_')[1].charAt(7)) 
	    	  dropdiv=$(this).attr('class').split('_')[1].charAt(7)
	    	   console.log($(this).attr('class').split('_')[1].charAt(7)) 
	    	  console.log($(this).attr('class'))
	    	  if($(ui.draggable).parent().attr('class') == undefined||$(ui.draggable).parent().attr('class').split('_')[0]!='whole'){
	    		  if($(this).attr('class').split('_')[1].charAt(7)!=$(ui.draggable).parent().parent().attr('class').split('_')[1].charAt(7)){
	    	    	  resizeCollage( this, ui.draggable);}
	    	  	}else{
	    	  if($(this).attr('class').split('_')[1].charAt(7)!=$(ui.draggable).parent().attr('class').split('_')[1].charAt(7)||$(ui.draggable).parent().attr('class')==undefined){*/
			$item=ui.draggable
			/*$(ui.draggable).remove();*/
			if($($item).parents('.text_parent').attr('id')!=$(this).parent().attr('id')){
				$(ui.draggable).remove()
				resizeCollage(this, $item,$(this).attr('data-countPhoto')); //this는 이 콜라쥬, ui 드래그에이블은 들어온값
			}
		}
	})
}; 
function showControlBox(count) {
	$(document).ready(function() {
//		contBoxCount = $(this).prop('id').split('_')[2]
//		console.log('#control-box-div-'+contBoxCount)
		if($('#control-box-div-'+count).css("display") == "block") {
			$('#control-box-div-'+count).css('display', 'none');
		} else {
			$('#control-box-div-'+count).css('display', 'block');
		}
		console.log("누름")
	})
	return false;
}

/*드래그드롭끝*/