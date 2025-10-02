/**
 * Kids 3D Hero Animation
 * أنيميشن ثلاثي الأبعاد للصفحة الرئيسية مخصص للأطفال
 */

import * as THREE from 'three';
import { gsap } from 'gsap';

class KidsHero3D {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.toys = [];
        this.particles = [];
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.isPlaying = true;
        
        if (this.container) {
            this.init();
            this.animate();
            this.setupEventListeners();
        }
    }

    init() {
        // إعداد المشهد
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf0fdf9); // لون خلفية نعناعي طفولي

        // إعداد الكاميرا
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.container.offsetWidth / this.container.offsetHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 5, 15);

        // إعداد الرندرر
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true 
        });
        this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);

        // إضافة الإضاءة
        this.setupLighting();
        
        // إنشاء الألعاب ثلاثية الأبعاد
        this.createToys();
        
        // إنشاء جزيئات ملونة
        this.createParticles();
        
        // إضافة الأرضية
        this.createGround();
    }

    setupLighting() {
        // إضاءة محيطة ناعمة
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);

        // إضاءة اتجاهية رئيسية
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        directionalLight.shadow.camera.near = 0.5;
        directionalLight.shadow.camera.far = 500;
        this.scene.add(directionalLight);

        // إضاءة ملونة للجو الطفولي
        const coloredLight1 = new THREE.PointLight(0xff8fa3, 0.5, 20); // وردي
        coloredLight1.position.set(-10, 8, 5);
        this.scene.add(coloredLight1);

        const coloredLight2 = new THREE.PointLight(0x4f9aff, 0.5, 20); // أزرق
        coloredLight2.position.set(10, 8, 5);
        this.scene.add(coloredLight2);

        const coloredLight3 = new THREE.PointLight(0x22c55e, 0.4, 15); // أخضر
        coloredLight3.position.set(0, 12, -5);
        this.scene.add(coloredLight3);
    }

    createToys() {
        // كرة ملونة متدحرجة
        this.createBouncingBall();
        
        // مكعبات بناء
        this.createBuildingBlocks();
        
        // لعبة الدوران
        this.createSpinningToy();
        
        // نجوم ثلاثية الأبعاد
        this.createStars();
    }

    createBouncingBall() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            color: 0xff8fa3,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        });
        
        const ball = new THREE.Mesh(geometry, material);
        ball.position.set(-5, 3, 0);
        ball.castShadow = true;
        ball.receiveShadow = true;
        this.scene.add(ball);
        
        this.toys.push({
            mesh: ball,
            type: 'ball',
            animationData: {
                originalY: ball.position.y,
                bounceHeight: 6,
                speed: 0.02
            }
        });

        // حركة الارتداد
        gsap.to(ball.position, {
            y: 8,
            duration: 1.5,
            ease: "power2.out",
            yoyo: true,
            repeat: -1
        });

        gsap.to(ball.rotation, {
            x: Math.PI * 2,
            y: Math.PI * 2,
            duration: 3,
            ease: "none",
            repeat: -1
        });
    }

    createBuildingBlocks() {
        const colors = [0x22c55e, 0xffe066, 0x4f9aff, 0xff8fa3];
        
        for (let i = 0; i < 4; i++) {
            const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
            const material = new THREE.MeshPhongMaterial({
                color: colors[i],
                shininess: 80
            });
            
            const block = new THREE.Mesh(geometry, material);
            block.position.set(2 + i * 2, 2 + i * 0.5, 2);
            block.castShadow = true;
            block.receiveShadow = true;
            this.scene.add(block);
            
            this.toys.push({
                mesh: block,
                type: 'block',
                animationData: {
                    rotationSpeed: 0.01 + i * 0.005,
                    floatOffset: i * Math.PI / 2
                }
            });

            // حركة العوم والدوران
            gsap.to(block.rotation, {
                y: Math.PI * 2,
                duration: 4 + i,
                ease: "none",
                repeat: -1
            });

            gsap.to(block.position, {
                y: block.position.y + 1,
                duration: 2 + i * 0.5,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });
        }
    }

    createSpinningToy() {
        // قاعدة الدوران
        const baseGeometry = new THREE.CylinderGeometry(1, 1.5, 0.5, 8);
        const baseMaterial = new THREE.MeshPhongMaterial({ color: 0xa855f7 });
        const base = new THREE.Mesh(baseGeometry, baseMaterial);
        base.position.set(0, 0.25, -3);
        base.castShadow = true;
        this.scene.add(base);

        // العناصر الدوارة
        const spinGroup = new THREE.Group();
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const radius = 2;
            
            const geometry = new THREE.TorusGeometry(0.3, 0.1, 8, 16);
            const material = new THREE.MeshPhongMaterial({
                color: new THREE.Color().setHSL(i / 6, 0.8, 0.6)
            });
            
            const torus = new THREE.Mesh(geometry, material);
            torus.position.set(
                Math.cos(angle) * radius,
                1,
                Math.sin(angle) * radius
            );
            torus.castShadow = true;
            spinGroup.add(torus);
        }
        
        spinGroup.position.copy(base.position);
        this.scene.add(spinGroup);
        
        this.toys.push({
            mesh: spinGroup,
            type: 'spinner',
            animationData: {
                rotationSpeed: 0.02
            }
        });

        // دوران مستمر
        gsap.to(spinGroup.rotation, {
            y: Math.PI * 2,
            duration: 8,
            ease: "none",
            repeat: -1
        });
    }

    createStars() {
        const starPositions = [
            { x: -8, y: 8, z: -5 },
            { x: 8, y: 10, z: -3 },
            { x: -3, y: 12, z: 2 },
            { x: 5, y: 9, z: 4 }
        ];

        starPositions.forEach((pos, index) => {
            const star = this.createStar();
            star.position.set(pos.x, pos.y, pos.z);
            star.scale.setScalar(0.5 + Math.random() * 0.5);
            this.scene.add(star);
            
            this.toys.push({
                mesh: star,
                type: 'star',
                animationData: {
                    rotationSpeed: 0.03 + index * 0.01,
                    twinklePhase: index * Math.PI / 2
                }
            });

            // تأثير اللمعان
            gsap.to(star.material, {
                emissiveIntensity: 0.5,
                duration: 1 + index * 0.3,
                ease: "power2.inOut",
                yoyo: true,
                repeat: -1
            });

            // دوران بطيء
            gsap.to(star.rotation, {
                z: Math.PI * 2,
                duration: 10 + index * 2,
                ease: "none",
                repeat: -1
            });
        });
    }

    createStar() {
        const shape = new THREE.Shape();
        const outerRadius = 0.8;
        const innerRadius = 0.4;
        const points = 5;

        for (let i = 0; i < points * 2; i++) {
            const angle = (i / (points * 2)) * Math.PI * 2;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            if (i === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        }

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: 0.2,
            bevelEnabled: true,
            bevelThickness: 0.05,
            bevelSize: 0.05,
            bevelSegments: 3
        });

        const material = new THREE.MeshPhongMaterial({
            color: 0xffe066,
            emissive: 0xffe066,
            emissiveIntensity: 0.2,
            shininess: 100
        });

        return new THREE.Mesh(geometry, material);
    }

    createParticles() {
        const particleCount = 100;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const sizes = new Float32Array(particleCount);

        const colorPalette = [
            new THREE.Color(0x22c55e), // أخضر
            new THREE.Color(0xff8fa3), // وردي
            new THREE.Color(0x4f9aff), // أزرق
            new THREE.Color(0xffe066), // أصفر
            new THREE.Color(0xa855f7)  // بنفسجي
        ];

        for (let i = 0; i < particleCount; i++) {
            // المواقع العشوائية
            positions[i * 3] = (Math.random() - 0.5) * 40;
            positions[i * 3 + 1] = Math.random() * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

            // الألوان العشوائية
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
            colors[i * 3] = color.r;
            colors[i * 3 + 1] = color.g;
            colors[i * 3 + 2] = color.b;

            // الأحجام العشوائية
            sizes[i] = Math.random() * 3 + 1;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        this.scene.add(particles);
        
        this.particles.push({
            mesh: particles,
            animationData: {
                rotationSpeed: 0.001
            }
        });

        // دوران بطيء للجزيئات
        gsap.to(particles.rotation, {
            y: Math.PI * 2,
            duration: 60,
            ease: "none",
            repeat: -1
        });
    }

    createGround() {
        const geometry = new THREE.PlaneGeometry(50, 50);
        const material = new THREE.MeshPhongMaterial({
            color: 0xf0fdf9,
            transparent: true,
            opacity: 0.3
        });
        
        const ground = new THREE.Mesh(geometry, material);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }

    setupEventListeners() {
        // تتبع حركة الماوس
        this.container.addEventListener('mousemove', (event) => {
            const rect = this.container.getBoundingClientRect();
            this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
        });

        // النقر على الألعاب
        this.container.addEventListener('click', (event) => {
            this.handleToyClick(event);
        });

        // تغيير حجم النافذة
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // إيقاف/تشغيل عند تغيير التركيز
        document.addEventListener('visibilitychange', () => {
            this.isPlaying = !document.hidden;
        });
    }

    handleToyClick(event) {
        const rect = this.container.getBoundingClientRect();
        this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const toyMeshes = this.toys.map(toy => toy.mesh);
        const intersects = this.raycaster.intersectObjects(toyMeshes, true);

        if (intersects.length > 0) {
            const clickedToy = intersects[0].object;
            this.animateToyClick(clickedToy);
        }
    }

    animateToyClick(toy) {
        // تأثير النقر المرح
        const originalScale = toy.scale.clone();
        
        gsap.to(toy.scale, {
            x: originalScale.x * 1.3,
            y: originalScale.y * 1.3,
            z: originalScale.z * 1.3,
            duration: 0.2,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
                toy.scale.copy(originalScale);
            }
        });

        // تأثير الدوران
        gsap.to(toy.rotation, {
            y: toy.rotation.y + Math.PI * 2,
            duration: 0.8,
            ease: "power2.inOut"
        });
    }

    handleResize() {
        if (!this.container) return;

        const width = this.container.offsetWidth;
        const height = this.container.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        if (!this.isPlaying) {
            requestAnimationFrame(() => this.animate());
            return;
        }

        // تحريك الكاميرا تبعاً لحركة الماوس
        const targetX = this.mouse.x * 2;
        const targetY = this.mouse.y * 2;
        
        this.camera.position.x += (targetX - this.camera.position.x) * 0.02;
        this.camera.position.y += (targetY + 5 - this.camera.position.y) * 0.02;
        this.camera.lookAt(0, 2, 0);

        // تحديث حركات الألعاب المخصصة
        this.toys.forEach(toy => {
            if (toy.type === 'ball') {
                // إضافة حركة إضافية للكرة
                toy.mesh.position.x = -5 + Math.sin(Date.now() * 0.001) * 2;
            } else if (toy.type === 'block') {
                // حركة عوم إضافية للمكعبات
                const time = Date.now() * 0.001;
                toy.mesh.position.y += Math.sin(time + toy.animationData.floatOffset) * 0.01;
            }
        });

        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.renderer) {
            this.renderer.dispose();
            this.container.removeChild(this.renderer.domElement);
        }
        
        // تنظيف الموارد
        this.toys.forEach(toy => {
            if (toy.mesh.geometry) toy.mesh.geometry.dispose();
            if (toy.mesh.material) toy.mesh.material.dispose();
        });
        
        this.particles.forEach(particle => {
            if (particle.mesh.geometry) particle.mesh.geometry.dispose();
            if (particle.mesh.material) particle.mesh.material.dispose();
        });
    }
}

// تصدير الكلاس
window.KidsHero3D = KidsHero3D;

export default KidsHero3D;