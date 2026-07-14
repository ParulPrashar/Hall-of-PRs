// =========================
// DARK / LIGHT MODE
// =========================

const themeToggle = document.createElement("button");

themeToggle.id = "theme-toggle";

themeToggle.className = "theme-toggle";

themeToggle.innerHTML = `<i class="fa-solid fa-moon"></i>`;

document.querySelector(".right-div").prepend(themeToggle);

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    }
});


// =========================
// COUNTER ANIMATION
// =========================

const counter = document.getElementById("counter-number");

let count = 0;

const target = 249;

const speed = 15;

function updateCounter() {

    if (count < target) {

        count++;

        counter.innerText = count;

        setTimeout(updateCounter, speed);

    }
}

updateCounter();


// =========================
// CARD ANIMATION
// =========================

const cards = document.querySelectorAll(".card");

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "translateY(-10px) scale(1.03)";
    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "translateY(0px)";
    });
});


// =========================
// RIPPLE BUTTON EFFECT
// =========================

const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {

    button.addEventListener("click", function (e) {

        let x = e.clientX - e.target.offsetLeft;

        let y = e.clientY - e.target.offsetTop;

        let ripple = document.createElement("span");

        ripple.style.left = `${x}px`;

        ripple.style.top = `${y}px`;

        ripple.classList.add("ripple");

        this.appendChild(ripple);

        setTimeout(() => {

            ripple.remove();

        }, 600);
    });
});


// =========================
// NAVBAR SCROLL EFFECT
// =========================

window.addEventListener("scroll", () => {

    const header = document.querySelector("header");

    if (window.scrollY > 30) {

        header.style.boxShadow = "0 0 20px rgba(127,90,240,0.3)";

    } else {

        header.style.boxShadow = "none";
    }
});