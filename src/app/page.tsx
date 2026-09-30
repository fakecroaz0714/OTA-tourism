"use client";

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRouter } from 'next/navigation';
import './globals.css';

const textVariants = {
  hidden: { filter: 'blur(10px)', opacity: 0, y: 20 },
  visible: { filter: 'blur(0px)', opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as any } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as any } }
};

export default function Home() {
  const popularRef = useRef(null);
  const isPopularInView = useInView(popularRef, { once: true, margin: "-100px" });
  
  const aboutRef = useRef(null);
  const isAboutInView = useInView(aboutRef, { once: true, margin: "-100px" });

  const [activeTab, setActiveTab] = useState('Packages');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  const [searchFrom, setSearchFrom] = useState('CDG');
  const [searchTo, setSearchTo] = useState('AUS');
  const [searchDate, setSearchDate] = useState('2026-10-01');
  const [searchReturnDate, setSearchReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('1'); // 1=Economy, 2=Premium, 3=Business, 4=First

  const handleSearch = () => {
    let url = `/search?from=${searchFrom}&to=${searchTo}&date=${searchDate}&adults=${passengers}&class=${travelClass}`;
    if (searchReturnDate) url += `&return_date=${searchReturnDate}`;
    router.push(url);
  };

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('loggedin') === 'true') {
        setIsLoggedIn(true);
      }
    }
  }, []);

  const tabs = ['Flights', 'Hotels', 'Homestays', 'Packages', 'Trains', 'Buses', 'Cabs'];

  return (
    <main style={{ backgroundColor: '#f2f2f2', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Top Contact Bar */}
      <div style={{ backgroundColor: '#0B0F19', color: '#D1D5DB', fontSize: '0.75rem', padding: '0.5rem 0' }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>📞 Support: +91 98765 43210</span>
            <span>✉️ Email: contact@dreamtravel.in</span>
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="#" style={{ color: '#D1D5DB' }}>Corporate Travel</a>
            <a href="#" style={{ color: '#D1D5DB' }}>Travel Agent? Join Us</a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header style={{ backgroundColor: '#FFFFFF', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container flex-between">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.jpg" alt="Dream Travel Logo" style={{ height: '64px', borderRadius: '0.5rem', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#000000', letterSpacing: '-0.03em' }}>
              DreamTravel
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary-color)' }}>SUPER OFFERS</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Explore great deals</span>
            </div>
            
            <a href="#" style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-main)' }}>
              💼 My Trips
            </a>
            
            {isLoggedIn ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: '#F8FAFC', border: '1px solid #EBEBEB' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#065af3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>A</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#000000' }}>Hi, Admin</span>
                  <a href="/" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textDecoration: 'underline' }}>Logout</a>
                </div>
              </div>
            ) : (
              <motion.a 
                href="/login" 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }} 
                style={{ 
                  background: 'linear-gradient(93deg, #53b2fe, #065af3)', 
                  color: 'white', 
                  padding: '0.5rem 1.25rem', 
                  borderRadius: '0.25rem', 
                  fontWeight: 600, 
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span style={{ backgroundColor: 'white', color: '#065af3', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem' }}>my</span>
                Login or Create Account
              </motion.a>
            )}
          </div>
        </div>
      </header>

      {/* Hero & Search Widget Section */}
      <section style={{ 
        position: 'relative', 
        padding: '3rem 0 6rem 0', 
        background: 'linear-gradient(to bottom, rgba(4, 20, 34, 0.4), rgba(10, 34, 63, 0.8)), url("https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-4.0.3&auto=format&fit=crop&w=2068&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center'
      }}>
        <div className="container">
          
          {/* MMT Style Search Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
            style={{ 
              maxWidth: '1000px', 
              margin: '0 auto', 
              backgroundColor: '#FFFFFF',
              borderRadius: '0.5rem',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              position: 'relative',
              paddingBottom: '2rem'
            }}
          >
            {/* Tabs */}
            <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '1px solid #EBEBEB', backgroundColor: '#FFFFFF', borderRadius: '0.5rem 0.5rem 0 0', overflow: 'hidden' }}>
              {tabs.map((tab) => (
                <div 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: '1rem 1.5rem',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: activeTab === tab ? 'var(--primary-color)' : '#4A4A4A',
                    borderBottom: activeTab === tab ? '3px solid var(--primary-color)' : '3px solid transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.25rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {tab}
                </div>
              ))}
            </div>

            {/* Inputs Area */}
            <div style={{ padding: '2rem 1.5rem', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              
              <div style={{ flex: '1 1 200px', border: '1px solid #EBEBEB', borderRadius: '0.25rem', padding: '0.5rem 1rem', textAlign: 'left', cursor: 'text' }}>
                <span style={{ fontSize: '0.75rem', color: '#4A4A4A', fontWeight: 600, display: 'block' }}>FROM</span>
                <input type="text" value={searchFrom} onChange={(e) => setSearchFrom(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.25rem', fontWeight: 700, color: '#000000', padding: '0.25rem 0' }} />
                <span style={{ fontSize: '0.75rem', color: '#9B9B9B', display: 'block' }}>Airport Code</span>
              </div>

              <div style={{ flex: '1 1 200px', border: '1px solid #EBEBEB', borderRadius: '0.25rem', padding: '0.5rem 1rem', textAlign: 'left', cursor: 'text' }}>
                <span style={{ fontSize: '0.75rem', color: '#4A4A4A', fontWeight: 600, display: 'block' }}>TO</span>
                <input type="text" value={searchTo} onChange={(e) => setSearchTo(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1.25rem', fontWeight: 700, color: '#000000', padding: '0.25rem 0' }} />
                <span style={{ fontSize: '0.75rem', color: '#9B9B9B', display: 'block' }}>Airport Code</span>
              </div>

              <div style={{ flex: '1 1 150px', border: '1px solid #EBEBEB', borderRadius: '0.25rem', padding: '0.5rem 1rem', textAlign: 'left', cursor: 'text' }}>
                <span style={{ fontSize: '0.75rem', color: '#4A4A4A', fontWeight: 600, display: 'block' }}>DEPARTURE</span>
                <input type="date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem', fontWeight: 700, color: '#000000', padding: '0.25rem 0' }} />
                <span style={{ fontSize: '0.75rem', color: '#9B9B9B', display: 'block' }}>YYYY-MM-DD</span>
              </div>

              <div style={{ flex: '1 1 150px', border: '1px solid #EBEBEB', borderRadius: '0.25rem', padding: '0.5rem 1rem', textAlign: 'left', cursor: 'text' }}>
                <span style={{ fontSize: '0.75rem', color: '#4A4A4A', fontWeight: 600, display: 'block' }}>RETURN</span>
                <input 
                  type="date" 
                  value={searchReturnDate} 
                  onChange={(e) => setSearchReturnDate(e.target.value)} 
                  style={{ width: '100%', border: 'none', outline: 'none', fontSize: '1rem', fontWeight: 700, color: '#000000', padding: '0.25rem 0' }} 
                />
                <span style={{ fontSize: '0.75rem', color: '#9B9B9B', display: 'block' }}>Optional</span>
              </div>

              <div style={{ flex: '1 1 200px', border: '1px solid #EBEBEB', borderRadius: '0.25rem', padding: '0.5rem 1rem', textAlign: 'left', cursor: 'text' }}>
                <span style={{ fontSize: '0.75rem', color: '#4A4A4A', fontWeight: 600, display: 'block' }}>PASSENGERS & CLASS</span>
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <input 
                    type="number" 
                    min="1" max="9"
                    value={passengers}
                    onChange={(e) => setPassengers(parseInt(e.target.value) || 1)}
                    style={{ width: '40px', border: 'none', outline: 'none', fontSize: '1rem', fontWeight: 700, color: '#000000', padding: 0 }} 
                  />
                  <select 
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '1rem', fontWeight: 700, color: '#000000', padding: 0, backgroundColor: 'transparent', cursor: 'pointer' }}
                  >
                    <option value="1">Economy</option>
                    <option value="2">Premium Economy</option>
                    <option value="3">Business</option>
                    <option value="4">First Class</option>
                  </select>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#9B9B9B', display: 'block', marginTop: '0.25rem' }}>Travellers & Cabin</span>
              </div>

            </div>

            {/* Search Button overlapping bottom */}
            <motion.button 
              onClick={handleSearch}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ 
                position: 'absolute', 
                bottom: '-24px', 
                left: '50%', 
                transform: 'translateX(-50%)',
                background: 'linear-gradient(93deg, #53b2fe, #065af3)',
                color: 'white',
                border: 'none',
                borderRadius: '2rem',
                padding: '0.75rem 3rem',
                fontSize: '1.25rem',
                fontWeight: 700,
                boxShadow: '0 4px 10px rgba(6, 90, 243, 0.4)',
                cursor: 'pointer'
              }}
            >
              SEARCH
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Offers Section */}
      <section style={{ padding: '4rem 0 2rem 0' }}>
        <div className="container">
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#000000' }}>Exclusive Offers</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
              {[
                { title: 'Flat ₹5,000 OFF', desc: 'On Domestic Flights with HDFC Credit Cards.', code: 'HDFCDOM' },
                { title: 'Up to 30% OFF', desc: 'On Premium Hotels in Goa & Kerala.', code: 'DREAMSTAYS' },
                { title: 'Zero Cancellation', desc: 'Book Flights without worry. Free cancellation.', code: 'ZEROFEE' }
              ].map((offer, i) => (
                <div key={i} style={{ border: '1px solid #EBEBEB', borderRadius: '0.5rem', padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ width: '60px', height: '60px', backgroundColor: '#E0E7FF', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🎉</div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#000000', marginBottom: '0.25rem' }}>{offer.title}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#4A4A4A', marginBottom: '0.5rem' }}>{offer.desc}</p>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-color)' }}>Use Code: {offer.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="packages" style={{ padding: '2rem 0 6rem 0' }} ref={popularRef}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isPopularInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '2rem', color: '#000000' }}>Trending Holiday Destinations</h2>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            animate={isPopularInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}
          >
            {[
              { id: 'dubai', title: 'Dubai, UAE', price: '₹65,000', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1170&q=80', desc: '4 Days / 3 Nights • City of Gold Experience' },
              { id: 'swiss-alps', title: 'Swiss Alps, Switzerland', price: '₹1,15,000', img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1170&q=80', desc: '5 Days / 4 Nights • Mountain Village Retreat' },
              { id: 'bali', title: 'Bali, Indonesia', price: '₹48,000', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1038&q=80', desc: '6 Days / 5 Nights • Sacred Temples & Beaches' },
              { id: 'goa', title: 'Goa, India', price: '₹18,500', img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1074&q=80', desc: '4 Days / 3 Nights • Tropical Beach Escape' },
              { id: 'paris', title: 'Paris, France', price: '₹85,000', img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1170&q=80', desc: '5 Days / 4 Nights • The Romantic City Tour' },
              { id: 'santorini', title: 'Santorini, Greece', price: '₹95,000', img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=1170&q=80', desc: '5 Days / 4 Nights • Sunsets & White Villages' },
            ].map((pkg, idx) => (
              <motion.div 
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -8, boxShadow: '0 12px 20px rgba(0,0,0,0.1)' }}
                style={{ borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid #EBEBEB', backgroundColor: '#FFFFFF', cursor: 'pointer', transition: 'all 0.3s ease' }}
              >
                <div style={{ height: '220px', backgroundImage: `url("${pkg.img}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div style={{ padding: '1.25rem' }}>
                  <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#000000' }}>{pkg.title}</h3>
                    <span style={{ color: '#000000', fontSize: '1.25rem', fontWeight: 800 }}>{pkg.price}</span>
                  </div>
                  <p style={{ marginBottom: '1.25rem', fontSize: '0.875rem', color: '#4A4A4A' }}>{pkg.desc}</p>
                  <motion.a 
                    href={`/packages/${pkg.id}`}
                    whileHover={{ backgroundColor: '#065af3', color: 'white' }}
                    style={{ display: 'block', textAlign: 'center', textDecoration: 'none', width: '100%', backgroundColor: 'transparent', color: '#065af3', border: '1px solid #065af3', borderRadius: '0.25rem', padding: '0.5rem', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
                  >
                    View Details
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" style={{ padding: '4rem 0', backgroundColor: '#FFFFFF', borderTop: '1px solid #EBEBEB' }} ref={aboutRef}>
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={isAboutInView ? { opacity: 1, filter: 'blur(0px)', y: 0 } : {}}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem', color: '#000000' }}>About Dream Travel</h2>
            <p style={{ fontSize: '1rem', color: '#4A4A4A', lineHeight: 1.8, marginBottom: '2rem' }}>
              At Dream Travel, we believe that exploring the world should be as beautiful and effortless as the destinations themselves. Born out of a passion for authentic travel experiences, our platform bridges the gap between wanderlust and reality. 
              <br /><br />
              We partner directly with top-tier suppliers and local Destination Management Companies across the globe to curate exclusive holiday packages, premium hotel stays, and seamless flight bookings. Whether you are looking for the vibrant cityscapes of Dubai, the serene temples of Bali, or the romantic avenues of Paris, Dream Travel ensures your journey is unforgettable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '4rem 0 2rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <img src="/logo.jpg" alt="Dream Travel Logo" style={{ height: '52px', borderRadius: '0.25rem', objectFit: 'contain' }} />
                <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>Dream Travel</span>
              </div>
              <p style={{ fontSize: '0.875rem', color: '#9B9B9B', marginBottom: '1rem' }}>Your trusted partner for exploring the world. Best prices guaranteed.</p>
              
              <div style={{ fontSize: '0.875rem', color: '#D1D5DB' }}>
                <strong>Contact Us:</strong><br />
                📞 +91 98765 43210 <br />
                ✉️ support@dreamtravel.in <br />
                📍 123, Business Park, Connaught Place, New Delhi, 110001
              </div>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>Our Products</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#9B9B9B' }}>
                <li><a href="#">Domestic Flights</a></li>
                <li><a href="#">International Hotels</a></li>
                <li><a href="#">Holiday Packages</a></li>
                <li><a href="#">Bus & Train Tickets</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: 700, marginBottom: '1rem' }}>About Us</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: '#9B9B9B' }}>
                <li><a href="#about">Our Story</a></li>
                <li><a href="#">User Agreement</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', borderTop: '1px solid #333333', paddingTop: '2rem', fontSize: '0.75rem', color: '#9B9B9B' }}>
            &copy; {new Date().getFullYear()} Dream Travel OTA. All rights reserved. Country: India
          </div>
        </div>
      </footer>
    </main>
  );
}
