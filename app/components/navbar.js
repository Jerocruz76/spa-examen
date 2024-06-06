import { navigateTo } from "../router"

export function navBar(pageContent, logic){
    const root = document.getElementById('root')
    const logout = `<button type="submit" id="logout">LogOut</button>`
    root.innerHTML = `
        <div id= "container">
            <nav>
                <ul>
                    <li><a href="/home">Home</a></li>
                </ul>
                ${logout}
            </nav>
        </div>
        ${pageContent}
    `
    logic()

    const $logoutButton = root.querySelector('#logout')

    $logoutButton.addEventListener('click',() => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('adminTK')
        navigateTo('/login')
    })
}