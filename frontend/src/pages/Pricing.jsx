import React from 'react';
import './Pricing.css'; // We'll create this CSS file next

const Pricing = () => {
  return (
    <section id="pricing" className="page-section">
      <div className="container">
        <h2 className="text-center">Simple, Transparent Pricing</h2>
        <p className="text-center">
          Whether you're just starting your search or ready to find your dream home, we have a plan for you. 
          <strong> Students and locals receive special discounts!</strong>
        </p>
        
        <div className="pricing-options">
          <div className="pricing-card">
            <h3>Free Plan</h3>
            <div className="price">₹0 <span>/ forever</span></div>
            <p>Perfect for casual browsers just starting their search</p>
            <ul className="pricing-features">
              <li>Access to all listings</li>
              <li>Basic search filters</li>
              <li>View verification badges</li>
              <li>5 messages per month</li>
              <li className="text-center" style={{paddingLeft: 0}}>—</li>
              <li className="text-center" style={{paddingLeft: 0}}>—</li>
              <li className="text-center" style={{paddingLeft: 0}}>—</li>
            </ul>
            <a href="#" className="btn btn-outline">Choose Free</a>
          </div>
          
          <div className="pricing-card popular">
            <div className="popular-badge">Popular</div>
            <h3>Premium Plan</h3>
            <div className="price">₹399 <span>/ month</span></div>
            <div className="price annual-price">₹3999 <span>/ year (save 50%)</span></div>
            <p>For serious seekers who want to find their home faster</p>
            <ul className="pricing-features">
              <li>Everything in Free plan</li>
              <li>Unlimited messages</li>
              <li>Advanced search filters</li>
              <li>Priority listing in search results</li>
              <li>Save unlimited favorites</li>
              <li>See who viewed your profile</li>
              <li>Virtual tour uploads</li>
            </ul>
            <a href="#" className="btn">Go Premium</a>
          </div>
        </div>
        
        <div className="text-center discount-notice">
          <p>
            <strong>Student/Local Discount:</strong> Verified students and locals get Premium for 
            <strong>₹149 /month</strong> or <strong>₹999/year</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;