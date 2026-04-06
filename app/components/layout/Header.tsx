import NavOne from './Nav';

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 glass-nav"
      style={{
        background: 'rgba(6, 9, 20, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      <NavOne />
    </header>
  );
};

export default Header;
