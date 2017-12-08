<template>
    <div class="main">
        <div class="cal-date-month">
            <header class="cal-show-week">
                <div class="monday">一</div>
                <div class="tuesday">二</div>
                <div class="wednesday">三</div>
                <div class="thursday">四</div>
                <div class="friday">五</div>
                <div class="saturday">六</div>
                <div class="sunday">日</div>
            </header>
            <div class="data-week" v-on:click="add">
                <div class="show-week" v-for="week in weekList">{{week}}</div>
            </div>
        </div>
        
        <div id="wrapper-month">
                <div id="scroller-month">
                    <vue-list :dispatchData="monthList"></vue-list>
                </div>
            </div>
    </div>
</template>
<style lang="less" rel="stylesheet/stylus">
  @import "cal.less";
</style>
<script type="text/ecmascript-6">
import Cal from './cal'
export default Cal
</script>