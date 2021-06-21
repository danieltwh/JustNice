import React, {Component} from 'react';
import Main from './components/MainComponent.js';
import './App.css';
import { BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGripVertical, faMinusSquare, faPlusSquare, faEdit} from '@fortawesome/free-solid-svg-icons'

library.add(faGripVertical, faMinusSquare, faPlusSquare, faEdit)

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <BrowserRouter>
          <div>
            <Main />
          </div>
        </BrowserRouter>

      </Provider>
    
    )
  }
}

export default App;
