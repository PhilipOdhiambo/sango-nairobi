import { defineStore } from "pinia";
import alasql from "alasql";
import { useConstStore } from "./consts";


export const useDataStore = defineStore('dataStore', {
    state:()=>({
        payments:[],
        members:[],
        loans:[],
        fines:[],
        auths:[]
    }),
    persist:false,
    actions: {
        async fetchCollection(collection){
            const constStore = useConstStore()
            const res = await(await fetch(`${constStore.url}?route=collections&coll=${collection}`)).json()        
            return res.coll
        },      
        
    },
    
    
})
