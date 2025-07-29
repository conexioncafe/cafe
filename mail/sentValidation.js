document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitButton = document.getElementById('sendMessageButton');

    // La URL de tu endpoint de Formspree
    const formspreeEndpoint = 'https://formspree.io/f/mdkdzjqz'; // ¡CAMBIA ESTO CON TU URL REAL!

    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Evita que el formulario se envíe de forma tradicional (recarga la página)

        submitButton.disabled = true; // Deshabilita el botón para evitar múltiples envíos
        formMessage.innerHTML = ''; // Limpia cualquier mensaje anterior

        // Recoge los datos del formulario de manera sencilla
        const formData = new FormData(form);

        try {
            // Envía los datos a Formspree usando la API Fetch
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json' // Opcional, pero Formspree lo recomienda para AJAX
                }
            });

            if (response.ok) { // Si la respuesta es exitosa (código 200 OK)
                formMessage.innerHTML = '<div class="alert alert-success" role="alert">¡Mensaje enviado con éxito! Te responderemos pronto.</div>';
                form.reset(); // Reinicia el formulario
            } else { // Si hay un error en la respuesta de Formspree
                const data = await response.json();
                if (data && data.errors) {
                    formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error: ' + data.errors.map(err => err.message).join(', ') + '</div>';
                } else {
                    formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Lo sentimos, hubo un problema al enviar tu mensaje. Inténtalo de nuevo.</div>';
                }
            }
        } catch (error) { // Si hay un error de red o de conexión
            console.error('Error al enviar el formulario:', error);
            formMessage.innerHTML = '<div class="alert alert-danger" role="alert">Error de conexión. Asegúrate de tener Internet y vuelve a intentarlo.</div>';
        } finally {
            submitButton.disabled = false; // Vuelve a habilitar el botón
        }
    });
});