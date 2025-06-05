// const body = document.querySelector('body');
const swiper = new Swiper('.swiper', {
	// slidesPerView: 3,
	loop: true,
	spaceBetween: 42,
	// slidesPerGroup: 3,
	speed: 600,
	navigation: {
		nextEl: '.learningSliderNext',
		prevEl: '.learningSliderPrev',
	},
	pagination: {
		el: '.learningSliderPag',
		clickable: true,
		renderBullet: function (index, className) {
			return `<span class="bullet ${className}"></span>`;
		},
	},
	breakpoints: {
		1024: {
			slidesPerView: 3,
			slidesPerGroup: 3,
			pagination: {
				type: 'bullets',
			},
		},
		768: {
			slidesPerView: 2,
			slidesPerGroup: 2,
			pagination: {
				type: 'bullets',
			},
		},
		0: {
			slidesPerView: 1,
			slidesPerGroup: 1,
			pagination: {
				type: 'fraction',
			},
		},
	},
});
