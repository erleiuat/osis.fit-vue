/* eslint-disable no-console */

import { register } from 'register-service-worker'

import NProgress from '@/plugins/nprogress'

// This is the "Offline page" service worker

// Add this below content to your HTML page, or add the js file to your page at the very top to register service worker

// Check compatibility for the browser we're running this in
if ('serviceWorker' in navigator)
    if (navigator.serviceWorker.controller) {
        console.log('[PWA Builder] active service worker found, no need to register')
    } else {
        // Register the service worker
        navigator.serviceWorker
            .register('pwabuilder-sw.js', {
                scope: './'
            })
            .then(function (reg) {
                console.log('[PWA Builder] Service worker has been registered for scope: ' + reg.scope)
            })
    }

if (process.env.NODE_ENV === 'production')
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready () {
            console.log('App is being served from cache by a service worker.')
        },
        registered () {
            console.log('Service worker has been registered.')
        },
        cached () {
            console.log('Content has been cached for offline use.')
            NProgress.done()
        },
        updatefound () {
            console.log('New content is downloading.')
            NProgress.start()
        },
        updated () {
            console.log('New content is available; please refresh.')
            window.location.reload(true)
        },
        offline () {
            console.log('No internet connection found. App is running in offline mode.')
        },
        error (error) {
            console.error('Error during service worker registration:', error)
        }
    })

/* eslint-enable no-console */
