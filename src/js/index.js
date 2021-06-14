jQuery(document).ready(function($){

	//common
	languageSwitcher($);
	backgroundGradientsHandler($);

	// components
	bannerSlider($);
	currencySlider($);
	cardBonusDropdown($);
	accordionFAQ();

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

const bannerSlider = ($) => {

	let slider;

	slider = new Swiper('.js-banner-slider', {

		spaceBetween: 32,
		// grabCursor: true,
		parallax: true,
		speed: 800,

		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},  
	});
};

const currencySlider = ($) => {

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

	$('.js-card-more-block').on('mouseenter', function(){

		$(this).addClass('active');
		$(this).prev().addClass('active');
	});

	$('.js-card-more-block').on('mouseleave', function(){

		$(this).removeClass('active');
		$(this).prev().removeClass('active');
	});
}

const accordionFAQ = () => {

	$('.accordion__header').on('click', function(){
		
		$(this).toggleClass('_active');
		$(this).siblings('.accordion__body').slideToggle(400);
	});
}