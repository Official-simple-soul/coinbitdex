import UnAuthLayout from '~/layouts/UnAuthLayout';
import { Link, Element } from 'react-scroll';

function AI() {
  return (
    <UnAuthLayout>
      <div className="px-5 md:px-0 md:w-[70%] mx-auto">
        <div className="grid md:grid-cols-3 gap-4 py-20">
          <div className="left md:col-span-2 space-y-3 md:space-y-5">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              AI Trading Bots
            </h1>
            <p className="text-gray-600 text-xl md:text-3xl">
              Capture Profitable Opportunities 24/7 Automatically
            </p>
            <div className="md:pt-10">
              <Link
                to="guide"
                smooth={true}
                duration={500}
                className="text-blue-600 underline cursor-pointer"
              >
                Trading Bot Guide
              </Link>
            </div>
          </div>
          <div className="right">
            <img src="/images/ai.webp" alt="" />
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <img src="/images/ai-gif.gif" alt="" />
          <img src="/images/spot-pro.png" alt="" />
        </div>
        <div className="grid md:grid-cols-4 justify-center gap-4 my-20">
          <img
            src="/images/btc.png"
            alt=""
            className="hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
          />
          <img
            src="/images/eth.png"
            alt=""
            className="hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
          />
          <img
            src="/images/sol.png"
            alt=""
            className="hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
          />
          <img
            src="/images/ach.png"
            alt=""
            className="hover:scale-110 transition-all ease-in-out duration-300 cursor-pointer"
          />
        </div>
        <Element name="guide">
          <div id="guide" className="font-sans text-gray-800 p-5 text-justify">
            <h1 className="text-3xl text-left font-bold mb-6 text-gray-900">
              AI Trading Bot Guide
            </h1>

            <div className="space-y-6">
              <div className="">
                <h2 className="text-xl text-left font-semibold mb-3">
                  1. What Is AI Trading Bot? And How Does it Work?
                </h2>
                <p className="mb-4">
                  The AI Trading Bot is a sophisticated trading program that
                  enables users to automatically execute trades based on a
                  pre-determined price range in the cryptocurrency market. In
                  the dynamic and volatile environment of cryptocurrency
                  trading, this technique helps to minimize the impact of human
                  error on trading decisions. The Grid Trading Bot ensures
                  strict adherence to a strategy, providing a reliable and
                  efficient solution for managing trades in the cryptocurrency
                  market.
                </p>

                <p className="mb-4">
                  After depositing the price range, the fund will be divided
                  into equal shares and will operate automatically according to
                  the set grid parameters. When the price falls, it will buy
                  shares, and when the price rises, it will sell shares. An
                  advanced Futures pro Bot has been launched too for Buy/Longs
                  and Short/Sells. Each buying and selling of a grid will
                  generate a price difference and continuously accumulate
                  profits in a volatile market.
                </p>

                <p className="mb-4">
                  At the same time, your risk has also been reduced because your
                  investment has been divided into hundreds of tiny positions.
                  As long as the market fluctuates, you will continue to make
                  profits.
                </p>

                <p className="mb-4">
                  As an illustration, consider the BTC/USDT trading pair with an
                  upper price of 150,000 USDT and a lower price of 15,000 USDT.
                  The AI Trading Bot will initiate trades by purchasing a
                  specified percentage of the asset at the current market price
                  and placing sell orders above it. At the same time, the Grid
                  Trading Bot will allocate a portion of USDT to place buy
                  orders below the current price. The bot will continually
                  execute “buy low and sell high” trades within the designated
                  price range, resulting in the buildup of frequent grid
                  profits.
                </p>

                <p className="mb-4">
                  In the event that the market price rises above 150,000 USDT or
                  drops below 15,000 USDT, the AI Trading bot strategy will be
                  temporarily suspended, And the Pro AI Trading Bot will be
                  activated to take Buy/Long and Short/Sell orders by this
                  accumulating greater profits. Once the price returns within
                  the specified price range, the AI Trading strategy will resume
                  its operations.
                </p>
              </div>

              <div>
                <h2 className="text-xl text-left font-semibold mb-3">
                  2. Why Should I Try Trading Bots in the Crypto Market?
                </h2>
                <p className="mb-4">
                  Crypto is a market that never closes and undergoes constant
                  and significant fluctuations. Grid trading is a tool that
                  perfectly adapts to the unique characteristics of the crypto
                  market:
                </p>
                <ol className="list-decimal list-inside space-y-2">
                  <li>
                    Keeps running 24/7, eliminating the trouble of constantly
                    monitoring the market.
                  </li>
                  <li>
                    As long as the market fluctuates up or down, there will be
                    profits.
                  </li>
                  <li>
                    Crypto investors should consider using the AI Trading Bot to
                    mitigate the risk of missing market opportunities and
                    inaccurately timing stop loss or take profit decisions. This
                    new trading strategy enables the program to execute trades
                    from the comfort of your home within a pre-determined price
                    range automatically. Not only does this help crypto
                    investors to overcome market volatility, but it also
                    provides a steady source of profits.
                  </li>
                </ol>
              </div>

              <div>
                <h2 className="text-xl text-left font-semibold mb-3">
                  3. Is There Any Possibility of Losing Money in Grid Trading?
                </h2>
                <p className="mb-4">
                  Grid trading is one of the most classic trading strategies. A
                  large number of users have made profits through grid trading.
                  Grid trading will ensure that grid profits are earned.
                  However, in the case of the market trending unilaterally, your
                  cost of held positions may be higher than the current price,
                  which may cause unrealized losses. Therefore, starting with a
                  high margin capital is recommended. By this you ensure a low
                  risk of getting liquidated or being alarmed for maintenance
                  margin within the range of volatility so as to arbitrage
                  continuously.
                </p>
              </div>
            </div>
          </div>
        </Element>
      </div>
    </UnAuthLayout>
  );
}

export default AI;
