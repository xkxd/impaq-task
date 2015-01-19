describe('UserTableService', function () {

    var userFactory;
    var scope;

    beforeEach(module('impaqApp'));

    beforeEach(inject(function ($rootScope, _userTableFactory_) {
        scope = $rootScope.$new();
        userFactory = _userTableFactory_;
    }));


});