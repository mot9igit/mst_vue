<template>
  <div class="profile-block" v-if="organizations.stores">
    <div class="profile-block__title">
        <span class="title">Магазины</span>
    </div>
    <div class="organizations" :organizations_data="organizations">
      <div class="dart-row">
        <div class="d-col-lg-3 panel_widget_organization_wrap" v-for="item in organizations.stores" v-bind:key="item.id">
          <div class="panel_widget panel_widget_organization" :class="item.active ? 'active' : 'not_active'">
            <div class="panel_widget_organization__icon">
              <i class="d_icon d_icon-house"></i>
            </div>
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { id: item.id }}">{{ item.name }}</router-link>
            <ul class="panel_widget_organization__menu">
              <li><router-link :to="{ name: 'org_orders', params: { id: item.id }}">Заказы</router-link></li>
              <li><router-link :to="{ name: 'org_products', params: { id: item.id }}">Товары</router-link></li>
              <li><router-link :to="{ name: 'org_profile', params: { id: item.id }}">Карточка компании</router-link></li>
              <li><router-link :to="{ name: 'org_bonuses', params: { id: item.id }}">Ретро-бонусы</router-link></li>
              <li><router-link :to="{ name: 'org_reports', params: { id: item.id }}">Отчеты</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="profile-block" v-if="organizations.warehouses">
    <div class="profile-block__title">
        <span class="title">Оптовые компании</span>
    </div>
    <div class="organizations" :organizations_data="organizations">
      <div class="dart-row">
        <div class="d-col-lg-3 panel_widget_organization_wrap" v-for="item in organizations.warehouses" v-bind:key="item.id">
          <div class="panel_widget panel_widget_organization" :class="item.active ? 'active' : 'not_active'">
            <div class="panel_widget_organization__icon">
              <i class="d_icon d_icon-house"></i>
            </div>
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { id: item.id }}">{{ item.name }}</router-link>
            <ul class="panel_widget_organization__menu">
              <li><router-link :to="{ name: 'org_orders', params: { id: item.id }}">Заказы</router-link></li>
              <li><router-link :to="{ name: 'org_products', params: { id: item.id }}">Товары</router-link></li>
              <li><router-link :to="{ name: 'org_profile', params: { id: item.id }}">Карточка компании</router-link></li>
              <li><router-link :to="{ name: 'org_dilers', params: { id: item.id }}">Дилеры</router-link></li>
              <li><router-link :to="{ name: 'org_shipping', params: { id: item.id }}">Отгрузки</router-link></li>
              <li><router-link :to="{ name: 'org_bonuses', params: { id: item.id }}">Ретро-бонусы</router-link></li>
              <li><router-link :to="{ name: 'org_reports', params: { id: item.id }}">Отчеты</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="profile-block" v-if="organizations.vendors">
    <div class="profile-block__title">
        <span class="title">Производители</span>
    </div>
    <div class="organizations" :organizations_data="organizations">
      <div class="dart-row">
        <div class="d-col-lg-3 panel_widget_organization_wrap" v-for="item in organizations.vendors" v-bind:key="item.id">
          <div class="panel_widget panel_widget_organization" :class="item.active ? 'active' : 'not_active'">
            <div class="panel_widget_organization__icon">
              <i class="d_icon d_icon-house"></i>
            </div>
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { id: item.id }}">{{ item.name }}</router-link>
            <ul class="panel_widget_organization__menu">
              <li><router-link :to="{ name: 'org_profile', params: { id: item.id }}">Карточка компании</router-link></li>
              <li><router-link :to="{ name: 'org_bonuses', params: { id: item.id }}">Ретро-бонусы</router-link></li>
              <li><router-link :to="{ name: 'org_reports', params: { id: item.id }}">Отчеты</router-link></li>
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
    return {
      responsiveOptions: [
        {
          breakpoint: '1199px',
          numVisible: 5,
          numScroll: 3
        },
        {
          breakpoint: '991px',
          numVisible: 3,
          numScroll: 1
        },
        {
          breakpoint: '767px',
          numVisible: 2,
          numScroll: 1
        }
      ]
    }
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
  .profile-block{
    margin-bottom: 40px;
    &__title{
      display: block;
      font-style: normal;
      font-weight: 400;
      font-size: 34px;
      line-height: 40px;
      letter-spacing: 0.0025em;
      color: #282828;
      margin-bottom: 30px;
    }
  }
  .p-carousel {
    .p-carousel-content {
      .p-carousel-item{
        & + .p-carousel-item{
          margin-left: 30px;
        }
      }
      .p-carousel-prev{
        &.p-disabled{
          display: none;
        }
      }
      .p-carousel-next{
        &.p-disabled{
          display: none;
        }
      }
    }
  }
  .organizations{
    position: relative;
    .panel_widget_organization{
      padding: 24px 24px;
      position: relative;
      &__icon{
        display: inline-block;
        padding: 13px 13px;
        background: #FFFFFF;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        i{
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          background: #282828;
          border-radius: 50%;
          color: #fff;
          font-size: 16px;
        }
      }
      &__title{
        display: block;
        text-decoration: none;
        font-style: normal;
        font-size: 14px;
        letter-spacing: 0.25px;
        color: #282828;
        line-height: 1.3;
        font-weight: 500;
        margin: 16px 0 0;
        min-height: 34px;
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
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 1.3;
            letter-spacing: 0.25px;
            color: #676767;
            text-decoration: none;
            &:hover{
              color: #ff0000;
            }
          }
        }
      }
    }
  }
</style>
