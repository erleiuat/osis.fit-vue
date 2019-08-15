import { register } from 'register-service-worker'

import NProgress from '@/plugins/nprogress'

/* eslint-disable no-console */
if (process.env.NODE_ENV === 'production')
    register(`${process.env.BASE_URL}service-worker.js`, {
        ready () {
            console.log(
                'App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB'
            )
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
