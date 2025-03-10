import NavOne from './Nav';
import ScrollingTextAnimation from '../common/ScrollingText';

const Header = () => {
  return (
    <header className="sticky top-0  shadow-md h-auto text-black font-semibold z-50 bg-white">
      <NavOne />
      <ScrollingTextAnimation />
    </header>
  );
};

export default Header;
