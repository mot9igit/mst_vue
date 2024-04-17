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
      <Nav v-if="namePathIsNav == 'purchases'"/>
      <div class="main_content" :class='{"white": namePathIsNav == "purchases"}'>
        <div class="dart_container">
          <router-view></router-view>
        </div>
      </div>
    </main>
    <div class="fixedHelpButton">
      <div class="fixedHelpButton__button" @click="helpMenuToggle">
        <i class="pi pi-question"></i>
        <div class="fixedHelpButton__info">
          <b>Нужна помощь?</b>
          <p>Поможем разобраться в нужном вопросе</p>
        </div>
      </div>
    </div>
    <div class="helpModal" @click="helpMenuToggle" :class="{'show': this.menuHelp}">
      <div class="helpModal__content" @click.stop="">
        <div class="helpModal__close" @click="helpMenuToggle">
          <i class="pi pi-times"></i>
        </div>
        <div class="helpModal__catalog-mobile" @click="this.menuHelpMobile = !this.menuHelpMobile">
          <i class="pi pi-align-right"></i>
        </div>
        <div class="helpModal__menu" :class="{'show': this.menuHelpMobile || !this.menuHelp}">
          <CatalogMenu :active1="this.index1" :active2="this.index2" @getMenuIndex="changeContentTraining" :items="training_catalog"/>
        </div>
        <div class="helpModal__text">
          <p class="helpModal__title">{{ this.index2 == null? training_catalog[this.index1]?.pagetitle : training_catalog[this.index1].children[this.index2]?.pagetitle}}</p>
          <div v-html="this.index2 == null? training_catalog[this.index1]?.content : training_catalog[this.index1].children[this.index2]?.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from '../../components/MainHeader'
import PanelMenu from 'primevue/panelmenu'
import { mapActions, mapGetters } from 'vuex'
import Nav from '@/components/Nav.vue'
import router from '@/router'
import CatalogMenu from '@/components/training/CatalogMenu.vue'

