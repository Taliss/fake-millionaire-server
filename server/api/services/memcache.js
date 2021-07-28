import { resolve } from 'path';
import { createReadStream } from 'fs';
import _ from 'highland';

const getDataAsCsvStream = (pathToFile) => {
  return _(createReadStream(pathToFile))
    .invoke('toString', ['utf8'])
    .split()
    .filter((line) => line && line.length)
    .map((line) => line.split(','));
};
const points = new Map();

export const getPointsInRange = (start, end) => ({
  index: start,
  next: function () {
    if (!points.has(start) || !points.has(end)) {
      return { done: true };
    }

    const point = {
      timestamp: this.index,
      price: points.get(this.index),
    };

    if (this.index > end) {
      return {
        done: true,
      };
    } else {
      this.index++;
      return { value: point };
    }
  },
  [Symbol.iterator]: function () {
    return this;
  },
});

export const liftInMemory = (pathToFile) => {
  const resolvedPath = resolve(__dirname, pathToFile);

  return new Promise((resolve, reject) => {
    console.time('Data caching time');
    _(getDataAsCsvStream(resolvedPath))
      .on('error', (err) => reject(err))
      .each(([timeStampString, priceString]) => {
        const timeStamp = Number(timeStampString);
        const price = Number(priceString);
        points.set(timeStamp, price);
      })
      .done(() => {
        console.log(`Data lifted in memory. Total keys: ${points.size}`);
        console.timeEnd('Data caching time');
        resolve();
      });
  });
};
