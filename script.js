const header=document.querySelector('.site-header');
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav-links');
window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>20));
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false')}));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const countEl=document.querySelector('[data-count]');
let counted=false;
const countObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting&&!counted){counted=true;let n=0;const max=Number(countEl.dataset.count);const timer=setInterval(()=>{n++;countEl.textContent=n+'+';if(n>=max)clearInterval(timer)},80)}},{threshold:.7});
if(countEl)countObserver.observe(countEl);
// The pickup form posts directly to FormSubmit so it works on static hosting without opening the visitor's email application.
const formNote=document.getElementById('form-note');
if(formNote&&new URLSearchParams(window.location.search).get('submitted')==='true'){
  const isFrench=document.documentElement.lang.toLowerCase().startsWith('fr');
  formNote.textContent=isFrench?'Merci! Votre demande a été envoyée à CPER. Nous communiquerons avec vous sous peu.':'Thanks! Your request has been sent to CPER. We will follow up shortly.';
  formNote.setAttribute('role','status');
}



// Accurate CPER service-area map with permanent city labels.
if (window.L && document.getElementById('service-map')) {
  const mapIsFrench = document.documentElement.lang.toLowerCase().startsWith('fr');
  const map = L.map('service-map', {
    scrollWheelZoom: false,
    zoomControl: true,
    attributionControl: true
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const locations = [
    {name:'Vancouver, BC', lat:49.2827, lng:-123.1207, country:'canada', direction:'right', offset:[12,0]},
    {name:'Calgary, AB', lat:51.0447, lng:-114.0719, country:'canada', direction:'bottom', offset:[0,10]},
    {name:'Edmonton, AB', lat:53.5461, lng:-113.4938, country:'canada', direction:'top', offset:[0,-10]},
    {name:'Red Deer, AB', lat:52.2681, lng:-113.8112, country:'canada', direction:'left', offset:[-12,0]},
    {name:'Saskatoon, SK', lat:52.1332, lng:-106.6700, country:'canada', direction:'top', offset:[0,-10]},
    {name:'Regina, SK', lat:50.4452, lng:-104.6189, country:'canada', direction:'bottom', offset:[0,10]},
    {name:'Winnipeg, MB', lat:49.8951, lng:-97.1384, country:'canada', direction:'bottom', offset:[0,10]},
    {name:'Toronto, ON', lat:43.6532, lng:-79.3832, country:'canada', direction:'left', offset:[-12,0]},
    {name:'Ottawa / Gatineau', lat:45.4215, lng:-75.6972, country:'canada', direction:'top', offset:[0,-10]},
    {name:(mapIsFrench?'Montréal, QC':'Montreal, QC'), lat:45.5019, lng:-73.5674, country:'canada', direction:'bottom', offset:[0,10]},
    {name:(mapIsFrench?'Québec, QC':'Quebec City, QC'), lat:46.8139, lng:-71.2080, country:'canada', direction:'right', offset:[12,0]},
    {name:'Dallas–Fort Worth, TX', lat:32.8998, lng:-97.0403, country:'usa', direction:'right', offset:[12,0]}
  ];

  const iconFor = country => L.divIcon({
    className: `cper-marker cper-marker-${country}`,
    html: '<div class="cper-marker-pin"></div>',
    iconSize: [26, 34],
    iconAnchor: [13, 32],
    tooltipAnchor: [0, -25]
  });

  const markers = locations.map(location => {
    const marker = L.marker([location.lat, location.lng], {icon: iconFor(location.country)}).addTo(map);
    marker.bindTooltip(location.name, {
      permanent: true,
      direction: location.direction,
      offset: location.offset,
      className: 'cper-city-label',
      opacity: 1
    });
    return marker;
  });

  const bounds = L.latLngBounds(locations.map(location => [location.lat, location.lng]));
  map.fitBounds(bounds, {paddingTopLeft:[45,55], paddingBottomRight:[45,55]});

  // Preserve a useful view when the map becomes visible after reveal animation.
  setTimeout(() => { map.invalidateSize(); map.fitBounds(bounds, {padding:[45,45]}); }, 350);
  window.addEventListener('resize', () => map.invalidateSize());
}