export default {
  name: 'ProfilePage',
  data () {
    return {
      sidebar_active: true,
      mobile_menu: false,
      namePathIsNav: null,
      menuHelp: false,
      menuHelpMobile: false,
      training_catalog: {},
      user: {
      },
      index1: 0,
      index2: null,
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
    this.get_organization_from_api().then(() => {})
    this.get_training_catalog_from_api().then(
      this.training_catalog = this.trainingcatalog
    )
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
  updated () {
    this.namePathIsNav = router?.currentRoute?._value.matched[3]?.name
    this.get_training_catalog_from_api().then(
      this.training_catalog = this.trainingcatalog
    )
  },
  components: { MainHeader, PanelMenu, Nav, CatalogMenu },
  computed: {
    ...mapGetters([
      'organization',
      'trainingcatalog'
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
            to: { name: 'purchases_home', params: { id: this.$route.params.id } }
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
            to: { name: 'purchases_home', params: { id: this.$route.params.id } }
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
            to: { name: 'purchases_home', params: { id: this.$route.params.id } }
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
      'delete_organization_from_api',
      'get_training_catalog_from_api'
    ]),
    changeContentTraining (elem) {
      console.log(elem)
      this.index1 = elem.index1
      this.index2 = elem.index2
    },
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
    },
    helpMenuToggle () {
      this.menuHelp = !this.menuHelp
      if (this.menuHelp) {
        this.globalIsModal.push('-_-')
        document.body.style.overflow = 'hidden'
      } else if (!this.menuHelp && this.globalIsModal.length === 1) {
        this.globalIsModal.pop()
        document.body.style.overflow = 'auto'
      } else {
        this.globalIsModal.pop()
      }
    }
  },
  watch: {
    trainingcatalog: function (newVal, oldVal) {
      this.trainin_catalog = newVal
    },
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

.fixedHelpButton{
  position: fixed;
  right: 40px;
  bottom: 30px;

  &__button{
    width: 56px;
    height: 56px;
    border-radius: 50%;
    cursor: pointer;
    background: #FF0000;
    display: flex;
    align-items: center;
    justify-content: center;

    .pi{
      color: #FFF;
      font-size: 20px;
    }

    &:hover{
      .fixedHelpButton__info{
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  &__info{
    right: 70px;
    transition: all 0.4s;
    position: absolute;
    padding: 16px 24px;
    background: #282828;
    border-radius: 8px;
    color: #FFF;
    opacity: 0;
    pointer-events: none;

    &::before{
      content: "";
      width: 22px;
      height: 22px;
      background: #282828;
      border-radius: 5px;
      position: absolute;
      right: -9px;
      z-index: -1;
      top: 50%;
      transform: translate(0, -50%) rotate(45deg);
    }

    b{
      white-space: nowrap;
      font-weight: 400;
      font-size: 14px;
      margin: 0;
    }

    p{
      font-weight: 400;
      font-size: 12px;
      white-space: nowrap;
      color: #7B7B7B;
      margin-top: 8px;
      margin-bottom: 0;
      padding-top: 8px;
      border-top: 1px solid #414141;
    }
  }
}

.helpModal{
  width: 100vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  pointer-events: none;
  background: rgba($color: #000000, $alpha: 0);
  transition: all 0.5s;

  &__content{
    width: 800px;
    background: #FFF;
    position: fixed;
    right: 0;
    height: 100vh;
    transform: translateX(100%);
    transition: all 0.5s;
    display: flex;
  }

  &__text{
    padding: 40px 24px;
    height: 100vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #e0e0e0; /* blue */
      border-radius: 9em;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #b4b4b4; /* green */
        border-radius: 9em;
    }
  }

  &__title{
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 24px;
  }

  &.show{
    background: rgba($color: #000000, $alpha: 0.5);
    pointer-events: all;

    .helpModal{
      &__content{
        transform: translateX(0);
      }

      &__close{
        left: -45px;
      }
    }
  }

  &__catalog-mobile{
    position: absolute;
    left: 0px;
    top: 60px;
    width: 45px;
    height: 35px;
    background: #FF0000;
    border-radius: 20px 0 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s;
    rotate: 180deg;
    z-index: 2;
    display: none;

    .pi{
      color: #FFF;
      font-size: 16px;
    }

    &:hover{
      background: #ff5e5e;

      .pi{
        font-size: 18px;
      }
    }
  }

  &__close{
    position: absolute;
    left: 0px;
    top: 20px;
    width: 45px;
    height: 35px;
    background: #FF0000;
    border-radius: 20px 0 0 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s;

    .pi{
      color: #FFF;
      font-size: 16px;
    }

    &:hover{
      background: #ff5e5e;

      .pi{
        font-size: 18px;
      }
    }
  }
}

.p-panelmenu-panel{
  border: 0;
}

.organization-menu__menu{
  margin-bottom: 45px;
}
.profile-content__title .title + .desc__text{
  margin-top: 14px;
}
.profile-content__title .desc__text{
  display: block;
  color: #A0A0A0;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: 0.15px;
  & + .desc__text{
    margin-top: 5px;
  }
}
.dart-fieldset{
  margin-bottom: 30px;
  .fieldset_label{
    display: block;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.3;
    color: #282828;
    & + .fieldset_value{
      margin-top: 15px;
    }
  }
  .fieldset_value{
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.25px;
    color: #282828;
  }
}
.participation{
  display: flex;
  align-items: center;
  span{
    display: inline-block;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.25px;
  }
  .mdi + span{
    margin-left: 5px;
  }
  &.participation-no{
    color: #A0A0A0;
  }
  &.participation-yes{
    color: #009821;
  }
}
main{
  transition: all .2s ease;
  .main_content{
    padding: 30px 0;
  }
}
.sidebars {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  background: #282828;
  width: 75px;
  z-index: 100;
  padding: 0 0;
  transition: all .2s ease;
  & + main{
    margin-left: 75px;
    transition: all .2s ease;
  }

  .p-panelmenu .p-panelmenu-panel .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action{
    &:hover{
      background: transparent;
      color: #FFF;
    }
  }
  .p-menuitem-icon{
      color: #FFF ;
  }
  .sidebar-toggle{
    width: calc(100% - 8px);
    position: absolute;
    bottom: 0px;
    background: #282828;
    color: #FFF;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    z-index: 2;
    text-decoration: none;
    gap: 4px;
    p{
      display: none;
    }
    .d_icon{
      font-size: 8px;
      transform: rotate(-90deg);
      position: relative;
      top: -3px;
      transition: all .2s ease;
    }
  }
  .p-panelmenu .p-menuitem-text{
    display: none;
  }
  .organization-menu__up{
    text-align: center;
    margin-bottom: 10px;
    a{
      span:last-child{
        display: none;
      }
    }
  }

  .dart-payment-status{
    height: 31px;
    width: 31px !important;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background: #00F61926;
    border: 1px solid #00F619;
    color: #FFFFFF;
    border-radius: 30px;
    width: fit-content;
    margin-top: 16px;
    span{
      display: none;
    }

    &.off{
      background: rgba(255, 0, 0, 0.15) !important;
      border: 1px solid #FF0000 !important;
    }
  }

  .organization-menu__name{
    padding: 0;
    display: block;
    text-align: center;
    .icon{
      width: 45px;
      height: 45px;
      margin: 0 auto;
    }
    .organization-menu__title{
      display: none;
    }
  }

  .sidebar_widget .dart_diler_widget__btn-container{
    width: 45px;
    height: 45px;
    margin: auto;
    a{
      span:first-child{
        display: inline-block;
      }
      span:last-child{
        display: none;
      }
    }
  }
  .dart_diler_widget .dart_diler_widget__info-text{
    display: none;
  }

  .sidebar_header{
    .sidebar_header-close{
      display: none
    }
  }

  .sitebar-menu{
      &__item{
        width: 100%;
        padding: 15px;
        display: flex;
        align-items: center;
        text-decoration: none;
        justify-content: center;
        gap: 16px;
        &:hover,
        &.router-link-active{
          border-left: 4px solid #FF0000;
          &::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(89.93deg, rgba(255, 0, 0, 0.15) 0.06%, rgba(255, 0, 0, 0) 99.95%);
            z-index: 1;
          }
        }

        &:hover{
          .sitebar-menu__hint{
            opacity: 1;
            pointer-events: all;
          }
        }
      }
      &__name{
        text-align: left;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 16px;
        .d_icon{
          font-size: 24px;
          margin: 0 0;
        }
      }

      &__title{
        display: none;
      }

      &__notification{
        display: none;
      }

      &__hint{
        display: flex;
        position: fixed;
        left: 85px;
        height: 26px;
        padding: 0 10px;
        background: #282828;
        border-radius: 8px;
        align-items: center;
        opacity: 0;
        transition: all 0.4s;
        pointer-events: none;
        &::before{
          width: 10px;
          height: 10px;
          background: #282828;
          position: absolute;
          content: "";
          z-index: 1;
          left: -3px;
          top: 50%;
          transform: translate(0, -50%) rotate(45deg);
        }
      }
  }

  &.active{
    width: 350px;
    transition: all .2s ease;
    .sidebar_header .logo{
      padding: 10px 24px 10px 40px;
      justify-content: flex-start;
    }
    .dart-payment-status{
      height: 31px;
      width: fit-content !important;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #00F61926;
      border: 1px solid #00F619;
      color: #FFFFFF;
      border-radius: 30px;
      margin-top: 16px;
      margin: 16px 0 0 0 ;
      span{
        display: block;
      }
    }
    .dart_diler_widget .dart_diler_widget__info-text{
      visibility: visible;
    }
    .sidebar_widget .dart_diler_widget__btn-container{
      width: auto;
      height: auto;
      a{
        span:first-child{
          display: none;
        }
        span:last-child{
          display: inline-block;
        }
      }
    }
    .organization-menu__up{
      text-align: left;
      a{
        span:last-child{
          display: inline-block;
        }
      }
    }
    .p-panelmenu-panel{
      margin: 0;
    }
    .sitebar-menu{
      &__item{
        width: 100%;
        padding: 15px 24px 15px 40px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        text-decoration: none;
        gap: 16px;
        &:hover,
        &.router-link-active{
          border-left: 4px solid #FF0000;
          &::after{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(89.93deg, rgba(255, 0, 0, 0.15) 0.06%, rgba(255, 0, 0, 0) 99.95%);
            z-index: 1;
          }
        }
      }

      &__name{
        text-align: left;
        padding: 0;
        display: flex;
        align-items: center;
        gap: 16px;
        .d_icon{
          font-size: 24px;
          margin: 0 0;
        }
      }

      &__title{
        font-size: 14px;
        display: block;
        margin: 0;
      }

      &__hint{
        display: none;
      }
    }
    .organization-menu__gradient{
      border-left: 4px solid #FF0000;
      background: linear-gradient(89.93deg, rgba(255, 0, 0, 0.15) 0.06%, rgba(255, 0, 0, 0) 99.95%);
      padding: 15px 24px 15px 40px !important;
      margin-top: 24px;
    }
    .organization-menu__name{
      padding: 0 24px 0 40px;
      display: block;
      text-align: left;
      .icon{
        width: 60px;
        height: 60px;
        margin: 0 0;
      }
      .organization-menu__title{
        display: block;
      }
    }
    .p-panelmenu .p-menuitem-text{
      display: inline-block;
    }
    .p-panelmenu .p-panelmenu-panel .p-panelmenu-header .p-panelmenu-header-content .p-panelmenu-header-action{
      justify-content: flex-start;
      padding: 10px 10px 10px 40px;
      &:hover{
        background: transparent;
        color: #FFF;
      }
    }
    .p-menuitem-text{
      color: #FFF;
    }
    .p-menuitem-icon{
      color: #FFF ;
    }
    .organization-menu__up{
      padding: 0 24px 0 40px;
      a{
        span:last-child{
          display: inline-block;
          font-size: 14px;
          margin-left: 8px;
        }
      }
    }
    .sidebar-toggle {
      .d_icon{
        font-size: 8px;
        transform: rotate(90deg);
        position: relative;
        top: -1px;
        transition: all .2s ease;
      }
      p{
        font-size: 14px;
        display: block;
        margin: 0;
        color: #FFF;
      }
    }
    .sidebar_header{
      .logo{
        span{
          display: inline-block;
          transition: all .2s ease;
        }
      }
    }
  }
  &.active + main{
    margin-left: 350px;
    transition: all .2s ease;
  }
  .sidebar_header{
    // border-bottom: 1px dashed #464545;
    margin-bottom: 20px;
    position: relative;
    .logo{
      padding: 10px 0;
      background: #282828;
      display: flex;
      color: #fff;
      text-decoration: none;
      align-items: center;
      justify-content: center;
      img{
        max-height: 35px;
        & + span{
          margin-left: 15px;
          display: none;
          transition: all .2s ease;
        }
      }
      span{
        display: inline-block;
        font-size: 1.25rem;
        text-decoration: none;
        white-space: nowrap;
      }
    }
  }
  .sidebar-heading {
    font-size: .75rem;
    text-transform: uppercase;
  }
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: 100vh;
  padding: 0 0;
  overflow-x: clip;
  overflow-y: auto;

  &::-webkit-scrollbar {
      width: 8px;
      background-color: #e0e0e0; /* blue */
      border-radius: 9em;
  }
  &::-webkit-scrollbar-thumb {
      background-color: #b4b4b4; /* green */
      border-radius: 9em;
  }
}
.p-panelmenu{
  padding: 0;
  margin: 0;
  .p-panelmenu-panel{
    position: relative;
    .p-panelmenu-header {
      position: relative;
      &:focus .p-panelmenu-header-content{
        outline: none !important;
        box-shadow: none !important;
      }
      &:hover .p-panelmenu-header-content{
        background: transparent !important;
        border: 1px solid transparent !important;
      }
      &.p-highlight .p-panelmenu-header-content{
        background: transparent !important;
        border: 1px solid transparent !important;
        .p-panelmenu-header-action::before{
          transform: rotate(180deg) translate(0, 50%);
          transition: all .2s ease;
        }
      }
      .p-panelmenu-header-content{
        background: transparent;
        border: 1px solid transparent;
        .p-panelmenu-header-action{
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-decoration: none;
          position: relative;
          padding: 10px 10px;
          border-left: 4px solid transparent;
          .p-menuitem-icon{
            font-size: 24px;
            margin-right: 0;
            & + .p-menuitem-text{
              margin-left: 0.5rem;
            }
          }
          span{
            font-size: 16px;
            font-weight: normal;
            position: relative;
            z-index: 2;
          }
          &::before{
            content: '\e922';
            display: inline-block;
            font-size: 10px;
            font-family: icomoon;
            position: absolute;
            top: 50%;
            right: 15px;
            transform: translate(0, -50%);
            z-index: 1;
            transition: all .2s ease;
            display: none;
          }
          &:hover,
          &.router-link-active{
            border-left: 4px solid #FF0000;
            &::after{
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: linear-gradient(89.93deg, rgba(255, 0, 0, 0.15) 0.06%, rgba(255, 0, 0, 0) 99.95%);
              z-index: 1;
            }
          }
        }
      }
    }
    .p-panelmenu-content{
      background: transparent;
      border: 1px solid transparent;
      padding-left: 26px;
      & .p-menuitem-content:hover{
        background: transparent !important;
        .p-menuitem-link .p-menuitem-text{
          color: #ff0000 !important;
        }
      }
      .p-menuitem-link .p-menuitem-text{
        color: #fff !important;
      }
    }
  }
}
.to__up{
  padding: 0;
  margin-bottom: 30px;
  a{
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    letter-spacing: 1.25px;
    color: #343434;
    &:hover{
      span{
        text-decoration: none;
      }
    }
    i{
      & + span{
        margin-right: 5px;
      }
    }
    span{
      text-decoration-line: underline;
    }
  }
}
.organization-menu{
  position: relative;
  &__up{
    padding: 0 15px;
    a{
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: 1.25px;
      color: #ADADAD;
      &:hover{
        span{
          text-decoration: none;
        }
      }
      i{
        & + span{
          margin-right: 5px;
        }
      }
      span{
        text-decoration-line: underline;
      }
    }
  }
  &__name{
    padding: 0 15px;
    .icon{
      width: 60px;
      height: 60px;
      padding: 5px 5px;
      background: #ffffff;
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      i{
        font-size: 24px;
      }
    }
    .dart_diler_widget{
      background: transparent;
      box-shadow: none;
      // margin: 8px 0;
      padding: 16px 0 24px 0;
      border-radius: 0;
      border-bottom: 1px solid #474747;
      &__info-text{
        .item{
          div{
            font-style: normal;
            font-weight: 400;
            font-size: 14px;
            line-height: 1.3;
            letter-spacing: 0.25px;
            color: #666666;
            &.value{
              font-style: normal;
              font-weight: 500;
              font-size: 20px;
              line-height: 1.3;
              color: #FFFFFF;
            }
          }
        }
      }
    }
  }
  &__title{
    display: block;
    margin-top: 16px;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.3;
    text-align: left;
    text-decoration: none;
    letter-spacing: 0.15px;
    color: #FFFFFF;
  }
  &__menu{
    margin-top: 24px;
    ul{
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

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: sticky;
  }
}

@media (max-width: 991px) {

  .helpModal.show .helpModal__content{
    width: 100%;
  }

  .helpModal__close{
    rotate: 180deg;
    left: 0 !important;
    z-index: 2;
  }
  .helpModal__menu{
    position: fixed;
    left: 0;
    height: 100vh;
    z-index: 1;
    padding-top: 100px;
    background: #F3F3F3;
    transform: translateX(-100%);
    transition: all 0.4s;

    &.show{
      transform: translateX(0);
    }
  }

  .helpModal__catalog-mobile{
    display: flex;
    background: #282828;

    &:hover{
      background: #1a1a1a;
    }
  }

  .sidebars{
    left: -3000px;
    .sidebar-toggle{
      display: none;
    }
    &.mobile_active{
      left: 0;
      width: 100%;
    }
    & + main{
      margin-left: 0 !important;
    }
    .sidebar_header{
      position: relative;
      padding: 0 45px;
      .sidebar_header-close{
        display: inline-block;
        color: #fff;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
  }
}
.p-calendar-w-btn{
  input{
    border-radius: 6px 0 0 6px;
    & + .p-button{
      border-radius: 0 6px 6px 0;
    }
  }
}
.ml-0 {
  margin-left: 0!important
}

.ml-1 {
  margin-left: .25rem!important
}

.ml-2 {
  margin-left: .5rem!important
}

.ml-3 {
  margin-left: 1rem!important
}

.ml-4 {
  margin-left: 1.5rem!important
}

.ml-5 {
  margin-left: 2rem!important
}

.ml-6 {
  margin-left: 3rem!important
}

.ml-7 {
  margin-left: 4rem!important
}
.hidden {
  display: none!important
}

.block {
  display: block!important
}

.inline {
  display: inline!important
}

.inline-block {
  display: inline-block!important
}

.flex {
  display: flex!important
}

.inline-flex {
  display: inline-flex!important
}

.p-checkbox {
  position: relative;
  display: inline-flex;
  user-select: none;
  vertical-align: bottom;
}

.p-checkbox-input {
  cursor: pointer;
}

.p-checkbox-box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.p-checkbox {
  width: 1.25rem;
  height: 1.25rem;
}
.p-checkbox .p-checkbox-input {
  appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;
  z-index: 1;
  outline: 0 none;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
}
.p-checkbox .p-checkbox-box {
  border: 1px solid #cbd5e1;
  background: #ffffff;
  width: 1.25rem;
  height: 1.25rem;
  color: #334155;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s, border-color 0.2s, box-shadow 0.2s, outline-color 0.2s;
  outline-color: transparent;
}
.p-checkbox .p-checkbox-box .p-checkbox-icon {
  transition-duration: 0.2s;
  color: #ffffff;
  font-size: 0.875rem;
}
.p-checkbox .p-checkbox-box .p-checkbox-icon.p-icon {
  width: 0.875rem;
  height: 0.875rem;
}
.p-checkbox.p-highlight .p-checkbox-box {
  border-color: #ff0000;
  background: #ff0000;
}
.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
  border-color: #94a3b8;
}
.p-checkbox:not(.p-disabled):has(.p-checkbox-input:hover).p-highlight .p-checkbox-box {
  border-color: #ff0000;
  background: #ff0000;
  color: #ffffff;
}
.p-checkbox:not(.p-disabled):has(.p-checkbox-input:focus-visible) .p-checkbox-box {
  outline: 1px solid var(--p-focus-ring-color);
  outline-offset: -1px;
  box-shadow: none;
  border-color: #94a3b8;
}
.p-checkbox.p-invalid > .p-checkbox-box {
  border-color: #f87171;
}
.p-checkbox.p-variant-filled .p-checkbox-box {
  background-color: #f8fafc;
}
.p-checkbox.p-variant-filled.p-highlight .p-checkbox-box {
  background: #10b981;
}
.p-checkbox.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover) .p-checkbox-box {
  background-color: #f8fafc;
}
.p-checkbox.p-variant-filled:not(.p-disabled):has(.p-checkbox-input:hover).p-highlight .p-checkbox-box {
  background: #059669;
}
</style>
