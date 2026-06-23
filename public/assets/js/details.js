import { initNavbar } from './modules/navbar.js';
import { initAnimations } from './modules/animations.js';
import { initCharacter } from './api/character.js';

document.addEventListener("DOMContentLoaded", () => {

    initNavbar();
    initAnimations();
    initCharacter();
    
});
