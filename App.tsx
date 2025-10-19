import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Category1View from './components/views/Category1View';
import Category2View from './components/views/Category2View';
import Category3View from './components/views/Category3View';
import Category4View from './components/views/Category4View';
import Category5View from './components/views/Category5View';
import Category6View from './components/views/Category6View';
import SettingsView from './components/views/SettingsView';
import { View } from './types';

function App() {
  const [currentView, setCurrentView] = useState<View>(View.Category1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case View.Category1:
        return <Category1View />;
      case View.Category2:
        return <Category2View />;
      case View.Category3:
        return <Category3View />;
      case View.Category4:
        return <Category4View />;
      case View.Category5:
        return <Category5View />;
      case View.Category6:
        return <Category6View />;
      case View.Settings:
        return <SettingsView />;
      default:
        return <Category1View />;
    }
  };

  return (
      <div className="flex h-screen bg-shark-light-gray font-sans">
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-shark-light-gray p-4 md:p-6 lg:p-8">
            {renderView()}
          </main>
        </div>
      </div>
  );
}

export default App;
