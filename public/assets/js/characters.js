import { initNavbar } from './modules/navbar.js';
import { initAnimations } from './modules/animations.js';
import { initSavedCharacters } from './api/allCharacters.js';


document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initAnimations();
    initSavedCharacters();

});
