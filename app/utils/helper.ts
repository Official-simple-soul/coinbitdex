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

export function extractFriendlyFirebaseError(error: any): string {
  if (error && error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'User not found. Please check your email.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/email-already-in-use':
        return 'Email address is already in use.';
      case 'auth/weak-password':
        return 'Weak password. Please use a stronger password.';
      case 'auth/invalid-credential':
        return 'Invalid login credentials. Please check your email and password.';
      case 'auth/too-many-requests':
        return 'Too many login attempts. Please try again later.';
      case 'auth/popup-closed-by-user':
        return 'Popup closed by user.';
      case 'auth/network-request-failed':
        return 'A network error occurred. Please check your internet connection and try again.';
      // Add more cases as needed
      default:
        return 'An unexpected error occurred. Please try again.';
    }
  } else {
    return 'An unexpected error occurred. Please try again.';
  }
}

export const convertToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export const base64ToImage = (
  base64String: string
): HTMLImageElement | null => {
  try {
    const img = new Image();
    img.src = base64String;
    return img;
  } catch (error) {
    console.error('Error converting base64 to image', error);
    return null;
  }
};

export function convertFirestoreTimestampToDate(timestamp: {
  seconds: number;
  nanoseconds: number;
}): string {
  if (!timestamp || typeof timestamp.seconds !== 'number') {
    return 'N/A';
  }

  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
}
