export function initAnimations() {

    const elements = document.querySelectorAll('[class*="reveal-"]');

    if (!elements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                const revealClass = [...entry.target.classList]
                    .find(cls => cls.startsWith('reveal-'));
                if (!revealClass) return;

                const animationClass = revealClass.replace('reveal', 'animate');

                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    elements.forEach(el => observer.observe(el));
}