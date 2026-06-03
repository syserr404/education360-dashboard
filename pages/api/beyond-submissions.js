import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const {
      firstName, lastName, title, schoolName, country,
      schoolType, email, phone, hearAbout,
      studentsInfo, reduceCosts, notifyEvents,
    } = req.body || {};

    if (!email) {
      return res.status(400).json({ error: 'Missing required field: email' });
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { error } = await supabase.from('beyond_submissions').insert([{
      submitted_at:  new Date().toISOString(),
      first_name:    firstName,
      last_name:     lastName,
      title,
      school_name:   schoolName,
      country,
      school_type:   schoolType,
      email,
      phone:         phone || null,
      hear_about:    hearAbout,
      students_info: studentsInfo || null,
      reduce_costs:  reduceCosts ?? null,
      notify_events: notifyEvents ?? null,
    }]);

    if (error) throw new Error(error.message);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('beyond-submissions error:', err);
    return res.status(500).json({ error: err.message });
  }
}
