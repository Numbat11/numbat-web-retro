// numbat-web-retro — plain ES module, no framework.

function initPoll() {
	const form = document.querySelector('.poll-form');
	if (!form) return;

	const result = form.querySelector('.poll-result');
	const responses = {
		nature: 'Good taste — Nature is the studio’s content source of truth.',
		futuristic: 'Bold pick — the scroll-cinematic slot turns heads.',
		'old-school': 'Respect the classics. You’re looking at it.',
	};

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const choice = new FormData(form).get('stack');
		if (!choice) return;
		result.textContent = responses[choice] || 'Thanks for voting!';
		result.hidden = false;
	});
}

function markCurrentNavLink() {
	const path = window.location.pathname.split('/').pop() || 'index.html';
	document.querySelectorAll('.nav-btn').forEach((link) => {
		const href = link.getAttribute('href');
		if (href === path) {
			link.classList.add('is-current');
		}
	});
}

markCurrentNavLink();
initPoll();
