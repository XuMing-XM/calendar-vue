<template>
<div class="warp-scroll" @scroll="scrollEvent">
    <ul>
        <li v-for=" data in dispatchData">{{data}}</li>
    </ul>
</div>
</template>
<script>
export default {
  name: "vue-list",
  props: {
    dispatchData: {
      type: Array
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData() {
        console.log(this.dispatchData)
    },
    scrollEvent(){
        console.log(123)
    }
  }
};
</script>
<<style lang="less">
.warp-scroll{
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    ul li{
        height : 5rem;
        line-height : 5rem;
        text-align : center;
        background : #e1e1e1;
        border : 1px solid #fff;
    }
}
</style>

