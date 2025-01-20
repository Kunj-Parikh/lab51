import { useState } from "react";

const ContactList = ({ contacts , handleDelete}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const filteredContacts = contacts.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  // console.log(contacts);

  return (
    <>
    <h2>Contact List</h2>
      <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch}/>
      <table className="contact-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {filteredContacts.length === 0 ? (
            <tr className="green-row">
              <td colSpan={3}>No Contact Found</td>
            </tr>
          ) : (
            filteredContacts.map((contact, index) => (
              <tr
                key={contact.id}
                className={index % 2 === 0 ? "green-row" : "green-row-dark"}
              >
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td><button onClick={() => handleDelete(contact)} className={index % 2 === 1 ? "green-row" : "green-row-dark"}>Remove</button></td>
              </tr>
            ))
          )}
          
        </tbody>
      </table>
    </>
  );
};

export default ContactList;