import { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductList.css';
import AboutUs from './AboutUs';
import Contact from './Contact';

function ItemAddedModal({ itemName, onClose }) {
    return (
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
                zIndex: 1001,
            }}
            onClick={onClose}
        >
            <div
                className="modal-content"
                style={{
                    backgroundColor: '#fff',
                    padding: '2rem',
                    borderRadius: '10px',
                    maxWidth: '400px',
                    width: '90%',
                    textAlign: 'center',
                    position: 'relative',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        background: 'transparent',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                    }}
                >
                    &times;
                </button>
                <div style={{ color: '#4CAF50', fontSize: '3rem', marginBottom: '1rem' }}>
                    ✓
                </div>
                <h2 style={{ color: '#4CAF50', marginBottom: '1rem' }}>Item Added!</h2>
                <p style={{ marginBottom: '1.5rem' }}>
                    <strong>{itemName}</strong> has been added to your cart.
                </p>
                <button
                    onClick={onClose}
                    style={{
                        backgroundColor: '#4CAF50',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        fontSize: '1rem',
                    }}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}

ItemAddedModal.propTypes = {
    itemName: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};

function ProductList({ startWithShop = false }) {
    // State declarations
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [showCart, setShowCart] = useState(false); 
    const [showPlants, setShowPlants] = useState(startWithShop);
    const [showAbout, setShowAbout] = useState(false);
    const [showHome, setShowHome] = useState(!startWithShop);
    const [showContact, setShowContact] = useState(false);
    const [cart, setCart] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [lastAddedItem, setLastAddedItem] = useState(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
    const [orderNumber, setOrderNumber] = useState('');
    const [modalQuantity, setModalQuantity] = useState(1);
    
    // Filter states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceSort, setPriceSort] = useState('none');
    const [showFilters, setShowFilters] = useState(false);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                {
                    name: "Snake Plant",
                    image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/snake-plant-5939187_1280.jpg",
                    description: "Produces oxygen at night, improving air quality. Prefers indirect sunlight but tolerates low light. Water every 2–3 weeks, allowing soil to dry out completely. **Toxic to cats and dogs if ingested.**",
                    cost: "£15",
                    inStock: true
                },
                {
                    name: "Spider Plant",
                    image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg",
                    description: "Filters formaldehyde and xylene from the air.",
                    cost: "£12",
                    inStock: true
                },
                {
                    name: "Peace Lily",
                    image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lilies-4269365_1280.jpg",
                    description: "Removes mold spores and purifies the air.",
                    cost: "£18",
                    inStock: true
                },
                {
                    name: "Boston Fern",
                    image: "https://cdn.pixabay.com/photo/2020/04/30/19/52/boston-fern-5114414_1280.jpg",
                    description: "Adds humidity to the air and removes toxins.",
                    cost: "£20",
                    inStock: true
                },
                {
                    name: "Rubber Plant",
                    image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg",
                    description: "Easy to care for and effective at removing toxins.",
                    cost: "£17",
                    inStock: true
                },
                {
                    name: "Aloe Vera",
                    image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/leaf-3283175_1280.jpg",
                    description: "Purifies the air and has healing properties for skin.",
                    cost: "£14",
                    inStock: true
                },
                {
                    name: "Areca Palm",
                    image: "https://oxy-plants.com/wp-content/uploads/2020/12/areca-palm-large-5.jpg",
                    description: "Excellent humidifier and natural air purifier.",
                    cost: "£24.99",
                    inStock: true
                },
                {
                    name: "Chinese Evergreen",
                    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRQ8udXtOVw_sEAtQJPML-El3koPHkPCsWmWU9bjMxVCMz1jFUvQUbU00LI0yqVB5Xt3hPN7rXif4JHJpu6wb2hTmYJV2PVeAuWEEwzyKLT",
                    description: "Thrives in low light and cleans indoor toxins.",
                    cost: "£19",
                    inStock: true
                }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                {
                    name: "Lavender",
                    image: "https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?q=80&w=1074&auto=format&fit=crop",
                    description: "Calming scent, used in aromatherapy.",
                    cost: "£20",
                    inStock: true
                },
                {
                    name: "Jasmine",
                    image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b?q=80&w=1170&auto=format&fit=crop",
                    description: "Sweet fragrance, promotes relaxation.",
                    cost: "£18",
                    inStock: true
                },
                {
                    name: "Rosemary",
                    image: "https://cdn.pixabay.com/photo/2019/10/11/07/12/rosemary-4541241_1280.jpg",
                    description: "Invigorating scent, often used in cooking.",
                    cost: "£15",
                    inStock: true
                },
                {
                    name: "Mint",
                    image: "https://cdn.pixabay.com/photo/2016/01/07/18/16/mint-1126282_1280.jpg",
                    description: "Refreshing aroma, used in teas and cooking.",
                    cost: "£12",
                    inStock: true
                },
                {
                    name: "Lemon Balm",
                    image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg",
                    description: "Citrusy scent, relieves stress and promotes sleep.",
                    cost: "£14",
                    inStock: true
                },
                {
                    name: "Hyacinth",
                    image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg",
                    description: "Hyacinth is a beautiful flowering plant known for its fragrance.",
                    cost: "£14",
                    inStock: true
                },
                {
                    name: "Lemongrass",
                    image: "https://txmg.org/hendersonmg/files/2022/03/Lemongrass.jpg",
                    description: "Citrusy scent, used in teas and essential oils.",
                    cost: "£9",
                    inStock: true
                },
                {
                    name: "Scented Geranium",
                    image: "https://www.rhs.org.uk/getmedia/07154ea3-149d-4198-a23c-93ad87145546/scented-leaf-pelargonium-desktop-hero-1920x978.jpg",
                    description: "Fragrant leaves with various natural scents.",
                    cost: "£11",
                    inStock: true
                }
            ]
        },
        {
            category: "Succulents & Cacti",
            plants: [
                {
                    name: "Aloe Vera",
                    image: "https://images.unsplash.com/photo-1556408978-ce0a0a5e352e?q=80&w=1756&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    description: "Medicinal plant with soothing gel inside leaves.",
                    cost: "£12",
                    inStock: true
                },
                {
                    name: "Echeveria",
                    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Echeveria_elegans_-_1.jpg",
                    description: "Compact succulent with rosette shape.",
                    cost: "£10",
                    inStock: true
                },
                {
                    name: "Barrel Cactus",
                    image: "https://upload.wikimedia.org/wikipedia/commons/0/0d/Echinocactus_grusonii_1.jpg",
                    description: "Round cactus, low maintenance and drought resistant.",
                    cost: "£18",
                    inStock: true
                },
                {
                    name: "Haworthia",
                    image: "https://cdn.shopify.com/s/files/1/0043/3628/7813/files/haworthia-attenuata_480x480.jpg?v=1694750325",
                    description: "Small succulent with translucent leaves.",
                    cost: "£9",
                    inStock: true
                }
            ]
        },
        {
            category: "Flowering Plants",
            plants: [
                {
                    name: "Orchid",
                    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ6dL643q865bGjeax-t_Md_IX1Vm-ERR_SBq48FzAqYL6NmBYBj5q6DI6BNvEMVzyb1GzM9F92yqxYf3f3FuLIw",
                    description: "Elegant flowers, popular indoor plant.",
                    cost: "£25",
                    inStock: true
                },
                {
                    name: "Begonia",
                    image: "https://s3.amazonaws.com/YouGarden/Web/500x500/400396.jpg",
                    description: "Bright, colorful flowering plant for indoors.",
                    cost: "£15",
                    inStock: true
                },
                {
                    name: "African Violet",
                    image: "https://res.cloudinary.com/easyplant/image/upload/v1670414812/care/african-violet.jpg",
                    description: "Small, fuzzy leaves with beautiful flowers.",
                    cost: "£13",
                    inStock: true
                },
                {
                    name: "Kalanchoe",
                    image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQoEenjhrtPXoGM3EnepxG9J9IMjVjAayhohQnXmCCP8I_M5HGD5ebHAPr8d368ixuEnRmGb1PLeWPMyaw6Cs63Og",
                    description: "Clustered bright flowers, easy to care for.",
                    cost: "£17",
                    inStock: true
                },
                {
                    name: "Anthurium",
                    image: "https://labellefleurdesign.ca/cdn/shop/files/red10_580x_crop_center_207fc9be-5210-4d73-8987-20897d0a6d27.webp?v=1731360249",
                    description: "Tropical plant with shiny heart-shaped leaves and bright red flowers.",
                    cost: "£22",
                    inStock: false
                },
                {
                    name: "Geranium",
                    image: "https://s3.amazonaws.com/YouGarden/Web/500x500/410062.jpg",
                    description: "Bright and cheerful blooms, perfect for windowsills and patios.",
                    cost: "£14",
                    inStock: true
                },
                {
                    name: "Hydrangea",
                    image: "https://plantura.garden/uk/wp-content/uploads/sites/2/2022/11/blue-hydrangea-flower-1024x680.jpg?x54327",
                    description: "Lush flower clusters that change color based on soil pH.",
                    cost: "£19",
                    inStock: true
                }
            ]
        },
        {
            category: "Herbs & Edibles",
            plants: [
                {
                    name: "Chives",
                    image: "https://boroughmarket.org.uk/wp-content/uploads/2021/02/The-herb-guide-chives.jpg",
                    description: "Mild onion flavor, great for cooking.",
                    cost: "£5",
                    inStock: true
                },
                {
                    name: "Thyme",
                    image: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTRk626J5qEli-GT4gSYziOq-wImV4PR9z7JNun6qytwtMeZVe_BuiUuKXj17vwU26UoYVLS8Odw6G42qj8-uLrnAu9tiEohS5Tn-YP4z35uiRhl28KZ_ed1A&usqp=CAc",
                    description: "Fragrant herb, used in many cuisines.",
                    cost: "£7",
                    inStock: false
                },
                {
                    name: "Parsley",
                    image: "https://cdn.mos.cms.futurecdn.net/RuZaAQspGnNfMjAyqMYJvd.jpg",
                    description: "Versatile herb for garnishing and cooking.",
                    cost: "£6",
                    inStock: true
                },
                {
                    name: "Basil",
                    image: "https://cdn-prod.medicalnewstoday.com/content/images/articles/266/266425/basil-in-a-bowel-on-a-table.jpg",
                    description: "Aromatic herb used in pasta, salads, and pesto.",
                    cost: "£6",
                    inStock: true
                }
            ]
        }
    ];

    // Styles
    const styleObj = {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '20px',
    };

    const styleA = {
        color: 'white',
        fontSize: '1.5rem',
        textDecoration: 'none',
        fontFamily: 'var(--primary-font)',
        fontWeight: '600',
    };

    // Event Handlers
    const addToCart = (item) => {
        setCart(prev => {
            const existingItem = prev.find(cartItem => cartItem.name === item.name);
            if (existingItem) {
                return prev.map(cartItem =>
                    cartItem.name === item.name
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
        setLastAddedItem(item.name);
        setShowModal(true);
    };

    const updateQuantity = (itemName, newQuantity) => {
        if (newQuantity === 0) {
            removeFromCart(itemName);
        } else {
            setCart(prev =>
                prev.map(item =>
                    item.name === itemName
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
        }
    };

    const removeFromCart = (itemName) => {
        setCart(prev => prev.filter(item => item.name !== itemName));
    };

    const handleCartClick = (e) => {
        e.preventDefault();
        setShowCart(true);
        setShowPlants(false);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        setShowCart(false);
        setShowPlants(true);
        setShowAbout(false);
        setShowHome(false);
        setShowContact(false);
    };

    const handleAboutClick = (e) => {
        e.preventDefault();
        setShowAbout(true);
        setShowPlants(false);
        setShowCart(false);
        setShowCheckout(false);
        setShowPaymentSuccess(false);
        setShowHome(false);
        setShowContact(false);
    };

    // Removed unused handleHomeClick function

    const handleShopClick = (e) => {
        e.preventDefault();
        setShowPlants(true);
        setShowHome(false);
        setShowAbout(false);
        setShowCart(false);
        setShowCheckout(false);
        setShowPaymentSuccess(false);
        setShowContact(false);
    };

    const handleContactClick = (e) => {
        e.preventDefault();
        setShowContact(true);
        setShowPlants(false);
        setShowAbout(false);
        setShowCart(false);
        setShowCheckout(false);
        setShowPaymentSuccess(false);
        setShowHome(false);
    };

    const handlePlantClick = (plant) => {
        setSelectedPlant(plant);
        setModalQuantity(1);
        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setSelectedPlant(null);
        setModalQuantity(1);
        // Restore body scroll when modal is closed
        document.body.style.overflow = 'unset';
    };

    const handleAddToCart = (plant) => {
        // Add the specified quantity to cart
        for (let i = 0; i < modalQuantity; i++) {
            addToCart(plant);
        }
        closeModal();
    };

    const increaseModalQuantity = () => {
        setModalQuantity(prev => prev + 1);
    };

    const decreaseModalQuantity = () => {
        setModalQuantity(prev => prev > 1 ? prev - 1 : 1);
    };

    const handleCheckout = () => {
        setShowCheckout(true);
        setShowCart(false);
    };

    const handlePayment = (event) => {
        event.preventDefault();
        // Generate random order number
        const orderNum = 'PN' + Math.random().toString(36).substr(2, 9).toUpperCase();
        setOrderNumber(orderNum);
        setShowCheckout(false);
        setShowPaymentSuccess(true);
        setCart([]); // Clear cart after successful payment
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => {
            const price = parseFloat(item.cost.replace('£', '').replace('$', ''));
            return total + (price * item.quantity);
        }, 0).toFixed(2);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    // Filter and sort functionality
    const getFilteredAndSortedPlants = () => {
        let filteredData = plantsArray;

        // Filter by category
        if (selectedCategory !== 'All') {
            filteredData = filteredData.filter(categoryObj => 
                categoryObj.category === selectedCategory
            );
        }

        // Filter by search term (plant name)
        if (searchTerm.trim()) {
            filteredData = filteredData.map(categoryObj => ({
                ...categoryObj,
                plants: categoryObj.plants.filter(plant =>
                    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            })).filter(categoryObj => categoryObj.plants.length > 0);
        }

        // Sort by price
        if (priceSort !== 'none') {
            filteredData = filteredData.map(categoryObj => ({
                ...categoryObj,
                plants: [...categoryObj.plants].sort((a, b) => {
                    const priceA = parseFloat(a.cost.replace('£', '').replace('$', ''));
                    const priceB = parseFloat(b.cost.replace('£', '').replace('$', ''));
                    return priceSort === 'low-high' ? priceA - priceB : priceB - priceA;
                })
            }));
        }

        return filteredData;
    };

    // Get all unique categories for filter dropdown
    const getAllCategories = () => {
        return ['All', ...plantsArray.map(categoryObj => categoryObj.category)];
    };

    return (
        <>
            {/* Navbar */}
            <div className="navbar" style={styleObj}>
                <div
                    className="tag"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%'
                    }}
                >
                    {/* Logo Section */}
                    <div
                        className="luxury"
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <img
                            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
                            alt="logo"
                            style={{ width: '50px', marginRight: '10px' }}
                        />
                        <a href="/" style={{ textDecoration: 'none' }}>
                            <div>
                                <h3 style={{ color: 'white', margin: 0, fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.2', fontFamily: 'var(--secondary-font)' }}>Paradise Nursery</h3>
                                <i style={{ color: 'white', fontSize: '0.9rem', marginTop: '-2px', display: 'block', fontFamily: 'var(--secondary-font)', fontStyle: 'italic' }}>Where Green Meets Serenity</i>
                            </div>
                        </a>
                    </div>

                    {/* Right Side Links */}
                    <div
                        className="nav-links"
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <a 
                            href="#plant-section" 
                            onClick={handleShopClick}
                            style={{
                                ...styleA,
                                backgroundColor: showPlants ? 'rgba(255,255,255,0.2)' : 'transparent',
                                padding: '0.5rem 1rem',
                                borderRadius: '15px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                if (!showPlants) {
                                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!showPlants) {
                                    e.target.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            Shop
                        </a>
                        <a 
                            href="#about" 
                            onClick={handleAboutClick}
                            style={{
                                ...styleA,
                                backgroundColor: showAbout ? 'rgba(255,255,255,0.2)' : 'transparent',
                                padding: '0.5rem 1rem',
                                borderRadius: '15px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                if (!showAbout) {
                                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!showAbout) {
                                    e.target.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            About
                        </a>
                        <a 
                            href="#contact" 
                            onClick={handleContactClick}
                            style={{
                                ...styleA,
                                backgroundColor: showContact ? 'rgba(255,255,255,0.2)' : 'transparent',
                                padding: '0.5rem 1rem',
                                borderRadius: '15px',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                if (!showContact) {
                                    e.target.style.backgroundColor = 'rgba(255,255,255,0.1)';
                                }
                            }}
                            onMouseOut={(e) => {
                                if (!showContact) {
                                    e.target.style.backgroundColor = 'transparent';
                                }
                            }}
                        >
                            Contact
                        </a>
                        <a
                            href="#"
                            onClick={handleCartClick}
                            style={{
                                ...styleA,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            className="cart"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 256"
                                height="40"
                                width="40"
                            >
                                <circle cx="80" cy="216" r="12" fill="white"></circle>
                                <circle cx="184" cy="216" r="12" fill="white"></circle>
                                <path
                                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                                    fill="none"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                />
                            </svg>
                            {cart.length > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '0px',
                                    right: '0px',
                                    backgroundColor: 'red',
                                    color: 'white',
                                    borderRadius: '50%',
                                    padding: '2px 6px',
                                    fontSize: '12px'
                                }}>
                                    {getTotalItems()}
                                </span>
                            )}
                        </a>
                    </div>
                </div>
            </div>

            {/* Main View */}
            {showPaymentSuccess ? (
                <div style={{ 
                    padding: '2rem', 
                    textAlign: 'center',
                    backgroundColor: '#e8f5e9',
                    margin: '2rem',
                    borderRadius: '10px'
                }}>
                    <div style={{ color: '#4CAF50', fontSize: '4rem', marginBottom: '1rem' }}>
                        ✅
                    </div>
                    <h1 style={{ color: '#4CAF50', marginBottom: '1rem' }}>Payment Successful!</h1>
                    <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                        Thank you for your purchase! Your order has been confirmed.
                    </p>
                    <p style={{ fontSize: '1rem', marginBottom: '2rem' }}>
                        <strong>Order Number:</strong> {orderNumber}
                    </p>
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '1.5rem',
                        borderRadius: '8px',
                        marginBottom: '2rem',
                        border: '1px solid #c8e6c9'
                    }}>
                        <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🚚 What happens next?</h3>
                        <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                            <li>Your plants will be carefully prepared for shipping</li>
                            <li>You&apos;ll receive a tracking number within 24 hours</li>
                            <li>Delivery within 3-5 business days</li>
                            <li>All plants come with care instructions</li>
                        </ul>
                    </div>
                    <button
                        onClick={() => {
                            setShowPaymentSuccess(false);
                            setShowPlants(true);
                            setShowHome(false);
                            setShowAbout(false);
                        }}
                        style={{
                            backgroundColor: '#4CAF50',
                            color: 'white',
                            border: 'none',
                            padding: '12px 24px',
                            borderRadius: '25px',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Continue Shopping
                    </button>
                </div>
            ) : showCheckout ? (
                <div style={{ padding: '1rem', maxWidth: '800px', margin: '0 auto' }}>
                    <button 
                        onClick={() => {
                            setShowCheckout(false);
                            setShowCart(true);
                        }} 
                        style={{ margin: '1rem 0', background: 'none', border: 'none', color: '#4CAF50', cursor: 'pointer' }}
                    >
                        ← Back to Cart
                    </button>
                    
                    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                        {/* Order Summary */}
                        <div style={{
                            flex: '1 1 300px',
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            padding: '1.5rem'
                        }}>
                            <h2 style={{ marginBottom: '1rem' }}>🛒 Order Summary</h2>
                            {cart.map((item, idx) => (
                                <div key={idx} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between', 
                                    alignItems: 'center',
                                    marginBottom: '0.5rem',
                                    paddingBottom: '0.5rem',
                                    borderBottom: '1px solid #eee'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                        <img src={item.image} alt={item.name} style={{ width: '40px', marginRight: '0.5rem', borderRadius: '4px' }} />
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{item.name}</div>
                                            <div style={{ fontSize: '0.85rem', color: '#666' }}>Qty: {item.quantity}</div>
                                        </div>
                                    </div>
                                    <span style={{ fontWeight: 'bold' }}>
                                        £{(parseFloat(item.cost.replace('£', '').replace('$', '')) * item.quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                            <div style={{ 
                                marginTop: '1rem', 
                                paddingTop: '1rem', 
                                borderTop: '2px solid #4CAF50',
                                display: 'flex',
                                justifyContent: 'space-between',
                                fontSize: '1.2rem',
                                fontWeight: 'bold'
                            }}>
                                <span>Total:</span>
                                <span>£{calculateTotal()}</span>
                            </div>
                        </div>

                        {/* Payment & Shipping Form */}
                        <div style={{
                            flex: '1 1 400px',
                            backgroundColor: '#ffffff',
                            border: '1px solid #ddd',
                            borderRadius: '10px',
                            padding: '1.5rem'
                        }}>
                            <form onSubmit={handlePayment}>
                                <h2 style={{ marginBottom: '1.5rem' }}>💳 Payment Details</h2>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Payment Method</label>
                                    <select style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required>
                                        <option value="">Select Payment Method</option>
                                        <option value="card">Credit/Debit Card</option>
                                        <option value="paypal">PayPal</option>
                                        <option value="apple-pay">Apple Pay</option>
                                        <option value="google-pay">Google Pay</option>
                                    </select>
                                </div>

                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Name on Card</label>
                                    <input type="text" placeholder="John Doe" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                </div>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Card Number</label>
                                    <input type="text" placeholder="1234 5678 9012 3456" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Expiry</label>
                                        <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>CVC</label>
                                        <input type="text" placeholder="123" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                    </div>
                                </div>

                                <h3 style={{ marginBottom: '1rem' }}>🏠 Shipping Address</h3>
                                
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>First Name</label>
                                        <input type="text" placeholder="John" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Last Name</label>
                                        <input type="text" placeholder="Doe" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                    </div>
                                </div>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Street Address</label>
                                    <input type="text" placeholder="123 Garden Street" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                </div>
                                
                                <div style={{ marginBottom: '1rem' }}>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>City</label>
                                    <input type="text" placeholder="London" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                </div>
                                
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Postcode</label>
                                        <input type="text" placeholder="SW1A 1AA" style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Country</label>
                                        <select style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ddd' }} required>
                                            <option value="">Select Country</option>
                                            <option value="UK">United Kingdom</option>
                                            <option value="US">United States</option>
                                            <option value="CA">Canada</option>
                                            <option value="AU">Australia</option>
                                            <option value="DE">Germany</option>
                                            <option value="FR">France</option>
                                        </select>
                                    </div>
                                </div>

                                <button type="submit" style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '20px',
                                    fontSize: '1.1rem',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}>
                                    Complete Payment - £{calculateTotal()}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : showCart ? (
                <div style={{ 
                    padding: '1rem',
                    backgroundColor: '#f8f9fa',
                    minHeight: '100vh'
                }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                        {/* Header with back button */}
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '2rem',
                            backgroundColor: 'white',
                            padding: '1rem 1.5rem',
                            borderRadius: '10px',
                            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                        }}>
                            <button 
                                onClick={handleContinueShopping} 
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    padding: '12px 20px',
                                    borderRadius: '20px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#45a049';
                                    e.target.style.transform = 'translateY(-1px)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#4CAF50';
                                    e.target.style.transform = 'translateY(0)';
                                }}
                            >
                                ← Continue Shopping
                            </button>
                            
                            <div style={{ textAlign: 'center' }}>
                                <h1 style={{ 
                                    fontSize: '2.5rem', 
                                    color: '#4CAF50', 
                                    margin: '0',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontFamily: 'var(--secondary-font)'
                                }}>
                                    🛒 Shopping Cart
                                </h1>
                                <p style={{ margin: '0.5rem 0 0', color: '#666', fontSize: '1rem', fontFamily: 'var(--primary-font)' }}>
                                    {cart.length} unique item{cart.length !== 1 ? 's' : ''} • {getTotalItems()} total plant{getTotalItems() !== 1 ? 's' : ''}
                                </p>
                            </div>
                            
                            <div style={{ width: '160px' }}></div> {/* Spacer for centering */}
                        </div>

                        {cart.length === 0 ? (
                            <div style={{ 
                                backgroundColor: 'white',
                                padding: '4rem 2rem', 
                                borderRadius: '15px',
                                textAlign: 'center',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                margin: '2rem auto',
                                maxWidth: '500px'
                            }}>
                                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🌱</div>
                                <h2 style={{ color: '#666', marginBottom: '1rem', fontSize: '1.8rem' }}>Your cart is empty</h2>
                                <p style={{ fontSize: '1.1rem', color: '#999', marginBottom: '2rem' }}>
                                    Start adding some beautiful plants to your collection!
                                </p>
                                <button
                                    onClick={handleContinueShopping}
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        padding: '15px 30px',
                                        borderRadius: '25px',
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.backgroundColor = '#45a049';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.backgroundColor = '#4CAF50';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Explore Plants
                                </button>
                            </div>
                        ) : (
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'minmax(0, 1fr) 400px',
                                gap: '2rem',
                                alignItems: 'start'
                            }}
                            className="cart-layout"
                            >
                                {/* Cart Items */}
                                <div style={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    padding: '1.5rem',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
                                }}>
                                    <h3 style={{ 
                                        marginBottom: '1.5rem', 
                                        fontSize: '1.4rem',
                                        color: '#333',
                                        borderBottom: '2px solid #4CAF50',
                                        paddingBottom: '0.5rem'
                                    }}>
                                        Cart Items
                                    </h3>
                                    
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                        {cart.map((item, idx) => (
                                            <div key={idx} className="cart-item">
                                                {/* Plant Image */}
                                                <div style={{
                                                    width: '100px',
                                                    height: '100px',
                                                    borderRadius: '8px',
                                                    overflow: 'hidden',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                }}>
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        style={{ 
                                                            width: '100%', 
                                                            height: '100%', 
                                                            objectFit: 'cover'
                                                        }} 
                                                    />
                                                </div>

                                                {/* Plant Details */}
                                                <div style={{ minWidth: 0 }}>
                                                    <h4 style={{ 
                                                        margin: '0 0 0.5rem', 
                                                        fontSize: '1.2rem',
                                                        color: '#333',
                                                        fontWeight: '600'
                                                    }}>
                                                        {item.name}
                                                    </h4>
                                                    <p style={{ 
                                                        margin: '0 0 0.5rem', 
                                                        color: '#666',
                                                        fontSize: '0.9rem',
                                                        lineHeight: '1.4',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}>
                                                        {item.description}
                                                    </p>
                                                    <p style={{ 
                                                        margin: 0, 
                                                        fontSize: '1.1rem', 
                                                        fontWeight: 'bold', 
                                                        color: '#4CAF50'
                                                    }}>
                                                        {item.cost} each
                                                    </p>
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="quantity-controls">
                                                    <button
                                                        className="quantity-btn"
                                                        onClick={() => updateQuantity(item.name, item.quantity - 1)}
                                                    >
                                                        −
                                                    </button>
                                                    <span style={{
                                                        minWidth: '30px',
                                                        textAlign: 'center',
                                                        fontSize: '1.1rem',
                                                        fontWeight: '600',
                                                        color: '#333'
                                                    }}>
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        className="quantity-btn increase"
                                                        onClick={() => updateQuantity(item.name, item.quantity + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <div style={{ textAlign: 'right' }}>
                                                    <p style={{ 
                                                        margin: 0, 
                                                        fontSize: '1.2rem', 
                                                        fontWeight: 'bold', 
                                                        color: '#333'
                                                    }}>
                                                        £{(parseFloat(item.cost.replace('£', '').replace('$', '')) * item.quantity).toFixed(2)}
                                                    </p>
                                                </div>

                                                {/* Remove Button */}
                                                <button
                                                    className="remove-btn"
                                                    onClick={() => removeFromCart(item.name)}
                                                    title="Remove item"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary Sidebar */}
                                <div style={{
                                    backgroundColor: 'white',
                                    borderRadius: '10px',
                                    padding: '1.5rem',
                                    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                    position: 'sticky',
                                    top: '1rem',
                                    maxHeight: 'fit-content'
                                }}>
                                    <h3 style={{ 
                                        marginBottom: '1.5rem', 
                                        fontSize: '1.4rem',
                                        color: '#333',
                                        borderBottom: '2px solid #4CAF50',
                                        paddingBottom: '0.5rem'
                                    }}>
                                        💰 Order Summary
                                    </h3>
                                    
                                    <div style={{ marginBottom: '1rem' }}>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            marginBottom: '0.5rem',
                                            fontSize: '1rem',
                                            color: '#666'
                                        }}>
                                            <span>Items ({getTotalItems()}):</span>
                                            <span>£{calculateTotal()}</span>
                                        </div>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            marginBottom: '0.5rem',
                                            fontSize: '1rem',
                                            color: '#666'
                                        }}>
                                            <span>Shipping:</span>
                                            <span style={{ color: '#4CAF50', fontWeight: '600' }}>FREE</span>
                                        </div>
                                        <div style={{ 
                                            display: 'flex', 
                                            justifyContent: 'space-between', 
                                            marginBottom: '0.5rem',
                                            fontSize: '1rem',
                                            color: '#666'
                                        }}>
                                            <span>Tax:</span>
                                            <span>£{(parseFloat(calculateTotal()) * 0.2).toFixed(2)}</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{
                                        borderTop: '2px solid #4CAF50',
                                        paddingTop: '1rem',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <div style={{ 
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            fontSize: '1.4rem',
                                            fontWeight: 'bold',
                                            color: '#333'
                                        }}>
                                            <span>Total:</span>
                                            <span style={{ color: '#4CAF50' }}>
                                                £{(parseFloat(calculateTotal()) * 1.2).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        style={{
                                            backgroundColor: '#4CAF50',
                                            color: 'white',
                                            border: 'none',
                                            padding: '15px 20px',
                                            borderRadius: '25px',
                                            fontSize: '1.2rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            width: '100%',
                                            marginBottom: '1rem',
                                            transition: 'all 0.3s ease',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = '#45a049';
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.4)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = '#4CAF50';
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        🚀 Proceed to Checkout
                                    </button>

                                    {/* Security badges */}
                                    <div style={{
                                        textAlign: 'center',
                                        padding: '1rem 0',
                                        fontSize: '0.85rem',
                                        color: '#666',
                                        borderTop: '1px solid #eee'
                                    }}>
                                        <p style={{ margin: '0 0 0.5rem', fontWeight: '600' }}>
                                            🔒 Secure Checkout
                                        </p>
                                        <p style={{ margin: 0, lineHeight: '1.4' }}>
                                            Your payment information is encrypted and secure
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ) : showHome ? (
                <div style={{
                    minHeight: '80vh',
                    background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem'
                }}>
                    <div style={{
                        maxWidth: '800px',
                        textAlign: 'center',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        padding: '3rem',
                        borderRadius: '20px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h1 style={{
                            fontSize: '3rem',
                            color: '#2e7d32',
                            marginBottom: '1rem',
                            fontWeight: 'bold',
                            fontFamily: 'var(--secondary-font)'
                        }}>
                            🌿 Welcome to Paradise Nursery
                        </h1>
                        <p style={{
                            fontSize: '1.3rem',
                            color: '#1b5e20',
                            marginBottom: '2rem',
                            fontStyle: 'italic',
                            fontFamily: 'var(--secondary-font)'
                        }}>
                            Where green meets serenity!
                        </p>
                        
                        <div style={{ textAlign: 'left', fontSize: '1.1rem', lineHeight: '1.8', color: '#2e7d32', fontFamily: 'var(--primary-font)' }}>
                            <p style={{ marginBottom: '1.5rem' }}>
                                At Paradise Nursery, we are passionate about bringing nature closer to you. Our mission is to provide a wide range of 
                                high-quality plants that not only enhance the beauty of your surroundings but also contribute to a healthier and 
                                more sustainable lifestyle. From air-purifying plants to aromatic fragrant ones, we have something for every 
                                plant enthusiast.Join us in our mission to create a greener, healthier world. Visit Paradise Nursery today and experience the 
                                beauty of nature right at your doorstep.
                            </p>
                          
                        </div>
                        
                        <div style={{
                            display: 'flex',
                            gap: '1rem',
                            justifyContent: 'center',
                            flexWrap: 'wrap'
                        }}>
                            <button
                                onClick={handleShopClick}
                                style={{
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    padding: '1rem 2rem',
                                    borderRadius: '25px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                                    transition: 'all 0.3s ease'
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
                                🛒 Explore Our Plant Collection
                            </button>
                            
                            <button
                                onClick={handleAboutClick}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#4CAF50',
                                    border: '2px solid #4CAF50',
                                    padding: '1rem 2rem',
                                    borderRadius: '25px',
                                    fontSize: '1.1rem',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#4CAF50';
                                    e.target.style.color = 'white';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = 'transparent';
                                    e.target.style.color = '#4CAF50';
                                }}
                            >
                                🌱 Learn More About Us
                            </button>
                        </div>
                    </div>
                </div>
            ) : showAbout ? (
                <AboutUs />
            ) : showContact ? (
                <Contact />
            ) : showPlants ? (
                <div id="plant-section" className="product-grid">
                    {/* Compact Filter Bar */}
                    <div style={{
                        backgroundColor: '#fff',
                        padding: '1rem',
                        margin: '1rem 0',
                        borderRadius: '8px',
                        border: '1px solid #e9ecef',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            {/* Quick Search */}
                            <div style={{ flex: '1 1 250px', minWidth: '200px', position: 'relative' }}>
                                <svg 
                                    style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        width: '16px',
                                        height: '16px',
                                        color: '#4CAF50',
                                        pointerEvents: 'none'
                                    }}
                                    fill="currentColor" 
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search plants..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                                        borderRadius: '20px',
                                        border: '1px solid #ced4da',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#4CAF50';
                                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(76, 175, 80, 0.15)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#ced4da';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {/* Filter Toggle Button */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                {/* Active filters indicator */}
                                {(selectedCategory !== 'All' || priceSort !== 'none') && (
                                    <span style={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        borderRadius: '12px',
                                        padding: '0.25rem 0.5rem',
                                        fontSize: '0.75rem',
                                        fontWeight: 'bold'
                                    }}>
                                        {selectedCategory !== 'All' ? '1' : '0'}{priceSort !== 'none' ? '+1' : ''}
                                    </span>
                                )}
                                
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    style={{
                                        backgroundColor: showFilters ? '#4CAF50' : '#f8f9fa',
                                        color: showFilters ? 'white' : '#495057',
                                        border: '1px solid #ced4da',
                                        borderRadius: '6px',
                                        padding: '0.5rem 0.75rem',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        if (!showFilters) {
                                            e.target.style.backgroundColor = '#e9ecef';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (!showFilters) {
                                            e.target.style.backgroundColor = '#f8f9fa';
                                        }
                                    }}
                                >
                                    {/* Hamburger Icon */}
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="greenColor">
                                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                                    </svg>
                                    Filters
                                </button>
                            </div>
                        </div>

                        {/* Collapsible Filter Panel */}
                        {showFilters && (
                            <div style={{
                                marginTop: '1rem',
                                paddingTop: '1rem',
                                borderTop: '1px solid #e9ecef',
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                                gap: '1rem',
                                alignItems: 'end'
                            }}>
                                {/* Filter by Category */}
                                <div>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: '0.5rem', 
                                        fontWeight: '600', 
                                        fontSize: '0.85rem',
                                        color: '#495057'
                                    }}>
                                        📂 Category
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: '6px',
                                            border: '1px solid #ced4da',
                                            fontSize: '0.85rem',
                                            backgroundColor: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        {getAllCategories().map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort by Price */}
                                <div>
                                    <label style={{ 
                                        display: 'block', 
                                        marginBottom: '0.5rem', 
                                        fontWeight: '600', 
                                        fontSize: '0.85rem',
                                        color: '#495057'
                                    }}>
                                        💰 Sort by Price
                                    </label>
                                    <select
                                        value={priceSort}
                                        onChange={(e) => setPriceSort(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: '0.5rem',
                                            borderRadius: '6px',
                                            border: '1px solid #ced4da',
                                            fontSize: '0.85rem',
                                            backgroundColor: 'white',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <option value="none">No Sorting</option>
                                        <option value="low-high">Price: Low to High</option>
                                        <option value="high-low">Price: High to Low</option>
                                    </select>
                                </div>

                                {/* Clear Filters Button */}
                                <div>
                                    <button
                                        onClick={() => {
                                            setSearchTerm('');
                                            setSelectedCategory('All');
                                            setPriceSort('none');
                                        }}
                                        style={{
                                            backgroundColor: '#6c757d',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.5rem 1rem',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                            fontSize: '0.85rem',
                                            fontWeight: '600',
                                            transition: 'all 0.2s ease',
                                            width: '100%'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.backgroundColor = '#5a6268';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.backgroundColor = '#6c757d';
                                        }}
                                    >
                                        🗑️ Clear All
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Info */}
                    {(() => {
                        const filteredData = getFilteredAndSortedPlants();
                        const totalPlants = filteredData.reduce((acc, categoryObj) => acc + categoryObj.plants.length, 0);
                        
                        return (
                            <div style={{ margin: '1rem 0', color: '#666' }}>
                                <p style={{ fontSize: '0.9rem' }}>
                                    Showing {totalPlants} plant{totalPlants !== 1 ? 's' : ''}
                                    {selectedCategory !== 'All' && ` in ${selectedCategory}`}
                                    {searchTerm && ` matching "${searchTerm}"`}
                                </p>
                            </div>
                        );
                    })()}

                    {/* Plant Grid */}
                    {(() => {
                        const filteredData = getFilteredAndSortedPlants();
                        
                        if (filteredData.length === 0) {
                            return (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '3rem',
                                    backgroundColor: '#f8f9fa',
                                    borderRadius: '10px',
                                    margin: '2rem 0'
                                }}>
                                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
                                    <h3 style={{ color: '#6c757d', marginBottom: '0.5rem' }}>No plants found</h3>
                                    <p style={{ color: '#6c757d' }}>
                                        Try adjusting your search criteria or clearing the filters.
                                    </p>
                                </div>
                            );
                        }

                        return filteredData.map((categoryObj, index) => (
                        <div key={index} className="category-section">
                            <h2>{categoryObj.category}</h2>
                            <div className="plant-cards">
                                {categoryObj.plants.map((plant, idx) => (
                                    <div
                                        key={idx}
                                        className="plant-card"
                                        style={{ cursor: 'pointer', position: 'relative', display: 'flex', flexDirection: 'column' }}
                                    >
                                        <div onClick={() => handlePlantClick(plant)} style={{ flex: 1 }}>
                                            <img src={plant.image} alt={plant.name} />
                                            <h3>{plant.name}</h3>

                                            <p style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#2e7d32', marginBottom: '0.5rem' }}>
                                                {plant.cost}
                                            </p>
                                            <p
                                                style={{
                                                    color: plant.inStock ? 'green' : 'red',
                                                    fontWeight: 'bold',
                                                    fontSize: '0.9rem',
                                                    marginBottom: '1rem'
                                                }}
                                            >
                                                {plant.inStock ? 'In Stock' : 'Out of Stock'}
                                            </p>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(plant);
                                            }}
                                            disabled={!plant.inStock}
                                            style={{
                                                backgroundColor: plant.inStock ? '#4CAF50' : '#ccc',
                                                color: 'white',
                                                border: 'none',
                                                padding: '12px 20px',
                                                borderRadius: '25px',
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                cursor: plant.inStock ? 'pointer' : 'not-allowed',
                                                boxShadow: plant.inStock ? '0 3px 10px rgba(76, 175, 80, 0.3)' : 'none',
                                                transition: 'all 0.3s ease',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                width: '100%',
                                                marginTop: 'auto'
                                            }}
                                            onMouseOver={(e) => {
                                                if (plant.inStock) {
                                                    e.target.style.backgroundColor = '#45a049';
                                                    e.target.style.transform = 'translateY(-2px)';
                                                    e.target.style.boxShadow = '0 5px 15px rgba(76, 175, 80, 0.4)';
                                                }
                                            }}
                                            onMouseOut={(e) => {
                                                if (plant.inStock) {
                                                    e.target.style.backgroundColor = '#4CAF50';
                                                    e.target.style.transform = 'translateY(0)';
                                                    e.target.style.boxShadow = '0 3px 10px rgba(76, 175, 80, 0.3)';
                                                }
                                            }}
                                        >
                                            {plant.inStock ? 'Add to Cart' : 'Unavailable'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        ));
                    })()}
                </div>
            ) : (
                <div className="placeholder" style={{ padding: '2rem', textAlign: 'center' }}>
                    <p style={{ fontSize: '1.2rem', color: '#2e7d32' }}>
                        🌿 <strong>Paradise Nursery</strong> - Your Green Journey Starts Here
                    </p>
                </div>
            )}

            {/* Modal for Plant Detail */}
            {selectedPlant && (
                <div
                    className="modal-overlay"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000,
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        padding: '2rem',
                        overflowY: 'auto'
                    }}
                    onClick={closeModal}
                >
                    <div
                        className="modal-content"
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '20px',
                            maxWidth: '900px',
                            width: '100%',
                            maxHeight: '95vh',
                            position: 'relative',
                            boxShadow: '0 25px 80px rgba(0, 0, 0, 0.4)',
                            overflow: 'hidden',
                            display: 'grid',
                            gridTemplateColumns: '1fr 1fr',
                            minHeight: '600px'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '45px',
                                height: '45px',
                                fontSize: '1.8rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 1001,
                                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                                transition: 'all 0.3s ease',
                                color: '#666'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#f8f9fa';
                                e.target.style.transform = 'scale(1.1)';
                                e.target.style.color = '#333';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                                e.target.style.transform = 'scale(1)';
                                e.target.style.color = '#666';
                            }}
                            aria-label="Close modal"
                        >
                            ×
                        </button>

                        {/* Left Side - Plant Image */}
                        <div style={{
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <img
                                src={selectedPlant.image}
                                alt={selectedPlant.name}
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    objectFit: 'cover'
                                }}
                            />
                            {/* Stock Badge */}
                            <div style={{
                                position: 'absolute',
                                bottom: '20px',
                                left: '20px',
                                backgroundColor: selectedPlant.inStock ? 'rgba(76, 175, 80, 0.95)' : 'rgba(244, 67, 54, 0.95)',
                                color: 'white',
                                padding: '8px 16px',
                                borderRadius: '25px',
                                fontSize: '14px',
                                fontWeight: '600',
                                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                                backdropFilter: 'blur(10px)'
                            }}>
                                {selectedPlant.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                            </div>
                        </div>

                        {/* Right Side - Plant Details */}
                        <div style={{
                            padding: '25px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            gap: '15px'
                        }}>
                            {/* Header Section */}
                            <div>
                                <h1 style={{
                                    fontSize: '2rem',
                                    fontWeight: '700',
                                    color: '#2c3e50',
                                    margin: '0 0 15px 0',
                                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                                    lineHeight: '1.2'
                                }}>
                                    {selectedPlant.name}
                                </h1>

                                {/* Plant Description */}
                                <div style={{ marginBottom: '15px' }}>
                                    <h3 style={{
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: '#34495e',
                                        margin: '0 0 8px 0',
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}>
                                        About this plant
                                    </h3>
                                    <p style={{
                                        fontSize: '0.85rem',
                                        color: '#5a6c7d',
                                        lineHeight: '1.4',
                                        margin: 0,
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}>
                                        {selectedPlant.description}
                                    </p>
                                </div>

                                {/* Additional Plant Details */}
                                <div style={{ marginBottom: '15px' }}>
                                    <h3 style={{
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: '#34495e',
                                        margin: '0 0 8px 0',
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}>
                                        Care Information
                                    </h3>
                                    <div style={{
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr',
                                        gap: '8px',
                                        fontSize: '0.8rem',
                                        color: '#5a6c7d',
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}>
                                        <div>
                                            <strong style={{ color: '#34495e' }}>Light:</strong> Bright indirect
                                        </div>
                                        <div>
                                            <strong style={{ color: '#34495e' }}>Water:</strong> Weekly
                                        </div>
                                        <div>
                                            <strong style={{ color: '#34495e' }}>Humidity:</strong> Medium
                                        </div>
                                        <div>
                                            <strong style={{ color: '#34495e' }}>Pet Safe:</strong> {selectedPlant.name.includes('Snake') ? 'No' : 'Yes'}
                                        </div>
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div style={{ marginBottom: '15px' }}>
                                    <h3 style={{
                                        fontSize: '0.95rem',
                                        fontWeight: '600',
                                        color: '#34495e',
                                        margin: '0 0 8px 0',
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}>
                                        Benefits
                                    </h3>
                                    <ul style={{
                                        margin: 0,
                                        padding: '0 0 0 15px',
                                        fontSize: '0.8rem',
                                        color: '#5a6c7d',
                                        lineHeight: '1.3',
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}>
                                        <li style={{ marginBottom: '4px' }}>Improves indoor air quality</li>
                                        <li style={{ marginBottom: '4px' }}>Low maintenance and beginner-friendly</li>
                                        <li style={{ marginBottom: '4px' }}>Adds natural beauty to your space</li>
                                        <li style={{ marginBottom: '0' }}>Reduces stress and promotes well-being</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Bottom Section - Quantity and Actions */}
                            {selectedPlant.inStock && (
                                <div style={{ 
                                    marginTop: 'auto',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0'
                                }}>
                                    {/* Quantity and Total Combined */}
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '15px',
                                        marginBottom: '15px'
                                    }}>
                                        {/* Quantity Selector */}
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            padding: '10px 0'
                                        }}>
                                            <span style={{
                                                fontSize: '1rem',
                                                fontWeight: '600',
                                                color: '#34495e',
                                                fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                            }}>
                                                Quantity:
                                            </span>
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px'
                                            }}>
                                                <button
                                                    onClick={decreaseModalQuantity}
                                                    style={{
                                                        backgroundColor: '#ecf0f1',
                                                        color: '#34495e',
                                                        border: 'none',
                                                        borderRadius: '15px',
                                                        width: '30px',
                                                        height: '30px',
                                                        fontSize: '1rem',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.backgroundColor = '#bdc3c7';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.backgroundColor = '#ecf0f1';
                                                    }}
                                                >
                                                    −
                                                </button>
                                                <span style={{
                                                    fontSize: '1.1rem',
                                                    fontWeight: '600',
                                                    color: '#2c3e50',
                                                    minWidth: '25px',
                                                    textAlign: 'center',
                                                    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                                }}>
                                                    {modalQuantity}
                                                </span>
                                                <button
                                                    onClick={increaseModalQuantity}
                                                    style={{
                                                        backgroundColor: '#27ae60',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '15px',
                                                        width: '30px',
                                                        height: '30px',
                                                        fontSize: '1rem',
                                                        fontWeight: 'bold',
                                                        cursor: 'pointer',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                    onMouseOver={(e) => {
                                                        e.target.style.backgroundColor = '#229954';
                                                    }}
                                                    onMouseOut={(e) => {
                                                        e.target.style.backgroundColor = '#27ae60';
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        {/* Total Price */}
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            fontSize: '1rem',
                                            fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
                                            padding: '10px 0',
                                            borderTop: '1px solid #e9ecef',
                                            borderBottom: '1px solid #e9ecef'
                                        }}>
                                            <span style={{ color: '#34495e', fontWeight: '600' }}>Total:</span>
                                            <span style={{ color: '#27ae60', fontWeight: '700', fontSize: '1.2rem' }}>
                                                £{(parseFloat(selectedPlant.cost.replace('£', '').replace('$', '')) * modalQuantity).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '15px'
                            }}>
                                <button
                                    onClick={closeModal}
                                    style={{
                                        flex: '1',
                                        backgroundColor: '#95a5a6',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 15px',
                                        borderRadius: '20px',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}
                                    onMouseOver={(e) => {
                                        e.target.style.backgroundColor = '#7f8c8d';
                                        e.target.style.transform = 'translateY(-2px)';
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.style.backgroundColor = '#95a5a6';
                                        e.target.style.transform = 'translateY(0)';
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        handleAddToCart(selectedPlant);
                                        closeModal();
                                        setShowCart(false);
                                        setShowPlants(false);
                                        setShowCheckout(true);
                                    }}
                                    disabled={!selectedPlant.inStock}
                                    style={{
                                        flex: '2',
                                        backgroundColor: selectedPlant.inStock ? '#27ae60' : '#bdc3c7',
                                        color: 'white',
                                        border: 'none',
                                        padding: '12px 15px',
                                        borderRadius: '20px',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        cursor: selectedPlant.inStock ? 'pointer' : 'not-allowed',
                                        transition: 'all 0.3s ease',
                                        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
                                    }}
                                    onMouseOver={(e) => {
                                        if (selectedPlant.inStock) {
                                            e.target.style.backgroundColor = '#229954';
                                            e.target.style.transform = 'translateY(-2px)';
                                        }
                                    }}
                                    onMouseOut={(e) => {
                                        if (selectedPlant.inStock) {
                                            e.target.style.backgroundColor = '#27ae60';
                                            e.target.style.transform = 'translateY(0)';
                                        }
                                    }}
                                >
                                    {selectedPlant.inStock ? `Checkout Now` : 'Unavailable'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Item Added Modal */}
            {showModal && (
                <ItemAddedModal
                    itemName={lastAddedItem}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}

ProductList.propTypes = {
    startWithShop: PropTypes.bool,
};

export default ProductList;
