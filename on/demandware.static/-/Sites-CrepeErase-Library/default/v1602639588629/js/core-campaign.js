$(document).ready(function() {  
    // Homepage JS
    if (app.variableMap.pageName.indexOf("HomePage") > -1) {
		
		if (window.navigator.userAgent.indexOf("iPhone OS 14_0_1") > -1){
			$(".experience-wrapper").remove();
		} else {
			$(".experience-wrapper").removeClass("hide");
		}
		
        // Duplicate BV Stars from Banner A to Banner B
        setTimeout(function() {
            $('.banner-reviews-b').html($('.banner-reviews-a').html());
        }, 500);

        // Change Carousel Arrows after initial change
        $('.science-carousel').on('afterChange', function() {
            if ($('.slick-arrow-prev-custom').hasClass('active')) {
                return;
            } else {
                $('.slick-arrow-prev-custom').addClass('active');
            }
        });

        // Science Carousel Init
        $('.science-carousel').slick({
            arrows: false,
            slidesToShow: 4,
            centerMode: true,
            centerPadding: '0',
            initialSlide: 6,
            arrows: true,
            nextArrow: '<button class="slick-arrow-next-custom">></button>',
            prevArrow: '<button class="slick-arrow-prev-custom"><</button>',
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
    
        // Witness Carousel
        $('.witness-carousel').slick({
            slidesToShow: 1,
            dots: true,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000
        });

        // Flip Card Tiles on Mobile
        $('.flip-button-wrapper').on('click', function() {
            $(this).parent('.flip-card').toggleClass('active');
            $(this).children('.flip-button').toggleClass('close');
        });

        // Read more on > 640
        $('.xtra-desc-btn').on('click', function(e) {
            e.preventDefault();
            $(this).parents('p').children('span').fadeToggle('fast').toggleClass('active');
            if ($(this).parents('p').children('span').hasClass('active')) {
                $(this).text('Read Less');
            } else {
                $(this).text('Read More');
            }
        });

        if (navigator.appVersion.indexOf('Trident') <= -1) {
            // Hover Animations on Desktop
            $('.large-flip-card-front').hover(function() {
                $(this).animate({ opacity: '1', zoom: '125%' }, 300);
            }, function() {
                $(this).animate({ opacity: '1', zoom: '100%' }, 300)
            });

            (function() {
                var jordanPlayer = new Vimeo.Player(document.getElementById('jordan-video'));
                var isJordanPlaying = false;
                if (!isJordanPlaying) {
                    $(window).on('scroll', function() {
                        // offset().top doesnt include margin give, so we subtract 50 to account for the margin given in css
                        if (window.scrollY >= $('.home-addOn-hear-why').offset().top - 200) {
                            setTimeout(function() {
                                jordanPlayer.play();
                            },1000);
                            isJordanPlaying = true;
                        }
                    });
                }
            })();        
        }

        // See More Proof Links to B&A
        $('.see-more-proof').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: $('.home-addOn-witness').offset().top
            }, 600)
        });

        if (navigator.userAgent.indexOf('Trident') > -1) {
            $('#trufirm-logo').addClass('active');
            $('#trufirm-p').addClass('active');
            $('#trufirm-list li').addClass('active');
            $('.trufirm-content a').addClass('active');
        } else {
            $(window).on('scroll', function() {
                if (window.scrollY >=$('.trufirm-parrallax-overlay-wrapper').offset().top - ($('.trufirm-parrallax-overlay-wrapper').offset().top * 0.13)) {
                    $('#trufirm-logo').addClass('active');
                    setTimeout(function() {
                        $('#trufirm-p').addClass('active');
                    }, 250);
                    setTimeout(function() {
                        $('#trufirm-list li').addClass('active');
                    },500);
                    setTimeout(function() {
                        $('.trufirm-content a').addClass('active');
                    },750);
                }
            });
        }

        // Option B Banner
        $('.ce-home-banner-sb-content h1').addClass('completed-state');
        
        setTimeout(function() {
            $('.ce-home-banner-sb-content .ce-banner-sub-text-one').addClass('completed-state');
            
            setTimeout(function() {
                $('.ce-home-banner-sb-content a').addClass('completed-state');
                $('.ce-home-banner-sb-product img').addClass('completed-state');
            },100);
            
        }, 200);
    
    } // end Homepage JS





  /*PRE-UPSELL STUFF*/
  if ($('#wrapper').hasClass('pt_saspage')) {
        
        // Learn More for Free Gifts
        $('body').on('click', '.sas-secondary-link', function(e) {
            e.preventDefault();                
            if ($(this).siblings('.sas-desc-secondary').hasClass('hide')) {
                $(this).text('Show Less');
                $(this).siblings('.sas-desc-secondary').removeClass('hide');
            } else {
                $(this).siblings('.sas-desc-secondary').addClass('hide');
                $(this).text('Learn More')
            }
        });
  
    // Create our button
    const nextStepBtn = '<div class="row valuePack-next-wrapper"><button id="valuePack-next-btn">CHECKOUT</button></div>'; 
      
    // Append to the end of the gift section
    $('.gift-section').after(nextStepBtn);

    function checkoutWithOffer(isOffer){
      setTimeout(function(){
        var isValuePackSelected = $('.sas-valuePacks .saslist').hasClass('selected');
        if((isOffer && !isValuePackSelected)||(!isOffer && isValuePackSelected)){
            $('.sas-valuePacks .saslist').trigger('click');
        }
        window.history.pushState({sasPage:"corehrt-sas"}, "corehrt-sas", $(".get-offer-btn").data("sas-url"));
        $(".checkout-button .checkout").trigger("click");
      },500);
    }

    $(".sas-select a").addClass("noscroll");
    $(document).on("click",".get-offer-btn",function() {
      checkoutWithOffer(true);
    });
    $(document).on("click",".continue-btn",function() {
      checkoutWithOffer(false);
    });
    
    var isKitActive;
    setTimeout(function(){
       $("#valuePack-next-btn").on("click", function(){ 
        
        isKitActive = setInterval(checkkitactive, 200);
        // Set previous checkout button completely hidden
        //$('.valuePack-next-wrapper').remove();
        
      });
    });
    
    function checkkitactive() {
      if($(".sas-loader.value-wait").css("display")=="none"){
      showValuePackSection();
      addPageToHistory("specialOffer");
      clearInterval(isKitActive);
      }
    }
    
    function showValuePackSection(){
      $(".sas-money-back-legal").hide();
      $(".variant-section").hide();
      $(".kit-section").hide();
      $(".gift-section").hide();
      $(".valuePack-next-wrapper").hide();
      $(".sas-valuePacks").show(0, function(){
                if (document.scrollingElement) {
                    document.scrollingElement.scrollTop=0;
                } else if(document.documentElement) {
                    document.documentElement.scrollTop=0; //IE fix
                }
        $(".valuePack-section .sas-items-list.slider").slick('refresh'); 
      });
    }
    
    function addPageToHistory(pageName){
      var currentURL = window.location.pathname;
      var offerURL = currentURL + pageName;
      $(window).on('popstate', function(event){
        if(event.originalEvent.state !== null){
          showValuePackSection();
        }
        else{
          hideValuePackSection();
        } 
      });
      window.history.pushState({preupsell:pageName}, "preupsellOffer", offerURL);
    }
    
    function hideValuePackSection(){
      $(".sas-money-back-legal").show();
      $(".variant-section").show();
      $(".valuePack-next-wrapper").show();
      $(".sas-valuePacks").hide();
      $(".kit-section").show(0, function(){
        document.scrollingElement.scrollTop = 0;
        $(".kit-section .sas-items-list.slider").slick('refresh');
      });
      $(".gift-section").show(0, function(){
        $(".gift-section .sas-items-list.slider").slick('refresh');
      });
    }
  }

    $('body').on("click",".sa-update-product", function(){
        $(".gifts .selected .sas-select-btn").click();
    $("#upgradeOffer").trigger("click");
  });
    $('body').on("click",".sa-dont-update", function(){
        $(".gifts .selected .sas-select-btn").click();
    $("#dontUpgradeOffer").trigger("click");
  });
  
    /* NEW PDP STUFF FROM JOE */
  if (app.variableMap.pageName.indexOf("ProductPage") > -1) {
    
    //PUT THE PRICE AT TOP
    if ($('.pdp-price.complete-price').length > 0){
      $('<div class="pdp-next-price">' + $('.pdp-price.complete-price').html() + " " + $('.pdp-mini-cnt').html() + '<div>').insertBefore(".pdp-shortdescription");
    }
    
    //STICKY SUBNAV
    $(window).on("scroll",function(){
      if ($(window).scrollTop() >= $(".pdp-content-container").offset().top){
        $(".scrolling-wrapper").addClass("fixed");
      } else {
        $(".scrolling-wrapper").removeClass("fixed");
        $(".pdp-nav-item").removeClass("active");
      }
      if ($("#reviews").length > 0 && $(window).scrollTop() >= $("#reviews").offset().top - 10){
        $(".pdp-link-reviews").addClass("active").siblings().removeClass("active");
        $(".scrolling-wrapper").scrollLeft($(".scrolling-wrapper").scrollLeft() + $(".pdp-link-reviews").offset().left);
      } else if ($("#key-ingredients").length > 0 && $(window).scrollTop() >= $("#key-ingredients").offset().top - 10){
        $(".pdp-link-key-ingredients").addClass("active").siblings().removeClass("active");
        $(".scrolling-wrapper").scrollLeft($(".scrolling-wrapper").scrollLeft() + $(".pdp-link-key-ingredients").offset().left);
      } else if ($("#howtouse").length > 0 && $(window).scrollTop() >= $("#howtouse").offset().top - 10){
        $(".pdp-link-howtouse").addClass("active").siblings().removeClass("active");
        $(".scrolling-wrapper").scrollLeft($(".scrolling-wrapper").scrollLeft() + $(".pdp-link-howtouse").offset().left);
      } else if ($("#whats-included").length > 0 && $(window).scrollTop() >= $("#whats-included").offset().top - 10){
        $(".pdp-link-whats-included").addClass("active").siblings().removeClass("active");
        $(".scrolling-wrapper").scrollLeft($(".scrolling-wrapper").scrollLeft() + $(".pdp-link-whats-included").offset().left);
      } else if ($("#targets").length > 0 && $(window).scrollTop() >= $("#targets").offset().top - 30){
        $(".pdp-link-targets").addClass("active").siblings().removeClass("active");
        $(".scrolling-wrapper").scrollLeft($(".scrolling-wrapper").scrollLeft() + $(".pdp-link-targets").offset().left);
      } else if ($("#benefits").length > 0 && $(window).scrollTop() >= $("#benefits").offset().top - 30){
        $(".pdp-link-benefits").addClass("active").siblings().removeClass("active");
        $(".scrolling-wrapper").scrollLeft($(".scrolling-wrapper").scrollLeft() + $(".pdp-link-benefits").offset().left);
      } else if ($("#details").length > 0 && $(window).scrollTop() >= $("#details").offset().top - 30){
        $(".pdp-link-details").addClass("active").siblings().removeClass("active");
        $(".scrolling-wrapper").scrollLeft($(".scrolling-wrapper").scrollLeft() + $(".pdp-link-details").offset().left);
      }
    });
    
        // Science Carousel Init
    var initialSlidePDPDesktop = 2;
    var initialSlidePDPMobile = 0;
    var initialSlidePDPTablet = 1
    if ($(".science-carousel-outter").length == 1){
      $(".science-carousel-wrapper").addClass("lessthanlimit").addClass("onlyoneitem");
      var initialSlidePDPTablet = 0;
      
    } else if ($(".science-carousel-outter").length == 2 || $(".science-carousel-outter").length == 3){
      initialSlidePDPDesktop = 1;
      initialSlidePDPTablet = 1;
      $(".science-carousel-wrapper").addClass("lessthanlimit");
    }
    
        $('.science-carousel').slick({
            arrows: false,
            slidesToShow: 4,
            centerMode: true,
            centerPadding: '0',
            initialSlide: initialSlidePDPDesktop,
            arrows: true,
            nextArrow: '<button class="slick-arrow-next-custom">></button>',
            prevArrow: '<button class="slick-arrow-prev-custom"><</button>',
            responsive: [
                {
                    breakpoint: 375,
                    settings: {
                        slidesToShow: 1,
                        centerPadding: '85px',
                        arrows: false,
            initialSlide: initialSlidePDPMobile
                    }
                },
                {
                    breakpoint: 414,
                    settings: {
                        centerPadding: '100px',
                        slidesToShow: 1,
                        arrows: false,
            initialSlide: initialSlidePDPMobile
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        centerPadding: '115px',
                        slidesToShow: 1,
                        arrows: false,
            initialSlide: initialSlidePDPTablet
                    }
                }, {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
            initialSlide: initialSlidePDPTablet
                    }
                } 
            ]
        });
    
  
    /* CLONE THE PRODUCT LIST */
    $(".tabs-title").each(function(){
      let prependLocation = $(this).find("a").attr("href");
      $(this).find(".product-title").clone().addClass("show-for-medium").prependTo($(prependLocation + " .flexie"));
      $(this).find("img").clone().addClass("show-for-medium").prependTo($(prependLocation));
    });

    
    /* HOW TO USE SECTION */
    $("body").on("click",".htu-item a",function(){
      let $howToParent = $(this).parent();
      let howToVideo = $howToParent.attr("data-video");
      $howToParent.siblings().removeClass("selected");
      $howToParent.addClass("selected");
      $(".htu-video").hide();
      $("." + howToVideo).show();
    });
    
    
    /* FULL INGREDIENTS TOGGLE */
    $(".ingredient-item-link").on("click",function(){
      $(".ingredient-item").slideUp();
      let $myTargetIngredients = $("." + $(this).attr("data-ingredient") + "-content");
      if (!$myTargetIngredients.is(":visible")){ $myTargetIngredients.slideDown(); }
    });
    
    
    $(".btn-checkout").text("ADD TO CART");
    
    $(".htu-item:visible:first").addClass("selected");
    $("." + $(".htu-item.selected").attr("data-video")).show();
    
    $(".tabs-panel:visible").each(function(indy){
      if (indy % 2 == 1){ $(this).addClass("alternating"); }
    });
    
    
    /*COPY THE STARS TO THE TOP*/
    $('[data-bv-show="rating_summary"]').clone().appendTo('.product-ratings');
    
  }
  
  /*core_full_crepeyskin billboard learnmore*/
  
$(".billboard-learn-more a").click(function (){
	$('html, body').animate({
		scrollTop: $(".home-what-section").offset().top
	}, 1000);
	
});

// core-reviews-home-banner-reviews Carousel
$('.reviews-carousel').slick({
	slidesToShow: 1,
	dots: true,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 8000
});

  
});
/* Escape single quotes in JSON for IE */
if (navigator.userAgent.match(/Trident\/7\./)) {
  JSON.stringify(context).replace(/[\/\(\)\']/g, "&apos;");
}

if (app.variableMap.pageName.indexOf('SASPage') > -1) {
 $(window).bind("pageshow", function(event) {
        if (event.originalEvent.persisted) {
            window.location.reload();
        }
    });
 }