import { NextResponse } from 'next/server';

const MOCK_DESTINATIONS = [
  { id: '1', name: 'Goa, India', type: 'beach', popularity: 98 },
  { id: '2', name: 'Kerala, India', type: 'nature', popularity: 95 },
  { id: '3', name: 'Bali, Indonesia', type: 'beach', popularity: 99 },
  { id: '4', name: 'Paris, France', type: 'city', popularity: 97 },
  { id: '5', name: 'Maldives', type: 'beach', popularity: 96 }
];

export async function GET(request: Request) {
  // In a real application, this would query a PostgreSQL database.
  // We can also extract query parameters for filtering if needed.
  
  return NextResponse.json({
    success: true,
    data: MOCK_DESTINATIONS
  });
}
