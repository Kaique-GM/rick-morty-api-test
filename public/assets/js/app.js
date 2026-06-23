import { initNavbar } from './modules/navbar.js';
import { initAnimations } from './modules/animations.js';
import { initCharacters } from './api/characters.js';


document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initAnimations();
    initCharacters();

});
