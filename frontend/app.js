let projects = JSON.parse(localStorage.getItem('projects')) || [
    { 
        name: "Barbería Classic", 
        service: "Sitio Web Corporativo", 
        img: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" 
    },
    { 
        name: "Peluquería Canina 'Peluditos'", 
        service: "Catálogo de Servicios", 
        img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80" 
    }
];

const projectsGrid = document.getElementById('projects-grid');
const form = document.getElementById('project-form');
const adminPanel = document.getElementById('admin-panel');
const btnAdminMode = document.getElementById('btn-admin-mode');
const btnCloseAdmin = document.getElementById('btn-close-admin');

let adminActive = false;

function renderProjects() {
    if (!projectsGrid) return;
    projectsGrid.innerHTML = "";
    projects.forEach((proj, index) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <img src="${proj.img}" alt="${proj.name}">
            <div class="project-info">
                <h3>${proj.name}</h3>
                <p style="color: gray;">${proj.service}</p>
                ${adminActive ? `
                <div style="margin-top: 15px; display: flex; gap: 10px;">
                    <button class="btn-outline" onclick="editProject(${index})" style="padding: 5px 10px; font-size: 12px;">Editar</button>
                    <button class="btn-outline" onclick="deleteProject(${index})" style="padding: 5px 10px; font-size: 12px; border-color: gray; color: gray;">Eliminar</button>
                </div>` : ''}
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// PROTECCIÓN: Solo se activa el botón admin si existe en el HTML actual
if (btnAdminMode && adminPanel) {
    btnAdminMode.onclick = () => {
        adminActive = !adminActive;
        adminPanel.classList.toggle('hidden');
        renderProjects();
        if(adminActive) window.scrollTo({ top: adminPanel.offsetTop - 70, behavior: 'smooth' });
    };
}

// PROTECCIÓN: Solo se activa el botón de cerrar si existe en el HTML actual
if (btnCloseAdmin && adminPanel) {
    btnCloseAdmin.onclick = () => {
        adminActive = false;
        adminPanel.classList.add('hidden');
        renderProjects();
    };
}

// PROTECCIÓN: Solo se activa el listener del formulario si este existe
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const img = document.getElementById('img').value;
        const editIndex = document.getElementById('edit-index').value;

        if (editIndex === "") {
            projects.push({ name, service, img });
        } else {
            projects[editIndex] = { name, service, img };
            document.getElementById('edit-index').value = "";
        }

        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
        form.reset();
    });
}

function deleteProject(index) {
    if (confirm("¿Eliminar proyecto?")) {
        projects.splice(index, 1);
        localStorage.setItem('projects', JSON.stringify(projects));
        renderProjects();
    }
}

function editProject(index) {
    const proj = projects[index];
    if (document.getElementById('name')) document.getElementById('name').value = proj.name;
    if (document.getElementById('service')) document.getElementById('service').value = proj.service;
    if (document.getElementById('img')) document.getElementById('img').value = proj.img;
    if (document.getElementById('edit-index')) document.getElementById('edit-index').value = index;
    if (adminPanel) window.scrollTo({ top: adminPanel.offsetTop - 70, behavior: 'smooth' });
}

renderProjects();