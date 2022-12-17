import ContactForm from './ContactForm';
import  { useState,useEffect } from 'react';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import Filter from './Filter';
import Notiflix from 'notiflix';
import { PhoneBook, PhonebookContainer, ContactsTitle } from './App.styled';


export const App = () => {

  const [filter, setFilter] = useState('')
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  
    useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


    const addContact = ({ name, number }) => {
    const existingName = contacts.find(contact => contact.name === name);
    existingName !== undefined
      ?  Notiflix.Notify.warning(`${name} is already in contacts.`, {
        width: '500px',
        height: '40px',
        backOverlay: true,
        clickToClose: true,
        closeButton: true,
      })
      : setContacts([...contacts, { id: nanoid(), name, number }]);
  };



  const  deleteContact = contactId => {
 
     setContacts(contacts.filter(contact => contact.id !== contactId));
  };
  const  changeFilter = e => {
    const { value } = e.target;
    setFilter(value);
  };
  const normalizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

  return (
      <PhonebookContainer>
        <PhoneBook>Phonebook</PhoneBook>
        <ContactForm onSubmit={addContact} />
        <Filter value={filter} onChange={changeFilter} />

        <ContactsTitle>Contacts</ContactsTitle>
        {contacts.length > 0 ? (
          <ContactList
            contacts={filterContacts}
            onDeleteContact={deleteContact}
          />
        ) : (
          Notiflix.Notify.info('Your phonebook is empty. Please add contact.', {
            position: 'center-bottom',
            backOverlay: true,
            clickToClose: true,
            closeButton: true,
            info: {
              background: '#8f9a9b',
              textColor: '#0c0b0b',
              childClassName: 'notiflix-notify-info',
              notiflixIconColor: '#f7f4f4',
              fontAwesomeClassName: 'fas fa-info-circle',
              backOverlayColor: 'rgba(38,192,211,0.2)',
            },
          })
        )}
      </PhonebookContainer>
    );
}


export default App;
