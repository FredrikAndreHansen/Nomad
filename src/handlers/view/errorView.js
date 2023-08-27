export function errorView(message) { 
    return `
        <div class="handler-box">
            <h2 class="header-text-center-big">ERROR!</h2>
            <img class="error-icon" src="../../../graphics/icons/exitIcon.svg" />
            <p class="p-dark-center-small">${message}</p>
            <button id="handler-btn" class="sign-in-btn">OK</button>
        </div>
    `;
}