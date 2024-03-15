<template>
  <div class="profile-block" v-if="organizations.stores">
    <div class="profile-block__title">
        <span class="title">Магазины</span>
    </div>
    <div class="organizations" :organizations_data="organizations">
      <div class="dart-row">
        <div class="d-col-lg-3 panel_widget_organization_wrap" v-for="item in organizations.stores" v-bind:key="item.id">
          <div class="panel_widget panel_widget_organization" :class="item.active ? 'active' : 'not_active'">
            <div class="panel_widget_organization__top">
              <div class="panel_widget_organization__icon" v-if="item.image">
                <img :src="item.image" alt="">
                <div class="panel_widget_organization__status">
                  <i class="d_icon d_icon-check"></i>
                  <!-- <i class="d_icon d_icon-focus"></i> -->
                </div>
              </div>
              <div class="panel_widget_organization__icon" v-else>
                <i class="d_icon d_icon-house"></i>
              </div>
              <!-- <div class="panel_widget_organization__notifications">
                <i class="d_icon d_icon-alerts"><div class="panel_widget_organization__notifications-cout">1</div></i>
              </div> -->
            </div>
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { id: item.id }}">{{ item.name_short }}</router-link>
            <p class="panel_widget_organization__addres">{{ item.address }}</p>
            <hr/>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Баланс</p>
              <p class="panel_widget_organization__value">{{item.balance}} ₽</p>
            </div>
            <hr/>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Заказы</p>
              <p class="panel_widget_organization__circle active">{{item.orders.count}}</p>
            </div>
            <!--
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Упущенные продажи</p>
              <p class="panel_widget_organization__value">268 950 ₽</p>
            </div>
            -->
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
            <div class="panel_widget_organization__top">
              <div class="panel_widget_organization__icon" v-if="item.image">
                <img :src="item.image" alt="">
                <div class="panel_widget_organization__status">
                  <!-- <i class="d_icon d_icon-check"></i> -->
                  <i class="d_icon d_icon-focus"></i>
                </div>
              </div>
              <div class="panel_widget_organization__icon" v-else>
                <i class="d_icon d_icon-house"></i>
              </div>
              <!-- <div class="panel_widget_organization__notifications">
                <i class="d_icon d_icon-alerts"><div class="panel_widget_organization__notifications-cout active">10</div></i>
              </div> -->
            </div>
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { id: item.id }}">{{ item.name }}</router-link>
            <p class="panel_widget_organization__addres">{{ item.address }}</p>
            <hr/>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Баланс</p>
              <p class="panel_widget_organization__value">{{item.balance}} ₽</p>
            </div>
            <hr/>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Заказы</p>
              <p class="panel_widget_organization__circle">{{item.orders.count}}</p>
            </div>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Отгрузки</p>
              <p class="panel_widget_organization__circle">{{item.ships.count}}</p>
            </div>
            <!--
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Упущенные продажи</p>
              <p class="panel_widget_organization__value">268 950 ₽</p>
            </div>
            -->
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
            <div class="panel_widget_organization__top">
              <div class="panel_widget_organization__icon" v-if="item.image">
                <img :src="item.image" alt="">
                <div class="panel_widget_organization__status">
                  <!-- <i class="d_icon d_icon-check"></i> -->
                  <i class="d_icon d_icon-focus"></i>
                </div>
              </div>
              <div class="panel_widget_organization__icon" v-else>
                <i class="d_icon d_icon-house"></i>
              </div>
              <!-- <div class="panel_widget_organization__notifications">
                <i class="d_icon d_icon-alerts"><div class="panel_widget_organization__notifications-cout active">10</div></i>
              </div> -->
            </div>
            <router-link class="panel_widget_organization__title" :to="{ name: 'organization', params: { id: item.id }}">{{ item.name }}</router-link>
            <p class="panel_widget_organization__addres">{{ item.address }}</p>
            <hr/>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Баланс</p>
              <p class="panel_widget_organization__value">{{item.balance}} ₽</p>
            </div>
            <hr/>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Заказы</p>
              <p class="panel_widget_organization__circle">{{item.orders.count}}</p>
            </div>
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Отгрузки</p>
              <p class="panel_widget_organization__circle">{{item.ships.count}}</p>
            </div>
            <!--
            <div class="panel_widget_organization__two-collums">
              <p class="panel_widget_organization__name">Упущенные продажи</p>
              <p class="panel_widget_organization__value">268 950 ₽</p>
            </div>
            -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
