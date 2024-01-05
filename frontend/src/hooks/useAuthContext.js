import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)
    if(!AuthContext) {
        throw Error('useAuthContext turi buti AuthContextProvider viduje')
    } return context
}