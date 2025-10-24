import React from 'react';
import { Mail, Phone } from 'lucide-react';
import './ContactCard.css';

const ContactCard = ({ contact, index }) => {
  const handleEmailClick = () => {
    window.location.href = `mailto:${contact.email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${contact.phone}`;
  };

  return (
    <div 
      className="contact-card"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="contact-avatar">
        <span className="avatar-text">{contact.avatar}</span>
      </div>
      
      <div className="contact-info">
        <h3 className="contact-name">{contact.name}</h3>
        
        <div className="contact-details">
          <div className="contact-detail" onClick={handleEmailClick}>
            <Mail size={16} className="detail-icon" />
            <span className="detail-text">{contact.email}</span>
          </div>
          
          <div className="contact-detail" onClick={handlePhoneClick}>
            <Phone size={16} className="detail-icon" />
            <span className="detail-text">{contact.phone}</span>
          </div>
        </div>
      </div>
      
      <div className="contact-actions">
        <button 
          className="action-button email-button"
          onClick={handleEmailClick}
          title="Send email"
        >
          <Mail size={16} />
        </button>
        <button 
          className="action-button phone-button"
          onClick={handlePhoneClick}
          title="Call"
        >
          <Phone size={16} />
        </button>
      </div>
    </div>
  );
};

export default ContactCard;
