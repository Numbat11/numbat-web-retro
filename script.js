// numbat-web-retro — plain ES module, no framework.
// Each init function is a no-op if its page doesn't have the relevant root element,
// so this single file can be loaded by every page.

const STEPS = [
	{
		slug: 'next', letter: 'N', name: 'Next',
		desc: 'Take the next step. <a href="contact.html">Make contact</a>.',
		detail: 'Every great project starts with a single conversation. Reach out today and let’s talk about your vision, your goals, and how we can bring them to life together.',
	},
	{
		slug: 'options', letter: 'O', name: 'Options',
		desc: 'Hourly, daily or complete build packages tailored to your needs. <a href="contact.html">Get a quote from me</a>.',
		detail: 'No two projects are the same, so neither are our engagement models. Whether you need a few focused hours, a dedicated sprint, or a full end-to-end product build, we structure a package that fits your budget and timeline, with full transparency on costs from day one.',
	},
	{
		slug: 'planning', letter: 'P', name: 'Planning',
		desc: 'The Numbat Web team will meet in person or via streaming platform with key stakeholders to develop a comprehensive plan with an agreed strategy.',
		detail: 'Good planning is the difference between a project that delivers and one that drifts. We facilitate structured discovery sessions to align on scope, priorities, milestones, and success criteria, so everyone starts on the same page and stays there.',
	},
	{
		slug: 'research', letter: 'R', name: 'Research',
		desc: 'Research products and collate all branding information.',
		detail: 'Before a single pixel is placed, we do the groundwork. We audit your existing assets, study your competitors, understand your target audience, and gather everything needed to make informed, strategic design and build decisions.',
	},
	{
		slug: 'design', letter: 'D', name: 'Design',
		desc: 'Brand identity, logos and an integrative design system crafted from scratch.',
		detail: 'Great design is more than aesthetics. It’s communication. We develop a cohesive visual language that reflects your brand values, resonates with your audience, and scales consistently across every touchpoint, from your logo to your UI components.',
	},
	{
		slug: 'develop', letter: 'D', name: 'Develop',
		desc: 'UI wireframes and UX user flows for custom app functionality formed.',
		detail: 'We translate your requirements into concrete blueprints, interactive wireframes and detailed user flows that map every screen, interaction, and edge case. This stage ensures the product is fully thought through before development begins, saving time and cost down the line.',
	},
	{
		slug: 'build', letter: 'B', name: 'Build',
		desc: 'Secure, scalable codebase with modern branding integration and unique user experience.',
		detail: 'This is where the vision becomes reality. We write clean, well-structured code built for performance, security, and longevity, integrating your design system throughout and engineering the custom functionality your product demands.',
	},
	{
		slug: 'launch', letter: 'L', name: 'Launch',
		desc: 'Beta launch with thorough testing across all devices.',
		detail: 'We don’t ship and hope. Before going live, your product is tested rigorously across browsers, screen sizes, and real-world usage scenarios. A managed beta release gives us the opportunity to catch any remaining issues in a controlled environment before full public launch.',
	},
	{
		slug: 'evaluate', letter: 'E', name: 'Evaluate',
		desc: 'Full-system evaluation, bug fixes and performance tuning.',
		detail: 'Post-launch is where the real data starts flowing. We run a full evaluation of system performance, user behaviour, and technical health, addressing bugs, optimising load times, and refining the experience based on what we observe in the wild.',
	},
	{
		slug: 'market', letter: 'M', name: 'Market',
		desc: 'SEO and optional video advertising to reach your audience.',
		detail: 'A great product still needs to be found. We implement solid on-page SEO foundations and, where appropriate, support your growth with targeted content strategy and video advertising, putting your brand in front of the right people at the right time.',
	},
	{
		slug: 'optimise', letter: 'O', name: 'Optimise',
		desc: 'Sustainable operations, AI integrations, hand over the keys.',
		detail: 'The finish line isn’t launch day. It’s a product that keeps performing. We ensure your platform is built for the long haul, explore opportunities to integrate AI-driven automation where it adds real value, and provide a thorough handover so you’re fully empowered to own and operate what we’ve built together.',
	},
];

