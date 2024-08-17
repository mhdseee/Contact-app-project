import React from 'react'
import { useState, useEffect } from 'react'
import {Routes, Route, Navigate, useNavigate} from "react-router-dom"
import { confirmAlert } from 'react-confirm-alert'
import {ContactContext} from "./context/ContactContext"

import "./App.css"
import {
  Contacts,
  Contact,
  AddContact,
  EditContact,
  ViewContact,
  Search,
  Spinner,
  Navbar
} from "./components/index"
import {getAllContacts, getAllGroups, createContact, deleteContact} from "./services/contactService"
import { CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from './helpers/color'

const App = () => {
  const [contacts, setContacts]= useState([])
  const [groups, setGroups]= useState([])
  const[filteredContacts, setFilteredContacts]= useState([])

  const [loading, setLoading]= useState(false)
  const [contact, setContact] = useState({});

  const[contactQuery, setContactQuery] = useState({text: ""})

  const navigate= useNavigate()

  useEffect (()=>{
    const fetchData= async()=>{
      try{
        setLoading(true)
        const {data : contactsData}= await getAllContacts();
        const {data : groupsData}= await getAllGroups();
        setContacts(contactsData)
        setFilteredContacts(contactsData)
        setGroups(groupsData)

        
        setLoading(false)
      }catch(err){
        console.log(err.message)
        setLoading(false)
      }
    }
    fetchData()
  },[])

  const onContactChange = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };



  const createContactForm = async (event) =>{
    event.preventDefault();
    try{
      setLoading((prevLoading)=> !prevLoading)
      const {status, data} = await createContact(contact);

      if(status===201){
        const allContacts= [...contacts, data]
        setContacts(allContacts)
        setFilteredContacts(allContacts)
        
        setContact({})
        setLoading((prevLoading)=> !prevLoading)
        navigate("/contacts")
      }
    }catch(err){
      console.log(err.message)
      setLoading((prevLoading)=> !prevLoading)
    }
  }

  const confirmDelete = (contactId, contactFullname) => {
    confirmAlert({
      customUI: ({onClose})=> {
        return(
          <div dir='rtl' style={{backgroundColor: CURRENTLINE, border:`1px solid ${PURPLE}`, borderRadius:'1em', padding:'2rem'}}>
            <h1 style={{color: YELLOW}}>پاک کردن مخاطب</h1>
            <p style={{color: FOREGROUND}}>آیا از حذف {contactFullname} اطمینان دارید؟</p>
            <button className='btn btn-outline-danger mx-2' onClick={()=>{
              removeContact(contactId)
              onClose()
            }}>تأیید</button>
            <button className='btn btn-outline-info' onClick={onClose}>
              انصراف
            </button>

          </div>
        )
      }
    })
  }

  const removeContact= async (contactId)=>{
    try{
      setLoading(true)
      const response= await deleteContact(contactId);
      if(response){
        const {data: contactsData}= await getAllContacts()
        setContacts(contactsData)
        setFilteredContacts(contactsData)
        setLoading(false)
      }
    }catch(err){
      console.log(err.message)
      setLoading (false)
    }
  }


  const contactSearch= (event)=>{
      setContactQuery({...contactQuery, text: event.target.value})
      const allContacts= contacts.filter((contact)=>{
        return contact.fullname.toLowerCase().includes(event.target.value.toLowerCase());
      })
      setFilteredContacts(allContacts)
  }


  return (
    <ContactContext.Provider value={{
      loading,
      setLoading,
      contact,
      setContact,
      contacts,filteredContacts,
      contactQuery,
      groups,
      onContactChange,
      deleteContact: confirmDelete,
      contactSearch,
      createContact: createContactForm
    }}>
      <div>
      <Navbar />
      <Routes>
        <Route path='/' element={ <Navigate to="/contacts" />}/>
        <Route path='/contacts' element={<Contacts />} />
        <Route path='/contacts/:contactId' element={<ViewContact />} />
        <Route path='/contacts/add' element={<AddContact />} />
        <Route path='/contacts/edit/:contactId' element={<EditContact />} />
      </Routes>
    </div>
    </ContactContext.Provider>
  )
}

export default App
