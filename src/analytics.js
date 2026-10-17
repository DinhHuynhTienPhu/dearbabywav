// GoatCounter (free, no cookies). The script tag is in public/index.html; it skips localhost by itself.
export const GOATCOUNTER_SITE = 'https://pphus1011.goatcounter.com';
// window.goatcounter is missing when the script is blocked (adblock) or not loaded yet -> just skip.
// Use language-independent names so the same click is counted under one name in every language.
export function trackClick(name) {
    if (window.goatcounter && window.goatcounter.count) {
        window.goatcounter.count({ path: name, title: name, event: true });
    }
}
