/**
 * Kids Theme Main Controller
 * متحكم رئيسي لجميع التأثيرات والأنيميشن الطفولية
 */

import KidsHero3D from './kids-hero-3d.js';
import KidsIconsManager from './kids-icons.js';
import KidsMicroInteractions from './kids-micro-interactions.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

// تسجيل إضافات GSAP
gsap.registerPlugin(ScrollTrigger);

class KidsThemeController {
    constructor() {
        this.hero3D = null;
        this.iconsManager = null;
        this.microInteractions = null;
        this.isInitialized = false;
        this.config = {
            enableParallax: true,
            enable3D: true,
            enableSounds: false, // يمكن تفعيله لاحقاً
            colorTheme: 'rainbow'
        };
        
        this.init();
    }

    async init() {
        try {
            // انتظار تحميل DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
        } catch (error) {
            console.error('خطأ في تهيئة الثيم الطفولي:', error);
        }
    }

    setup() {
        console.log('🎮 تهيئة الثيم الطفولي...');
        
        // تهيئة AOS للأنيميشن عند التمرير
        this.initAOS();
        
        // تهيئة الأنيميشن ثلاثي الأبعاد
        this.init3DHero();
        
        // تهيئة مدير الأيقونات
        this.initIconsManager();
        
        // تهيئة التفاعلات المصغرة
        this.initMicroInteractions();
        
        // تهيئة تأثيرات التمرير
        this.initScrollEffects();
        
        // تهيئة التفاعلات الطفولية
        this.initKidsInteractions();
        
        // تهيئة تأثيرات البطاقات
        this.initCardEffects();
        
        // تهيئة تأثيرات الأزرار
        this.initButtonEffects();
        
        // تطبيق الثيم الملون
        this.applyColorTheme();
        
        // إضافة مؤشر الماوس المخصص
        this.initCustomCursor();
        
        this.isInitialized = true;
        console.log('✅ تم تهيئة الثيم الطفولي بنجاح!');
        
        // إرسال حدث مخصص
        document.dispatchEvent(new CustomEvent('kidsThemeReady'));
    }

