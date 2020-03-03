/*
Theme Name: Seoul Digital Archive
Author: css3studio
Version:2.0
*/
var $ = jQuery;
var header_height;
var fontSize;
var device_status = "";
var main_min_height = 640;

$(window).resize(function() {
	fontSize = parseFloat($("html").css("fontSize"));
	//브라우져 사이즈 변화에 따른 실시간 반응
	var dw = $(document).width();
	if(dw < 768 && device_status == "pc"){	//PC에서 모바일로 변경시
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
		$('.main-slider').css('height', $('header').height() - 68 + 'px');
		$('.main-slider .slide').css('height', $('header').height() - 68 + 'px');
	}else if(dw >= 768 && device_status == "mobile"){	//모바일에서 PC로 변경시
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
		$('.main-slider').css('height', $('header').height() + 'px');
		$('.main-slider .slide').css('height', $('header').height() + 'px');
	}
	if(device_status == "pc"){	//메인 메뉴 글자크기 변경을 위한 창 높이 부여
		$('.main-slider').css('height', $('header').height() + 'px');
		$('.main-slider .slide').css('height', $('header').height() + 'px');
	}
});

$(window).scroll(function(e){
	//헤더 고정
	if($("body").hasClass('pc')){
		if ($("#main_wrap").hasClass("mainPage")){	//메인화면
			if ($(window).scrollTop() > header_height){
				$("header").removeClass("hd01");
				$("header").addClass("hd02");
				$("#main_wrap").addClass("scrolling");
				$("#main-content").css("paddingTop",header_height + (fontSize * 3));
			} else{
				$("header").removeClass("hd02");
				$("header").addClass("hd01");
				$("#main_wrap").removeClass("scrolling");
				$("#main-content").css("paddingTop","3rem");
			}
		} else if(!$("header").hasClass("fixed")) {		//서브화면
			if ($(window).scrollTop() > 0){
				$("#main_wrap").addClass("scrolling");
				$("#main-content").css("paddingTop",header_height);
			} else{
				$("#main_wrap").removeClass("scrolling");
				$("#main-content").css("paddingTop",0);
			}
		}
		var scroll_top = $(window).scrollTop();
		var max_top = $('.cf17').height() - $('.cf17 .stencilA').height();
		if( scroll_top > 0 && scroll_top < max_top){
			$('.cf17 .stencilA').css({
				top : $(window).scrollTop() - 0
			});
		}
	}
});

