import { fetchApi } from "../../../helpers/fetchApi"
import { navigateTo } from "../../../router"

export function homeScene(){
    let role = localStorage.getItem('role')
    let travelBtn
    let addTravel
    if(role === 'admin'){
        travelBtn = `
        <button id="editTravel" data-id="edit">Edit travel</button>
        <button id="deleteTravel" data-id="delete">Delete travel</button>
        `
        addTravel=`<button id="createTravel"><a href="/createTravel">Create travel</a></button>`
    }
    if(role === 'user'){
        travelBtn=`<button id="buyTicket">Book</button>`
    }

    const logic = () => {
        const existingTravels = 'http://localhost:3000/bookings'
    const showTravel = async () => {
        const response = await fetchApi(existingTravels)
        const travels = await response
        travels.forEach(travel => {
            appendTravel(travel)
        });
        btnFunc()
    }

    function appendTravel(travel){
        const show = document.createElement('div')
        show.className = 'show'
        show.innerHTML = `
        <div id="container">
            <div id="travelInfo">
                <h2>Number: ${travel.number}</h2>
                <h3>origin: ${travel.origin}</h3>
                <h4>destination: ${travel.destination}</h3>
                <h5>departure: ${travel.departure}</h4>
                <h6>arrival: ${travel.arrival}</h4>
                <p>capacity: ${travel.capacity}</p>
            </div>
            <div id="Btn">${travelBtn}</div>
        </div>
        `
    }

    const btnFunc = () => {
        if(role === 'user'){
            const $btnBook = document.querySelectorAll('#buyTicket')
            $btnBook.forEach(btn => {
                btn.addEventListener('click', (e)=>{
                    const show = e.target.closest('.show')
                    const number = e.target.getAttribute('data-id')
                    const origin = show.querySelector('h3')
                    const destination = show.querySelector('h4')
                    const departure = show.querySelector('h5')
                    const arrival = show.querySelector('h6')
                    const capacity = show.querySelector('p')

                    const travelInfo = {number, origin, destination, departure, arrival, capacity}
                    sessionStorage.setItem('travelInfo', JSON.stringify(travelInfo))
                })
            })
        }
        if(role === 'admin'){
            const $buttonEdit = document.querySelector('#edit')
            const $buttonDelete = document.querySelector('#delete')
            const $buttonCreate = document.querySelector('#createTravel')
            
            $buttonEdit.forEach(button =>{
                button.addEventListener('click', () => {
                    const show = e.target.closest('.show')
                    const number = e.target.getAttribute('data-id')
                    const origin = show.querySelector('h3')
                    const destination = show.querySelector('h4')
                    const departure = show.querySelector('h5')
                    const arrival = show.querySelector('h6')
                    const capacity = show.querySelector('p')

                    const travelInfo = {number, origin, destination, departure, arrival, capacity}
                    sessionStorage.setItem('travelInfo', JSON.stringify(travelInfo))

                    navigateTo('/editTravel')
                })
            })

            $buttonDelete.forEach(button => {
                button.addEventListener('click', async(e) => {
                    const id = e.target.getAttribute('data-id')
                    const travelNumber = e.target.closest('.show').querySelector('h2').textContent
                    const confirmed = confirm('Do you really want to delete this travel?')
                    if(confirmed){
                        const response = (`http://localhost:3000/bookings/${id}`, {
                            method: 'DELETE'
                        })
                        if(response.ok){
                            const show = button.closest('.show')
                            if(show){
                                show.remove()
                            }
                        }
                    }
                })
            })
            
            $buttonCreate.addEventListener('click', () => {
                navigateTo('/createTravel')
            })
        }
        showTravel()
    }
    }
    
    const pageContent = `
    <div id="container">
        <h1>Welcome!</h1>
        <div id="travelView"></div>
        ${addTravel || ""}
    </div>
    `
    return {pageContent,logic}
}