import httpClient from '../provider';

export function getCoinsList(list) {
  const path = list ? `coins?coinlist=${list}` : 'coins';

  return httpClient.get(path);
}

export function getCoinByName(name) {
  if (!name) {
    throw new Error('Coin name must be specified!');
  }

  return httpClient.get(`coins/${name}`);
}

export function getCoinHistory(name, options) {
  if (!name) {
    throw new Error('Coin name must be specified!');
  }

  return httpClient.get(`coins/${name}/hist?`, {
    params: options,
  });
}

export default { getCoinByName, getCoinHistory, getCoinsList };
