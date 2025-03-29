import { useEffect } from 'react';

const GoogleTranslateWidget = () => {
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.type = 'text/javascript';
    addScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    addScript.async = true;
    document.body.appendChild(addScript);

    // Define the callback function globally
    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    return () => {
      document.body.removeChild(addScript);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '160px',
        left: '20px',
        height: '40px',
        overflow: 'hidden',
        zIndex: 1000,
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
      id="google-box"
    >
      <div id="google_translate_element" />
    </div>
  );
};

export default GoogleTranslateWidget;
