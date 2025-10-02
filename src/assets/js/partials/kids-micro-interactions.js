/**
 * Kids Micro Interactions
 * التفاعلات المصغرة والتأثيرات اللطيفة للأطفال
 */

import { gsap } from 'gsap';

class KidsMicroInteractions {
    constructor() {
        this.soundEnabled = false; // يمكن تفعيله لاحقاً
        this.particles = [];
        this.init();
    }

    init() {
        this.setupClickEffects();
        this.setupHoverEffects();
        this.setupScrollMagic();
        this.setupFormInteractions();
        this.setupLoadingAnimations();
        this.setupSuccessAnimations();
        this.setupParticleSystem();
        this.setupEasterEggs();
    }

    /**
     * تأثيرات النقر المرحة
     */
    setupClickEffects() {
        // تأثير النقر العام
        document.addEventListener('click', (e) => {
            this.createClickRipple(e);
            this.createFloatingEmoji(e);
        });

        // تأثيرات خاصة للأزرار
        document.querySelectorAll('button, .btn, .clickable').forEach(button => {
            button.addEventListener('click', (e) => {
                this.animateButtonClick(button, e);
            });
        });

        // تأثيرات للروابط
        document.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.href.includes('#')) {
                    this.createLinkTransition(link, e);
                }
            });
        });
    }

    /**
     * تأثيرات التمرير الممتعة
     */
    setupHoverEffects() {
        // تأثير الهوفر للصور
        document.querySelectorAll('img, .hover-effect').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                this.createHoverGlow(element);
                this.addHoverParticles(element);
            });

            element.addEventListener('mouseleave', (e) => {
                this.removeHoverGlow(element);
            });
        });

        // تأثير الهوفر للكروت
        document.querySelectorAll('.card, .product-card, .category-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.animateCardHover(card, true);
            });

            card.addEventListener('mouseleave', () => {
                this.animateCardHover(card, false);
            });
        });
    }

    /**
     * سحر التمرير
     */
    setupScrollMagic() {
        let ticking = false;

        const updateOnScroll = () => {
            this.createScrollTrail();
            this.updateParallaxElements();
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        // تأثيرات ظهور العناصر عند التمرير
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElementAppearance(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll, .product-card, .category-banner').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * تفاعلات النماذج المرحة
     */
    setupFormInteractions() {
        // تأثيرات حقول الإدخال
        document.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('focus', () => {
                this.animateFieldFocus(field, true);
            });

            field.addEventListener('blur', () => {
                this.animateFieldFocus(field, false);
            });

            field.addEventListener('input', () => {
                this.createTypingEffect(field);
            });
        });

        // تأثيرات checkboxes و radio buttons
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
            input.addEventListener('change', () => {
                this.animateCheckbox(input);
            });
        });
    }

    /**
     * أنيميشن التحميل الطفولي
     */
    setupLoadingAnimations() {
        const loadingElements = document.querySelectorAll('.loading, .spinner, .skeleton');
        
        loadingElements.forEach(element => {
            this.createKidsLoader(element);
        });
    }

    /**
     * أنيميشن النجاح والتقدير
     */
    setupSuccessAnimations() {
        // مراقبة إضافة العناصر إلى السلة
        document.addEventListener('product-added-to-cart', (e) => {
            this.celebrateSuccess(e.detail.element);
        });

        // مراقبة نجاح النماذج
        document.addEventListener('form-success', (e) => {
            this.showSuccessAnimation(e.detail.form);
        });
    }

    /**
     * نظام الجزيئات التفاعلي
     */
    setupParticleSystem() {
        this.particleCanvas = this.createParticleCanvas();
        this.startParticleAnimation();
    }

    /**
     * البيض الشرقي المخفي للمرح
     */
    setupEasterEggs() {
        let clickCount = 0;
        let lastClickTime = 0;

        // النقر السريع للمفاجآت
        document.addEventListener('click', (e) => {
            const now = Date.now();
            if (now - lastClickTime < 500) {
                clickCount++;
                if (clickCount >= 5) {
                    this.triggerEasterEgg(e);
                    clickCount = 0;
                }
            } else {
                clickCount = 1;
            }
            lastClickTime = now;
        });

        // اختصار لوحة المفاتيح السري
        let secretCode = [];
        const target = ['k', 'i', 'd', 's']; // كلمة "kids"
        
        document.addEventListener('keydown', (e) => {
            secretCode.push(e.key.toLowerCase());
            if (secretCode.length > target.length) {
                secretCode = secretCode.slice(-target.length);
            }
            
            if (secretCode.join('') === target.join('')) {
                this.triggerSpecialAnimation();
                secretCode = [];
            }
        });
    }

    /**
     * إنشاء تأثير التموج عند النقر
     */
    createClickRipple(event) {
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        
        const colors = ['#22C55E', '#4F9AFF', '#FF8FA3', '#FFE066', '#A855F7'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        ripple.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${randomColor};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX - 5}px;
            top: ${event.clientY - 5}px;
            box-shadow: 0 0 10px ${randomColor};
        `;
        
        document.body.appendChild(ripple);
        
        gsap.to(ripple, {
            scale: 8,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => ripple.remove()
        });
    }

    /**
     * إنشاء إيموجي طائر عشوائي
     */
    createFloatingEmoji(event) {
        if (Math.random() > 0.3) return; // 30% فرصة للظهور
        
        const emojis = ['⭐', '🎈', '🎉', '🌟', '💫', '🦄', '🌈', '🎨', '🧸', '🎮'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        
        const emoji = document.createElement('div');
        emoji.textContent = randomEmoji;
        emoji.style.cssText = `
            position: fixed;
            font-size: 24px;
            pointer-events: none;
            z-index: 9999;
            left: ${event.clientX - 12}px;
            top: ${event.clientY - 12}px;
        `;
        
        document.body.appendChild(emoji);
        
        gsap.to(emoji, {
            y: -100,
            x: (Math.random() - 0.5) * 100,
            rotation: 360,
            scale: 0,
            duration: 2,
            ease: "power2.out",
            onComplete: () => emoji.remove()
        });
    }

    /**
     * تحريك نقرة الزر
     */
    animateButtonClick(button, event) {
        // تأثير الضغط
        gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.out"
        });

        // إنشاء جزيئات ملونة
        this.createButtonParticles(button, event);
        
        // تأثير الموجة
        this.createButtonWave(button, event);
    }

    /**
     * إنشاء جزيئات الزر
     */
    createButtonParticles(button, event) {
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'button-particle';
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: #22C55E;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const distance = 50 + Math.random() * 30;
            
            gsap.to(particle, {
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: 0,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    }

    /**
     * إنشاء موجة الزر
     */
    createButtonWave(button, event) {
        const rect = button.getBoundingClientRect();
        const wave = document.createElement('div');
        
        wave.style.cssText = `
            position: absolute;
            width: 20px;
            height: 20px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            left: ${event.clientX - rect.left - 10}px;
            top: ${event.clientY - rect.top - 10}px;
            z-index: 100;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(wave);
        
        gsap.to(wave, {
            scale: 10,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            onComplete: () => wave.remove()
        });
    }

    /**
     * إنشاء توهج التمرير
     */
    createHoverGlow(element) {
        gsap.to(element, {
            filter: 'brightness(1.1) saturate(1.2) drop-shadow(0 4px 12px rgba(34, 197, 94, 0.3))',
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    /**
     * إزالة توهج التمرير
     */
    removeHoverGlow(element) {
        gsap.to(element, {
            filter: 'brightness(1) saturate(1) drop-shadow(0 0 0 rgba(0, 0, 0, 0))',
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    }

    /**
     * إضافة جزيئات التمرير
     */
    addHoverParticles(element) {
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 6px;
                height: 6px;
                background: #FFE066;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                opacity: 0.8;
            `;
            
            document.body.appendChild(particle);
            
            gsap.to(particle, {
                y: -50,
                x: (Math.random() - 0.5) * 40,
                scale: 0,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out",
                onComplete: () => particle.remove()
            });
        }
    }

    /**
     * تحريك ظهور العنصر
     */
    animateElementAppearance(element) {
        if (element.classList.contains('animate-appeared')) return;
        
        element.classList.add('animate-appeared');
        
        gsap.fromTo(element, 
            {
                opacity: 0,
                y: 50,
                scale: 0.8,
                rotationY: -15
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 0.8,
                ease: "back.out(1.7)"
            }
        );
    }

    /**
     * الاحتفال بالنجاح
     */
    celebrateSuccess(element) {
        // انفجار الكونفيتي
        this.createConfettiExplosion(element);
        
        // رسالة نجاح مرحة
        this.showSuccessMessage('تمت الإضافة بنجاح! 🎉');
        
        // اهتزاز مرح
        gsap.to(element, {
            rotation: 5,
            duration: 0.1,
            yoyo: true,
            repeat: 5,
            ease: "power2.inOut"
        });
    }

    /**
     * إنشاء انفجار الكونفيتي
     */
    createConfettiExplosion(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const colors = ['#22C55E', '#4F9AFF', '#FF8FA3', '#FFE066', '#A855F7'];
        
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                pointer-events: none;
                z-index: 9999;
                left: ${centerX}px;
                top: ${centerY}px;
            `;
            
            document.body.appendChild(confetti);
            
            const angle = (Math.random() * Math.PI * 2);
            const velocity = 100 + Math.random() * 100;
            const gravity = 300;
            
            gsap.to(confetti, {
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                rotation: Math.random() * 720,
                duration: 0.3,
                ease: "power2.out"
            });
            
            gsap.to(confetti, {
                y: `+=${gravity}`,
                duration: 1.5,
                ease: "power2.in",
                delay: 0.3,
                onComplete: () => confetti.remove()
            });
        }
    }

    /**
     * عرض رسالة النجاح
     */
    showSuccessMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #22C55E, #4ADE80);
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            font-family: 'Nunito', sans-serif;
            font-weight: bold;
            box-shadow: 0 8px 32px rgba(34, 197, 94, 0.3);
            z-index: 9999;
            transform: translateX(100%);
        `;
        
        document.body.appendChild(messageEl);
        
        gsap.to(messageEl, {
            x: 0,
            duration: 0.5,
            ease: "back.out(1.7)"
        });
        
        setTimeout(() => {
            gsap.to(messageEl, {
                x: '100%',
                duration: 0.5,
                ease: "back.in(1.7)",
                onComplete: () => messageEl.remove()
            });
        }, 3000);
    }

    /**
     * إطلاق البيضة الشرقية
     */
    triggerEasterEgg(event) {
        // مطر من الألعاب
        this.createToyRain();
        
        // رسالة مفاجأة
        this.showSurpriseMessage('وجدت المفاجأة! 🎮✨');
    }

    /**
     * إنشاء مطر الألعاب
     */
    createToyRain() {
        const toys = ['🧸', '🎮', '🎲', '🚂', '🚗', '✈️', '🚁', '🎯', '🎨', '📚'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const toy = document.createElement('div');
                toy.textContent = toys[Math.floor(Math.random() * toys.length)];
                toy.style.cssText = `
                    position: fixed;
                    font-size: 30px;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${Math.random() * window.innerWidth}px;
                    top: -50px;
                `;
                
                document.body.appendChild(toy);
                
                gsap.to(toy, {
                    y: window.innerHeight + 50,
                    rotation: 720,
                    duration: 3 + Math.random() * 2,
                    ease: "power2.in",
                    onComplete: () => toy.remove()
                });
            }, i * 200);
        }
    }

    /**
     * إنشاء لودر طفولي
     */
    createKidsLoader(element) {
        element.innerHTML = `
            <div class="kids-loader">
                <div class="loader-toy">🎮</div>
                <div class="loader-text">جاري التحميل...</div>
            </div>
        `;
        
        const toy = element.querySelector('.loader-toy');
        
        gsap.to(toy, {
            rotation: 360,
            scale: 1.2,
            duration: 1,
            repeat: -1,
            ease: "power2.inOut",
            yoyo: true
        });
    }

    /**
     * تنظيف الموارد
     */
    cleanup() {
        // إزالة جميع العناصر المؤقتة
        document.querySelectorAll('.click-ripple, .button-particle, .kids-loader').forEach(el => {
            el.remove();
        });
        
        // إيقاف جميع الحركات
        gsap.killTweensOf("*");
    }
}

// تصدير الكلاس
window.KidsMicroInteractions = KidsMicroInteractions;

// إنشاء مثيل عام
window.kidsMicroInteractions = new KidsMicroInteractions();

export default KidsMicroInteractions;