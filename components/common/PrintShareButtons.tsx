
import React from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface PrintShareButtonsProps {
  dataToCopy: string;
  pageTitle: string;
}

const PrintShareButtons: React.FC<PrintShareButtonsProps> = ({ dataToCopy, pageTitle }) => {
  const { t } = useAppContext();

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dataToCopy).then(() => {
      alert('Copied to clipboard!');
    }, () => {
      alert('Failed to copy.');
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: pageTitle,
          text: dataToCopy,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      alert('Web Share API not supported in your browser. Data copied to clipboard instead.');
      handleCopy();
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <button onClick={handlePrint} className="p-2 bg-shark-blue text-white rounded-full hover:bg-shark-light-blue transition duration-200" title={t('print')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clipRule="evenodd" /></svg>
      </button>
      <button onClick={handleCopy} className="p-2 bg-shark-blue text-white rounded-full hover:bg-shark-light-blue transition duration-200" title={t('copy')}>
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM5 11a1 1 0 100 2h4a1 1 0 100-2H5z" /></svg>
      </button>
      <button onClick={handleShare} className="p-2 bg-shark-blue text-white rounded-full hover:bg-shark-light-blue transition duration-200" title={t('share')}>
       <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" /></svg>
      </button>
    </div>
  );
};

export default PrintShareButtons;
