
import Apios from '@/store/Apios'

const actions = {

    add (context, fData) {
        return new Promise((resolve, reject) => {
            Apios.post('upload/', fData).then(res => {
                resolve({
                    id: res.data.item.id,
                    fullPath: res.data.item.fullPath,
                    lazyPath: res.data.item.lazyPath
                })
            }).catch(err => {
                reject(err)
            })
        })
    }

    /* TODO ???
    delete (context, item) {
        return new Promise((resolve, reject) => {
            Apios.post('food/delete/', { id: item.id }).then(() => {
                context.commit('deleteItem', item)
                resolve()
            }, err => {
                reject(err.data.condition)
            }).catch(() => { })
        })
    }
    */

}

export default {
    namespaced: true,
    actions
}
