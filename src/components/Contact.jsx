import {PURPLE} from "../helpers/color"
import { Link } from "react-router-dom"
const Contact = ({contact, deleteContact}) => {
    return (
            <>
                <div className="col-6">
                    <div className="card" style={{backgroundColor:PURPLE}}>
                        <div className="card-body">
                            <div className="row d-flex align-items-center  justify-content-center">
                            

                                <div className="col-3">
                                    <img src={contact.photo || "https://via.placeholder.com/150"} className="img" alt=""/>
                                </div>

                                <div className="col-7">
                                    <ul className="list-group">
                                        <li className="list-group-item disabled">نام: <span className="fw-bold">{contact.fullname}</span></li>
                                        <li className="list-group-item disabled">شماره تماس: <span className="fw-bold">{contact.mobile}</span></li>
                                        <li className="list-group-item disabled">ایمیل: <span className="fw-bold">{contact.email}</span></li>
                                    </ul>
                                </div>

                                <div className="col-1">
                                    <Link to={contact.id} className="btn btn-warning my-1"> <i className="fa fa-eye"></i> </Link>
                                    <Link to={`edit/${contact.id}`} className="btn btn-info my-1"> <i className="fa fa-edit"></i> </Link>
                                    <button onClick={deleteContact} className="btn btn-danger text-dark my-1"> <i className="fa fa-trash"></i> </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default Contact
