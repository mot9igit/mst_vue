<template>
  <section class="opt-order">
    <router-link class="opt-order__back" :to="{ name: 'org_orders', params: { id: $route.params.id } }">
      <mdicon name="arrow-left" />
      <span>Назад к заказам</span>
    </router-link>

    <div class="opt-order__top opt-order-top">
      <div class="opt-order-top__left">
        <div class="opt-order-top__info">
          <h1 class="opt-order__title">Заказ №{{ this.order?.id }}</h1>
          <span class="opt-order__date"
            >от <time datetime="2022-01-01">{{ new Date(this.order.date)?.toLocaleString("ru", this.dateOptions) }}</time></span
          >
        </div>
        <TreeSelect placeholder="Укажите статус" class="opt-order__select" />
      </div>

      <div class="opt-order-top__right">
        <!-- <button class="dart-btn dart-btn-secondary opt-order__button">
          Скачать документы
          <i class="d_icon d_icon-arrow opt-order__button-arrow"></i>
        </button> -->
        <DropdownButton />
        <button class="dart-btn dart-btn-secondary opt-order__button">
          Удалить заказ
        </button>
      </div>
    </div>

    <div class="opt-order__details opt-order-details">
      <article class="opt-container opt-order-details__card detail-card">
        <h2 class="detail-card__title">Отсрочка</h2>

        <div class="detail-card__content">
          <div class="detail-card__row">
            <p class="detail-card__name">График платежей</p>
            <ul class="detail-card__value-list">
              <li class="detail-card__value-list-item">
                50% через 0 дней после отгрузки
              </li>
              <li class="detail-card__value-list-item">
                50% через 30 дней после отгрузки
              </li>
            </ul>
          </div>
          <div class="detail-card__row">
            <p class="detail-card__name">
              Количество дней или индивидуальные условия
            </p>
            <p class="detail-card__value">50 дней</p>
          </div>
        </div>
      </article>

      <article class="opt-container opt-order-details__card detail-card">
        <h2 class="detail-card__title">Покупатель</h2>

        <div class="detail-card__content">
          <div class="detail-card__row">
            <p class="detail-card__name">Название юр. лица</p>
            <p class="detail-card__value">{{ this.order?.buyer_name }}</p>
          </div>
          <div class="detail-card__row">
            <p class="detail-card__name">ИНН</p>
            <p class="detail-card__value"></p>
          </div>
          <div class="detail-card__row">
            <p class="detail-card__name">КПП</p>
            <p class="detail-card__value"></p>
          </div>
          <div class="detail-card__row">
            <p class="detail-card__name">Адрес получателя</p>
            <p class="detail-card__value">
            </p>
          </div>
        </div>
      </article>

      <article class="opt-container opt-order-details__card detail-card">
        <h2 class="detail-card__title">Поставщик</h2>

        <div class="detail-card__content">
          <div class="detail-card__row">
            <p class="detail-card__name">Название юр. лица</p>
            <p class="detail-card__value">{{ this.order?.name_short }}</p>
          </div>
          <div class="detail-card__row">
            <p class="detail-card__name">ИНН</p>
            <p class="detail-card__value">{{ this.order?.seller_inn }}</p>
          </div>
          <div class="detail-card__row">
            <p class="detail-card__name">КПП</p>
            <p class="detail-card__value">{{ this.order?.seller_kpp }}</p>
          </div>
          <div class="detail-card__row">
            <p class="detail-card__name">Адрес получателя</p>
            <p class="detail-card__value">
              {{ this.order?.seller_address }}
            </p>
          </div>
        </div>
      </article>
    </div>

    <div class="opt-container opt-order__delivery opt-order-delivery">
      <table class="opt-table">
        <thead class="opt-table__head">
          <tr class="opt-table__row opt-table__head-row">
            <th class="opt-table__head-col">Оплата доставки</th>
            <th class="opt-table__head-col">Дата отгрузки</th>
            <th class="opt-table__head-col">Статус заказа</th>
          </tr>
        </thead>
        <tbody class="opt-table__body">
          <tr class="opt-table__row">
            <td class="opt-table__col">-------------------</td>
            <td class="opt-table__col">--.--.--</td>
            <td class="opt-table__col">{{ this.order?.status_name }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="opt-container opt-order__products opt-order-products">
      <table class="opt-table opt-table--products">
        <thead class="opt-table__head">
          <tr class="opt-table__row opt-table__head-row">
            <th class="opt-table__head-col" style="width: 40%">Товар</th>
            <th class="opt-table__head-col">Акции</th>
            <th class="opt-table__head-col" style="width: 10%">Кол-во</th>
            <th class="opt-table__head-col">Цена за единицу с НДС</th>
            <th class="opt-table__head-col" style="width: 5%">НДС</th>
            <th class="opt-table__head-col">Сумма / Сумма с НДС</th>
          </tr>
        </thead>
        <tbody class="opt-table__body">
          <tr v-for="(item, index) in this.order?.products" :key="index" class="opt-table__row">
            <td class="opt-table__col">
              <article class="opt-order-products__info opt-product-info">
                <img
                  :src="item.image"
                  alt="Изображение товара"
                  class="opt-product-info__img"
                />
                <div class="opt-product-info__content">
                  <h3 class="opt-product-info__title">
                    {{item.name}}
                  </h3>
                  <span class="opt-product-info__article">{{item.article}}</span>
                </div>
              </article>
            </td>
            <td class="opt-table__col">
              <div class="opt-promotion__list">
                <article class="opt-promotion">
                  <img
                    src="/img/test/promotion.png"
                    alt="Изображение акции"
                    class="opt-promotion__img"
                  />
                </article>
                <article class="opt-promotion">
                  <img
                    src="/img/test/promotion.png"
                    alt="Изображение акции"
                    class="opt-promotion__img"
                  />
                </article>
                <article class="opt-promotion">
                  <img
                    src="/img/test/promotion.png"
                    alt="Изображение акции"
                    class="opt-promotion__img"
                  />
                </article>
              </div>
            </td>
            <td class="opt-table__col">{{item.count}}</td>
            <td class="opt-table__col">{{Number(item.price).toLocaleString('ru')}} ₽</td>
            <td class="opt-table__col">-- %</td>
            <td class="opt-table__col">{{(Number(item.price) * item.count).toLocaleString('ru')}} ₽ / {{(Number(item.price) * item.count).toLocaleString('ru')}} ₽</td>
          </tr>
          <!-- <tr class="opt-table__row">
            <td class="opt-table__col">
              <article class="opt-order-products__info opt-product-info">
                <img
                  src="/img/test/drill.png"
                  alt="Изображение товара"
                  class="opt-product-info__img"
                />
                <div class="opt-product-info__content">
                  <h3 class="opt-product-info__title">
                    Аккумуляторная дрель-шуруповерт ИНТЕРСКОЛ ДА-10/14.4Л2
                    425.0.2.00
                  </h3>
                  <span class="opt-product-info__article">844337</span>
                </div>
              </article>
            </td>
            <td class="opt-table__col">
              <div class="opt-promotion__list">
                <article class="opt-promotion">
                  <img
                    src="/img/test/promotion.png"
                    alt="Изображение акции"
                    class="opt-promotion__img"
                  />
                </article>
                <article class="opt-promotion">
                  <img
                    src="/img/test/promotion.png"
                    alt="Изображение акции"
                    class="opt-promotion__img"
                  />
                </article>
                <article class="opt-promotion">
                  <img
                    src="/img/test/promotion.png"
                    alt="Изображение акции"
                    class="opt-promotion__img"
                  />
                </article>
              </div>
            </td>
            <td class="opt-table__col">50</td>
            <td class="opt-table__col">13 292 ₽</td>
            <td class="opt-table__col">10 %</td>
            <td class="opt-table__col">664 600 ₽ / 731 060 ₽</td>
          </tr> -->
          <tr class="opt-table__row opt-table__row--total">
            <td class="opt-table__head-col" colspan="6">
              <div class="opt-table__total-row-container">
                <div class="opt-table__head-col">
                  <span class="opt-table__name">Вес заказов (кг)</span>
                  <span class="opt-table__value">---</span>
                </div>
                <div class="opt-table__head-col">
                  <span class="opt-table__name">Объем заказов (м3)</span>
                  <span class="opt-table__value">----</span>
                </div>
                <div class="opt-table__head-col">
                  <span class="opt-table__name">Сумма (₽)</span>
                  <span class="opt-table__value">-----</span>
                </div>
                <div class="opt-table__head-col">
                  <button class="dart-btn dart-btn-secondary opt-order__button">
                  Скачать заказ
                </button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
// import customModal from '@/components/popup/CustomModal'
import TreeSelect from 'primevue/treeselect'
import DropdownButton from './opt/OptOrder/DropdownButton.vue'

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
      },
      dateOptions: {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
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
      id: router.currentRoute._value.params.id,
      order_id: router.currentRoute._value.params.order_id
    })
  },
  components: {
    // customModal
    TreeSelect,
    DropdownButton
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

.opt-order {
  margin: 10px 28px 116px 12px;

  &__back {
    color: #ADADAD;
    font-size: 14px;
  }

  &__title,
  &__date {
    width: max-content;
    margin: 0;
  }

  &__title {
    font-size: 24px;
  }

  &__date {
    font-size: 14px;
  }

  &__select {
    align-items: center;
    margin-top: 4px;
    width: 250px;
    height: 48px;
  }

  &__button {
    background-color: #fff;

    margin-block: 4px;
    padding-inline: 55px;
    width: max-content;

    transition-duration: 0.3s;

    &:hover {
      background-color: #282828;

      .opt-order__button-arrow::before {
        color: #fff;
      }
    }
  }

  @media (width <= 480px) {
    &__select,
    &__button {
      width: 100%;
    }
  }

  &__top,
  .opt-order-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;

    margin-top: 16px;

    &__info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      // gap: 8px;
    }

    &__left,
    &__right {
      display: flex;
      flex-grow: 1;
      flex-basis: 0;
    }

    &__left {
      gap: 24px;
    }

    &__right {
      gap: 10px;
      justify-content: flex-end;
    }

    @media (width <= 1280px) {
      &__right {
        justify-content: flex-start;
      }
    }

    @media (width <= 480px) {
      &__left,
      &__right {
        flex-wrap: wrap;
      }
    }
  }

  &__details,
  .opt-order-details {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    margin-top: 16px;

    &__card,
    .detail-card {
      display: flex;
      flex-direction: column;
      gap: 24px;

      flex-grow: 1;
      flex-basis: 0;

      &__title,
      &__name,
      &__value,
      &__value-list {
        font-size: 14px;
        line-height: 1;
        padding: 0;
        margin: 0;
      }

      &__title {
        font-weight: 500;
      }

      &__content {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      &__row {
        display: flex;
        justify-content: space-between;
        gap: 20px;
      }

      &__name {
        color: #5e5e5e;
        width: 40%;
      }

      &__value {
        width: 60%;
        text-align: right;
      }

      &__value-list {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
      }

      &__value-list-item {
        width: fit-content;
        padding: 0;
        padding-left: 6px;

        &::marker {
          content: "—";
        }
      }
    }
  }

  &__delivery,
  .opt-order-delivery {
    margin-top: 12px;
  }

  &__products,
  .opt-order-products {
    margin-top: 12px;
  }
}

