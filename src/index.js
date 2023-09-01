import { LoadingController } from "./handlers/controller/loadingController.js";

const introLoadingDOMEl = document.querySelector('#intro-loading');

const loadingController = new LoadingController();

window.addEventListener('load', function() {
  history.scrollRestoration = 'manual';
  loadingController.remove();
  introLoadingDOMEl.style.display = 'none';
});