const { createClient } = require('@supabase/supabase-js');

function setCors(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    req.headers['access-control-request-headers'] || 'Content-Type, Accept'
  );
  res.setHeader('Access-Control-Max-Age', '86400');
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = async function handler(req, res) {
  setCors(req, res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error);
      return res.status(500).json({ error: 'Failed to fetch submissions', detail: error.message });
    }

    return res.status(200).json({ data });
  } catch (err) {
    console.error('Unhandled error in get-submissions:', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
