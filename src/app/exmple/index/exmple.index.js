class list {
    constructor(scope) {
        this.list1 = [{
            key: 1,
            value: 'Tony',
        }, {
            key: 2,
            value: 'Tom',
        }, {
            key: 3,
            value: 'James'
        }, {
            key: 4,
            value: {
                title: 'James',
                describe: 'LeBron Raymone James'
            },
            hr: true
        }]
    }
}
list.$inject = ['$scope']
export default list
