import { Button, Stack, TextInput, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import logo from '/images/logo.avif';
import { Link } from 'react-router';
import giftBox from '/images/gift-box.gif';
import sparkle from '/images/sparkle.gif';

const Footer = () => {
  const isMediumScreen = useMediaQuery('(min-width: 768px)');

  return (
    <footer className="bg-gray-800 text-white md:bg-white md:text-black py-12 px-6 md:px-16">
      <section id="giftBox-section" className="px-6 py-12 bg-white">
        <div className="flex flex-col sm:flex-row mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px]">
          <div className="sm:w-[55%]">
            <h1 className="text-3xl font-bold mb-4">
              Register to Claim Bonuses of up to 9125 USDT.
            </h1>
            <p className="text-gray-600 mb-6">It only takes a few minutes.</p>
            <div className="flex items-center">
              <Group
                style={{
                  border: '1px solid blue',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  // flex: 1,
                  alignItems: 'center',
                  width: '90%',
                  gap: 0,
                }}
              >
                {' '}
                <TextInput
                  placeholder="Please enter your email address"
                  style={{
                    flex: 1,
                    border: 'none',
                  }}
                  radius={0}
                  styles={{
                    input: { border: 'none', borderRadius: 0 },
                  }}
                />{' '}
                <Link to="/signup">
                  <Button
                    style={{
                      height: '45px',
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                    color="blue"
                  >
                    Register Now!
                  </Button>
                </Link>
              </Group>
            </div>
          </div>
          <div className="mt-8 sm:w-[45%] flex justify-center relative">
            <img
              src={sparkle}
              alt="Sparkle"
              className="absolute w-[40%] -top-12 left-1"
            />
            <img src={giftBox} alt="Gift Box" className="w-[100%]" />
          </div>
        </div>
      </section>

      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Terms */}
        <div className="flex flex-col justify-between">
          <div className="">
            <h3 className="font-semibold mb-4">Terms</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-blue-500 md:hover:text-gray-900 md:hover:underline"
                >
                  Privacy & Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-blue-500 md:hover:text-gray-900 md:hover:underline"
                >
                  Legal Statement
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-blue-500 md:hover:text-gray-900 md:hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-blue-500 md:hover:text-gray-900 md:hover:underline"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-blue-500 md:hover:text-gray-900 md:hover:underline"
                >
                  CoinbitDex Affiliate Program
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Services */}
        <div>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2">
            {[
              'Crypto Markets',
              'Crypto News',
              'Listing Application',
              'Copy Trading',
              'AI/Grid Bots',
              'Buy Crypto',
              'Bonus & Rewards',
            ].map((service, index) => (
              <li key={index}>
                <a
                  href="/"
                  className="text-gray-400 hover:text-blue-500 md:hover:text-gray-900 md:hover:underline"
                >
                  {service}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Form side */}
        <div className="col-span-2 h-full flex-col">
          <div className="">
            <h3 className="font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <form
            //  onSubmit={handleSubmit}
            >
              <Stack>
                <TextInput
                  label="Email *"
                  placeholder=""
                  // required
                  size="md"
                  styles={(theme) => ({
                    input: {
                      backgroundColor: isMediumScreen ? 'white' : '#1f2937',
                      color: isMediumScreen ? 'black' : 'white',
                      border:
                        '1px solid ' + (isMediumScreen ? '#ccc' : '#374151'),
                      transition: 'background-color 0.3s ease',
                    },
                  })}
                />
                <Button type="submit" color="blue" c="black" w="50%">
                  Subscribe
                </Button>
              </Stack>
            </form>
          </div>

          <div className="md:flex justify-between mt-16">
            <p className="text-gray-400 mr-5">
              +1 (618) 362-2134 | Support@CoinbitDex.com
            </p>
            <p className="text-gray-400">
              +1 (618) 362-2134 | Support@CoinbitDex.com
            </p>
          </div>
          <p className="flex items-center justify-center text-gray-300 mt-5 md:mt-0">
            500 Terry Francois St, San Francisco, CA 94158
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex items-center justify-between w-full px-10 py-10">
        <img src={logo} alt="CoinbitDex" className="-ml-8 h-6 w-auto" />

        <div className="flex-1 mx-5 border-dotted border-t border-gray-900"></div>

        <p className="text-sm text-gray-500">
          &copy; 2019-2023 <span className="font-semibold">CoinBitDex.com</span>{' '}
          All Rights Reserved
        </p>
      </div>

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm border-t border-gray-700 pt-6">
        <img src={logo} alt="CoinbitDex" className="h-6 mb-4 md:mb-0" />
        <p>&copy; 2019-2023 CoinBitDex.com. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
