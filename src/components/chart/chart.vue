<template>
  <div id="chart">

  </div>
</template>

<script>
  import Highcharts from 'highcharts/highstock';

  export default {
    name: 'chart',
    props: {
      history: {
        type: Array,
        default() {
          return [];
        },
      },
      fetching: {
        type: Boolean,
        required: true,
      },
    },
    data() {
      return {
        hc: null,
      };
    },
    watch: {
      history(value) {
        if (value.length > 0) {
          this.hc.series[0].setData(this.parseHistory(value));
        }
      },
      fetching(value) {
        return value
          ? this.hc.showLoading('Loading')
          : this.hc.hideLoading();
      },
    },
    methods: {
      parseHistory(arr) {
        return arr.map(el => [el.timestamp * 1000, el.value]);
      },
      initHighchart() {
        this.hc = Highcharts.stockChart('chart', {
          chart: {
            margin: 0,
          },
          series: [{
            data: this.parseHistory(this.history),
          }],
          rangeSelector: {
            buttons: [],
            inputEnabled: false,
            labelStyle: {
              visibility: 'hidden',
            },
          },
          xAxis: {
            tickInterval: 24 * 3600 * 1000,
          },
        });
      },
    },
    mounted() {
      this.initHighchart();
    },
  };
</script>

<style lang="scss">
  @import "./chart";
</style>
