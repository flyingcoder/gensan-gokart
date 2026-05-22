import type { Handler, HandlerEvent } from '@netlify/functions';
import { createClient } from '@supabase/supabase-js';

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Server configuration error' }) };
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(event.body ?? '{}');
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid request body' }) };
  }

  const { name, phone, preferred_date, riders, package: pkg, notes } = body;

  if (!name || typeof name !== 'string' || !name.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Name is required' }) };
  }
  if (!phone || typeof phone !== 'string' || !phone.trim()) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Phone number is required' }) };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error } = await supabase.from('bookings').insert({
    name: String(name).trim(),
    phone: String(phone).trim(),
    preferred_date: preferred_date ? String(preferred_date) : null,
    riders: riders ? Number(riders) : null,
    package: pkg ? String(pkg) : null,
    notes: notes ? String(notes).trim() : null,
  });

  if (error) {
    console.error('Supabase insert error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to save booking' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, message: 'Booking received!' }),
  };
};

export { handler };
