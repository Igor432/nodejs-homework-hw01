const fs = require("fs").promises;
const { type } = require("os");
const path = require("path");

const contactsPath = path.join(__dirname, "/db/contacts.json");

function listContacts() {
    const contacts = fs
        .readFile(contactsPath, "utf8")
        .then((data) => JSON.parse(data))
        .catch((err) => console.log(err));
    console.log(contacts)
    return contacts
}


function getContactById(contactId) {
    listContacts()
        .then(data => {
            const id = data.filter((contact) => parseInt(contact.id) === contactId)
            console.table(id);
            return id
        })
        .catch((err) => console.log(err));
}



function removeContact(contactId) {
    listContacts()
        .then(data => {
            const filteredList = data.filter(
                (contact) => parseInt(contact.id) !== contactId)
            console.table(filteredList)
            return filteredList
        })
        .catch((err) => console.log(err));
}

function addContact(name, email, phone) {
    /*
    const contact = { name, email, phone };
    */
    listContacts()
        .then((data) => {
            data.push({ name, email, phone, id: (data.length + 1).toString() });
            console.table(data);
            return data;
        })
        .catch((err) => console.log(err));
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};