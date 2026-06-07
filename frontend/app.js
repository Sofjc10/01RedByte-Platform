const contactForm = document.getElementById('contact-form') || document.querySelector('form:not(#project-form)'); 

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('name') || contactForm.querySelector('input[type="text"]') || contactForm.querySelector('input');
        const emailInput = document.getElementById('email') || contactForm.querySelector('input[type="email"]') || contactForm.querySelectorAll('input')[1];
        const messageInput = document.getElementById('message') || contactForm.querySelector('textarea');

        const clientName = nameInput ? nameInput.value : "No provisto";
        const clientEmail = emailInput ? emailInput.value : "jairocasas@gmail.com";
        const clientMessage = messageInput ? messageInput.value : "Sin mensaje";

        const newRequest = {
            name: clientName,
            email: clientEmail,
            message: clientMessage,
            date: new Date().toLocaleDateString()
        };

        let leadRequests = JSON.parse(localStorage.getItem('leadRequests')) || [];
        leadRequests.push(newRequest);
        localStorage.setItem('leadRequests', JSON.stringify(leadRequests));

        alert("¡Muchas gracias! Tu solicitud ha sido registrada con éxito en localStorage.");
        contactForm.reset();
    });
}