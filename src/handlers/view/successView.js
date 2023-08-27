export function successView(message) { 
    return `
        <div class="handler-box">
            <h2 class="header-text-center-big">SUCCESS!</h2>
            <p class="p-dark-center-small">${message}</p>
            <button id="handler-btn" class="sign-in-btn">OK</button>
        </div>
    `;
}