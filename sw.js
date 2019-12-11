//ASIGNAR NOMBRE Y VERISON DE LA CACHE
const CACHE_NAME='v1_cache_pwa_prueba';

//archivos cacheables en la aplicación
//todas las imagenes y estilos
var UrlsToCache=[
  './',
  './images/favicon.ico',
  './images/cerveza.jpg',
  './images/cine.jpg',
  './images/colores.jpg',
  './images/feria.png',
  './images/feriaa.jpg',
  './images/muertos.jpg',
  './images/globo.jpg',
  './images/paracho-1.png',
  './images/paracho.png',
  './images/favicon-1024.png',
  './images/paracho_danza_viejitos.jpg',
  './images/parachodeverduzco15.png',
  './images/favicon-512.png',
  './images/favicon-384.png',
  './images/portada.png',
];

//evento install (de instalación )
//instalación y guardar en cache los recursos estáticos
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(UrlsToCache)
      .then(()=>{
        self.skipWaiting();
      });
    }).catch(err=>
      console.log('no se ha registrado el cache',err)));
});

//evento activate activar la aplicación
//este evento es el que hace que funcione sin conexion
self.addEventListener('activate',e=>{
  const cacheWhiteList=[CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then(cacheNames =>{
        return Promise.all(cacheNames.map(cacheName=>{
          if(cacheWhiteList.indexOf(cacheName)===- 1){
              //borramos los elementos que no necesitamos
              return caches.delete(cacheName);
          }
        })
       );
     })
     .then(()=>{
       //activa la cache en el dispositivo
        self.clients.claim();
     })
  );
});

//evento fetch traer desde el internet
//comprobarra si la url está en cache y si no la solicita por internet
self.addEventListener('fetch',e=>{
    e.respondWith(
      caches.match(e.request)
        .then(res=>{
          if(res){
            //devuelvo datos desde caches
            return res;
          }
          return fetch(e.request);
        })
    );
});
