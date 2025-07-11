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

//tabs
const tabsContainer = document.querySelector('.tabs__container');
const tabsList = tabsContainer.querySelector('.tabs__title');
const tabButtons = tabsList.querySelectorAll('a');
const tabPanels = tabsContainer.querySelectorAll('.tabs__panels > div');

tabsList.setAttribute('role', 'tablist');

tabsList.querySelectorAll('li').forEach(listItem => {
	listItem.setAttribute('role', 'presentation');
});
tabButtons.forEach((tab, index) => {
	tab.setAttribute('role', 'tab');
	tab.setAttribute('id', `tab_${index + 1}`);
	tab.setAttribute('aria-controls', `S${index + 1}`);

	tabPanels[index].setAttribute('role', 'tabpanel');
	tabPanels[index].setAttribute('aria-labelledby', `tab_${index + 1}`);

	if (index === 1) {
		tab.setAttribute('aria-selected', 'true');
		tab.removeAttribute('tabindex');
		tabPanels[index].removeAttribute('hidden');
	} else {
		tab.setAttribute('aria-selected', 'false');
		tab.setAttribute('tabindex', '-1');
		tabPanels[index].setAttribute('hidden', '');
	}
});

tabsContainer.addEventListener('click', e => {
	const clickedTab = e.target.closest('a');
	if (!clickedTab) return;
	e.preventDefault();

	switchTab(clickedTab);
});

function switchTab(newTab) {
	const activePanelId = newTab.getAttribute('href');
	const activePanel = tabsContainer.querySelector(activePanelId);

	tabButtons.forEach(tab => {
		tab.setAttribute('aria-selected', 'false');
		tab.setAttribute('tabindex', '-1');
	});

	tabPanels.forEach(panel => {
		panel.setAttribute('hidden', '');
	});

	newTab.setAttribute('aria-selected', 'true');
	newTab.removeAttribute('tabindex');
	activePanel.removeAttribute('hidden');
}

//accordion

const accordion = document.querySelector('.faq__accordion');

accordion.addEventListener('click', e => {
	const activePanel = e.target.closest('.faq__accordion_panel');
	if (!activePanel) return;
	console.log(activePanel);
	toggleAccordion(activePanel);
});

function toggleAccordion(panelToActivate) {
	const buttons = panelToActivate.parentElement.querySelectorAll('button');
	const contents = panelToActivate.parentElement.querySelectorAll('.faq__accordion_content');
	const button = panelToActivate.querySelector('button');
	const content = panelToActivate.querySelector('.faq__accordion_content');
	const icon = button.querySelector('.accordion-icon');
	const isOpen = button.getAttribute('aria-expanded') === 'true';

	buttons.forEach(btn => {
		btn.setAttribute('aria-expanded', false);
		const icon = btn.querySelector('.accordion-icon');
		if (icon) icon.classList.remove('rotated');
	});
	contents.forEach(cnt => {
		cnt.setAttribute('aria-hidden', true);
	});

	if (!isOpen) {
		button.setAttribute('aria-expanded', true);
		if (icon) icon.classList.add('rotated');
		content.setAttribute('aria-hidden', false);
	}
}

//hamburger

document.addEventListener('DOMContentLoaded', function () {
	const burger = document.querySelector('.header__burger');
	const drawer = document.querySelector('.header__drawer');
	const overlay = document.querySelector('.header__overlay');

	function closeMenu() {
		burger.classList.remove('is-active');
		drawer.classList.remove('is-active');
		overlay.classList.remove('is-active');
		burger.setAttribute('aria-expanded', 'false');
		drawer.setAttribute('aria-hidden', 'true');
	}
	burger.addEventListener('click', function () {
		const open = !burger.classList.contains('is-active');
		burger.classList.toggle('is-active');
		drawer.classList.toggle('is-active');
		overlay.classList.toggle('is-active');
		burger.setAttribute('aria-expanded', open ? 'true' : 'false');
		drawer.setAttribute('aria-hidden', open ? 'false' : 'true');
	});
	overlay.addEventListener('click', closeMenu);
});
