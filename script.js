document.addEventListener("DOMContentLoaded", function () {
    console.log("Página completamente cargada. Iniciando verificaciones...");

    // Verificar si el deseo ya fue enviado
    if (localStorage.getItem("deseoEnviado")) {
        document.body.innerHTML = ""; // Borra todo el contenido si el deseo ya fue enviado
        return;
    }

    // Inicializar EmailJS
    try {
        emailjs.init("UCDQQlPl8quzdQpn0");
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

    // Botón para mostrar el video de Shenlong y luego el contenedor de deseos
    wishButton.addEventListener("click", function () {
        console.log("Botón de 'Pide tu deseo' presionado.");

        // Ocultar el botón y mostrar el video de Shenlong
        this.style.display = "none";
        const videoContainer = document.createElement("div");
        videoContainer.innerHTML = `
            <video id="shenlong-video" width="600" controls autoplay>
                <source src="shenlong-video.mp4" type="video/mp4">
                Tu navegador no soporta este video.
            </video>
        `;
        document.body.appendChild(videoContainer);

        const video = document.getElementById("shenlong-video");

        // Esperar a que termine el video de Shenlong para mostrar el cuadro de texto
        video.onended = function () {
            videoContainer.style.display = "none"; // Ocultar video de Shenlong
            wishInputContainer.style.display = "block"; // Mostrar contenedor de deseos
            console.log("Video de Shenlong terminado. Ahora se puede escribir el deseo.");
        };

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
                        <p>¡Tu deseo ha sido concedido por Shenlong! 🎂</p>
                        <video width="600" controls autoplay>
                            <source src="deseo-concedido.mp4" type="video/mp4">
                            Tu navegador no soporta este video.
                        </video>
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
