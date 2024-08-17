import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { getContact, getAllGroups, updateContact } from "../services/contactService"
import Spinner from "./Spinner"
import { COMMENT, RED, PURPLE } from "../helpers/color"


const EditeContact = ({forceRender,setForceRender}) => {
  const {contactId} = useParams()
  const navigate= useNavigate()

  const[state, setState]= useState({
    loading: false,
    contact: {
      fullname: '',
      photo:"",
      mobile:"",
      email:"",
      job:"",
      group:""
    },
    groups: [],

  })

  useEffect(()=> {
    const fetchData= async ()=>{
      try{
        setState({...state,loading: true});
        const{data: contactData}= await getContact(contactId)
        const {data: groupsData}= await getAllGroups()
        setState({...state,loading: false,contact: contactData, groups: groupsData})
      }catch(err){
        console.log(err.message)
        setState({...state,loading:false})
      }
    }

    fetchData()
  },[])


  const setContactInfo = (event)=>{
    setState({...state,
      contact: {
        ...state.contact,
        [event.target.name]: event.target.value,
      },
    })
  }

  const submitForm= async (event)=>{
    event.preventDefault()
    try{
      setState({...state,loading: true});
      const {data}= await updateContact(state.contact, contactId)
      setState({...state,loading: false});
      if(data){
        setForceRender(!forceRender)
        navigate("/contacts")
      }
    }catch(err){
      console.log(err.message)
      setState({...state,loading:false})
    }
  }

  const {loading, contact, groups}= state

  return (
    <>
    {
      loading ? (<Spinner/>) : (
        <section className="view-contact-intro p3">
          <div className="container">
            <div className="row">
              <div className="col">
                <p className="h4 fw-bold text-center"
                style={{color: RED}}>
                  ویرایش مخاطب
                </p>
              </div>
            </div>
            <hr style={{backgroundColor: RED}}/>
            <div className="row mt-5">
              <div className="col-md-4">
                <form onSubmit={submitForm}>
                  <div className="mb-2">
                    <input type="text" className="form-control" name="fullname" value={contact.fullname} onChange={setContactInfo} required={true} placeholder="نام و نام خانوادگی" />
                  </div>
                  <div className="mb-2">
                      <input
                        type="text"
                        name="photo"
                        value={contact.photo}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="آدرس تصویر"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="mobile"
                        value={contact.mobile}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="شماره موبایل"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="email"
                        name="email"
                        value={contact.email}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="آدرس ایمیل"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <input
                        type="text"
                        name="job"
                        value={contact.job}
                        onChange={setContactInfo}
                        className="form-control"
                        placeholder="شغل"
                        required={true}
                      />
                    </div>
                    <div className="mb-2">
                      <select
                        name="group"
                        className="form-control"
                        required={true}
                        onChange={setContactInfo}
                        value={contact.group}
                      >
                        <option value="">انتخاب گروه</option>
                        {groups.length > 0 &&
                          groups.map((group) => (
                            <option key={group.id} value={group.id}>
                              {group.name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="mx-2">
                      <input
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div>
                </form>
              </div>
              <div className="col-md-4">
                <img src={contact.photo} className="img-fluid rounded" style={{border:`1px solid ${PURPLE}`}} alt="" />
              </div>
            </div>
          </div>
        </section>
      )
    }


    </>
  )
}

export default EditeContact