$(document).ready(function() {
	//초기 로딩시 브라우저 사이즈
	var dw = $(document).width();
	if(dw < 768){	//모바일
		$("body").removeClass('pc');
		$("body").addClass('mobile');
		init_mobile();
		device_status = "mobile";
	}else{	//PC
		$("body").removeClass('mobile');
		$("body").addClass('pc');
		init_pc();
		device_status = "pc";
	}
	fontSize = parseFloat($("html").css("fontSize"));
	//폼요소 스타일링
	$(".cf02 select").selectmenu({
		change: function( event, data ) {
			if(data.item.value == "0") {
				$(".cf02 button").text("웹사이트에서 검색");
				$(".cf02").attr("action", "/site-search");
			} else {
				$(".cf02 button").text("기록에서 검색");
				$(".cf02").attr("action", "/search");
			}
		}
	});
	//$(".cf09 .fields select").selectmenu().selectmenu( "menuWidget" ).addClass( "fieldSearch" );

	/* jquery ui init */
	$(".tkg01:not(.cf04 .tkg01)").buttonset();
	$(".cf08_02 .trg01").buttonset();
	$(".cf08_02 .trg01 #q_type01").on("change",function(){
		$(this).parent().removeClass("answer").addClass("question");
	});
	$(".cf08_02 .trg01 #q_type02").on("change",function(){
		$(this).parent().removeClass("question").addClass("answer");
	});
	$(".ng07 select").selectmenu();
	$(".cf10 select").selectmenu();
	$(".tc07 select").selectmenu();
	$(".cf08_02 select").selectmenu();
	$(".fc13").tabs();
	$(".cf09 .dates input").datepicker({
		dateFormat: "yy-mm-dd",
		showMonthAfterYear: true,
		changeMonth: true,
		changeYear: true,
		monthNames: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		monthNamesShort: [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월" ],
		dayNames: [ "일", "월", "화", "수", "목", "금", "토" ],
		dayNamesMin: [ "일", "월", "화", "수", "목", "금", "토" ]
	});

	//입력폼 파일 선택
   $("form .fake a:not('.item, .local')").bind('click', function() {
       $(this).parent('.fake').siblings('.ti01').click();
   });
   $("form .ti01").bind('change', function() {
       $(this).siblings('.fake').find('span').text($(this).val());
   });

	//카테고리 선택 슬라이드
	$('.ib01 .slide').slick({
		dots: false,
		infinite: false,
		initialSlide:0,
		prevArrow : ".ib01 .prevB",
		nextArrow : ".ib01 .nextB",
		speed: 300,
		slidesToShow: 1,
		variableWidth: true
	});
	$(".ib01 .slide li.add a").bind('click', function() {
		open_popup("#popup_category");
		return false;
	});
	//탐색 뷰 슬라이드
	/*
	$('.ib03 .slide').on('init', function(){
		$('.ib03 .slide li a img').each(function(){
			 if($(this).width() > $(this).height()){
				$(this).css({
					width:'21.25rem',
					height:'auto'
				});
			 }else{
				 $(this).css({
					height:'22.75rem',
					width:'auto'
				});
			}
		});
	});
	*/
	var $panzoom;
	$('.ib03 .slide').on('init', function(){
		$panzoom = $(".ib03 .slide li.slick-current img").panzoom({
		$zoomIn: $(".ib03 .enlarge"),
		$zoomOut: $(".ib03 .reduce"),
		//$zoomRange: $section.find(".zoom-range"),
		$reset: $(".ib03 .reset"),
		//startTransform: 'scale(0.9)',
		maxScale: 5.0,
		increment: 0.1
		});
	});
	$('.ib03 .slide').on('afterChange', function(){
		$panzoom.panzoom("destroy");
		$panzoom = $(".ib03 .slide li.slick-current img").panzoom({
		$zoomIn: $(".ib03 .enlarge"),
		$zoomOut: $(".ib03 .reduce"),
		$reset: $(".ib03 .reset"),
		increment: 0.05,
		});
	});
	$('.ib03 .slide').slick({
		dots: true,
		infinite: false,
		speed: 300,
		//slidesToShow: 1,
		//focusOnSelect: true,
		//draggable:false,
		//centerMode: true,
		//centerPadding:'1rem',
		//variableWidth: true,
		appendDots:".ib03 .paging",
		customPaging: function (slider, i) {
			return  '<b>' + (i + 1) + '</b>/' + slider.slideCount;
		}
	});
	/*
	$(".ib03 .imgScale a.enlarge").bind('click', function() {	//확대
		$target = $(".ib03 .slide li.slick-current img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale += 0.1;
		$target.css('transform', 'scale(' + cur_scale + ')');
		$target.attr("data-scale",cur_scale);
		return false;
	});
	$(".ib03 .imgScale a.reduce").bind('click', function() {	//축소
		$target = $(".ib03 .slide li.slick-current img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale -= 0.1;
		$target.css('transform', 'scale(' + cur_scale + ')');
		$target.attr("data-scale",cur_scale);
		return false;
	});
	*/
	$(".ib03 .imgScale a.full").bind('click', function() {	//화면전체
		$('.itemViewer .leftA').addClass("fullViewMode");
		var curSlide = $('.ib03 .slide').slick("slickCurrentSlide");
		$('.ib03 .slide').slick("slickGoTo",curSlide);
		$('.ib03 .slide li ').css({
			"width": $(".ib03 .slide").width()
		});
		$('.ib03 .slide li a').css({
			"height": $(".ib03 .slide").height(),
			"line-height": $(".ib03 .slide").height() + "px"
		});
		$(".ib03 .slide li.slick-current img").panzoom("reset");
		return false;
	});
	$(".ib03 .imgScale a.normal").bind('click', function() {	//화면일반
		$('.itemViewer .leftA').removeClass("fullViewMode");
		var curSlide = $('.ib03 .slide').slick("slickCurrentSlide");
		$('.ib03 .slide').slick("slickGoTo",curSlide);
		$('.ib03 .slide li ').css({
			"width": $(".ib03 .slide").width()
		});
		$('.ib03 .slide li a').css({
			"height": $(".ib03 .slide").height(),
			"line-height": $(".ib03 .slide").height() + "px"
		});
		$(".ib03 .slide li.slick-current img").panzoom("reset");
		return false;
	});

	/*
	$(".ib03 .imgScale a.full").bind('click', function() {	//화면전체
		$(".ib03 .fullImage").fadeIn();
		var $source = $(".ib03 .slide li.slick-current img");
		view_in_full($source);
		return false;
	});
	$(".ib03 .fullImage a.close").bind('click', function() {	//전체화면 닫기
		$(".ib03 .fullImage").fadeOut();

		return false;
	});
	$(".ib03 .fullImage a.next").bind('click', function() {	//다음이미지
		$('.ib03 .slide').slick("slickNext");
		var $source = $(".ib03 .slide li.slick-current img");
		$(".ib03 .fullImage .thumb img").fadeOut("fast",function() {
			view_in_full($source);
			$(".ib03 .fullImage .thumb img").fadeIn();
		});
		return false;
	});
	$(".ib03 .fullImage a.prev").bind('click', function() {	//다음이미지
		$('.ib03 .slide').slick("slickPrev");
		var $source = $(".ib03 .slide li.slick-current img");
		$(".ib03 .fullImage .thumb img").fadeOut("fast",function() {
			view_in_full($source);
			$(".ib03 .fullImage .thumb img").fadeIn();
		});
		return false;
	});

	function view_in_full($source) {	//전체화면
		var $target = $(".ib03 .fullImage .thumb img");
		$target.attr("src",$source.attr("src"));
		 if($source.width() > $source.height()){
			$target.css({
				width:'100%',
				height:'auto'
			});
		 }else{
			 $target.css({
				height:'100%',
				width:'auto'
			});
		}
	}
	*/
	
	//메인 슬라이드 배너 Init.
	$('.main-slider').slick({
	    autoplay: true,
	    autoplaySpeed: 3000,
	    fade: true,
	    dots: true,
	    arrows: true
	});

	//컬렉션 메인 슬라이드
	$('.ib04 .slide').slick({
		dots: true,
		infinite: true,
		initialSlide:0,
		adaptiveHeight:true,
		speed: 300
	});
	//용산디지털 전시 뷰 슬라이드
	$('.ib05 .picSlide .slide').on('init', function(){
		$('.ib05 .picSlide .slide li dt img').each(function(){
			/*
			 if($(this).width() > $(this).height()){
				$(this).css({
					width:'80%',
					height:'auto'
				});
			 }else{
				 $(this).css({
					height:'80%',
					width:'auto'
				});
			}
			*/
		});
	});
	$('.ib05 .picSlide .slide').slick({
		dots: false,
		infinite: false,
		initialSlide:0,
		fade:true,
		speed: 300,
		dots:true,
		asNavFor: '.ib05 .pagingSlide .slide',
		appendDots:".ib05 .paging",
		customPaging: function (slider, i) {
			return  '<b>' + (i + 1) + '</b>/' + slider.slideCount;
		}
	});
	$('.ib05 .pagingSlide .slide').slick({
		dots: false,
		infinite: false,
		speed: 300,
		prevArrow : ".ib05 .pagingSlide .slideControl .prev",
		nextArrow : ".ib05 .pagingSlide .slideControl .next",
		asNavFor: '.ib05 .picSlide .slide',
		slidesToShow: 1,
		focusOnSelect: true,
		centerMode: true,
		variableWidth: true
	});
	$(".ib05 .picSlide .imgScale a.enlarge").bind('click', function() {	//확대
		$target = $(".ib05 .picSlide li.slick-current dt img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale += 0.2;
		if(cur_scale < 10){
			$target.css('transform', 'scale(' + cur_scale + ')');
			$target.attr("data-scale",cur_scale);
		}
		return false;
	});
	$(".ib05 .picSlide .imgScale a.reduce").bind('click', function() {	//축소
		$target = $(".ib05 .picSlide li.slick-current dt img");
		var cur_scale = $target.attr("data-scale");
		cur_scale *= 1;
		cur_scale -= 0.2;
		if(cur_scale > 0.1){
			$target.css('transform', 'scale(' + cur_scale + ')');
			$target.attr("data-scale",cur_scale);
		}
		return false;
	});
	$(".ib05 .picSlide .imgScale a.reset").bind('click', function() {	//축소
		$target = $(".ib05 .picSlide li.slick-current dt img");
		cur_scale = 1;
		$target.css('transform', 'scale(' + cur_scale + ')');
		$target.attr("data-scale",cur_scale);
		return false;
	});
	$(".ib05 .imgScale a.full").bind('click', function() {	//화면전체
		$(".ib05 .fullImage").fadeIn();
		var $source = $(".ib05 .slide li.slick-current img");
		view_in_full2($source);
		return false;
	});
	$(".ib05 .fullImage a.close").bind('click', function() {	//전체화면 닫기
		$(".ib05 .fullImage").fadeOut();

		return false;
	});
	$(".ib05 .fullImage a.next").bind('click', function() {	//다음이미지
		$('.ib05 .slide').slick("slickNext");
		var $source = $(".ib05 .slide li.slick-current img");
		$(".ib05 .fullImage .thumb img").fadeOut("fast",function() {
			view_in_full2($source);
			$(".ib05 .fullImage .thumb img").fadeIn();
		});
		return false;
	});
	$(".ib05 .fullImage a.prev").bind('click', function() {	//다음이미지
		$('.ib05 .slide').slick("slickPrev");
		var $source = $(".ib05 .slide li.slick-current img");
		$(".ib05 .fullImage .thumb img").fadeOut("fast",function() {
			view_in_full2($source);
			$(".ib05 .fullImage .thumb img").fadeIn();
		});
		return false;
	});
	function view_in_full2($source) {	//전체화면

		var $target = $(".ib05 .fullImage .thumb img");
		$target.attr("src",$source.attr("src"));
		if($source.width() > $source.height()){
			$target.css({
				width:'100%',
				height:'auto'
			});
		 }else{
			 $target.css({
				height:'100%',
				width:'auto'
			});
		}

	}
	$(".ib06 .imgScale a.full").bind('click', function() {	//화면전체
		$('.itemViewer .leftA').addClass("fullViewMode");
		return false;
	});
	$(".ib06 .imgScale a.normal").bind('click', function() {	//화면일반
		$('.itemViewer .leftA').removeClass("fullViewMode");
		return false;
	});
	//전사본 입력하기 이미지 보기
	if($(".ib08 .thumb img").length) {
		$panzoom = $(".ib08 .thumb img").panzoom({
			$zoomIn: $(".ib08 .enlarge"),
			$zoomOut: $(".ib08 .reduce"),
			//$zoomRange: $section.find(".zoom-range"),
			$reset: $(".ib08 .reset"),
			//startTransform: 'scale(0.8)',
			maxScale: 5.0,
			increment: 0.1
		});
	}
	$(".ib08 .imgScale a.full").bind('click', function() {	//화면전체
		$('.ib08').addClass("fullViewMode");
		$('.ib08 .thumb').css({
			"height": $(".ib08").height(),
			"line-height": $(".ib08").height() + "px"
		});
		return false;
	});
	$(".ib08 .imgScale a.normal").bind('click', function() {	//화면일반
		$('.ib08').removeClass("fullViewMode");
		$('.ib08 .thumb').css({
			"height": $(".ib08").height(),
			"line-height": $(".ib08").height() + "px"
		});
		return false;
	});


	//팝업 - 카테고리 선택
	$('#popup_category .addCat input').on('keypress', function(event) {
		var text = $(this).val();
		var index = $('#popup_category ul li').length + 1;
		if(event.which == 13){
			if(text.length < 1){
				alert("카테고리를 입력하세요!")
			}else{
				$('#popup_category ul').append('<li><input type="checkbox" name="category_name" id="category_name' + index + '" value="' + text + '"/><label for="category_name' + index + '">' + text + '</label></li>');
				$(this).val('');
				$('#popup_category ul').scrollTop($('#popup_category ul').height());
			}
			event.preventDefault();
		}
	});
	$('#popup_category .submit button').on('click', function() {
		var index = $('.ib01 .slide li').length - 2;
		$('#popup_category ul li input:checked').each(function(){
			if(check_overlap($(this).val())){
				var a = $('<a/>').attr("href","#").text($(this).val());
				var li = $('<li/>').append(a);
				$('.ib01 .slide').slick('slickAdd',li,index);
				index++;
			}
		});
		$('#popup_category').hide();
		return false;
	});
	$('.pp01 .closeB').on('click', function() {
		$('.pp01').hide();
		return false;
	});

	//팝업 - 문의신청 완료 확인
	$("#popup_inquery_sended .submit button").bind('click', function() {
		$('.pp01').hide();
		return false;
   });
	//팝업 - 오류보고 팝업 열기
	$(".tc11 .topBtn a.open").bind('click', function() {
		$(".tc11").removeClass("closed");
		$(".tc11").addClass("opened");
		return false;
   });
	$(".tc11 .topBtn a.close").bind('click', function() {
		$(".tc11").removeClass("opened");
		$(".tc11").addClass("closed");
		return false;
   });
	//팝업 - 정보오류보고 팝업 열기
	$(".tc09.apply .btn02").bind('click', function() {
		$("#popup_report_data_error").show();
		return false;
   });
	$("#popup_report_data_error .inputGroup .input a.close").bind('click', function() {
		$(this).parent(".input").remove();
		return false;
   });
	// 팝업 - 커뮤니티 등록
	$("#community_add.ready").bind('click', function() {
		open_popup("#popup_community_add");
		$("#popup_community_add form")[0].reset();
		if($("#popup_community_add form").find(".answer").length > 0){
			$("#popup_community_add input[name='title']").val($("#postTitle").text()+ " 에 대한 답변");
		}
		return false;
	});
	$("#popup_community_add .submit .btn02").click(function() {
		$('.pp01').hide();
		return false;
   });
	// 팝업 - 전거레코드
	$("#open_authority_organization").bind('click', function() {
		open_popup("#popup_authority_organization");
		return false;
	});
	$(".authority_detail").bind('click', function() {
		atNo = $(this).data('authorityno');
		if(atNo) {
			open_popup("#at-" + atNo);
		}
		return false;
	});
	// 팝업 - 태그 신고
	$(".ng19 li a.close").bind('click', function(e) {
		var tagSeq = $(e.target).parent().parent().find(".tag").first().data('tag-seq');
		if($("#tag_seq").length > 0) {
			$("#tag_seq").attr("value", tagSeq);
		}
		open_popup("#popup_tag_complain");
		return false;
	});
	// 팝업 - 트랜스크립트 등록하기
	$(".regTranscript").bind('click', function() {
		open_popup("#popup_insert_transcript");
		return false;
	});
	// 팝업 - 메인 반갑습니다 : 메인슬라이더 적용으로 주석처리
/*
	var welcome = window.getCookie("welcome");
	if(welcome == undefined) {
		$('.hd01').css('background-image', "url(/images/bg_header_main01.png)");
		$('.inner2 .td03').html('<a class="greeting" href="#" onclick="open_popup(\'#popup_main_greeting\')">반갑습니다!</a>');
		$("header .td03 a.greeting").bind('click', function() {
			open_popup("#popup_main_greeting");
			$.cookie('welcome', 1);
			return false;
		});
	}
*/
	
	// 팝업 - 푸터 오시는길
	$("footer .bottomA .ng22 .map a").bind('click', function() {
		open_popup("#popup_footer_map");
		$("#popup_footer_map .popupBox").css({
			top:"inherit",
			bottom:70
		});
		return false;
	});

	//상세검색폼
	$('.cf09 .keywords ul li.add button').on('click', function(event) {
		var ul = $(this).parents(".keywords ul");
		var index = ul.find("li").length;
		var group = "1";
		if(ul.find("li:first-child input").attr("name") == "search_d_keyword21")	group = "2";
		$('li.add',ul).before('<li class="l'+index+'"><input type="text" name="search_d_keyword'+group+index+'"/></li>');
		return false;
	});
	$('.cf09 .fields .keyword button').on('click', function(event) {
		var ul = $(this).siblings("ul");
		var index = ul.find("li").length+1;
		var group = ul.attr("group-index");
		var first_child = $("li",ul).first();
		var label_text = first_child.find("label").text();
		ul.append('<li class="l'+index+'"><label for="search_d_keyword'+group+index+'">'+label_text+'</label><input type="text" name="search_d_keyword'+group+index+'" id="search_d_keyword'+group+index+'"/><select name="search_d_andor'+group+index+'"><option value="">AND / OR</option><option value="and">AND</option><option value="or">OR</option></select></li>');
		return false;
	});
   $(".cf09 .dates a").bind('click', function() {
       $(this).siblings('input').focus();
		 return false;
   });

   //검색가이드
   $('.lc06 li dt a').bind("click",function(event){
   		if($(this).parents(".lc06 ul li").hasClass("on"))
       		$(this).parents(".lc06 ul li").removeClass("on");
       	else
       		$(this).parents(".lc06 ul li").addClass("on");
       return false;
   });
	//컬렉션 메인 이용자 즐겨찾기 모음 그리드 정렬
	var $grid01,$grid02,$grid03;
	if($('.lc07 .bookmarks').length > 0){
		$grid01 = $('.lc07 .bookmarks').masonry({
			itemSelector: '.box',
			gutter:'.gutter-sizer'
		});
		$grid01.imagesLoaded().progress( function() {
		  $grid01.masonry('layout');
		});
		$grid02 = $('.lc07 .bookmarks ul').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-item'
		});
		$grid02.imagesLoaded().progress( function() {
		  $grid02.masonry('layout');
		});
	}
	if($('.lc08').length > 0){
		$grid03 = $('.lc08').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-item'
		});
		$grid03.imagesLoaded().progress( function() {
		  $grid03.masonry('layout');
		});
	}
	$('.tbl03.collectionView2 .rightC').css({
		height : $('.tbl03.collectionView2 table').height()
	});
   //컬렉션 뷰, 오른쪽 이미지 갤러리 선택
   $('.fc13 .lc08 li a').bind("click",function(event){
		$(this).parents(".lc08").find("li").removeClass("on");
		$(this).parents(".lc08 li").addClass("on");
		var src = $("img",$(this)).attr("src");
		$(this).parents(".fc13").find(".ib02 a img").attr("src",src);
		return false;
   	});
	//연구가이드 링크이동 효과
	if($('body').hasClass('pc')) {
		var headRoom = 125;
	} else {
		var headRoom = 25;
	}
	$(".ng13 li a").click(function(event){
		$('html,body').animate({scrollTop:$(this.hash).offset().top - headRoom}, 300,"linear");
	});
	//탐색 메인 유형열기 type01
	$(".menuA .fcs02.close dt a").click(function(event){
		var obj = $(this).parent().parent();
		if(obj.hasClass("close")){
			obj.removeClass("close");
			$("dd",obj).slideDown();
		}else{
			obj.addClass("close");
			$("dd",obj).slideUp();
		}
		return false;
	});
	//탐색 메인 유형열기 type02
	$(".menuA02 .fcs02.close dt a:not(.menuA02 .fcs02.noChild dt a)").click(function(event){
		var obj = $(this).parent().parent();
		var sub_menu = $(this).parents(".fcs02").find("ul.ng03");
		var target = $(this).parents(".fcs01").find(".subMenuA");
		var fcs02s = $(this).parents(".fcs01").find(".fcs02");
		if(!obj.hasClass("opened")){
			fcs02s.removeClass("opened");
			obj.addClass("opened");
			target.empty();
			target.append(sub_menu.clone());
			target.slideDown();
		}else{
			obj.removeClass("opened");
			target.slideUp();
		}
		return false;
	});

	//발간등록신청
	apply_publish();
	//컬렉션에디터
	collection_editor();

	//입력폼 유효성 검사
	form_validation();

	//쿠키수집 안내창
	var check_use_cookie = window.getCookie("check_use_cookie");

	if(check_use_cookie == undefined || check_use_cookie != 'confirm') {
		$('#cookie-bar').show();
	} else {
		$('#cookie-bar').hide();
	}
	$('#cookie-bar a.close').click(function(event){
		$('#cookie-bar').hide();
		$.cookie('check_use_cookie', 'confirm');
	});
	//아이템 뷰 페이지 인쇄
	$('.itemButtons .print').click(function(event){
		var img_area = $('<div id="print_img_area"><h2>링크</h2></div>');
		$('.ib06').each(function(){
			var src = $(this).find('embed').attr("src");
			var title = $(this).find('h6').text();
			img_area.append('<dl><dt>'+title+'</dt><dd>'+src+'</dd></dl>');
		});
		$('.ib03 .slide li img').each(function(){
			var src = $(this).attr("src");
			var title = $(this).attr("alt");
			img_area.append('<dl><dt>'+title+'</dt><dd>'+src+'</dd></dl>');
		});
		$('.fc11 .leftA').append(img_area);
		window.print();
		$('.fc11 .leftA #print_img_area').remove();
		return false;
	});
	//검색결과 인쇄
	$('.printResult').click(function(event){
		window.print();
		return false;
	});
	//이미지 가로-세로 비율
	/*
	$('img').each(function() {
		$(this).load(function(){
		  var fillClass = ($(this).height() > $(this).width())
		    ? 'fillheight' : 'fillwidth';
		  $(this).addClass(fillClass);
	  });
	});
	*/
	$("img").one("load", function() {
		var fillClass = ($(this).height() > $(this).width())
			? 'fillheight' : 'fillwidth';
		$(this).addClass(fillClass);
	}).each(function() {
	  if(this.complete) {
	      $(this).load(); // For jQuery < 3.0 
	      //$(this).trigger('load'); // For jQuery >= 3.0 
	  }
	});

	//콜랙션 모듈 - 전시아이템(소)
	$('.Tgallery.Msmall .slide').not('.form-item .Tgallery.Msmall .slide').not('.cf17 .Tgallery.Msmall .slide').slick({
		dots: false,
		infinite: false,
		initialSlide:0,
		slidesToShow: 4,
  		slidesToScroll: 1,
  		responsive: [
		    {
		      breakpoint: 768,
		      settings: {
		        slidesToShow: 2,
		        slidesToScroll: 2
		      }
		    }
		]
	});
	//콜랙션 모듈 - 사진목록
	if($('.Tpicture.Mmasonry').length > 0){
		var $mas01 = $('.Tpicture.Mmasonry .masonry').masonry({
			itemSelector: '.mBox',
			gutter:'.gutter-sizer'
		});
		$mas01.imagesLoaded().progress( function() {
		  $mas01.masonry('layout');
		});
	}
	//콜랙션 갤러리 가로형 슬라이드
	$('.daCol.gallery.horizontal').on('init', function(){
        var pager = $(this).find('ul.slick-dots');
        $(this).siblings('.ng18_01').find('.pagingA').append(pager);
      });
	$('.daCol.gallery.horizontal').on('beforeChange', function(slick, currentSlide, nextSlide){
        if(device_status == "mobile"){
        	$('html,body').animate({scrollTop:$(this).offset().top}, 500,"linear");
        }
      });
	$('.daCol.gallery.horizontal').slick({
		dots: true,
		infinite: false,
		initialSlide:0,
		adaptiveHeight:true
	});
   $('.ng18_01 .btnA a.btn02').bind("click",function(event){	// 슬라이드 처음으로
   		$('.daCol.gallery.horizontal').slick('slickGoTo',0);
	});
 

   //문의신청 탭메뉴
   $('.fc16.inquery .ng16 li a').bind("click",function(event){
       $(this).parent().siblings().removeClass("on");
       $(this).parent().addClass("on");
       var root = $(this).parents('.fc16');
       if($(this).attr('data-select') == "inquery"){
       		root.removeClass("visit").addClass("inquery");
       }else{
       		root.removeClass("inquery").addClass("visit");
       }
       return false;
   });
   //보관함 지우기
   	$(".lc14_02 ul li a.delete").bind('click', function() {
		$(this).parent("li").remove();
		return false;
   });
   //보관함 드레그앤드롭
   	$(".lc14_02 ul li > a em").draggable({
   		revert: "invalid",
   		cursor: "move",
   		helper: "clone",
   	});
   	//패싯검색 그룹 열기/닫기
	$(".cf04 dl dt a.mobileToggle").click(function(){
		var dl = $(this).parents("dl");
		if(dl.hasClass("mobileClosed"))	dl.removeClass("mobileClosed");
		else dl.addClass("mobileClosed");
		return false;
	});
   $(".cf04 dl dd li input").click(function(){
        if($(this).prop("checked")){
            $(this).parent().addClass("active");
            $(this).siblings("label").find("a").click();
        }else{
            $(this).parent().removeClass("active");
        }
    });

   	//소개페이지 인사말 열기/닫기
	$(".con06 .unit02 .toggle").click(function(){
		$(this).parent().toggleClass("opened");
		return false;
	});
   	//조직표 업무내용 열기/닫기
	$(".con04_02 .unit .task .toggle").click(function(){
		$(this).parent().toggleClass("opened");
		return false;
	});
   	//추진경과 열기/닫기
	$(".con01 .unit01 .history dd li .toggle").click(function(){
		$(this).parent().toggleClass("opened");
		return false;
	});
   	//추진경과 열기/닫기
	$(".th09 dl dd .toggle").click(function(){
		$(this).parent().toggleClass("opened");
		return false;
	});
	//회원가입 폼 회원유형 선택 제한
	$(".cf05.join .check2 input[type='checkbox']").click(function(){
		if($(".cf05.join .check2 input[type='checkbox']:checked").length > 2){
			return false;
		}
	});


