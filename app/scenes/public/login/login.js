import { fetchApi } from "../../../helpers/fetchApi"
import { navigateTo } from "../../../router"

export function Login(){
    const root = document.getElementById('root')
    root.innerHTML = `
    <div id="container">
        <form>
            <input type="email" id="loginEmail" placeholder="Enter your email">
            <input type="password" id="loginPass" placeholder="Enter your password">
            <button type="submit">Login</button>
        </form>
    <a href="/register">Don't have an account</a>
    </div>
    `

    const $inputLoginEmail = document.getElementById('loginEmail')
    const $inputLoginPassword = document.getElementById('loginPass')
    const $loginForm = document.querySelectorAll('form')[0]
    $loginForm.addEventListener('submit', async(event)=>{
        event.preventDefault()

        if(!$inputLoginEmail.value || !$inputLoginPassword.value){
            alert("Please, fill all fields")
        }

        const searchUsers = fetchApi('http://localhost:3000/users')
        const userFound = searchUsers.find(user => user.email === $inputLoginEmail.value && user.password === $inputLoginPassword.value)
        if(userFound){
            navigateTo('/home')
        }
    })
}