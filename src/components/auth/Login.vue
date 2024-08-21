<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import ModalForRouting from '@/components/ModalForRouting.vue';


const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const updateNewUSer = ref(false)
const username = ref('')
const password = ref('')
const salt = ref(null) // For encripting new password. This comes from backend
const confirmPassword = ref(null)

const passwordUmatched = ref(false)
const loginFail = ref(false)
const isFetching = ref(false)


const url = "https://script.google.com/macros/s/AKfycbzKeCubgcWbW1e94Bt58cyrLd43sCYeOBdhXADjyzkKj78ObFAvie1m9fcPWmM74msi/exec"

async function submit() {
    if (password.value == '' || username.value == '') {
        loginFail.value = true
        return
    }
    isFetching.value = true
    let res = await (await fetch(`${url}?route=login&username=${username.value}&password=${password.value}`)).json()
    if (res && res.status == 'new') {
        // First time login
        password.value = ''
        updateNewUSer.value = true
        isFetching.value = false
        return
    } else if (res && res.status == 'ok') {
        let res = await (await fetch(`${url}?route=login&username=${username.value}&password=${password.value}`)).json()
        if (res) {
            localStorage.setItem('user', res.user.token)
            authStore.login(res.user)
            isFetching.value = false
            router.push('/')
        }
    } else {
        // Login failured
        isFetching.value = false
        loginFail.value = true
    }


}


async function submitNewUSer() {
    if (password.value != confirmPassword.value) {
        passwordUmatched.value = true
        return
    }
    isFetching.value = true

    const user = await (await fetch(`${url}?route=update-login&username=${username.value}&password=${password.value}`)).json()
    if (user) {
        localStorage.setItem('user', user.token)
    }

    fetch(`${url}?route=update-login&username=${username.value}&password=${password.value}`)
        .then(res => res.json())
        .then(res => {
            isFetching.value = false
            if (res.user) {
                localStorage.setItem('user', JSON.stringify({
                    username: res.user.username,
                    token: res.user.token,
                    role: res.user.role
                }))
                router.push('/profile')
            }
        })

}
</script>

<template>
    <ModalForRouting v-if="isFetching"/>
      

    <form v-if="!updateNewUSer">
        <div style="height: 80vh;" class="flex justify-center items-center bg-gray-100">
            <div class="max-w-screen-sm mx-2 border p-10 rounded-sm shadow-md">
                <h1 class="mb-5 font-semibold text-gray-600  md:text-cnter">Log in to Sango Nairobi SHG</h1>
                <div class="my-2">
                    <label class="inline-block w-20" for="username">Username: </label>
                    <input class="border rounded-sm" type="text" v-model="username" id="username" required>
                </div>
                <div class="my-2">
                    <label class="inline-block w-20" for="password">Password: </label>
                    <input class="border rounded-sm " type="password" v-model="password" id="password" required>
                </div>
                <div class="text-center mt-5">
                    <button class="border px-3 py-2 rounded-sm" type="submit" @:click.prevent="submit()">Submit</button>
                </div>
                <div v-if="loginFail" class="text-center mt-5">
                    <p class="text-red-500">Login failed. Try again or seek help</p>
                </div>
            </div>
        </div>
    </form>
    <form v-if="updateNewUSer">
        <div style="height: 80vh;" class="flex justify-center items-center bg-gray-100">
            <div class="max-w-screen-sm mx-2 border p-10 rounded-sm shadow-md">
                <h1 class="mb-5 font-semibold text-gray-600  md:text-cnter">Update Password</h1>

                <div class="my-2">
                    <label class="inline-block w-20" for="password">New Password: </label>
                    <input class="border rounded-sm " type="password" v-model="password" id="password"
                        pattern="Set your own">
                </div>
                <div class="my-2">
                    <label class="inline-block w-20" for="password">Confirm Password: </label>
                    <input class="border rounded-sm " type="password" v-model="confirmPassword" id="password">
                </div>
                <div v-if="passwordUmatched" class="text-center mt-5">
                    <p class="text-purple-400">Password did not match? Check and retry</p>
                </div>
                <div class="text-center mt-5">
                    <button class="border px-3 py-2 rounded-sm" type="submit"
                        @:click.prevent="submitNewUSer()">Submit</button>
                </div>
            </div>
        </div>
    </form>
</template>
