import { useEffect } from "react"
import BeerDetails from '../components/BeerDetails'
import BeerForm from '../components/BeerForm'
import { useBeerContext } from "../hooks/useBeerContext"

const Home = () => {
    const {beers, dispatch} = useBeerContext()

    useEffect(()=> {
        const fetchBeers = async () =>{
            const response = await fetch('/api/beers')
            const json = await response.json()
            if(response.ok) {
                dispatch({type:'SET_BEERS', payload: json})
            }
        }
         fetchBeers()
       
       
    },[dispatch])
    return (
        <div className="home">
            <div className="beers">
                {beers && beers.map((beer) => (
                    <BeerDetails key={beer._id} beer={beer} />
                ))}
            </div>
            <BeerForm />
        </div>
    )
}

export default Home