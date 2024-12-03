const hamburguer = document.querySelector(".Hamburguer");
const navMenu = document.querySelector(".navmenu");

hamburguer.addEventListener("click", () => {
    hamburguer.classList.toggle("active");
    navMenu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburguer.classList.remove("active");
    navMenu.classList.remove("active");
}));

const form = document.querySelector('form');
const fullName = document.getElementById("name")
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const subject = document.getElementById("subject");
const message = document.getElementById("message");



function sendEmail(){
    const bodyMessage = `Nome Completo: ${fullName.value}<br> Email: ${email.value}<br> Telefone para Contato: ${phone.value}<br> Numero do Processo: ${subject.value}<br> Mensagem: ${message.value}`;

    Email.send({
        SecureToken : "82fd3796-0fde-4a64-aa71-ea79b6e25b18",

        To : 'bluedennpsvictor@gmail.com',
        From : "bluedennpsvictor@gmail.com",
        Subject : subject,
        Body : bodyMessage,
    }).then(
        message => {
            if ( message == "OK"){
                Swal.fire({
                    title: "Parabens!",
                    text: "Sua Mensagem foi Enviada",
                    icon: "success"
                  });
            }

        }
    );
}

function checkInputs() {
    const items = document.querySelectorAll(".item");
    const email = items[1]; // Considerando que o item[1] seja o campo de email
    const errorTxtEmail = document.querySelector(".error-txt.email");

    // Loop para verificar os inputs
    for (const item of items) {
        // Verifica se o campo está vazio e adiciona classe de erro
        if (item.value === "") {
            item.classList.add("error");
            item.parentElement.classList.add("error");
        } else {
            item.classList.remove("error");
            item.parentElement.classList.remove("error");
        }

        // Verifica o campo de email após o usuário digitar
        item.addEventListener("keyup", () => {
            if (item.value === "") {
                item.classList.add("error");
                item.parentElement.classList.add("error");
            } else {
                item.classList.remove("error");
                item.parentElement.classList.remove("error");
            }

            // Se for o campo de email, verifica a validade
            if (item === email) {
                checkEmail(email, errorTxtEmail);
            }
        });
    }
}

// Função para verificar se o email é válido
function checkEmail(email, errorTxtEmail) {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    
    // Verifica se o valor do campo de email corresponde à expressão regular
    if (!email.value.match(emailRegex)) {
        // Se o email for inválido
        email.classList.add("error");
        email.parentElement.classList.add("error");
        errorTxtEmail.innerText = "Escreva um Email válido"; // Exibe a mensagem de erro
    } else {
        // Se o email for válido
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
        errorTxtEmail.innerText = ""; // Limpa a mensagem de erro
    }
}

form.addEventListener("submit", (e) =>{
    e.preventDefault();
    checkInputs();

    if (!fullName.classList.contains("error") && !email.classList.contains("error") && !phone.classList.contains("error") && !subject.classList.contains("error") &&!message.classList.contains("error")) {
        sendEmail();

        form.reset();
        return false;
    }

    //sendEmail();
});