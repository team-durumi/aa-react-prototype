import React from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Contents from './layouts/Contents';
//import { ButtonToolbar, Button , Breadcrumb} from 'react-bootstrap';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header/>
      <Contents view="CollectionBoot"/>
      <Footer/>
    </div>
  );
}

export default App;
