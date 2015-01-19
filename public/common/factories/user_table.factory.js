'use strict';

angular.module('factories.user_table', [])
    .factory('userTableFactory', ['$resource', function ($resource) {

        return $resource('/:url/:id',
            {
                url: '@url',
                id: '@id'
            },
            {
                getUserList: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        url: 'findall'
                    }
                },
                getUserById: {
                    method: 'GET',
                    isArray: true,
                    params: {
                        url: 'find'
                    }
                },
                deleteUser: {
                    method: 'POST',
                    isArray: true,
                    params: {
                        url: 'remove'
                    }
                },
                editUser: {
                    method: 'POST',
                    isArray: true,
                    params: {
                        url: 'edit'
                    }
                }
            })
    }]);