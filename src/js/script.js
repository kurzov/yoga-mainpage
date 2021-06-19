$(document).ready(function(){
	$("select").styler({
		selectSmartPositioning: false,
		selectPlaceholder: "Chose your class",
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