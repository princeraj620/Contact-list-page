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
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'JD'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '+1 (555) 234-5678',
    avatar: 'JS'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    phone: '+1 (555) 345-6789',
    avatar: 'MJ'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    phone: '+1 (555) 456-7890',
    avatar: 'SW'
  },
  {
    id: 5,
    name: 'David Brown',
    email: 'david.brown@example.com',
    phone: '+1 (555) 567-8901',
    avatar: 'DB'
  },
  {
    id: 6,
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    phone: '+1 (555) 678-9012',
    avatar: 'ED'
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
