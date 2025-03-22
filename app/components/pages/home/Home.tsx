import React from 'react';
import UnAuthLayout from '../../../layouts/UnAuthLayout';
import { IconArrowRight } from '@tabler/icons-react';
import { Box, Button, Group, ScrollArea, TextInput } from '@mantine/core';

import {
  GiftIcon,
  HandShakeIcon,
  InternetSvg,
  ListSvg,
  OrderBookIcon,
  TradersIcon,
  VolumeSvg,
} from '~/utils/Svgs';
import Hero from '~/components/layout/Hero';
import ChartCardGrid from '~/components/layout/ChartCardGrid';
import CardGrid from '~/components/layout/CardGrid';
import PartnerCardGrid from '~/components/layout/PartnerCardGrid';

import smallTradeChart from '/images/small-trading-chart.gif';
import laptopPhone from '/images/laptop-phone.webp';
import { Link } from 'react-router';

const myStyle = {
  userSelect: 'none',
  // boxSizing: 'border-box',
  // display: 'block',
  height: 'calc(100% - 32px)',
  width: '100%',
};

const Home: React.FC = () => {
  return (
    <UnAuthLayout>
      <main className="">
        <section
          id="hero-section"
          className="min-h-[100dvh] bg-hero-bg w-full px-0 bg-no-repeat bg-cover bg-center bg-fixed flex"
        >
          <div className="mx-auto w-[90%] md:w-[85%] xl:w-[70%] max-w-[1200px] font-bold">
            <h1
              data-aos="zoom-in"
              className="text-5xl md:text-7xl font-bold mt-10 md:mt-72 mb-16 max-w-[70%]"
            >
              One Of The Leading Decentralized Exchanges
            </h1>
            <div
              data-aos="fade-right"
              className="flex justify-between w-[70%] gap-5 md:gap-3 flex-wrap"
            >
              {heroStats.map((stat) => (
                <Hero
                  key={stat.id}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            <div data-aos="fade-right" className="my-16">
              Enjoy Trading, Buying, Investing, Copy Trading, And Many More...
            </div>

            <div className="md:w-[40%] mb-20">
              <Group
                style={{
                  border: '1px solid blue',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0,
                }}
              >
                {' '}
                <TextInput
                  placeholder="Enter your email address"
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
                    type="button"
                  >
                    Register Now!
                  </Button>
                </Link>
              </Group>
            </div>
          </div>
        </section>

        <section
          id="info-section"
          className="w-full md:w-[70%] mx-auto py-5 md:py-20 border rounded-md p-1"
        >
          <div className="relative md:w-[90%] h-80 mx-auto">
            <iframe
              allowtransparency="true"
              frameborder="0"
              src="https://www.tradingview-widget.com/embed-widget/timeline/#%7B%22colorTheme%22%3A%22light%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22utm_source%22%3A%22tilapia2k19-wixsite-com.filesusr.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22timeline%22%2C%22page-uri%22%3A%22tilapia2k19-wixsite-com.filesusr.com%2Fhtml%2Fc9104a_bc9eff8ccdbb07486b1cbf51a260b1d3.html%22%7D"
              title="timeline TradingView widget"
              lang="en"
              style={myStyle}
              height={'100%'}
            ></iframe>
            <div className="cover w-[50%] h-10 bg-white absolute top-0 right-0"></div>
          </div>
        </section>

        <section
          id="captureTrading"
          className="mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px] hidden md:block mt-12"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold">
            Capture Every Trading Opportunity
          </h1>
          <div className="relative mt-4">
            <iframe
              height="600"
              width="100%"
              src="https://ssltvc.investing.com/?pair_ID=945629&amp;height=550&amp;width=1250&amp;interval=3600&amp;plotStyle=area&amp;domain_ID=72&amp;lang_ID=72&amp;timezone_ID=0"
            ></iframe>
            <div className="absolute bottom-16 left-14 bg-white flex justify-start items-center h-16 w-full">
              <Link
                to={'/signup'}
                className="rounded border border-gray-400 px-10 text-xl py-2 ml-2 hover:shadow-md hover:bg-gray-200 cursor-pointer transition-all ease-in-out duration-300"
              >
                Start Trading Now
              </Link>
            </div>
          </div>
        </section>

        <section
          id="tradingBot-section"
          className="mx-auto w-[99%] md:w-[75%] py-5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 px-10 w-full">
            <img
              src={smallTradeChart}
              className="object-cover md:w-[53%] h-auto"
              alt=""
            />
            <div className="md:w-[47%]">
              <div className="mt-[50px]">
                <h1 className="text-2xl font-bold mb-2">
                  Make Use Of Our Swift AI Trading Bots
                </h1>
                <p className="font-light text-base">
                  Leave market swings to our integrated auto-trading bots which
                  helps you buy & sell automatically 24/7 while you spend time
                  doing the things you love with the people you love.
                </p>
                <div className="py-5">
                  <Button
                    variant="default"
                    rightSection={
                      <IconArrowRight size={16} stroke={1.5} color="blue" />
                    }
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="charts-section" className="mt-2 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5 mx-auto w-[99%] md:w-[75%]">
            <div className="md:w-[45%] px-10">
              <h1 className="text-2xl font-bold my-5 text-center md:text-left">
                Join the Largest Copy Trading Community
              </h1>
              <p className="text-center md:text-left">
                Copy elite traders and auto-replicate their trades in real-time
              </p>
              <div className="flex justify-around items-center my-5">
                <div className="flex">
                  <div className="">
                    <TradersIcon />
                  </div>
                  <div className="text-sm md:text-base">
                    <h3>2000+</h3>
                    <p>Elite Teachers</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="">
                    <HandShakeIcon />
                  </div>
                  <div className="text-sm md:text-base">
                    <h3>2.5M+</h3>
                    <p>Copied Relationship</p>
                  </div>
                </div>
              </div>

              <div className="grid mt-12 md:mt-0">
                <div className="flex justify-center items-center mb-5 md:mb-10">
                  <div className="flex">
                    <div className="">
                      <OrderBookIcon />
                    </div>{' '}
                    <div className="text-sm md:text-base">
                      <h3>10M+</h3>
                      <p>Total Order Book</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start">
                  <Link to={'/copy-trading'}>
                    <Button
                      variant="default"
                      rightSection={
                        <IconArrowRight size={16} stroke={1.5} color="blue" />
                      }
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="md:w-[40%] ">
              <ChartCardGrid />
            </div>
          </div>
        </section>

        <section
          id="card-section"
          className="translate-y-[10%] sm:translate-y-0"
        >
          <div className="mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px] sm:mt-36">
            <h1 className="text-3xl font-bold p-6">
              Explore Our Extensive Product Suite
            </h1>
            <CardGrid />
          </div>
        </section>

        <section id="getStarted-section" className="flex mt-44 sm:mt-28">
          <div className="flex flex-col md:flex-row justify-between items-center mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px] text-center md:text-start">
            <div className="flex flex-col justify-between w-full md:w-[55%] h-full">
              <h2 className="text-4xl font-extrabold">
                Get Started in a Few Minutes{' '}
              </h2>
              <div className="mb-10">
                <h2 className="text-4xl font-extrabold">
                  Trade. Anytime. Anywhere.
                </h2>
                <p>
                  Innovative data encryption protocol safeguards your every
                  trade.
                </p>
              </div>
              <Link
                to="/signup"
                className="flex justify-center md:justify-start"
              >
                <Button
                  variant="default"
                  className="mb-20 w-[50%] self-start"
                  rightSection={
                    <IconArrowRight size={16} stroke={1.5} color="blue" />
                  }
                >
                  Register Now!
                </Button>
              </Link>
            </div>
            <div className="md:mt-20">
              {' '}
              <img src={laptopPhone} alt="" className="w-[90%]" />
            </div>
          </div>
        </section>

        <section
          id="partners-section"
          className="mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px]"
        >
          <PartnerCardGrid />
        </section>
      </main>
    </UnAuthLayout>
  );
};

export default Home;

const heroStats = [
  { id: 1, icon: <InternetSvg />, value: '1M+', label: 'Global Users' },
  { id: 2, icon: <VolumeSvg />, value: '$4.6B+', label: '24h Volume' },
  { id: 3, icon: <ListSvg />, value: '220+', label: 'Listed Cryptocurrencies' },
];

const dummyData = [
  {
    id: 1,
    title:
      'BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs',
    path: '/',
    time: '',
    icon: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
    img: 'https://s3.tradingview.com/timeline/btcusd_133234877.jpg',
  },
  {
    id: 2,
    title:
      'BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs',
    path: '/',
    time: '',
    icon: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
    img: 'https://s3.tradingview.com/timeline/btcusd_133234877.jpg',
  },
  {
    id: 3,
    title:
      'BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs',
    path: '/',
    time: '',
    icon: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
    img: 'https://s3.tradingview.com/timeline/btcusd_133234877.jpg',
  },
  {
    id: 4,
    title:
      'BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs',
    path: '/',
    time: '',
    icon: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
    img: 'https://s3.tradingview.com/timeline/btcusd_133234877.jpg',
  },
  {
    id: 5,
    title:
      'BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs',
    path: '/',
    time: '',
    icon: 'https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg',
    img: 'https://s3.tradingview.com/timeline/btcusd_133234877.jpg',
  },
];
