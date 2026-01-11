// Mobile Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Advanced Filter Toggle
const advancedFilterBtn = document.getElementById('advancedFilterBtn');
const advancedFilterSection = document.getElementById('advancedFilterSection');

if (advancedFilterBtn && advancedFilterSection) {
    advancedFilterBtn.addEventListener('click', () => {
        const isHidden = advancedFilterSection.style.display === 'none';
        advancedFilterSection.style.display = isHidden ? 'block' : 'none';
        advancedFilterBtn.textContent = isHidden ? 'Advanced Filter <' : 'Advanced Filter >';
    });
}

// Search Form Functionality (works on all pages)
const searchForm = document.getElementById('searchForm');

if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(searchForm);
        const searchData = {};
        
        // Get all form fields dynamically
        for (let [key, value] of formData.entries()) {
            searchData[key] = value;
        }
        
        // In a real application, this would send data to a backend
        console.log('Search submitted:', searchData);
        
        // Show alert for demo purposes
        const hasCriteria = Object.values(searchData).some(val => val);
        if (hasCriteria) {
            const pageType = window.location.pathname.includes('bikes') ? 'bikes' : 
                           window.location.pathname.includes('autostore') ? 'products' : 'cars';
            alert(`Search functionality would filter ${pageType} based on your criteria. This is a frontend prototype.`);
        } else {
            alert('Please select at least one search criteria.');
        }
    });
}

// Make dropdowns functional - add visual feedback
const searchSelects = document.querySelectorAll('.search-select');
searchSelects.forEach(select => {
    select.addEventListener('change', function() {
        if (this.value) {
            this.style.borderColor = 'var(--primary-color)';
        } else {
            this.style.borderColor = 'var(--border-gray)';
        }
    });
    
    select.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
    
    select.addEventListener('blur', function() {
        if (!this.value) {
            this.style.borderColor = 'var(--border-gray)';
        }
    });
});

// Load More Functionality (works for cars, bikes, and products)
const loadMoreBtn = document.getElementById('loadMoreBtn');

