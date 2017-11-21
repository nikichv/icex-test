import qs from 'querystring';

import httpClient from '../index';

export function getCoinsList(list) {
  const path = list ? `coins?coinlist=${list}` : 'coins';

  return httpClient.get(path);
}

export function getCoinByName(name) {
  if (!name) {
    throw new SyntaxError('Coin name must be specified!');
  }

  return httpClient.get(`coins/${name}`);
}

export function getCoinHistory(name, options) {
  if (!name) {
    throw new SyntaxError('Coin name must be specified!');
  }

  const path = `coins/${name}/hist?${qs.stringify(options)}`;

  return httpClient.get(path);
}

export default { getCoinByName, getCoinHistory, getCoinsList };
