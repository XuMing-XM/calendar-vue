import vueList from '../components/vue-list/vue-list.vue'
export default {
    components : {
        vueList
    },
    mounted () {
        for(let i = 0 ; i<100 ;i++){
            this.add()
        }
    },        
    methods: {
        add : function(event){
            this.monthList.push(this.monthList.length + 1)
        }
    },
    data() {
        return {
            monthList : [1,2,3,4,5],
            weekList : [0,1,2,3,4,5,6,7]
        }
    },
}