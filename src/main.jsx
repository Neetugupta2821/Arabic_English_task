import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslation from './location/SA/ar.json'; // Ensure correct path
import enTranslation from './location/GB/en.json'; // Ensure correct path

const resources = {
  SA: {
    translation: arTranslation,
  },
  GB: {
    translation: enTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('language') || 'SA', // Default to 'AR'
  fallbackLng: 'SA', // Set fallback to 'AR'
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StrictMode>
);