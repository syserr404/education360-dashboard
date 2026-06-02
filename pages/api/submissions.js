import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const body = req.body || {};
    const {
      email, sessionId, districtName, county,
      students, educators, leaders, selectionMethod,
      toolCount, tools,
      currentAnnualSpend, e360AnnualCost,
      totalY1Spend, totalY2Spend, totalY3Spend,
      savingY2VsToday, savingY3VsToday,
      spendReductionPct, costPerStudentToday, costPerStudentY3, paybackYears,
      hoursLostWeeklyToday, hoursRecoveredY1, hoursRecoveredY2,
      hoursRecoveredY3, leaderHrsRecoveredY3, adminHrsWeek,
    } = body;

    if (!email || !sessionId) {
      return res.status(400).json({ error: 'Missing required fields: email, sessionId' });
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    const { error } = await supabase.from('submissions').insert([{
      email,
      session_id:              sessionId,
      submitted_at:            new Date().toISOString(),
      district_name:           districtName,
      county,
      students,
      educators,
      leaders,
      selection_method:        selectionMethod,
      tool_count:              toolCount,
      tools,
      current_annual_spend:    currentAnnualSpend,
      e360_annual_cost:        e360AnnualCost,
      total_y1_spend:          totalY1Spend,
      total_y2_spend:          totalY2Spend,
      total_y3_spend:          totalY3Spend,
      saving_y2_vs_today:      savingY2VsToday,
      saving_y3_vs_today:      savingY3VsToday,
      spend_reduction_pct:     spendReductionPct,
      cost_per_student_today:  costPerStudentToday,
      cost_per_student_y3:     costPerStudentY3,
      payback_years:           paybackYears,
      hours_lost_weekly_today: hoursLostWeeklyToday,
      hours_recovered_y1:      hoursRecoveredY1,
      hours_recovered_y2:      hoursRecoveredY2,
      hours_recovered_y3:      hoursRecoveredY3,
      leader_hrs_recovered_y3: leaderHrsRecoveredY3,
      admin_hrs_week:          adminHrsWeek,
    }]);

    if (error) throw new Error(error.message);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('submissions error:', err);
    return res.status(500).json({ error: err.message });
  }
}
