document.addEventListener("DOMContentLoaded", function () {

    const sendButton = document.getElementById("send-button");
    const messageInput = document.getElementById("message-input");
    const chatMessages = document.getElementById("chat-messages");

    if (!sendButton || !messageInput || !chatMessages) {
        console.error("No se encontraron los elementos del chatbot.");
        return;
    }

    let sending = false;

    async function sendMessage() {

        const message = messageInput.value.trim();

        if (!message || sending) {
            return;
        }

        sending = true;

        // Mostrar mensaje del usuario
        addMessage(
            message,
            "user"
        );

        // Limpiar input
        messageInput.value = "";

        // Desactivar mientras responde
        messageInput.disabled = true;
        sendButton.disabled = true;

        // Mostrar mensaje temporal
        const loadingMessage = addMessage(
            "Escribiendo...",
            "bot",
            true
        );

        try {

            const response = await fetch(
                "/public_html/wp-content/cdm-chatbot/chat.php",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        message: message
                    })
                }
            );

            if (!response.ok) {
                throw new Error(
                    "Error HTTP: " + response.status
                );
            }

            const data = await response.json();

            // Quitar "Escribiendo..."
            if (loadingMessage) {
                loadingMessage.remove();
            }

            if (data.status === "ok") {

                addMessage(
                    data.reply,
                    "bot",
                    false,
                    data.product
                );

            } else {

                console.error(
                    "Error del servidor:",
                    data
                );

                addMessage(
                    "Lo siento, ocurrió un error al procesar tu mensaje.",
                    "bot"
                );
            }

        } catch (error) {

            if (loadingMessage) {
                loadingMessage.remove();
            }

            console.error(
                "Error del chatbot:",
                error
            );

            addMessage(
                "No pude conectarme con el asistente. Intenta nuevamente.",
                "bot"
            );

        } finally {

            sending = false;

            messageInput.disabled = false;
            sendButton.disabled = false;

            messageInput.focus();
        }
    }


    function addMessage(
        text,
        type,
        temporary = false,
        product = null
    ) {

        const messageElement =
            document.createElement("div");

        messageElement.classList.add(
            "message",
            type
        );

        if (temporary) {
            messageElement.classList.add(
                "temporary-message"
            );
        }


        // Texto del mensaje
        const textElement =
            document.createElement("div");

        textElement.textContent = text;

        messageElement.appendChild(
            textElement
        );


        // Botón "Ver producto"
        if (
            product &&
            product.url
        ) {

            const productButton =
                document.createElement("a");

            productButton.href =
                product.url;

            productButton.target =
                "_blank";

            productButton.rel =
                "noopener noreferrer";

            productButton.classList.add(
                "product-link"
            );

            productButton.textContent =
                "Ver producto →";

            messageElement.appendChild(
                productButton
            );
        }


        chatMessages.appendChild(
            messageElement
        );

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

        return messageElement;
    }


    // BOTÓN ENVIAR
    sendButton.addEventListener(
        "click",
        sendMessage
    );


    // ENTER PARA ENVIAR
    messageInput.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();
            }
        }
    );

});


const chatButton = document.getElementById("chat-button");
const chatContainer = document.getElementById("chat-container");
const chatClose = document.getElementById("chat-close");

const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");
const chatMessages = document.getElementById("chat-messages");


// ABRIR CHAT
chatButton.addEventListener("click", function () {
    chatContainer.classList.add("active");
});


// CERRAR CHAT
chatClose.addEventListener("click", function () {
    chatContainer.classList.remove("active");
});


// ENVIAR MENSAJE
function sendMessage() {

    const message = chatInput.value.trim();

    if (message === "") return;

    // Mensaje del usuario
    const userMessage = document.createElement("div");

    userMessage.className = "chat-message user";
    userMessage.textContent = message;

    chatMessages.appendChild(userMessage);

    chatInput.value = "";

    // Respuesta temporal
    setTimeout(function () {

        const botMessage = document.createElement("div");

        botMessage.className = "chat-message bot";

        botMessage.textContent =
            "🤖 En este momento el chatbot no está disponible.";

        chatMessages.appendChild(botMessage);

        chatMessages.scrollTop = chatMessages.scrollHeight;

    }, 500);
}


// BOTÓN ENVIAR
chatSend.addEventListener("click", sendMessage);


// ENTER
chatInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        sendMessage();
    }

});