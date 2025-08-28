import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserButton, useUser, SignedIn, SignedOut } from '@clerk/clerk-react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();



  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🏠</span>
          <span className="logo-text">VitaDwell</span>
        </Link>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/rooms" className="nav-link">Rooms</Link>
          <Link to="/tiffin" className="nav-link">Tiffin</Link>
          <Link to="/pricing" className="nav-link">Pricing</Link>
          <Link to="/about-contact" className="nav-link">About & Contact</Link>

          <SignedIn>
            {user && (
              <div className="nav-user-info">
                <span className="nav-user-name">{user.fullName || user.username || user.primaryEmailAddress?.emailAddress}</span>
                <UserButton afterSignOutUrl="/" />
              </div>
            )}
          </SignedIn>
          <SignedOut>
            <Link to="/sign-in" className="nav-link">Sign In</Link>
            <Link to="/sign-up" className="nav-link">Sign Up</Link>
          </SignedOut>
        </div>

        <div
          className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;