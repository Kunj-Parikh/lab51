import { useState, useEffect } from "react";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import contactService from "./services/contacts";
import "./index.css";

const App = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    contactService.getContact().then((data) => setContacts(data));
  }, []);

  const handleSubmit = (newName, newEmail) => {
    const newContactObj = {
      name: newName,
      email: newEmail,
    };

    const findingContact = contacts.find(
      (contact) => contact.name.toLowerCase() === newName.trim().toLowerCase()
    );

    if (findingContact) {
      const differentContactObj = { ...findingContact, email: newEmail };
      const confirmUpdate = window.confirm(
        `Do you want to update ${findingContact.name}?`
      );
      if (confirmUpdate) {
        contactService.updateContact(differentContactObj).then((data) => {
          setContacts(contacts.map((m) => (m.id !== data.id ? m : data)));
        });
      }
    } else {
      if (newContactObj.name.trim() === "") {
        alert("The movie needs a name to be added.");
        return;
      } else {
        contactService.addContact(newContactObj).then((data) => {
          setContacts(contacts.concat(data));
        });
      }
    }
  };

  const handleDelete = (contact) => {
    const confirmDelete = window.confirm(
      `Do you want to delete ${contact.name}?`
    );
    if (confirmDelete) {
      contactService.deleteContact(contact).then((data) => {
        const filteredContacts = contacts.filter((c) => c.id !== data.id);
        setContacts(filteredContacts);
      });
    }
  };

  return (
    <div className="contacts-app">
      <AddContact handleSubmit={handleSubmit} />
      <ContactList contacts={contacts} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
