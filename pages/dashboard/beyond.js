import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Nav from '../../components/Nav';

const fmtDate = s => new Date(s).toLocaleDateString('en-US', {
  month: 'short', day: 'numeric', year: 'numeric',
});

const schoolTypeLabel = {
  public_k12: 'Public K-12',
  charter: 'Charter',
  private: 'Private',
  higher_ed: 'Higher Ed',
};

const PAGE_SIZE = 25;

export default function BeyondTable() {
  const router = useRouter();
  const [allData, setAllData]   = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [expanded, setExpanded] = useState(null);

  // Filters
  const [search, setSearch]         = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [dateFrom, setDateFrom]     = useState('');
  const [dateTo, setDateTo]         = useState('');

  // Sort
  const [sortKey, setSortKey] = useState('submitted_at');
  const [sortDir, setSortDir] = useState(-1);

  // Pagination
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (sessionStorage.getItem('e360_auth') !== 'true') {
      router.replace('/login'); return;
    }
    fetch('/api/get-beyond-submissions')
      .then(r => r.json())
      .then(({ data, error }) => {
        if (error) { setError(error); return; }
        const d = data || [];
        setAllData(d);
        setFiltered(d);
        setLoading(false);
      })
      .catch(() => { setError('Failed to load.'); setLoading(false); });
  }, []);

  useEffect(() => {
    let f = allData.filter(r => {
      if (search) {
        const q = search.toLowerCase();
        if (!r.first_name?.toLowerCase().includes(q) &&
            !r.last_name?.toLowerCase().includes(q) &&
            !r.school_name?.toLowerCase().includes(q) &&
            !r.email?.toLowerCase().includes(q)) return false;
      }
      if (schoolType && r.school_type !== schoolType) return false;
      if (dateFrom && r.submitted_at?.slice(0, 10) < dateFrom) return false;
      if (dateTo   && r.submitted_at?.slice(0, 10) > dateTo)   return false;
      return true;
    });
    f = [...f].sort((a, b) => {
      const av = a[sortKey] ?? '';
      const bv = b[sortKey] ?? '';
      return av < bv ? -sortDir : av > bv ? sortDir : 0;
    });
    setFiltered(f);
    setPage(1);
  }, [search, schoolType, dateFrom, dateTo, sortKey, sortDir, allData]);

  function handleSort(key) {
    if (sortKey === key) setSortDir(d => d * -1);
    else { setSortKey(key); setSortDir(-1); }
  }

  function reset() {
    setSearch(''); setSchoolType(''); setDateFrom(''); setDateTo('');
  }

  const maxPage   = Math.ceil(filtered.length / PAGE_SIZE);
  const pageSlice = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const SortIcon = ({ k }) => (
    <span style={{ marginLeft: 4, opacity: sortKey === k ? 1 : 0.3, color: sortKey === k ? '#E9B84A' : 'inherit' }}>
      {sortKey === k ? (sortDir === -1 ? '↓' : '↑') : '↕'}
    </span>
  );

  return (
    <>
      <Head><title>Education360 · E360Beyond Submissions</title></Head>
      <div style={{ minHeight: '100vh', background: '#060D1B' }}>
        <Nav />
        <main style={s.main}>
          <h1 style={s.title}>E360Beyond Submissions</h1>
          <p style={s.sub}>Every interest form submission — searchable, filterable, sortable.</p>

          {/* FILTERS */}
          <div style={s.filters}>
            <div style={s.fg}>
              <div style={s.flabel}>Search</div>
              <input style={s.input} type="text" placeholder="Name, school, or email…"
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            <div style={s.fg}>
              <div style={s.flabel}>School Type</div>
              <select style={s.select} value={schoolType} onChange={e => setSchoolType(e.target.value)}>
                <option value="">All types</option>
                <option value="public_k12">Public K-12</option>
                <option value="charter">Charter</option>
                <option value="private">Private</option>
                <option value="higher_ed">Higher Education</option>
              </select>
            </div>
            <div style={s.fg}>
              <div style={s.flabel}>From Date</div>
              <input style={s.input} type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
            </div>
            <div style={s.fg}>
              <div style={s.flabel}>To Date</div>
              <input style={s.input} type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} />
            </div>
            <div style={{ ...s.fg, justifyContent: 'flex-end' }}>
              <div style={s.flabel}>&nbsp;</div>
              <button style={s.resetBtn} onClick={reset}>Reset</button>
            </div>
          </div>

          <div style={{ fontSize: 13, color: '#8B9DB8', marginBottom: 16 }}>
            Showing <strong style={{ color: '#fff' }}>{filtered.length}</strong> submission{filtered.length !== 1 ? 's' : ''}
          </div>

          {loading && <div style={{ textAlign: 'center', padding: 60, color: '#8B9DB8' }}>Loading…</div>}
          {error   && <div style={{ textAlign: 'center', padding: 60, color: '#FCA5A5' }}>{error}</div>}

          {!loading && !error && (
            <>
              <div style={{ overflowX: 'auto', borderRadius: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 900 }}>
                  <thead style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <tr>
                      <th style={s.th}></th>
                      {[
                        ['first_name', 'First Name'],
                        ['last_name',  'Last Name'],
                        ['title',      'Title'],
                        ['school_name','School'],
                        ['school_type','Type'],
                        ['email',      'Email'],
                        ['phone',      'Phone'],
                        ['submitted_at','Submitted'],
                      ].map(([key, label]) => (
                        <th key={key} style={{ ...s.th, cursor: 'pointer' }} onClick={() => handleSort(key)}>
                          {label} <SortIcon k={key} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {pageSlice.map((r, i) => (
                      <>
                        <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                          <td style={s.td}>
                            <button style={s.expandBtn} onClick={() => setExpanded(expanded === i ? null : i)}>
                              {expanded === i ? '−' : '+'}
                            </button>
                          </td>
                          <td style={s.td}><strong>{r.first_name || '—'}</strong></td>
                          <td style={s.td}>{r.last_name || '—'}</td>
                          <td style={{ ...s.td, color: '#8B9DB8' }}>{r.title || '—'}</td>
                          <td style={s.td}>{r.school_name || '—'}</td>
                          <td style={s.td}>
                            <span style={s.badge}>{schoolTypeLabel[r.school_type] || r.school_type || '—'}</span>
                          </td>
                          <td style={{ ...s.td, color: '#8B9DB8' }}>{r.email}</td>
                          <td style={{ ...s.td, color: '#8B9DB8' }}>{r.phone || '—'}</td>
                          <td style={{ ...s.td, color: '#8B9DB8', fontSize: 12 }}>{fmtDate(r.submitted_at)}</td>
                        </tr>
                        {expanded === i && (
                          <tr key={`exp-${i}`}>
                            <td colSpan={9} style={s.detailCell}>
                              <div style={s.detailGrid}>
                                {[
                                  ['Country',        r.country || '—'],
                                  ['Heard About Us', r.hear_about || '—'],
                                  ['Reduce Costs',   r.reduce_costs === true ? 'Yes' : r.reduce_costs === false ? 'No' : '—'],
                                  ['Notify Events',  r.notify_events === true ? 'Yes' : r.notify_events === false ? 'No' : '—'],
                                ].map(([k, v]) => (
                                  <div key={k}>
                                    <div style={s.dKey}>{k}</div>
                                    <div style={s.dVal}>{v}</div>
                                  </div>
                                ))}
                                {r.students_info && (
                                  <div style={{ gridColumn: '1 / -1' }}>
                                    <div style={s.dKey}>Student Info</div>
                                    <div style={{ ...s.dVal, fontWeight: 400, fontSize: 13, lineHeight: 1.6, color: '#CBD5E1' }}>{r.students_info}</div>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINATION */}
              <div style={s.pagination}>
                <div style={{ fontSize: 13, color: '#8B9DB8' }}>Page {page} of {maxPage || 1}</div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={s.pageBtn} disabled={page <= 1} onClick={() => setPage(p => p - 1)}>← Previous</button>
                  <button style={s.pageBtn} disabled={page >= maxPage} onClick={() => setPage(p => p + 1)}>Next →</button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}

const s = {
  main:       { padding: '40px', maxWidth: '1400px', margin: '0 auto' },
  title:      { fontSize: '28px', fontWeight: 800, marginBottom: '4px' },
  sub:        { fontSize: '14px', color: '#8B9DB8', marginBottom: '28px' },
  filters:    { display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 24, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20 },
  fg:         { display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 150 },
  flabel:     { fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B9DB8' },
  input:      { padding: '10px 14px', background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 13, color: '#fff', outline: 'none' },
  select:     { padding: '10px 14px', background: 'rgba(6,13,27,0.9)', border: '1.5px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 13, color: '#fff', outline: 'none' },
  resetBtn:   { padding: '10px 18px', background: 'transparent', border: '1.5px solid rgba(255,255,255,0.15)', borderRadius: 8, fontSize: 13, color: '#8B9DB8', cursor: 'pointer' },
  th:         { padding: '14px 16px', fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B9DB8', textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.07)', whiteSpace: 'nowrap' },
  td:         { padding: '14px 16px', fontSize: 13, verticalAlign: 'middle' },
  expandBtn:  { background: 'none', border: 'none', color: '#8B9DB8', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: '0 4px' },
  badge:      { display: 'inline-block', padding: '3px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: 'rgba(139,157,184,0.12)', color: '#8B9DB8' },
  detailCell: { padding: '0 16px 16px 48px', background: 'rgba(233,184,74,0.03)' },
  detailGrid: { display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, padding: '16px 0', borderTop: '1px solid rgba(255,255,255,0.05)' },
  dKey:       { fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B9DB8', marginBottom: 4 },
  dVal:       { fontSize: 14, fontWeight: 600, color: '#fff' },
  pagination: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20 },
  pageBtn:    { padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 13, color: '#fff', cursor: 'pointer' },
};
