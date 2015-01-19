describe('UserTableService', function () {

    var $rootScope;
    var $httpBackend;
    var userFactory;
    var userService;

    beforeEach(module('impaqApp'));

    beforeEach(inject(function ($injector) {
        $httpBackend = $injector.get('$httpBackend');
        $rootScope = $injector.get('$rootScope');
        userService = $injector.get('userTableService');
        userFactory = $injector.get('userTableFactory');
    }));

    it('should I kill myself?', inject(function () {


    }));


});