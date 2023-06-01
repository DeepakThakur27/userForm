import { useEffect } from "react";
import { Link } from "react-router-dom";

import './style.css';

export const Header = () => {

    return (

        <div className="header"  >
            <Link to='/logOut' className="headerLink">SignOut</Link>
        </div>

    )
}