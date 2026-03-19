// renderer.js
const params = new URLSearchParams(window.location.search);
const prefix = params.get('prefix') || 'content';

try {
    await import(`./content-bound/main.js`);
} catch (err) {
    console.error(`Failed to load component: ${prefix}`, err);
}
