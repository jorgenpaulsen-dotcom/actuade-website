// GlobalNav.jsx — Apple Design System
// Exports: GlobalNav, SubNav

const AppleLogo = ({ color = "#f5f5f7" }) => (
  <svg width="15" height="18" viewBox="0 0 814 1000" fill={color}>
    <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.7 0 663 0 541.8c0-207.4 134.4-317 266.5-317 99.8 0 183 66.6 245.3 66.6 59.2 0 152-70.8 265.4-70.8 43.1 0 165.8 3.8 257.4 137.8zm-163.5-226.5c43.1-51.4 74.1-122.8 74.1-194.2 0-10.2-.6-20.3-2.5-28.4-70.8 2.5-154.8 47.2-206.2 107.1-35.5 39.5-69.7 110.9-69.7 183.6 0 11.5 2 23 2.5 26.9 4.5.6 11.5 1.3 18.4 1.3 63.5 0 143.6-42.9 183.4-96.3z"/>
  </svg>
);

const SearchIcon = ({ color = "#f5f5f7" }) => (
  <svg width="15" height="15" viewBox="0 0 21 21" fill="none">
    <circle cx="9.5" cy="9.5" r="6.5" stroke={color} strokeWidth="1.5"/>
    <path d="M14.5 14.5L19 19" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const BagIcon = ({ color = "#f5f5f7" }) => (
  <svg width="14" height="16" viewBox="0 0 21 21" fill="none">
    <path d="M3 7h15v11a1.5 1.5 0 0 1-1.5 1.5h-12A1.5 1.5 0 0 1 3 18V7z" stroke={color} strokeWidth="1.5"/>
    <path d="M7 7V5.5a3.5 3.5 0 0 1 7 0V7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const MenuIcon = ({ color = "#f5f5f7" }) => (
  <svg width="18" height="12" viewBox="0 0 21 15" fill="none">
    <line x1="0" y1="1.5" x2="21" y2="1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="0" y1="7.5" x2="21" y2="7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="0" y1="13.5" x2="21" y2="13.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const globalNavStyles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 1000,
    background: '#000',
    height: '44px',
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 22px',
  },
  links: {
    display: 'flex', gap: '20px', alignItems: 'center',
    listStyle: 'none',
  },
  link: {
    fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
    fontSize: '12px', fontWeight: 400, color: 'rgba(245,245,247,0.85)',
    letterSpacing: '-0.12px', lineHeight: 1,
    cursor: 'pointer', textDecoration: 'none',
    transition: 'color 150ms ease',
  },
  icons: { display: 'flex', gap: '16px', alignItems: 'center' },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' },
  menuBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'none', alignItems: 'center' },
};

const NAV_ITEMS = ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods', 'TV & Home', 'Entertainment', 'Accessories', 'Support'];

function GlobalNav({ activePage, onNavigate }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <nav style={globalNavStyles.nav}>
      <button style={globalNavStyles.iconBtn} onClick={() => onNavigate && onNavigate('home')}>
        <AppleLogo />
      </button>
      <ul style={globalNavStyles.links} className="global-nav-links">
        {NAV_ITEMS.map(item => (
          <li key={item}>
            <a
              style={{
                ...globalNavStyles.link,
                color: activePage === item.toLowerCase() ? '#fff' : 'rgba(245,245,247,0.85)'
              }}
              onClick={() => onNavigate && onNavigate(item.toLowerCase())}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <div style={globalNavStyles.icons}>
        <button style={globalNavStyles.iconBtn}><SearchIcon /></button>
        <button style={globalNavStyles.iconBtn}><BagIcon /></button>
      </div>
    </nav>
  );
}

function SubNav({ product, links = [], onBuy, onNavigate }) {
  return (
    <div style={{
      position: 'sticky', top: '44px', zIndex: 999,
      background: 'rgba(245,245,247,0.85)',
      backdropFilter: 'saturate(180%) blur(20px)',
      WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      borderBottom: '1px solid rgba(0,0,0,0.08)',
      height: '52px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 22px',
    }}>
      <span style={{
        fontFamily: 'SF Pro Display, system-ui, -apple-system, sans-serif',
        fontSize: '21px', fontWeight: 600, color: '#1d1d1f',
        letterSpacing: '0.231px', lineHeight: 1.19,
      }}>{product}</span>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {links.map(link => (
          <a key={link.label}
            onClick={() => onNavigate && onNavigate(link.target)}
            style={{
              fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
              fontSize: '14px', fontWeight: 400, color: '#0066cc',
              letterSpacing: '-0.224px', cursor: 'pointer', textDecoration: 'none',
            }}
          >{link.label}</a>
        ))}
        <button
          onClick={onBuy}
          style={{
            background: '#0066cc', color: '#fff',
            fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
            fontSize: '14px', fontWeight: 400,
            borderRadius: '9999px', border: 'none',
            padding: '8px 18px', cursor: 'pointer',
            transition: 'transform 150ms ease',
          }}
          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
        >Buy</button>
      </div>
    </div>
  );
}

Object.assign(window, { GlobalNav, SubNav, AppleLogo, SearchIcon, BagIcon, MenuIcon });
