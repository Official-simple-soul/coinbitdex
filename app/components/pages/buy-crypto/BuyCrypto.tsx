import UnAuthLayout from '~/layouts/UnAuthLayout';
import paymentData from './data';
import { Link } from 'react-router';

function BuyCrypto() {
  return (
    <UnAuthLayout>
      <div className="px-5 md:px-0 py-5 md:py-14 md:w-[70%] mx-auto">
        <div className="flex flex-col-reverse md:flex-row  md:p-10">
          <div className="left w-full md:w-2/3 space-y-20">
            <div className="left-top space-y-14">
              <div className="space-y-6 text-center">
                <h1 className="font-bold md:font-extrabold mt-8 text-3xl md:text-3xl">
                  Buy Crypto On-Ramp
                </h1>
                <p className="my-4 text-xl md:max-w-[80%]">
                  Purchase Crypto with Credit/Debit Cards, Bank Transfers, Apple
                  pay, and Google Pay into your CoinbitDex Wallet
                </p>
              </div>
              <div className="flex justify-center md:justify-start">
                <Link
                  to="/signup"
                  className="border border-blue-400 rounded text-blue-400 text-center py-2 px-20"
                >
                  Sign Up
                </Link>
              </div>
            </div>
            <div className="space-y-6 text-center">
              <h1 className="font-bold md:font-extrabold mt-8 text-3xl md:text-3xl">
                Buy Crypto Off-Ramp
              </h1>
              <p className="my-4 text-xl md:max-w-[80%]">
                Purchase Crypto with Credit/Debit Cards, Bank Transfers, Apple
                pay, and Google Pay to any Wallet Address.
              </p>
            </div>
          </div>
          <div className="h-[17rem] w-full md:h-auto md:w-1/3 relative flex items-center justify-center">
            <div className="h-full w-full">
              <iframe
                src="https://widget.coinlib.io/widget?type=converter&amp;theme=light"
                width="100%"
                height="100%"
                marginwidth="0"
                marginheight="0"
                frameborder="0"
                border="0"
                style={{
                  border: 'none',
                  margin: 0,
                  padding: 0,
                }}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-center md:text-start md:ml-12 font-bold mb-6 text-2xl">
            Please select any service provider below and you will be redirected.
          </h3>
          <div className="grid md:grid-cols-2 gap-2">
            {paymentData.map((item, index) => (
              <a href={item.link} key={index}>
                <img src={item.logo} alt="" className="object-center" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </UnAuthLayout>
  );
}

export default BuyCrypto;