const PROJECTS = [
	{
		slug: 'popyalar', title: 'Popyalar Voting App', tagline: 'Real-time community voting platform',
		tech: ['Svelte', 'Node.js', 'WebSockets', 'PostgreSQL'],
		description: 'A real-time voting application that empowers communities to make collective decisions. Designed for speed and simplicity with live results updating as votes come in.',
		story: 'Popyalar was born from the need for transparent, accessible community decision-making. We built the platform from the ground up with real-time WebSocket connections so every vote is reflected instantly. The UI was crafted to be intuitive enough for anyone to use, while the backend handles thousands of concurrent voters without breaking a sweat.',
		url: 'https://app.popyalar.com',
	},
	{
		slug: 'bats', title: 'BATS Airport Shuttle', tagline: 'Busselton Airport Transit Shuttle booking system',
		tech: ['React', 'Express', 'Stripe', 'Google Maps API'],
		description: 'A complete booking and scheduling system for the Busselton Airport Transit Shuttle service, featuring real-time availability, route mapping, and secure payment processing.',
		story: 'The BATS team needed a way to manage airport shuttle bookings that was as smooth as the ride itself. We integrated Google Maps for route visualisation, Stripe for seamless payments, and built a driver dashboard that keeps the entire fleet coordinated. The result: fewer missed pickups and happier travellers.',
		url: 'https://busso-airport-bus.netlify.app',
	},
	{
		slug: 'wildadventures', title: 'Wild Adventures', tagline: 'Australian eco-tour company showcase',
		tech: ['Svelte', 'Netlify', 'Contentful CMS'],
		description: 'An immersive website for Wild Adventures tour company, showcasing eco-tours across Western Australia with rich photography and seamless booking integration.',
		story: 'Wild Adventures captures the spirit of the Australian bush and coast. We designed the site to feel like you’re already on the adventure -- full-bleed imagery, smooth transitions, and a booking flow that gets out of the way so the landscape does the talking. Built on a headless CMS so the team can update tour listings without touching code.',
		url: 'https://wild-adventures.netlify.app',
	},
	{
		slug: 'treebaby', title: 'Tree Baby Design', tagline: 'Creative studio portfolio and shop',
		tech: ['Next.js', 'Shopify', 'Figma', 'GSAP'],
		description: 'A portfolio and e-commerce platform for Tree Baby Design, blending a creative showcase with a fully integrated online shop for original artwork and merchandise.',
		story: 'Tree Baby Design is where art meets commerce. The brief was to build something that feels like an artist’s studio -- warm, textured, full of personality -- while still being a high-converting online shop. We used GSAP for playful scroll animations and connected everything to Shopify so inventory and orders run themselves.',
		url: '',
	},
	{
		slug: 'numbatweb', title: 'Numbat Web', tagline: 'Multi-stack studio showcase, this very site included',
		tech: ['SvelteKit', 'React', 'Vanilla HTML/CSS/JS', 'Coolify'],
		description: 'The studio\'s own front door: a rock-themed stack selector that lets visitors pick which aesthetic they want to experience the Numbat Web portfolio in.',
		story: 'Rather than pick one look, we built four -- Nature, Futuristic, Old School (this stack) and the selector that ties them together. Same content, four completely different technical and visual takes, all served from one apex domain.',
		url: 'https://numbatweb.com.au',
	},
];

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

function initServices() {
	const tablist = document.querySelector('#step-tablist');
	const titleEl = document.querySelector('#reader-pane-title');
	const bodyEl = document.querySelector('#reader-pane-body');
	if (!tablist || !titleEl || !bodyEl) return;

	const tabs = [...tablist.querySelectorAll('.noprddblemo-tile')];

	function selectStep(slug) {
		const step = STEPS.find((s) => s.slug === slug) || STEPS[0];
		tabs.forEach((tab) => {
			tab.setAttribute('aria-selected', String(tab.dataset.step === step.slug));
		});
		titleEl.textContent = `${step.letter} — ${step.name}`;
		bodyEl.innerHTML = `<p class="reader-pane-desc">${step.desc}</p><p>${step.detail}</p>`;
		history.replaceState(null, '', `#${step.slug}`);
	}

	tabs.forEach((tab) => {
		tab.addEventListener('click', () => selectStep(tab.dataset.step));
	});

	const initialSlug = window.location.hash.replace('#', '');
	selectStep(STEPS.some((s) => s.slug === initialSlug) ? initialSlug : STEPS[0].slug);
}

