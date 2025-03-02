import {
  BuyCrypto,
  CircleRightArrow,
  Derivatives,
  GridBotTrading,
  MirrorTrading,
} from "~/utils/Svgs";
import Card from "./Card";

const profiles = [
  {
    id: 1,
    title: "Grid/Bot Trading",
    image: <GridBotTrading />,
    description:
      "Supports the best AI trading bots which helps with the process of buying and selling assets in an automated manner. The phenomenon is based on the art of artificial intelligence with the underlying algo trading via pre-programmed conditions.",
    icon: <CircleRightArrow />,
  },
  {
    id: 2,
    title: "Derivatives",
    image: <Derivatives />,
    description:
      "Supports long/short positions with leverage and profit of up to 150x from the market volatility.",
    icon: <CircleRightArrow />,
  },
  {
    id: 3,
    title: "Copy/Mirror Trading",
    image: <MirrorTrading />,
    description:
      "Supports great experienced traders to copy from, simply automate your trading by copying the trades of top traders. This is often used by Newbies, Investors, and Passive Incomers that might not yet know how to trade or are too busy to trade.",
    icon: <CircleRightArrow />,
  },
  {
    id: 4,
    title: "Buy Crypto",
    image: <BuyCrypto />,
    description:
      "Supports over 80% of fiat currencies worldwide. Swiftly Purchase crypto off-ramp and on-ramp and receive them instantly.",
    icon: <CircleRightArrow />,
  },
];

const CardGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-3">
      {profiles.map((profile, index) => (
        <Card key={index} profile={profile} />
      ))}
    </div>
  );
};

export default CardGrid;
