<template>
    <div class="dart_wrapper">
      <nav class="sidebars" :class="{ 'active': sidebar_active, 'mobile_active': mobile_menu }">
        <div class="sidebar-sticky">
          <div class="sidebar_header">
            <router-link
              :to="{ name: 'home' }"
              class="logo"
            >
              <img src="/img/logo_small.svg" alt="МСТ Аналитика">
              <span>МСТ Аналитика</span>
            </router-link>
            <a href="#" class="sidebar_header-close" @click.prevent="toggleMobileMenu">
              <mdicon name="close" :width="24" :height="24" fill="#ffffff"/>
            </a>
          </div>
          <div class="organization-menu" v-if="$route.params.id">
            <div class="organization-menu__up">
              <router-link :to="{ name: 'organizations' }">
                <mdicon name="arrow-left" />
                <span>Назад к организациям</span>
              </router-link>
            </div>
            <div class="organization-menu__name organization-menu__gradient">
              <div class="icon" v-if="org.image">
                <img :src="org.image" alt="">
              </div>
              <div class="icon" v-else>
                <i class="d_icon d_icon-account-circle"></i>
              </div>
              <router-link class="organization-menu__title" :to="{ name: 'organization', params: { id: $route.params.id }}">{{ org.name }}</router-link>
            </div>
            <div class="organization-menu__name">
                <div class="sidebar_widget dart_diler_widget">
                  <div class="dart_diler_widget__info-text">
                      <div class="item">
                          <div class="label">Баланс</div>
                          <div class="value">{{ org.balance }} ₽</div>
                      </div>
                  </div>
                  <div class="dart_diler_widget__btn-container">
                      <router-link class="dart-btn dart-btn-primary-dark dart-btn-block" :to="{ name: 'org_balance', params: { id: $route.params.id }}">
                        <mdicon name="cash-multiple" :width="24" :height="24"/>
                        <span class="text">Вывести средства</span>
                      </router-link>
                  </div>
                  <div class="dart-payment-status" v-if="organization.active">
                    <i class="d_icon d_icon-check"></i>
                    <!-- <i class="d_icon d_icon-focus"></i> -->
                    <span>Включен</span>
                  </div>
                  <div class="dart-payment-status off" v-else>
                    <i class="d_icon d_icon-focus"></i>
                    <span>Выключен</span>
                  </div>
              </div>
              </div>
              <div class="organization-menu__menu">
                <PanelMenu v-model:expandedKeys="expandedKeys" :model="getMenu">
                  <template #item="{ item }">
                    <router-link class="sitebar-menu__item" :to="item.to" style="color: #fff;">
                      <div class="sitebar-menu__name">
                        <span :class="item.icon" v-if="item.icon"></span>
                        <span class="sitebar-menu__title">{{ item.label }}</span>
                      </div>
                      <div class="sitebar-menu__notification">
                        <!-- Уведомления -->
                      </div>
                      <div class="sitebar-menu__hint">
                        {{ item.label }}
                      </div>
                    </router-link>
                  </template>
                </PanelMenu>
              </div>
          </div>
          <div v-else>
            <PanelMenu v-model:expandedKeys="expandedKeys" :model="menu"/>
          </div>
        </div>
        <a href="#" class="sidebar-toggle" @click="sidebarToggle">
          <i class="d_icon d_icon-arrow"></i>
          <p>Скрыть</p>
          <!-- <mdicon name="pi pi-angle-right" :width="12" :height="12"/> -->
        </a>
      </nav>
      <main role="main">
        <main-header
          :active="true"
          @clickMenu="clickMenu"
        />
        <Nav />
        <div class="main_content">
          <div class="dart_container">
            <router-view></router-view>
          </div>
        </div>
      </main>
    </div>
  </template>
<script>
import MainHeader from '../../components/MainHeader'
import PanelMenu from 'primevue/panelmenu'
import { mapActions, mapGetters } from 'vuex'
import Nav from '../../components/Nav.vue'

