import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from "axios";

// const cors = require('cors');
// const corsOptions ={
//     origin:'http://localhost:3000',
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200
// }
// app.use(cors(corsOptions));

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = "https://localhost:7179"

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);