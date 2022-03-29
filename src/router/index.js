import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from "@/views/DashboardView"
import AddPayment from "@/components/AddPayment";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '/add/payment/:category',
                name: 'quickpayment',
                component: AddPayment,
            }
        ]
    },
    {
        path: '/dashboard/',
        name: 'dashboard',
        component: DashboardView,
    },
    // {
    //     path: '/dashboard/:page',
    //     name: 'dashboard',
    //     component: DashboardView,
    //     meta: {
    //         title: ''
    //     }
    // },
    {
        path: '/about*',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    {
        path: '*',
        component: HomeView
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const userAuthExists = true

router.beforeEach((to, from, next) => {
    if (to.name !== 'about' && !userAuthExists) {
        next({
            name: 'about'
        })
    } else {
        next()
    }
});

// router.beforeResolve((to, from, next) => {
//
// });

const getTitleByRouteName = routeName => {
    return {
        'dashboard': 'Take a look',
        'about': 'Anything about',
        'NotFound': 'Ooops!'
    }[routeName]
}

router.afterEach((to) => {
    document.title = getTitleByRouteName(to.name)
});

export default router
