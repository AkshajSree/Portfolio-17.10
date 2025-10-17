// Typing Text Effect
const typedText = document.getElementById('typed-text');
const words = ['a Developer.', 'a Designer.', 'a Problem Solver.'];
let i = 0, j = 0;
let currentWord = '', isDeleting = false;

function type() {
    if(i >= words.length) i = 0;
    if(!isDeleting && j <= words[i].length){
        currentWord = words[i].slice(0, j++);
        typedText.textContent = currentWord;
        setTimeout(type, 150);
    } else if(isDeleting && j >= 0){
        currentWord = words[i].slice(0, j--);
        typedText.textContent = currentWord;
        setTimeout(type, 100);
    } else {
        isDeleting = !isDeleting;
        if(!isDeleting) i++;
        setTimeout(type, 700);
    }
}
type();

// Modal Functionality
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

function openModal(project) {
    if(project === 'project1'){
        modalTitle.textContent = 'Project 1';
        modalDesc.textContent = 'Detailed description of project 1.';
    } else if(project === 'project2'){
        modalTitle.textContent = 'Project 2';
        modalDesc.textContent = 'Detailed description of project 2.';
    }
    modal.style.display = 'block';
}

function closeModal(){
    modal.style.display = 'none';
}

window.onclick = function(event){
    if(event.target === modal) closeModal();
}

// Dark Mode Toggle
const toggleBtn = document.getElementById('toggleMode');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Back to Top Button
const backToTop = document.getElementById('backToTop');
window.onscroll = () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
}
function scrollToTop() { window.scrollTo({top:0, behavior:'smooth'}); }

// Fetch GitHub Repos
const repoContainer = document.getElementById('repos');
fetch('https://api.github.com/users/yourusername/repos?sort=updated')
.then(res => res.json())
.then(data => {
    repoContainer.innerHTML = '';
    data.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        card.innerHTML = `<h3>${repo.name}</h3><p>${repo.description || 'No description'}</p>
        <a href="${repo.html_url}" target="_blank">View Repo</a>`;
        repoContainer.appendChild(card);
    });
})
.catch(err => {
    repoContainer.innerHTML = `<p>Unable to load repositories. Check username or internet.</p>`;
});
