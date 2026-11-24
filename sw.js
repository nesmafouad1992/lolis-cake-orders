var C='cake-v1';
var URLS=['./','./index.html','./manifest.webmanifest','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@600;800&family=Tajawal:wght@400;500;700&display=swap'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return Promise.all(URLS.map(function(u){return fetch(u,{mode:u.indexOf('http')===0?'no-cors':'same-origin'}).then(function(r){return c.put(u,r)}).catch(function(){})}))}))});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',function(e){if(e.request.method!=='GET')return;
e.respondWith(fetch(e.request).then(function(r){var cp=r.clone();caches.open(C).then(function(c){c.put(e.request,cp)}).catch(function(){});return r}).catch(function(){return caches.match(e.request,{ignoreSearch:true}).then(function(m){return m||caches.match('./index.html')})}))});
