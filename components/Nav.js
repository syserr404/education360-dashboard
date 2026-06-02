import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Nav() {
  const router = useRouter();

  function logout() {
    sessionStorage.removeItem('e360_auth');
    router.push('/login');
  }

  const isActive = (path) => router.pathname === path || router.pathname.startsWith(path + '/');

  return (
    <nav style={s.nav}>
      <div style={s.logo}>Education360 · Analytics</div>
      <div style={s.links}>
        <Link href="/dashboard" style={{ ...s.link, ...(isActive('/dashboard') && !isActive('/dashboard/table') ? s.active : {}) }}>
          Overview
        </Link>
        <Link href="/dashboard/table" style={{ ...s.link, ...(isActive('/dashboard/table') ? s.active : {}) }}>
          All Submissions
        </Link>
      </div>
      <button style={s.logout} onClick={logout}>Sign Out</button>
    </nav>
  );
}

const s = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '18px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(6,13,27,0.95)',
    backdropFilter: 'blur(12px)',
  },
  logo: {
    fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: '#E9B84A',
  },
  links: { display: 'flex', gap: '8px' },
  link: {
    padding: '8px 16px', borderRadius: '8px',
    fontSize: '13px', fontWeight: 600,
    color: '#8B9DB8', transition: 'all 0.2s', cursor: 'pointer',
  },
  active: { color: '#fff', background: 'rgba(255,255,255,0.1)' },
  logout: {
    padding: '8px 16px', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px', fontSize: '13px',
    color: '#8B9DB8', cursor: 'pointer',
  },
};
