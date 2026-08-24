const params = new URLSearchParams(window.location.search);
const prefix = params.get('prefix');

try {
    await import(`${import.meta.url.split('/').slice(0, -1).join("/")}/${prefix}/main.js`);
} catch (err) {
    console.error(`Failed to load component: ${moduleUrl}`, err);
}
