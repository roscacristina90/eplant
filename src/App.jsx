
import { useState } from 'react';
import ProductList from './ProductList';
import './App.css';
function App() {
  
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStartedClick = () => {
    setShowProductList(true);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${showProductList ? 'fade-out' : ''}`}>
        <div className="background-image"></div>
        <div className="content">
         <div className="landing_content">
         <h1>Welcome To Paradise Nursery</h1>
          <div className="divider"></div>
          <p>Where Green Meets Serenity, Every Breath Feels New.</p>
         
          <button className="get-started-button" onClick={handleGetStartedClick}>
            Get Started Now
          </button>
         </div>
          
          </div>

      </div>
      <div className={`product-list-container ${showProductList ? 'visible' : ''}`}>
        <ProductList startWithShop={true} />
      </div>
    </div>
  );
}

export default App;



