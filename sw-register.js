// ── Cordas de Ouro | SW Registration ───────────────────────────────────────
(function () {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('./sw.js', { scope: './' })
            .then((reg) => {
                console.log('[SW] Registered. Scope:', reg.scope);

                // Notify user when a new version is available
                reg.addEventListener('updatefound', () => {
                    const newWorker = reg.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (
                            newWorker.state === 'installed' &&
                            navigator.serviceWorker.controller
                        ) {
                            console.log('[SW] Nova versão disponível. Atualize a página.');
                            // Optionally show a toast here
                        }
                    });
                });
            })
            .catch((err) => {
                console.warn('[SW] Registration failed:', err);
            });
    });
})();