//	$('.ng16 li').droppable({
//      drop: function( event, ui ) {
//      	$(this).removeClass( "ui-state-highlight" );
//        console.log(event);
//        console.log(ui.draggable[0]);
//        var item = ui.draggable[0];
//        var tab = event.target;
//        var itemUuid = item.data('itemUuid');
//        var reqType = tab.data('type');
//
//		$.ajax({
//			method : "POST",
//			url : '/ajax/requestInfoType',
//			dataType : "json",
//			data : {"itemUuid": "${item.itemUuid}", "reqType": "reqType" },
//			beforeSend:function(xhr){
//	             xhr.setRequestHeader(header, token);
//	        },
//		}).done(function(){
//			alert("이 아이템을 보관함에 담았습니다.");
//		}).fail(function(xhr, ajaxOptions, thrownError) {
//			var error_result = null;
//			error_result = JSON.parse(xhr.responseText);
//			console.log(error_result.exceptionMessage);
//		});
//
//      },
//      over: function( event, ui ) {
//        $(this).addClass( "ui-state-highlight" );
//      },
//      out: function( event, ui ) {
//        $(this).removeClass( "ui-state-highlight" );
//      }
//    });



});

window.getCookie = function(name) {
  match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  if (match) return match[1];
}

function check_overlap(category){	//중복체크
	$('.ib01 .slide li a').each(function(){
		if($(this).text() == category) return false;
		//console.log($(this).text() + "=="+ category);
	})
	return true;
}

