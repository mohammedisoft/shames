/**
 * Kids Icons Manager
 * إدارة الأيقونات الطفولية وتحريكها
 */

class KidsIconsManager {
    constructor() {
        this.icons = new Map();
        this.animations = new Map();
        this.init();
    }

    init() {
        // تحديد الأيقونات المتاحة
        this.icons.set('building-blocks', {
            path: '/images/icons/building-blocks.svg',
            name: 'ألعاب البناء والتركيب',
            category: 'construction',
            colors: ['#22C55E', '#FFB84D', '#4F9AFF']
        });

        this.icons.set('puzzle-game', {
            path: '/images/icons/puzzle-game.svg',
            name: 'البازل والألغاز',
            category: 'puzzle',
            colors: ['#FF8FA3', '#A855F7', '#22C55E', '#FFE066']
        });

        this.icons.set('learning-abc', {
            path: '/images/icons/learning-abc.svg',
            name: 'تعلم الحروف والأرقام',
            category: 'education',
            colors: ['#4F9AFF', '#FF8FA3', '#FFE066']
        });

        this.icons.set('art-colors', {
            path: '/images/icons/art-colors.svg',
            name: 'الألوان والرسم',
            category: 'art',
            colors: ['#FF6B8A', '#4F9AFF', '#22C55E', '#FFE066', '#A855F7']
        });

        this.icons.set('science-lab', {
            path: '/images/icons/science-lab.svg',
            name: 'العلوم والتجارب',
            category: 'science',
            colors: ['#4F9AFF', '#22C55E', '#FF8FA3', '#FFE066', '#A855F7']
        });

        this.icons.set('music-sound', {
            path: '/images/icons/music-sound.svg',
            name: 'الموسيقى والأصوات',
            category: 'music',
            colors: ['#4F9AFF', '#FF8FA3', '#22C55E', '#FFE066', '#A855F7']
        });

        this.setupEventListeners();
        this.startGlobalAnimations();
    }

    /**
     * الحصول على أيقونة بالاسم
     */
    getIcon(name) {
        return this.icons.get(name);
    }

    /**
     * الحصول على جميع الأيقونات
     */
    getAllIcons() {
        return Array.from(this.icons.values());
    }

    /**
     * الحصول على الأيقونات بالفئة
     */
    getIconsByCategory(category) {
        return Array.from(this.icons.values()).filter(icon => icon.category === category);
    }

