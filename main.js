//service worker
if('serviceWorker'in navigator){
  console.log('puedes usar el SW en el navegador pl');
  navigator.serviceWorker.register('./sw.js')
  .then(res=>console.log('cargado correctamente',res))
  .catch(err=> console.log('no se pudo registrar el SW'));
}else {
  console.log('no soporta SW pl');
}