    initAOS() {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50,
            delay: 100
        });
    }

    init3DHero() {
        if (!this.config.enable3D) return;
        
        const heroContainer = document.querySelector('#kids-hero-3d');
        if (heroContainer) {
            this.hero3D = new KidsHero3D('#kids-hero-3d');
            console.log('🎯 تم تهيئة الأنيميشن ثلاثي الأبعاد');
        }
    }

    initIconsManager() {
        this.iconsManager = new KidsIconsManager();
        
        // إنشاء شبكة الأيقونات إذا وجدت
        const iconsGrid = document.querySelector('.kids-icons-grid');
        if (iconsGrid) {
            this.iconsManager.createIconGrid('.kids-icons-grid', {
                columns: window.innerWidth < 768 ? 2 : 3,
                iconSize: window.innerWidth < 768 ? 60 : 80,
                spacing: 20,
                animated: true,
                interactive: true
            });
        }
    }

    initMicroInteractions() {
        this.microInteractions = new KidsMicroInteractions();
        console.log('🎮 تم تهيئة التفاعلات المصغرة');
    }

    initScrollEffects() {
        // تأثير المنظر المتوازي للعناصر
        gsap.utils.toArray('.parallax-element').forEach(element => {
            const speed = element.dataset.speed || 0.5;
            
            gsap.to(element, {
                yPercent: -50 * speed,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // أنيميشن ظهور العناصر
        gsap.utils.toArray('.animate-on-scroll').forEach(element => {
            gsap.fromTo(element, 
                {
                    opacity: 0,
                    y: 50,
                    scale: 0.8
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // تأثير النصوص المتحركة
        gsap.utils.toArray('.text-reveal').forEach(element => {
            const chars = element.textContent.split('');
            element.innerHTML = chars.map(char => 
                `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');

            gsap.fromTo(element.querySelectorAll('.char'), 
                {
                    opacity: 0,
                    y: 30,
                    rotationX: -90
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    stagger: 0.05,
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });
    }

    initKidsInteractions() {
        // تأثيرات الهوفر الطفولية
        document.querySelectorAll('.kid-hover-bounce').forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    scale: 1.05,
                    y: -5,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });

        // تأثيرات الاهتزاز المرح
        document.querySelectorAll('.kid-hover-wiggle').forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    rotation: 5,
                    duration: 0.1,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 5
                });
            });
        });

        // تأثيرات الإشراق
        document.querySelectorAll('.kid-hover-glow').forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    filter: 'brightness(1.2) saturate(1.3)',
                    boxShadow: '0 8px 30px rgba(34, 197, 94, 0.3)',
                    duration: 0.3
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    filter: 'brightness(1) saturate(1)',
                    boxShadow: '0 4px 15px rgba(34, 197, 94, 0.15)',
                    duration: 0.3
                });
            });
        });
    }

    initCardEffects() {
        document.querySelectorAll('.card-kid').forEach((card, index) => {
            // تأثير الدخول المتدرج
            gsap.fromTo(card, 
                {
                    opacity: 0,
                    y: 50,
                    rotationY: -15
                },
                {
                    opacity: 1,
                    y: 0,
                    rotationY: 0,
                    duration: 0.8,
                    delay: index * 0.1,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // تأثير التفاعل
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -10,
                    rotationY: 5,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    rotationY: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power2.out"
                });
            });
        });
    }

    initButtonEffects() {
        document.querySelectorAll('.btn-kid-primary, .btn-kid-rainbow').forEach(button => {
            button.addEventListener('click', (e) => {
                // تأثير النقر
                gsap.to(button, {
                    scale: 0.95,
                    duration: 0.1,
                    ease: "power2.out",
                    yoyo: true,
                    repeat: 1
                });

                // تأثير الدوائر المتموجة
                this.createButtonRipple(button, e);
            });

            // تأثير الهوفر
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    y: -2,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    createButtonRipple(button, event) {
        const rect = button.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            width: 20px;
            height: 20px;
            left: ${event.clientX - rect.left - 10}px;
            top: ${event.clientY - rect.top - 10}px;
            pointer-events: none;
            z-index: 1000;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        gsap.to(ripple, {
            width: 100,
            height: 100,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: () => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }
        });
    }

    applyColorTheme() {
        if (!this.iconsManager) return;
        
        // تطبيق الثيم الملون على الأيقونات
        this.iconsManager.applyColorTheme(this.config.colorTheme);
        
        // تطبيق الألوان على العناصر الأخرى
        document.documentElement.style.setProperty('--theme-primary', '#22C55E');
        document.documentElement.style.setProperty('--theme-secondary', '#4F9AFF');
        document.documentElement.style.setProperty('--theme-accent', '#FF8FA3');
    }

    initCustomCursor() {
        if (window.innerWidth < 768) return; // تعطيل على الجوال

        const cursor = document.createElement('div');
        cursor.className = 'kids-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #22C55E, #4ADE80);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.opacity = '0.8';
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });

        // تحديث موقع المؤشر بسلاسة
        const updateCursor = () => {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';
            
            requestAnimationFrame(updateCursor);
        };
        updateCursor();

        // تأثيرات خاصة عند التفاعل
        document.querySelectorAll('a, button, .clickable').forEach(element => {
            element.addEventListener('mouseenter', () => {
                gsap.to(cursor, {
                    scale: 1.5,
                    duration: 0.3
                });
            });

            element.addEventListener('mouseleave', () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3
                });
            });
        });
    }

    // تغيير الثيم الملون
    changeColorTheme(theme) {
        this.config.colorTheme = theme;
        this.applyColorTheme();
    }

    // تشغيل/إيقاف الأنيميشن ثلاثي الأبعاد
    toggle3D(enable) {
        this.config.enable3D = enable;
        if (!enable && this.hero3D) {
            this.hero3D.destroy();
            this.hero3D = null;
        } else if (enable && !this.hero3D) {
            this.init3DHero();
        }
    }

    // تنظيف الموارد
    destroy() {
        if (this.hero3D) {
            this.hero3D.destroy();
        }
        
        if (this.microInteractions) {
            this.microInteractions.cleanup();
        }
        
        // إزالة المؤشر المخصص
        const cursor = document.querySelector('.kids-cursor');
        if (cursor) {
            cursor.remove();
        }
        
        // تنظيف ScrollTrigger
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
}

// إنشاء مثيل عام
window.kidsTheme = new KidsThemeController();

// تصدير للاستخدام كوحدة
export default KidsThemeController;