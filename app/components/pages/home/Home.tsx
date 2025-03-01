import React, { useState } from "react";
import UnAuthLayout from "../../../layouts/UnAuthLayout";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import {
  Button,
  Center,
  Flex,
  Group,
  Input,
  ScrollArea,
  TextInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";

import {
  GiftIcon,
  HandShakeIcon,
  InternetSvg,
  ListSvg,
  OrderBookIcon,
  TradersIcon,
  VolumeSvg,
} from "~/utils/Svgs";
import Hero from "~/components/layout/Hero";
import News from "~/components/layout/News";
import ChartCardGrid from "~/components/layout/ChartCardGrid";
import CardGrid from "~/components/layout/CardGrid";
import PartnerCardGrid from "~/components/layout/PartnerCardGrid";
import Footer from "~/components/layout/Footer";

// images import
import whiteTradeChart from "/images/white-trading-chart.png";
import smallTradeChart from "/images/small-trading-chart.gif";
import laptopPhone from "/images/laptop-phone.webp";
import giftBox from "/images/gift-box.gif";
import sparkle from "/images/sparkle.gif";

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <UnAuthLayout>
      <main className="">
        <section
          id="hero-section"
          className="min-h-[100dvh] bg-hero-bg w-full px-0 bg-no-repeat bg-cover bg-center bg-fixed flex"
        >
          <div className="mx-auto w-[90%] md:w-[85%] xl:w-[70%] max-w-[1200px] font-bold">
            <h1 className="text-5xl md:text-7xl font-bold mt-72 mb-16 max-w-[70%]">
              One Of The Leading Decentralized Exchanges
            </h1>
            <div className="flex justify-between w-[70%] gap-5 md:gap-3 flex-wrap">
              {heroStats.map((stat) => (
                <Hero
                  key={stat.id}
                  icon={stat.icon}
                  value={stat.value}
                  label={stat.label}
                />
              ))}
            </div>

            <div className="my-16">
              Enjoy Trading, Buying, Investing, Copy Trading, And Many More...
            </div>

            <div className="md:w-[60%] mb-20">
              <p className="flex items-end text-[10px] text-green-400 -mb-0.5 ml-1">
                <span className="mr-0.5">
                  <GiftIcon />
                </span>
                Register now and stand a chance to Claim Bonus of{" "}
                <span className="text-red-400">9125 USDT</span>
              </p>
              <Group
                style={{
                  border: "1px solid blue",
                  borderRadius: "8px",
                  overflow: "hidden",
                  display: "flex",
                  // flex: 1,
                  alignItems: "center",
                  width: "90%",
                  // maxWidth: "500px",
                  // minWidth: "300px",
                  gap: 0,
                }}
              >
                {" "}
                <TextInput
                  placeholder="Please enter your email address"
                  style={{
                    flex: 1,
                    border: "none",
                    // height: "45px",
                  }}
                  radius={0}
                  styles={{
                    input: { border: "none", borderRadius: 0 },
                  }}
                />{" "}
                <Button
                  style={{
                    height: "45px",
                    borderTopLeftRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                  color="blue"
                >
                  Register Now!
                </Button>
              </Group>
            </div>
          </div>
        </section>

        <section
          id="info-section"
          className="w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px] mx-auto px-20 py-2 my-10 border rounded-lg h-60 overflow-hidden"
        >
          <ScrollArea w="100%" h={200} scrollbars="y">
            {" "}
            {dummyData.map((data) => {
              const { id, title, path, time, img, icon } = data;
              return (
                <News
                  key={id}
                  icon={icon}
                  title={title}
                  img={img}
                  path={path}
                  time={time}
                />
              );
            })}
          </ScrollArea>
        </section>

        <section
          id="captureTrading"
          className="mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px]"
        >
          <h1 className="text-2xl md:text-4xl font-extrabold">
            Capture Every Trading Opportunity
          </h1>
          <img src={whiteTradeChart} alt="" />
        </section>

        <section
          id="tradingBot-section"
          className="mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px] py-5"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-5 px-10 w-full">
            <img
              src={smallTradeChart}
              className="object-cover md:w-[53%] h-auto"
              alt=""
            />

            {/* <div className="w-1/2 min-h-[350px]">
              <img
                src={smallTradeChart}
                className="w-full h-full object-cover"
                alt="Trade Chart"
              />
            </div> */}

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
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-5 mx-auto w-full md:w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px]">
            <div className="md:w-[45%] px-10">
              <h1 className="text-2xl font-bold my-5">
                Join the Largest Copy Trading Community
              </h1>
              <p className="">
                Copy elite traders and auto-replicate their trades in real-time
              </p>
              <div className="flex justify-around items-center my-5">
                <div className="flex">
                  <div className="">
                    <TradersIcon />
                  </div>
                  <div className="">
                    <h3>2000+</h3>
                    <p>Elite Teachers</p>
                  </div>
                </div>
                <div className="flex">
                  <div className="">
                    <HandShakeIcon />
                  </div>
                  <div className="">
                    <h3>2.5M+</h3>
                    <p>Copied Relationship</p>
                  </div>
                </div>
              </div>

              <div className="grid">
                <div className="flex justify-center items-center mb-5 md:mb-10">
                  <div className="flex">
                    <div className="">
                      <OrderBookIcon />
                    </div>{" "}
                    <div className="">
                      <h3>10M+</h3>
                      <p>Total Order Book</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center md:justify-start">
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

            <div className="md:w-[40%] ">
              <ChartCardGrid />
            </div>
          </div>
          {/* <iframe
            src="https://ssltvc.investing.com/?pair_ID=945629&height=550&width=1250&interval=3600&plotStyle=area&domain_ID=72&lang_ID=72&timezone_ID=0"
            width="100%"
            height="550"
            // frameborder="0"
            // allowfullscreen
            // style="border: 1px solid #ddd;"
          ></iframe> */}
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
                Get Started in a Few Minutes{" "}
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
              <div className="flex justify-center md:justify-start">
                <Button
                  variant="default"
                  className="mb-20 w-[50%] self-start"
                  rightSection={
                    <IconArrowRight size={16} stroke={1.5} color="blue" />
                  }
                >
                  Register Now!
                </Button>
              </div>
            </div>
            <div className="md:mt-20">
              {" "}
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

        <section id="giftBox-section" className="px-6 py-12 bg-white">
          <div className="flex flex-col sm:flex-row mx-auto w-[90%] lg:w-[85%] xl:w-[65%] max-w-[1200px]">
            <div className="sm:w-[55%]">
              <h1 className="text-3xl font-bold mb-4">
                Register to Claim Bonuses of up to 9125 USDT.
              </h1>
              <p className="text-gray-600 mb-6">It only takes a few minutes.</p>
              <div className="flex items-center">
                {/* <input
                  type="email"
                  placeholder="Please enter your email address"
                  className="border border-gray-300 px-4 py-2 w-full md:w-2/3 rounded-md"
                /> */}
                {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                  Register Now!
                </button>
                 */}
                <Group
                  style={{
                    border: "1px solid blue",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    // flex: 1,
                    alignItems: "center",
                    width: "90%",
                    // maxWidth: "500px",
                    // minWidth: "300px",
                    gap: 0,
                  }}
                >
                  {" "}
                  <TextInput
                    placeholder="Please enter your email address"
                    style={{
                      flex: 1,
                      border: "none",
                      // height: "45px",
                    }}
                    radius={0}
                    styles={{
                      input: { border: "none", borderRadius: 0 },
                    }}
                  />{" "}
                  <Button
                    style={{
                      height: "45px",
                      borderTopLeftRadius: 8,
                      borderBottomLeftRadius: 8,
                    }}
                    color="blue"
                  >
                    Register Now!
                  </Button>
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
      </main>

      <main className="items-center justify-between px-20">
        {/* <section className="hero-section w-[90%] lg:w-[85%] xl:w-[65%] font-bold">
          <h1 className="text-7xl font-bold mt-72 mb-16">
            One Of The Leading Decentralized Exchanges
          </h1>
          <div className="flex justify-between w-[70%]">
            {heroStats.map((stat) => (
              <Hero
                key={stat.id}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>

          <div className="my-16">
            Enjoy Trading, Buying, Investing, Copy Trading, And Many More...
          </div>

          <div className="w-[60%] mb-20">

            <Group
              style={{
                border: "1px solid blue",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                // flex: 1,
                alignItems: "center",
                width: "90%",
                // maxWidth: "500px",
                // minWidth: "300px",
                gap: 0,
              }}
            >
              {" "}
              <TextInput
                placeholder="Please enter your email address"
                style={{
                  flex: 1,
                  border: "none",
                  // height: "45px",
                }}
                radius={0}
                styles={{
                  input: { border: "none", borderRadius: 0 },
                }}
              />{" "}
              <Button
                style={{
                  height: "45px",
                  borderTopLeftRadius: 8,
                  borderBottomLeftRadius: 8,
                }}
                color="blue"
              >
                Register Now!
              </Button>
            </Group>
          </div>
        </section> */}
      </main>
    </UnAuthLayout>
  );
};

