import React from "react";
import { Button, Stack, TextInput } from "@mantine/core";
import logo from "/images/logo.avif";

const Footer = () => {
  return (
    <footer className="py-12 px-6 md:px-24">
      <div className="container grid grid-cols-4 gap-8">
        {/* Column 1: Terms */}
        <div className="flex flex-col justify-between">
        {/* <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"> */}
          <div className="">
            <h3 className="font-semibold mb-4">Terms</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-gray-900 hover:underline"
                >
                  Privacy & Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-gray-900 hover:underline"
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
                  className="text-gray-400 hover:text-gray-900 hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-gray-900 hover:underline"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-gray-900 hover:underline"
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
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-900 hover:underline"
              >
                Crypto Markets
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-900 hover:underline"
              >
                Crypto News
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-900 hover:underline"
              >
                Listing Application
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-900 hover:underline"
              >
                Copy/Mirror Trading
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-900 hover:underline"
              >
                AI/Grid Trading Bots
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-900 hover:underline"
              >
                Buy Crypto
              </a>
            </li>
            <li>
              <a
                href="/"
                className="text-gray-400 hover:text-gray-900 hover:underline"
              >
                Bonus & Rewards
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Form side */}
        <div className="col-span-2 h-full flex-col">
          <div className="">
            <h3 className="font-semibold mb-4">Subscribe to Our Newsletter</h3>
            {/* <form>
              <input
                type="email"
                placeholder="Email*"
                className="w-full px-4 py-2 mb-4 text-black rounded-md"
              />
              <button
                type="submit"
                className="bg-blue-600 w-full px-4 py-2 text-white rounded-md"
              >
                Submit
              </button>
            </form> */}
            <form
            //  onSubmit={handleSubmit}
            >
              <Stack>
                <TextInput
                  label="Email *"
                  placeholder=""
                  // required
                  size="md"
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  styles={{
                    input: { backgroundColor: "#3366FF", color: "white" }, // Blue input field
                  }}
                />
                <Button type="submit" color="blue" c="black" w="50%">
                  Submit
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
          <p className="flex items-center justify-center">
            500 Terry Francois St, San Francisco, CA 94158
          </p>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex items-center justify-between w-full px-10 py-10">
        {/* <div className="flex items-center w-auto shrink-0"> */}
        <img src={logo} alt="CoinbitDex" className="-ml-8 h-6 w-auto" />
        {/* </div> */}

        {/* <div className="border-dotted border-t border-gray-700 mt-8 pt-4 text-center text-sm w-[70%]"></div> */}
        <div className="flex-1 mx-5 border-dotted border-t border-gray-900"></div>

        <p className="text-sm text-gray-500">
          &copy; 2019-2023 <span className="font-semibold">CoinBitDex.com</span>{" "}
          All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;


// NA
// HERE
// E START



