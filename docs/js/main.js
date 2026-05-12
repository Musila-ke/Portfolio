// Portfolio Website - Main JavaScript
// =====================================
const ASSET_VERSION = '20260512-2';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollEffects();
    initProjectsLoader();
    initRevealAnimations();
    initParallax();
    updateCurrentYear();
});

// ============================
// Navigation
// ============================
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', (!isActive).toString());
            document.body.style.overflow = isActive ? '' : 'hidden';
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            e.preventDefault();

            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;

            if (navMenu && navMenu.classList.contains('active') && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }

            const navbar = document.querySelector('.navbar');
            const navHeight = navbar?.offsetHeight || 0;

            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });

            updateActiveNavLink(link);
        });
    });

    const updateScrollNavigation = debounce(() => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, 100);

    window.addEventListener('scroll', updateScrollNavigation, { passive: true });
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

// ============================
// Scroll Effects
// ============================
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = debounce(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, 10);

    window.addEventListener('scroll', handleScroll, { passive: true });
}

// ============================
// Project Cards — Dynamic Loading
// ============================
async function initProjectsLoader() {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    try {
        const response = await fetch(`data/projects.json?v=${ASSET_VERSION}`);
        const projects = await response.json();

        projects.forEach((project, index) => {
            const projectCard = createProjectCard(project, index);
            projectsContainer.appendChild(projectCard);
        });

        // Observe newly-added project cards for reveal animation
        const observer = getRevealObserver();
        observeWithStagger('.project-card', { observer });
    } catch (error) {
        console.error('Error loading projects:', error);
        const fallback = document.createElement('p');
        fallback.style.textAlign = 'center';
        fallback.style.color = 'var(--color-text-muted)';
        fallback.textContent = 'Unable to load projects at this time.';
        projectsContainer.appendChild(fallback);
    }
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';

    const projectContent = document.createElement('div');
    projectContent.className = 'project-content';

    const title = document.createElement('h3');
    title.textContent = project.title;

    const description = document.createElement('p');
    description.textContent = project.description;

    projectContent.appendChild(title);
    projectContent.appendChild(description);

    if (project.tags && Array.isArray(project.tags)) {
        const tagsContainer = document.createElement('div');
        tagsContainer.className = 'project-tags';

        project.tags.forEach(tagText => {
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.textContent = tagText;
            tagsContainer.appendChild(tag);
        });

        projectContent.appendChild(tagsContainer);
    }

    if (project.github || project.site) {
        const linksContainer = document.createElement('div');
        linksContainer.className = 'project-links';

        if (project.site) {
            const siteLink = document.createElement('a');
            siteLink.href = project.site;
            siteLink.target = '_blank';
            siteLink.rel = 'noopener noreferrer';
            siteLink.className = 'link-primary';
            siteLink.textContent = 'Visit Site';
            linksContainer.appendChild(siteLink);
        }

        if (project.github) {
            const githubLink = document.createElement('a');
            githubLink.href = project.github;
            githubLink.target = '_blank';
            githubLink.rel = 'noopener noreferrer';
            githubLink.className = project.site ? 'link-secondary' : 'link-primary';
            githubLink.textContent = 'GitHub';
            linksContainer.appendChild(githubLink);
        }

        projectContent.appendChild(linksContainer);
    }

    card.appendChild(projectContent);

    return card;
}

// ============================
// Scroll-Triggered Reveal Animations
// ============================
function getRevealObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    };

    return new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
}

function observeWithStagger(selector, { observer, className = 'reveal', stagger = 0 }) {
    document.querySelectorAll(selector).forEach((el, i) => {
        if (stagger) {
            const delay = Math.min(i * stagger, 0.6);
            el.style.transitionDelay = `${delay}s`;
        }
        el.classList.add(className);
        if (isInViewport(el)) {
            el.classList.add('visible');
            return;
        }
        observer.observe(el);
    });
}

function initRevealAnimations() {
    const observer = getRevealObserver();

    observeWithStagger('.skill-category', { observer });
    observeWithStagger('.contact-item', { observer, stagger: 0.1 });
    observeWithStagger('.section-header', { observer });
    observeWithStagger('.about-text', { observer });
    observeWithStagger('.contact-form', { observer });

}

// ============================
// Parallax Hero Effect
// ============================
function initParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroBg = hero.querySelector('.hero-background');
    if (!heroBg) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        if (scrollY < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0005})`;
        }
    }, { passive: true });
}

// ============================
// Copyright Year
// ============================
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================
// Utility
// ============================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.top < viewportHeight && rect.bottom > 0;
}