//팝업오픈
function open_popup(selector){
	var $layerPopupObj = $(selector + ' .popupBox');
	var leftV = ( $(window).scrollLeft() + ($(window).width() - $layerPopupObj.width()) / 2 );
	var topV = ( $(window).scrollTop() + 100 );
	$layerPopupObj.css({
		left:leftV,
		top:topV
	});
	$(selector).fadeIn();
}

//PC버젼 초기화
function init_pc(){
	$("header nav").show();
	$(".mobileMenuOpen").unbind();
	$(".mobileMenuClose").unbind();
	$(".ng05>li>a").unbind();
	$(".ng05>li>dl li a").unbind();
	$(".cf04>dl").removeClass('mobileClosed');
	$(".tt01, .tt02").unbind();
	$(".ng05").show();
	
	//메인 배너 화면 꽉채우기
	if(window.innerHeight >= main_min_height) {
		//$("header.hd01").height(window.innerHeight - $("#seoul-common-gnb").height());
		$("header.hd01").height(window.innerHeight - 48);
		$('.main-slider').css('height', $('header').height() + 'px');
		$('.main-slider .slide').css('height', $('header').height() + 'px');
	} else {
		//$("header.hd01").height(main_min_height - $("#seoul-common-gnb").height());
		$("header.hd01").height(main_min_height - 48);
		$('.main-slider').css('height', $('header').height() + 'px');
		$('.main-slider .slide').css('height', $('header').height() + 'px');
	}
	header_height = $("header").height();

	//검색창 제어
	$("header .menu li.search > a").click(function(){
		$("header").addClass("searchMode");
		$("header.hd01.searchMode .cf02").css('width',$("header.hd01 .inner2").width());
		return false;
	});
	$("header .menu li > a:not(li.search > a)").click(function(){
		$("header").removeClass("searchMode");
	});
	$(".cf02 .closeBtn").click(function(){
		$("header").removeClass("searchMode");
		return false;
	});
	//관리자 메뉴
	var sub_height = $(".ng05>li.on dl dt").outerHeight() + $(".ng05>li.on dl dd").outerHeight();
	if($(".ng05").outerHeight() < sub_height)	$(".ng05").css("height",sub_height);

	$(".ng05>li>a").click(function(){	//1depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");

		if($(".fc05").hasClass("viewMode")){
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
			var dl = $(this).siblings("dl");
			dl.css({
				left:"30%"
			});
			dl.animate({
				left: "80%"
			}, 300, function() {
			});

		}else{
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
			$(this).siblings("dl").css({
				left:"80%"
			});
		}
		$(".ng05 li li").removeClass("on");
		var sub_height = $(this).siblings("dl").find("dt").outerHeight() + $(this).siblings("dl").find("dd").outerHeight();
		if($(".ng05").outerHeight() < sub_height)	$(".ng05").css("height",sub_height);
		return false;
	});
	$(".ng05>li>dl li a").click(function(){	//2depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		if($(".fc05").hasClass("twoMode")){
			var dl = $(this).parentsUntil(".ng05>li","dl");
			dl.animate({
				left: "30%"
			}, 300, function() {
				$(".fc05").removeClass("twoMode").removeClass("oneMode");
				$(".fc05").addClass("viewMode");
			});
		}else{
			//$(".fc05").removeClass("twoMode").removeClass("oneMode");
			//$(".fc05").addClass("viewMode");
		}

//		return false;
	});
	//툴팁 오브제 효과
	$(".tt01, .tt02").click(function(){
		$(".tooltip",$(this)).toggle();
	});
	$(document).mouseup(function(e) {
        var container = $('.tt01, .tt02');
        if(container.has(e.target).length === 0) {
            $(".tooltip",container).hide();
        }
    });

}
//모바일 버젼 초기화
function init_mobile(){
	//모바일 메뉴
	$("header nav").hide();
	$("header .menu li.search a").unbind();
	$("header .menu li a:not(li.search a)").unbind();
	$(".cf02 .closeBtn").unbind();
	$(".ng05>li>a").unbind();
	$(".ng05>li>dl li a").unbind();
	$(".tt01, .tt02").unbind();
	$(".tt01 .tooltip, .tt02 .tooltip").unbind();
	$(".cf04>dl:not(.cf04>dl.mobileClosed)").addClass('mobileClosed');

	$("header.hd01").height(340);
	$('.main-slider').css('height', $('header').height() - 68 + 'px');
	$('.main-slider .slide').css('height', $('header').height() - 68 + 'px');

	//헤더 LNB 메뉴(mobile)
	$("header .mobileMenuOpen").bind("click",function(){
		$("header nav").slideDown();
		$("header").addClass("open");
		$("body").css({overflow:'hidden'}).bind('touchmove', function(e){e.preventDefault()});

	});
	$("header .mobileMenuClose").bind("click",function(){
	   	$("header nav").slideUp();
		$("header").removeClass("open");
		$("body").css({overflow:'visible'}).unbind('touchmove');

	});
	//관리자 메뉴 열기/닫기
	$(".ng12 .mobileMenuOpen").bind('click', function() {
		$(".ng05").slideDown("fast");
		$(".ng12 .mobileMenuOpen").css("display","none");
		$(".ng12 .mobileMenuClose").css("display","inline-block");
	});
	$(".ng12 .mobileMenuClose").bind('click', function() {
		$(".ng05").slideUp("fast");
		$(".ng12 .mobileMenuOpen").css("display","inline-block");
		$(".ng12 .mobileMenuClose").css("display","none");
	});
	//관리자 메뉴
	$(".ng05>li>a").click(function(){	//1depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");

		if($(".fc05").hasClass("viewMode")){
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
		}else{
			$(".fc05").removeClass("viewMode").removeClass("oneMode");
			$(".fc05").addClass("twoMode");
		}
		$(".ng05 li li").removeClass("on");
		return false;
	});
	$(".ng05>li>dl li a").click(function(){	//2depth menu click
		$(this).parent().siblings().removeClass("on");
		$(this).parent().addClass("on");
		if($(".fc05").hasClass("twoMode")){
			$(".fc05").removeClass("twoMode").removeClass("oneMode");
			$(".fc05").addClass("viewMode");
		}
		$(".ng05").slideUp();
		$(".ng12 .mobileMenuOpen").css("display","inline-block");
		$(".ng12 .mobileMenuClose").css("display","none");
		return true;
	});
	//툴팁 오브제 효과
	$(".tt01, .tt02").click(function(){
		if($(".tooltip",$(this)).css("display") == "block")
			$(".tooltip",$(this)).fadeOut();
		else
			$(".tooltip",$(this)).fadeIn();
	});
}

