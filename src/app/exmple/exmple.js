import './exmple.less'
import PAGES from '../../.pages.json'
import exmpleBucket from './exmple.bucket'
let _module = angular.module('vue.exmple', ['ui.router'])
for (let rootRouter in PAGES) {
    if (rootRouter == 'exmple') {
        PAGES[rootRouter].forEach((router) => {
            _module.controller(exmpleBucket[router].controllerName, exmpleBucket[router].controller)
        })
    }
}
_module.config([
    '$stateProvider',
    '$urlRouterProvider',
    ($stateProvider, $urlRouterProvider) => {
        for (let rootRouter in PAGES) {
            if (rootRouter == 'exmple') {
                PAGES[rootRouter].forEach((router) => {
                    $stateProvider
                        .state(rootRouter + '.' + router, {
                            url: '/' + router,
                            views: {
                                'content': {
                                    template:  exmpleBucket[router].template,
                                    controller: exmpleBucket[router].controllerName + ' as ctrl'
                                }
                            }
                        })
                })
            }
        }
    }
])
