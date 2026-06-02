module.exports = async function handler(req, res) {

  // ── CORS — reflect whatever headers the browser requests ─────────────────
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    req.headers['access-control-request-headers'] || 'Content-Type, Accept'
  );
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { username, password } = req.body;

  if (
    username === process.env.DASHBOARD_USER &&
    password === process.env.DASHBOARD_PASS
  ) {
    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
};
