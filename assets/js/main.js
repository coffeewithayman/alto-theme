var html = $('html');

$(function () {
    darkMode();
    carousel();
});

function darkMode() {
    $('.toggle-track').on('click', function () {
        if (html.hasClass('dark-mode')) {
            html.removeClass('dark-mode');
            localStorage.setItem('alto_dark', false);
        } else {
            html.addClass('dark-mode');
            localStorage.setItem('alto_dark', true);
        }
    });
}

function carousel() {
    var carousel = $('.carousel');
    var postImage = carousel.find('.post-image');
    var imageHeight, nav;

    function moveNav() {
        imageHeight = postImage.height();
        if (!nav) {
            nav = carousel.find('.owl-prev, .owl-next');
        }
        nav.css({
            top: imageHeight / 2 + 'px',
            opacity: 1,
        });
    }

    carousel.owlCarousel({
        dots: false,
        margin: 28,
        nav: true,
        navText: [
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M20.547 22.107l-6.107-6.107 6.107-6.12-1.88-1.88-8 8 8 8 1.88-1.893z"></path></svg>',
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="22" height="22" fill="currentColor"><path d="M11.453 22.107l6.107-6.107-6.107-6.12 1.88-1.88 8 8-8 8-1.88-1.893z"></path></svg>',
        ],
        onInitialized: function () {
            moveNav();
            carousel.css('visibility', 'visible');
        },
        onResized: function () {
            moveNav();
        },
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 3,
            },
            992: {
                items: 4,
            },
        },
    });
}

// Remove author from bookmark cards
(function() {
    function removeBookmarkAuthors() {
        // Method 1: By data-testid attribute
        document.querySelectorAll('[data-testid="bookmark-author"]').forEach(function(el) {
            el.remove();
        });

        // Method 2: By class names
        document.querySelectorAll('.kg-bookmark-author, .kg-bookmark-publisher').forEach(function(el) {
            el.remove();
        });

        // Method 3: By text content pattern - find spans with bullet point that contain author name
        document.querySelectorAll('.kg-bookmark-metadata span, [class*="kg-bookmark"] span').forEach(function(el) {
            // Skip if it's the icon
            if (el.tagName === 'IMG' || el.querySelector('img')) return;
            // Skip if it looks like a publisher/site name (usually the first span)
            if (el.previousElementSibling === null && el.parentElement.querySelector('img')) return;
            // If it has the bullet point pseudo-element styling, it's likely the author
            var styles = window.getComputedStyle(el, ':before');
            if (styles.content && styles.content.includes('•')) {
                el.remove();
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Initial removal
        removeBookmarkAuthors();

        // Watch for new elements (React re-renders, dynamic content)
        var observer = new MutationObserver(function(mutations) {
            removeBookmarkAuthors();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Fallback: periodic check
        setInterval(removeBookmarkAuthors, 1000);
    }
})();
