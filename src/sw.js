//Iconos
import { ICONS } from './classes/memory';

const VERSION = 'memory-game_v1';

/**
 * ServiceWorker: Event install
 */
self.addEventListener('install', event => {
    event.waitUntil(precache());
});

/**
 * ServiceWorker: Event activate
 */
self.addEventListener('activate', event => {

    //Actualizar caché
    event.waitUntil(updateCache(event.request))
});

/**
 * ServiceWorker: Event fetch
 */
self.addEventListener('fetch', event => {
    const request = event.request;

    //Solo para peticiones GET
    if (request.method !== 'GET') return;

    //Buscar en caché
    event.respondWith(cachedResponse(request));
});

/**
 * Instala el caché
 * @returns {Promise} Elementos cargados en caché
 */
async function precache() {
    const cache = await caches.open(VERSION);
    const iconsCache = ICONS.map(icon => `./assets/icons/${icon}.svg`);
    return cache.addAll(['./', './index.html', ...iconsCache]);
}

/**
 * Actualiza datos en caché
 * @param {Request} request 
 * @returns {Promise} Caché
 */
async function updateCache(request) {

    //Abrimos el caché
    const cache = await caches.open(VERSION);

    //Obtenemos la copia actualizada del fech
    const response = await fetch(request);

    //Asignamos contenido a caché
    return cache.put(request, response);
}

/**
 * Obtenemos el caché del request
 * @param {Request} request 
 * @returns {Promise} Caché
 */
async function cachedResponse(request) {

    //Abrimos el caché
    const cache = await caches.open(VERSION);

    //Validamos si en el caché hay respuesta al request
    const respose = await cache.match(request);

    //Retornamos la respuesta si existe, si es undefined hacemos fetch(request)
    return respose || fetch(request);
}