import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CURRENTLINE, CYAN, PURPLE } from '../helpers/color'
import { getGroup, getContact } from '../services/contactService'
import Spinner from './Spinner'

const ViewContact = () => {
        const {contactId}=useParams()

        const [state, setState]= useState({
          loading : false,
          contact: {},
          group: {}
        })

        useEffect(()=>{
          const fetchData = async () => {
            try{
              setState({...state,loading: true});
              const{data: contactData}= await getContact(contactId)
              const{data: groupData}= await getGroup(contactData.group)
              setState({...state,loading: false , contact: contactData, group: groupData});
            }catch(err){
              console.log(err.message)
              setState({...state,loading:false})
            }
          }

          fetchData()
        },[])

        const {contact, group, loading}= state

  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{color: CYAN}}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{backgroundColor: CYAN}}/>
      {
        loading ? (<Spinner/>) : (
          <section className='view-contact mt-e'>
        <div className="container p-2" style={{borderRadius:"1em", backgroundColor: CURRENTLINE}}>
          <div className="row align-items-center justify-content-around">
            <div className="col-md-3">
              <img alt='' src={contact.photo || 'https://placehold.co/120'} className='img-fluid rounded' style={{border:`1px solid ${PURPLE}`}}/>
            </div>
            <div className="col-md-8">
              <ul className='list-group'>
                <li className="list-group-item list-group-item-dark"> 
                  نام و نام خانوادگی : <span className='fw-bold'>{contact.fullname}</span>
                </li>
                <li className="list-group-item list-group-item-dark"> 
                  شماره موبایل : <span className='fw-bold'>{contact.mobile}</span>
                </li>
                <li className="list-group-item list-group-item-dark"> 
                  ایمیل : <span className='fw-bold'>{contact.email}</span>
                </li>
                <li className="list-group-item list-group-item-dark"> 
                  شغل : <span className='fw-bold'>{contact.job}</span>
                </li>
                <li className="list-group-item list-group-item-dark"> 
                  
                  گروه : <span className='fw-bold'>{group.name}</span>
                </li>
              </ul>
              <div className="row my-2">
                <div className="col-12 flex-reverse">
                  <Link to={"/contacts"} className='btn' style={{backgroundColor: PURPLE}}>
                  بازگشت به صفحه اصلی
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
        )
      }
    </>
  )
}

export default ViewContact