document.addEventListener('DOMContentLoaded', function() {

    // --- Lógica para el Formulario de Contacto ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = document.getElementById('sendMessageButton');

    // La URL de tu endpoint de Formspree para el formulario de contacto
    const formspreeContactEndpoint = 'https://formspree.io/f/mdkdzjqz';

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            submitButton.disabled = true;
            formMessage.innerHTML = '';

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(formspreeContactEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formMessage.innerHTML = '<div class="alert alert-success" role="alert">¡Mensaje enviado con éxito! Te responderemos pronto.</div>';
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error: ' + data.errors.map(err => err.message).join(', ') + '</div>';
                    } else {
                        formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Lo sentimos, hubo un problema al enviar tu mensaje. Inténtalo de nuevo.</div>';
                    }
                }
            } catch (error) {
                console.error('Error al enviar el formulario de contacto:', error);
                formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error de conexión. Asegúrate de tener Internet y vuelve a intentarlo.</div>';
            } finally {
                submitButton.disabled = false;
            }
        });
    }

    // --- Lógica para el Formulario de Newsletter ---
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMessage = document.getElementById('newsletterMessage');
    const newsletterButton = document.getElementById('newsletterButton');

    // La URL de tu endpoint de Formspree para el formulario de newsletter
    const formspreeNewsletterEndpoint = 'https://formspree.io/f/xovllgzg'; // **¡Reemplaza esto con tu URL real!**

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            newsletterButton.disabled = true;
            newsletterMessage.innerHTML = '';

            const formData = new FormData(newsletterForm);

            try {
                const response = await fetch(formspreeNewsletterEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    newsletterMessage.innerHTML = '<div class="alert alert-success" role="alert">¡Gracias por suscribirte!</div>';
                    newsletterForm.reset();
                } else {
                    const data = await response.json();
                    if (data && data.errors) {
                        newsletterMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error: ' + data.errors.map(err => err.message).join(', ') + '</div>';
                    } else {
                        newsletterMessage.innerHTML = '<div class="alert alert-danger" role="alert">Lo sentimos, hubo un problema al suscribirte. Inténtalo de nuevo.</div>';
                    }
                }
            } catch (error) {
                console.error('Error al enviar el formulario de newsletter:', error);
                newsletterMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error de conexión. Asegúrate de tener Internet y vuelve a intentarlo.</div>';
            } finally {
                newsletterButton.disabled = false;
            }
        });
    }

});