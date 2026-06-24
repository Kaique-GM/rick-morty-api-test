import { getUserId } from "../controllers/auth.js";

export async function initCharacters() {
    let currentUrl = "https://rickandmortyapi.com/api/character";
    let nextUrl = null;
    let prevUrl = null;

    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");

    const data = await loadCharacters(currentUrl);
    nextUrl = data.nextUrl;
    prevUrl = data.prevUrl;
    updateButtons();

    nextBtn.addEventListener("click", async () => {
        if (!nextUrl) return;

        const data = await loadCharacters(nextUrl);

        nextUrl = data.nextUrl;
        prevUrl = data.prevUrl;

        updateButtons();
    });

    prevBtn.addEventListener("click", async () => {
        if (!prevUrl) return;

        const data = await loadCharacters(prevUrl);

        nextUrl = data.nextUrl;
        prevUrl = data.prevUrl;

        updateButtons();
    });

    function updateButtons() {
        nextBtn.disabled = !nextUrl;
        prevBtn.disabled = !prevUrl;
    }
}

export async function initSavedCharacters() {
    const userId = await getUserId();
    const container = document.getElementById("cardSection");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const response = await fetch("/getCharacters", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            user_id: userId
        })
    });

    const data = await response.json();

    data.characters.forEach(character => {
        const card = document.createElement("a");
        card.href = "/personagem?id=" + character.api_id;
        card.classList.add("cardBox");

        card.innerHTML = `
            <div class="cardImg">
                <img src="${character.image}" alt="${character.name}" draggable="false">
            </div>

            <div class="cardText">
                <h2>${character.name}</h2>

                <div class="origem">
                    <p>Espécie: </p>
                    <span>${character.species}</span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });
}

async function loadCharacters(url) {
    const container = document.getElementById("cardSection");

    const res = await fetch(url);
    const data = await res.json();

    if (!container) {
        return;
    }

    container.innerHTML = "";

    data.results.forEach(character => {
        const card = document.createElement("a");
        card.href = "/personagem?id=" + character.id;
        card.classList.add("cardBox");
        let statusClass;

        switch (character.status) {
            case "Alive":
                statusClass = "statusAlive";
                break;

            case "Dead":
                statusClass = "statusDead";
                break;

            default:
                statusClass = "statusUnknown";
                break;
        }

        card.innerHTML = `
            <div class="cardImg">
                <img src="${character.image}" alt="${character.name}" draggable="false">
            </div>

            <div class="cardText">
                <h2>${character.name}</h2>

                <div class="status">
                    <i class="fa-solid fa-circle ${statusClass}"></i>
                    <span>${character.status} - ${character.species}</span>
                </div>

                <div class="origem">
                    <p>Origem: </p>
                    <span>${character.origin.name}</span>
                </div>
            </div>
        `;

        container.appendChild(card);
    });

    return {
        nextUrl: data.info.next,
        prevUrl: data.info.prev
    };
}