function initGallery() {
	const grid = document.querySelector('#gallery-grid');
	const overlay = document.querySelector('#project-modal');
	if (!grid || !overlay) return;

	const titleEl = overlay.querySelector('#win-title');
	const bodyEl = overlay.querySelector('#win-body');
	const prevBtn = overlay.querySelector('#win-prev');
	const nextBtn = overlay.querySelector('#win-next');
	const cards = [...grid.querySelectorAll('.work-card')];
	let currentIndex = -1;

	function render(index) {
		const project = PROJECTS[index];
		titleEl.textContent = project.title;
		bodyEl.innerHTML = `
			<p>${project.description}</p>
			<p>${project.story}</p>
			<p class="win-tech">${project.tech.join(' · ')}</p>
			${project.url ? `<p><a href="${project.url}" target="_blank" rel="noopener">Visit live site →</a></p>` : ''}
		`;
		prevBtn.disabled = index <= 0;
		nextBtn.disabled = index >= PROJECTS.length - 1;
	}

	function open(index) {
		currentIndex = index;
		render(currentIndex);
		overlay.hidden = false;
		history.replaceState(null, '', `#project/${PROJECTS[currentIndex].slug}`);
	}

	function close() {
		overlay.hidden = true;
		currentIndex = -1;
		history.replaceState(null, '', window.location.pathname);
	}

	cards.forEach((card, i) => {
		card.addEventListener('click', () => open(i));
	});

	overlay.querySelector('.win-close').addEventListener('click', close);
	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) close();
	});
	prevBtn.addEventListener('click', () => {
		if (currentIndex > 0) open(currentIndex - 1);
	});
	nextBtn.addEventListener('click', () => {
		if (currentIndex < PROJECTS.length - 1) open(currentIndex + 1);
	});
	document.addEventListener('keydown', (event) => {
		if (overlay.hidden) return;
		if (event.key === 'Escape') close();
		if (event.key === 'ArrowLeft' && currentIndex > 0) open(currentIndex - 1);
		if (event.key === 'ArrowRight' && currentIndex < PROJECTS.length - 1) open(currentIndex + 1);
	});

	const hashMatch = window.location.hash.match(/^#project\/(.+)$/);
	if (hashMatch) {
		const index = PROJECTS.findIndex((p) => p.slug === hashMatch[1]);
		if (index >= 0) open(index);
	}
}

function initPricing() {
	const cards = document.querySelectorAll('.tier-card');
	cards.forEach((card) => {
		const toggle = card.querySelector('.tier-toggle');
		if (!toggle) return;
		toggle.addEventListener('click', () => {
			const expanded = card.classList.toggle('is-expanded');
			toggle.textContent = expanded ? 'Hide Details' : 'Show Details';
		});
	});
}

function initContact() {
	const form = document.querySelector('#contact-form');
	if (!form) return;
	const success = document.querySelector('#contact-success');

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = new FormData(form);
		const name = data.get('name');
		const email = data.get('email');
		const message = data.get('message');
		const subject = encodeURIComponent(`Website enquiry from ${name}`);
		const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
		window.location.href = `mailto:numbat11@gmail.com?subject=${subject}&body=${body}`;
		form.hidden = true;
		success.hidden = false;
	});
}

// ---------- View Source easter egg: retro right-click menu + system dialogs ----------

function buildSystemDialog() {
	let overlay = document.querySelector('#system-dialog');
	if (overlay) return overlay;

	overlay = document.createElement('div');
	overlay.className = 'win-overlay';
	overlay.id = 'system-dialog';
	overlay.hidden = true;
	overlay.innerHTML = `
		<div class="win" role="dialog" aria-modal="true" aria-labelledby="system-dialog-title">
			<div class="win-titlebar">
				<span class="win-title" id="system-dialog-title">System</span>
				<div class="win-controls">
					<button type="button" class="win-btn" tabindex="-1" aria-hidden="true">_</button>
					<button type="button" class="win-btn" tabindex="-1" aria-hidden="true">▢</button>
					<button type="button" class="win-btn win-close" aria-label="Close">×</button>
				</div>
			</div>
			<div class="win-body" id="system-dialog-body"></div>
		</div>
	`;
	document.body.appendChild(overlay);

	function close() {
		overlay.hidden = true;
	}

	overlay.querySelector('.win-close').addEventListener('click', close);
	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) close();
	});
	document.addEventListener('keydown', (event) => {
		if (!overlay.hidden && event.key === 'Escape') close();
	});

	return overlay;
}

function openSystemDialog(title, buildBody) {
	const overlay = buildSystemDialog();
	overlay.querySelector('#system-dialog-title').textContent = title;
	const body = overlay.querySelector('#system-dialog-body');
	body.innerHTML = '';
	buildBody(body);
	overlay.hidden = false;
}

function openSourceViewer() {
	openSystemDialog('View Source', (body) => {
		const pre = document.createElement('pre');
		const code = document.createElement('code');
		code.textContent = document.documentElement.outerHTML;
		pre.appendChild(code);
		body.appendChild(pre);
	});
}

function openProperties() {
	openSystemDialog('Properties', (body) => {
		const size = new Blob([document.documentElement.outerHTML]).size;
		const dl = document.createElement('dl');
		const rows = [
			['Title', document.title],
			['Address', window.location.href],
			['Type', 'HTML document'],
			['Size', `${(size / 1024).toFixed(1)} KB`],
			['Last Modified', document.lastModified],
		];
		rows.forEach(([label, value]) => {
			const dt = document.createElement('dt');
			dt.textContent = label;
			const dd = document.createElement('dd');
			dd.textContent = value;
			dl.append(dt, dd);
		});
		body.appendChild(dl);
	});
}

