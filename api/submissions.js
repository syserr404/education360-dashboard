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
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const {
    // Identity
    email,
    sessionId,

    // District
    districtName,
    county,
    students,
    educators,
    leaders,
    selectionMethod,

    // Tools
    toolCount,
    tools,

    // Spend
    currentAnnualSpend,
    e360AnnualCost,
    totalY1Spend,
    totalY2Spend,
    totalY3Spend,

    // Savings
    savingY2VsToday,
    savingY3VsToday,
    spendReductionPct,
    costPerStudentToday,
    costPerStudentY3,
    paybackYears,

    // Hours
    hoursLostWeeklyToday,
    hoursRecoveredY1,
    hoursRecoveredY2,
    hoursRecoveredY3,
    leaderHrsRecoveredY3,
    adminHrsWeek,
  } = req.body;

  if (!email || !sessionId) {
    return res.status(400).json({ error: 'Missing required fields: email, sessionId' });
  }

  try {
    const { error } = await supabase.from('submissions').insert([
      {
        email,
        session_id: sessionId,
        submitted_at: new Date().toISOString(),
        district_name: districtName,
        county,
        students,
        educators,
        leaders,
        selection_method: selectionMethod,
        tool_count: toolCount,
        tools,
        current_annual_spend: currentAnnualSpend,
        e360_annual_cost: e360AnnualCost,
        total_y1_spend: totalY1Spend,
        total_y2_spend: totalY2Spend,
        total_y3_spend: totalY3Spend,
        saving_y2_vs_today: savingY2VsToday,
        saving_y3_vs_today: savingY3VsToday,
        spend_reduction_pct: spendReductionPct,
        cost_per_student_today: costPerStudentToday,
        cost_per_student_y3: costPerStudentY3,
        payback_years: paybackYears,
        hours_lost_weekly_today: hoursLostWeeklyToday,
        hours_recovered_y1: hoursRecoveredY1,
        hours_recovered_y2: hoursRecoveredY2,
        hours_recovered_y3: hoursRecoveredY3,
        leader_hrs_recovered_y3: leaderHrsRecoveredY3,
        admin_hrs_week: adminHrsWeek,
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Failed to save submission', detail: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Unhandled error in submissions:', err);
    return res.status(500).json({ error: 'Server error', detail: err.message });
  }
};
