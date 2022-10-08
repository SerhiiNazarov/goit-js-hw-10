export function fetchCountries(name) {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,name.official,capital,population,flags,languages`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Oops, there is no country with that name', {
        position: 'center-center',
        cssAnimationStyle: 'from-top',
        showOnlyTheLastOne: true,
        clickToClose: true,
      });
    }
    return response.json();
  });
}
