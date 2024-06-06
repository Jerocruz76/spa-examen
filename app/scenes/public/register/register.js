import { fetchApi } from "../../../helpers/fetchApi"
import { navigateTo } from "../../../router"

export function Register(){
    const root = document.getElementById('root')
    root.innerHTML = `
    <div id="container">
        <form>
            <input type="text" id="registerName" placeholder="Enter your name">
            <input type="email" id="registerEmail" placeholder="Enter your email">
            <input type="password" id="registerPass" placeholder="Enter your password">
            <label for="userDate">Choose your born date</label>
            <input type="date" id="userDate"> 
            <button type="submit">Register</button>
        </form>
        <a href="/login">Already have an account</a>
    </div>
    `

    const $inputRegisterName = document.getElementById('registerName')
    const $inputRegisterEmail = document.getElementById('registerEmail')
    const $inputRegisterPass = document.getElementById('registerPass')
    const $inputRegisterDate = document.getElementById('userDate')
    const $registerForm = document.querySelectorAll('form')[0]

    $registerForm.addEventListener('submit', async (event)=>{
        event.preventDefault()
        
        if(!$inputRegisterName.value || !$inputRegisterEmail.value || !$inputRegisterPass.value || !$inputRegisterDate.value){
            alert("Please fill all fields")
            return
        }

        const createUser = await fetchApi('http://localhost:3000/users',{
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: $inputRegisterName.value,
                email: $inputRegisterEmail.value,
                password: $inputRegisterPass.value,
                bornDate: $inputRegisterDate.value,
                role: "user",
                id: "2"
            })
        })

        if(createUser){
            alert("Register sucessfully")
            navigateTo('/login')
        }
    })
}