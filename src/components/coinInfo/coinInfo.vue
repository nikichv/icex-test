<template>
  <div>
    <template v-if="coin">
      <div class="d-flex justify-content-around align-items-center">
        <p class="text-uppercase font-weight-bold">
          {{ coin.name}} ({{ coin.short}})
        </p>
        <p>Price: {{ coin.price_usd }}$</p>
        <div class="d-flex align-items-end">
          <i :class="['coin__icon mr-2', defineChangeIconClass()]"></i>
          <span>{{ coin.change.day }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  const coinDefaultKeys = ['name', 'short', 'price_usd', 'change'];

  export default {
    name: 'coin-info',
    props: {
      coin: {
        type: Object,
        required: false,
        validator(value) {
          return Object.keys(value).some(key => coinDefaultKeys.includes(key));
        },
        default: null,
      },
    },
    methods: {
      defineChangeIconClass() {
        return this.coin.change.day[0] === '-'
          ? 'coin__icon-negative'
          : 'coin__icon-positive';
      },
    },
  };
</script>

<style lang="scss">
  @import "./coinInfo";
</style>
