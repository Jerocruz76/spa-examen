import { fetchApi } from "../../../../helpers/fetchApi"

export function editTravel(){
    const travelInfo = JSON.parse(sessionStorage.getItem('travelInfo') || '{}')
    const {id, number, origin, destination, departure, arrival, capacity} = travelInfo

    const root = document.getElementById('root')
    root.innerHTML=`
    <h1>Edit travel</h1>
    <form>
        <h2>Origin date</h2>
        <input type="date" name="newOriginDate">
        <h2>Arrive date</h2>
        <input type="date" name="newArriveDate">
        <h2>Capacity</h2>
        <input type="number" name="newCapacity">
        <button type="submit">Submit</button>
    </form>
    `

    const $editForm = document.querySelectorAll('form')[0]
    $editForm.addEventListener('submit', async(e)=>{
        e.preventDefault()

        const travelUpdate = {
            departure: $editForm.elements.newOriginDate.value,
            arrive: $editForm.elements.newArriveDate.value,
            capacity: $editForm.elements.newCapacity.value
        }

        try{
            const response = await fetchApi(`http://localhost:3000/bookings/${id}`,{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body: JSON.stringify(travelUpdate)
            })
        }catch{}

    })
}