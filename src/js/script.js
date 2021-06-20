$(document).ready(function(){
	$("select").styler({
		selectSmartPositioning: false,
		selectPlaceholder: "Chose your class",
	});
	//fix header on scroll
	var headerHeight = $('header').outerHeight();
	$(window).scroll(function (){
		if ( $(window).scrollTop() > 0){
			$('.wrapper').css('padding-top', headerHeight,);
			$('header').addClass('fixed');
		} else{
			$('.wrapper').css('padding-top', '0');
			$('header').removeClass('fixed');
		}
	});
	//scroll to
    $('header a').click(function() {
        $('body').removeClass('open-menu');
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top - headerHeight;
        $("html:not(:animated),body:not(:animated)").animate({
             scrollTop: destination
        }, 800);
        return false;
    });

    $('.mobile-button-menu').click(function(){
        $('body').toggleClass('open-menu');
    });

	$(document).find('.slick-cloned a').removeAttr('data-fancybox');
	$("a.gallery-block").fancybox({
		loop: true,
		openEffect  : 'elastic',
		closeEffect : 'elastic',
		showNavArrows : true,
		helpers: { 
			buttons: {
			  position: 'top'
			}
		}
	});
	$('.slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		touchThreshold: 10,
	});
	$('.blog-slider').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		touchThreshold: 10,
		dots: true
	});
	$('.shop-item').each(function(){
		//var $this = $(this);
		$('.custom-btn', this).hover(function() {
		    $(this).closest('.shop-item').addClass( "hovered" );
		  }, function() {
		    $(this).closest('.shop-item').removeClass( "hovered" );
		  });
	});
});