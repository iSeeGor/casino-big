jQuery(document).ready(function($){

	// Modile
	mobileMenu($);

	//common
	siteOverlayHiddingElements($);
	fixedHeader($);
	languageSwitcher($);
	backgroundGradientsHandler($);
	offcanvasSearchBar($);
	sectionTypography($);

	// components
	bannerSlider($);
	cardSliders($);
	cardBonusDropdown($);
	accordionFAQ();
	futuredSlider();
	cardCasino($);
	homeBonusSlider();
	

	// Reviews
	reviewCollapse($);
	
	// Footer
	footerBannerSlider($);

	// close outside 
	document.addEventListener("click", function(event) {
		if (event.target.closest(".js-lang-switch")) return;
		// if (event.target.closest(".js-card-bonus")) return;
		// if (event.target.closest(".card-bonus__more-block")) return;

		$('.js-lang-switch').removeClass('active').find('.language__dropdown').slideUp(200);
		// $('.card-bonus__more-block').removeClass('active');
		// $('.js-card-bonus').removeClass('active');
	});

});

// #START Helper

const bodyOverflow = ($) => {

	let body = $('body');

	if(!body.hasClass('overflow')) {

		body.addClass('overflow');
	} else {

		body.removeClass('overflow');
	}
}

const fakeScrollbar = ($) => {

	let body = $('body');

	if(body.hasClass('overflow')) {

		body.css({
			'margin-right': '17px',
		});
	} else {

		body.css({
			'margin-right': '0',
		});
	}
}

const siteOverlayToggle = ($) => {

	let $overlay = $('.site-overlay');

	if(!$overlay.hasClass('visible')) {

		$overlay.addClass('visible');
	} else {

		$overlay.removeClass('visible');
	}

}

const siteOverlayHiddingElements = ($) => {

	let $overlay = $('.site-overlay');

	// Close all elements by clicking on overlay element
	$overlay.on('click', function(){

		// bodyOverflow($);
		
		$(this).removeClass('visible');
		$('.offcanvas-search').removeClass('visible');
		$('.header').removeClass('is-active');
		$('.card-bonus__more-close').parents('.card-bonus__more-block').removeClass('active');
		
		setTimeout(() => {
			$('.casino-grid__col').css('z-index', '');
		}, 400);
		

	});
}
// #END Helper Functions

const mobileMenu = ($) => {

	// Hamburger
	$('.hamburger').on('click', function(){

		// bodyOverflow($);
		siteOverlayToggle($);

		$(this).toggleClass('active');
		$('.header').addClass('is-active');

		if(!$(this).hasClass('is-active')){
			$('.megamenu__close-submenu').parents('li').removeClass('is-active');
		}
	});

	// Close Menu
	$('.header__close-button').on('click', function(){

		// bodyOverflow($);
		siteOverlayToggle($);

		$('.header').removeClass('is-active');	
	});

	// Mobile SubMenu
	$('.main-menu .icon-arrow').on('click', function(e){
		e.stopPropagation();
		e.preventDefault();

		$(this).parents('li').addClass('is-active');
		
	});

	$('.megamenu__close-submenu').on('click', function(){

		$(this).parents('li').removeClass('is-active');
	});
}

const fixedHeader = ($) => {

	$(window).on('scroll', function(){

		if($(this).scrollTop() > 100) {

			$('.header, .header-mobile').addClass('is-fixed');
		} else {

			$('.header, .header-mobile').removeClass('is-fixed');
		}
	}).scroll();
}

const languageSwitcher = ($) => {

	$('.js-lang-switch').on('click', function(){

		$(this).find('.language__dropdown').slideToggle(200);
		$(this).toggleClass('active');
	});

	$('.js-lang-switch span').on('click', function(){

		let current = $(this).parents('.js-lang-switch').find('.language__header').html();
		let target = $(this).html();

		$(this).parents('.js-lang-switch').find('.language__header').html(target);
		$(this).html(current);
	});
}

const backgroundGradientsHandler = ($) => {

	if(!document.querySelector('.section-typography')) {

		document.querySelector('.background-gradients__item--big').style.position = 'absolute';
		document.querySelector('.background-gradients__item--small').style.position = 'absolute';

		return;
	}
	

	$(window).on('scroll', function(){
		
		let typographyTopOffset = $('.section-typography').offset().top;

		if( $(window).scrollTop() >= typographyTopOffset - $(window).innerHeight()) {

			$('.background-gradients__item--big').css({
				'position' : 'absolute',
				'top' : $('.background-gradients__item--big').offset().top + 'px',

			});

			$('.background-gradients__item--small').css({
				'position' : 'absolute',
				'top' : Math.floor($('.background-gradients__item--small').offset().top) + 'px',

			});
		
		} else {

			$('.background-gradients__item--big').css({
				'position' : 'fixed',
				'top' : '140px',

			});

			$('.background-gradients__item--small').css({
				'position' : 'fixed',
				'top' : '90px',

			});

		}
	}).scroll();
}

const offcanvasSearchBar = ($) => {

	$('.js-offcanvas-search-button').on('click', function(){

		siteOverlayToggle($);
		$('.offcanvas-search').addClass('visible');
		$('.offcanvas-search').find('input').focus();
	});
}

