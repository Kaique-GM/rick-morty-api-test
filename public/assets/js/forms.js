import { initAnimations } from './modules/animations.js';
import { login, register } from './controllers/auth.js';

document.addEventListener("DOMContentLoaded", () => {

    initAnimations();
    register();
    login();
});
