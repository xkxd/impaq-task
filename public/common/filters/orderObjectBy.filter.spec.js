describe('The test filter', function () {
    'use strict';

    var $filter;

    beforeEach(function () {
        module('filters.orderObjectBy');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should order objects by number / ID', function () {
        var arr = [
            {
                "id": 12
            },
            {
                "id": 2
            },
            {
                "id": 7
            }
        ];

        var result = $filter('orderObjectBy')(arr, 'id');

        // Assert.
        expect(result).toEqual([
            {
                "id": 2
            },
            {
                "id": 7
            },
            {
                "id": 12
            }
        ]);
    });

    it('should order objects by letter', function () {
        var arr = [
            {
                "name": "Suarez"
            },
            {
                "name": "Lessie"
            },
            {
                "name": "Reba"
            }
        ];

        var result = $filter('orderObjectBy')(arr, 'name');

        // Assert.
        expect(result).toEqual([
            {
                "name": "Lessie"
            },
            {
                "name": "Reba"
            },
            {
                "name": "Suarez"
            }
        ]);
    });
});