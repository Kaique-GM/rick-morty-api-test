import { initAnimations } from './modules/animations.js';
import { register } from './controllers/auth.js';

document.addEventListener("DOMContentLoaded", () => {

    initAnimations();
    register();
});
