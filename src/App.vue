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
  name: 'app',
  created () {
    document.title = 'MST Аналитика'
  }
}
</script>

<style lang="scss">
  .dart-btn-text img + span{
    margin-left: 5px;
  }
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