//폼 유효성 검사
function form_validation(){
	//헤더 검색창
	$(".cf02, .cf12 form, .cf13, .cf19.searchPicture").bind('submit', function() {
		var input = $("input",$(this));
		if(input.val().trim() == ""){
			alert("검색어를 입력해 주세요");
			input.focus();
			return false;
		}
		else
			return true;
	});

	$(".cf05.join").validate({
		rules: {
			userEmail: {
				required: true,
				email: true
			},
			userPasswd: {
				required: true,
				minlength: 8
			},
			userPasswdCirt: {
				equalTo: "#userPasswd"
			},
			agree01: "required",
			agree02: "required"
		},
		messages: {
			join_email: "올바른 이메일 주소를 입력하세요",
			join_pw: "적절한 비밀번호를 입력하세요",
			join_pw2: "입력한 비밀번호가 일치하지 않습니다",
			join_agree1: "[동의 필요]",
			join_agree2: "[동의 필요]"
		}
	});
	$(".cf05.login").validate({
		rules: {
			login_email: {
				required: true,
				email: true
			},
			login_pw: {
				required: true,
				minlength: 8
			}
		},
		messages: {
			login_email: "올바른 이메일 주소를 입력하세요",
			login_pw: "적절한 비밀번호를 입력하세요"
		}
	});
	$(".cf05.resetPassword").validate({
		rules: {
			userEmail: {
				required: true,
				email: true
			}
		},
		messages: {
			userEmail: "올바른 이메일 주소를 입력하세요"
		}
	});
	$(".cf05.resetPassword2").validate({
		rules: {
			reset_pw: {
				required: true,
				minlength: 8
			},
			reset_pw2: {
				equalTo: "#reset_pw"
			}
		},
		messages: {
			reset_pw: "적절한 비밀번호를 입력하세요",
			reset_pw2: "입력한 비밀번호가 일치하지 않습니다"
		}
	});
	$(".cf07.noticeWrite").validate({
		rules: {
			notice_title: "required",
			notice_summery: "required",
			notice_content: "required",
			notice_target: "required"
		},
		messages: {
			notice_title: "제목을 입력해 주세요",
			notice_summery: "요약내용을 입력해 주세요",
			notice_content: "내용을 입력해 주세요",
			notice_target: "발행할 대상을 선택해 주세요"
		}
	});
	$(".cf07.cartRegiter").validate({
		rules: {
			contactName: "required",
			email: {
				required: true,
				email: true
			},
			phone: {
				required: true,
			    number: true
			},
			content: {
				required: true,
				minlength: 2
			}
		},
		messages: {
			cart_name: "이름을 입력해 주세요",
			cart_email: "올바른 이메일을 입력해 주세요",
			cart_phone: "연락처를 입력해 주세요",
			cart_purpose: "사용 목적을 가급적 자세히 입력해 주세요"
		}
	});
	$(".cf11.inquery").validate({
		onkeyup: function(element) {$(element).valid()},
		onclick: function(element) {$(element).valid()},
		rules: {
			contactName: "required",
			email: {
				required: true,
				email: true
			},
			contactPhone: {
				required: true
			},
			inquiryType: "required",
			etc: {
                required: true,
                minlength: 10,
                maxlength: 2000
            }
		},
		messages: {
			contactName: "이름을 입력해 주세요",
			email: "올바른 이메일을 입력해 주세요",
			contactPhone: "연락처를 입력해 주세요",
			inquiryType: "분야를 선택해 주세요",
			etc: {
                required: "본문을 10자 이상 2000자 이하로 입력해 주세요.",
                minlength: "본문을 10자 이상 입력해 주세요",
                maxlength: "본문을 2000자 이내로 입력해 주세요"
            }
		}
	});
	$(".cf11.visit").validate({
		onkeyup: function(element) {$(element).valid()},
		onclick: function(element) {$(element).valid()},
		rules: {
			contactPart: "required",
			contactName: "required",
			email: {
				required: true,
				email: true
			},
			visitDate: "required",
			visitNumber: "required",
			contactPhone: "required",
			etc: "required",
			agree: "required"
		},
		messages: {
			contactPart: "단체명을 입력해 주세요",
			contactName: "이름을 입력해 주세요",
			email: "올바른 이메일을 입력해 주세요",
			visitDate: "방문일시를 입력해 주세요",
			visitNumber: "방문자수를 입력해 주세요",
			contactPhone: "연락처를 입력해 주세요",
			etc: "문의 내용을 좀 더 자세히 입력해주세요",
			agree: ""
			//개인정보 제공에 동의해주세요
		}
	});
	$("#popup_report_error .cf08").validate({
		rules: {
			error_email: {
				required: true,
				email: true
			},
			error_desc: {
				required: true,
				minlength: 10
			}
		},
		messages: {
			error_email: "올바른 이메일을 입력해 주세요",
			error_desc: "내용은 10자 이상 입력해 주세요"
		}
	});
	$("#popup_community_add .cf08").validate({
		rules: {
			title: "required",
			body: "required"
		},
		messages: {
			title: "본문 내용을 입력해주세요",
			body: "본문 내용을 입력해주세요"
		}
	});
	//발간등록 신청
	$(".cf14.regiserPublishForm").validate({
		onkeyup: function(element) {$(element).valid()},
		onclick: function(element) {$(element).valid()},
		onchange: function(element) {$(element).valid()},
		rules: {
			prt_pub_kikwan: "required",
			prt_pub_place: "required",
			prt_pub_tel: "required",
			prt_arc_title: "required",
			prt_arc_service: "required",
			prt_arc_media_text: "required",
			prt_arc_contents: "required",
			prt_reg_name: "required",
			prt_reg_passwd: "required",
			prt_reg_passwd_check: {
				equalTo: "#user-pass"
			},
			prt_reg_email: {
				required: true,
				email: true
			},
			prt_reg_kikwan: "required",
			prt_reg_tel: "required"
		},
		messages: {
			prt_pub_kikwan: "",
			prt_pub_place: "",
			prt_pub_tel: "",
			prt_arc_title: "",
			prt_arc_service: "",
			prt_arc_media_text: "",
			prt_arc_contents: "",
			prt_reg_name: "",
			prt_reg_passwd: "",
			prt_reg_passwd_check: "",
			prt_reg_email: "",
			prt_reg_kikwan: "",
			prt_reg_tel: ""
		}

	});

}


