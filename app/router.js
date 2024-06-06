
import { navBar } from "./components/navbar"
import { routes } from "./routes"

export function Router(){
    const path = window.location.pathname

    const publicRoutes = routes.public.find(route => route.path === path)
    const privateRoutes = routes.private.find(route => route.path === path)
    const adminRoutes = routes.admin.find(route => route.path === path)

    if(publicRoutes){
        if(localStorage.getItem('token')){
            navigateTo('/home')
        }
        publicRoutes.scene()
        return
    }

    if(privateRoutes){
        if(localStorage.getItem('token')){
            const {pageContent, logic} = privateRoutes.scene()
            navBar(pageContent,logic)
            return
        }
        navigateTo('/login')
    }

    if(adminRoutes){
        if(!localStorage.getItem('adminTK')){
            if(path === '/createTravel'){
                navigateTo('/home')
                alert("Usted no es administrador")
            }
            if(path === '/editTravel'){
                navigateTo('/home')
                alert("Usted no es administrador")
            }
        }
        if(localStorage.getItem('adminTK')){
            const {pageContent, logic} = adminRoutes.scene()
            navBar(pageContent,logic)
            return
        }
    }
}

export function navigateTo(path){
    window.history.pushState({}, '', window.location.origin + path)
    Router()
}