import refs from './refs';
import generateTrendingList from './trending-page';
import clearContainers from './services/clearContainers';

const { languageCheckBox, rusFlagSvg, usaFlagSvg } = refs;

let selectedLang = {};

function switchFlagToRus() {
  usaFlagSvg.classList.add('language-hidden');
  rusFlagSvg.classList.remove('language-hidden');
}

function switchFlagToEn() {
  usaFlagSvg.classList.remove('language-hidden');
  rusFlagSvg.classList.add('language-hidden');
}

function switchToRusLang() {
  switchFlagToRus();
  document.lastChild.lang = 'ru';
  selectedLang.checked = true;
  selectedLang.language = 'ru-RU';
  localStorage.setItem('language', JSON.stringify(selectedLang));
  changeUI();
  clearContainers();
  generateTrendingList();
}

function switchToEnLang() {
  switchFlagToEn();
  document.lastChild.lang = 'en';
  selectedLang.checked = false;
  selectedLang.language = 'en-EN';
  localStorage.setItem('language', JSON.stringify(selectedLang));
  changeUI();
  clearContainers();
  generateTrendingList();
}

function onLoadPage() {
  if (!localStorage.getItem('language')) {
    const defaultLang = {
      language: 'en-EN',
      checked: false,
    };

    localStorage.setItem('language', JSON.stringify(defaultLang));
  }

  selectedLang = localStorage.getItem('language');
  selectedLang = JSON.parse(selectedLang);
  languageCheckBox.checked = selectedLang.checked;

  if (selectedLang.language === 'en-EN') {
    switchToEnLang();
  } else {
    switchToRusLang();
  }
}

function handleLanguageBtn(event) {
  if (selectedLang.language === 'en-EN') {
    switchToRusLang();
  } else {
    switchToEnLang();
  }
}

export function isDefaultLanguage() {
  const selectedLang = localStorage.getItem('language');
  const current = JSON.parse(selectedLang);
  return !current.checked;
}

export function getLanguageCode() {
  if (isDefaultLanguage()) return 'en-EN';
  return 'ru-RU';
}

languageCheckBox.addEventListener('change', handleLanguageBtn);

onLoadPage();

function changeUI() {
  const defaultLanguage = isDefaultLanguage();
  const {
    listWatchedRef,
    listQueueRef,
    myListRef,
    searchFormInput,
    singUpBtn,
    logInBtn,
  } = refs;
  const homeLink = document.querySelector('.home-link');
  homeLink.textContent = defaultLanguage ? 'Home' : '??????????????';
  myListRef.textContent = defaultLanguage ? 'My lists' : '????????????';
  listWatchedRef.textContent = defaultLanguage ? 'Watched' : '??????????????????????????';
  listQueueRef.textContent = defaultLanguage ? 'Queue' : '??????????????';
  searchFormInput.placeholder = defaultLanguage ? 'Search...' : '??????????...';
  document.querySelector(
    '.copyright',
  ).childNodes[0].textContent = defaultLanguage
    ? `Made with love, by `
    : `?????????????? ?? ?????????????? ???????????????? `;
  document.querySelector(
    '.copyright__description',
  ).textContent = defaultLanguage
    ? `This project was created for educational purposes. Not commercial use.`
    : `?????? ???????????? ?????? ???????????? ?? ?????????????????????????????? ??????????. ???? ?????? ?????????????????????????? ??????????????????????????`;
  document.querySelector('.modal__title').textContent = defaultLanguage
    ? 'Welcome'
    : '?????????? ????????????????????';
  document.querySelector('.modal__text-login').textContent = defaultLanguage
    ? 'Login'
    : '????????';
  document.querySelector('.modal__text-reg').textContent = defaultLanguage
    ? 'Register'
    : '??????????????????????';
  logInBtn.textContent = defaultLanguage ? 'Sign in' : '????????';
  singUpBtn.textContent = defaultLanguage ? 'Sign up' : '??????????????????????';
  document.querySelector('.new_login__soc-label').textContent = defaultLanguage
    ? 'or login with'
    : '?????? ?????????????? ?? ??????????????';
}

export function defLang() {
  const selectedLang = localStorage.getItem('language');
  const current = JSON.parse(selectedLang);
  return current.language;
}

export function translateNotifyQueue(lang, queue) {
  if (lang) {
    if (queue) {
      return 'Delete from queue';
    } else {
      return 'Add to queue';
    }
  } else {
    if (queue) {
      return '?????????????? ???? ??????????????';
    } else {
      return '???????????????? ?? ??????????????';
    }
  }
}

export function translateNotifyWatched(lang, watched) {
  if (lang) {
    if (watched) {
      return 'Delete from watched';
    } else {
      return 'Add to watched';
    }
  } else {
    if (watched) {
      return '?????????????? ???? ??????????????????????????';
    } else {
      return '???????????????? ?? ??????????????????????????';
    }
  }
}
