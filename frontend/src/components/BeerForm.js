import { useState } from "react";
import { useBeerContext } from "../hooks/useBeerContext";
import { useAuthContext } from "../hooks/useAuthContext";


const BeerForm = () => {
    const [brand, setBrand] = useState('')
    const [title, setTitle] = useState('')
    let [type, setType] = useState('Lager/pilsner')
    let [choice, setChoice] = useState('pilstomas')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {dispatch} = useBeerContext()
    const { user } = useAuthContext()

let handleTypeChange = (e) =>{
    setType(e.target.value)
}
let handleChoiceChange = (e) =>{
    setChoice(e.target.value)
}
const handleSubmit = async (e) =>{
    e.preventDefault()
    if(!user) {
        setError('Butina prisijungti.')
        return
    }
    const beer = {brand, title, type, choice}
    const response = await fetch('/api/beers', {
        method: 'POST',
        body: JSON.stringify(beer),
        headers: {'Content-Type': 'application/json',
                  'Authorization': `Bearer ${user.token}`
          }
    })
    const json = await response.json()
    if(!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }
    if(response.ok){
        setEmptyFields([])
        setBrand('')
        setTitle('')
        setType('Lager/pilsner')
        setChoice('pilstomas')
        setError(null)
        console.log('Naujas alus pridetas', json)
        dispatch({type: 'CREATE_BEER', payload: json})
    }
}
return(
    <form className="create" onSubmit={handleSubmit}>
        <h3>Prideti nauja alu</h3>
        <label>Gamintojas</label>
        <input type="text"
               onChange={(e)=> setBrand(e.target.value)} 
               value={brand}
               className={emptyFields.includes('brand') ? 'error': ''} />
        <label>Alaus pavadinimas</label>       
        <input type="text"
               onChange={(e)=> setTitle(e.target.value)} 
               value={title}
               className={emptyFields.includes('title') ? 'error': ''} />
         <label>Alaus rusis</label>
         <select name="type" type={type} onChange={handleTypeChange}>
            <option value="Lager/pilsner">Lager/pilsner</option>
            <option value="Belgisko stiliaus/eliai">Belgisko stiliaus/eliai</option>
            <option value="IPA (India Pale Ale)">IPA (India Pale Ale)</option>
            <option value="Kvietinis(baltas)">Kvietinis(baltas)</option>
            <option value="Stoutas ir porteris">Stoutas ir porteris</option>
         </select>
         <label>Kokioj taroj skaniausias</label>
         <select name="choice" choice={choice} onChange={handleChoiceChange}>
            <option value="pilstomas">pilstomas</option>
            <option value="butelio">is butelio</option>
            <option value="skardines">is skardines</option>
         </select>
         <button>Prideti jusu megstamiausia alu</button> 
          {error && <div className="error">{error}</div>}           
    </form>
)
}
export default BeerForm 