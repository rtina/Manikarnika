document.addEventListener('DOMContentLoaded', () => {
    const mainContentContainer = document.getElementById('main-content');
    const pageTitleElement = document.getElementById('page-title');

    if (!mainContentContainer || !pageTitleElement) {
        console.error('Essential layout elements (#main-content or #page-title) not found. Dynamic navigation disabled.');
        return;
    }

    const fetchAndReplaceContent = async (url, titleToSet) => {
        try {
            mainContentContainer.style.opacity = '0.5'; // Simple loading indicator

            const response = await fetch(url);
            if (!response.ok) {
                // If fetch fails, redirect to the page for a full load as a fallback
                window.location.href = url;
                return;
            }
            const html = await response.text();
            const parser = new DOMParser();
            const newDoc = parser.parseFromString(html, 'text/html');
            
            const newContent = newDoc.getElementById('main-content');
            const newDocumentTitle = newDoc.querySelector('title');

            if (newContent) {
                mainContentContainer.innerHTML = newContent.innerHTML;
                pageTitleElement.textContent = titleToSet;
                document.title = newDocumentTitle ? newDocumentTitle.textContent : titleToSet;
            } else {
                // Fallback for safety if content ID is not found in response
                window.location.href = url;
            }

        } catch (error) {
            console.error('Error loading page content:', error);
            window.location.href = url; // Fallback on any other error
        } finally {
            mainContentContainer.style.opacity = '1'; // Remove loading indicator
        }
    };

    const handleLinkClick = (event) => {
        const link = event.currentTarget;
        // Allow opening in new tab with Ctrl/Cmd+Click
        if (event.metaKey || event.ctrlKey) {
            return;
        }
        
        event.preventDefault();
        
        const url = link.getAttribute('href');
        const title = link.dataset.title;

        // Avoid reloading the same page
        if (url === window.location.pathname) return;

        history.pushState({ path: url, title: title }, '', url);
        fetchAndReplaceContent(url, title);
    };

    document.querySelectorAll('.sidebar-link').forEach(link => link.addEventListener('click', handleLinkClick));

    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.path) {
            fetchAndReplaceContent(event.state.path, event.state.title || document.title);
        }
    });

    // Save the initial page state for back/forward navigation
    history.replaceState({ path: window.location.pathname, title: document.title }, '', window.location.pathname);
});
