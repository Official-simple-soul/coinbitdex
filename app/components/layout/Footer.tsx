import { Link, NavLink } from 'react-router';
import { motion } from 'framer-motion';
import logo from '/images/logo.avif';

const footerLinks = {
  Products: [
    { label: 'Crypto Markets',  href: '/crypto-market' },
    { label: 'Copy Trading',    href: '/copy-trading' },
    { label: 'AI/Grid Bots',   href: '/ai' },
    { label: 'Buy Crypto',      href: '/buy-crypto' },
    { label: 'Spot Trading',    href: '/dashboard/spot' },
    { label: 'Futures',         href: '/dashboard/futures' },
  ],
  Company: [
    { label: 'About Us',      href: '/about' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Legal Terms',   href: '/legal' },
  ],
  Account: [
    { label: 'Login',     href: '/login' },
    { label: 'Register',  href: '/signup' },
    { label: 'Dashboard', href: '/dashboard' },
  ],
};

const socialLinks = [
  { icon: '𝕏', label: 'Twitter', href: '#' },
  { icon: 'in', label: 'LinkedIn', href: '#' },
  { icon: '▶', label: 'YouTube', href: '#' },
  { icon: '✈', label: 'Telegram', href: '#' },
];

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: '#040710',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        color: 'var(--text-secondary)',
      }}
    >
      {/* Top CTA Banner */}
      <div
        className="py-14 px-6 md:px-16"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.06) 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="container-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-[480px]">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Ready to Start Trading?
            </h2>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Join 1M+ traders. Register today and claim up to 9,125 USDT in bonuses.
            </p>
          </div>
          <Link to="/signup">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary px-9 py-4 text-base whitespace-nowrap"
              style={{ borderRadius: '12px', fontSize: '15px', fontWeight: 700 }}
            >
              Create Free Account →
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="container-xl py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-5">
              <img src={logo} alt="CoinbitDex" className="h-9" />
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-[280px]" style={{ color: 'var(--text-secondary)' }}>
              The most trusted decentralized crypto exchange. Secure, fast, and built for every type of trader.
            </p>

            {/* Contact */}
            <div className="space-y-2 text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
              <p>📧 support@coinbitdex.com</p>
              <p>📞 +1 (618) 362-2134</p>
              <p>📍 500 Terry Francois St, San Francisco, CA</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-200 hover:scale-110"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(59,130,246,0.15)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(59,130,246,0.4)';
                    (e.currentTarget as HTMLAnchorElement).style.color = '#60a5fa';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.06)';
                    (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-5">{group}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      to={link.href}
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mt-14 pt-10 rounded-2xl px-6 py-8"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1">Stay Updated</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Get market insights, new features, and trading tips delivered to your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 md:w-64 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 transition-all"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'white',
                  minWidth: '0',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(59,130,246,0.5)';
                  e.currentTarget.style.boxShadow = '0 0 0 2px rgba(59,130,246,0.15)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              />
              <button className="btn-primary px-6 py-3 whitespace-nowrap text-sm" style={{ borderRadius: '12px' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="flex items-center gap-3">
            <img src={logo} alt="CoinbitDex" className="h-5 opacity-50" />
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              © 2019–2026 CoinBitDex.com. All Rights Reserved.
            </p>
          </div>
          <div className="flex gap-5 text-xs" style={{ color: 'var(--text-muted)' }}>
            <NavLink to="/privacy" className="hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="/legal" className="hover:text-white transition-colors">Legal Terms</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
