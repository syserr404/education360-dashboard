import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Nav() {
  const router = useRouter();

  function logout() {
    sessionStorage.removeItem('e360_auth');
    router.push('/login');
  }

  const active = (path) => router.pathname === path;
  const startsWith = (path) => router.pathname.startsWith(path);

  return (
    <nav style={s.nav}>
      <div style={s.logo}>Education360 · Analytics</div>
      <div style={s.links}>

        {/* Calculator source */}
        <div style={s.group}>
          <div style={s.groupLabel}>Calculator</div>
          <div style={s.groupLinks}>
            <Link href="/dashboard"
              style={{ ...s.link, ...(active('/dashboard') ? s.active : {}) }}>
              Overview
            </Link>
            <Link href="/dashboard/table"
              style={{ ...s.link, ...(active('/dashboard/table') ? s.active : {}) }}>
              All Submissions
            </Link>
          </div>
        </div>

        <div style={s.divider} />

        {/* Beyond source */}
        <div style={s.group}>
          <div style={s.groupLabel}>E360Beyond</div>
          <div style={s.groupLinks}>
            <Link href="/dashboard/beyond"
              style={{ ...s.link, ...(active('/dashboard/beyond') ? s.active : {}) }}>
              Submissions
            </Link>
          </div>
        </div>

        <div style={s.divider} />

        {/* Workshop source */}
        <div style={s.group}>
          <div style={s.groupLabel}>E360 Workshop</div>
          <div style={s.groupLinks}>
            <Link href="/dashboard/workshop"
              style={{ ...s.link, ...(active('/dashboard/workshop') ? s.active : {}) }}>
              Submissions
            </Link>
          </div>
        </div>

      </div>
      <button style={s.logout} onClick={logout}>Sign Out</button>
    </nav>
  );
}

const s = {
  nav: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '14px 40px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
    position: 'sticky', top: 0, zIndex: 100,
    background: 'rgba(6,13,27,0.95)',
    backdropFilter: 'blur(12px)',
  },
  logo: {
    fontSize: '11px', fontWeight: 700,
    letterSpacing: '0.14em', textTransform: 'uppercase',
    color: '#E9B84A', flexShrink: 0,
  },
  links: { display: 'flex', alignItems: 'center', gap: '24px' },
  group: { display: 'flex', flexDirection: 'column', gap: '4px' },
  groupLabel: {
    fontSize: '9px', fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.12em', color: 'rgba(255,255,255,0.25)',
    paddingLeft: '8px',
  },
  groupLinks: { display: 'flex', gap: '4px' },
  divider: {
    width: '1px', height: '36px',
    background: 'rgba(255,255,255,0.1)',
    flexShrink: 0,
  },
  link: {
    padding: '7px 14px', borderRadius: '8px',
    fontSize: '13px', fontWeight: 600,
    color: '#8B9DB8', transition: 'all 0.2s', cursor: 'pointer',
  },
  active: { color: '#fff', background: 'rgba(255,255,255,0.1)' },
  logout: {
    padding: '8px 16px', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '8px', fontSize: '13px',
    color: '#8B9DB8', cursor: 'pointer', flexShrink: 0,
  },
};
