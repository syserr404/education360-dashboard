import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Nav from '../../components/Nav';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend, Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, Tooltip, Legend, Filler
);

ChartJS.defaults.color           = 'rgba(255,255,255,0.5)';
ChartJS.defaults.borderColor     = 'rgba(255,255,255,0.07)';

const fmtMoney = v => v >= 1000000
  ? '$' + (Math.round(v / 100000) / 10).toFixed(1) + 'M'
  : '$' + Math.round(v / 1000) + 'K';

const fmtDate = s => new Date(s).toLocaleDateString('en-US', {
  month: 'short', day: 'numeric', year: 'numeric',
});

export default function Dashboard() {
  const router  = useRouter();
  const [data, setData]     = useState(null);
  const [error, setError]   = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (sessionStorage.getItem('e360_auth') !== 'true') {
        router.replace('/login');
        return;
      }
    }
    fetch('/api/get-submissions')
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error) setError(error);
        else setData(data || []);
      })
      .catch(() => setError('Failed to load data.'));
  }, []);

  if (!data && !error) return <Loading />;
  if (error) return <ErrorState msg={error} />;
  if (!data.length) return <EmptyState />;

  // ── Derived stats ──────────────────────────────────────────────────────────
  const avg = key => data.reduce((s, r) => s + (r[key] || 0), 0) / data.length;

  const byDay = {};
  data.forEach(r => {
    const d = r.submitted_at?.slice(0, 10);
    if (d) byDay[d] = (byDay[d] || 0) + 1;
  });
  const days = Object.keys(byDay).sort();

  const sizes = { 'Small (<1K)': 0, 'Medium (1-5K)': 0, 'Large (5-15K)': 0, 'Major (15K+)': 0 };
  data.forEach(r => {
    const s = r.students || 0;
    if (s < 1000)       sizes['Small (<1K)']++;
    else if (s < 5000)  sizes['Medium (1-5K)']++;
    else if (s < 15000) sizes['Large (5-15K)']++;
    else                sizes['Major (15K+)']++;
  });

  const bands = { '<$50K': 0, '$50-100K': 0, '$100-250K': 0, '$250-500K': 0, '$500K+': 0 };
  data.forEach(r => {
    const s = r.saving_y3_vs_today || 0;
    if      (s < 50000)  bands['<$50K']++;
    else if (s < 100000) bands['$50-100K']++;
    else if (s < 250000) bands['$100-250K']++;
    else if (s < 500000) bands['$250-500K']++;
    else                 bands['$500K+']++;
  });

  const toolCounts = {};
  data.forEach(r => {
    if (Array.isArray(r.tools)) r.tools.forEach(t => { toolCounts[t] = (toolCounts[t] || 0) + 1; });
  });
  const topTools = Object.entries(toolCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  const recent20 = [...data].slice(0, 20).reverse();

  return (
    <>
      <Head><title>Education360 · Overview</title></Head>
      <div style={{ minHeight: '100vh', background: '#060D1B' }}>
        <Nav />
        <main style={s.main}>
          <h1 style={s.title}>Overview</h1>
          <p style={s.sub}>
            Last updated {fmtDate(data[0].submitted_at)} · {data.length} total submission{data.length !== 1 ? 's' : ''}
          </p>

          {/* STAT CARDS */}
          <div style={s.statGrid}>
            <StatCard label="Total Submissions"  value={data.length}                        hint="Emails collected" />
            <StatCard label="Avg Year 3 Saving"  value={fmtMoney(avg('saving_y3_vs_today'))} hint="Per district annually" />
            <StatCard label="Avg Students"        value={Math.round(avg('students')).toLocaleString()} hint="Per submission" />
            <StatCard label="Avg Payback"         value={avg('payback_years').toFixed(1) + ' yrs'} hint="To recoup E360 cost" />
          </div>

          {/* CHARTS ROW 1 */}
          <div style={s.chartGrid}>
            <ChartCard title="Submissions Over Time" sub="Daily email captures">
              <Line
                data={{
                  labels: days.map(fmtDate),
                  datasets: [{
                    label: 'Submissions',
                    data: days.map(d => byDay[d]),
                    borderColor: '#E9B84A',
                    backgroundColor: 'rgba(233,184,74,0.08)',
                    tension: 0.4, fill: true,
                    pointRadius: 4, pointBackgroundColor: '#E9B84A',
                  }],
                }}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
              />
            </ChartCard>

            <ChartCard title="District Size Breakdown" sub="By student enrollment band">
              <Doughnut
                data={{
                  labels: Object.keys(sizes),
                  datasets: [{
                    data: Object.values(sizes),
                    backgroundColor: ['rgba(233,184,74,0.8)', 'rgba(233,184,74,0.55)', 'rgba(233,184,74,0.35)', 'rgba(233,184,74,0.18)'],
                    borderColor: 'rgba(255,255,255,0.08)',
                    borderWidth: 2,
                  }],
                }}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'right' } } }}
              />
            </ChartCard>
          </div>

          {/* CHARTS ROW 2 */}
          <div style={s.chartGrid}>
            <ChartCard title="Year 3 Savings Distribution" sub="Districts by savings range">
              <Bar
                data={{
                  labels: Object.keys(bands),
                  datasets: [{
                    label: 'Districts',
                    data: Object.values(bands),
                    backgroundColor: 'rgba(233,184,74,0.6)',
                    borderColor: '#E9B84A', borderWidth: 1, borderRadius: 6,
                  }],
                }}
                options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
              />
            </ChartCard>

            <ChartCard title="Top Tools in Use" sub="Most common tools selected">
              <Bar
                data={{
                  labels: topTools.map(([k]) => k),
                  datasets: [{
                    label: 'Districts using',
                    data: topTools.map(([, v]) => v),
                    backgroundColor: 'rgba(16,185,129,0.5)',
                    borderColor: '#10B981', borderWidth: 1, borderRadius: 6,
                  }],
                }}
                options={{
                  indexAxis: 'y',
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { display: false } },
                }}
              />
            </ChartCard>
          </div>

          {/* SPEND COMPARISON */}
          <ChartCard title="Spend Comparison by District" sub="Current spend vs Year 3 projected (most recent 20)" full>
            <div style={{ height: 300 }}>
              <Bar
                data={{
                  labels: recent20.map(r => r.district_name || 'Unknown'),
                  datasets: [
                    {
                      label: 'Current Spend',
                      data: recent20.map(r => r.current_annual_spend || 0),
                      backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 4,
                    },
                    {
                      label: 'Year 3 Spend',
                      data: recent20.map(r => r.total_y3_spend || 0),
                      backgroundColor: 'rgba(233,184,74,0.6)', borderRadius: 4,
                    },
                  ],
                }}
                options={{
                  responsive: true, maintainAspectRatio: false,
                  plugins: { legend: { position: 'top' } },
                  scales: {
                    x: { ticks: { maxRotation: 45, font: { size: 10 } } },
                    y: { ticks: { callback: v => fmtMoney(v) } },
                  },
                }}
              />
            </div>
          </ChartCard>

          {/* RECENT SUBMISSIONS */}
          <div style={s.card}>
            <div style={s.cardTitle}>Recent Submissions</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={s.table}>
                <thead>
                  <tr>
                    {['District','Email','Students','Year 3 Saving','Reduction','Submitted'].map(h => (
                      <th key={h} style={s.th}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, 10).map((r, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <td style={s.td}>
                        <strong>{r.district_name || '—'}</strong>
                        <div style={{ fontSize: 11, color: '#8B9DB8', marginTop: 2 }}>{r.county}</div>
                      </td>
                      <td style={{ ...s.td, color: '#8B9DB8' }}>{r.email}</td>
                      <td style={s.td}>{(r.students || 0).toLocaleString()}</td>
                      <td style={{ ...s.td, color: '#E9B84A', fontWeight: 700 }}>{fmtMoney(r.saving_y3_vs_today || 0)}</td>
                      <td style={s.td}><span style={s.badge}>{r.spend_reduction_pct}%</span></td>
                      <td style={{ ...s.td, color: '#8B9DB8', fontSize: 12 }}>{fmtDate(r.submitted_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <a href="/dashboard/table" style={s.viewAll}>View all submissions →</a>
          </div>

        </main>
      </div>
    </>
  );
}

function StatCard({ label, value, hint }) {
  return (
    <div style={s.statCard}>
      <div style={s.statLabel}>{label}</div>
      <div style={s.statValue}>{value}</div>
      <div style={s.statHint}>{hint}</div>
    </div>
  );
}

function ChartCard({ title, sub, children, full }) {
  return (
    <div style={{ ...s.card, ...(full ? { gridColumn: '1 / -1' } : {}) }}>
      <div style={s.cardTitle}>{title}</div>
      <div style={{ fontSize: 12, color: '#8B9DB8', marginBottom: 20 }}>{sub}</div>
      <div style={{ height: 260 }}>{children}</div>
    </div>
  );
}

function Loading() {
  return (
    <div style={{ minHeight: '100vh', background: '#060D1B' }}>
      <Nav />
      <div style={{ textAlign: 'center', padding: '80px', color: '#8B9DB8' }}>Loading data…</div>
    </div>
  );
}

function ErrorState({ msg }) {
  return (
    <div style={{ minHeight: '100vh', background: '#060D1B' }}>
      <Nav />
      <div style={{ textAlign: 'center', padding: '80px', color: '#FCA5A5' }}>Error: {msg}</div>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ minHeight: '100vh', background: '#060D1B' }}>
      <Nav />
      <div style={{ textAlign: 'center', padding: '80px', color: '#8B9DB8' }}>No submissions yet.</div>
    </div>
  );
}

const s = {
  main:      { padding: '40px', maxWidth: '1400px', margin: '0 auto' },
  title:     { fontSize: '28px', fontWeight: 800, marginBottom: '4px' },
  sub:       { fontSize: '14px', color: '#8B9DB8', marginBottom: '32px' },
  statGrid:  { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '24px' },
  statCard:  { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '24px' },
  statLabel: { fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#8B9DB8', marginBottom: '10px' },
  statValue: { fontSize: '32px', fontWeight: 800, color: '#E9B84A', lineHeight: 1, marginBottom: '4px' },
  statHint:  { fontSize: '12px', color: '#8B9DB8' },
  chartGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' },
  card:      { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '28px', marginBottom: '20px' },
  cardTitle: { fontSize: '14px', fontWeight: 700, marginBottom: '4px' },
  table:     { width: '100%', borderCollapse: 'collapse', minWidth: '700px' },
  th:        { padding: '0 16px 12px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B9DB8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.07)' },
  td:        { padding: '14px 16px', fontSize: '13px', verticalAlign: 'middle' },
  badge:     { display: 'inline-block', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600, background: 'rgba(16,185,129,0.12)', color: '#34D399' },
  viewAll:   { display: 'inline-block', marginTop: '20px', padding: '12px 24px', background: 'transparent', border: '1.5px solid #E9B84A', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#E9B84A', cursor: 'pointer' },
};
