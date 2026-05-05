// Footer.jsx — Apple Design System
// Exports: Footer

const FOOTER_COLUMNS = [
  {
    heading: 'Shop and Learn',
    links: ['Store', 'Mac', 'iPad', 'iPhone', 'Watch', 'Vision', 'AirPods', 'TV & Home', 'AirTag', 'Accessories', 'Gift Cards'],
  },
  {
    heading: 'Apple Wallet',
    links: ['Wallet', 'Apple Card', 'Apple Pay', 'Apple Cash'],
  },
  {
    heading: 'Account',
    links: ['Manage Your Apple ID', 'Apple Store Account', 'iCloud.com'],
  },
  {
    heading: 'Entertainment',
    links: ['Apple One', 'Apple TV+', 'Apple Music', 'Apple Arcade', 'Apple Fitness+', 'Apple News+', 'Apple Podcasts', 'Apple Books', 'App Store'],
  },
  {
    heading: 'Apple Store',
    links: ['Find a Store', 'Genius Bar', 'Today at Apple', 'Apple Summer Camp', 'Apple Store App', 'Certified Refurbished', 'Apple Trade In', 'Financing', 'Carrier Deals at Apple', 'Order Status', 'Shopping Help'],
  },
  {
    heading: 'For Business',
    links: ['Apple and Business', 'Shop for Business'],
  },
  {
    heading: 'For Education',
    links: ['Apple and Education', 'Shop for K-12', 'Shop for College'],
  },
  {
    heading: 'For Healthcare',
    links: ['Apple in Healthcare', 'Mac in Healthcare', 'Health on Apple Watch', 'Health Records on iPhone', 'Aetna + Apple'],
  },
];

const LEGAL_LINKS = ['Privacy Policy', 'Terms of Use', 'Sales Policy', 'Legal', 'Site Map'];

function Footer() {
  return (
    <footer style={{
      background: '#f5f5f7',
      borderTop: '1px solid #d2d2d7',
      padding: '48px 22px 32px',
    }}>
      {/* Country callout */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        borderBottom: '1px solid #d2d2d7',
        paddingBottom: '16px', marginBottom: '24px',
      }}>
        <p style={{
          fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
          fontSize: '12px', color: '#6e6e73', lineHeight: 1.67,
        }}>
          Copyright © 2026 Apple Inc. All rights reserved.
        </p>
      </div>

      {/* Link columns */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {FOOTER_COLUMNS.slice(0, 5).map(col => (
          <div key={col.heading}>
            <div style={{
              fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
              fontSize: '12px', fontWeight: 600, color: '#1d1d1f',
              letterSpacing: '-0.12px', marginBottom: '0',
            }}>{col.heading}</div>
            {col.links.map(link => (
              <div key={link}>
                <a style={{
                  fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
                  fontSize: '12px', fontWeight: 400, color: '#424245',
                  lineHeight: 2.41, letterSpacing: '0',
                  display: 'block', textDecoration: 'none', cursor: 'pointer',
                }}>{link}</a>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legal row */}
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        borderTop: '1px solid #d2d2d7',
        paddingTop: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '8px',
      }}>
        <p style={{
          fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
          fontSize: '12px', color: '#6e6e73', letterSpacing: '-0.12px',
        }}>
          Copyright © 2026 Apple Inc. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '20px' }}>
          {LEGAL_LINKS.map(link => (
            <a key={link} style={{
              fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
              fontSize: '12px', color: '#424245',
              letterSpacing: '-0.12px', textDecoration: 'none', cursor: 'pointer',
            }}>{link}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Footer });
