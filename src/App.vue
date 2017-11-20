<template>
  <div id="app" class="d-flex" style="min-height: 100vh; height: 100%;">

    <coin-list
      :coins="coinsList"
      @coinset="currentCoin = $event"
      style="flex-shrink: 0;"
    ></coin-list>

    <div class="d-flex flex-column rel w-100">
      <div class="w-100">
        <chart :history="currentCoinHistory"></chart>
      </div>
      <div class="coin-info-wrapper">
        <coin-info :coin="currentCoinInfo"></coin-info>
      </div>
    </div>

  </div>
</template>

<script>
  import chart from '@/components/chart/index';
  import coinList from '@/components/coinList/index';
  import coinInfo from '@/components/coinInfo/index';

  import { getCoinByName, getCoinHistory, getCoinsList } from '@/api/endpoints/coins';

  export default {
    name: 'app',
    data() {
      return {
        currentCoin: null,
        coinsList: [],
        coinsDetails: {},
        coinsHistory: {},
      };
    },
    components: {
      chart,
      coinList,
      coinInfo,
    },
    watch: {
      currentCoin(name) {
        this.fetchCoinInfo(name);
        this.fetchCoinHistory(name, {
          interval: 'day',
          end: this.getUnixRange(30).end,
          start: this.getUnixRange(30).start,
        });
      },
    },
    methods: {
      fetchCoinInfo(name) {
        getCoinByName(name)
          .then((response) => {
            if (response.data.result) {
              const data = {};
              data[name] = response.data.data;
              this.coinsDetails = Object.assign({}, this.coinsDetails, data);
            }
          });
      },
      fetchCoinHistory(name, options) {
        getCoinHistory(name, options)
          .then((response) => {
            if (response.data.result) {
              const data = {};
              data[name] = response.data.data;
              this.coinsHistory = Object.assign({}, this.coinsHistory, data);
            }
          });
      },
      getUnixRange(days) {
        const end = Math.floor(+Date.now() / 1000); // returns unix timestamp in seconds
        const start = (() => {
          const date = new Date();
          return Math.floor(date.setDate(date.getDate() - days) / 1000);
        })();

        return { end, start };
      },
    },
    computed: {
      currentCoinInfo() {
        return this.coinsDetails[this.currentCoin];
      },
      currentCoinHistory() {
        return this.coinsHistory[this.currentCoin];
      },
    },
    created() {
      getCoinsList('icextop10')
        .then((response) => {
          if (response.data.result && response.data.data.length > 0) {
            this.coinsList = response.data.data;
            this.currentCoin = response.data.data[0];

            this.fetchCoinInfo(this.currentCoin);
            this.fetchCoinHistory(this.currentCoin, {
              interval: 'day',
              end: this.getUnixRange(30).end,
              start: this.getUnixRange(30).start,
            });
          }
        });
    },
  };
</script>

<style lang="scss">
  @import "./app";
</style>