// Dummy data for different page types
const dummyCars = [
    { image: 'https://placehold.co/300x200/e30613/white?text=Toyota+Vitz+2018', title: 'Toyota Vitz 2018', price: 'PKR 2,200,000', location: '📍 Peshawar, KPK', details: '18,000 km • Automatic • 1.0L', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Honda+Accord+2019', title: 'Honda Accord 2019', price: 'PKR 4,800,000', location: '📍 Karachi, Sindh', details: '22,000 km • Automatic • 2.0L', seller: 'Owner' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Suzuki+WagonR+2020', title: 'Suzuki WagonR 2020', price: 'PKR 1,900,000', location: '📍 Lahore, Punjab', details: '15,000 km • Manual • 1.0L', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Nissan+March+2017', title: 'Nissan March 2017', price: 'PKR 1,500,000', location: '📍 Islamabad, Capital', details: '35,000 km • Manual • 1.2L', seller: 'Owner' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Mitsubishi+Mirage+2019', title: 'Mitsubishi Mirage 2019', price: 'PKR 2,300,000', location: '📍 Rawalpindi, Punjab', details: '20,000 km • CVT • 1.2L', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Toyota+Aqua+2020', title: 'Toyota Aqua 2020', price: 'PKR 3,200,000', location: '📍 Faisalabad, Punjab', details: '12,000 km • Hybrid • 1.5L', seller: 'Owner' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Honda+Fit+2018', title: 'Honda Fit 2018', price: 'PKR 2,600,000', location: '📍 Multan, Punjab', details: '25,000 km • CVT • 1.3L', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Suzuki+Mehran+2016', title: 'Suzuki Mehran 2016', price: 'PKR 800,000', location: '📍 Gujranwala, Punjab', details: '50,000 km • Manual • 0.8L', seller: 'Owner' }
];

const dummyBikes = [
    { image: 'https://placehold.co/300x200/e30613/white?text=Honda+CD125+2020', title: 'Honda CD 125 2020', price: 'PKR 98,000', location: '📍 Sialkot, Punjab', details: '11,000 km • Manual • 125 CC', seller: 'Owner' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Yamaha+YZF+R3+2021', title: 'Yamaha YZF R3 2021', price: 'PKR 550,000', location: '📍 Karachi, Sindh', details: '4,000 km • Manual • 321 CC', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Suzuki+GSX150+2019', title: 'Suzuki GSX 150 2019', price: 'PKR 180,000', location: '📍 Lahore, Punjab', details: '14,000 km • Manual • 150 CC', seller: 'Owner' },
    { image: 'https://placehold.co/300x200/e30613/white?text=United+US125+2020', title: 'United US 125 2020', price: 'PKR 88,000', location: '📍 Rawalpindi, Punjab', details: '9,000 km • Manual • 125 CC', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Road+Prince+RP125+2021', title: 'Road Prince RP 125 2021', price: 'PKR 75,000', location: '📍 Faisalabad, Punjab', details: '6,000 km • Manual • 125 CC', seller: 'Owner' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Honda+CB150F+2019', title: 'Honda CB 150F 2019', price: 'PKR 130,000', location: '📍 Multan, Punjab', details: '16,000 km • Manual • 150 CC', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Kawasaki+Ninja+300+2020', title: 'Kawasaki Ninja 300 2020', price: 'PKR 720,000', location: '📍 Islamabad, Capital', details: '7,000 km • Manual • 296 CC', seller: 'Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Yamaha+MT15+2021', title: 'Yamaha MT-15 2021', price: 'PKR 380,000', location: '📍 Peshawar, KPK', details: '5,000 km • Manual • 155 CC', seller: 'Owner' }
];

const dummyProducts = [
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Brake+Pads', title: 'Brake Pads Set (Front)', price: 'PKR 4,500', location: '📍 Karachi, Sindh', details: 'New • Ceramic • Universal', seller: 'Parts Store' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Oil+Filter', title: 'Oil Filter (Universal)', price: 'PKR 800', location: '📍 Lahore, Punjab', details: 'New • High Quality', seller: 'Auto Store' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Spark+Plugs', title: 'Spark Plugs Set (4 Pcs)', price: 'PKR 2,200', location: '📍 Islamabad, Capital', details: 'New • Iridium', seller: 'Parts Dealer' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Windshield', title: 'Windshield Glass', price: 'PKR 22,000', location: '📍 Rawalpindi, Punjab', details: 'New • Tempered Glass', seller: 'Glass Shop' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Radiator', title: 'Car Radiator', price: 'PKR 18,000', location: '📍 Faisalabad, Punjab', details: 'New • Aluminum', seller: 'Cooling Parts' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Shock+Absorber', title: 'Shock Absorber (Pair)', price: 'PKR 12,000', location: '📍 Multan, Punjab', details: 'New • Gas Filled', seller: 'Suspension Shop' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Alternator', title: 'Car Alternator', price: 'PKR 28,000', location: '📍 Karachi, Sindh', details: 'New • 90A', seller: 'Electrical Parts' },
    { image: 'https://placehold.co/300x200/e30613/white?text=Car+Starter+Motor', title: 'Starter Motor', price: 'PKR 15,000', location: '📍 Lahore, Punjab', details: 'New • High Torque', seller: 'Auto Parts' }
];

let currentIndex = 0;
let currentData = [];

if (loadMoreBtn) {
    // Determine which page we're on and set appropriate data
    const pagePath = window.location.pathname;
    if (pagePath.includes('bikes.html')) {
        currentData = dummyBikes;
    } else if (pagePath.includes('autostore.html')) {
        currentData = dummyProducts;
    } else {
        currentData = dummyCars;
    }

    // Find the listings container
    const listingsContainer = document.getElementById('carListings') || 
                              document.getElementById('bikeListings') || 
                              document.getElementById('productListings') ||
                              document.getElementById('latestListings');

    if (listingsContainer) {
        loadMoreBtn.addEventListener('click', () => {
            const itemsToLoad = 4;
            let loaded = 0;
            
            while (loaded < itemsToLoad && currentIndex < currentData.length) {
                const item = currentData[currentIndex];
                
                // Create card element
                const card = document.createElement('div');
                card.className = 'card';
                
                // Check if seller field exists for this item type
                const sellerHtml = item.seller ? `<p class="card-seller">${item.seller}</p>` : '';
                
                card.innerHTML = `
                    <div class="card-image">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-price">${item.price}</p>
                        <p class="card-location">${item.location}</p>
                        <p class="card-details">${item.details}</p>
                        ${sellerHtml}
                    </div>
                `;
                
                // Add animation
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                listingsContainer.appendChild(card);
                
                // Animate in
                setTimeout(() => {
                    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
                
                currentIndex++;
                loaded++;
            }
            
            // Hide button if all items are loaded
            if (currentIndex >= currentData.length) {
                loadMoreBtn.style.display = 'none';
            }
            
            // Scroll to newly loaded cards
            setTimeout(() => {
                const newCards = listingsContainer.querySelectorAll('.card');
                if (newCards.length > 0) {
                    newCards[newCards.length - 1].scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'nearest' 
                    });
                }
            }, 100);
        });
    }
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navMenu && hamburger) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        }
    });
});

// Add scroll effect to navbar (works for both .navbar and .unified-navbar)
const navbar = document.querySelector('.navbar') || document.querySelector('.unified-navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Add loading animation to cards on page load
window.addEventListener('load', () => {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Add click handlers to cards for interactivity
document.addEventListener('DOMContentLoaded', () => {
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.card-title')?.textContent;
            if (title) {
                console.log('Card clicked:', title);
                // In a real application, this would navigate to car details page
            }
        });
    });
});

// Prevent form submission on Enter key in selects (for better UX)
if (searchSelects.length > 0) {
    searchSelects.forEach(select => {
        select.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                select.blur();
            }
        });
    });
}
