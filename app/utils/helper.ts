export const formatCurrency = (value: any, currencySymbol = '$') => {
  if (typeof value === 'string' && value.startsWith('&#x24;')) {
    return value.replace('&#x24;', currencySymbol);
  }
  if (typeof value === 'number') {
    if (value >= 1000000000000) {
      return `${currencySymbol}${parseFloat(
        (value / 1000000000000).toFixed(2)
      )} T`;
    } else if (value >= 1000000000) {
      return `${currencySymbol}${parseFloat(
        (value / 1000000000).toFixed(2)
      )} B`;
    } else if (value >= 1000000) {
      return `${currencySymbol}${parseFloat((value / 1000000).toFixed(2))} M`;
    } else if (value >= 1000) {
      return `${currencySymbol}${parseFloat((value / 1000).toFixed(2))} K`;
    } else {
      return `${currencySymbol}${parseFloat(value.toFixed(2))}`;
    }
  }
  return value;
};

export const formatPercentage = (value: any) => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    return `${value.toFixed(2)}%`;
  }
  return value;
};

export const formatNumber = (value: any) => {
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number') {
    if (value >= 1000000000000) {
      return `${parseFloat((value / 1000000000000).toFixed(2))} T`;
    } else if (value >= 1000000000) {
      return `${parseFloat((value / 1000000000).toFixed(2))} B`;
    } else if (value >= 1000000) {
      return `${parseFloat((value / 1000000).toFixed(2))} M`;
    } else if (value >= 1000) {
      return `${parseFloat((value / 1000).toFixed(2))} K`;
    } else {
      return parseFloat(value.toFixed(2));
    }
  }
  return value;
};

export const removeSymbols = (value: any) => {
  if (value?.startsWith('&#x24;')) {
    return value.replace('&#x24;', '');
  }
  return value;
};
