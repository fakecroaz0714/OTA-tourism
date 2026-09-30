"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import './../globals.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to homepage or dashboard upon successful login with query param
        router.push('/?loggedin=true');
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, #041422, #0a223f)', padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: '2rem', left: '2rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }} onClick={() => router.push('/')}>
          <img src="/logo.jpg" alt="Dream Travel Logo" style={{ height: '64px', borderRadius: '0.5rem', objectFit: 'contain' }} />
          <span style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.03em' }}>
            DreamTravel
          </span>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
        style={{ width: '100%', maxWidth: '420px', padding: '2.5rem', backgroundColor: '#FFFFFF', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#000000', fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>Login to your account</h1>
          <p style={{ fontSize: '0.875rem', color: '#4A4A4A' }}>Book faster and manage your trips easily.</p>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '0.75rem', backgroundColor: '#FEE2E2', color: '#DC2626', borderRadius: '0.25rem', fontSize: '0.875rem', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid #FCA5A5' }}>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4A4A4A' }}>EMAIL ADDRESS</label>
            <input 
              type="email" 
              required 
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #EBEBEB', borderRadius: '0.25rem', fontSize: '1rem', color: '#000000', outline: 'none' }}
              placeholder="admin@dreamtravel.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem', color: '#4A4A4A' }}>PASSWORD</label>
            <input 
              type="password" 
              required 
              style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid #EBEBEB', borderRadius: '0.25rem', fontSize: '1rem', color: '#000000', outline: 'none' }}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.875rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#4A4A4A' }}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" style={{ color: '#065af3', fontWeight: 600, textDecoration: 'none' }}>Forgot password?</a>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            style={{ 
              width: '100%', 
              padding: '0.875rem', 
              marginTop: '0.5rem', 
              opacity: loading ? 0.7 : 1,
              background: 'linear-gradient(93deg, #53b2fe, #065af3)',
              color: 'white',
              border: 'none',
              borderRadius: '0.25rem',
              fontSize: '1rem',
              fontWeight: 700,
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 10px rgba(6, 90, 243, 0.3)'
            }}
          >
            {loading ? 'Authenticating...' : 'CONTINUE'}
          </motion.button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#F8FAFC', borderRadius: '0.25rem', border: '1px dashed #CBD5E1', fontSize: '0.875rem', color: '#4A4A4A', textAlign: 'center' }}>
          <strong>Demo Credentials:</strong><br/>
          Email: <span style={{ color: '#065af3' }}>admin@dreamtravel.com</span><br/>
          Pass: <span style={{ color: '#065af3' }}>password123</span>
        </div>

        <p style={{ textAlign: 'center', fontSize: '0.875rem', color: '#4A4A4A', marginTop: '1.5rem' }}>
          Don't have an account? <a href="#" style={{ color: '#065af3', fontWeight: 600, textDecoration: 'none' }}>Create Account</a>
        </p>
      </motion.div>
    </div>
  );
}
