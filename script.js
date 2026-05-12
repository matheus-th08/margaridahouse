// =========================
// CONFIGURAÇÃO DO SITE
// =========================

// valor da diária
const precoNoite = 700;


// =========================
// ANIMAÇÃO AO ROLAR A TELA
// =========================

// pega todos elementos com classe "fade"
const elements = document.querySelectorAll('.fade');

// detecta rolagem da página
window.addEventListener('scroll', () => {

    // percorre cada elemento
    elements.forEach(el => {

        // quando elemento entrar na tela
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {

            // adiciona classe show
            el.classList.add('show');

        }

    });

});


// =========================
// CALENDÁRIO
// =========================

// inicia o flatpickr
flatpickr("#calendario", {

    // seleciona intervalo de datas
    mode: "range",

    // formato da data
    dateFormat: "d/m/Y",

    // impede datas passadas
    minDate: "today",

    // idioma português
    locale: "pt",

    // executa função ao mudar data
    onChange: calcularTotal

});


// =========================
// CALCULAR TOTAL DA RESERVA
// =========================
function calcularTotal(selectedDates) {

    // verifica se duas datas foram selecionadas
    if (selectedDates.length === 2) {

        // data inicial
        const inicio = selectedDates[0];

        // data final
        const fim = selectedDates[1];

        // calcula quantidade de noites
        const diff = (fim - inicio) / (1000 * 60 * 60 * 24);

        // calcula valor total
        const total = diff * precoNoite;

        // mostra quantidade de noites
        document.getElementById("noites").innerText = diff;

        // mostra preço total
        document.getElementById("total").innerText = `R$ ${total}`;

    }

}


// =========================
// BOTÃO RESERVAR
// =========================
function reservar() {

    // pega datas escolhidas
    const datas = document.getElementById("calendario").value;

    // pega valor total
    const total = document.getElementById("total").innerText;

    // verifica se escolheu data
    if (!datas) {

        alert("Selecione as datas!");

        return;
    }

    // mensagem do whatsapp
    const mensagem =
        `Olá! Quero reservar:\nDatas: ${datas}\nTotal: ${total}`;

    // número do whatsapp
    const telefone = "5522997099571";

    // abre whatsapp
    window.open(
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`
    );

}


// =========================
// CARROSSEL E LIGHTBOX
// =========================
document.addEventListener("DOMContentLoaded", () => {

    // pega todos slides
    const slides = document.querySelectorAll(".slide");

    // pega dots
    const dots = document.querySelectorAll(".dot");

    // botão próximo
    const next = document.querySelector(".next");

    // botão anterior
    const prev = document.querySelector(".prev");

    // lightbox
    const lightbox = document.getElementById("lightbox");

    // imagem do lightbox
    const lightboxImg = document.getElementById("lightbox-img");

    // botão fechar
    const closeBtn = document.querySelector(".close");

    // slide atual
    let current = 0;


    // =========================
    // MOSTRAR SLIDE
    // =========================
    function showSlide(index) {

        // percorre slides
        slides.forEach((slide, i) => {

            // remove slide ativo
            slide.classList.remove("active");

            // remove dot ativo
            if (dots[i]) {
                dots[i].classList.remove("active");
            }

        });

        // ativa slide atual
        slides[index].classList.add("active");

        // ativa dot atual
        if (dots[index]) {
            dots[index].classList.add("active");
        }

        // atualiza slide atual
        current = index;

    }


    // =========================
    // BOTÃO PRÓXIMO
    // =========================
    next.addEventListener("click", () => {

        // avança slide
        current = (current + 1) % slides.length;

        // mostra slide
        showSlide(current);

    });


    // =========================
    // BOTÃO ANTERIOR
    // =========================
    prev.addEventListener("click", () => {

        // volta slide
        current = (current - 1 + slides.length) % slides.length;

        // mostra slide
        showSlide(current);

    });


    // =========================
    // DOTS
    // =========================
    dots.forEach((dot, i) => {

        // clique no dot
        dot.addEventListener("click", () => {

            // mostra slide clicado
            showSlide(i);

        });

    });


    // =========================
    // AUTO PLAY
    // =========================
    setInterval(() => {

        // avança slide automaticamente
        current = (current + 1) % slides.length;

        // mostra slide
        showSlide(current);

    }, 5000);


    // =========================
    // LIGHTBOX
    // =========================

    // percorre imagens
    document.querySelectorAll(".slide img").forEach(img => {

        // clique na imagem
        img.addEventListener("click", () => {

            // abre lightbox
            lightbox.style.display = "flex";

            // coloca imagem clicada
            lightboxImg.src = img.src;

        });

    });


    // =========================
    // FECHAR NO X
    // =========================
    closeBtn.addEventListener("click", () => {

        // fecha lightbox
        lightbox.style.display = "none";

    });


    // =========================
    // FECHAR CLICANDO FORA
    // =========================
    lightbox.addEventListener("click", (e) => {

        // verifica clique fora da imagem
        if (e.target === lightbox) {

            // fecha lightbox
            lightbox.style.display = "none";

        }

    });

});

// =========================
// FORMULÁRIO DE LOGIN
// =========================

function login(event) {

    event.preventDefault();

    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;

    if (email !== "" && senha !== "") {

        window.location.href = "index.html";

    } else {

        alert("Preencha email e senha!");

    }

}
