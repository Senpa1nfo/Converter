import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.sass';
import Store from './store';

interface State {
  store: Store,
}

const store = new Store();

export const Context = createContext<State>({
  store,
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{
    store,
  }}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Context.Provider>
);
