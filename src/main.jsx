import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

// Ye 2 lines add karni hain
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Provider ke zariye humne poori App ko store ka access de diya */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)