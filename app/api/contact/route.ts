import { NextRequest } from 'next/server';

// Define the type for the request body
type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message }: ContactFormData = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return Response.json({ message: 'All fields are required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ message: 'Invalid email format' }, { status: 400 });
    }

    // Log the contact form submission to the console
    console.log('\n--- NEW CONTACT FORM SUBMISSION ---');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log('----------------------------------\n');

    // In a real application, you would send an email here
    // For now, we're just logging to the console

    // Return success response
    return Response.json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}