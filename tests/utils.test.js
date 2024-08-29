'use strict';

const utils = require('../utils');

describe('utils.js test', () => {
    describe('formatTradingInfo', () => {
        it('should return preformatted values', () => {
            const input = [
                {
                    "symbol": "POWRUSDT",
                    "price": 0.17,
                    "time": 1724809572558
                }
            ];

            const result = utils.formatTradingInfo(input);

            expect(result[0]).toMatchObject({
                askPrice: expect.any(String),
                bidPrice: expect.any(String),
                symbol: expect.any(String),
                time: expect.any(String),
            });
        });
    });

    describe('groupByCriteria', () => {
        it('should split elements into groups correctly', () => {
            const input = [1, 2, 3, 5, 6, 7];

            const result = utils.groupByCriteria(
                input,
                (number) => (number > 4) ? 'big' : 'small'
            );

            expect(result.big).toEqual(expect.arrayContaining([5, 6, 7]));
            expect(result.small).toEqual(expect.arrayContaining([1, 2, 3]));
        });
    })
});
