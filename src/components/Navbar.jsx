
import {PURPLE,BACKGROUND} from "../helpers/color"
import Search from "./Search"
import { useLocation } from 'react-router'



const Navbar = () => {
    const location = useLocation()
    
  return (
    <>
    <nav className='navbar navbar-dark navbar-expand-sm shadow-lg' style={{background: BACKGROUND}}>
        <div className='container'>
            <div className="row w-100">
                <div className="col navbar-brand">
                    <i className='fa fa-user' style={{color: PURPLE}}></i>
                    {' '}
                    وب اپلیکیشن <span style={{color: PURPLE}}>مدیریت مخاطبین</span>
                </div>
                {
                    location.pathname === '/contacts' ? (
                        <div className="col">
                            <Search />
                        </div>
                    ) : null
                }
            </div>
        </div>
    </nav>
    
    </>
  )
}

export default Navbar