import { useContext } from "react"
import Contact from "./Contact"
import Spinner from "./Spinner"
import { ContactContext } from "../context/ContactContext"
import { PINK, BACKGROUND, COMMENT } from "../helpers/color"
import {Link} from 'react-router-dom'

const Contacts = () => {
    const {contacts,loading, deleteContact }= useContext(ContactContext)
  return (
    <div >
        <section className="container">
            <div className="grid">
                <div className="row">
                    <div className="col">
                    <p className="h3">
                                    <Link to="add" className="btn m-2" style={{background: PINK}}>
                                    <i className="fa fa-plus"></i>
                                    افزودن مخاطب
                                    </Link>
                                </p>
                    </div>
                </div>
            </div>
        </section>
        <section className="container">
            <div className="row">
            {
                        loading ? <Spinner /> :
                        contacts.length > 0 ? contacts.map(c=>(
                            <Contact key={c.id} contact={c} deleteContact={()=> deleteContact(c.id,c.fullname)} />
                        )) : (
                            <div className="text-danger text-center p-5" style={{background: BACKGROUND}}> مخاطبی یافت نشد</div>
                        )
            }
            </div>
        </section>
    </div>
  )
}

export default Contacts