const sectionTypography = ($) => {

	const $button = $('.section-typography__more-less');

	
	$button.on('click', function(e){

		e.preventDefault();

		let collasBlock = $(this).parents('.section-typography').find('.typography-collapsed');
		let height = $(this).parents('.section-typography').find('.typography').outerHeight();
		let moretext = $(this).attr('data-more-text');
		let lesstext = $(this).attr('data-less-text');

		if(collasBlock.hasClass('is-collapsed')) {
			$("html, body").animate({ scrollTop: $('.typography-collapsed').offset().top - 200 }, 0);
			collasBlock.css('height', '').removeClass('is-collapsed');
			$(this).find('span').html(moretext);
			$(this).removeClass('active');
			
		} else {
			collasBlock.css('height', height + 'px').addClass('is-collapsed');
			$(this).find('span').html(lesstext);
			$(this).addClass('active');
		}

	});
}

const bannerSlider = ($) => {

	let slider;

	slider = new Swiper('.js-banner-slider', {

		spaceBetween: 32,
		// grabCursor: true,
		parallax: true,
		speed: 800,
		autoHeight: true,

		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},  
	});
};

const cardSliders = ($) => {

	flagsSlider();
	depositSlider();
	gamesSlider();

	function flagsSlider (){

		let flagsSiders =  document.querySelectorAll('.slider-currency');
		if(!flagsSiders.length) return;

		flagsSiders.forEach(el => {

			if(el.querySelectorAll('.swiper-slide').length <= 5) {

				el.classList.add('no-slider'); 
				return;
			} 

			let slider = el.querySelector('.swiper-container');
			let next = el.querySelector('.button-nav--next');
			let prev = el.querySelector('.button-nav--prev');

			let swiper = new Swiper(slider, {

				slidesPerView : 6,
				loop: true,
				speed : 1000,
				spaceBetween : 6,
				observer: true,
				observeParents	: true,

				// autoplay: {

					// delay: autoplayDelay,
					// disableOnInteraction : false
				// },

				navigation: {
					nextEl: next,
					prevEl: prev,
				},
			});
		});
	};

	function depositSlider (){

		let flagsSiders =  document.querySelectorAll('.slider-items--amount');
		if(!flagsSiders.length) return;

		flagsSiders.forEach(el => {

			if(el.querySelectorAll('.swiper-slide').length <= 2) {

				el.classList.add('no-slider'); 
				return;
			} 

			let slider = el.querySelector('.swiper-container');
			let next = el.querySelector('.button-nav--next');
			let prev = el.querySelector('.button-nav--prev');

			let swiper = new Swiper(slider, {

				slidesPerView : 'auto',
				loop: true,
				speed : 1000,
				spaceBetween : 0,
				observer: true,
				observeParents	: true,

				// autoplay: {

					// delay: autoplayDelay,
					// disableOnInteraction : false
				// },

				navigation: {
					nextEl: next,
					prevEl: prev,
				},
			});
		});
	};

	function gamesSlider (){

		let flagsSiders =  document.querySelectorAll('.slider-items--games');
		if(!flagsSiders.length) return;

		flagsSiders.forEach(el => {

			if(el.querySelectorAll('.swiper-slide').length <= 4) {

				el.classList.add('no-slider'); 
				return;
			} 

			let slider = el.querySelector('.swiper-container');
			let next = el.querySelector('.button-nav--next');
			let prev = el.querySelector('.button-nav--prev');

			let swiper = new Swiper(slider, {

				slidesPerView : 'auto',
				loop: true,
				speed : 1000,
				spaceBetween : 0,
				observer: true,
				observeParents	: true,

				// autoplay: {

					// delay: autoplayDelay,
					// disableOnInteraction : false
				// },

				navigation: {
					nextEl: next,
					prevEl: prev,
				},
			});
		});
	};

	// Start/Stop Autoplay On MouseEnter/Leave
	$('.js-casino-card').hover(function(){

		let sliders = $(this).find('.swiper-container');
		sliders.each(function(){

			$(this)[0].swiper.autoplay.start()
		});

	}, function(){

		let sliders = $(this).find('.swiper-container');
		sliders.each(function(){

			$(this)[0].swiper.autoplay.stop()
		});
	});

	//Enable Autoplay
	if($('.props-slider').attr('data-swiper-autoplay')){

		let sliders = $('.props-slider').find('.swiper-container');
		sliders.each(function(){

			$(this)[0].swiper.autoplay.start();
		});
	}

}

