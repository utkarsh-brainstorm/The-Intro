document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const icon = themeToggle.querySelector('i');
        icon.classList.toggle('fa-moon');
        icon.classList.toggle('fa-sun');
    });

    // Set initial navbar background
    const navbar = document.querySelector('.navbar');
    navbar.style.background = body.classList.contains('light-mode') 
        ? 'rgba(248, 249, 250, 0.95)'
        : 'rgba(12, 12, 20, 0.95)';

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Navbar Background Change on Scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = body.classList.contains('light-mode') 
                ? 'rgba(248, 249, 250, 0.95)'
                : 'rgba(12, 12, 20, 0.95)';
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = body.classList.contains('light-mode') 
                ? 'rgba(248, 249, 250, 0.95)'
                : 'rgba(12, 12, 20, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Create and add network animation to hero section
    const hero = document.querySelector('.hero');
    const networkCanvas = document.createElement('canvas');
    networkCanvas.className = 'network-animation';
    hero.appendChild(networkCanvas);

    // Particle Animation for Hero Section
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'data-particles';
    hero.appendChild(particlesContainer);

    // Create data particles
    const createParticles = () => {
        const numberOfParticles = 50;
        
        for (let i = 0; i < numberOfParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            
            // Random size
            const size = Math.random() * 3 + 1;
            
            // Random opacity
            const opacity = Math.random() * 0.5 + 0.1;
            
            // Set styles
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.opacity = opacity;
            
            // Add to container
            particlesContainer.appendChild(particle);
            
            // Animate the particle
            animateParticle(particle);
        }
    };

    // Animate each particle
    const animateParticle = (particle) => {
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        
        // Random direction and speed
        const speedX = (Math.random() - 0.5) * 0.1;
        const speedY = (Math.random() - 0.5) * 0.1;
        
        let x = startX;
        let y = startY;
        
        const animate = () => {
            x += speedX;
            y += speedY;
            
            // Boundary check and wrap around
            if (x < 0) x = 100;
            if (x > 100) x = 0;
            if (y < 0) y = 100;
            if (y > 100) y = 0;
            
            particle.style.left = `${x}%`;
            particle.style.top = `${y}%`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    };
    
    // Initialize particle animation
    createParticles();

    // Neural Network Animation
    const initNetworkAnimation = () => {
        const canvas = networkCanvas;
        const ctx = canvas.getContext('2d');
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
        const secondaryColor = getComputedStyle(document.documentElement).getPropertyValue('--secondary-color').trim();

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasDimensions();
        window.addEventListener('resize', setCanvasDimensions);

        // Nodes and connections
        const nodes = [];
        const connections = [];
        const nodeCount = 20;
        const connectionProbability = 0.3;

        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: i % 2 === 0 ? primaryColor : secondaryColor,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        // Create connections between nodes
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (Math.random() < connectionProbability) {
                    connections.push({
                        from: i,
                        to: j,
                        active: false,
                        activationTime: 0,
                        duration: Math.random() * 2000 + 1000
                    });
                }
            }
        }

        // Animation function
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update node positions
            nodes.forEach(node => {
                node.x += node.vx;
                node.y += node.vy;

                // Boundary check
                if (node.x < 0 || node.x > canvas.width) node.vx = -node.vx;
                if (node.y < 0 || node.y > canvas.height) node.vy = -node.vy;

                // Draw nodes
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
            });

            // Randomly activate connections
            const now = Date.now();
            if (Math.random() < 0.05) {
                const connection = connections[Math.floor(Math.random() * connections.length)];
                connection.active = true;
                connection.activationTime = now;
            }

            // Draw connections
            connections.forEach(connection => {
                const from = nodes[connection.from];
                const to = nodes[connection.to];
                const elapsed = now - connection.activationTime;

                ctx.beginPath();
                ctx.moveTo(from.x, from.y);
                ctx.lineTo(to.x, to.y);

                if (connection.active && elapsed < connection.duration) {
                    // Calculate pulse position (0 to 1)
                    const pulse = elapsed / connection.duration;
                    const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y);
                    
                    gradient.addColorStop(Math.max(0, pulse - 0.1), 'rgba(0, 204, 255, 0.0)');
                    gradient.addColorStop(pulse, 'rgba(0, 204, 255, 0.4)');
                    gradient.addColorStop(Math.min(1, pulse + 0.1), 'rgba(0, 204, 255, 0.0)');
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 2;
                } else {
                    connection.active = false;
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
                    ctx.lineWidth = 0.5;
                }
                
                ctx.stroke();
            });

            requestAnimationFrame(animate);
        };

        animate();
    };

    // Initialize network animation
    initNetworkAnimation();

    // Project Data with AI/Data Science focus
    const projects = [
        {
            title: 'Neural Network Image Classifier',
            description: 'Deep learning model for real-time image classification using convolutional neural networks (CNNs) with TensorFlow and Python.',
            tech: ['Python', 'TensorFlow', 'OpenCV', 'CNNs'],
            link: '#'
        },
        {
            title: 'Predictive Analytics Dashboard',
            description: 'Interactive dashboard for visualizing complex datasets with predictive modeling capabilities for time-series forecasting.',
            tech: ['Python', 'Streamlit', 'Pandas', 'Prophet', 'Plotly'],
            link: '#'
        },
        {
            title: 'NLP Sentiment Analysis System',
            description: 'End-to-end Natural Language Processing pipeline for sentiment analysis of customer feedback with automated reporting.',
            tech: ['Python', 'NLTK', 'Transformers', 'Scikit-learn', 'Docker'],
            link: '#'
        }
    ];

    // Populate Projects Section
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsGrid) {
        projects.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-card';
            projectCard.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tech-stack">
                    ${project.tech.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.link}" class="btn secondary">View Project</a>
            `;
            projectsGrid.appendChild(projectCard);
        });
    }

    // Fix progress bar animations
    // Get all progress bars
    const progressBars = document.querySelectorAll('.progress');
    
    // Create an intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // When the progress bar is visible, animate it
                const bar = entry.target;
                const width = bar.getAttribute('data-width') || bar.style.width;
                bar.style.width = '0';
                
                // Trigger reflow to ensure animation works
                void bar.offsetWidth;
                
                // Set the final width to animate to
                bar.style.width = width;
                
                // Unobserve after animation is triggered
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.2 });
    
    // Set initial widths and observe each progress bar
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
        observer.observe(bar);
    });

    // Add typing animation effect to the logo
    const typingAnimation = () => {
        const logo = document.querySelector('.logo');
        const text = logo.textContent;
        logo.textContent = '';
        
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                logo.textContent += text.charAt(i);
                i++;
                setTimeout(typeChar, 100);
            }
        };
        
        typeChar();
    };
    
    typingAnimation();

    // Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }
}); 