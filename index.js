function updateLinkColor() {
    const currentlyViewing = window.location.hash;
    if (currentlyViewing) {
        const currentLink = document.querySelector(`.links-container a[href="${currentlyViewing}"]`);
        const otherLinks = document.querySelectorAll(`.links-container a:not(a[href="${currentlyViewing}"])`)

        if (currentLink) {
            currentLink.classList.add('green-glow');
            currentLink.classList.remove('glow');
        }

        otherLinks.forEach(lnk => {
            lnk.classList.remove('green-glow');
            lnk.classList.add('glow');
        });
    }
}

var animDir = 'rtl';
function handleParagraphIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            if (animDir === 'rtl') {
                entry.target.style.animation = 'slideInRTL 1s ease-in-out forwards';
                animDir = 'ltr';
            } else {
                entry.target.style.animation = 'slideInLTR 1s ease-in-out forwards';
                animDir = 'rtl';
            }

            observer.unobserve(entry.target);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Give all project images hover effects 
    const images = document.querySelectorAll('.project img');
    images.forEach(img => {
        img.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 50;
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 50;
            const scale = 1.1;

            img.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(${scale})`;
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'translate(0, 0)';
        });
    });

    // Make the paragraphs fade in once they're rendered
    const paragraphs = document.querySelectorAll('#about-me-section p');
    const paragraphsObserver = new IntersectionObserver(handleParagraphIntersection, { threshold: 0.5 });

    paragraphs.forEach(paragraph => {
        paragraphsObserver.observe(paragraph);
    });


    // Update the navbar links color based on the window hash
    updateLinkColor();
    window.addEventListener('hashchange', updateLinkColor);
});
