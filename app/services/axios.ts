import axios from 'axios';

export async function fetchCryptocurrencyData({ pageParam = 2 }) {
  const options = {
    method: 'GET',
    url: 'https://investing-cryptocurrency-markets.p.rapidapi.com/coins/list',
    params: {
      edition_currency_id: '12',
      time_utc_offset: '28800',
      lang_ID: '1',
      sort: 'PERC1D_DN',
      page: pageParam,
    },
    headers: {
      //   'X-RapidAPI-Key': 'aa9fe9fa58msh53c01e7eb8c954ap12c810jsn1571c226b0f4',
      'X-RapidAPI-Key': '5687e2b969mshc6e7ff50692d7abp1b3ee6jsn6c0dc748e2cd',
      'X-RapidAPI-Host': 'investing-cryptocurrency-markets.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch cryptocurrency data');
  }
}
