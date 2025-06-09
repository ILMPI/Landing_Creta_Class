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

// tabButtons.forEach((tab, index) => {
// 	tab.setAttribute('role', 'tab');
// 	if (index === 1) {
// 		tab.setAttribute('aria-selected', 'true');
// 	} else {
// 		tab.setAttribute('tabindex', '-1');
// 		tabPanels[index].setAttribute('hidden', '');
// 	}
// });

// tabPanels.forEach(panel => {
// 	panel.setAttribute('role', 'tab');
// 	panel.setAttribute('tabindex', '0');
// });

// tabsContainer.addEventListener('click', e => {
// 	const clickedTab = e.target.closest('a');
// 	if (!clickedTab) return;
// 	e.preventDefault();

// 	switchTab(clickedTab);
// });

// function switchTab(newTab) {
// 	const activePanelId = newTab.getAttribute('href');
// 	const activePanel = tabsContainer.querySelector(activePanelId);

// 	tabButtons.forEach(button => {
// 		button.setAttribute('aria-selected', false);
// 		button.setAttribute('tabindex', '-1');
// 	});

// 	tabPanels.forEach(panel => {
// 		panel.setAttribute('hidden', true);
// 	});
// 	activePanel.removeAttribute('hidden');

// 	newTab.setAttribute('aria-selected', 'true');
// 	newTab.setAttribute('tabindex', '0');
// }
