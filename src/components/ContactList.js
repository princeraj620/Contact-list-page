import React from 'react';
import ContactCard from './ContactCard';
import './ContactList.css';

const ContactList = ({ contacts, isLoading, searchTerm }) => {
  if (isLoading) {
    return (
      <div className="contact-list">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading contacts...</p>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="contact-list">
        <div className="empty-state">
          <div className="empty-icon">📇</div>
          <h3>
            {searchTerm ? 'No contacts found' : 'No contacts yet'}
          </h3>
          <p>
            {searchTerm 
              ? `No contacts match "${searchTerm}". Try a different search term.`
              : 'Get started by adding your first contact!'
            }
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="contact-list">
      <div className="contact-list-header">
        <h2>
          {searchTerm ? `Search Results (${contacts.length})` : `All Contacts (${contacts.length})`}
        </h2>
        {searchTerm && (
          <p className="search-info">
            Showing contacts matching "{searchTerm}"
          </p>
        )}
      </div>
      
      <div className="contact-grid">
        {contacts.map((contact, index) => (
          <ContactCard 
            key={contact.id} 
            contact={contact}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
