import React from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';

const SettingsPage = ({ setThemeSettings, currentColor }) => {
  return (
    <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
      <TooltipComponent content="Settings" position="Top">
        <button
          type="button"
          style={{ background: currentColor, borderRadius: '50%' }}
          className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
        >
          <FiSettings />
        </button>
      </TooltipComponent>
    </div>
  );
};

export default SettingsPage;
