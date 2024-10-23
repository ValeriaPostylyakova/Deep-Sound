import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './main.scss';

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter basename="/Deep-Sound/">
            <App />
        </BrowserRouter>
    </Provider>
);
