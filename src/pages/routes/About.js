import { Outlet, Navigate } from "react-router-dom";
import Base from "../Base";
import { isLoggedin } from "../../auth/auth";

const About=()=>{
    
    return isLoggedin() 
        ? (
            <Base>
                <Outlet/>
            </Base>
        ) 
        : <Navigate to={"/login"} />
}
export default About;