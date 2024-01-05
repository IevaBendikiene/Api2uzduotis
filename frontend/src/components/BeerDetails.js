import { useState } from "react"
import { useBeerContext } from "../hooks/useBeerContext"
import { useAuthContext } from "../hooks/useAuthContext"


const BeerDetails = ({beer}) =>{
    const [likes, setLikes] = useState(0)
    const {dispatch} = useBeerContext()
    const { user } = useAuthContext()

    const handleLikes = async () => {
        setLikes(prevLikes => prevLikes + 1)
    
        try {
            const response = await fetch('/api/beers/' + beer._id, {
                method: 'PATCH',
                body: JSON.stringify({ likes: likes }),
                headers: { 'Content-Type': 'application/json' }
            })
    
            const json = await response.json()
    
            if (!response.ok) {
                console.error('Error updating likes:', json.error)
            }
        } catch (error) {
            console.error('Error updating likes:', error)
        }
    }
    const handleClick = async () =>{
        if(!user){return}
        const response = await fetch('/api/beers/' + beer._id, {
            method: 'DELETE',
            headers: {'Authorization': `Bearer ${user.token}`}
        })
        const json = await response.json()
        if (response.ok) {
            dispatch({type: 'DELETE_BEER', payload: json})
        }
    }
    return (
        <div className="beer-details">
           <h3>{beer.brand} - {beer.title}</h3>
           <h4>{beer.type}</h4>
           <p>{beer.choice==='pilstomas' ? `Skaniausias pilstomas`: `Skaniausias is ${beer.choice}`}</p>
           <div className="icons">
                 <div onClick={handleLikes} className="likes">{likes}<span className={likes > 0 ? "material-symbols-outlined loved" : "material-symbols-outlined" }>favorite</span></div>
                <span className="material-symbols-outlined" onClick={handleClick}>   delete</span>
            </div>    
        </div>
    )
}
export default BeerDetails