// import router from '@/router'

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
  computed: {
    ...mapGetters([
      'organizations'
    ]),
    getmenu: function () {
      return function (type, id) {
        // console.log(type + ' + ' + id)
        if (type) {
          if (type === 1) {
            return [{
              key: '0',
              label: 'Заказы',
              icon: 'd_icon d_icon-list-bulleted',
              to: { name: 'org_orders', params: { id: id } }
            }, {
              key: '1',
              label: 'Товары',
              icon: 'd_icon d_icon-archive',
              to: { name: 'org_products', params: { id: id } }
            }, {
              key: '2',
              label: 'Карточка компании',
              icon: 'd_icon d_icon-cog',
              to: { name: 'org_profile', params: { id: id } }
            }, {
              key: '3',
              label: 'Мои поставщики',
              icon: 'd_icon d_icon-cog',
              to: { name: 'org_opts', params: { id: id } }
            }, {
              key: '4',
              label: 'Программы оптовиков и производителей',
              icon: 'd_icon d_icon-star',
              to: { name: 'org_bonuses', params: { id: id } }
            }, {
              key: '5',
              label: 'Мастер отчетов',
              icon: 'd_icon d_icon-analytics',
              to: { name: 'org_reports', params: { id: id } }
            }, {
              key: '6',
              label: 'Документы',
              icon: 'd_icon d_icon-file-document',
              to: { name: 'org_docs', params: { id: id } }
            }]
          }
          if (type === 2) {
            return [{
              key: '0',
              label: 'Заказы',
              icon: 'd_icon d_icon-list-bulleted',
              to: { name: 'org_orders', params: { id: id } }
            }, {
              key: '1',
              label: 'Товары',
              icon: 'd_icon d_icon-archive',
              to: { name: 'org_products', params: { id: id } }
            }, {
              key: '2',
              label: 'Карточка компании',
              icon: 'd_icon d_icon-cog',
              to: { name: 'org_profile', params: { id: id } }
            }, {
              key: '3',
              label: 'Мои магазины',
              icon: 'd_icon d_icon-cog',
              to: { name: 'org_dilers', params: { id: id } }
            }, {
              key: '4',
              label: 'Отгрузки',
              icon: 'd_icon d_icon-truck',
              to: { name: 'org_shipping', params: { id: id } }
            }, {
              key: '5',
              label: 'Мои программы',
              icon: 'd_icon d_icon-star',
              to: { name: 'org_ourbonuses', params: { id: id } }
            }, {
              key: '6',
              label: 'Программы производителей',
              icon: 'd_icon d_icon-star',
              to: { name: 'org_bonuses', params: { id: id } }
            }, {
              key: '7',
              label: 'Мастер отчетов',
              icon: 'd_icon d_icon-analytics',
              to: { name: 'org_reports', params: { id: id } }
            }, {
              key: '8',
              label: 'Документы',
              icon: 'd_icon d_icon-file-document',
              to: { name: 'org_docs', params: { id: id } }
            }]
          }
          if (type === 3) {
            return [{
              key: '1',
              label: 'Карточка компании',
              icon: 'd_icon d_icon-cog',
              to: { name: 'org_profile', params: { id: id } }
            }, {
              key: '2',
              label: 'Ассортимент',
              icon: 'pi pi-database',
              to: { name: 'org_assortment', params: { id: id } }
            }, {
              key: '3',
              label: 'Товары',
              icon: 'd_icon d_icon-archive',
              to: { name: 'org_products', params: { id: id } }
            }, {
              key: '4',
              label: 'Мои программы',
              icon: 'd_icon d_icon-star',
              to: { name: 'org_ourbonuses', params: { id: id } }
            }, {
              key: '5',
              label: 'Мои магазины',
              icon: 'd_icon d_icon-cog',
              to: { name: 'org_dilers', params: { id: id } }
            }, {
              key: '6',
              label: 'Мои оптовики',
              icon: 'd_icon d_icon-cog',
              to: { name: 'org_opts', params: { id: id } }
            }, {
              key: '7',
              label: 'Отгрузки',
              icon: 'd_icon d_icon-truck',
              to: { name: 'org_shipping', params: { id: id } }
            }, {
              key: '8',
              label: 'АКБ',
              icon: 'd_icon d_icon-star',
              to: { name: 'org_akb', params: { id: id } }
            }, {
              key: '9',
              label: 'Наличие товара',
              icon: 'd_icon d_icon-star',
              to: { name: 'org_reports_available', params: { id: id } }
            }, {
              key: '10',
              label: 'Мастер отчетов',
              icon: 'd_icon d_icon-analytics',
              to: { name: 'org_reports', params: { id: id } }
            }, {
              key: '11',
              label: 'Ключевые матрицы',
              icon: 'd_icon d_icon-key',
              to: { name: 'org_matrix', params: { id: id } }
            }, {
              key: '12',
              label: 'Документы',
              icon: 'd_icon d_icon-file-document',
              to: { name: 'org_docs', params: { id: id } }
            }]
          }
          return { }
        } else {
          return { }
        }
      }
    }
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
      height: calc(100% - 20px);
      &__icon{
        position: relative;
        display: inline-block;
        padding: 13px 13px;
        background: #FFFFFF;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 3px 1px rgba(0, 0, 0, 0.12), 0px 1px 5px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        img{
          max-height: 34px;
        }
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
        line-height: 1.2;
        font-weight: 500;
        margin: 16px 0 8px 0;
      }
      &__addres{
        color: #666666;
        font-size: 14px;
        line-height: 1.1;
        font-weight: 400;
      }
      &__two-collums{
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      &__name{
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        margin-bottom: 0;
      }
      &__value{
        font-size: 14px;
        font-weight: 500;
        color: #282828;
        margin-bottom: 0;
      }
      &__top{
        display: flex;
        justify-content: space-between;
      }
      &__circle{
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #A0A0A0;
        color: #FFF;
        border-radius: 50%;
        font-size: 12px;
        line-height: 1;
        &.active{
          background: #282828;
        }
      }
      &__notifications{
        .d_icon{
          color: #A0A0A0;
          font-size: 20px;
          position: relative;
        }

        &-cout{
          width: 20px;
          height: 20px;
          border-radius: 50%;
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          background: #A0A0A0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: -13px;
          bottom: -10px;

          &.active{
            background: #FF0000;
          }
        }
      }
      &__status{
        width: 20px;
        height: 20px;
        position: absolute;
        right: -7px;
        bottom: -7px;
        .d_icon{
          font-size: 20px;
          width: 100%;
          height: 100%;
          background: #FFF;
        }
      }
      &__menu{
        list-style-type: none;
        padding: 10px 0;
        margin: 0 -24px;
        .p-menu{
          border: none;
          width: 100%;
          .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text{
            color: #343434;
          }
          .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-icon{
            font-size: 18px;
            color: #343434;
          }
        }
        li{
          padding: 0;
          margin: 0;
          a{
            display: flex;
            align-items: center;
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
