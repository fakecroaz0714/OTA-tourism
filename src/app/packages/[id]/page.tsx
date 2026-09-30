import React from 'react';
import Link from 'next/link';

// Mock database for the packages
const packagesData: Record<string, any> = {
  'dubai': {
    title: 'Dubai, UAE',
    price: '₹65,000',
    img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=2000&q=80',
    desc: '4 Days / 3 Nights • City of Gold Experience',
    placesToVisit: ['Burj Khalifa Observation Deck', 'The Dubai Mall & Fountains', 'Palm Jumeirah', 'Dubai Frame', 'Red Dune Desert Safari'],
    hangoutSpots: ['JBR Beach Walk', 'Dubai Marina Promenade', 'Souk Madinat Jumeirah', 'Global Village', 'La Mer'],
    relevantThings: ['Roundtrip Flights Included', 'UAE Tourist Visa', '4-Star Premium Hotel Stay', 'Daily Buffet Breakfast', 'Private Airport Transfers']
  },
  'swiss-alps': {
    title: 'Swiss Alps, Switzerland',
    price: '₹1,15,000',
    img: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2000&q=80',
    desc: '5 Days / 4 Nights • Mountain Village Retreat',
    placesToVisit: ['Jungfraujoch (Top of Europe)', 'Matterhorn Peak', 'Lake Geneva', 'Lucerne Old Town', 'Interlaken'],
    hangoutSpots: ['Zermatt Ski Resort Cafes', 'Lake Zurich Promenades', 'Montreux Jazz Cafes', 'Chillon Castle Grounds'],
    relevantThings: ['Swiss Travel Pass Included', '3-Star Alpine Chalet', 'Daily Breakfast & 2 Dinners', 'Gondola Ride Tickets', 'Winter Gear Rental Discount']
  },
  'bali': {
    title: 'Bali, Indonesia',
    price: '₹48,000',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=2000&q=80',
    desc: '6 Days / 5 Nights • Sacred Temples & Beaches',
    placesToVisit: ['Uluwatu Temple', 'Sacred Monkey Forest Sanctuary', 'Tegallalang Rice Terrace', 'Mount Batur Sunrise Trek', 'Nusa Penida Island'],
    hangoutSpots: ['Seminyak Beach Clubs (Potato Head)', 'Ubud Art Market', 'Canggu Surf Bars', 'Kuta Night Market'],
    relevantThings: ['Return Flights', 'Private Villa with Pool', 'Balinese Massage Session', 'Daily Breakfast', 'English Speaking Guide & Driver']
  },
  'goa': {
    title: 'Goa, India',
    price: '₹18,500',
    img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=2000&q=80',
    desc: '4 Days / 3 Nights • Tropical Beach Escape',
    placesToVisit: ['Baga & Calangute Beaches', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Fort Aguada', 'Anjuna Flea Market'],
    hangoutSpots: ['Tito\'s Lane', 'Curlies Beach Shack', 'Thalassa (Vagator)', 'Fontainhas Latin Quarter Cafes'],
    relevantThings: ['Airport/Railway Station Pickup', '3-Star Beach Resort', 'Daily Breakfast', 'North Goa Sightseeing Tour', 'Welcome Drink on Arrival']
  },
  'paris': {
    title: 'Paris, France',
    price: '₹85,000',
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80',
    desc: '5 Days / 4 Nights • The Romantic City Tour',
    placesToVisit: ['Eiffel Tower (Summit Access)', 'Louvre Museum', 'Palace of Versailles', 'Notre-Dame Cathedral (Exterior)', 'Montmartre'],
    hangoutSpots: ['Champs-Élysées', 'Seine River Cruise', 'Le Marais Cafes', 'Latin Quarter', 'Moulin Rouge (Optional)'],
    relevantThings: ['Schengen Visa Assistance', 'Central Boutique Hotel', 'Daily Parisian Breakfast', 'Seine River Cruise Tickets', 'Hop-on Hop-off Bus Tour']
  },
  'santorini': {
    title: 'Santorini, Greece',
    price: '₹95,000',
    img: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=2000&q=80',
    desc: '5 Days / 4 Nights • Sunsets & White Villages',
    placesToVisit: ['Oia Village', 'Fira Capital', 'Red Beach', 'Akrotiri Archaeological Site', 'Santorini Caldera'],
    hangoutSpots: ['Oia Sunset Viewpoints', 'Amoudi Bay Seafood Tavernas', 'Kamari Beach Bars', 'Santo Wines Winery'],
    relevantThings: ['Ferry/Flight from Athens Included', 'Caldera View Suite', 'Daily Breakfast', 'Volcano Boat Tour', 'Travel Insurance']
  }
};

export default async function PackageDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = packagesData[id];

  if (!pkg) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f2f2f2' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#000000', marginBottom: '1rem' }}>Package Not Found</h1>
        <p style={{ color: '#4A4A4A', marginBottom: '2rem' }}>The holiday package you are looking for does not exist.</p>
        <Link href="/" style={{ padding: '0.75rem 2rem', backgroundColor: '#065af3', color: 'white', borderRadius: '0.25rem', textDecoration: 'none', fontWeight: 600 }}>
          Back to Home
        </Link>
      </div>
    );
  }

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
          <Link href="/" style={{ color: '#065af3', fontWeight: 600, textDecoration: 'none' }}>Back to Search</Link>
        </div>
      </header>

      {/* Hero Image */}
      <div style={{ 
        width: '100%', 
        height: '400px', 
        backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url("${pkg.img}")`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end'
      }}>
        <div className="container" style={{ padding: '0 2rem 3rem 2rem', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ color: 'white' }}>
              <h1 style={{ fontSize: '3rem', fontWeight: 800, margin: 0, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{pkg.title}</h1>
              <p style={{ fontSize: '1.25rem', fontWeight: 600, opacity: 0.9 }}>{pkg.desc}</p>
            </div>
            <div style={{ backgroundColor: '#FFFFFF', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', textAlign: 'center', minWidth: '250px' }}>
              <div style={{ fontSize: '0.875rem', color: '#4A4A4A', fontWeight: 700, marginBottom: '0.25rem' }}>STARTING FROM</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#000000', marginBottom: '1rem' }}>{pkg.price}</div>
              <Link href={`/booking/${id}`} style={{ display: 'block', textDecoration: 'none', width: '100%', padding: '1rem', background: 'linear-gradient(93deg, #53b2fe, #065af3)', color: 'white', border: 'none', borderRadius: '2rem', fontSize: '1.125rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(6, 90, 243, 0.3)' }}>
                PROCEED TO BOOK
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container" style={{ padding: '3rem 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column */}
        <div>
          {/* Places to Visit */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000000', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📍 Places to Visit
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {pkg.placesToVisit.map((place: string, index: number) => (
                <li key={index} style={{ padding: '0.75rem 0', borderBottom: index !== pkg.placesToVisit.length - 1 ? '1px solid #EBEBEB' : 'none', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#065af3', fontWeight: 700 }}>✓</span> {place}
                </li>
              ))}
            </ul>
          </div>

          {/* Hangout Spots */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000000', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              🍹 Best Hangout Spots
            </h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {pkg.hangoutSpots.map((spot: string, index: number) => (
                <li key={index} style={{ padding: '0.75rem 0', borderBottom: index !== pkg.hangoutSpots.length - 1 ? '1px solid #EBEBEB' : 'none', color: '#4A4A4A', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#F59E0B', fontWeight: 700 }}>★</span> {spot}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div>
          {/* Relevant Things & Inclusions */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '0.5rem', padding: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#000000', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✨ What's Included / Relevant Info
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {pkg.relevantThings.map((thing: string, index: number) => (
                <div key={index} style={{ backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: '0.25rem', borderLeft: '4px solid #065af3', color: '#4A4A4A', fontWeight: 500 }}>
                  {thing}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#FFFBEB', borderRadius: '0.5rem', border: '1px solid #FDE68A' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#B45309', marginBottom: '0.5rem' }}>Important Note</h3>
              <p style={{ fontSize: '0.875rem', color: '#92400E', margin: 0 }}>
                Prices are per person on a twin-sharing basis. Visa approval is subject to the respective consulate. Booking is non-refundable 7 days prior to departure.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer minimal */}
      <footer style={{ backgroundColor: '#000000', color: '#FFFFFF', padding: '2rem 0', textAlign: 'center', marginTop: '2rem' }}>
        <div className="container" style={{ fontSize: '0.75rem', color: '#9B9B9B' }}>
          &copy; {new Date().getFullYear()} Dream Travel OTA. All rights reserved. Country: India
        </div>
      </footer>
    </main>
  );
}
