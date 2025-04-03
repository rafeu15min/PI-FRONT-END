if('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/serviceWorker.js')
            .then(registration => {
                console.log('Service Worker registrado', registration)
            })
            .catch(err => {
                console.log('Falha ao registrar Service Worker', err)
            })
    })
}