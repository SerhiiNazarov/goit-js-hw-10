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
    Notiflix.Notify.failure('Введіть дані для пошуку');
    return;
  }

  fetchCountries(searchQuery)
    .then(data => {
      clearInfoList();
      if (data.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (data.length === 1) {
        refs.infoListRef.insertAdjacentHTML(
          'beforeend',
          createMarkupInfo(data)
        );
      }
      refs.listRef.insertAdjacentHTML('beforeend', createMarkup(data));
    })
    .catch(error => {
      Notiflix.Notify.failure(error.message, 'Something is wrong !');
      clearInfoList();
    });
}

refs.inputRef.style.fontSize = '24px';
refs.inputRef.style.borderColor = 'red';
refs.inputRef.style.backgroundColor = '#D9FCF1 ';
refs.inputRef.style.borderRadius = '10px';
refs.listRef.style.listStyle = 'none';
refs.listRef.style.padding = '0';
refs.infoListRef.style.fontWeight = 'bold';
refs.body.style.backgroundColor = '#ECFCEB ';
