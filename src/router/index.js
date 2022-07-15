import { createRouter,createWebHistory } from 'vue-router'
import movieDetail from '../pages/movieDetail.vue'
import Home from '../pages/theHome.vue'

var router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',redirect:'/home'
        },
        {
            path:'/home',component:Home
        },
        {
            path:'/home/:id',component:movieDetail
        }
    ]
})

export default router;