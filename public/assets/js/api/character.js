export async function initCharacter() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    let url = "https://rickandmortyapi.com/api/character/" + id;

    loadCharacter(url);
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
}