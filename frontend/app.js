document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    initAdminMenu();
    initForms();
});

function initAdminMenu() {
    const btnAdmin = document.getElementById('btn-admin-mode');
    const btnCloseAdmin = document.getElementById('btn-close-admin');
    const adminPanel = document.getElementById('admin-panel');

    if (btnAdmin && adminPanel) {
        btnAdmin.addEventListener('click', () => {
            adminPanel.classList.toggle('hidden');
        });
    }
    if (btnCloseAdmin && adminPanel) {
        btnCloseAdmin.addEventListener('click', () => {
            adminPanel.classList.add('hidden');
        });
    }
}

function initForms() {
    const projectForm = document.getElementById('project-form');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const serviceInput = document.getElementById('service');
            const imgInput = document.getElementById('img');
            const editIndexInput = document.getElementById('edit-index');
            
            if (!nameInput || !serviceInput || !imgInput) return;
            
            const newProject = {
                title: nameInput.value,
                category: serviceInput.value,
                image: imgInput.value,
                link: '#'
            };
            
            let projects = JSON.parse(localStorage.getItem('projects')) || [];
            const editIndex = editIndexInput ? editIndexInput.value : '';
            
            if (editIndex !== '') {
                projects[parseInt(editIndex)] = newProject;
                if (editIndexInput) editIndexInput.value = '';
            } else {
                projects.push(newProject);
            }
            
            localStorage.setItem('projects', JSON.stringify(projects));
            projectForm.reset();
            renderProjects();
        });
    }

    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("¡Muchas gracias! Tu solicitud ha sido registrada con éxito.");
            contactForm.reset();
        });
    }
}

function renderProjects() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    container.innerHTML = '';
    
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    if (projects.length === 0) {
        projects = [
            {
                title: "Barbería Classic Style",
                category: "Estética y Barbería",
                image: "imagenes/Imagen Barberia.jpg",
                link: "https://facebook.com"
            },
            {
                title: "Pet Shop Peluquería Canina",
                category: "Cuidado Mascotas",
                image: "imagenes/Imagen peluqueria canina.jpg",
                link: "https://instagram.com"
            }
        ];
    }
    
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
    container.style.gap = '25px';
    container.style.padding = '20px 0';
    
    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.style.border = '1px solid #222';
        card.style.borderRadius = '12px';
        card.style.backgroundColor = '#0d0d0d';
        card.style.color = '#fff';
        card.style.overflow = 'hidden';
        card.style.boxShadow = '0 8px 16px rgba(0,0,0,0.5)';
        
        card.innerHTML = `
            <img src="${encodeURI(project.image)}" alt="${project.title}" style="width: 100%; height: 180px; object-fit: cover; border-bottom: 1px solid #222;">
            <div style="padding: 20px;">
                <h3 style="margin: 0 0 10px 0; font-size: 1.4em; color: #fff;">${project.title}</h3>
                <p style="color: #007bff; font-size: 0.9em; margin: 0 0 15px 0; font-weight: bold; text-transform: uppercase;">${project.category}</p>
                <a href="${project.link}" target="_blank" style="display: block; text-align: center; background-color: #111; color: #fff; border: 1px solid #333; padding: 10px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 0.9em; margin-bottom: 10px;">Visitar Negocio →</a>
                <div style="display: flex; gap: 10px;">
                    <button onclick="editProject(${index})" style="flex: 1; background-color: #333; color: white; border: 1px solid #444; padding: 5px; cursor: pointer; border-radius: 4px; font-size: 0.85em;">Editar</button>
                    <button onclick="deleteProject(${index})" style="flex: 1; background-color: #dc3545; color: white; border: none; padding: 5px; cursor: pointer; border-radius: 4px; font-size: 0.85em;">Eliminar</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function editProject(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const project = projects[index];
    if (!project) return;
    
    const nameInput = document.getElementById('name');
    const serviceInput = document.getElementById('service');
    const imgInput = document.getElementById('img');
    const editIndexInput = document.getElementById('edit-index');
    const adminPanel = document.getElementById('admin-panel');
    
    if (nameInput) nameInput.value = project.title;
    if (serviceInput) serviceInput.value = project.category;
    if (imgInput) imgInput.value = project.image;
    if (editIndexInput) editIndexInput.value = index;
    
    if (adminPanel) adminPanel.classList.remove('hidden');
}

function deleteProject(index) {
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.splice(index, 1);
    localStorage.setItem('projects', JSON.stringify(projects));
    renderProjects();
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { renderProjects, deleteProject, editProject };
}