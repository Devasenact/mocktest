(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

AOS.init();

//Tnc constent Asset    
$(".terms-container a").click(function(e){
    if ($("#popupRevealModal").length>0 && $(this).attr("href").indexOf("#")==0){
    e.preventDefault();
    var tempanchor=$(this).attr('href');
    try{ $("#popupRevealModal").scrollTop($("a[name='"+tempanchor.replace('#','')+"']")[0].offsetTop-50); }catch(e){}
    }
});
$(window).on('resize orientationchange', function() {
	    $('.ingredients-carousel').slick('resize');
}); 



// Customer Service page JS
if(app.variableMap.subscriberStatus != 'NotLoggedIn'){
	$(".hide-for-logged-in").css("display","none");
	$(".chat-block").css("display","block");
}else{
	$(".hide-for-logged-in").css("display","inline");
	$(".chat-block").css("display","none");
}

setInterval(function(){ 
    // toggle the class every five second
   setTimeout(function(){
     // toggle back after 1 second
     $('.freeship').toggleClass('promo');  
   });
},1500);

//ingredients Slider
$('.ingredients-carousel').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
	dots: false,
	autoplay:false,
	arrows: false,
    infinite: true,
	cssEase: 'linear',
	mobileFirst:true,
	responsive: [
		{
		  breakpoint: 640,
		  settings: "unslick"
		}
	  ]
});

$(".core-home-mid-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
	dots: true,
	autoplay: true,
    autoplaySpeed: 5000,
	arrows: false,
    infinite: true,
	cssEase: 'linear'	
});

$(".whats-inside-mid-slider").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
	dots: false,
	autoplay: false,
	arrows: false,
    infinite: true,
	cssEase: 'linear',
	responsive: [
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '75px',
                        arrows: false,
                        initialSlide: 4
                    }
                },
                {
                    breakpoint: 414,
                    settings: {
                        centerPadding: '90px',
                        slidesToShow: 1,
                        arrows: false,
                        initialSlide: 4
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        centerPadding: '105px',
                        slidesToShow: 1,
                        arrows: false,
                        initialSlide: 4
                    }
                }, {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        initialSlide: 5,
                    }
                } 
            ]
});

$(".core-home-review-slider .row").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
	dots: true,
	arrows: false,
	infinite: true,
	autoplay: true,
    autoplaySpeed: 5000,
	cssEase: 'linear',
	responsive: [
		{
		  breakpoint: 640,
		  settings: {
			slidesToShow: 1,
			slidesToScroll: 1
		  }
		}
	]	
});


//After Before Bottom Slider
$('.baslides').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: false,
	dots: false,
	arrows: true,
	prevArrow: "<button type='button' class='slick-prev float-left slick-arrow'><i class='fa fa-caret-left'></i></button>",
	nextArrow: "<button type='button' class='slick-next float-right slick-arrow'><i class='fa fa-caret-right'></i></button>",
	infinite: true,
	cssEase: 'linear'
});

$(function(){
	$(window).on('scroll',function(){
		if ($(window).width()<639 && $(window).scrollTop()>320){ 
			$(".pt_storefront .fixed-footer").show(); 
		} else {  
			$(".pt_storefront .fixed-footer").hide(); 
		}
	});
	
	//Remove reviews tab in PDP page for ADA to move to next tab by using arrow key
	$(".product-content-area #reviews,.product-content-area .review-rating").remove();
	
	setTimeout(function(){
		$('.ingredients-carousel-item').each(function() {
			$(this).removeAttr('aria-describedby');
	    });
		var i=1;
		$('.home-mid-slider .slick-dots button').each(function() {
			var slide = i + "-info";
			var slidelbl = "slide" + i;
			$(this).attr('aria-describedby',slide);
			$(this).attr('aria-labelledby',slidelbl);
			i++;
		});	
	}, 3000);
});
/* Escape single quotes in JSON for IE */
if (navigator.userAgent.match(/Trident\/7\./)) {
	try{
		JSON.stringify(context).replace(/[\/\(\)\']/g, "&apos;");
	}catch(e){}
}

/*ECOM-3664 review bug fixing*/ 
$(document).ready(function(){
	if($(".reviews-and-ratings-page .header-slot .checkout-header").length>0){
		$(".reviews-and-ratings-page .static-pages").addClass("reviews-main");
		}
	else{ 
		$(".reviews-and-ratings-page .static-pages").removeClass("reviews-main");
	} 
}); 
},{}]},{},[1]);
