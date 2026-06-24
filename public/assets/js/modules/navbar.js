export async function initNavbar() {

    const navbar = document.getElementById('navbar');

    if (!navbar) {
        return;
    }

    const response = await fetch('views/components/navbar.html');

    const html = await response.text();

    navbar.innerHTML = html;

    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            console.log('clicou');
            menu.classList.toggle('active');
        });
    }

    const sessionBtn = document.getElementById("sessionButton");

    const res = await fetch("/me");
    const session = await res.json();

    if (session.logged) {
        sessionBtn.textContent = "Logout";

        sessionBtn.addEventListener("click", async (e) => {

            await fetch("/logout", {
                method: "POST"
            });

            window.location.href = "/";
        });

    } else {
        sessionBtn.textContent = "Login";
        sessionBtn.onclick = () => {
            window.location.href = "/login";
        };
    }
}