import { BeerContext } from "../context/BeerContext";
import { useContext } from "react";
export const useBeerContext = () => {
    const context = useContext(BeerContext)
    if(!context) {
        throw Error('useBeerContext turi buti BeercontextProvider viduje')
    }
    return context
}