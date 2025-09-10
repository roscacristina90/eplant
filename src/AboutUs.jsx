import './AboutUs.css';

function AboutUs() {
  return (
    <div style={{
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
      padding: '2rem 1rem'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '3rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: '3rem',
            color: '#2e7d32',
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            🌿 About Paradise Nursery
          </h1>
          <div style={{
            width: '100px',
            height: '4px',
            backgroundColor: '#4CAF50',
            margin: '0 auto',
            borderRadius: '2px'
          }}></div>
        </div>

        {/* Welcome Section with Image */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '3rem'
        }}>
          <div>
            <h2 style={{ color: '#2e7d32', marginBottom: '1rem', fontSize: '1.8rem' }}>
              Welcome to Paradise Nursery
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#1b5e20', marginBottom: '1rem', fontStyle: 'italic' }}>
              Where green meets serenity!
            </p>
            <p style={{ lineHeight: '1.8', color: '#2e7d32', fontSize: '1.1rem' }}>
              At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of 
              high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and 
              more sustainable lifestyle.
            </p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=1000&auto=format&fit=crop" 
              alt="Beautiful garden nursery" 
              style={{
                width: '100%',
                maxWidth: '400px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '15px',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
              }}
            />
          </div>
        </div>

        {/* Features Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            backgroundColor: '#f1f8e9',
            padding: '1.5rem',
            borderRadius: '15px',
            textAlign: 'center',
            border: '2px solid #c8e6c9'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌿</div>
            <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Air Purifying Plants</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              From air-purifying plants to aromatic fragrant ones, we have something for every plant enthusiast.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f1f8e9',
            padding: '1.5rem',
            borderRadius: '15px',
            textAlign: 'center',
            border: '2px solid #c8e6c9'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👩‍🌾</div>
            <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Expert Care</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Our team of experts is dedicated to ensuring that each plant meets our strict standards of quality and care.
            </p>
          </div>

          <div style={{
            backgroundColor: '#f1f8e9',
            padding: '1.5rem',
            borderRadius: '15px',
            textAlign: 'center',
            border: '2px solid #c8e6c9'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
            <h3 style={{ color: '#2e7d32', marginBottom: '0.5rem' }}>Personal Journey</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
              Whether you&apos;re a seasoned gardener or just starting your green journey, we&apos;re here to support you.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div style={{
          backgroundColor: '#e8f5e9',
          padding: '2rem',
          borderRadius: '15px',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '1rem', fontSize: '1.5rem', textAlign: 'center' }}>
            Our Mission
          </h3>
          <p style={{ lineHeight: '1.8', color: '#2e7d32', fontSize: '1.1rem', textAlign: 'center' }}>
            Feel free to explore our collection, ask questions, and let us help you find the perfect plant for your 
            home or office. Join us in our mission to create a greener, healthier world.
          </p>
        </div>

        {/* Call to Action */}
        <div style={{ textAlign: 'center' }}>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#2e7d32', 
            marginBottom: '2rem',
            fontWeight: '500'
          }}>
            Visit Paradise Nursery today and experience the beauty of nature right at your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
