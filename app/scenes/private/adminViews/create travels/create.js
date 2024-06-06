import { fetchApi } from "../../../../helpers/fetchApi"

export function createTravel(){
    const pageContent=`
    <div id="container">
        <form>
            <label for="travelID">travel ID</label>
            <input type="number" id="travelID">
            <label for="travelNumber">travel number</label>
            <input type="number" id="travelNumber">
            <input type="text" id="travelOrigin" placeholder="Enter the origin">
            <input type="text" id="travelDestination" placeholder="Enter the destination">
            <h2>Enter the departure date</h2>
            <input type="date" id="travelDeparturedate">
            <h2>Enter the arrival date</h2>
            <input type="date" id="travelArrivaldate">
            <h2>Enter the capacity</h2>
            <input type="number" id="travelCapacity">
            <button type="submit">Submit Travel</button>
        </form>
        <div id="travels"></div>
    </div>
    `

    const logic = () => {
        const showTravel = async () => {
            const travels = await fetchApi('http://localhost:3000/bookings')
            const travelDiv = document.getElementById('travels')
            travelDiv.innerHTML = ``
            if(travels){
                travels.forEach(e => {
                    const travelContent = document.createElement('div')
                    travelContent.innerHTML = `
                    <p>ID: ${e.ID}</p>
                    <p>Number: ${e.number}</p>
                    <p>origin: ${e.origin}</p>
                    <p>destination: ${e.destination}</p>
                    <p>departure: ${e.departure}</p>
                    <p>arrival: ${e.arrival}</p>
                    <p>capacity: ${e.capacity}</p>
                    <button><a href="/editTravel">Edit travel</a></button>
                    `
                    travelDiv.appendChild(travelContent)
                });           
            }
        }
    
        const $inputTravelID = document.getElementById('travelID')
        const $inputTravelNumber = document.getElementById('travelNumber')
        const $inputTravelOrigin = document.getElementById('travelOrigin')
        const $inputTravelDestination = document.getElementById('travelDestination')
        const $inputTravelDeparture = document.getElementById('travelDeparturedate')
        const $inputTravelArrival = document.getElementById('travelArrivaldate')
        const $inputTravelCapacity = document.getElementById('travelCapacity')
    
        const $travelForm = document.querySelectorAll('form')[0]
    
        $travelForm.addEventListener('submit', async(event)=>{
            event.preventDefault()
    
            const createTravel = await fetchApi('http://localhost:3000/bookings', {
                method : 'POST',
                headers : {'Content-Type': 'application/json'},
                body : JSON.stringify({
                    ID: $inputTravelID.value,
                    number: $inputTravelNumber.value,
                    origin: $inputTravelOrigin.value,
                    destination: $inputTravelDestination.value,
                    departure: $inputTravelDeparture.value,
                    arrival: $inputTravelArrival.value,
                    capacity: $inputTravelCapacity.value
                })
    
            })
            if(createTravel){
                alert("Travel created sucessfully")
                $inputTravelID.value = ''
                $inputTravelNumber.value = ''
                showTravel()
            }else{
                alert("Something went wrong")
            }
        })
        showTravel()
    }
    return{
        pageContent,
        logic
    }
}