import Axios from 'axios'
import NProgress from '@/plugins/nprogress'

const CancelToken = Axios.CancelToken
const source = CancelToken.source()
const pendingCalls = {}

const apios = Axios.create({
    baseURL: process.env.VUE_APP_API_URL + '/' + process.env.VUE_APP_API_VERSION + '/',
    withCredentials: true,
    cancelToken: source.token
})

apios.interceptors.request.use(function (config) {
    if (pendingCalls[config.baseURL + config.url] === true) return {
        ...config, cancelToken: new CancelToken((cancel) => cancel())
    }
    NProgress.start()
    pendingCalls[config.baseURL + config.url] = true
    return config
}, function (error) {
    return Promise.reject(error)
})

apios.interceptors.response.use(function (response) {
    NProgress.done()
    pendingCalls[response.config.url] = null
    return response
}, function (error) {
    return Promise.reject(error)
})

export default apios
