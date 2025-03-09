import React from "react";
import {
  Anchor,
  Box,
  Container,
  Flex,
  Group,
  Image,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "react-router";
import UnAuthLayout from "~/layouts/UnAuthLayout";

import banner from "/images/banner.avif";
import vahid from "/images/vahid-btc.png";
import pump from "/images/pump-btc.png";
import china from "/images/china-btc.png";
import moneyman from "/images/moneyman-btc.png";
import lemonbridge from "/images/lemonbridge-btc.png";
import tumtum from "/images/tumtum-btc.png";
import smitsergei from "/images/smitsergei-btc.png";
import fundmanager from "/images/fundmanager-btc.png";

const traders1 = [
  {
    image: vahid,
  },
  {
    image: pump,
  },
  {
    image: china,
  },
  {
    image: moneyman,
  },
];

const traders2 = [
  {
    image: lemonbridge,
  },
  {
    image: tumtum,
  },
  {
    image: smitsergei,
  },
  {
    image: fundmanager,
  },
];

const CopyTrading = () => {
  console.log(vahid, banner);
  return (
    <UnAuthLayout>
      <Container className="" size="xl" sx={{ maxWidth: "1400px" }}>
        <Box className="md:flex items-center justify-between mt-6">
          <div className="">
            <Title size={38} className="">
              Copy Global Elite Traders
            </Title>
            <Text size="xl">
              Established{" "}
              <Anchor href="#" color="blue">
                2,578,536
              </Anchor>{" "}
              Copy Relationship
            </Text>
            <Group mt={10} className="py-12">
              <Anchor href="#" size="xs" className="underline">
                Copy Trading Guide
              </Anchor>
              <Space w="lg" />
              <Anchor href="#" size="xs" className="underline">
                FAQ
              </Anchor>
            </Group>
          </div>
          <Image
            src={banner}
            alt="Recruiting Elite Traders"
            mt={20}
            w={450}
            radius="md"
          />
        </Box>

        <Box className="">
          <Title order={3} mt={40}>
            Trending Traders
          </Title>
          <Text size="sm">Trending traders in the last 30 days</Text>
        </Box>

        {/* Start Here for the first one */}
        <Flex justify="space-between" wrap="wrap" gap="xl" mb={50}>
          {traders1.map((trader, index) => (
            <div key={index} className="py-4 min-h-[350px]">
              <Image src={trader.image} width={40} height={40} radius="lg" />
            </div>
          ))}
        </Flex>

        <Title order={3} mt={30}>
          Top Exquisite Traders
        </Title>
        <Text size="sm" color="gray">
          Low to no losses, Mostly Swing & Position Trades
        </Text>

        {/* Start Here for the second one */}
        <Flex justify="space-between" wrap="wrap" gap="xl">
          {traders2.map((trader, index) => (
            <div key={index} className="py-4 min-h-[350px]">
              <Image src={trader.image} width={40} height={40} radius="lg" />
            </div>
          ))}
        </Flex>

        <div className="mt-20">
          <Title className="text-3xl font-bold mb-6">Copy Trading Guide</Title>

          <div className="mb-5">
            <Title className="text-xl font-semibold mb-2">
              1. What is Copy/Mirror Trading?
            </Title>
            <Text size="sm" className="mb-2">
              Copy Trading allows users to copy the trades of elite traders,
              automatically aligning with their trading activities to generate
              profits. It saves users from manually opening/closing positions.
            </Text>
            <Text size="sm" className="mb-4">
              This is ideal for beginners learning how to trade while benefiting
              from automated trading.
            </Text>
          </div>

          <div className="mb-5">
            <Title order={5} className="text-xl font-semibold mb-2">
              2. Advantages of Copy/Mirror Trading
            </Title>
            <Text size="sm">
              There are many advantages to copy trading, here we cover just a
              few:
            </Text>
            <Text size="sm">
              <span className="font-semibold mr-2">2.1</span> First time traders
              can familiarise themselves with the financial markets and gain the
              confidence to trade{" "}
            </Text>
            <Text size="sm">
              <span className="font-semibold mr-2">2.2</span> New traders can
              learn how to trade by watching the actions of other more
              experienced traders
            </Text>
            <Text size="sm">
              <span className="font-semibold mr-2">2.3</span> Traders can
              participate in the market, even when they are too busy, and not
              able to invest the time and research they should normally devote
              to trading.{" "}
            </Text>
          </div>

          <div className="mb-5">
            <Title order={5} className="text-xl font-semibold mb-2">
              3. Why is Copy/Mirror Trading become so popular Popular
            </Title>
            <Text size="sm">
              Copy investing, or mirror trading has become very popular with
              investors worldwide, mainly because many early adopters have had
              enormous success and were able to boost their trading skills and
              profitability with zero effort. Copy trading enables novice
              investors to do just that. They don’t need to know how to analyse
              the markets or how to interpret trading signals or indicators.
            </Text>
            <Text size="sm">
              Novices are using other investors’ abilities and thus increasing
              their own success rates. Also, copy trading can be used by
              experienced traders too, as a way of learning new trading
              strategies from others, and by that, increasing their success in
              the online trading market.
            </Text>
            <Text size="sm">
              If you would like to start investing in the market but do not have
              a lot of experience, or you are a seasoned pro who would like to
              gain insight into the analysis of others, using copy
              investing/mirror trading is an excellent place for you to begin.
            </Text>
          </div>

          <Title order={5} className="text-xl font-semibold mb-2">
            4. How Copy/Mirror Trading is parsed{" "}
          </Title>
          <div className="mb-3">
            <Text size="sm">
              <span className="text-lg font-semibold">
                4.1 Copy By Position:-{" "}
              </span>
              "Copy by position" is a one-of-its-kind feature globally that is
              pioneered and recommended by Coinbitdex to safeguard copiers'
              interests in the best possible way. The fund that users invest in
              "copy by position" will only adjust with the position of the share
              trading account they copy. By copying the trading signals and the
              trader's real position ratio, copiers can achieve an ROI
              approximate to that of the share trading account. "Copy by
              position" does not allow copiers to perform autonomous trading.
            </Text>
            <Text size="sm">
              E.g., if the share trading account has a net asset of 1,000 USDT
              and uses 30% of the fund, i.e., 300 USDT, with a leverage of 5X to
              buy long BTC/USDT, the copiers will also use 30% of their fund
              (suppose 100 USDT), that is, 30 USDT 5X to buy long BTC/USDT.
            </Text>
          </div>

          <Text size="sm">
            <span className="text-lg font-semibold">
              4.2 Copy By Fixed Margin:-{" "}
            </span>
            "Copy by fixed margin" is limited to copying the trader’s Standard
            Futures account and only copies the signals of trades opened in the
            isolated margin mode. This type allows copiers to perform autonomous
            trading.
          </Text>
          <Text size="sm">
            E.g., if the copier sets 10 USDT as the margin for a single copy
            trading and the trader buys long BTC/USDT, the system will buy long
            BTC/USDT for the copier with a 10 USDT margin regardless of the
            margin/position ratio of the trader. And the trade will be displayed
            in the Position of the copier’s Standard account.
          </Text>
        </div>

        <div className="text-center my-6">
          <Link to={"#"} className="underline">
            <span className="">{">>>"}</span>
            <span className="text-blue-500">
              Start Copy Trading on CoinbitDex!
            </span>
            <span className="">{"<<<"}</span>
          </Link>
        </div>

        <div className="">
          <Title order={2} className="text-2xl font-bold mt-8 mb-4">
            FAQ
          </Title>
          <div className="mb-3">
            <Title order={5} className="text-xl font-semibold mb-2">
              In what cases do copiers fail to copy trades?
            </Title>
            <Text size="sm">
              Copying trades using multiple accounts will be restricted, thus
              requiring the cancellation of other accounts and the completion of
              KYC verification to continue; Traders only allow invited copiers
              to copy their trades; Traders are not able to copy other traders.
            </Text>
          </div>

          <div className="mb-3">
            <Title order={5} className="text-xl font-semibold mb-2">
              Why the trades are not copied when the copy trading is all set up?
            </Title>
            <Text size="sm">
              After the Copy is completed, no new trade has been generated
              because the trader has not opened any positions or the copy
              trading has failed. Common reasons why copy trading in CoinbitDex
              CopyTrade fails include: Copiers don't have sufficient balance in
              their Standard Account; Trades are opened in cross-margin mode;
              Copiers' holding position margin has reached the daily max; Daily
              copy trading margin volume has reached its limits.
            </Text>
          </div>

          <div className="mb-3">
            <Title order={5} className="text-xl font-semibold mb-2">
              What is the share ratio/percentage and the settlement time?
            </Title>
            <Text size="sm">
              For CopyTrade (CoinbitDex), 15%-30% of the net profit generated
              will given to the expert traders while 85%-70% will be given to
              the copiers, it will be calculated on a weekly basis at 00:00 (CT)
              every week. There may be a delay of 10~30 minutes for the system
              to process the settlement. Please be patient.
            </Text>
          </div>
        </div>

        <div className="text-center my-6">
          <Link to={"#"} className="underline">
            <span className="">{">>>"}</span>
            <span className="text-blue-500">
              Start Copy Trading on CoinbitDex!
            </span>
            <span className="">{"<<<"}</span>
          </Link>
        </div>
      </Container>
    </UnAuthLayout>
  );
};

export default CopyTrading;
