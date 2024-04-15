import { createRouter, createMemoryHistory } from 'vue-router'
const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            component: () => import('./views/index.vue')
        },
        {
            path: "/preview",
            component: () => import("./views/preview.vue"),
        },
    ]
})
export default router