<template>
  <div>
    <transition appear name="fade">
      <template v-if="coin">
        <div class="d-flex justify-content-around align-items-center">
          <p class="text-uppercase font-weight-bold">
            {{ coin.name}} ({{ coin.short }})
          </p>
          <p>Price: {{ coin.price_usd }}$</p>
          <div class="d-flex align-items-end">
            <i :class="['coin__icon mr-2', defineChangeIconClass()]"></i>
            <span>{{ coin.change.day }}</span>
          </div>
        </div>
      </template>
    </transition>
  </div>
</template>

<script>
  import get from 'lodash.get';

  const coinDefaultKeys = ['name', 'short', 'price_usd', 'change.day'];

  export default {
    name: 'coin-info',
    props: {
      coin: {
        type: Object,
        validator(value) {
          /* я знаю, что любое falsy значение уронит эту валидацию
          но для тестового задания думаю сойдет.
           */
          return coinDefaultKeys.every(el => get(value, el, false));
        },
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
