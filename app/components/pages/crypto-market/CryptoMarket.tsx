import CryptoTable from '~/components/common/CryptoTable';
import UnAuthLayout from '~/layouts/UnAuthLayout';

function CryptoMarket() {
  return (
    <UnAuthLayout>
      <div className="container px-5 md:px-0 md:w-[80%] mx-auto">
        <div className="md:w-1/2 flex justify-center md:justify-end mb-4">
          <h1 className="font-bold md:font-extrabold mt-8 text-xl md:text-3xl">
            All Cryptocurrency Market List
          </h1>
        </div>

        <div className="h-64">
          <iframe
            sandbox="allow-same-origin allow-forms allow-popups allow-modals allow-scripts allow-pointer-lock"
            className="wuksD5"
            title="Embedded Content"
            name="htmlComp-iframe"
            width="100%"
            height="100%"
            allow="fullscreen"
            data-src=""
            src="https://tilapia2k19-wixsite-com.filesusr.com/html/c9104a_ad2a1359d70f0851d18ce759d128ef20.html"
          ></iframe>
        </div>

        <>
          <div className="md:w-1/2 flex justify-center md:justify-end mb-4">
            <h1 className="font-bold md:font-extrabold mt-8 text-xl md:text-3xl">
              All Cryptocurrency Market List
            </h1>
          </div>
          <CryptoTable />
        </>
      </div>
    </UnAuthLayout>
  );
}

export default CryptoMarket;
