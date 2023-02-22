<template>
  <div class="profile-content b-wrap">
    <div class="profile-content__title">
      <span class="title">{{ product.name }} (арт. {{ product.article }})</span>
    </div>
    <div class="main-widgets">
      <div class="dart-row">
        <!-- item -->
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_number">
            <span class="title">Остаток</span>
            <span class="description">На сегодня</span>
            <span class="value">{{ product.remains }}</span>
          </div>
        </div>
        <!-- / item -->
        <!-- item -->
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_number">
            <span class="title">Зарезервировано</span>
            <span class="description">На сегодня</span>
            <span class="value">{{ product.reserved }}</span>
          </div>
        </div>
        <!-- / item -->
        <!-- item -->
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_number">
            <span class="title">Доступно</span>
            <span class="description">для продажи</span>
            <span class="value">{{ product.available }}</span>
          </div>
        </div>
        <!-- / item -->
        <!-- item -->
        <div class="d-col-lg-3">
          <div class="panel_widget panel_widget_number">
            <span class="title">Продаж</span>
            <span class="description">за все время</span>
            <span class="value">{{ product.sales }}</span>
          </div>
        </div>
        <!-- / item -->
      </div>
    </div>
    <div class="product_form">
      <div class="dart-row dart-align-items-center">
        <div class="d-col-lg-6" v-if="product.product_id > 0">
          <div class="linked_product">
            <div class="image">
              <img :src="'http://mst.tools/' + product.image" alt="">
            </div>
            <div class="text">
              <span class="title">{{ product.pagetitle }}</span>
              <span class="desc"><b class="lb">Артикул:</b> {{ product.product_article }}</span>
              <span class="desc"><b class="lb">Артикул производителя:</b> {{ product.vendor_article }}</span>
            </div>
          </div>
        </div>
        <div class="d-col-lg-6">
          <div class="form_input_group">
            <label>Привяжите товар</label>
            <AutoComplete
              v-model="form.selectedProduct"
              :suggestions="form.filteredProduct"
              optionLabel="label"
              :dropdown="true"
              placeholder='Начните вводить наименование товара'
              @complete="searchProduct($event)"
              @change="setProduct($event)"
            >
                <template #item="slotProps">
                <img :alt="slotProps.item.label" :src="'http://mst.tools/' + slotProps.item.image" />
                <div>{{ slotProps.item.label }}</div>
              </template>
            </AutoComplete>
          </div>
        </div>
      </div>
      <div class="product_remains dart-mt-2">
        <div class="profile-content__title">
          <span class="title">История остатков</span>
        </div>
        <div class="dart-row">
          <div class="d-col-lg-6">
            <Calendar
            is-expanded
            title-position="left"
            :attributes="product.dates"
            :masks="{ weekdays: 'WW' }"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import router from '@/router'
import AutoComplete from 'primevue/autocomplete'
import { Calendar } from 'v-calendar'
import 'v-calendar/dist/style.css'

export default {
  name: 'ProfileProduct',
  props: { },
  data () {
    return {
      form: {
        selectedProduct: null,
        filteredProduct: null,
        filter: ''
      }
    }
  },
  methods: {
    ...mapActions([
      'get_product_from_api'
    ]),
    ...mapMutations([
      'SET_PRODUCT_LINK'
    ]),
    searchProduct (event) {
      this.$load(async () => {
        const data = await this.$api.getProducts.get({
          filter: event.query
        })
        // console.log(data.data.data)
        this.form.filteredProduct = data.data.data.products
        // console.log(this.form.filteredProduct)
      })
    },
    setProduct (event) {
      const target = Object.assign({}, event.value)
      console.log(target)
      this.$load(async () => {
        const data = await this.$api.getProducts.set({
          action: 'set',
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type,
          remain_id: this.product.id,
          value: target.value
        })
        this.$store.commit('SET_PRODUCT_LINK', data.data.data)
        // console.log(this.form.filteredProduct)
      })
    }
  },
  mounted () {
    this.get_product_from_api()
    this.$load(async () => {
      const data = await this.$api.getProducts.get()
      console.log(data)
      this.form.filteredProduct = data.data.data.products
    })
  },
  components: { AutoComplete, Calendar },
  computed: {
    ...mapGetters([
      'product'
    ])
  }
}
</script>

<style lang="scss">
  .p-autocomplete-panel .p-autocomplete-items .p-autocomplete-item {
    display: flex;
    align-items: center;
    img {
      max-height: 40px;
      max-width: 40px;
      & + div {
        font-size: 14px;
        padding-left: 5px;
        max-width: 200px;
        white-space: normal;
      }
    }
  }
  .profile-content__title{
    .sub_title{
      display: block;
      width: 100%;
    }
  }
  .p-autocomplete{
    width: 100%;
  }
  .vc-title,
  .vc-weekday {
    text-transform: capitalize;
  }
  .linked_product{
    position: relative;
    .image{
      position: absolute;
      left: 0;
      top: 50%;
      transform: translate(0, -50%);
      width: 100px;
      text-align: center;
      img{
        max-width: 100px;
        max-height: 100px;
      }
    }
    .text{
      padding-left: 115px;
      span{
        display: block;
        &.title{
          font-style: normal;
          font-weight: 500;
          font-size: 16px;
          line-height: 1.3;
          color: #282828;
          margin-bottom: 10px;
        }
        &.desc{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.3;
          letter-spacing: 0.25px;
          color: #282828;
          .lb{
            font-weight: 500;
          }
        }
      }
    }
  }
  .panel_widget {
    background: #FFFFFF;
    padding: 40px 40px;
    border: 1px solid rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    margin-bottom: 20px;
    &_number {
      min-height: 200px;
      position: relative;
      span{
        display: block;
        &.title{
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 1.3;
          color: #282828;
        }
        &.desc{
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 1.3;
          letter-spacing: 0.25px;
          color: #282828;
        }
        &.value{
          font-style: normal;
          font-weight: 400;
          font-size: 34px;
          line-height: 1.3;
          letter-spacing: 0.0025em;
          color: #282828;
          position: absolute;
          bottom: 40px;
          right: 40px;
        }
      }
    }
  }
</style>
