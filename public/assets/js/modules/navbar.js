export async function initNavbar() {

    const navbar = document.getElementById('navbar');

    if (!navbar){
        return;
    }

    const response = await fetch('/components/navbar.html');

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
}