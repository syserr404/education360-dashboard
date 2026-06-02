import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        sessionStorage.setItem('e360_auth', 'true');
        router.push('/dashboard');
      } else {
        setError('Incorrect username or password.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head><title>Education360 · Login</title></Head>
      <div style={s.page}>
        <form style={s.card} onSubmit={handleLogin}>
          <div style={s.logo}>Education360</div>
          <h1 style={s.h1}>Dashboard Login</h1>

          {error && <div style={s.error}>{error}</div>}

          <label style={s.label}>Username</label>
          <input
            style={s.input}
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />

          <label style={s.label}>Password</label>
          <input
            style={s.input}
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />

          <button style={s.btn} type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </>
  );
}

const s = {
  page: {
    minHeight: '100vh', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    background: '#060D1B', padding: '24px',
  },
  card: {
    width: '100%', maxWidth: '400px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '16px', padding: '48px 40px',
    display: 'flex', flexDirection: 'column',
  },
  logo: {
    fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: '#E9B84A', marginBottom: '8px',
  },
  h1: { fontSize: '24px', fontWeight: 800, color: '#fff', marginBottom: '28px' },
  error: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    borderRadius: '8px', padding: '12px 16px',
    fontSize: '13px', color: '#FCA5A5', marginBottom: '20px',
  },
  label: {
    fontSize: '12px', fontWeight: 600,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase', letterSpacing: '0.08em',
    marginBottom: '8px',
  },
  input: {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.07)',
    border: '1.5px solid rgba(255,255,255,0.12)',
    borderRadius: '10px', fontSize: '15px',
    color: '#fff', outline: 'none', marginBottom: '20px',
  },
  btn: {
    width: '100%', padding: '15px',
    background: 'linear-gradient(135deg, #E9B84A, #B8872A)',
    border: 'none', borderRadius: '10px',
    fontSize: '15px', fontWeight: 700,
    color: '#06101E', cursor: 'pointer', marginTop: '4px',
  },
};
