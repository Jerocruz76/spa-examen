import { Router } from "./router"

export function App(){
    const root = document.getElementById('root')
    if(!root){
        throw new Error ('Error, esta página no existe')
    }
    Router()
}