export default Home;

const heroStats = [
  { id: 1, icon: <InternetSvg />, value: "1M+", label: "Global Users" },
  { id: 2, icon: <VolumeSvg />, value: "$4.6B+", label: "24h Volume" },
  { id: 3, icon: <ListSvg />, value: "220+", label: "Listed Cryptocurrencies" },
];

const dummyData = [
  {
    id: 1,
    title:
      "BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs",
    path: "/",
    time: "",
    icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
    img: "https://s3.tradingview.com/timeline/btcusd_133234877.jpg",
  },
  {
    id: 2,
    title:
      "BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs",
    path: "/",
    time: "",
    icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
    img: "https://s3.tradingview.com/timeline/btcusd_133234877.jpg",
  },
  {
    id: 3,
    title:
      "BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs",
    path: "/",
    time: "",
    icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
    img: "https://s3.tradingview.com/timeline/btcusd_133234877.jpg",
  },
  {
    id: 4,
    title:
      "BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs",
    path: "/",
    time: "",
    icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
    img: "https://s3.tradingview.com/timeline/btcusd_133234877.jpg",
  },
  {
    id: 5,
    title:
      "BTC/USD: Bitcoin Price Slips Toward $100K After Trump Vows to Slap Tariffs",
    path: "/",
    time: "",
    icon: "https://s3-symbol-logo.tradingview.com/crypto/XTVCBTC.svg",
    img: "https://s3.tradingview.com/timeline/btcusd_133234877.jpg",
  },
];
