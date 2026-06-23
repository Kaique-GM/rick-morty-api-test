export async function initCards() {

    const cards = document.getElementById('cards');

    if (!cards){
        return;
    }

    const response = await fetch('/components/cards.html');

    const html = await response.text();

    cards.innerHTML = html;
}