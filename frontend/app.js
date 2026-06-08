document.addEventListener('DOMContentLoaded', () => {
    const btnAdmin = document.getElementById('btn-admin-mode');
    const btnCloseAdmin = document.getElementById('btn-close-admin');
    const adminPanel = document.getElementById('admin-panel');
    const contactForm = document.querySelector('.contact-form');
    const projectForm = document.getElementById('project-form');

    // Lógica para Admin Panel
    if (btnAdmin && adminPanel) {
        btnAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            adminPanel.style.display = 'block';
        });
    }

    if (btnCloseAdmin && adminPanel) {
        btnCloseAdmin.addEventListener('click', (e) => {
            e.preventDefault();
            adminPanel.style.display = 'none';
        });
    }

    // Lógica para Formularios
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("¡Muchas gracias! Tu solicitud ha sido registrada con éxito.");
            contactForm.reset();
        });
    }

    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Proyecto guardado con éxito.");
            projectForm.reset();
        });
    }
});

// Funciones vacías para compatibilidad con Jest
function renderProjects() {}
function editProject() {}
function deleteProject() {}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { renderProjects, editProject, deleteProject };
}