const cardBonusDropdown = ($) => {

	$('.js-card-bonus').on('mouseenter', function(){

		$(this).addClass('active');
		$(this).next().addClass('active');

	});

	$('.js-card-bonus').on('mouseleave', function(){

		$(this).removeClass('active');
		$(this).next().removeClass('active');

	});

	$('.js-card-more-block').hover(function(){

		$(this).addClass('active');
		$(this).prev().addClass('active');

	} , function(){

		$(this).removeClass('active');
		$(this).prev().removeClass('active');	
	});

	// Toggle Add Hover to Block 767px 
	const mediaQuery = window.matchMedia('(min-width: 767px)');

	function handlerBreakpoint(e) {

		if(e.matches) {

			$('.js-card-more-block').hover(function(){

				$(this).addClass('active');
				$(this).prev().addClass('active');

			} , function(){

				$(this).removeClass('active');
				$(this).prev().removeClass('active');	
			});
		} else {

			$('.js-card-more-block').unbind('mouseenter').unbind('mouseleave')
		}
	};

	mediaQuery.addListener(handlerBreakpoint);
	handlerBreakpoint(mediaQuery);
}

const accordionFAQ = () => {

	$('.accordion__header').on('click', function(){
		
		$(this).toggleClass('_active');
		$(this).siblings('.accordion__body').slideToggle(400);
	});
}

const futuredSlider = () => {

	let slider;

	slider = new Swiper('.futured-games .swiper-container', {

		spaceBetween : 20,
		slidesPerView : 4,
		speed : 1400,
		loop : true,

		autoplay : {

			delay: 1200,
			disableOnInteraction : false
		},

		pagination : {

			el : '.futured-games__slider-bullets',
			type : 'bullets',
			clickable: true
		},

		navigation : {

			nextEl: '.button-slider-nav--next',
			prevEl: '.button-slider-nav--prev',
		},
	});
};

const cardCasino = ($) => {

	$('.card__main-toggle').on('click', function(){

		$(this).toggleClass('is-active');
		$(this).parents('.card').find('.card__col--main').slideToggle(400);
	});

	// Move Bonus To New Column and Return it in resize
	const mediaQuery = window.matchMedia('(max-width: 767px)');

	function handlerBreakpoint(e) {

		if(e.matches) {

			$('.card').each(function(){

				$(this).find('.card__col--right').prepend($(this).find('.card-bonus'));
			});

			$('.card-bonus__title').on('click', function(){

				siteOverlayToggle($);
				$(this).parents('.card-bonus').find('.card-bonus__more-block').toggleClass('active');
				$(this).parents('.casino-grid__col').css('z-index', '102');
			});
		} else {

			$('.card').each(function(){

				$(this).find('.card__col--main').append($(this).find('.card-bonus'));
			});

			$('.card-bonus').off('click');
		}
	};

	mediaQuery.addListener(handlerBreakpoint);
	handlerBreakpoint(mediaQuery);

	$('.card-bonus__more-close').on('click', function(){

		siteOverlayToggle($);
		$(this).parents('.card-bonus__more-block').removeClass('active');

		setTimeout(() => {
			$(this).parents('.casino-grid__col').css('z-index', '');	
		}, 400);
		
	});
	
};

const homeBonusSlider = () => {

	let slider;

	function swiperInit(){

		slider = new Swiper('.js-home-bonus-slider', {

			wrapperClass : 'main-grid',
			slideClass : 'main-grid__col', 
			loop: true,
			slidesPerView : 'auto',
			spaceBetween : 14,
			speed : 1400,

			autoplay: {
				delay: 1400,
				disableOnInteraction : false,
				pauseOnMouseEnter : true
			},

			breakpoints : {

				480 : {

					spaceBetween : 20,
				}
			}
		});	
	}

	const mediaQuery = window.matchMedia('(max-width: 767px)');

	function handlerBreakpoint(e) {

		if(e.matches) {

			swiperInit();
		} else {

			if(slider === undefined) return;

			slider.destroy( true, true );
		}
	};

	mediaQuery.addListener(handlerBreakpoint);
	handlerBreakpoint(mediaQuery);

	
}

const reviewCollapse = ($) => {

	let button = $('.js-review-cards').find('.button-primary');

	let textMore = button.attr('data-collapse-moretext');
	let textLess = button.attr('data-collapse-lesstext');

	let collapsedBlock = $('.js-review-cards').find('.review-cards__collapsed');

	function collapsedBlockToggle(){

		collapsedBlock.slideToggle(400);

		if(!button.hasClass('_active')){

			button.find('span').html(textMore);
			button.addClass('_active');
		} else {

			button.find('span').html(textLess);
			button.removeClass('_active');
		}
	}

	collapsedBlockToggle();

	button.on('click', collapsedBlockToggle);

}

const footerBannerSlider = ($) => {

	let swiper;

	function swiperInit(){

		swiper = new Swiper('.footer-banners__content', {

			wrapperClass : 'footer-banners__item-list',
			slideClass : 'footer-banners__item',
			loop : true,
			slidesPerView : 'auto',
			spaceBetween : 16,

			autoplay : {

				delay : 1400,
				disableOnInteraction : false
			},

			breakpoints : {

				480 : {

					spaceBetween : 24,
				}
			}

		});
	}

	const mediaQuery = window.matchMedia('(max-width: 980px)');

	function handlerBreakpoint(e) {

		if(e.matches) {

			swiperInit();
		} else {

			if(swiper === undefined) return;

			swiper.destroy( true, true );
		}
	};

	mediaQuery.addListener(handlerBreakpoint);
	handlerBreakpoint(mediaQuery);
}