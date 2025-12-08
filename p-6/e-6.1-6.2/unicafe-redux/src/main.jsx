import ReactDOM from 'react-dom/client'
import './App.css'
import store from './counterStore.js'
import App from './App.jsx'

//const store = createStore(counterReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));

const renderApp = () => {
  root.render(<App />)
};

renderApp();
store.subscribe(renderApp);