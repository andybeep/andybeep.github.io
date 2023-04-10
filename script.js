// GitHub username
const username = "yourusername";

// URL to fetch data from GitHub API
const url = `https://api.github.com/users/${username}/repos`;

// Get projects from GitHub API
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Filter out forked repositories
    const projects = data.filter(repo => !repo.fork);
    
    // Sort projects by most recently updated
    projects.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    
    // Add projects to the page
    const projectContainer = document.querySelector("#projects");
    projects.forEach(project => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");
      
      const thumbnailElement = document.createElement("img");
      thumbnailElement.src = project.owner.avatar_url;
      thumbnailElement.alt = `${project.name} thumbnail`;
      projectElement.appendChild(thumbnailElement);
      
      const titleElement = document.createElement("h3");
      titleElement.textContent = project.name;
      projectElement.appendChild(titleElement);
      
      projectContainer.appendChild(projectElement);
    });
  })
  .catch(error => console.error(error));
