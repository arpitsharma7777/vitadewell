import React, { useState } from 'react';
import './AboutContact.css';

const AboutContact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="about" className="page-section">
      <div className="container">
        <h2 className="text-center">We Believe Finding a Home Should Be Exciting, Not Stressful</h2>
        
        <div className="about-content">
          <div className="about-text">
            <h3>Our Mission</h3>
            <p>VitaDwell's mission is to create a safer, more connected housing market for students and locals by leveraging verification technology and fostering community.</p>
            
            <h3>Our Story</h3>
            <p>VitaDwell was founded in 2025 after our founder experienced a rental scam firsthand. Frustrated by the lack of safe, trustworthy platforms, they assembled a team of tech and real estate experts to build a solution—a place where community and safety come first.</p>
          </div>
          
          <div className="contact-form">
            <h3>Contact Us</h3>
            <form id="contactForm" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="form-control" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="form-control" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select 
                  id="subject" 
                  className="form-control" 
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Question</option>
                  <option value="listing">Report a Listing</option>
                  <option value="support">Support</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  className="form-control" 
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn">Send Message</button>
            </form>
          </div>
        </div>
        
        <h3 className="text-center team-heading">Meet the Team Behind VitaDwell</h3>
        <div className="team-grid">
          <div className="team-member">
            <img src="/image/utkarsh.jpg" alt="Utkarsh Kushwaha" className="team-img" />
            <h4>Utkarsh Kushwaha</h4>
            <p>Founder</p>
          </div>
          <div className="team-member">
            <img src="/image/sachi.jpg" alt="Sachi Chouskey" className="team-img" />
            <h4>Sachi Chouskey</h4>
            <p>Social Media Manager</p>
          </div>
          <div className="team-member">
            <img src="/image/arpit.jpg" alt="Arpit Sharma" className="team-img" />
            <h4>Arpit Sharma</h4>
            <p>Tech Lead</p>
          </div>
          <div className="team-member">
            <img src="/image/sidharth.jpg" alt="Sidharth Mehra" className="team-img" />
            <h4>Sidharth Mehra</h4>
            <p>Project Manager</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutContact;