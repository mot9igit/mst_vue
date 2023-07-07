<template>
  <div class="to__up">
    <router-link :to="{ name: 'org_orders', params: { id: $route.params.id } }">
      <mdicon name="arrow-left" />
      <span>Назад к заказам</span>
    </router-link>
  </div>
  <div class="block-header">
    <div class="dart-row dart-align-items-center">
      <div class="d-col-md-4">
        <span class="block-header__title">Заказ №{{ order.num }}</span>
        <div class="block-header__description">
          <b>{{ order.description }}</b>
        </div>
      </div>
      <div class="d-col-md-8">
        <div class="block-header__buttons" v-if="order.stores_available != 0 && type == 'slStores'">
          <!--<a href="#" class="dart-btn dart-btn-primary-outline">Отменить заказ</a>-->
          <a href="#" class="dart-btn dart-btn-primary" :disabled="isLoading == true" :class="{ 'dart-btn-loading': isLoading }" @click="change_ststatus">{{ order.transition_anchor }}</a>
        </div>
        <div class="block-header__buttons" v-if="order.warehouses_available != 0 && type == 'slWarehouse'">
          <!--<a href="#" class="dart-btn dart-btn-primary-outline">Отменить заказ</a>-->
          <a href="#" class="dart-btn dart-btn-primary" :disabled="isLoading == true" :class="{ 'dart-btn-loading': isLoading }" @click="change_ststatus">{{ order.transition_anchor }}</a>
        </div>
      </div>
    </div>
  </div>
  <div class="profile-content b-wrap">
    <div class="products">
      <div class="profile-content__title">
        <span class="title">Информация о заказе</span>
      </div>
      <div class="order-info">
        <div class="dart-row">
          <div class="d-col-md-6">
            <div class="item">
              <span class="label">Покупатель</span>
              <span class="value">{{ order.customer_username? order.customer_username : order.customer }}</span>
            </div>
          </div>
          <div class="d-col-md-6" v-if="order.address">
            <div class="item">
              <span class="label">Адрес доставки</span>
              <span class="value">{{ order.address }}</span>
            </div>
          </div>
          <div class="d-col-md-6">
            <div class="item">
              <span class="label">Дата заказа</span>
              <span class="value">{{ order.createdon }}</span>
            </div>
          </div>
          <div class="d-col-md-6">
            <div class="item">
              <span class="label">Способ доставки</span>
              <span class="value">{{ order.delivery }}</span>
            </div>
          </div>
          <div class="d-col-md-6">
            <div class="item">
              <span class="label">Способ оплаты</span>
              <span class="value">{{ order.payment }}</span>
            </div>
          </div>
          <div class="d-col-md-6">
            <div class="item">
              <span class="label">Дилер</span>
              <span class="value">{{ store.name }}</span>
            </div>
          </div>
          <div class="d-col-md-6">
            <div class="item">
              <span class="label">Адрес дилера</span>
              <span class="value">{{ store.address }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="profile-content b-wrap">
    <div class="products">
      <div class="profile-content__title">
        <span class="title">Товары в заказе</span>
      </div>
      <div class="profile-products__products">
        <table class="profile-table">
            <thead class="text-center">
                <tr>
                    <th>Фото</th>
                    <th>Артикул</th>
                    <th>Наименование</th>
                    <th>Кол-во</th>
                    <th>Цена</th>
                    <th>Сумма</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in order_products" :key="index">
                    <td class="img_abs">
                        <img :src="'https://mst.tools/' + item.image" alt="">
                    </td>
                    <td>
                        <span class="mobile-label">Арт.:</span>
                        {{ item.article }}
                    </td>
                    <td>{{ item.name }}</td>
                    <td>
                        <span class="mobile-label">Кол-во:</span>
                        {{ item.count }} шт
                    </td>
                    <td><span class="mobile-label">Цена:</span> {{ item.price }} ₽</td>
                    <td><span class="mobile-label">Сумма:</span>{{ item.cost }} ₽</td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ProfileOrder',
  props: { },
  data () {
    return {
      isLoading: false,
      type: this.$route.params.type,
      id: this.$route.params.id
    }
  },
  methods: {
    ...mapActions([
      'get_order_from_api',
      'change_status'
    ]),
    change_ststatus () {
      this.isLoading = !false
      this.change_status().then(res => {
        this.isLoading = !true
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted () {
    this.get_order_from_api()
  },
  components: { },
  computed: {
    ...mapGetters([
      'order',
      'store',
      'order_products'
    ])
  }
}
</script>

<style lang="scss">
.block-header{
  position: relative;
  margin-bottom: 30px;
  .dart-row{
    justify-content: space-between;
  }
  &__title{
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 24px;
    line-height: 1.3;
    color: #282828;
    margin-bottom: 15px;
  }
  &__description{
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.1px;
    color: #282828;
  }
  &__buttons{
    display: flex;
    justify-content: flex-end;
    .dart-btn + .dart-btn{
      margin-left: 10px;
    }
  }
}
.order-info{
  display: block;
  .item{
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
    span{
      display: block;
      width: 50%;
      &.label{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 130%;
        letter-spacing: 0.5px;
        color: #ADADAD;
      }
      &.value{
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 130%;
        letter-spacing: 0.5px;
        color: #282828;
      }
    }
  }
}
.img_abs{
  max-width: 100px;
  max-height: 100px;
}
</style>
