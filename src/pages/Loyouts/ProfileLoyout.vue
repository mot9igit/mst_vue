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
            </div>
            </div>
          <div class="organization-menu__menu">
            <PanelMenu v-model:expandedKeys="expandedKeys" :model="getMenu"/>
          </div>
        </div>
        <div v-else>
          <PanelMenu v-model:expandedKeys="expandedKeys" :model="menu"/>
        </div>
      </div>
      <a href="#" class="sidebar-toggle" @click="sidebarToggle">
        <mdicon name="arrow-collapse-right" :width="12" :height="12"/>
      </a>
    </nav>
    <main role="main">
      <main-header
        :active="true"
        @clickMenu="clickMenu"
      />
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

export default {
  name: 'ProfilePage',
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
      this.menu.push({
        key: '1',
        label: 'Вся база товаров',
        icon: 'pi pi-database',
        to: { name: 'copo_all' }
      })
    }
  },
  components: { MainHeader, PanelMenu },
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
          }, {
            key: '1',
            label: 'Товары',
            icon: 'd_icon d_icon-archive',
            to: { name: 'org_products', params: { id: this.$route.params.id } }
          }, {
            key: '2',
            label: 'Карточка компании',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_profile', params: { id: this.$route.params.id } }
          }, {
            key: '3',
            label: 'Мои поставщики',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_opts', params: { id: this.$route.params.id } }
          }, {
            key: '4',
            label: 'Программы оптовиков и производителей',
            icon: 'd_icon d_icon-star',
            to: { name: 'org_bonuses', params: { id: this.$route.params.id } }
          }, {
            key: '5',
            label: 'Мастер отчетов',
            icon: 'd_icon d_icon-analytics',
            to: { name: 'org_reports', params: { id: this.$route.params.id } }
          }, {
            key: '6',
            label: 'Документы',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'org_docs', params: { id: this.$route.params.id } }
          }]
        }
        if (this.organization.type === 2) {
          return [{
            key: '0',
            label: 'Заказы',
            icon: 'd_icon d_icon-list-bulleted',
            to: { name: 'org_orders', params: { id: this.$route.params.id } }
          }, {
            key: '1',
            label: 'Товары',
            icon: 'd_icon d_icon-archive',
            to: { name: 'org_products', params: { id: this.$route.params.id } }
          }, {
            key: '2',
            label: 'Карточка компании',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_profile', params: { id: this.$route.params.id } }
          }, {
            key: '3',
            label: 'Мои магазины',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_dilers', params: { id: this.$route.params.id } }
          }, {
            key: '4',
            label: 'Отгрузки',
            icon: 'd_icon d_icon-truck',
            to: { name: 'org_shipping', params: { id: this.$route.params.id } }
          }, {
            key: '5',
            label: 'Программы производителей',
            icon: 'd_icon d_icon-star',
            to: { name: 'org_bonuses', params: { id: this.$route.params.id } }
          }, {
            key: '6',
            label: 'Мои программы',
            icon: 'd_icon d_icon-star',
            to: { name: 'org_ourbonuses', params: { id: this.$route.params.id } }
          }, {
            key: '7',
            label: 'Мастер отчетов',
            icon: 'd_icon d_icon-analytics',
            to: { name: 'org_reports', params: { id: this.$route.params.id } }
          }, {
            key: '8',
            label: 'Документы',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'org_docs', params: { id: this.$route.params.id } }
          }]
        }
        if (this.organization.type === 3) {
          return [{
            key: '1',
            label: 'Карточка компании',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_profile', params: { id: this.$route.params.id } }
          }, {
            key: '2',
            label: 'Ассортимент',
            icon: 'pi pi-database',
            to: { name: 'org_assortment', params: { id: this.$route.params.id } }
          }, {
            key: '3',
            label: 'Товары',
            icon: 'd_icon d_icon-archive',
            to: { name: 'org_products', params: { id: this.$route.params.id } }
          }, {
            key: '4',
            label: 'Мои программы',
            icon: 'd_icon d_icon-star',
            to: { name: 'org_ourbonuses', params: { id: this.$route.params.id } }
          }, {
            key: '5',
            label: 'Мои магазины',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_dilers', params: { id: this.$route.params.id } }
          }, {
            key: '7',
            label: 'Мои оптовики',
            icon: 'd_icon d_icon-cog',
            to: { name: 'org_opts', params: { id: this.$route.params.id } }
          }, {
            key: '8',
            label: 'Отгрузки',
            icon: 'd_icon d_icon-truck',
            to: { name: 'org_shipping', params: { id: this.$route.params.id } }
          }, {
            key: '9',
            label: 'АКБ',
            icon: 'd_icon d_icon-star',
            to: { name: 'org_akb', params: { id: this.$route.params.id } }
          }, {
            key: '10',
            label: 'Наличие товара',
            icon: 'd_icon d_icon-star',
            to: { name: 'org_reports_available', params: { id: this.$route.params.id } }
          }, {
            key: '11',
            label: 'Мастер отчетов',
            icon: 'd_icon d_icon-analytics',
            to: { name: 'org_reports', params: { id: this.$route.params.id } }
          }, {
            key: '12',
            label: 'Ключевые матрицы',
            icon: 'd_icon d_icon-key',
            to: { name: 'org_matrix', params: { id: this.$route.params.id } }
          }, {
            key: '13',
            label: 'Документы',
            icon: 'd_icon d_icon-file-document',
            to: { name: 'org_docs', params: { id: this.$route.params.id } }
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
  .sidebar-toggle{
    position: absolute;
    left: 50%;
    bottom: 15px;
    transform: translate(-50%, 0);
    background: #fff;
    border: 1px solid rgba(0, 0, 0, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 3px;
    z-index: 2;
    span{
      position: relative;
      transition: all .2s ease;
    }
  }
  .p-panelmenu .p-menuitem-text{
    display: none;
  }
  .organization-menu__up{
    text-align: center;
    a{
      span:last-child{
        display: none;
      }
    }
  }
  .organization-menu__name{
    padding: 0 15px;
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
    visibility: hidden;
  }
  .sidebar_header{
    .sidebar_header-close{
      display: none
    }
  }
  &.active{
    width: 350px;
    transition: all .2s ease;
    .dart_diler_widget .dart_diler_widget__info-text{
      visibility: visible;
    }
    .sidebar_widget .dart_diler_widget__btn-container{
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
      span{
        top: 1px;
        left: 1px;
        transform: rotate(-180deg);
        transition: all .2s ease;
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
    border-bottom: 1px dashed #464545;
    margin-bottom: 50px;
    position: relative;
    .logo{
      padding: 10px 15px 10px 15px;
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
</style>
