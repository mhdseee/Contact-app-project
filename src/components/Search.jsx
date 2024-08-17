import { useContext } from "react"
import {PURPLE, CURRENTLINE} from "../helpers/color"
import { ContactContext } from "../context/ContactContext"
import React from "react"


const Search = () => {
    const {contactQuery, contactSearch}= useContext(ContactContext)
    return (
        <React.Fragment>
            <div className="input-group mx-2 w-75" dir="ltr">
                <span className="input-group-text" style={{ backgroundColor: PURPLE }}>
                    <i className="fa fa-search"></i>
                </span>
                <input dir="rtl" type="text" style={{  borderColor: CURRENTLINE}} className="form-control" placeholder="جستجوی مخاطب" value={contactQuery.text} onChange={contactSearch}/>
            </div>
        </React.Fragment>
    )
}

export default Search  