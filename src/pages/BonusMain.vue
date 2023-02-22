<template>
  <div class="profile" v-if="$route.params.type == 'slStores'">
    <div class="dart-row">
      <div class="d-col-md-8">
        <div class="profile-content b-wrap">
          <img src="@/assets/screens/mst_2_1.png" alt=""/>
        </div>
      </div>
      <div class="d-col-md-4">
        <div class="profile-content b-wrap">
          <img src="@/assets/screens/mst_2_2.png" alt=""/>
        </div>
      </div>
    </div>
    <div class="profile-content b-wrap">
      <div class="dart-row">
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_outofstock', params: { type: $route.params.type, id: $route.params.id }}">Out Of Stock</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_remains', params: { type: $route.params.type, id: $route.params.id }}">Остатки</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_personal', params: { type: $route.params.type, id: $route.params.id }}">Персонал</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_pos', params: { type: $route.params.type, id: $route.params.id }}">POS-материалы</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_actions', params: { type: $route.params.type, id: $route.params.id }}">Акции</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="profile" v-else>
    <div class="profile-content b-wrap">
      <img src="@/assets/screens/mst_1.png" alt="">
    </div>
    <div class="profile-content b-wrap">
      <div class="dart-row">
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_outofstock', params: { type: $route.params.type, id: $route.params.id }}">Out Of Stock</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_remains', params: { type: $route.params.type, id: $route.params.id }}">Остатки</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_quality', params: { type: $route.params.type, id: $route.params.id }}">Качество обслуживания</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_akb_punkts', params: { type: $route.params.type, id: $route.params.id }}">План АКБ по точкам</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_akb_city', params: { type: $route.params.type, id: $route.params.id }}">План АКБ по городам</router-link>
          </div>
        </div>
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_organization">
            <router-link class="panel_widget_organization__title" :to="{ name: 'org_actions', params: { type: $route.params.type, id: $route.params.id }}">Акции</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BonusMain',
  data () {
    return { }
  },
  components: { },
  computed: { }
}
</script>

<style lang="scss">
</style>
