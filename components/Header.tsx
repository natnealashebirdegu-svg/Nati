import React from 'react';
import { useAppContext } from '../contexts/AppContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { t, language, setLanguage } = useAppContext();

  const handleLanguageChange = (lang: 'en' | 'am') => {
    setLanguage(lang);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center z-10">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="text-shark-blue md:hidden mr-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="text-xl md:text-2xl font-bold text-shark-blue">{t('inventoryManagement')}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <button 
          onClick={() => handleLanguageChange('en')}
          className={`px-3 py-1 text-sm rounded-md transition ${language === 'en' ? 'bg-shark-blue text-white' : 'bg-shark-light-gray text-shark-gray'}`}
        >
          EN
        </button>
        <button 
          onClick={() => handleLanguageChange('am')}
          className={`px-3 py-1 text-sm rounded-md transition ${language === 'am' ? 'bg-shark-blue text-white' : 'bg-shark-light-gray text-shark-gray'}`}
        >
          AM
        </button>
      </div>
    </header>
  );
};

export default Header;
