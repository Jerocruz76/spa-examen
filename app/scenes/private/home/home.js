import { fetchApi } from "../../../helpers/fetchApi"
import { navigateTo } from "../../../router"

export function homeScene(){
    let role = localStorage.getItem('role')
    let travelBtn
    let addTravel
    if(role === 'admin'){
        travelBtn = `
        <button class="editTravel" data-id="edit">Edit travel</button>
        <button class="deleteTravel" data-id="delete">Delete travel</button>
        `
        addTravel=`<button id="createTravel"><a href="/createTravel">Create travel</a></button>`
    }
    if(role === 'user'){
        travelBtn=`<button class="book" data-id="book">Book</button>`
    }

    const pageContent = `
    <div id="container">
        <h1>Welcome!</h1>
        <div id="travelView"></div>
        ${addTravel || ""}
    </div>
    `

    const logic = () => {
        const travels = "http://localhost:3000/bookings";
        const loadTravels = async () => {
            const response = await fetchApi(travels)
            const travelsOk = await response
            travelsOk.forEach(travel => {
                appendTravel(travel)
            })
            addEventListeners()
        }
        const appendTravel = (travel) =>{
            const travelContent = document.createElement('div')
            travelContent.className = "travelContent"
            travelContent.innerHTML = `
            <p>ID: ${travel.ID}</p>
            <p class="number">Number: ${travel.number}</p>
            <p class="origin">origin : ${travel.origin}</p>
            <p class="destination">destination : ${travel.destination}</p>
            <p class="departure">departure: ${travel.departure}</p>
            <p class="arrival">arrival: ${travel.arrival}</p>
            <p class="capacity">capacity: ${travel.capacity}</p>
            ${travelBtn}
            `
            const deleteButtons = travelContent.querySelector('.deleteTravel')
            if (deleteButtons) {
                deleteButtons.setAttribute('data-id', travel.id)
            }
            document.getElementById('travelView').appendChild(travelContent)
        }
        const addEventListeners = () => {
            if(role === 'user'){
                const $bookButton = document.querySelectorAll('.book')
                $bookButton.forEach(button=>{
                    button.addEventListener('click', (e)=>{
                        const travelContent = e.target.closest('.travelContent')
                        const id = e.target.getAttribute('data-id').textcontent
                        const number = travelContent.querySelector('.number').textContent
                        const origin = travelContent.querySelector('.origin').textContent
                        const destination = travelContent.querySelector('.destination').textContent
                        const departure = travelContent.querySelector('.departure').textContent
                        const arrival = travelContent.querySelector('.arrival').textContent
                        const capacity = travelContent.querySelector('.capacity').textContent

                        const travelInfo = { id,number, origin, destination, departure, arrival, capacity }
                        sessionStorage.setItem('travelInfo', JSON.stringify(travelInfo))

                        navigateTo('/bookScene')
                    })
                })
            }
            if (role === 'admin') {
                const $editButton = document.querySelectorAll('.editTravel')
                const $deleteButtons = document.querySelectorAll('.deleteTravel')
                $editButton.forEach(button => {
                    button.addEventListener('click', ()=>{
                        const travelContent = button.closest('.travelContent')
                        const id = button.getAttribute('data-id')
                        const departure = travelContent.querySelector('.departure').textContent
                        const arrival = travelContent.querySelector('.arrival').textContent
                        const capacity = travelContent.querySelector('.capacity').textContent

                        const travelInfo = {id,departure,arrival,capacity}
                        sessionStorage.setItem('travelInfo', travelInfo), JSON.stringify(travelInfo)

                        navigateTo('/editTravel')
                    })
                })
                $deleteButtons.forEach(button => {
                    button.addEventListener('click', async (e) => {
                        const id = e.target.getAttribute('data-id')
                        const confirmed = confirm(`Are you sure to delete this travel?`)
                        if (confirmed) {
                            const response = await fetchApi(`http://localhost:3000/bookings/${id}`, {
                                method: 'DELETE',
                            })
                            if(response){
                                const div = button.closest('.travelContent')
                                if (div) {
                                    div.remove()
                                }
                            }
                        }
                    })
                })
            }
        }
        loadTravels()
        addEventListeners()       
    }
    
    

    logic();
    
    return {pageContent,logic}
}