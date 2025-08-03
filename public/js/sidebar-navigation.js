document.querySelectorAll(".sidebar-link").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const pageTitle = this.getAttribute("data-title"); // Custom title
      const pageUrl = this.getAttribute("href");         // Partial URL

      // Update navbar heading
      document.getElementById("page-title").textContent = pageTitle;

      // Load content dynamically
      fetch(pageUrl)
        .then(res => res.text())
        .then(html => {
          document.getElementById("main-content").innerHTML = html;
        });
    });
  });