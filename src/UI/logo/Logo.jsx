import { Link } from "react-router-dom";
import LogoHeader from "@public/logo.svg"

export const Logo = () => {
    return (
        <Link to='/'>
            <img id='logo' src={LogoHeader} alt='logo'/>
        </Link>
    );
}

