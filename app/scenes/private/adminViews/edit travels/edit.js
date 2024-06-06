import { fetchApi } from "../../../../helpers/fetchApi"
import { navigateTo } from "../../../../router"

export function editTravel(){
    const travelInfo = JSON.parse.toString(sessionStorage.getItem('travelInfo')||'{}')
    const { id , departure , arrival , capacity } = travelInfo

    const pageContent =`
    <div class="container">
        <h1>Edit travel</h1>
        <form id="editTravelForm">
            <h2>Departure</h2>
            <input type="date" id="departure" name="departure" value="${departure}" disabled>
            <h2>Arrival</h2>
            <input type="date" id ="arrival" name="arrival" value="${arrival}" disabled>
            <h2>Capacity</h2>
            <input type="number" id="capacity" name="capacity" value="${capacity}" disabled>
            <button type="submit">Save</button>
        </form>
    </div>
    `

    const logic = () => {
        const form = document.getElementById('editTravelForm')
        form.addEventListener('submit', async(event)=>{
            event.preventDefault()

            const updatedTravel = {
                departure: form.elements.departure.value,
                arrival: form.arrival.value,
                capacity: form.capacity.value
            }

            try{
                const response = await fetchApi(`http://localhost:3000/bookings/${id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedTravel)
                })

                if(response){
                    navigateTo('/home')
                }else{
                    throw new Error('Something went wrong', error)
                }
            }catch(error){
                throw new Error('Something went wrong', error)
            }
        })
    }

    return{
        pageContent,
        logic
    }
}