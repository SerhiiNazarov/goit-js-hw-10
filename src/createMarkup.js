export function createMarkup(data) {
  return data
    .map(({ name, flags }) => {
      return /*html*/ `<li class="listItem" style="display: flex; align-items: center; gap: 12px;"><img src="${flags.svg}" class="country-img" width="30px" height="25px" alt="flag"><p style="font-weight: bold;">${name.official}</p></li>`;
    })
    .join('');
}

export function createMarkupInfo(data) {
  return data
    .map(({ capital, languages, population }) => {
      const value = Object.values(languages);
      return /*html*/ `<p>Capital: <span style="font-weight: normal;">${capital[0]}</span></p>
      <p>Population: <span style="font-weight: normal;">${population}</span></p>
      <p>Languages: <span style="font-weight: normal;">${value}</span></p>`;
    })
    .join('');
}
