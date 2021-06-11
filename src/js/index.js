jQuery(document).ready(function($){

	//common
	languageSwitcher($);

	// components
	bannerSlider($);
	currencySlider($);
	cardBonusDropdown($);

	// close outside 
	document.addEventListener("click", function(event) {
		if (event.target.closest(".js-lang-switch")) return;
		if (event.target.closest(".js-card-bonus")) return;
		if (event.target.closest(".card-bonus__more-block")) return;

		$('.js-lang-switch').removeClass('active').find('.language__dropdown').slideUp(200);
		$('.card-bonus__more-block').removeClass('active');
		$('.js-card-bonus').removeClass('active');
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

	let currencySliders =  document.querySelectorAll('.slider-currency');
	if(currencySliders.length) {

		currencySliders.forEach((element) => {
			swiperInit(element, 6, 6);
		});
	}

	let amountSliders =  document.querySelectorAll('.slider-items--amount');
	if(amountSliders.length) {

		amountSliders.forEach((element) => {
			swiperInit(element, 'auto', 10);
		});
	}

	let gamesSliders =  document.querySelectorAll('.slider-items--games');
	if(gamesSliders.length) {

		gamesSliders.forEach((element) => {
			swiperInit(element, 'auto', 14);
		});
	}

	function swiperInit(element, slidesPerView, spaceBetween){

		let slider = element.querySelector('.swiper-container');
		let next = element.querySelector('.button-nav--next');
		let prev = element.querySelector('.button-nav--prev');

		let autoplayDelay = Math.floor(Math.random() * 10) * 100;

		let swiper = new Swiper(slider, {

			slidesPerView : slidesPerView,
			loop: true,
			speed : 1000,
			spaceBetween : spaceBetween,

			// autoplay: {

				// delay: autoplayDelay,
				// disableOnInteraction : false
			// },

			navigation: {
				nextEl: next,
				prevEl: prev,
			},
		});

		$(element).mouseenter(function(){
			swiper.autoplay.stop();
		});

		$(element).mouseleave(function(){
			swiper.autoplay.start();
		});
	}
}

const cardBonusDropdown = ($) => {

	$('.js-card-bonus').on('click', function(){

		$(this).toggleClass('active');
		$(this).next().toggleClass('active');

	});
}