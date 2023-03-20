import { Patient } from '../types';

const objectKeyToCamelCase = (data: Array<{ [key: string]: any }>) => data.map((item) => {
  const normalizedItem: { [key: string]: any } = {};
  Object.keys(item).forEach((key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    normalizedItem[camelCaseKey] = item[key];
  });
  return normalizedItem as Patient;
});

export default objectKeyToCamelCase;
