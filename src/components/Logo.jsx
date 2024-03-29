import React from 'react';
import {LAST_YEAR} from "../consts";
import "../styles/App.css"
import useMatchMedia from 'use-match-media-hook'


const Logo = () => {
    const queries = [
        '(min-width: 900px)'
    ]
    const [desktop] = useMatchMedia(queries)
    if (desktop) {
        return (
            <a className="logo" href={"?album=" + LAST_YEAR}
               style={{marginLeft: "1rem", marginTop: "40px", display: "flex", justifyContent: "center"}}>
                <img className={"logo"} src={process.env.PUBLIC_URL + "/logo2.svg"}
                     style={{height: "56px", maxWidth: "100%"}} alt={"go home page"}/></a>

        );
    } else {
        return (
            <a className="logo" href={"?album=" + LAST_YEAR}
               style={{marginLeft: "1rem", marginTop: "10px", display: "flex", justifyContent: "left"}}>
                <img className={"logo"} src={process.env.PUBLIC_URL + "/logo2.svg"}
                      alt={"go home page"}/></a>

        );
    }
};

export default Logo;