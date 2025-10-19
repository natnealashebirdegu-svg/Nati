import React from 'react';
import { View } from '../types';
import { useAppContext } from '../contexts/AppContext';

interface SidebarProps {
  currentView: View;
  setCurrentView: (view: View) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
  const { t } = useAppContext();

  const navItems = [
    { view: View.Category1, label: t('category1') },
    { view: View.Category2, label: t('category2') },
    { view: View.Category3, label: t('category3') },
    { view: View.Category4, label: t('category4') },
    { view: View.Category5, label: t('category5') },
    { view: View.Category6, label: t('category6') },
    { view: View.Settings, label: t('settings') },
  ];

  const handleNavClick = (view: View) => {
    setCurrentView(view);
    if (window.innerWidth < 768) { // md breakpoint
        setIsOpen(false);
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <aside className={`bg-shark-blue text-white w-64 min-h-screen p-4 flex flex-col fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-200 ease-in-out z-30`}>
        <div className="text-2xl font-bold mb-8 text-center">SHARK</div>
        <nav>
          <ul>
            {navItems.map(item => (
              <li key={item.view} className="mb-2">
                <button
                  onClick={() => handleNavClick(item.view)}
                  className={`w-full text-left p-3 rounded-lg transition duration-200 ${
                    currentView === item.view
                      ? 'bg-shark-light-blue'
                      : 'hover:bg-shark-light-blue hover:bg-opacity-20'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
