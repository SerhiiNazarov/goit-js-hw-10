import { refs } from './refs';

export function clearInfoList() {
  refs.listRef.innerHTML = ' ';
  refs.infoListRef.innerHTML = ' ';
}
