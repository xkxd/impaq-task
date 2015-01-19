describe('TableCtrl', function() {

    var scope;
    var $httpBackend;
    var createController;
    var $controller;
    var userFactory;
    var userService;
    var mockData;

    beforeEach(module('impaqApp'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $controller = $injector.get('$controller');
        $rootScope = $injector.get('$rootScope');
        userFactory = $injector.get('userTableFactory');
        userService = $injector.get('userTableService');
        mockData = [
            {
                "_id": "54b9286888f15464ae730c29",
                "id": 5,
                "name": "May Nielsen",
                "phone": "+1 (942) 407-3706",
                "address": "337 Fair Street, Machias, Colorado, 9580",
                "birthDate": "20-41-1972"
            },
            {
                "_id": "54b92868d4e21f7f0c892c78",
                "id": 6,
                "name": "Compton Kirkland",
                "phone": "+1 (942) 599-2979",
                "address": "509 Lincoln Terrace, Alderpoint, Arkansas, 2956",
                "birthDate": "26-29-1972"
            },
            {
                "_id": "54b92868fdfee547f86b3ec9",
                "id": 7,
                "name": "Lora Zimmerman",
                "phone": "+1 (999) 550-2712",
                "address": "192 Bridge Street, Hoehne, Indiana, 2455",
                "birthDate": "11-36-1976"
            }
        ];
        createController = function() {
            return $controller('TableCtrl', {
                '$scope': scope
            });
        };
    }));

    it('input should be empty', inject(function() {
        expect(createController().userId).toBe('');
    }));

    it('input should be empty', inject(function() {
        expect(createController().userId).toBe('');
    }));

    it('should get list and display it', inject(function() {
    }));
});