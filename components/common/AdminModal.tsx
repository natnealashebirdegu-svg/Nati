
import React, { useState } from 'react';
import { useAppContext } from '../../contexts/AppContext';

interface AdminModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ onClose, onSuccess }) => {
  const { adminPassword, t } = useAppContext();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-sm m-4 transform transition-all scale-100">
        <h2 className="text-2xl font-bold text-shark-blue mb-6 text-center">{t('adminPassword')}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError(false);
            }}
            placeholder={t('enterPassword')}
            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-shark-light-blue focus:border-transparent transition ${
              error ? 'border-red-500 ring-red-500' : 'border-gray-300'
            }`}
          />
          {error && <p className="text-red-500 text-sm mt-2">{t('incorrectOldPassword')}</p>}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-md bg-shark-gray text-white hover:bg-gray-600 transition duration-200"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-md bg-shark-blue text-white hover:bg-shark-light-blue transition duration-200"
            >
              {t('submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
