// Error pop-ups for the kiosk.
// Use on any page: <link rel="stylesheet" href="popup.css"> + <script src="popup.js"></script>
// Show one:   showError('transport')  /  showError('map')  /  showError('offline')
// Preview:    add ?error=transport (or map / offline) to the page address

const ERRORS = {
    transport: {
        title: 'Live updates are paused',
        text: "We can't reach the live transport feed right now. To avoid showing you old times, live status is hidden for now.",
        info: 'Metro M3 runs every 3 to 4 min on race day',
        primary: { label: 'Try again', action: 'retry' },
        secondary: { label: 'Open full map', action: 'map.html' }
    },
    map: {
        title: "The map couldn't load",
        text: 'Part of the map is missing right now. Try again, or ask a volunteer in a yellow vest for directions.',
        info: 'Info tent: Øster Allé, by the entrance to Fælledparken',
        primary: { label: 'Try again', action: 'retry' },
        secondary: { label: 'Back to home', action: 'index.html' }
    },
    offline: {
        title: 'The kiosk is offline',
        text: 'You can still read about the marathon. Live transport and the map return when the connection is back.',
        info: 'We try to reconnect automatically every 30 seconds',
        primary: { label: 'OK, continue', action: 'marathon.html' },
        secondary: { label: 'Try again', action: 'retry' }
    }
};

function showError(type, lastUpdate) {
    const error = ERRORS[type];
    if (!error) return;
    hideError();

    // data timestamp: tell people how old the last good data is
    const info = lastUpdate ? `Last update ${lastUpdate}  ·  ${error.info}` : error.info;

    const overlay = document.createElement('div');
    overlay.className = 'error-overlay';
    overlay.dataset.type = type;
    overlay.innerHTML = `
        <div class="error-card" role="alertdialog" aria-modal="true" aria-labelledby="error-title">
            <div class="error-icon" aria-hidden="true">!</div>
            <h2 class="error-title" id="error-title">${error.title}</h2>
            <p class="error-text">${error.text}</p>
            <p class="error-info">${info}</p>
            <div class="error-buttons">
                <button class="primary">${error.primary.label}</button>
                <button class="secondary">${error.secondary.label}</button>
            </div>
        </div>`;

    overlay.querySelector('.primary').onclick = () => runAction(error.primary.action, type);
    overlay.querySelector('.secondary').onclick = () => runAction(error.secondary.action, type);
    document.body.appendChild(overlay);
    overlay.querySelector('.primary').focus();
}

function hideError() {
    document.querySelectorAll('.error-overlay').forEach(el => el.remove());
}

// 'retry' closes the pop-up and lets the page reload its data; anything else is a page link
function runAction(action, type) {
    if (action === 'retry') {
        hideError();
        document.dispatchEvent(new CustomEvent('error-retry', { detail: type }));
    } else {
        location.href = action;
    }
}

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') hideError();
});

// the kiosk shows the offline pop-up by itself when the internet drops
window.addEventListener('offline', () => showError('offline'));
window.addEventListener('online', () => {
    if (document.querySelector('.error-overlay[data-type="offline"]')) hideError();
});

const previewError = new URLSearchParams(location.search).get('error');
if (previewError) showError(previewError, '08:42');
