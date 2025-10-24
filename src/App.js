import React, { useState, useEffect } from 'react';
import './App.css';
import ContactList from './components/ContactList';
import SearchBar from './components/SearchBar';
import AddContact from './components/AddContact';
import Header from './components/Header';

// Sample contact data - in a real app, this would come from an API
const sampleContacts = [
  {
    id: 1,
    name: 'Prince Raj',
    email: 'prince@gmail.com',
    phone: '+91 6207011655',
    avatar: 'PR'
  },
  {
    id: 2,
    name: 'Vanshaj Jain',
    email: 'vanshaj@gmail.com',
    phone: '+91 8287393299',
    avatar: 'VJ'
  },
  {
    id: 3,
    name: 'Vikramaditya',
    email: 'vikramaditya@gmail.com',
    phone: '+91 9664766367',
    avatar: 'VI'
  },
  {
    id: 4,
    name: 'Siddhant',
    email: 'siddhant@gmail.com',
    phone: '+91 9113486148',
    avatar: 'SI'
  },
  {
    id: 5,
    name: 'Vaishnavi',
    email: 'vaishnavi@gmail.com',
    phone: '+91 9876543212',
    avatar: 'VA'
  },
  {
    id: 6,
    name: 'Suryansh',
    email: 'suryansh@gmail.com',
    phone: '+91 9670006875',
    avatar: 'SU'
  }
];

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize contacts with sample data
  useEffect(() => {
    // Simulate API loading delay
    const timer = setTimeout(() => {
      setContacts(sampleContacts);
      setFilteredContacts(sampleContacts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter contacts based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const filtered = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredContacts(filtered);
    }
  }, [searchTerm, contacts]);

  // Add new contact
  const handleAddContact = (newContact) => {
    const contact = {
      ...newContact,
      id: Date.now(), // Simple ID generation
      avatar: newContact.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    
    setContacts(prevContacts => [contact, ...prevContacts]);
    setShowAddForm(false);
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Toggle add contact form
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  return (
    <div className="app">
      <Header />
      <div className="app-container">
        <div className="app-content">
          <div className="controls-section">
            <SearchBar onSearch={handleSearch} />
            <button 
              className="add-contact-btn"
              onClick={toggleAddForm}
              aria-label="Add new contact"
            >
              <span className="btn-icon">+</span>
              Add Contact
            </button>
          </div>

          {showAddForm && (
            <AddContact 
              onAddContact={handleAddContact}
              onCancel={() => setShowAddForm(false)}
            />
          )}

          <ContactList 
            contacts={filteredContacts}
            isLoading={isLoading}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
