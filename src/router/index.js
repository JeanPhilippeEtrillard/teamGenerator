import Vue from "vue";
import Router from 'vue-router';
import Players from "@/components/Players";
import Teams from "@/components/Teams";
import Home from "@/components/Home";


Vue.use(Router);


export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home
        },
        {
            path:'/players',
            name:'Players',
            component:Players
        },
        {
            path:'/teams',
            name:'Teams',
            component:Teams
        }
    ]
})