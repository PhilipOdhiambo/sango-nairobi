import { defineStore } from "pinia";

export const useConstStore = defineStore('url',{
    state:()=>({
        url: "https://script.google.com/macros/s/AKfycbzKeCubgcWbW1e94Bt58cyrLd43sCYeOBdhXADjyzkKj78ObFAvie1m9fcPWmM74msi/exec"
    })
})