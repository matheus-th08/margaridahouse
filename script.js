// =========================
// CONFIGURAÇÃO DO SITE
// =========================

const precoNoite = 700;


// =========================
// ANIMAÇÃO AO ROLAR
// =========================

const fadeElements = document.querySelectorAll('.fade');

function ativarFade() {

    fadeElements.forEach((element) => {

        const top = element.getBoundingClientRect().top;

        if (top < window.innerHeight - 100) {

            element.classList.add('show');

        }

    });

}

window.addEventListener('scroll', ativarFade);

window.addEventListener('load', ativarFade);


// =========================
// CALENDÁRIO
// =========================

flatpickr("#calendario", {

    mode: "range",

    dateFormat: "d/m/Y",

    minDate: "today",

    locale: "pt",

    onChange: calcularTotal

});


// =========================
// CALCULAR TOTAL
// =========================

function calcularTotal(selectedDates) {

    if (selectedDates.length === 2) {

        const inicio = selectedDates[0];

        const fim = selectedDates[1];

        const noites =
            (fim - inicio) / (1000 * 60 * 60 * 24);

        const total = noites * precoNoite;

        document.getElementById("noites").innerText =
            noites;

        document.getElementById("total").innerText =
            `R$ ${total.toLocaleString('pt-BR')}`;

    }

}


// =========================
// BOTÃO RESERVAR
// =========================

function reservar() {

    const datas =
        document.getElementById("calendario").value;

    const total =
        document.getElementById("total").innerText;

    if (!datas) {

        alert("Selecione as datas!");

        return;

    }

    const telefone = "5522997099571";

    const mensagem =
        `Olá! Quero reservar:%0A%0A` +
        `Datas: ${datas}%0A` +
        `Total: ${total}`;

    window.open(
        `https://wa.me/${telefone}?text=${mensagem}`,
        "_blank"
    );

}


// =========================
// CARROSSEL
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const slides =
        document.querySelectorAll(".slide");

    const dots =
        document.querySelectorAll(".dot");

    const next =
        document.querySelector(".next");

    const prev =
        document.querySelector(".prev");

    let current = 0;


    // =========================
    // MOSTRAR SLIDE
    // =========================

    function showSlide(index) {

        slides.forEach((slide, i) => {

            slide.classList.remove("active");

            dots[i].classList.remove("active");

        });

        slides[index].classList.add("active");

        dots[index].classList.add("active");

        current = index;

    }


    // =========================
    // PRÓXIMO
    // =========================

    next.addEventListener("click", () => {

        current =
            (current + 1) % slides.length;

        showSlide(current);

    });


    // =========================
    // ANTERIOR
    // =========================

    prev.addEventListener("click", () => {

        current =
            (current - 1 + slides.length) % slides.length;

        showSlide(current);

    });


    // =========================
    // DOTS
    // =========================

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

        });

    });


    // =========================
    // AUTO PLAY
    // =========================

    setInterval(() => {

        current =
            (current + 1) % slides.length;

        showSlide(current);

    }, 5000);


    // =========================
    // LIGHTBOX
    // =========================

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImg =
        document.getElementById("lightbox-img");

    const closeBtn =
        document.querySelector(".close");


    document.querySelectorAll(".slide img")
        .forEach((img) => {

            img.addEventListener("click", () => {

                lightbox.style.display = "flex";

                lightboxImg.src = img.src;

            });

        });


    // =========================
    // FECHAR LIGHTBOX
    // =========================

    closeBtn.addEventListener("click", fecharLightbox);

    lightbox.addEventListener("click", (e) => {

        if (e.target === lightbox) {

            fecharLightbox();

        }

    });

    function fecharLightbox() {

        lightbox.style.display = "none";

    }


    // =========================
    // SWIPE MOBILE
    // =========================

    let startX = 0;

    let endX = 0;

    const carousel =
        document.querySelector(".carousel");


    carousel.addEventListener("touchstart", (e) => {

        startX = e.touches[0].clientX;

    });


    carousel.addEventListener("touchend", (e) => {

        endX = e.changedTouches[0].clientX;

        handleSwipe();

    });


    function handleSwipe() {

        const diff = startX - endX;

        // esquerda

        if (diff > 50) {

            current =
                (current + 1) % slides.length;

            showSlide(current);

        }

        // direita

        if (diff < -50) {

            current =
                (current - 1 + slides.length) % slides.length;

            showSlide(current);

        }

    }

});


// =========================
// LOGIN
// =========================

function login(event) {

    event.preventDefault();

    const email =
        document.getElementById("email").value;

    const senha =
        document.getElementById("senha").value;

    if (email !== "" && senha !== "") {

        window.location.href = "index.html";

    } else {

        alert("Preencha email e senha!");

    }

}

// =========================
// MENU MOBILE
// =========================

const menuToggle =
    document.getElementById("menu-toggle");

const menuMobile =
    document.getElementById("menu-mobile");

menuToggle.addEventListener("click", () => {

    menuMobile.classList.toggle("active");

});