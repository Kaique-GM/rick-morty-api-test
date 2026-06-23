import { initNavbar } from './modules/navbar.js';
import { initAnimations } from './modules/animations.js';
import { initCharacters } from './api/allCharacters.js';


document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initAnimations();
    initCharacters();

});
