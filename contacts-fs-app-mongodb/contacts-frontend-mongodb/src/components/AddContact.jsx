import { useState } from "react";

const AddContact = ({ handleSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleInputChange1 = (e) => setNewName(e.target.value);
  const handleInputChange2 = (e) => setNewEmail(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(newName, newEmail);
    setNewName("");
    setNewEmail("");
  };

  return (
    <>
    <h2>Add a New Contact</h2>
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Enter contact name" value={newName} onChange={handleInputChange1}/>
      <input type="text" placeholder="Enter email" value={newEmail} onChange={handleInputChange2}/>
      <button type="submit">Add Contact</button>
    </form>
    </>
  );
};

export default AddContact;