export default {
  name: 'PurchasesPage',
  data () {
    return {
      sidebar_active: true,
      mobile_menu: false,
      user: {
      },
      org: {
        image: '',
        balance: '',
        name: ''
      },
      expandedKeys: [],
      route: {
        type: null,
        id: null
      },
      menu: [{
        key: '0',
        label: 'Организации',
        icon: 'd_icon d_icon-human-queue',
        to: { name: 'organizations' }
      }]
    }
  },
  props: { },
  mounted () {
    this.get_organization_from_api().then(() => {
      // this.org.image = this.organization.image
      // this.org.name = this.organization.name
      // this.org.balance = this.organization.balance
    })
    const sidebarCookie = Number(this.$cookies.get('sidebar_active'))
    if (sidebarCookie === 0 || sidebarCookie === 1) {
      this.sidebar_active = sidebarCookie
    }
    this.user = JSON.parse(localStorage.getItem('user'))
    if (this.user.sudo) {
      // this.menu.push({
      //   key: '1',
      //   label: 'Вся база товаров',
      //   icon: 'd_icon d_icon-database',
      //   to: { name: 'copo_all' }
      // })
    }
  },
  components: { MainHeader, PanelMenu, Nav },
  computed: {
    ...mapGetters([
      'organization'
    ]),
    getYear () {
      return new Date().getFullYear()
    },
    getMenu () {
      if (this.organization.type) {
        if (this.organization.type === 1) {
          return [{
            key: '0',
            label: 'Заказы',
            icon: 'd_icon d_icon-list-bulleted',
            to: { name: 'org_orders', params: { id: this.$route.params.id } }
          },
          {
            key: '1',
            label: 'Товары',
            icon: 'd_icon d_icon-products',
            to: { name: 'org_products', params: { id: this.$route.params.id } }
          },
          {
            key: '2',
            label: 'Карточка компании',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_profile', params: { id: this.$route.params.id } }
          },
          // {
          //   key: '3',
          //   label: 'Мои поставщики',
          //   icon: 'd_icon d_icon-vendors',
          //   to: { name: 'org_opts', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '4',
          //   label: 'Программы оптовиков и производителей',
          //   icon: 'd_icon d_icon-star',
          //   to: { name: 'org_bonuses', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '5',
          //   label: 'Мастер отчетов',
          //   icon: 'd_icon d_icon-analytics',
          //   to: { name: 'org_reports', params: { id: this.$route.params.id } }
          // },
          {
            key: '6',
            label: 'Документы',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'org_docs', params: { id: this.$route.params.id } }
          },
          {
            key: '7',
            label: 'Закупки',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'purchases', params: { id: this.$route.params.id } }
          }]
        }
        if (this.organization.type === 2) {
          return [{
            key: '0',
            label: 'Заказы',
            icon: 'd_icon d_icon-list-bulleted',
            to: { name: 'org_orders', params: { id: this.$route.params.id } }
          },
          {
            key: '1',
            label: 'Товары',
            icon: 'd_icon d_icon-products',
            to: { name: 'org_products', params: { id: this.$route.params.id } }
          },
          {
            key: '2',
            label: 'Карточка компании',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_profile', params: { id: this.$route.params.id } }
          },
          // {
          //   key: '3',
          //   label: 'Мои магазины',
          //   icon: 'd_icon d_icon-cog',
          //   to: { name: 'org_dilers', params: { id: this.$route.params.id } }
          // },
          {
            key: '4',
            label: 'Отгрузки',
            icon: 'd_icon d_icon-truck',
            to: { name: 'org_shipping', params: { id: this.$route.params.id } }
          },
          // {
          //   key: '5',
          //   label: 'Программы производителей',
          //   icon: 'd_icon d_icon-star',
          //   to: { name: 'org_bonuses', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '6',
          //   label: 'Мои программы',
          //   icon: 'd_icon d_icon-star',
          //   to: { name: 'org_ourbonuses', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '7',
          //   label: 'Мастер отчетов',
          //   icon: 'd_icon d_icon-analytics',
          //   to: { name: 'org_reports', params: { id: this.$route.params.id } }
          // },
          {
            key: '8',
            label: 'Документы',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'org_docs', params: { id: this.$route.params.id } }
          },
          {
            key: '9',
            label: 'Закупки',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'purchases', params: { id: this.$route.params.id } }
          }]
        }
        if (this.organization.type === 3) {
          return [{
            key: '1',
            label: 'Карточка компании',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_profile', params: { id: this.$route.params.id } }
          },
          // {
          //   key: '2',
          //   label: 'Ассортимент',
          //   icon: 'pi pi-database',
          //   to: { name: 'org_assortment', params: { id: this.$route.params.id } }
          // },
          {
            key: '3',
            label: 'Товары',
            icon: 'd_icon d_icon-products',
            to: { name: 'org_products', params: { id: this.$route.params.id } }
          },
          // {
          //   key: '4',
          //   label: 'Мои программы',
          //   icon: 'd_icon d_icon-star',
          //   to: { name: 'org_ourbonuses', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '5',
          //   label: 'Мои магазины',
          //   icon: 'd_icon d_icon-cog',
          //   to: { name: 'org_dilers', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '7',
          //   label: 'Мои оптовики',
          //   icon: 'd_icon d_icon-cog',
          //   to: { name: 'org_opts', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '8',
          //   label: 'Отгрузки',
          //   icon: 'd_icon d_icon-truck',
          //   to: { name: 'org_shipping', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '9',
          //   label: 'АКБ',
          //   icon: 'd_icon d_icon-star',
          //   to: { name: 'org_akb', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '10',
          //   label: 'Наличие товара',
          //   icon: 'd_icon d_icon-star',
          //   to: { name: 'org_reports_available', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '11',
          //   label: 'Мастер отчетов',
          //   icon: 'd_icon d_icon-analytics',
          //   to: { name: 'org_reports', params: { id: this.$route.params.id } }
          // },
          // {
          //   key: '12',
          //   label: 'Ключевые матрицы',
          //   icon: 'd_icon d_icon-key',
          //   to: { name: 'org_matrix', params: { id: this.$route.params.id } }
          // },
          {
            key: '13',
            label: 'Документы',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'org_docs', params: { id: this.$route.params.id } }
          },
          {
            key: '14',
            label: 'Закупки',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'purchases', params: { id: this.$route.params.id } }
          }]
        }
        return []
      } else {
        return []
      }
    }
  },
  methods: {
    ...mapActions([
      'get_organization_from_api',
      'delete_organization_from_api'
    ]),
    sidebarToggle () {
      this.sidebar_active = !this.sidebar_active
      this.$cookies.set('sidebar_active', Number(this.sidebar_active))
    },
    toggleMobileMenu () {
      this.mobile_menu = !this.mobile_menu
    },
    clickMenu () {
      this.sidebar_active = 1
      this.mobile_menu = !this.mobile_menu
    }
  },
  watch: {
    $route () {
      this.get_organization_from_api()
    },
    organization: function (newVal, oldVal) {
      this.org.image = newVal.image
      this.org.name = newVal.name
      this.org.balance = newVal.balance
      this.org.type = newVal.type
    }
  }
}
</script>
<style lang="scss">

</style>
