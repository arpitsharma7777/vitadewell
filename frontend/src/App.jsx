import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import RoomsPage from "./pages/RoomsPage";
import RoomDetail from "./pages/RoomDetail";
import AddRoomForm from "./pages/AddRoomForm";
import { SignedIn, SignedOut, RedirectToSignIn, SignIn, SignUp } from "@clerk/clerk-react";
import TiffinServices from "./pages/TiffinServices";
import TiffinDetail from "./pages/TiffinDetail";
import AddTiffinForm from "./pages/AddTiffinForm";
import ProfilePage from "./pages/ProfilePage";
import Pricing from "./pages/Pricing";
import AboutContact from "./pages/AboutContact";
import "./App.css";

const Home = () => (
  <div className="home-container">
    <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="title-accent">Unified Platform For</span>
          <span className="title-main">Room & Tiffin Service</span>
        </h1>
        <p className="hero-subtitle">VitaDwell is not just a service, it’s a movement towards smarter urban living.</p>
        <SearchBar />
      </div>
      <div className="hero-image">
        <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Modern room" />
      </div>
    </div>

    <div className="features-section">
      <h2>Why Choose VitaDwell?</h2>
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🏠</div>
          <h3>Quality Rooms</h3>
          <p>Find comfortable and affordable rooms near your campus</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🍱</div>
          <h3>Healthy Meals</h3>
          <p>Nutritious and delicious tiffin services for users</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🪙</div>
          <h3>Flexible & Affordable</h3>
          <p>Pause, swap, or customize services as per your need</p>
        </div>
      </div>
    </div>

    <div className="cta-section">
      <h2>Ready to Get Started?</h2>
      <p>Join thousands of users who found their perfect accommodation and meals</p>
      <button className="cta-button">Explore Listings</button>
    </div>
  </div>
);

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/add-room" element={
            <>
              <SignedIn>
                <AddRoomForm />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          } />
          <Route path="/tiffin" element={<TiffinServices />} />
          <Route path="/tiffin/:id" element={<TiffinDetail />} />
          <Route path="/add-tiffin" element={<AddTiffinForm />} />
          <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" afterSignInUrl="/" afterSignUpUrl="/" />} />
          <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" afterSignInUrl="/" afterSignUpUrl="/" />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about-contact" element={<AboutContact />} />
          <Route path="*" element={<h2 className="not-found">404 - Page Not Found</h2>} />
        </Routes>
      </main>
    </div>
  );
};

export default App;