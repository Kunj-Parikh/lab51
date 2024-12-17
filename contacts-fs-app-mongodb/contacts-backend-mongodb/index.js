const express = require("express");
const app = express();

const Contact = require("./models/contact");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

const requestLogger = (req, res, next) => {
  console.log(`Request Method: ${req.method}`);
  console.log(`Request URL: ${req.url}`);
  console.log("Request body:", req.body);
  console.log("------------");
  next();
};

app.use(requestLogger);

const port = 3001;

// let contacts = [
//   { id: 1, name: "John Doe", email: "john@example.com" },
//   { id: 2, name: "Jane Smith", email: "jane@example.com" },
//   { id: 3, name: "Bob Johnson", email: "bob@example.com" },
// ];

app.get("/api/contacts", async (req, res) => {
  // res.json(contacts);
  const contacts = await Contact.find({});
  console.log(contacts);
  res.json(contacts);
});

app.get("/api/info", async (req, res) => {
  const contacts = await Contact.find({});
  res.send(`<h1> Contacts Web Server </h1>
    <p> Number of contacts: ${contacts.length} </p>`);
});

app.get("/api/contacts/:id", async (req, res) => {
  const contactItem = await Contact.findById(req.params.id);

  // const contact = contacts.find((m) => m.id === Number(req.params.id));
  if (!contactItem) {
    res.status(404).json({ error: "Contact not found" });
  } else {
    res.json(contactItem);
  }
});

app.post("/api/contacts", async (req, res) => {
  const { name, email } = req.body;
  const contactFind = await Contact.find({ email: { $eq: email }});
  if (contactFind.length !== 0) {
    return res.status(409).json({ error: "Email already exists" });
  } else if (!name) {
    return res.status(400).json({ error: "Name is required" });
  } else if (!email) {
    return res.status(400).json({ error: "Email is required" });
  } else {
    const contactItem = new Contact({name, email});
    const savedContactItem = await contactItem.save();
    
    res.json(savedContactItem);
  }
});

app.delete("/api/contacts/:id", async (req, res) => {
  const contacts = await Contact.find({});
  const contactItem = await Contact.findById(req.params.id);
  // const contact = contacts.find((m) => m.id === Number(req.params.id));
  if (!contactItem) {
    res.status(404).json({ error: "Contact not found!" });
  } else {
    const delItem = await Contact.deleteOne({ _id: req.params.id });
    // contacts = contacts.filter((m) => m.id != req.params.id);
    res.status(204).json({ message: "Contact deleted successfully" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
