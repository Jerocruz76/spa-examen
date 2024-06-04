import { routes } from "./routes"

export function Router(){
    const path = window.location.pathname

    const publicRoutes = routes.public.find(route => route.path === path)
    const privateRoutes = routes.private.find(route => route.path === path)

    if(publicRoutes){
        publicRoutes.scene()
        return
    }

    if(privateRoutes){
        if(localStorage.getItem('token')){
            privateRoutes()
        }
        navigateTo('/register')
        return
    }
}

export function navigateTo(){
    window.history.pushState({}, '', window.location.origin + path)
    Router()
}