.opt-container {
  border: 1px solid #e2e2e2;
  border-radius: 5px;
  padding: 24px;
}

.opt-table {
  width: 100%;
  table-layout: fixed;
  font-size: 14px;

  &--products {
    .opt-table__head-col,
    .opt-table__col {
      &:last-child {
        text-align: right;
      }
    }
  }

  .opt-order__button {
    margin-block: 0;
  }

  &__head {
    padding-bottom: 16px;
  }

  &__head &__head-row &__head-col {
    line-height: 1;
  }

  &__col,
  &__head-col {
    line-height: 1.15;
  }

  &__head-col {
    font-weight: 500;
    padding-bottom: 16px;
    width: max-content;

    &:not(:last-child) {
      padding-right: 16px;
    }
  }

  &__body {
  }

  &__row {
    &:not(.opt-table__head-row) {
      border-top: 1px solid #e2e2e2;
    }

    &:last-child:not(.opt-table__head-row) :is(.opt-table__col, .opt-table__head-col) {
      padding-top: 16px;
      padding-bottom: 0;
    }
  }

  &__col {
    padding-block: 16px;

    &:not(:last-child) {
      padding-right: 16px;
    }
  }

  &__name {
    margin-right: 16px;
  }

  &__value {
  }

  .opt-table__total-row-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .opt-table__head-col {
      padding: 0 !important;
    }
  }
}

.opt-product-info {
  display: flex;
  gap: 8px;

  &__img {
    width: 40px;
    height: 40px !important;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  &__title {
    font-weight: 400;
    padding: 0;
    margin: 0;
    font-size: 14px;
    line-height: 18px;
    max-width: 430px;
  }

  &__article {
    color: #acabab;
    margin: 0;
  }
}

.opt-promotion {
  border: 1px solid #e8e8e8;
  border-radius: 50%;
  width: 36px;
  aspect-ratio: 1;

  &:not(:first-child) {
    margin-left: -5px;
  }

  &__list {
    display: flex;
    align-items: center;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

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
