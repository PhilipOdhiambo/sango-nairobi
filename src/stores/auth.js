import { defineStore } from "pinia";
import { useConstStore } from "./consts";
export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null
    }),

    actions: {
        async fetchUserData(token) {
            const constStore = useConstStore()
            const res = await (await fetch(`${constStore.url}?route=auth-user&token=${token}`)).json()
            if (res.user) {
                this.user = res.user
                return res.user
            }else{
                localStorage.clear()
                this.user = null
            }
        },

        async login(username,password) {
            let res = await (await fetch(`${useConstStore().url}?route=login&username=${username}&password=${password}`)).json()
            if (res && res.status == 'new') {
                // First time login
                return 'new'
            }else if(res && res.status == 'ok'){
                // Regular login
                this.user = res.user
                localStorage.setItem('user', res.user.token);
                return 'ok'
            }else {
                // provided wrong password or nework error
                this.user = null
                localStorage.removeItem('user');
                return 'fail'
            }
        },

        async updateLogin(username,password) {
            const res = await (await fetch(`${useConstStore().url}?route=update-login&username=${username}&password=${password}`)).json()
            if (res) {
                this.user = res.user
                localStorage.setItem('user', res.user.token)
                return 'ok'
            }
            return 'fail'
        },
        async logout(token) {
            const res = await (await fetch(`${useConstStore().url}?route=logout&token=${token}`)).json()
            if (res.success) {
                this.user = null
                localStorage.removeItem('user')
                return 'ok'
            }
            return 'fail'
        },

    }
})