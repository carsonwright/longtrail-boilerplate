import React from 'react';
import './App.css';
// import * as collections from '../../collections'
import {Collection} from '../../lib'
import { Provider } from "react-redux";
import {Sessions} from '../templates'
import { BrowserRouter as Router} from 'react-router-dom'

// api.accounts.all().then(({data} = {})=>{
//   collections.Accounts.set(data || [])
// })

function App() {
  return (
    <Provider store={Collection.store}>
      <Router>
        <div className="App">
          <Sessions />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