    /**
     * إنشاء عنصر أيقونة HTML
     */
    createIconElement(iconName, options = {}) {
        const icon = this.getIcon(iconName);
        if (!icon) return null;

        const {
            size = 60,
            className = '',
            animated = true,
            interactive = true
        } = options;

        const container = document.createElement('div');
        container.className = `kid-icon-container ${className}`;
        container.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            position: relative;
            cursor: ${interactive ? 'pointer' : 'default'};
        `;

        // إنشاء عنصر الصورة
        const img = document.createElement('img');
        img.src = icon.path;
        img.alt = icon.name;
        img.title = icon.name;
        img.style.cssText = `
            width: 100%;
            height: 100%;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        `;

        container.appendChild(img);

        if (interactive) {
            this.addInteractivity(container, img);
        }

        if (animated) {
            this.addFloatingAnimation(container);
        }

        return container;
    }

    /**
     * إضافة التفاعل للأيقونة
     */
    addInteractivity(container, img) {
        let isAnimating = false;

        container.addEventListener('mouseenter', () => {
            if (isAnimating) return;
            
            img.style.transform = 'scale(1.1) translateY(-4px)';
            img.style.filter = 'brightness(1.1) saturate(1.2)';
            
            // إضافة تأثير الدوران اللطيف
            img.style.animation = 'kid-icon-wobble 0.6s ease-in-out';
        });

        container.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1) translateY(0)';
            img.style.filter = 'none';
            img.style.animation = 'none';
        });

        container.addEventListener('click', (e) => {
            if (isAnimating) return;
            isAnimating = true;

            // تأثير النقر
            img.style.animation = 'kid-icon-bounce 0.6s ease-in-out';
            
            // إضافة تأثير الدوائر المتموجة
            this.createRippleEffect(container, e);

            setTimeout(() => {
                isAnimating = false;
                img.style.animation = 'none';
            }, 600);
        });
    }

    /**
     * إضافة حركة العوم للأيقونة
     */
    addFloatingAnimation(container) {
        const duration = 3000 + Math.random() * 2000; // 3-5 ثوان
        const delay = Math.random() * 2000; // تأخير عشوائي
        
        container.style.animation = `kid-icon-float ${duration}ms ease-in-out infinite`;
        container.style.animationDelay = `${delay}ms`;
    }

    /**
     * إنشاء تأثير الدوائر المتموجة عند النقر
     */
    createRippleEffect(container, event) {
        const ripple = document.createElement('div');
        const rect = container.getBoundingClientRect();
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(34, 197, 94, 0.3) 0%, transparent 70%);
            width: 20px;
            height: 20px;
            left: ${event.clientX - rect.left - 10}px;
            top: ${event.clientY - rect.top - 10}px;
            pointer-events: none;
            animation: kid-icon-ripple 0.8s ease-out;
            z-index: 1000;
        `;

        container.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    /**
     * بدء الحركات العامة
     */
    startGlobalAnimations() {
        // إضافة CSS للحركات
        if (!document.getElementById('kids-icons-styles')) {
            const style = document.createElement('style');
            style.id = 'kids-icons-styles';
            style.textContent = `
                @keyframes kid-icon-float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-8px) rotate(2deg); }
                }

                @keyframes kid-icon-wobble {
                    0% { transform: rotate(0deg) scale(1.1); }
                    15% { transform: rotate(-5deg) scale(1.1); }
                    30% { transform: rotate(4deg) scale(1.1); }
                    45% { transform: rotate(-4deg) scale(1.1); }
                    60% { transform: rotate(2deg) scale(1.1); }
                    75% { transform: rotate(-1deg) scale(1.1); }
                    100% { transform: rotate(0deg) scale(1.1); }
                }

                @keyframes kid-icon-bounce {
                    0%, 20%, 53%, 80%, 100% { transform: scale(1.1) translateY(0); }
                    40%, 43% { transform: scale(1.2) translateY(-10px); }
                    70% { transform: scale(1.15) translateY(-5px); }
                    90% { transform: scale(1.12) translateY(-2px); }
                }

                @keyframes kid-icon-ripple {
                    0% {
                        width: 20px;
                        height: 20px;
                        opacity: 0.8;
                    }
                    100% {
                        width: 120px;
                        height: 120px;
                        opacity: 0;
                    }
                }

                .kid-icon-container {
                    user-select: none;
                }

                .kid-icon-container img {
                    object-fit: contain;
                }
            `;
            document.head.appendChild(style);
        }
    }

    /**
     * إنشاء شبكة من الأيقونات
     */
    createIconGrid(containerSelector, options = {}) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        const {
            columns = 3,
            iconSize = 80,
            spacing = 20,
            categories = null,
            animated = true,
            interactive = true
        } = options;

        let iconsToShow = this.getAllIcons();
        if (categories) {
            iconsToShow = iconsToShow.filter(icon => categories.includes(icon.category));
        }

        container.style.cssText = `
            display: grid;
            grid-template-columns: repeat(${columns}, 1fr);
            gap: ${spacing}px;
            padding: ${spacing}px;
            justify-items: center;
            align-items: center;
        `;

        iconsToShow.forEach((icon, index) => {
            const iconName = Array.from(this.icons.keys())[Array.from(this.icons.values()).indexOf(icon)];
            const iconElement = this.createIconElement(iconName, {
                size: iconSize,
                animated,
                interactive,
                className: `icon-grid-item delay-${index}`
            });

            if (iconElement) {
                // إضافة تأخير للظهور التدريجي
                iconElement.style.opacity = '0';
                iconElement.style.transform = 'translateY(20px) scale(0.8)';
                iconElement.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                
                container.appendChild(iconElement);
                
                setTimeout(() => {
                    iconElement.style.opacity = '1';
                    iconElement.style.transform = 'translateY(0) scale(1)';
                }, index * 100 + 200);
            }
        });
    }

    /**
     * تطبيق الثيم الملون على الأيقونات
     */
    applyColorTheme(theme = 'rainbow') {
        const iconContainers = document.querySelectorAll('.kid-icon-container');
        
        iconContainers.forEach((container, index) => {
            const img = container.querySelector('img');
            if (!img) return;

            switch (theme) {
                case 'rainbow':
                    const rainbowColors = ['hue-rotate(0deg)', 'hue-rotate(60deg)', 'hue-rotate(120deg)', 
                                         'hue-rotate(180deg)', 'hue-rotate(240deg)', 'hue-rotate(300deg)'];
                    img.style.filter = rainbowColors[index % rainbowColors.length];
                    break;
                    
                case 'warm':
                    img.style.filter = 'sepia(0.3) saturate(1.2) hue-rotate(15deg)';
                    break;
                    
                case 'cool':
                    img.style.filter = 'sepia(0.2) saturate(1.1) hue-rotate(200deg)';
                    break;
                    
                case 'vintage':
                    img.style.filter = 'sepia(0.5) contrast(1.2) brightness(1.1)';
                    break;
                    
                default:
                    img.style.filter = 'none';
            }
        });
    }
}

// تصدير الكلاس ليكون متاحاً عالمياً
window.KidsIconsManager = KidsIconsManager;

// إنشاء مثيل عام
window.kidsIcons = new KidsIconsManager();

export default KidsIconsManager;