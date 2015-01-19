# impaq-task
simple CRUD app

## how to

 1. clone
 2. npm install
 3. bower install
 4. grunt serve // grunt test

PS. "coverage" dir contains latest test results by karma/istanbul.

## left to do // possible improvements

1. RESTful api:
 - get list of users -> ('GET', '/user')
 - create new user -> ('POST', '/user')
 - get user by ID -> {'GET', '/user/id')
 - edit user -> ('PUT', '/user/id')
 - remove user -> ('DELETE', 'user/id')

2. Testing.

3. Directive for handling multi-user edit.

4. Better server-side architecture.

5. Form validation.

## FAQ

npm probably will handle everything, but in some cases you may install karma-cli to run karma.