function savePageAs() {
	const blob = new Blob([document.documentElement.outerHTML], { type: 'text/html' });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = `${(document.title || 'page').replace(/[^a-z0-9]+/gi, '-').toLowerCase()}.html`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	URL.revokeObjectURL(url);
}

function handleSystemAction(action) {
	switch (action) {
		case 'view-source': openSourceViewer(); break;
		case 'back': history.back(); break;
		case 'refresh': window.location.reload(); break;
		case 'print': window.print(); break;
		case 'save': savePageAs(); break;
		case 'properties': openProperties(); break;
	}
}

function initContextMenu() {
	const menu = document.createElement('div');
	menu.className = 'ctx-menu';
	menu.setAttribute('role', 'menu');
	menu.hidden = true;
	menu.innerHTML = `
		<button type="button" role="menuitem" data-action="view-source">View Source</button>
		<button type="button" role="menuitem" data-action="back">Back</button>
		<button type="button" role="menuitem" data-action="refresh">Refresh</button>
		<hr />
		<button type="button" role="menuitem" data-action="print">Print…</button>
		<button type="button" role="menuitem" data-action="save">Save Page As…</button>
		<button type="button" role="menuitem" data-action="properties">Properties</button>
	`;
	document.body.appendChild(menu);

	function closeMenu() {
		menu.hidden = true;
	}

	document.addEventListener('contextmenu', (event) => {
		event.preventDefault();
		const menuWidth = 190;
		const menuHeight = 220;
		const x = Math.max(8, Math.min(event.clientX, window.innerWidth - menuWidth - 8));
		const y = Math.max(8, Math.min(event.clientY, window.innerHeight - menuHeight - 8));
		menu.style.left = `${x}px`;
		menu.style.top = `${y}px`;
		menu.hidden = false;
	});

	document.addEventListener('click', (event) => {
		if (!menu.contains(event.target)) closeMenu();
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') closeMenu();
	});

	menu.addEventListener('click', (event) => {
		const action = event.target.dataset.action;
		if (!action) return;
		closeMenu();
		handleSystemAction(action);
	});

	document.querySelectorAll('[data-action="view-source"]').forEach((btn) => {
		if (btn.closest('.ctx-menu')) return;
		btn.addEventListener('click', () => handleSystemAction('view-source'));
	});
}

function initGuestbook() {
	const form = document.querySelector('#guestbook-form');
	const list = document.querySelector('#guestbook-entries');
	if (!form || !list) return;

	const key = 'nwr-guestbook';
	const seedEntries = [
		{ name: 'The Webmaster', message: 'Welcome to the Numbat Web guestbook! Sign in and say hello.', date: '2026-07-01' },
	];

	function load() {
		try {
			const raw = localStorage.getItem(key);
			const parsed = raw ? JSON.parse(raw) : null;
			return Array.isArray(parsed) ? parsed : seedEntries;
		} catch {
			return seedEntries;
		}
	}

	function save(entries) {
		localStorage.setItem(key, JSON.stringify(entries));
	}

	function render(entries) {
		list.innerHTML = '';
		entries.forEach((entry) => {
			const item = document.createElement('div');
			item.className = 'guestbook-entry';

			const header = document.createElement('div');
			header.className = 'guestbook-entry-header';

			const name = document.createElement('span');
			name.className = 'guestbook-entry-name';
			name.textContent = entry.name;

			const date = document.createElement('span');
			date.className = 'guestbook-entry-date';
			date.textContent = entry.date;

			header.append(name, date);

			const message = document.createElement('p');
			message.className = 'guestbook-entry-message';
			message.textContent = entry.message;

			item.append(header, message);
			list.appendChild(item);
		});
	}

	let entries = load();
	render(entries);

	form.addEventListener('submit', (event) => {
		event.preventDefault();
		const data = new FormData(form);
		const name = String(data.get('name') || '').trim();
		const message = String(data.get('message') || '').trim();
		if (!name || !message) return;
		entries = [{ name, message, date: new Date().toISOString().slice(0, 10) }, ...entries];
		save(entries);
		render(entries);
		form.reset();
	});
}

function initHitCounter() {
	const el = document.querySelector('#hit-counter');
	if (!el) return;
	const key = 'nwr-hits';
	let count = parseInt(localStorage.getItem(key), 10);
	if (!Number.isFinite(count)) count = 41;
	count += 1;
	localStorage.setItem(key, String(count));
	el.textContent = String(count).padStart(6, '0');
}

markCurrentNavLink();
initPoll();
initServices();
initGallery();
initPricing();
initContact();
initGuestbook();
initHitCounter();
initContextMenu();
