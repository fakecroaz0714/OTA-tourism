"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

function SearchResultsContent() {
  const [flights, setFlights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();

  const departure = searchParams?.get('from') || 'CDG';
  const arrival = searchParams?.get('to') || 'AUS';
  const date = searchParams?.get('date') || '2026-10-01';
  const returnDate = searchParams?.get('return_date');
  const adults = searchParams?.get('adults') || '1';
  const travelClassMap: Record<string, string> = { '1': 'Economy', '2': 'Premium Economy', '3': 'Business', '4': 'First Class' };
  const travelClass = travelClassMap[searchParams?.get('class') || '1'] || 'Economy';

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        let url = `/api/flights/search?departure_id=${departure}&arrival_id=${arrival}&outbound_date=${date}&adults=${adults}&class=${searchParams?.get('class') || '1'}`;
        if (returnDate) url += `&return_date=${returnDate}`;
        
        const res = await fetch(url);
        const data = await res.json();
        
        if (data.success === false) {
          setError(data.message);
        } else {
          setFlights(data);
        }
      } catch (err) {
        setError('Failed to fetch flights. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, [departure, arrival, date]);

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#f2f2f2', fontFamily: 'Arial, sans-serif' }}>
      {/* Navbar Minimal */}
      <header style={{ backgroundColor: '#FFFFFF', padding: '1rem 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="container flex-between" style={{ padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
            <img src="/logo.jpg" alt="Dream Travel Logo" style={{ height: '60px', borderRadius: '0.5rem', objectFit: 'contain' }} />
            <span style={{ fontSize: '1.75rem', fontWeight: 800, color: '#000000', letterSpacing: '-0.03em' }}>
              DreamTravel
            </span>
          </Link>
        </div>
      </header>

      {/* Search Header Banner */}
      <div style={{ backgroundColor: '#0a223f', color: 'white', padding: '2rem 0' }}>
        <div className="container" style={{ padding: '0 2rem' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>
            Flights from {departure} to {arrival}
          </h1>
          <p style={{ fontSize: '0.875rem', opacity: 0.8, marginTop: '0.5rem' }}>
            Departure: {date} {returnDate ? `• Return: ${returnDate}` : ''} • {adults} {parseInt(adults) === 1 ? 'Traveller' : 'Travellers'} • {travelClass}
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem', display: 'flex', gap: '2rem' }}>
        {/* Filters Sidebar */}
        <aside style={{ width: '250px', flexShrink: 0 }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>Filters</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4A4A4A', marginBottom: '0.5rem' }}>Stops</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <input type="checkbox" /> Non-stop
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <input type="checkbox" /> 1 Stop
              </label>
            </div>

            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#4A4A4A', marginBottom: '0.5rem' }}>Airlines</h4>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <input type="checkbox" /> Top Airlines
              </label>
            </div>
          </div>
        </aside>

        {/* Flight Results */}
        <div style={{ flex: 1 }}>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 600, color: '#4A4A4A' }}>Searching best flights for you...</div>
            </div>
          ) : error ? (
            <div style={{ backgroundColor: '#FEE2E2', color: '#DC2626', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #FCA5A5' }}>
              <strong>Error:</strong> {error}
            </div>
          ) : (
            <div>
              {flights?.warning && (
                <div style={{ backgroundColor: '#FFFBEB', color: '#B45309', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #FDE68A', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
                  {flights.warning}
                </div>
              )}

              {flights?.best_flights && flights.best_flights.length > 0 ? (
                flights.best_flights.map((flight: any, index: number) => {
                  const flightInfo = flight.flights[0];
                  const taxes = Math.floor(flight.price * 0.18);
                  const basePrice = flight.price - taxes;

                  return (
                    <div key={index} style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', marginBottom: '1.5rem', overflow: 'hidden', border: '1px solid #EBEBEB' }}>
                      <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        
                        {/* Flight Info */}
                        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flex: 1 }}>
                          <div style={{ minWidth: '150px' }}>
                            <div style={{ fontWeight: 800, color: '#000000', fontSize: '1.125rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <span style={{ display: 'inline-block', width: '24px', height: '24px', backgroundColor: '#F8FAFC', borderRadius: '50%', textAlign: 'center', lineHeight: '24px', fontSize: '14px' }}>✈️</span>
                              {flightInfo?.airline}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#9B9B9B', marginTop: '0.25rem' }}>Flight {flightInfo?.flight_number || 'MK-123'}</div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: 1, justifyContent: 'center' }}>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#000000' }}>{flightInfo?.departure_airport?.time?.split(' ')[1] || '10:00'}</div>
                              <div style={{ fontSize: '0.875rem', color: '#4A4A4A', fontWeight: 600 }}>{flightInfo?.departure_airport?.id}</div>
                            </div>

                            <div style={{ textAlign: 'center', width: '150px' }}>
                              <div style={{ fontSize: '0.75rem', color: '#9B9B9B', fontWeight: 600 }}>{Math.floor(flightInfo?.duration / 60) || 4}h {flightInfo?.duration % 60 || 0}m</div>
                              <div style={{ borderBottom: '2px solid #EBEBEB', position: 'relative', margin: '0.5rem 0' }}>
                                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '-10px', backgroundColor: 'white', padding: '0 0.5rem', color: '#065af3', fontSize: '12px' }}>✈</div>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#10B981', fontWeight: 600 }}>Non-stop</div>
                            </div>

                            <div style={{ textAlign: 'left' }}>
                              <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#000000' }}>{flightInfo?.arrival_airport?.time?.split(' ')[1] || '14:00'}</div>
                              <div style={{ fontSize: '0.875rem', color: '#4A4A4A', fontWeight: 600 }}>{flightInfo?.arrival_airport?.id}</div>
                            </div>
                          </div>
                        </div>

                        {/* Pricing */}
                        <div style={{ textAlign: 'right', borderLeft: '1px solid #EBEBEB', paddingLeft: '2rem', minWidth: '200px' }}>
                          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#000000', letterSpacing: '-0.02em' }}>₹{flight.price.toLocaleString('en-IN')}</div>
                          <div style={{ fontSize: '0.75rem', color: '#9B9B9B', marginBottom: '1rem' }}>Includes ₹{taxes.toLocaleString('en-IN')} Taxes & Fees</div>
                          <button 
                            onClick={() => router.push(`/flight-booking?airline=${encodeURIComponent(flightInfo?.airline)}&flightNo=${flightInfo?.flight_number || 'MK-123'}&price=${flight.price}&from=${flightInfo?.departure_airport?.id}&to=${flightInfo?.arrival_airport?.id}&date=${date}&adults=${adults}&class=${travelClass}`)}
                            style={{ width: '100%', backgroundColor: '#065af3', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '2rem', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 10px rgba(6, 90, 243, 0.3)' }}
                          >
                            BOOK NOW
                          </button>
                        </div>
                      </div>
                      
                      {/* Footer / Amenities */}
                      <div style={{ backgroundColor: '#F8FAFC', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #EBEBEB', fontSize: '0.75rem', color: '#4A4A4A', fontWeight: 600 }}>
                        <div style={{ display: 'flex', gap: '1.5rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>💼 7 Kgs Cabin</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>🧳 15 Kgs Check-in</span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10B981' }}>✔️ Free Meal Included</span>
                        </div>
                        <div style={{ color: '#065af3', cursor: 'pointer' }}>View Flight Details</div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: '0.5rem', textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', color: '#4A4A4A' }}>No flights found for this route.</h3>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
