
import { fetchApi } from "../../../helpers/fetchApi"
import { navigateTo } from "../../../router"

export function Login(){
    const root = document.getElementById('root')
    root.innerHTML = `
    <div id="container">
        <form>
            <input type="email" id="loginEmail" placeholder="Enter your email">
            <input type="password" id="loginPass" placeholder="Enter your password">
            <h2>Choose your ID user</h2>
            <input type="number" id="rolId">
            <button type="submit">Login</button>
        </form>
    <a href="/register">Don't have an account</a>
    </div>
    `

    const $inputLoginEmail = document.getElementById('loginEmail')
    const $inputLoginPassword = document.getElementById('loginPass')
    const $inputRolID = document.getElementById('rolId')
    const $loginForm = document.querySelectorAll('form')[0]
    $loginForm.addEventListener('submit', async(event)=>{
        event.preventDefault()

        if(!$inputLoginEmail.value || !$inputLoginPassword.value || !$inputRolID.value){
            alert("Please, fill all fields")
        }
        const users = await fetchApi('http://localhost:3000/users')
        const user = users.find((e) => e.email === $inputLoginEmail.value && e.password === $inputLoginPassword.value && e.id === $inputRolID.value)
        const admin = await fetchApi('http://localhost:3000/users')
        const adminFound = admin.find((e) => e.email === $inputLoginEmail.value && e.password === $inputLoginPassword.value && e.id === "1")
        if(user){
            const token = Math.random().toString(36).substring(2)
            const role = user.role
            localStorage.setItem('token', token)
            localStorage.setItem('role', role)
            navigateTo('/home') 
        }
        if(adminFound){
            const adminTK = Math.random().toString(36).substring(2)
            localStorage.setItem('adminTK', adminTK)
        }else{alert("Invalid credentials")}
        

        
    })
}