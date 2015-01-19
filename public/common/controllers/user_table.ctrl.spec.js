describe('TableCtrl', function() {

    var scope;
    var controller;
    var userService;

    beforeEach(module('impaqApp'));
    beforeEach(inject(function($controller, $rootScope, _userTableService_) { // inject mocked service
        scope = $rootScope.$new();
        userService = _userTableService_;
        controller = $controller('TableCtrl', {
            $scope: scope,
            userService: userService
        });
    }));

    it('input should be empty', inject(function() {
        expect(controller.userId).toBe('');
    }));

    it('custom text in input', inject(function() {
        controller.userId = "test";
        expect(controller.userId).toBe("test");
        controller.displayUsers();
        expect(controller.userId).toBe('');
    }));

    it('counter should add', inject(function() {
        controller.userService.checkboxCount({selected: true});
        controller.userService.checkboxCount({selected: true});
        expect(controller.userService.checkboxCounter).toEqual(2);

        controller.userService.checkboxCount({selected: false});
        expect(controller.userService.checkboxCounter).toEqual(1);
    }));
});