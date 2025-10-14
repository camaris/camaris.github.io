(function () {
	const KEY = 'site_cookie_prefs_v1';

	// Elements
	const banner = document.getElementById('cookie-banner');
	const modal = document.getElementById('cookie-modal');
	const btnAccept = document.getElementById('cookie-accept');
	const btnReject = document.getElementById('cookie-reject');
	const btnPrefs = document.getElementById('cookie-preferences');
	const modalClose = document.getElementById('cookie-modal-close');
	const prefSave = document.getElementById('pref-save');
	const prefCancel = document.getElementById('pref-cancel');

	const prefAnalytics = document.getElementById('pref-analytics');
	const prefMarketing = document.getElementById('pref-marketing');

	// Helpers to manage cookies (example cookies; adapt as needed)
	function setCookie(name, value, days) {
		const d = new Date();
		d.setTime(d.getTime() + (days || 365) * 24 * 60 * 60 * 1000);
		document.cookie = name + '=' + encodeURIComponent(value) + ';path=/;expires=' + d.toUTCString();
	}
	function deleteCookie(name) {
		document.cookie = name + '=; Max-Age=0; path=/';
	}

	// Save preferences to localStorage
	function savePrefs(prefs) {
		localStorage.setItem(KEY, JSON.stringify(prefs));
		applyPrefs(prefs);
		hideBanner();
		closeModal();
	}

	function loadPrefs() {
		try {
			const raw = localStorage.getItem(KEY);
			return raw ? JSON.parse(raw) : null;
		} catch (e) {
			return null;
		}
	}

	// Apply preferences: create/delete example cookies and (placeholder) enable/disable scripts
	function applyPrefs(prefs) {
		// essential: always true and not stored as cookie in this example
		if (prefs.analytics) {
			setCookie('consent_analytics', '1', 365);
			// initialize analytics scripts here if needed
		} else {
			deleteCookie('consent_analytics');
		}
		if (prefs.marketing) {
			setCookie('consent_marketing', '1', 365);
			// initialize marketing scripts here if needed
		} else {
			deleteCookie('consent_marketing');
		}
	}

	// UI controls
	function showBanner() {
		if (banner) {
			banner.setAttribute('aria-hidden', 'false');
		}
	}
	function hideBanner() {
		if (banner) {
			banner.setAttribute('aria-hidden', 'true');
		}
	}
	function openModal() {
		if (!modal) return;
		const prefs = loadPrefs() || { analytics: false, marketing: false };
		prefAnalytics.checked = !!prefs.analytics;
		prefMarketing.checked = !!prefs.marketing;
		modal.setAttribute('aria-hidden', 'false');
		// trap focus could be added here
	}
	function closeModal() {
		if (!modal) return;
		modal.setAttribute('aria-hidden', 'true');
	}

	// Actions
	btnAccept && btnAccept.addEventListener('click', function () {
		const all = { analytics: true, marketing: true };
		savePrefs(all);
	});
	btnReject && btnReject.addEventListener('click', function () {
		const none = { analytics: false, marketing: false };
		savePrefs(none);
	});
	btnPrefs && btnPrefs.addEventListener('click', function () {
		openModal();
	});
	modalClose && modalClose.addEventListener('click', closeModal);
	prefCancel && prefCancel.addEventListener('click', closeModal);
	prefSave && prefSave.addEventListener('click', function () {
		const prefs = {
			analytics: !!prefAnalytics.checked,
			marketing: !!prefMarketing.checked
		};
		savePrefs(prefs);
	});

	// new: open-cookie-settings button (footer) opens the same modal
	const openSettingsBtn = document.getElementById('open-cookie-settings');
	if (openSettingsBtn) {
		openSettingsBtn.addEventListener('click', function (e) {
			e.preventDefault();
			openModal();
			// ensure banner is hidden when user opens explicit settings
			hideBanner();
		});
	}

	// Initialize on load
	document.addEventListener('DOMContentLoaded', function () {
		const prefs = loadPrefs();
		if (!prefs) {
			// show banner if no prefs stored
			showBanner();
		} else {
			applyPrefs(prefs);
			hideBanner();
		}
	});
})();
