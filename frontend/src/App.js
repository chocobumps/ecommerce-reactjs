import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            {/* 'exact' makes sure that it only returns the route if the path is an EXACT match to the current url, in this case '/HomeScreen' */}
            <Route path='/product/:id' element={<ProductScreen />} />
            {/* :id is an id param that is used as a placeholder */}
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
