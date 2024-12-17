import { createRoot } from 'react-dom/client';
import { PrimeReactProvider } from 'primereact/api';
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-blue/theme.css";
import 'primereact/resources/primereact.min.css';
import "primeicons/primeicons.css";
import 'bootstrap/dist/js/bootstrap.js';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store/index.js';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <Provider store={store}>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
  </Provider>
  // </StrictMode>,
)
