export async function register() {
    const form = document.getElementById("registerForm");

    if (!form) return;

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const errorMensage = document.getElementById("errorMensage");

        const response = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.text();

        if (!response.ok) {
            errorMensage.classList.remove("sucessMensage");
            errorMensage.classList.add("failMensage")
            errorMensage.textContent = data;
            return;
        }

        errorMensage.classList.remove("failMensage");
        errorMensage.classList.add("sucessMensage")
        errorMensage.textContent = "Cadastro realizado com sucesso!";

        window.location.href = "/login";
    });
}

export async function login() {
    const formLogin = document.getElementById("loginForm");

    if (!formLogin) return;

    formLogin.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;
        const errorMensage = document.getElementById("loginErrorMensage");

        const response = await fetch("/loginUser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.text();

        if (!response.ok) {
            errorMensage.classList.remove("sucessMensage");
            errorMensage.classList.add("failMensage")
            errorMensage.textContent = data;
            return;
        }

        window.location.href = "/";
    });
}

export async function getUserId() {
    const res = await fetch("/me");
    const session = await res.json();

    if (session.logged) {
        return session.user_id;
    }

    return null;
}