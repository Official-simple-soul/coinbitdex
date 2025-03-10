import UnAuthLayout from '~/layouts/UnAuthLayout';
import paymentData from './data';
import { Link } from 'react-router';

function BuyCrypto() {
  return (
    <UnAuthLayout>
      <div className="px-5 md:px-0 py-5 md:py-14 md:w-[70%] mx-auto">
        <div className="flex flex-col-reverse md:flex-row p-4 md:p-10">
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
          <div className="h-[45vh] md:h-auto md:w-1/3 relative flex items-center justify-center">
            <div className="h-[90%] bg-slate-800 absolute -right-8 md:static md:w-[58%]">
              <iframe
                src="https://tilapia2k19-wixsite-com.filesusr.com/html/c9104a_eb9f1c5c2877446f790e1cee698ba5c7.html"
                width="100%"
                height="100%"
              ></iframe>
              <div className="absolute bg-[#56667F] w-[200px] right-16 h-4 bottom-2.5 md:hidden"></div>
            </div>
          </div>
        </div>
        <div className="">
          <h3 className="text-center md:text-start md:ml-12 font-bold my-6 text-2xl">
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
