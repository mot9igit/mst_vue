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
        <span class="block-header__title">Заказ №{{ this.order.id }}</span>
      </div>
      <div class="d-col-md-8">
        <!--
        <div class="block-header__buttons">
          <a href="#" class="dart-btn dart-btn-primary" :disabled="isLoading == true" :class="{ 'dart-btn-loading': isLoading }" @click.prevent="showCodeModal = true">Выдать товар</a>
        </div>
        -->
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
              <span class="value">{{ order.name_short }}</span>
            </div>
          </div>
          <div class="d-col-md-6" v-if="order.phone">
            <div class="item">
              <span class="label">Телефон покупателя</span>
              <a :href="'tel:' + order.phone" class="value">{{ order.phone }}</a>
            </div>
          </div>
          <div class="d-col-md-6">
            <div class="item">
              <span class="label">Дата заказа</span>
              <span class="value">{{ order.date }}</span>
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
                <tr v-for="(item, index) in order.products" :key="index">
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
import router from '@/router'
// import customModal from '@/components/popup/CustomModal'

export default {
  name: 'ProfileoptorderOpt',
  props: { },
  data () {
    return {
      order: [],
      success_all: false,
      code: '',
      showCodeModal: false,
      isLoading: false,
      type: this.$route.params.type,
      id: this.$route.params.id,
      response: {
        success: true,
        message: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'get_opt_order_api'
    ])
    // check_code () {
    //   this.showCodeModal = true
    // },
    // formSubmit () {
    //   this.$load(async () => {
    //     const data = await this.$api.checkCode.get({
    //       code: this.code,
    //       type: 'code/check',
    //       id: router.currentRoute._value.params.id,
    //       optorder_id: router.currentRoute._value.params.optorder_id
    //     })
    //     this.response = data.data.data
    //     if (this.response.success) {
    //       this.success_all = true
    //       this.change_ststatus()
    //     }
    //   })
    // },
    // change_ststatus () {
    //   this.isLoading = !false
    //   this.change_status().then(res => {
    //     this.isLoading = !true
    //   }).catch(error => {
    //     console.error(error)
    //   })
    // }
  },
  mounted () {
    this.get_opt_order_api({
      action: 'get/orders/seller',
      store_id: router.currentRoute._value.params.id,
      order_id: router.currentRoute._value.params.order_id
    })
  },
  components: {
    // customModal
  },
  computed: {
    ...mapGetters([
      'optorder'
    ])
  },
  watch: {
    optorder: function (newVal, oldVal) {
      this.order = newVal.order
    }
  }
}
</script>

<style lang="scss">
.dart-form-group{
  display: flex;
  flex-wrap: wrap;
  &.error{
    .p-inputwrapper,
    .dart-form-control{
      boptorder: 1px solid #f00;
      boptorder-radius: 6px;
      .p-inputtext{
        boptorder: none;
      }
    }
    span.error_desc{
      color: #e24c4c;
      font-size: 12px
    }
  }
  & > *{
    width: 100%;
  }
  .p-autocomplete{
    flex: 0 0 100%;
  }
  label{
    display: block;
    margin-bottom: 5px;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1.3;
    letter-spacing: 0.25px;
    color: #ADADAD;
  }
}
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
    .desc{
      display: block;
      width: 100%
    }
  }
}
.optorder-info{
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
