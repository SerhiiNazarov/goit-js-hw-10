import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';
import { refs } from './refs';
import { clearInfoList } from './clearInfoList';
import { createMarkup } from './createMarkup';
import { createMarkupInfo } from './createMarkup';
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

refs.inputRef.addEventListener('input', debounce(onInputCLick, DEBOUNCE_DELAY));

function onInputCLick() {
  const searchQuery = refs.inputRef.value.trim().toLowerCase();
  if (!searchQuery) {
    Notiflix.Notify.failure('Enter the name of the country', {
      position: 'center-center',
      cssAnimationStyle: 'from-top',
      showOnlyTheLastOne: true,
      clickToClose: true,
    });
    clearInfoList();
    return;
  }

  fetchCountries(searchQuery)
    .then(data => {
      clearInfoList();
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.',
          {
            position: 'center-center',
            cssAnimationStyle: 'from-top',
            showOnlyTheLastOne: true,
            clickToClose: true,
          }
        );
        return;
      }
      refs.listRef.insertAdjacentHTML('beforeend', createMarkup(data));
      if (data.length === 1) {
        refs.infoListRef.insertAdjacentHTML(
          'beforeend',
          createMarkupInfo(data)
        );
        const countryNameRef = document.querySelector('.country-name');
        countryNameRef.style.fontSize = '30px';
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message, 'Something is wrong !', {
        position: 'center-center',
        cssAnimationStyle: 'from-top',
        showOnlyTheLastOne: true,
      });
      clearInfoList();
    });
}

refs.inputRef.style.fontSize = '24px';
refs.inputRef.style.borderColor = 'red';
refs.inputRef.style.outline = 'none';
refs.inputRef.style.backgroundColor = '#D9FCF1 ';
refs.inputRef.style.borderRadius = '10px';
refs.listRef.style.listStyle = 'none';
refs.listRef.style.padding = '0';
refs.infoListRef.style.fontWeight = 'bold';
refs.body.style.backgroundColor = '#D9FCF1 ';
