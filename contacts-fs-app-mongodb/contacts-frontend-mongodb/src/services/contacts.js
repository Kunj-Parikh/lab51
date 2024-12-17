import axios from "axios";

const baseURL = "/api/contacts";

const getContact = () => {
  return axios.get(baseURL).then((res) => res.data);
};

const addContact = (contact) => {
  return axios.post(baseURL, contact).then((res) => res.data);
};

const updateContact = (contact) => {
  return axios.put(`${baseURL}/${contact.id}`, contact).then((res) => res.data);
};

const deleteContact = (contact) => {
  return axios.delete(`${baseURL}/${contact.id}`).then((res) => res.data);
};

export default { getContact, addContact, updateContact, deleteContact };
