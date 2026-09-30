"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function FlightBookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const airline = searchParams?.get('airline') || 'Airline';
  const flightNo = searchParams?.get('flightNo') || 'MK-123';
  const price = parseInt(searchParams?.get('price') || '0', 10);
  const from = searchParams?.get('from') || 'CDG';
  const to = searchParams?.get('to') || 'AUS';
  const date = searchParams?.get('date') || '2026-10-01';
  const adults = parseInt(searchParams?.get('adults') || '1', 10);
  const travelClass = searchParams?.get('class') || 'Economy';

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call for booking
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '0.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', textAlign: 'center', maxWidth: '500px' }}>
          <div style={{ width: '80px', height: '80px', backgroundColor: '#10B981', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', margin: '0 auto 1.5rem auto' }}>✓</div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#000000', marginBottom: '1rem' }}>Flight Confirmed!</h1>
          <p style={{ color: '#4A4A4A', marginBottom: '2rem', lineHeight: 1.6 }}>
            Your flight from <strong>{from}</strong> to <strong>{to}</strong> on {airline} has been successfully booked. Your e-tickets have been sent to your email.
          </p>
          <button onClick={() => router.push('/')} style={{ padding: '0.75rem 2rem', backgroundColor: '#065af3', color: 'white', border: 'none', borderRadius: '0.25rem', fontWeight: 700, cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const taxes = Math.floor(price * 0.18);
  const basePrice = price - taxes;

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Navbar Minimal */}
      <header style={{ backgroundColor: '#FFFFFF', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container flex-between" style={{ padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src="/logo.jpg" alt="Dream Travel Logo" style={{ height: '60px', borderRadius: '0.5rem', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#000000', letterSpacing: '-0.03em' }}>
              DreamTravel
            </span>
          </Link>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#065af3' }}>Secure Flight Checkout</span>
        </div>
      </header>

      <div className="container" style={{ padding: '3rem 2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Checkout Form */}
        <div style={{ flex: '1 1 500px', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Traveller Details</h2>
          
          <form onSubmit={handleBooking} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {Array.from({ length: adults }).map((_, index) => (
              <div key={index} style={{ padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.5rem', border: '1px solid #EBEBEB' }}>
                <h4 style={{ marginBottom: '1rem', fontSize: '1rem', color: '#000' }}>Passenger {index + 1}</h4>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4A4A4A' }}>FIRST NAME</label>
                    <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #EBEBEB', borderRadius: '0.25rem', outline: 'none' }} placeholder="John" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4A4A4A' }}>LAST NAME</label>
                    <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #EBEBEB', borderRadius: '0.25rem', outline: 'none' }} placeholder="Doe" />
                  </div>
                </div>
              </div>
            ))}

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4A4A4A' }}>CONTACT EMAIL</label>
              <input type="email" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #EBEBEB', borderRadius: '0.25rem', outline: 'none' }} placeholder="john@example.com" />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4A4A4A' }}>PHONE NUMBER</label>
              <input type="tel" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #EBEBEB', borderRadius: '0.25rem', outline: 'none' }} placeholder="+91 9876543210" />
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid #EBEBEB', margin: '1rem 0' }} />

            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Payment Information</h2>
            
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4A4A4A' }}>CARD NUMBER</label>
              <input type="text" required style={{ width: '100%', padding: '0.75rem', border: '1px solid #EBEBEB', borderRadius: '0.25rem', outline: 'none' }} placeholder="XXXX XXXX XXXX XXXX" />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '1rem', 
                background: 'linear-gradient(93deg, #53b2fe, #065af3)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '0.25rem', 
                fontSize: '1.125rem', 
                fontWeight: 800, 
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                marginTop: '1rem',
                boxShadow: '0 4px 10px rgba(6, 90, 243, 0.3)'
              }}
            >
              {loading ? 'Processing Payment...' : `Pay ₹${price.toLocaleString('en-IN')} Now`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div style={{ flex: '1 1 350px', maxWidth: '400px' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: '100px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid #EBEBEB', paddingBottom: '1rem' }}>Flight Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, color: '#4A4A4A' }}>Route</span>
              <span style={{ fontWeight: 700 }}>{from} ✈ {to}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, color: '#4A4A4A' }}>Airline</span>
              <span style={{ fontWeight: 700 }}>{airline} ({flightNo})</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, color: '#4A4A4A' }}>Cabin & Travellers</span>
              <span style={{ fontWeight: 700 }}>{adults} {adults > 1 ? 'Adults' : 'Adult'} • {travelClass}</span>
            </div>

            <hr style={{ border: 'none', borderBottom: '1px solid #EBEBEB', margin: '1.5rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontWeight: 600, color: '#4A4A4A' }}>Base Fare ({adults}x)</span>
              <span style={{ fontWeight: 700 }}>₹{basePrice.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: '#4A4A4A', fontWeight: 600 }}>
              <span>Taxes & Fees</span>
              <span>₹{taxes.toLocaleString('en-IN')}</span>
            </div>

            <hr style={{ border: 'none', borderBottom: '1px dashed #CBD5E1', margin: '1.5rem 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>Total Amount</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065af3' }}>₹{price.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}

export default function FlightBookingPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Checkout...</div>}>
      <FlightBookingContent />
    </Suspense>
  );
}
