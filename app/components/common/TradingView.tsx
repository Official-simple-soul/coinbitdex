const TradingViewChart = () => {
  return (
    <div className="h-screen">
      <iframe
        title="advanced chart TradingView widget"
        lang="en"
        id="tradingview_e6fba"
        frameborder="0"
        allowtransparency="true"
        scrolling="no"
        allowfullscreen="true"
        src="https://s.tradingview.com/widgetembed/?hideideas=1&amp;overrides=%7B%7D&amp;enabled_features=%5B%5D&amp;disabled_features=%5B%5D&amp;locale=en#%7B%22symbol%22%3A%22BINANCE%3ABTCUSDT%22%2C%22frameElementId%22%3A%22tradingview_e6fba%22%2C%22interval%22%3A%221%22%2C%22range%22%3A%221D%22%2C%22hide_side_toolbar%22%3A%220%22%2C%22allow_symbol_change%22%3A%221%22%2C%22save_image%22%3A%221%22%2C%22details%22%3A%221%22%2C%22calendar%22%3A%221%22%2C%22hotlist%22%3A%221%22%2C%22studies%22%3A%22STD%3BSMA%5Cu001fSTD%3BStochastic_RSI%22%2C%22theme%22%3A%22light%22%2C%22style%22%3A%221%22%2C%22timezone%22%3A%22Etc%2FUTC%22%2C%22withdateranges%22%3A%221%22%2C%22studies_overrides%22%3A%22%7B%7D%22%2C%22utm_source%22%3A%22tilapia2k19-wixsite-com.filesusr.com%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22chart%22%2C%22utm_term%22%3A%22BINANCE%3ABTCUSDT%22%2C%22page-uri%22%3A%22tilapia2k19-wixsite-com.filesusr.com%2Fhtml%2Fc9104a_45258fab1c0ca2bfee6e860a72450f6c.html%22%7D"
        style={{
          width: '100%',
          height: '100%',
          margin: '0px !important',
          padding: '0px !important',
        }}
      ></iframe>
    </div>
  );
};

export default TradingViewChart;
