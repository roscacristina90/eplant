import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';
import { CartContext } from './CartContext';

function ProductCard({ plant }) {
  const { addToCart } = useContext(CartContext);
  const [showAddedModal, setShowAddedModal] = useState(false);

  const handleAddToCart = () => {
    addToCart(plant);
    setShowAddedModal(true);
    setTimeout(() => setShowAddedModal(false), 1500);
  };

  return (
    <>
      <div className="product-card">
        <img src={plant.image} alt={plant.name} className="plant-image" />
        <h3>{plant.name}</h3>
        <p className="description">
          {plant.description.length > 50 ? plant.description.slice(0, 50) + '...' : plant.description}
        </p>
        <p className={`availability ${plant.inStock ? 'in-stock' : 'out-of-stock'}`}>
          {plant.inStock ? 'In Stock' : 'Out of Stock'}
        </p>
        <p className="price">{plant.cost}</p>
        <button
          className="add-to-cart-btn"
          disabled={!plant.inStock}
          onClick={handleAddToCart}
          style={{
            backgroundColor: plant.inStock ? '#4CAF50' : '#ccc',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '20px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: plant.inStock ? 'pointer' : 'not-allowed',
            transition: 'all 0.3s ease',
            boxShadow: plant.inStock ? '0 2px 8px rgba(76, 175, 80, 0.3)' : 'none'
          }}
          onMouseOver={(e) => {
            if (plant.inStock) {
              e.target.style.backgroundColor = '#45a049';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(76, 175, 80, 0.4)';
            }
          }}
          onMouseOut={(e) => {
            if (plant.inStock) {
              e.target.style.backgroundColor = '#4CAF50';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(76, 175, 80, 0.3)';
            }
          }}
        >
          {plant.inStock ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>

      {showAddedModal && (
        <div 
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div 
            className="modal-content"
            style={{
              backgroundColor: 'white',
              padding: '2rem',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              animation: 'fadeIn 0.3s ease-in-out'
            }}
          >
            <div style={{ color: '#4CAF50', fontSize: '2rem', marginBottom: '1rem' }}>
              ✓
            </div>
            <p style={{ color: '#2e7d32', fontSize: '1.1rem', fontWeight: 'bold', margin: 0 }}>
              {plant.name} added to cart!
            </p>
          </div>
        </div>
      )}
    </>
  );
}

ProductCard.propTypes = {
  plant: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cost: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired
  }).isRequired
};

export default ProductCard;
