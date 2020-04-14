import $ from 'jquery'
import '@babel/polyfill'
import './src/js/slider'
import './src/js/push'

const btnInstallApp = document.querySelector('.btn--install-js');
const btnSubscribe = document.getElementById('subscribe');
const btnDepartments = document.getElementById('departments');

// btnSubscribe.addEventListener('click', function (e) {
//   e.stopPropagation();
//
//   if (!window.Notification) {
//     console.log('Sorry, notifications are not supported')
//   } else {
//     Notification.requestPermission(function (p) {
//       if (p === 'denied') {
//         alert('You have denied notifications')
//       } else if (p === 'granted') {
//         alert('You have granted notifications')
//       }
//     })
//   }
// });
//
// btnDepartments.addEventListener('click', function (e) {
//   var notify;
//   e.stopPropagation();
//
//   if (Notification.permission === 'default') {
//     alert('Please allow notifications before doing this')
//   } else {
//     notify = new Notification('New message from Pavel', {
//       body: 'How are you today?',
//       icon: '/images/icon/icon.png',
//       tag: '1234'
//     });
//     notify.onclick = function () {
//       window.location = '?message=' + this.tag;
//     }
//   }
// });

btnSubscribe.addEventListener('click', subscribe);

async function subscribe() {
  let sw = await navigator.serviceWorker.ready;
  let push = await sw.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: 'BPB-OyPNaWUA2mNTPNnyfFPjKTH63hfq29Pq3_Sy1ecNCCxnw90DrvII0c2SVqbgNG3kv_p5IA3SPTryjQrNDWg'
  });
  console.log(JSON.stringify(push))
}

function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker
       .register('./service-worker.js')
       .then((response) => console.log(`Service Worker Registered on ${response.scope}`))
       .catch((error) => console.log(`Service Worker Error is ${error}`))
    });
  }
}

function installAppHandler() {
  btnInstallApp.style.display = 'none';
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {

    e.preventDefault();
    deferredPrompt = e;
    btnInstallApp.style.display = 'block';


    btnInstallApp.addEventListener('click', () => {
      btnInstallApp.style.display = 'none';

      deferredPrompt.prompt();
      deferredPrompt.userChoice.then( choiceResult => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      })

    })
  });
}

// function cloneColHandler() {
//   Array.from(bannerCardsInner).forEach(element => {
//     const bannerCardsColClone = element.querySelector('.banner-cards__col').cloneNode(true);
//     bannerCardsColClone.classList.add('banner-cards--clone');
//     element.appendChild(bannerCardsColClone);
//   })
// }


document.addEventListener('DOMContentLoaded', () => {
  registerServiceWorker();
  installAppHandler();


  // cloneColHandler();
});
