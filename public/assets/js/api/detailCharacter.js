import { getUserId } from "../controllers/auth.js";

export async function initCharacter() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let url = "https://rickandmortyapi.com/api/character/" + id;

    const character = await loadCharacter(url);
    const userId = await getUserId();

    const manageUserButtons = document.getElementById("userButtons");
    const saveCharacterBtn = document.getElementById("saveButton");
    const deleteCharacterBtn = document.getElementById("deleteButton");
    const mensageText = document.getElementById("mensageText");


    if (!manageUserButtons || !saveCharacterBtn || !deleteCharacterBtn) return;


    saveCharacterBtn.addEventListener("click", async () => {
        if (!userId) {
            window.location.href = "/login";
            return;
        }

        await saveCharacter(character, userId);

        manageUserButtons.classList.remove("hidden");
    });

    deleteCharacterBtn.addEventListener("click", async () => {
        if (!userId) {
            window.location.href = "/login";
            return;
        }

        const response = await deleteCharacter(character, userId);

        if (response.deleted) {
            manageUserButtons.classList.add("hidden");
            mensageText.classList.remove("sucessMensage");
            mensageText.classList.add("failMensage")
            mensageText.textContent = "Personagem removido dos favoritos.";
        }
    });

    if (userId) {
        const characterExists = await checkCharacter(character, userId);

        if (characterExists.exists) {
            manageUserButtons.classList.remove("hidden");
        }
    }
}

async function loadCharacter(url) {
    const container = document.getElementById("characterBox");

    const res = await fetch(url);
    const data = await res.json();

    if (!container) {
        return;
    }

    container.classList.add("characterBox");

    container.innerHTML = "";

    let statusClass;

    switch (data.status) {
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

    container.innerHTML = `
        <div class="characterImg">
            <img src="${data.image}" alt="${data.name}" draggable="false">
        </div>

        <div class="characterDetails">
            <h1>${data.name}</h1>

            <div class="characterStatus">
                <i class="fa-solid fa-circle ${statusClass}"></i>
                <span>${data.status} - ${data.species}</span>
            </div>

            <div class="characterContent">
                <div class="charactertext">
                    <p>Origem: </p>
                    <span>${data.origin.name}</span>
                </div>
            </div>

            <div class="characterContent">
                <div class="charactertext">
                    <p>Genero: </p>
                    <span>${data.gender}</span>
                </div>

                <div class="charactertext">
                    <p>Local: </p>
                    <span>${data.location.name}</span>
                </div>
            </div>

        </div>
    `;

    return data;
}

async function saveCharacter(character, userId) {

    let api_id = character.id;
    let user_id = userId;
    let name = character.name;
    let species = character.species;
    let image = character.image;
    let url = character.url;

    const response = await fetch("/saveCharacter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            api_id,
            user_id,
            name,
            species,
            image,
            url
        })
    });

    const data = await response.text();

    if (!response.ok) {
        mensageText.classList.remove("sucessMensage");
        mensageText.classList.add("failMensage")
        mensageText.textContent = data;
        return;
    }

    mensageText.classList.remove("failMensage");
    mensageText.classList.add("sucessMensage");
    mensageText.textContent = data;

}

async function checkCharacter(character, userId) {
    let api_id = character.id;
    let user_id = userId;

    const response = await fetch("/checkCharacter", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            api_id,
            user_id,
        })
    });

    const data = await response.json();

    return data;
}

async function deleteCharacter(character, userId) {
    let api_id = character.id;
    let user_id = userId;


    const response = await fetch("/deleteCharacter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ api_id, user_id, })
    });

    const data = await response.json();

    return data;
}