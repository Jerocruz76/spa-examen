import { navigateTo } from "../../../router"

export function bookScene(){
    const pageContent = `
    <div class="bookContainer">
        <h1>Booked travels</h1>
        <div id="bookedTravels" class="bookedTravels"></div>
    </div>
    `
    const logic = ()=>{
        const travelInfo = JSON.parse(sessionStorage.getItem('travelInfo'))

        if(!travelInfo){
            alert("There's nothing to see here")
            navigateTo('/home')
            return
        }

        const bookedTravels = document.getElementById('bookedTravels')
        bookedTravels.innerHTML=`
        <p>${travelInfo.ID}</p>
        <p>${travelInfo.number}</p>
        <p>${travelInfo.origin}</p>
        <p>${travelInfo.destination}</p>
        <p>${travelInfo.departure}</p>
        <p>${travelInfo.arrival}</p>
        <p>${travelInfo.capacity}</p>
        `
    }
    return{
        pageContent,
        logic
    }
}