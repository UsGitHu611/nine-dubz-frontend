import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const NotFound = () => {
    const redirect = useNavigate();
    useEffect(()=> {
       redirect("/", { replace: true })
    },[])
    return (<></>)
}