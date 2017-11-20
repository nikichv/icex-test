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
        required: false,
        default() {
          return [];
        },
        validator(value) {
          return Array.isArray(value);
        },
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
          this.hc.showLoading('Loading');
          console.log(value);
          this.hc.series[0].setData(this.parseHistory(value));
          this.hc.hideLoading();
        }
      },
    },
    methods: {
      parseHistory(arr) {
        return arr.map(el => [el.timestamp * 1000, el.value]);
      },
      init() {
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
          },
        });
      },
    },
    mounted() {
      this.init();
    },
  };
</script>

<style lang="scss">
  @import "./chart";
</style>
