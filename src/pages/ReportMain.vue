<template>
  <div class="profile">
    <div class="panel_widget panel_widget_organization">
      <span class="panel_widget_organization__title">Отчеты</span>
      <ul class="panel_widget_organization__menu">
        <li><router-link :to="{ name: 'org_reports_speed', params: { type: $route.params.type, id: $route.params.id }}">Скорость продаж</router-link></li>
        <li><router-link :to="{ name: 'org_reports_average', params: { type: $route.params.type, id: $route.params.id }}">Средний чек</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportsMain',
  data () {
    return { }
  },
  components: { },
  computed: { }
}
</script>

<style lang="scss">
</style>
