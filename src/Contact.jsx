import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
      padding: '1rem 0.5rem',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <h1 style={{
            fontSize: '2.2rem',
            color: '#2e7d32',
            marginBottom: '0.5rem',
            fontWeight: 'bold',
            fontFamily: 'var(--secondary-font)'
          }}>
             Contact Paradise Nursery
          </h1>
          <div style={{
            width: '80px',
            height: '3px',
            backgroundColor: '#4CAF50',
            margin: '0 auto',
            borderRadius: '30px'
          }}></div>
        </div>

        {/* Single Unified Contact Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          maxWidth: '100%',
          margin: '0 auto'
        }}>
          
          {/* Contact Information Grid - Horizontal Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f1f8e9',
              borderRadius: '12px'
            }}>
              <h4 style={{ color: '#2e7d32', margin: '0 0 0.3rem 0', fontSize: '1rem', fontFamily: 'var(--primary-font)' }}>Visit Our Nursery</h4>
              <p style={{ margin: 0, color: '#666', lineHeight: '1.4', fontSize: '0.8rem', fontFamily: 'var(--primary-font)' }}>
                123 Garden Street<br />
                Green Valley, London<br />
                UK SW1A 1AA
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f1f8e9',
              borderRadius: '12px'
            }}>
              <h4 style={{ color: '#2e7d32', margin: '0 0 0.3rem 0', fontSize: '1rem', fontFamily: 'var(--primary-font)' }}>Call Us</h4>
              <p style={{ margin: 0, color: '#666', lineHeight: '1.4', fontSize: '0.8rem', fontFamily: 'var(--primary-font)' }}>
                +44 (0) 20 7123 4567<br />
                Monday - Saturday<br />
                9:00 AM - 6:00 PM
              </p>
            </div>

            <div style={{
              textAlign: 'center',
              padding: '1rem',
              backgroundColor: '#f1f8e9',
              borderRadius: '12px'
            }}>
              <h4 style={{ color: '#2e7d32', margin: '0 0 0.3rem 0', fontSize: '1rem', fontFamily: 'var(--primary-font)' }}>Email Us</h4>
              <p style={{ margin: 0, color: '#666', lineHeight: '1.4', fontSize: '0.8rem', fontFamily: 'var(--primary-font)' }}>
                info@paradisenursery.com<br />
                support@paradisenursery.com<br />
                Quick Response Guaranteed
              </p>
            </div>
          </div>

          {/* Main Content Area - Two Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'start'
          }}>
        
          {/* Left Side - Image and Social Media */}
          <div>
            <h2 style={{
              color: '#2e7d32',
              marginBottom: '1.5rem',
              fontSize: '1.8rem',
              textAlign: 'center',
              fontFamily: 'var(--secondary-font)',
              fontWeight: 'bold'
            }}>
              Visit Paradise Nursery 🌿
            </h2>

            {/* Beautiful Image */}
            <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
              <img 
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?q=80&w=600&auto=format&fit=crop" 
                alt="Paradise Nursery storefront" 
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.15)'
                }}
              />
            </div>

            {/* Social Media Section */}
            <div style={{
              backgroundColor: '#f1f8e9',
              borderRadius: '12px',
              padding: '1.2rem',
              textAlign: 'center'
            }}>
              <h4 style={{ 
                color: '#2e7d32', 
                margin: '0 0 1rem 0', 
                fontSize: '1.1rem', 
                fontFamily: 'var(--primary-font)' 
              }}>
                Follow Us on Social Media
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '0.8rem',
                marginBottom: '1rem'
              }}>
                <a 
                  href="https://facebook.com/paradisenursery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    color: '#967bb6',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--primary-font)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'hsla(138, 67%, 52%, 0.16)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'hsla(138, 67%, 52%, 0.16)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'hsla(138, 67%, 52%, 0.16)';
                  }}
                >
                  📘 Facebook
                </a>
                
                <a 
                  href="https://instagram.com/paradisenursery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    color: '#967bb6',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--primary-font)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'hsla(138, 67%, 52%, 0.16)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(228, 64, 95, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(228, 64, 95, 0.1)';
                  }}
                >
                  📸 Instagram
                </a>
                
                <a 
                  href="https://twitter.com/paradisenursery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    color: '#967bb6',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--primary-font)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'hsla(138, 67%, 52%, 0.16)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(29, 161, 242, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(29, 161, 242, 0.1)';
                  }}
                >
                  🐦 Twitter
                </a>
                
                <a 
                  href="https://youtube.com/@paradisenursery" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.3rem',
                    color: '#967bb6',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--primary-font)',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'hsla(138, 67%, 52%, 0.16)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.2)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
                  }}
                >
                  📺 YouTube
                </a>
              </div>
              <p style={{ 
                margin: '0', 
                color: '#666', 
                fontSize: '0.8rem', 
                fontFamily: 'var(--primary-font)' 
              }}>
                Get plant care tips, garden inspiration & exclusive offers!
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div style={{
            backgroundColor: '#f9fffe',
            borderRadius: '15px',
            padding: '1.5rem',
            height: 'fit-content'
          }}>
            <h3 style={{
              color: '#2e7d32',
              marginBottom: '1.2rem',
              fontSize: '1.6rem',
              textAlign: 'center',
              fontFamily: 'var(--secondary-font)',
              fontWeight: 'bold'
            }}>
              Send us a Message 💌
            </h3>

            {showSuccess && (
              <div style={{
                backgroundColor: '#d4edda',
                border: '2px solid #c3e6cb',
                color: '#155724',
                padding: '0.8rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                textAlign: 'center',
                fontSize: '0.9rem',
                fontWeight: 'bold',
                fontFamily: 'var(--primary-font)'
              }}>
                ✅ Message sent successfully! We&apos;ll get back to you soon!
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.4rem',
                    fontWeight: 'bold',
                    color: '#2e7d32',
                    fontSize: '0.9rem',
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.9rem',
                      transition: 'border-color 0.3s ease',
                      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                    }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.4rem',
                    fontWeight: 'bold',
                    color: '#2e7d32',
                    fontSize: '0.9rem',
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.7rem',
                      borderRadius: '8px',
                      border: 'none',
                      fontSize: '0.9rem',
                      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                    }}
                    placeholder="Your phone"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontWeight: 'bold',
                  color: '#2e7d32',
                  fontSize: '0.9rem',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}>
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontWeight: 'bold',
                  color: '#2e7d32',
                  fontSize: '0.9rem',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}>
                  Subject
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    border: '2px solid #c8e6c9',
                    fontSize: '0.9rem',
                    backgroundColor: 'white',
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="plant-care">🌱 Plant Care</option>
                  <option value="order-inquiry">🛒 Order Inquiry</option>
                  <option value="custom-arrangement">🎨 Custom Arrangement</option>
                  <option value="wholesale">🏢 Wholesale</option>
                  <option value="general">💬 General Question</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.4rem',
                  fontWeight: 'bold',
                  color: '#2e7d32',
                  fontSize: '0.9rem',
                  fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  style={{
                    width: '100%',
                    padding: '0.7rem',
                    borderRadius: '8px',
                    border: '2px solid #c8e6c9',
                    fontSize: '0.9rem',
                    resize: 'vertical',
                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                  }}
                  placeholder="Tell us about your plant needs..."
                />
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  padding: '0.8rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                  transition: 'all 0.3s ease',
                  fontFamily: '"Dancing Script", cursive'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
                }}
              >
                🌿 Send Message
              </button>
            </form>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
