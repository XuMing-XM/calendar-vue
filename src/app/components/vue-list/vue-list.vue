<template>
<div>
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
    }
  }
};
</script>

