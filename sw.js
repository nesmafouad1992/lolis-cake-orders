var C='cake-v3';
var URLS=['./','./index.html','./manifest.webmanifest','https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js','https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@600;800&family=Tajawal:wght@400;500;700&display=swap'];
self.addEventListener('install',function(e){self.skipWaiting();e.waitUntil(caches.open(C).then(function(c){return Promise.all(URLS.map(function(u){return fetch(u,{cache:'reload',mode:u.indexOf('http')===0?'no-cors':'same-origin'}).then(function(r){return c.put(u,r)}).catch(function(){})}))}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==C}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){var r=e.request;if(r.method!=='GET')return;
var own=new URL(r.url).origin===self.location.origin;
e.respondWith(fetch(own?new Request(r,{cache:'no-store'}):r).then(function(res){var cp=res.clone();caches.open(C).then(function(c){c.put(r,cp)}).catch(function(){});return res}).catch(function(){return caches.match(r,{ignoreSearch:true}).then(function(m){return m||caches.match('./index.html')})}))});
