import qs from 'querystring';

import httpClient from '../index';

export function getCoinsList(list = null) {
  const path = list ? `coins?coinlist=${list}` : 'coins';

  return httpClient.get(path);
}

export function getCoinByName(name = null) {
  if (!name) {
    throw new SyntaxError('Coin name must be specified!');
  }

  return httpClient.get(`coins/${name}`);
}

export function getCoinHistory(name = null, options) {
  if (!name) {
    throw new SyntaxError('Coin name must be specified!');
  }

  const path = `coins/${name}/hist?${qs.stringify(options)}`;

  return httpClient.get(path);
}

export default { getCoinByName, getCoinHistory, getCoinsList };
