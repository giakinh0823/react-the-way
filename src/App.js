import './App.css';
import Header from './components/Header';
import CartFeature from './features/cart';
import ProductFeature from './features/product';


function App() {
  return (
    <div className="App">
      <Header />
      <ProductFeature />
      <CartFeature/>
    </div>
  );
}

export default App;
