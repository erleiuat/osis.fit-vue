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

apios.interceptors.request.use(config => {
    if (pendingCalls[config.baseURL + config.url] === true) return {
        ...config, cancelToken: new CancelToken((cancel) => cancel())
    }

    NProgress.start()
    pendingCalls[config.baseURL + config.url] = true
    return config
}, err => {
    return Promise.reject(err)
})

apios.interceptors.response.use(res => {
    NProgress.done()
    pendingCalls[res.config.url] = null
    return res.data
}, err => {
    if (err.constructor.name === 'Cancel') return Promise.reject(err)
    NProgress.done()
    pendingCalls[err.response.config.url] = null
    return Promise.reject(err.response)
})

export default apios
