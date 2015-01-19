describe('UserTableFactory', function () {

    var $rootScope;
    var $httpBackend;
    var userFactory;
    var userService;
    var mockData;

    beforeEach(module('impaqApp'));
    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
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
        ]
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("Factory must be defined", function () {
        expect(userFactory).toBeDefined();
    });

    it("getUserList should return an array", inject(function () {
        $httpBackend.expectGET('/findall').respond(mockData);

        userService.getList().then(function (data) {
            expect(data.length).toEqual(3);
        });

        $httpBackend.flush();
    }));

    it('getUserById should return user with specific id', inject(function () {
        $httpBackend.expectGET('/find/5').respond([mockData[0]]);

        userService.getUser(5).then(function (data) {
            expect(data[0].name).toEqual("May Nielsen");
        });

        $httpBackend.flush();
    }));

    it('deleteUser should remove it from database', inject(function () {
        var cropData = mockData.splice(2, 1);
        $httpBackend.expectPOST('/remove/7').respond(mockData);

        userService.deleteUser(cropData[0]).then(function (data) {
            expect(data.length).toEqual(2);
        });

        $httpBackend.flush();
    }));

    it('editUser should overwrite existing user', inject(function () {
        $httpBackend.expectPOST('/edit/3').respond([
            {
                "_id": "54b9286805f0ef6f8712af9b",
                "id": 3,
                "name": "Bobby Best",
                "phone": "+1 (830) 432-2760",
                "address": "194 Doscher Street, Wright, Mississippi, 3431",
                "birthDate": "28-26-1951"
            }
        ]);

        var mockData = {
            "_id": "54b9286805f0ef6f8712af9b",
            "id": 3,
            "name": "Bobby Best",
            "phone": "+1 (830) 432-2760",
            "address": "194 Doscher Street, Wright, Mississippi, 3431",
            "birthDate": "28-26-1951"
        };

        userService.editUser(mockData).then(function (data) {
            expect(data[0].name).toEqual("Bobby Best");
            expect(data[0].birthDate).toEqual("28-26-1951");
        });

        $httpBackend.flush();
    }));
});