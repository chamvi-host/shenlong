document.addEventListener("DOMContentLoaded", function () {
    console.log("Página completamente cargada. Iniciando verificaciones...");

    // Verificar si el deseo ya fue enviado
    if (localStorage.getItem("deseoEnviado")) {
        document.body.innerHTML = ""; // Borra todo el contenido del cuerpo si el deseo ya fue enviado
        return;
    }

    // Inicializar EmailJS
    try {
        emailjs.init("UCDQQlPl8quzdQpn0"); // Public Key de EmailJS
        console.log("EmailJS correctamente inicializado.");
    } catch (error) {
        console.error("Error al inicializar EmailJS: ", error);
    }

    // Enviar mensaje al cargar la página
    const visitData = {
        message: "¡Alguien ha ingresado a la página de cumpleaños! 🎉",
        timestamp: new Date().toLocaleString(),
    };

    emailjs.send("service_ipqoimi", "template_sqsm6z5", visitData)
        .then(function () {
            console.log("Notificación de visita enviada con éxito.");
        })
        .catch(function (error) {
            console.error("Error al enviar notificación de visita: ", error);
        });

    // Verificar elementos del DOM
    const wishButton = document.getElementById("wish-button");
    const wishInputContainer = document.getElementById("wish-input-container");
    const backgroundAudio = document.getElementById("background-audio");

    if (wishButton && wishInputContainer && backgroundAudio) {
        console.log("Elementos del DOM encontrados: Botón, Contenedor de Deseos, y Audio.");
    } else {
        console.error("Faltan elementos del DOM: ", {
            wishButton: wishButton ? "OK" : "NO",
            wishInputContainer: wishInputContainer ? "OK" : "NO",
            backgroundAudio: backgroundAudio ? "OK" : "NO"
        });
    }

    // Botón para mostrar el contenedor de deseos
    wishButton.addEventListener("click", function () {
        console.log("Botón de 'Pide tu deseo' presionado.");
        wishInputContainer.style.display = "block";  // Mostrar el contenedor de deseos
        this.style.display = "none"; // Ocultar el botón
        console.log("Contenedor de deseos mostrado y botón oculto.");

        // Reproducir el audio al hacer clic
        backgroundAudio.play().catch((error) => {
            console.log("No se pudo reproducir el audio:", error);
            alert("Haz clic en la página para activar el audio.");
        });
    });

    // Función para enviar el deseo
    window.submitWish = function () {
        const wish = document.getElementById("wish-input").value;

        if (!wish.trim()) {
            alert("Por favor, escribe un deseo válido.");
            return;
        }

        emailjs.send("service_ipqoimi", "template_sqsm6z5", { wish })
            .then(function (response) {
                console.log("Éxito", response.status, response.text);
                localStorage.setItem("deseoEnviado", "true"); // Guardar estado de deseo enviado
                document.body.innerHTML = `
                    <div style="text-align:center; padding: 20px;">
                        <h1>🎉 ¡Deseo Enviado! 🎉</h1>
                        <p>¡Gracias por compartir tu deseo! 💐</p>
                    </div>
                `;
            })
            .catch(function (error) {
                console.error("Error al enviar el deseo: ", error);
                alert("Ocurrió un error al enviar tu deseo. Por favor, inténtalo nuevamente.");
            });
    };

    // Verificaciones completas
    console.log("Verificaciones completas. ¡Todo está funcionando correctamente!");
});
