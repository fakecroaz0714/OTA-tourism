import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // In a production application, this would use Prisma to find the user
    // and bcrypt to verify the hashed password. 
    // Example: const user = await prisma.user.findUnique({ where: { email } })
    
    // For this mockup, we are hardcoding an "actual" valid credential:
    const VALID_EMAIL = 'admin@dreamtravel.com';
    const VALID_PASSWORD = 'password123';

    // Simulate network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // Simulate setting an authentication cookie or JWT
      const response = NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { email, role: 'ADMIN', name: 'Dream Travel Admin' }
      });
      
      // Setting a dummy HTTP-only cookie to simulate session
      response.cookies.set({
        name: 'auth_token',
        value: 'mock_jwt_token_123456',
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Invalid email or password. Please try again.' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
