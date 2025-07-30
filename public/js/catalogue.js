document.addEventListener('DOMContentLoaded', () => {
    // Select all "View Details" buttons by their common class
    const openModalButtons = document.querySelectorAll('.open-modal-btn'); 
    
    // Select the modal elements
    const projectModal = document.getElementById('projectModal');
    const closeModalButton = document.getElementById('closeModal');

    // Select elements within the modal to populate dynamically
    const modalProjectImage = document.getElementById('modalProjectImage');
    const modalProjectTitle = document.getElementById('modalProjectTitle');
    const modalProjectDescription = document.getElementById('modalProjectDescription');
    const modalProjectTags = document.getElementById('modalProjectTags');
    const modalProjectClient = document.getElementById('modalProjectClient');
    const modalProjectDuration = document.getElementById('modalProjectDuration');
    const modalVisitProjectLink = document.getElementById('modalVisitProjectLink');

    // Function to open the modal and populate its content
    function openModal(projectData) {
        // Populate modal content with data from the clicked card
        modalProjectImage.src = projectData.image;
        modalProjectImage.alt = projectData.title;
        modalProjectTitle.textContent = projectData.title;
        modalProjectDescription.textContent = projectData.description;
        modalProjectClient.textContent = `Client: ${projectData.client}`;
        modalProjectDuration.textContent = `Duration: ${projectData.duration}`;
        
        // Clear existing tags and add new ones
        modalProjectTags.innerHTML = '';
        projectData.tags.split(', ').forEach(tag => {
            const span = document.createElement('span');
            span.className = 'text-sm px-3 py-1 rounded-full bg-gray-700 text-gray-300';
            span.textContent = tag;
            modalProjectTags.appendChild(span);
        });

        // Update the "Visit Project Page" link (optional)
        // You might need a `data-project-url` attribute on the button if URLs are unique
        if (projectData.url) {
             modalVisitProjectLink.href = projectData.url;
             modalVisitProjectLink.classList.remove('hidden'); // Show the button if it has a URL
        } else {
             modalVisitProjectLink.classList.add('hidden'); // Hide if no specific URL
        }


        projectModal.classList.remove('hidden'); // Show the modal
        document.body.style.overflow = 'hidden'; // Prevent scrolling of the background page
        
        // Re-create icons inside the modal after content is updated
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Function to close the modal
    function closeModal() {
        projectModal.classList.add('hidden'); // Hide the modal
        document.body.style.overflow = ''; // Restore scrolling of the background page
    }

    // Add event listeners to all "View Details" buttons
    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the default link behavior (e.g., navigating to #)
            
            // Get data from data-attributes on the clicked button
            const projectData = {
                title: button.dataset.projectTitle,
                description: button.dataset.projectDescription,
                image: button.dataset.projectImage,
                client: button.dataset.projectClient,
                duration: button.dataset.projectDuration,
                tags: button.dataset.projectTags,
                url: button.dataset.projectUrl // If you add this attribute
            };
            openModal(projectData);
        });
    });

    // Add event listener to the close button inside the modal
    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Add event listener to close the modal if the user clicks on the darkened background
    if (projectModal) {
        projectModal.addEventListener('click', (event) => {
            // Check if the click occurred directly on the modal's background (not on its content)
            if (event.target === projectModal) {
                closeModal();
            }
        });
    }

    // Optional: Close the modal when the Escape key is pressed
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !projectModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Initial call to create Lucide icons on page load for all static icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});