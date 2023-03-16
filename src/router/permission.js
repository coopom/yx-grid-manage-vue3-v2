import { useUserStore } from "@/store/modules";

export const createGuards = (router) => {

    const sotre = useUserStore();

    router.beforeEach((to, from, next) => {
        // if (!sotre.token) {
        //     if (to.path !== "/login") {
        //         next("/login")
        //     } else {
        //         next()
        //     }
        // } else {
        //     next();
        // }
        next();
    });

    router.afterEach(() => {

    })

    router.onError((err) => {
        console.error(err, "错误路由");
    })

}