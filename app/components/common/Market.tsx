import { useEffect, useState } from 'react';

interface MarketData {
  symbol: string;
  lastPrice: string;
  priceChangePercent: string;
}

interface Key {
  [key: string]: string;
  usd: string;
  usd_24h_change: string;
}

const Market: React.FC = () => {
  const [data, setData] = useState<
    { symbol: string; price: string; change: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,xrp,cardano,dogecoin,polkadot,polygon,shiba-inu,litecoin,chainlink,avalanche,uniswap,tron,cosmos,stellar,internet-computer,monero,bitcoin-cash,filecoin,the-graph,vechain&vs_currencies=usd&include_24hr_change=true'
        );
        console.log({ response });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result: { [key: string]: Key } = await response.json();
        console.log('API Response:', result);

        const array = Object.keys(result).map((key: string) => {
          return {
            symbol: key,
            price: result[key].usd,
            change: result[key].usd_24h_change,
          };
        });

        setData(array);
      } catch (err) {
        if (err instanceof Error) {
          console.error('Error fetching market data:', err.message);
          setError(err.message);
        } else {
          console.error('Unexpected error:', err);
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className="py-10 text-sm">
      <h2 className="text font-bold">Perp Futures</h2>

      {loading && <p>Loading market data...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <table className="w-full mt-2 border-collapse">
          <tbody>
            {data.map((coin) => (
              <tr key={coin.symbol} className="border-b">
                <td className="p-2 capitalize">{coin.symbol}</td>
                <td className="p-2">
                  <p>${coin.price.toLocaleString()}</p>
                  <p className="text-[10px] text-gray-500">
                    ₦{(parseFloat(coin.price) * 1200).toLocaleString()}
                  </p>
                </td>
                <td className="">
                  <span
                    className={`p-1  text-white rounded ${
                      parseFloat(coin.change) >= 0
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {parseFloat(coin.change).toFixed(2)}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Market;