//발간등록신청
function apply_publish(){

	// 발간등록신청-간행물 변경신청
	$("div.request-pattern input:eq(0)").click(function(){
		$("#request-pattern-update input:eq(1)").removeAttr("checked");
		$("#request-pattern-update input:eq(2)").removeAttr("checked");
		$("#request-pattern-update input:eq(3)").removeAttr("checked");
		$("#request-pattern-update input:eq(4)").removeAttr("checked");
		$("#change-reason").val("");
		$("#change-publication-no").val("");
		$("#request-pattern-update").hide();
		$(this).parents("div.request-pattern").removeClass("opened");
	});
	$("div.request-pattern input:eq(1)").click(function(){
		$("#request-pattern-update").show();
		$(this).parents("div.request-pattern").addClass("opened");
	});

	$("#change-reason").attr("disabled", "disabled");
	$("#request-pattern-update input:eq(4)").change(function(){
		if(this.checked) {
			$("#change-reason").val("");
			$("#change-reason").removeAttr("disabled");
			$("#change-reason").focus();
		} else {
			$("#change-reason").val("");
			$("#change-reason").attr("disabled", "disabled");
		}
	});
	// 발간등록신청-신청 기관과 동일한 기관
	$("div.publication-public input:eq(0)").click(function(){
		$("#publication-organ").val($("#belong-to").val());
		$("#publication-depart").val($("#division").val());
		$("#organ-number").val($("#phone").val());
		$("#organ-fax").val($("#fax-nums").val());
	});
	$("div.publication-public input:eq(1)").click(function(){
		$("#publication-organ").val("");
		$("#publication-depart").val("");
		$("#organ-number").val("");
		$("#organ-fax").val("");
	});

	// 발간등록신청-발간매체
	$("#publication-media").attr("disabled", "disabled");
	$("#publication-media-select").change(function(){
		if(this.selectedIndex == 4) {
			$("#publication-media").val("");
			$("#publication-media").removeAttr("disabled");
			$("#publication-media").trigger( "keyup" );
			$("#publication-media").focus();
		} else {
			$("#publication-media").val(this.value);
			$("#publication-media").trigger( "keyup" );
			$("#publication-media").attr("disabled", "disabled");
		}
	});

	// 발간등록신청-이용동의
	$("#cause").attr("disabled", "disabled");
	$("div.selection-agree input:eq(0)").click(function(){
		$("#cause").val("");
		$("#cause").attr("disabled", "disabled");
	});
	$("div.selection-agree input:eq(1)").click(function(){
		$("#cause").val("");
		$('#cause').removeAttr("disabled");
		$("#cause").focus();
	});

	// 발간등록신청-공개구분
	$("div.openning-pattern input:eq(0)").click(function(){
		$("#reason").val("");
		$("#start-year").val("");
		$("#start-month").val("");
		$("#end-year").val("");
		$("#end-month").val("");
		$("#reason").attr("disabled", "disabled");
		$("#start-year").attr("disabled", "disabled");
		$("#start-month").attr("disabled", "disabled");
		$("#end-year").attr("disabled", "disabled");
		$("#end-month").attr("disabled", "disabled");
		$("#openning-limit").hide();
		$("#openning-reason").hide();
		$("#term").hide();
		$("input[name=prt_arc_opendivs]").each(function(i){
			$(this).attr("checked", false);
		});
	});
	$("div.openning-pattern input:eq(1)").click(function(){
		$("#reason").val("");
		$("#start-year").val("");
		$("#start-month").val("");
		$("#end-year").val("");
		$("#end-month").val("");
		$("#reason").removeAttr("disabled");
		$("#start-year").removeAttr("disabled");
		$("#start-month").removeAttr("disabled");
		$("#end-year").removeAttr("disabled");
		$("#end-month").removeAttr("disabled");
		$("#openning-limit").show();
		$("#openning-reason").show();
		$("#term").show();
	});
	$("div.openning-pattern input:eq(2)").click(function(){
		$("#reason").val("");
		$("#start-year").val("");
		$("#start-month").val("");
		$("#end-year").val("");
		$("#end-month").val("");
		$("#reason").removeAttr("disabled");
		$("#start-year").removeAttr("disabled");
		$("#start-month").removeAttr("disabled");
		$("#end-year").removeAttr("disabled");
		$("#end-month").removeAttr("disabled");
		$("#openning-limit").show();
		$("#openning-reason").show();
		$("#term").show();
	});


	var caller_button;
	// 어드민 정부간행물 발간등록 및 송부-상태변경
	$(".tbl01.adminRPL .t08 .btn01").click(function(){
		caller_button = $(this);
		var current_status = "change_status" + $(this).attr("data-status");
		open_popup("#popup_change_publish_status");
		$("#popup_change_publish_status form input#" + current_status).prop('checked',true);
		return false;
	});
	$("#popup_change_publish_status form").submit(function(){
		var changed_status = $("input:radio[name=change_status]:checked",$(this)).val();
		var changed_text = ['','신청','번호생성','반려','처리완료'];
		caller_button.html(changed_text[Number(changed_status)]);
		caller_button.attr("data-status",changed_status)
		$("#popup_change_publish_status").hide();
		return false;
	});
	// 트랜스크립트 대상 찾기 팝업
	$("#popup_insert_transcript form").submit(function(){
		if($(this).find('.query input').val() == ""){
			alert("검색할 아이템 코드 혹은 제목을 입력해 주세요.");
			return false;
		}

		//비동기 호출 코드 추가
		$("#search_result_area").slideDown();
		return false;
	});

}

