<template>
  <div id="app" class="d-flex" style="min-height: 100vh; height: 100%;">

    <coin-list
      :coins="coinsList"
      @coinset="currentCoin = $event"
      style="flex-shrink: 0;"
    ></coin-list>

    <div class="d-flex flex-column rel w-100">
      <div class="w-75 mx-auto">
        <chart :history="currentCoinHistory" :fetching="isFetchingHistory"></chart>
      </div>
      <div class="coin-info-wrapper">
        <coin-info :coin="currentCoinDetails"></coin-info>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import get from 'lodash.get';

  import chart from '@/components/chart';
  import coinList from '@/components/coinList';
  import coinInfo from '@/components/coinInfo';

  export default {
    name: 'app',
    data() {
      return {
        currentCoin: null,
        isFetchingHistory: false,
      };
    },
    components: {
      chart,
      coinList,
      coinInfo,
    },
    watch: {
      currentCoin(name) {
        if (!this.coinsHistory[name]) {
          this.isFetchingHistory = true;

          this.fetchCoinHistory({
            name: this.currentCoin,
            options: {
              interval: 'day',
              start: this.getUnixRange(30).start,
              end: this.getUnixRange(30).end,
            },
          }).then(() => { this.isFetchingHistory = false; });
        }

        if (!this.coinsDetails[name]) {
          this.fetchCoinByName(name);
        }
      },
    },
    methods: {
      ...mapActions([
        'fetchCoinsList',
        'fetchCoinHistory',
        'fetchCoinByName',
      ]),
      getUnixRange(days) {
        const date = new Date();
        const end = Math.floor(Date.now() / 1000); // returns unix timestamp in seconds
        const start = Math.floor(date.setDate(date.getDate() - days) / 1000);

        return { end, start };
      },
    },
    computed: {
      ...mapState({
        coinsList: state => state.coins.list,
        coinsDetails: state => state.coins.details,
        coinsHistory: state => state.coins.histories,
      }),
      currentCoinDetails() {
        return get(this.coinsDetails, this.currentCoin, undefined);
      },
      currentCoinHistory() {
        return get(this.coinsHistory, this.currentCoin, undefined);
      },
    },
    created() {
      this.fetchCoinsList('icextop10')
        .then((response) => {
          if (response.data.result && response.data.data.length > 0) {
            this.currentCoin = response.data.data[0];
          }
        });
    },
  };
</script>

<style lang="scss">
  @import "./app";
</style>
