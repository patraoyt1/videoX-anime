const CACHE_NAME = 'videox-v2.1';
const ASSETS_TO_CACHE = [
    './index.html',
    './manifest.json'
];

// Instala o Service Worker e guarda os arquivos em Cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Intercepta as requisições para o app funcionar offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Ativação e Limpeza de Cache Antigo (O SEGREDO DA ATUALIZAÇÃO)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // Se o cache no celular for diferente da versão atual, ele é deletado
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
