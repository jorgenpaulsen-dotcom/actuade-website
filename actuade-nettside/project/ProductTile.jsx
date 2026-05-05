// ProductTile.jsx — Apple Design System
// Exports: ProductTile, HeroTile

const productTileStyles = {
  tile: {
    width: '100%',
    minHeight: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '80px',
    paddingBottom: '80px',
    textAlign: 'center',
    borderRadius: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  headline: {
    fontFamily: 'SF Pro Display, system-ui, -apple-system, sans-serif',
    fontSize: '40px', fontWeight: 600,
    lineHeight: 1.10, letterSpacing: '0px',
    marginBottom: '8px',
  },
  tagline: {
    fontFamily: 'SF Pro Display, system-ui, -apple-system, sans-serif',
    fontSize: '21px', fontWeight: 400,
    lineHeight: 1.4, letterSpacing: '0.2px',
    marginBottom: '24px',
  },
  ctas: { display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '48px' },
  btnPrimary: {
    background: '#0066cc', color: '#fff',
    fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
    fontSize: '17px', fontWeight: 400,
    borderRadius: '9999px', border: 'none',
    padding: '11px 22px', cursor: 'pointer',
    transition: 'transform 150ms ease',
    lineHeight: 1.47, letterSpacing: '-0.374px',
  },
  btnGhost: {
    background: 'transparent',
    fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
    fontSize: '17px', fontWeight: 400,
    borderRadius: '9999px',
    padding: '11px 22px', cursor: 'pointer',
    transition: 'transform 150ms ease',
    lineHeight: 1.47, letterSpacing: '-0.374px',
  },
  imageWrap: {
    width: '100%', maxWidth: '600px',
    display: 'flex', justifyContent: 'center',
    marginTop: 'auto',
  },
  productImage: {
    maxWidth: '100%', maxHeight: '380px',
    objectFit: 'contain',
    filter: 'drop-shadow(rgba(0,0,0,0.22) 3px 5px 30px)',
  },
};

const VARIANTS = {
  light:     { bg: '#ffffff',   text: '#1d1d1f', muted: '#1d1d1f', ghostColor: '#0066cc', ghostBorder: '1px solid #0066cc' },
  parchment: { bg: '#f5f5f7',   text: '#1d1d1f', muted: '#1d1d1f', ghostColor: '#0066cc', ghostBorder: '1px solid #0066cc' },
  dark:      { bg: '#272729',   text: '#ffffff',  muted: '#cccccc', ghostColor: '#2997ff', ghostBorder: '1px solid #2997ff' },
  dark2:     { bg: '#2a2a2c',   text: '#ffffff',  muted: '#cccccc', ghostColor: '#2997ff', ghostBorder: '1px solid #2997ff' },
  dark3:     { bg: '#252527',   text: '#ffffff',  muted: '#cccccc', ghostColor: '#2997ff', ghostBorder: '1px solid #2997ff' },
  black:     { bg: '#000000',   text: '#ffffff',  muted: '#cccccc', ghostColor: '#2997ff', ghostBorder: '1px solid #2997ff' },
};

function Btn({ style, onClick, children }) {
  return (
    <button
      style={style}
      onClick={onClick}
      onMouseDown={e => e.currentTarget.style.transform = 'scale(0.95)'}
      onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
    >{children}</button>
  );
}

function ProductTile({
  variant = 'light',
  headline,
  eyebrow,
  tagline,
  ctaPrimary = 'Learn more',
  ctaSecondary = 'Buy',
  onPrimary,
  onSecondary,
  image,
  imageAlt = '',
  minHeight = '560px',
  children,
}) {
  const v = VARIANTS[variant] || VARIANTS.light;
  return (
    <section style={{ ...productTileStyles.tile, background: v.bg, minHeight }}>
      {eyebrow && (
        <p style={{
          fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif',
          fontSize: '21px', fontWeight: 600, color: '#0066cc',
          letterSpacing: '0.231px', marginBottom: '4px',
        }}>{eyebrow}</p>
      )}
      <h2 style={{ ...productTileStyles.headline, color: v.text }}>{headline}</h2>
      {tagline && <p style={{ ...productTileStyles.tagline, color: v.muted }}>{tagline}</p>}
      <div style={productTileStyles.ctas}>
        {ctaPrimary && (
          <Btn style={productTileStyles.btnPrimary} onClick={onPrimary}>{ctaPrimary}</Btn>
        )}
        {ctaSecondary && (
          <Btn style={{ ...productTileStyles.btnGhost, color: v.ghostColor, border: v.ghostBorder }} onClick={onSecondary}>{ctaSecondary}</Btn>
        )}
      </div>
      {image && (
        <div style={productTileStyles.imageWrap}>
          <img src={image} alt={imageAlt} style={productTileStyles.productImage} />
        </div>
      )}
      {!image && children && (
        <div style={productTileStyles.imageWrap}>{children}</div>
      )}
      {!image && !children && (
        <div style={{ ...productTileStyles.imageWrap, justifyContent: 'center' }}>
          <div style={{
            width: '340px', height: '280px',
            background: v.text === '#ffffff' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif', fontSize: '13px', color: v.muted, opacity: 0.4 }}>Product imagery</span>
          </div>
        </div>
      )}
    </section>
  );
}

// Hero variant — larger display-size headline
function HeroTile({ variant = 'light', headline, tagline, ctaPrimary, ctaSecondary, onPrimary, onSecondary, image, imageAlt = '', children }) {
  const v = VARIANTS[variant] || VARIANTS.light;
  return (
    <section style={{ ...productTileStyles.tile, background: v.bg, minHeight: '680px' }}>
      <h1 style={{
        fontFamily: 'SF Pro Display, system-ui, -apple-system, sans-serif',
        fontSize: '56px', fontWeight: 600,
        lineHeight: 1.07, letterSpacing: '-0.28px',
        color: v.text, marginBottom: '10px',
      }}>{headline}</h1>
      {tagline && (
        <p style={{
          fontFamily: 'SF Pro Display, system-ui, -apple-system, sans-serif',
          fontSize: '28px', fontWeight: 400,
          lineHeight: 1.14, letterSpacing: '0.196px',
          color: v.muted, marginBottom: '28px',
        }}>{tagline}</p>
      )}
      <div style={productTileStyles.ctas}>
        {ctaPrimary && <Btn style={productTileStyles.btnPrimary} onClick={onPrimary}>{ctaPrimary}</Btn>}
        {ctaSecondary && <Btn style={{ ...productTileStyles.btnGhost, color: v.ghostColor, border: v.ghostBorder }} onClick={onSecondary}>{ctaSecondary}</Btn>}
      </div>
      {image && (
        <div style={productTileStyles.imageWrap}>
          <img src={image} alt={imageAlt} style={{ ...productTileStyles.productImage, maxHeight: '440px' }} />
        </div>
      )}
      {!image && children && <div style={productTileStyles.imageWrap}>{children}</div>}
      {!image && !children && (
        <div style={{ ...productTileStyles.imageWrap }}>
          <div style={{
            width: '460px', height: '340px',
            background: v.text === '#ffffff' ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'SF Pro Text, system-ui, -apple-system, sans-serif', fontSize: '13px', color: v.muted, opacity: 0.4 }}>Hero product imagery</span>
          </div>
        </div>
      )}
    </section>
  );
}

Object.assign(window, { ProductTile, HeroTile });
