<template>
  <div>
    <div class="px-3">
      <h2><strong>Coins list</strong></h2>
      <div class="d-flex flex-wrap coin__list">
        <template v-if="stateReady">
          <template v-for="coin in coins">
            <div
              :class="['coin__list-item mx-2 p-2', { 'coin__list-item--active' : active === coin }]"
              @click="updateCurrentCoin(coin)"
            >
              <span>{{ coin }}</span>
            </div>
          </template>
        </template>
        <template v-else>
          <div class="col-12">
            <p>Please, wait... Loading list of coins.</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'coin-list',
    props: {
      coins: {
        type: Array,
        default() {
          return [];
        },
      },
      active: {
        type: String,
      },
    },
    methods: {
      updateCurrentCoin(name) {
        this.$emit('coinset', name);
      },
    },
    computed: {
      stateReady() {
        return this.coins.length > 0;
      },
    },
  };
</script>

<style lang="scss">
  @import "./coinList";
</style>
