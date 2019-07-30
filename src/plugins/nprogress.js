
import NProgress from 'nprogress'
import(/* webpackPrefetch: true */ '@/assets/css/nprogress.css')

NProgress.doStart = NProgress.start
NProgress.doDone = NProgress.done

NProgress.clearDelay = function () {
    if (this.startDelay) {
        clearTimeout(this.startDelay)
        this.startDelay = undefined
    }
}

NProgress.start = function () {
    this.clearDelay()
    this.startDelay = setTimeout(function () {
        NProgress.doStart()
    }, this.settings.delay || 0)
}

NProgress.done = function () {
    this.clearDelay()
    this.doDone()
}

NProgress.configure({
    trickleSpeed: 50,
    showSpinner: false,
    delay: 400
})

export default NProgress
