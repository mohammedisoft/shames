document.addEventListener('DOMContentLoaded', function() {
    initToyStore();
    createFloatingToys();
    init3DProductCards();
    initCartSystem();
});

function initToyStore() {
    showWelcomeAnimation();
}

function showWelcomeAnimation() {
    const welcomeDiv = document.createElement('div');
    welcomeDiv.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                    background: linear-gradient(135deg, #FF6B9D 0%, #FEC84E 100%);
                    display: flex; align-items: center; justify-content: center;
                    z-index: 10000; animation: fadeOut 3s ease-in-out forwards;">
            <h1 style="color: white; font-size: 3rem; font-family: 'Cairo', sans-serif;">
                🎈 مرحباً بك في عالم الألعاب! 🎁
            </h1>
        </div>
    `;
    document.body.appendChild(welcomeDiv);
    setTimeout(() => welcomeDiv.remove(), 3000);
}

function createFloatingToys() {
    const floatingContainer = document.createElement('div');
    floatingContainer.className = 'floating-toys';
    floatingContainer.style.cssText = 'position: fixed; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none; z-index: 1;';
    
    const toys = ['🎈', '🎁', '🧸', '🚂', '🎨', '⚽', '🎪', '🎯'];
    toys.forEach((toy, i) => {
        const element = document.createElement('div');
        element.textContent = toy;
        element.style.cssText = `
            position: absolute;
            font-size: 3rem;
            opacity: 0.3;
            animation: floatAround 15s ease-in-out infinite;
            animation-delay: ${i * 2}s;
            left: ${Math.random() * 90}%;
            top: ${Math.random() * 90}%;
        `;
        floatingContainer.appendChild(element);
    });
    
    document.body.appendChild(floatingContainer);
}

function init3DProductCards() {
    document.querySelectorAll('.product-card-3d').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.querySelector('.product-card-inner').style.transform = 
                `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.querySelector('.product-card-inner').style.transform = '';
        });
    });
}

function initCartSystem() {
    let cartCount = 0;
    
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            cartCount++;
            
            const badge = document.querySelector('.cart-badge');
            if (badge) badge.textContent = cartCount;
            
            showSuccessMessage('تمت الإضافة للسلة! 🎉');
        });
    });
}

function showSuccessMessage(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed; top: 100px; left: 50%; transform: translateX(-50%);
        background: linear-gradient(135deg, #7ED957 0%, #95E1D3 100%);
        color: white; padding: 20px 40px; border-radius: 50px;
        font-family: 'Cairo', sans-serif; font-size: 1.2rem;
        box-shadow: 0 10px 30px rgba(126, 217, 87, 0.4);
        z-index: 10000; animation: toastSlide 3s ease-in-out forwards;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
