import React, {useEffect, useMemo, useState} from "react";
import {current_year, years} from "../../consts";
import MySelect from "../UI/Select/MySelect";
import axios from "axios";
import Seleclor from "./Seleclor";
import Search from "./Search";


export const Header = () => {

    return <div>
        {/*<div>
            {events}
        </div>*/}
        {/*<img className={"logo"} src={"/logo512.png"}/>*/}
        <Search/>
        <Seleclor/>
    </div>
}
export default Header;