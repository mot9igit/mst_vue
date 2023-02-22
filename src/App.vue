<template>
  <div id="analytics_app">
    <router-view v-slot="{ Component }">
      <transition name="scale" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  .scale-enter-active,
  .scale-leave-active {
    transition: all 0.2s ease;
  }
  .scale-enter-from,
  .scale-leave-to {
    opacity: 0;
    transform: scale(0.95);
  }
</style>
