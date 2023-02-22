<template>
  <div class="profile-content b-wrap">
    <div class="profile-content__title">
        <span class="title">Мои организации</span>
    </div>
    <div class="organizations" :organizations_data="organizations">
      <div class="dart-row">
        <div class="d-col-lg-3" v-for="item in organizations.stores" v-bind:key="item.id">
          <div class="panel_widget panel_widget_organization" :class="item.active ? 'active' : 'not_active'">
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { type: item.type, id: item.id }}">{{ item.name }}</router-link>
            <ul class="panel_widget_organization__menu">
              <li><router-link :to="{ name: 'org_orders', params: { type: item.type, id: item.id }}">Заказы</router-link></li>
              <li><router-link :to="{ name: 'org_products', params: { type: item.type, id: item.id }}">Товары</router-link></li>
              <li><router-link :to="{ name: 'org_profile', params: { type: item.type, id: item.id }}">Карточка компании</router-link></li>
              <li><router-link :to="{ name: 'org_bonuses', params: { type: item.type, id: item.id }}">Ретро-бонусы</router-link></li>
              <li><router-link :to="{ name: 'org_reports', params: { type: item.type, id: item.id }}">Отчеты</router-link></li>
            </ul>
          </div>
        </div>
        <div class="d-col-lg-3" v-for="item in organizations.warehouses" v-bind:key="item.id">
          <div class="panel_widget panel_widget_organization" :class="item.active ? 'active' : 'not_active'">
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { type: item.type, id: item.id }}">{{ item.name }}</router-link>
            <ul class="panel_widget_organization__menu">
              <li><router-link :to="{ name: 'org_orders', params: { type: item.type, id: item.id }}">Заказы</router-link></li>
              <li><router-link :to="{ name: 'org_products', params: { type: item.type, id: item.id }}">Товары</router-link></li>
              <li><router-link :to="{ name: 'org_profile', params: { type: item.type, id: item.id }}">Карточка компании</router-link></li>
              <li><router-link :to="{ name: 'org_dilers', params: { type: item.type, id: item.id }}">Дилеры</router-link></li>
              <li><router-link :to="{ name: 'org_shipping', params: { type: item.type, id: item.id }}">Отгрузки</router-link></li>
              <li><router-link :to="{ name: 'org_bonuses', params: { type: item.type, id: item.id }}">Ретро-бонусы</router-link></li>
              <li><router-link :to="{ name: 'org_reports', params: { type: item.type, id: item.id }}">Отчеты</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileOrganizations',
  props: {
    organizations_data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    ...mapActions([
      'get_organizations_from_api'
    ])
  },
  mounted () {
    this.get_organizations_from_api()
  },
  components: { },
  computed: {
    ...mapGetters([
      'organizations'
    ])
  }
}
</script>

<style lang="scss">
  .panel_widget_organization{
    position: relative;
    height: 100%;
    &__title{
      text-decoration: none;
      font-size: 18px;
      font-weight: 500;
    }
    &__menu{
      list-style-type: none;
      padding: 10px 0;
      margin: 0;
      li{
        padding: 0;
        margin: 0;
        a{
          display: block;
          font-size: 14px;
          text-decoration: none;
          &:hover{
            color: #ff0000;
          }
        }
      }
    }
  }
</style>
