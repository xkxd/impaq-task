'use strict';

angular.module('user_table.ctrl', [])
    .controller('TableCtrl', ['userTableFactory', 'userTableService', '$scope',
        function (userTableFactory, userTableService, $scope) {
            var that = this;

            this.userId = '';

            this.multipleSelected = 0;

            this.change = function (item, user) {
                if (item.selected) {
                    that.multipleSelected++;
                } else {
                    that.multipleSelected--
                }
            };

            this.displayUsers = function () {
                that.userId = '';
                that.userList = userTableService.userList;
                return that.userList;
            };

            this.getList = function () {
                return userTableService.getList()
                    .then(this.displayUsers);
            };

            this.getUserById = function (id) {
                userTableService.getUser(id)
                    .then(this.displayUsers);
            };

            this.deleteUser = function (user) {
                userTableService.deleteUser(user)
                    .then(this.displayUsers);
            };

            this.editUser = function (user) {
                userTableService.editUser(user)
                    .then(this.displayUsers);
            };
        }]);
