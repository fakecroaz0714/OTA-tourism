import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const departure_id = searchParams.get('departure_id') || 'CDG';
  const arrival_id = searchParams.get('arrival_id') || 'AUS';
  const outbound_date = searchParams.get('outbound_date') || '2026-10-01';
  const return_date = searchParams.get('return_date') || null;
  
  // Use INR as requested by the user
  const currency = searchParams.get('currency') || 'INR';

  const adults = searchParams.get('adults') || '1';
  const travel_class = searchParams.get('class') || '1';

  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    // Return mock data for development if no API key is provided
    console.warn("SERPAPI_KEY is not set in .env. Returning mock flight data.");
    return NextResponse.json({
      best_flights: [
        {
          flights: [{ departure_airport: { id: departure_id, time: "2026-10-01 06:30" }, arrival_airport: { id: arrival_id, time: "2026-10-01 10:15" }, airline: 'Emirates', flight_number: 'EK-404', duration: 420 }],
          price: 52500,
          type: 'Round trip'
        },
        {
          flights: [{ departure_airport: { id: departure_id, time: "2026-10-01 09:00" }, arrival_airport: { id: arrival_id, time: "2026-10-01 13:45" }, airline: 'Qatar Airways', flight_number: 'QR-788', duration: 480 }],
          price: 48900,
          type: 'Round trip'
        },
        {
          flights: [{ departure_airport: { id: departure_id, time: "2026-10-01 14:15" }, arrival_airport: { id: arrival_id, time: "2026-10-01 19:30" }, airline: 'Singapore Airlines', flight_number: 'SQ-322', duration: 495 }],
          price: 61000,
          type: 'Round trip'
        },
        {
          flights: [{ departure_airport: { id: departure_id, time: "2026-10-01 18:45" }, arrival_airport: { id: arrival_id, time: "2026-10-01 22:50" }, airline: 'Etihad Airways', flight_number: 'EY-101', duration: 425 }],
          price: 45000,
          type: 'Round trip'
        },
        {
          flights: [{ departure_airport: { id: departure_id, time: "2026-10-01 23:30" }, arrival_airport: { id: arrival_id, time: "2026-10-02 04:15" }, airline: 'Lufthansa', flight_number: 'LH-554', duration: 465 }],
          price: 41000,
          type: 'Round trip'
        }
      ],
      warning: "This is mock data. Add SERPAPI_KEY to your .env to see real flights."
    });
  }

  try {
    const tripType = return_date ? 1 : 2;
    let url = `https://serpapi.com/search.json?engine=google_flights&departure_id=${departure_id}&arrival_id=${arrival_id}&currency=${currency}&type=${tripType}&outbound_date=${outbound_date}&adults=${adults}&travel_class=${travel_class}&api_key=${apiKey}`;
    
    if (return_date) {
      url += `&return_date=${return_date}`;
    }
    
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ success: false, message: data.error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching flights from SerpApi:", error);
    return NextResponse.json(
      { success: false, message: 'Internal server error while fetching flights' },
      { status: 500 }
    );
  }
}