//관리자 - 콜랙션 에디터
var variable_file_count = 0;	//파일 업로드 요소 개수
var $masonry_obj;	//파일 업로드 요소 개수
function collection_editor(){
	create_droper($(".section-wrapper")) //첫번째 섹션의 드롭영역 정의

	function create_droper(droper){	//드롭영역 정의 함수
		droper.sortable({
	      revert: true,
	      axis: "y",
	      cancel : ".inner"
	    });
	    $( ".item-group li.form-item" ).draggable({
	      connectToSortable: ".section-wrapper",
	      helper: "clone",
	      revert: "invalid"
	    });
	    //$( ".section-wrapper, .section-wrapper li, .item-group, .item-group li" ).not(".summernote").disableSelection();
	    
	    if($(".collection-basic-info input[name=type]").is(':checked')) { // 컬렉션 유형별 요소 블록 초기화
	    	currentType = $(".collection-basic-info input[name=type]:checked").val();
	    	//currentTypeClass = currentType.replace(/(\-\w)/g, function(m){return m[1].toUpperCase()});
	    	//if (currentType == 'photo') currentTypeClass = 'picture';
	    	currentTypeClass = currentType.split('-')[0];
	    	$('.stencilG').hide(); 
	    	if(currentType.split('-')[1] == "hor"){
	    		$('.stencilG.' + currentTypeClass).show();
	    	}else{
	    		$('.stencilG.common, .stencilG.' + currentTypeClass).show();
	    	}
	    	
	    }

		droper.droppable({	//아이템 드레그 완료시
	    	drop: function( event, ui ) {
				$('.field--section-unit').removeClass( "on-focus" );
				if(ui.draggable.has('.item-control').length < 1){
					ui.draggable.append($('<div class="item-control"><a class="item-move"><i class="xi-arrows"></i></a><a href="#" class="item-remove"><i class="xi-close"></i></a></div>'));
					//썸네일이 있는 경우
					if(ui.draggable.has('.thumb').length > 0){
						ui.draggable.find('.thumb').append($('<input type="file" accept=".jpg, .jpeg, .jpe, .gif, .png" class="ti01" name="image" /><div class="fake"><span>../image-tile/around_seoul_1886/129367.jpg</span><input type="text" data-name="file_id" value="" /><input type="text" data-name="image" value="" /><input type="text" data-name="code" value="" /><a class="btn01 local" href="#">이미지 선택</a><a class="btn02 item" href="#">아이템 선택</a></div>'));
					}
					//전시섹션일 경우
					if(ui.draggable.has("[name='locate']").length > 0){
						ui.draggable.find("[name='locate']").attr("name", "locate"+$(".collection-wrapper").find("[name^='locate']").length/2);
						ui.draggable.find("[name^='locate'][value='left']").prop("checked", true);
					}
				}
				if($('.Tpicture.Mmasonry').length > 0){	//사진컬렉션 생성
					$masonry_obj = $('.Tpicture.Mmasonry .masonry').masonry({
						itemSelector: '.mBox',
						gutter:'.gutter-sizer'
					});
					$masonry_obj.imagesLoaded().progress( function() {
					  	$masonry_obj.masonry('layout');
					});
				}
				//editor add
				if(ui.draggable.has('textarea').length > 0){
					$(ui.draggable.find("textarea")).each(function() {
						if($(this).data("type") == "smnt"){
							$(this).closest(".divSmnt").find("[name='tmpSmnt']").addClass("summernote");
							var editor = ui.draggable.find(".summernote");
							makeSmntEditor($(editor), '', $(this).data("height"), '');
							$(this).hide();
						}
					});
				}
			},
	    	over: function( event, ui ) {
				$(this).parents('.field--section-unit').addClass( "on-focus" );
			},
	    	out: function( event, ui ) {
				$(this).parents('.field--section-unit').removeClass( "on-focus" );
			}
	    });
		return droper;
	}
	$(document).on('click','.form-item .item-control .item-move',function(){	//콜랙션 에디터 요소 이동
		var ele = $(this).parents('.form-item');
		ele.draggable({
			connectToSortable: ".section-wrapper"
		});
		return false;
	});
	$(document).on('click','.form-item .item-control .item-remove',function(){	//콜랙션 에디터 요소 삭제
		var ele = $(this).parents('.form-item');
		ele.remove();
		return false;
	});
	$('.add--section-unit button').click(function(){	//콜랙션 에디터 섹션 추가
		var ele = $('<div/>').addClass('field--section-unit');
		ele.append($('<dl class="section_title"><dt>섹션</dt><dd>컬렉션 내에 주요한 영역을 나눕니다.</dd></dl>'));
		ele.append($('<a class="close-section"><i class="xi-close"></i></a>'));
		ele.append($('<div class="section-title-area"><label class="js-form-required form-required">섹션제목</label><input class="js-text-full text-full form-text required" type="text" value="" maxlength="255" placeholder="섹션제목" required="required" aria-required="true" /></div>'));
		ele.append($('<ul class="section-wrapper grid"></ul>'));
		ele.insertBefore('.collection-wrapper .add--section-unit');
		create_droper($('.section-wrapper',ele))
	});
	$(document).on('click','.field--section-unit .close-section',function(event){	//콜랙션 에디터 섹션 삭제
		event.stopPropagation();
		var section = $(this).parents('.field--section-unit');
		section.remove();
	});
    $(document).on('click',".form-item .thumb .fake a.local", function(e) {	//콜랙션 에디터 이미지 선택 (생성)
    	$(this).parent('.fake').siblings('.ti01').click();
        return false;
    });
    $(document).on('change',".form-item .thumb .ti01", function() {	//콜랙션 에디터 이미지 선택
        readURL(this,$(this));
        $(this).siblings('.fake').find('span').text($(this).val());
        $(this).attr('id','input_file_'+variable_file_count);
        variable_file_count++;
    });
    function readURL(input,obj) {	//콜랙션 에디터 이미지 선택
    	if (input.files && input.files[0]) {
    		var reader = new FileReader();
    		reader.onload = function (e) {
    			obj.siblings('img').attr('src', e.target.result);
    			formData = new FormData();
                formData.append('image', obj[0].files[0]);
             
                $.ajax({
                    url: '/common/ajax/collectionImage',
                    contentType: false,
                    processData: false,
                    data: formData,
                    dataType: 'json',
                    type: 'POST',
                    beforeSend:function(xhr){
	       	             xhr.setRequestHeader('X-CSRF-TOKEN', $('input[name="_csrf"]').val());
	       	        },
                    success: function(data) {
                    	obj.siblings('img').attr('src', data.imageUrl);
                    	obj.siblings('.fake').find('span').text(data.imageUrl);
                    	obj.siblings('.fake').find('input[data-name="image"]').val(data.imageUrl);
                    	obj.siblings('.fake').find('input[data-name="file_id"]').val(data.seq);
                    },
                    error: function(e) {
                    	alert("이미지를 업로드할 수 없습니다.");
                    }
                });
                
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    var caller;
    $(document).on('click',".form-item .thumb .fake a.item", function(e) {	//콜랙션 에디터 아이템 추가 팝업열기
    	e.preventDefault();
    	e.stopPropagation();
		open_popup("#popup_collection_item");
		caller = $(this).closest('.thumb');
		return false;
	});
	$("#popup_collection_item form").submit(function(){	//콜랙션 에디터 아이템 팜업에서 검색
		if($(this).find('.query input').val() == ""){
			alert("검색할 아이템 코드 혹은 제목을 입력해 주세요.");
			return false;
		}
	});
	$("#search_result_area").on('click', '.btn03', function(){	//콜랙션 에디터 아이템 팝업에서 추가
		caller.find('img').attr("src",$(this).attr('data-image-url'));
		var title = $(this).parent().siblings('.title').text();
  		var list_type = caller.parents('li:not(li.form-item)');	//리스트 타입 여부 판단

    	if(list_type.length > 0){	//리스트 타입인 경우
    		list_type.find('input[data-name="name"]').val(title);
    		list_type.find('input[data-name="title"]').val(title);
    		list_type.find('input[data-name="image"]').val($(this).attr('data-image-url'));
    		list_type.find('input[data-name="code"]').val($(this).attr('data-code'));
    	}else{	//단독형인 경우
    		caller.closest('.item-content').find('input[data-name="name"]').val(title);
    		caller.closest('.item-content').find('input[data-name="title"]').val(title)
    		caller.closest('.item-content').find('span').html($(this).attr('data-image-url'));
    		caller.closest('.item-content').find('input[data-name="image"]').val($(this).attr('data-image-url'));
    		caller.closest('.item-content').find('input[data-name="code"]').val($(this).attr('data-code'));
    	}
    	$("#popup_collection_item #search_result_area").hide();
    	$("#popup_collection_item").hide();
		return false;
	});
    $(document).on('click',".form-item .Tgallery.Mmiddle a.add", function() {	//전시아이템(중) 리스트 추가
        var index = $(this).siblings('ul').find('li').length + 1;
        if(index > 3)	return false;
      	var li = $(this).siblings('ul').find('li').first().clone();
      	// 복사 후 초기화
       	li.find('.thumb img').attr('src', "/images/default.png").attr("alt", "");
       	li.find('.fake input[type=hidden]').each(function(i){$(this).val("")});
       	li.find('.conA input').val("");
       	li.find('.conA textarea').val("");
       	li.find(".note-editor").remove();
       	var textarea = li.find("textarea")[0];
       	var editor = li.find(".summernote");
		makeSmntEditor($(editor), '', '150', '');
		$(textarea).hide();
        li.insertBefore($(this).parent());
        $(this).siblings('ul').append(li);
        $(this).parent().removeClass('N01').removeClass('N02').removeClass('N03');
        if(index == 1)	$(this).parent().addClass('N01');
        else if(index == 2)	$(this).parent().addClass('N02');
        else if(index == 3)	$(this).parent().addClass('N03');
        return false;
    });
    $(document).on('click',".form-item .Tgallery.Mmiddle ul.inner > li a.remove", function() {	//전시아이템(중) 리스트 삭제
        var index = $(this).parent().parent().find('li').length - 1;
        if(index < 1)	return false;
        $(this).parents('.Tgallery.Mmiddle').removeClass('N01').removeClass('N02').removeClass('N03');
        if(index == 1)	$(this).parents('.Tgallery.Mmiddle').addClass('N01');
        else if(index == 2)	$(this).parents('.Tgallery.Mmiddle').addClass('N02');
        else if(index == 3)	$(this).parents('.Tgallery.Mmiddle').addClass('N03');
        $(this).parent().remove();
       return false;
    });
    $(document).on('click',".form-item .Tgallery.Msmall .addB a", function() {	//전시아이템(소) 리스트 추가
       	var li = $(this).parent().siblings().first().clone();
       	// 복사 후 초기화
       	li.find('.thumb img').attr('src', "/images/default.png").attr("alt", "");
       	li.find('.fake input[type=hidden]').each(function(i){$(this).val("")});
       	li.find('.meta input').val("");
       	li.find('.meta textarea').val("");
       	li.find(".note-editor").remove();
       	var textarea = li.find("textarea");
       	var editor = li.find(".summernote");
		makeSmntEditor($(editor), '', '150', '');
		$(textarea).hide();
        li.insertBefore($(this).parent());
        return false;
    });
    $(document).on('click',".form-item .Tgallery.Msmall .slide > li a.remove", function() {	//전시아이템(소) 리스트 삭제
        $(this).parent().remove();
        return false;
    });
    $(document).on('click',".form-item .Tpicture.Mmasonry .addB a", function() {	//사진리스트 추가
    	var li = $(this).parent().siblings().first().clone();
    	// 복사 후 초기화
       	li.find('.thumb img').attr('src', "/images/default.png").attr("alt", "");
       	li.find('.fake span').html("");
       	li.find('input').each(function(i){$(this).val("")});
       	li.find('textarea').each(function(i){$(this).val("").html("")});
       	li.insertBefore($(this).parent());
       	$masonry_obj = $(this).parent().parent().parent().masonry().masonry('reloadItems').masonry('layout');
        return false;
    });
    $(document).on('click',".form-item .Tpicture.Mmasonry ul > li a.remove", function() {	//사진리스트 삭제 
    	$(this).parent().remove();
    	$masonry_obj = $('.Tpicture.Mmasonry .masonry').masonry().masonry('layout');
        return false;
    });
	$(".collection-basic-info input[name=type]:radio").change(function () {
		$('.stencilG.common').show();
		$('.stencilA .stencilG').not('.stencilA .stencilG.common').hide();
		if($(this).val() == "blog"){
			$('.stencilA .stencilG.blog').show();
		}else if($(this).val() == "gallery-ver"){
			$('.stencilA .stencilG.gallery').show();
		}else if($(this).val() == "gallery-hor"){
			$('.stencilA .stencilG.gallery').show();
			$('.stencilG.common').hide();
		}else if($(this).val() == "picture"){
			$('.stencilA .stencilG.picture').show();
		}
	});
	
	// 사진 아카이브 페이징
	if($(".lc07 .more").length) {
		$(".lc07 .more").attr("href", "#" + $(".bookmarks .box").last().attr("id"))
		$(".lc07 .more").attr("data-page", "2");
		$(".lc07 .more").on('click', function(e){
			$('#loading').show();
			page = $(this).attr("data-page");
			html = '';
			elems = $();
			$.get("/collection/seoul-photo-archive/ajax", {page: page}, function(data){
				data = JSON.parse(data);
				$(".lc07 .more").attr("data-page", ++page);
				$.each(data.collections, function(i,c) {
					html += '<dl class="box" id="collection-' + c.id + '">';
					html += '<dt>' + c.title + '</dt><dd><ul>';
					$.each(data.photos[c.id], function(i,p){
						if(p.pid > 1 && p.pid < 5001) dir = 1; if(p.pid > 5001 && p.pid < 10001) dir = 5001; if(p.pid > 10001 && p.pid < 15001) dir = 10001; if(p.pid > 15001 && p.pid < 20001) dir = 15001; if(p.pid > 20001 && p.pid < 30001) dir = 20001; if(p.pid > 30001 && p.pid < 35001) dir = 30001; if(p.pid > 35001 && p.pid < 40001) dir = 35001; if(p.pid > 40001 && p.pid < 45001) dir = 40001; if(p.pid > 45001 && p.pid < 50001) dir = 45001; if(p.pid > 50001 && p.pid < 55001) dir = 50001; if(p.pid > 55001 && p.pid < 60001) dir = 55001; if(p.pid > 60001 && p.pid < 65001) dir = 60001; if(p.pid > 65001 && p.pid < 75001) dir = 65001; if(p.pid > 75001 && p.pid < 80001) dir = 75001; if(p.pid > 80001 && p.pid < 85001) dir = 80001; if(p.pid > 85001 && p.pid < 95001) dir = 85001; if(p.pid > 95001 && p.pid < 100001) dir = 95001; if(p.pid > 100001 && p.pid < 110001) dir = 100001; if(p.pid > 110001 && p.pid < 115001) dir = 110001; if(p.pid > 115001 && p.pid < 125001) dir = 115001; if(p.pid > 125001 && p.pid < 130001) dir = 125001; if(p.pid > 130001 && p.pid < 135001) dir = 130001; if(p.pid > 135001 && p.pid < 140001) dir = 135001; if(p.pid > 140001 && p.pid < 155001) dir = 140001; if(p.pid > 155001 && p.pid < 440001) dir = 155001; if(p.pid > 155001 && p.pid < 440001) dir = 440001;
						html += '<li class="grid-item"><a href="/collection/seoul-photo-archive/' + c.id + '">';
						html += '<img onerror="this.style.display=\'none\'" src="http://52.79.195.15/mstImg/' + dir + '/' + p.pid + '.JPG" alt="' + p.title + '"/></a></li>';
					});
					html += '</ul><a class="btn01" href="/collection/seoul-photo-archive/' + c.id + '">갤러리 미리보기</a></dd></dl>';
				});
				var elem = $(html);
		        elems = elems ? elems.add( elem ) : elem;
		        $('.lc07 .bookmarks').append(elems);
		        $('.lc07 .bookmarks').masonry('appended',elems);
		        $('.lc07 .bookmarks ul').masonry().imagesLoaded().progress( function() {
		        	$('.lc07 .bookmarks ul').masonry('layout');
		        	$('.lc07 .bookmarks').masonry('layout');
		        	$('#loading').hide();
				});
		        
		        lastId = data.collections[data.collections.length - 1].id;
				$(".lc07 .more").attr("href", "#collection-" + lastId);
				if(typeof data.end != 'undefined' && data.end == 1) {
					$(".lc07 .more").hide();
				}
			});
		});
	}
	
}

/*
 * file download cnt++
 */
function updateDownCnt(fileSeq){
	if(typeof fileSeq !== "undefined"){
		$.ajax({
			type: 'POST',
			dataType: 'json',
	        url: '/common/ajax/updateDownCnt',
	        data: { seq : fileSeq},
	        beforeSend:function(xhr){
	        	 xhr.setRequestHeader('X-CSRF-TOKEN', $('input[name="_csrf"]').val());
		    },
	        success: function(data) {
	        	//
	        },
	        error: function(e) {
	        	console.log(e);
	        }
	    });
	}
}

/**
 * summernote editor
 * @param obj
 * @returns
 */
function makeSmntEditor(obj, pWidth, pHeight, data){
	var width = (pWidth == ''?'100%':pWidth);
	var height = pHeight;
	$(obj).summernote({
		width: width,
		height: height,
		minHeight: null,
		maxHeight: null,
		lang: 'ko-KR',
		toolbar: [
			 ['style', ['bold', 'italic', 'underline', 'clear']]
			,['fontsize', ['fontsize']]
			,['color', ['color']]
			,['para', ['paragraph']]
			,['height', ['height']]
		],
		fontSizes: ['12', '14', '16', '18', '20', '24', '36'],
		disableDragAndDrop: true,
		disableResizeEditor: true,
		focus:true
	});
	if(data !== undefined && data != ""){
		$(obj).summernote("code", data);
	}
	$(obj).summernote({focus: true});
}

/**
 * UPFilter check(form)
 * @param fName : form name
 * @param func : return function name
 */
function UpFilterCheckByForm(fName, func){
	//dataSet
	var form = $('#'+fName)[0];
	var datas = new FormData(form);
	//UpAPI
	$.ajax({
		type : "POST",
		enctype: 'multipart/form-data',
		// url : "http://183.109.68.55:5500/UPServer/", //dev
		url : "https://api194.eseoul.go.kr:5443/UPServer/", //ops
		data:datas,
		contentType: false,
		processData: false,
		success : function(data) {
			UpFilterResult(data, func);
		},
		error : function(data) {
			alert("error");
		}
	});
}
/**
 * UPFilter check(param)
 * @param params : param array
 * @param func : return function name
 */
function UpFilterCheckByParam(param, func){
	//dataSet
	var datas = new FormData();
	for(var i=0; i<param.length; i++){
		datas.append("content"+i, param[i]);
	}
	//UpAPI
	$.ajax({
		type : "POST",
		enctype: 'multipart/form-data',
		// url : "http://183.109.68.55:5500/UPServer/", //dev
		url : "https://api194.eseoul.go.kr:5443/UPServer/", //ops
		data:datas,
		contentType: false,
		processData: false,
		success : function(data) {
			UpFilterResult(data, func);
		},
		error : function(data) {
			alert("error");
		}
	});
}
/**
 * UPFilter result
 * @param params : json reponse
 * @param func : return function name
 * @returns call function
 */
function UpFilterResult(json, func){
	var result = false;
	var types = [
		  "주민(외국인)번호"	//1
		, "카드번호"			//2
		, "여권번호"			//3
		, "운전면허번호"		//4
		, "휴대폰번호"			//5
		, "일반전화번호"		//6
		, "이메일"			//7
		, "건강보험번호"		//8
		, "은행계좌번호"		//9
		, "금칙어"			//10
	];
	var msg = "";
	var responsObj = JSON.parse(json);
	var privacyObj = responsObj.privacy;
	var privacyTypes =  privacyObj[0].privType.split(",");
	var privacyCntns =  privacyObj[0].privContent.split(",");
	if ( privacyObj[0].isPriv == "0" ){
		result = true;
	} else {
		msg += "개인정보가 포함된 데이터가 검출되었습니다.\n";
		msg += "--------------------------------\n";
		if(privacyTypes.length > 1){
			for(var j=0; j<privacyTypes.length; j++){
				msg += types[(privacyTypes[j]-1)] + " : " + privacyCntns[j] + "\n";
			}
		}else{
			msg += types[(privacyTypes-1)] + " : " + privacyCntns + "\n";
		}
		msg += "--------------------------------\n";
		msg += "정보보호를 위해 데이터 삭제 후 작업하시기 바랍니다.";
		console.log(msg);
		msg2 = '본문에 전화번호, 이메일 등 개인정보를 입력하실 수 없습니다.'
		alert(msg2);
		result = false;
	}
	if(result){
		window[func]();
	}
}

