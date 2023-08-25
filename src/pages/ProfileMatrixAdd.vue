<template>
  <form @submit.prevent="formSubmit">
    <div class="profile-content__title">
        <span class="title">Добавление ключевой матрицы</span>
        <div class="buttons_container">
          <RouterLink :to="{ name: 'org_matrix', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary">Отменить</RouterLink>
          <button type="submit" class="dart-btn dart-btn-primary" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Добавить</button>
        </div>
    </div>
    <div>
      <div class="dart-form-group">
        <label for="name">Название ключевой матрицы</label>
        <input v-model="form.name" type="text" name="name" placeholder="Укажите название ключевой матрицы" class="dart-form-control">
      </div>
      <div class="dart-form-group">
        <label for="name">Целевое значение представленности ключевой матрицы в %</label>
        <input v-model="form.percent" type="text" name="percent" placeholder="Введите целевое значение" class="dart-form-control">
      </div>
      <div class="dart-form-group">
        <label for="name">Период действия</label>
        <Calendar v-model="form.dates" selectionMode="range" placeholder="Выберите диапазон дат" :manualInput="false" showIcon/>
      </div>
      <div class="dart-form-group picker-wrap">
        <label for="name">Добавление товаров</label>
        <PickList v-model="available_products.products" :selection="form.products" listStyle="height:342px" dataKey='id' :showSourceControls="false" :showTargetControls="false"
        @update:selection="saveData(data)">
          <template #sourceheader>
            <div class="source_list">
              <span>Доступные</span>
              <div class="filter">
                <div class="form_input_group input_pl input-parent required">
                  <input
                  type="text"
                  id="filter_name"
                  placeholder="Артикул, наименование"
                  name="filter"
                  class="dart-form-control"
                  v-model="filter"
                  @input="setFilter"
                  />
                  <label for="product_filter_name" class="s-complex-input__label">Артикул, наименование</label>
                  <div class="form_input_group__icon">
                      <i class="d_icon d_icon-search"></i>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <template #targetheader> Выбранные </template>
          <template #item="slotProps">
              <div class="flex flex-wrap p-2 align-items-center gap-3">
                  <img class="w-4rem flex-shrink-0 border-round" :src="'https://mst.tools' + slotProps.item.image" :alt="slotProps.pagetitle" />
                  <div class="flex-1 flex flex-column gap-2">
                      <span class="font-bold">{{ slotProps.item.name }}</span>
                      <span class="article">{{ slotProps.item.article }}</span>
                  </div>
              </div>
          </template>
        </PickList>
      </div>
      <div class="dart-form-group picker-wrap">
        <label for="name">Настройка номенклатуры</label>
        <div class="product-settings" v-for="(item, index) in selected" :key="index">
          <div class="item">
            <div class="dart-row dart-align-items-center">
              <div class="d-col-md-4">
                <div class="flex flex-wrap p-2 align-items-center gap-3">
                  <img class="w-4rem flex-shrink-0 border-round" :src="'https://mst.tools' + item.image" :alt="item.pagetitle" />
                  <div class="flex-1 flex flex-column gap-2">
                      <span class="font-bold">{{ item.name }}</span>
                      <span class="article">{{ item.article }}</span>
                  </div>
                </div>
              </div>
              <div class="d-col-md-4">
                <span class="p-float-label">
                  <InputNumber
                    v-model="selected[index].count"
                    inputId="horizontal-buttons"
                    :step="1"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  />
                  <label for="number-input">Кол-во товара</label>
                </span>
              </div>
              <div class="d-col-md-4">
                <span class="p-float-label">
                  <InputNumber
                    v-model="selected[index].days"
                    inputId="horizontal-buttons"
                    :step="1"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  />
                  <label for="number-input">Разрешенное кол-во дней</label>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Calendar from 'primevue/calendar'
import PickList from 'primevue/picklist'
import InputNumber from 'primevue/inputnumber'

export default {
  name: 'ProfileMatrixAdd',
  props: { },
  data () {
    return {
      loading: false,
      filter: '',
      selected: [],
      form: {
      }
    }
  },
  methods: {
    ...mapActions([
      'get_available_products_from_api',
      'set_matrix_to_api'
    ]),
    setFilter () {
      const data = { filter: this.filter, selected: this.selected }
      this.get_available_products_from_api(data)
    },
    saveData () {
      this.selected = this.available_products.products[1]
    },
    formSubmit (event) {
      this.loading = true
      this.$load(async () => {
        await this.set_matrix_to_api({
          action: 'set',
          id: router.currentRoute._value.params.id,
          name: this.form.name,
          percent: this.form.percent,
          dates: this.form.dates,
          products: this.selected
        })
          .then((result) => {
            // this.loading = false
            router.push({ name: 'org_matrix', params: { id: router.currentRoute._value.params.id } })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    }
  },
  mounted () {
    this.get_available_products_from_api({ filter: '', selected: [] })
  },
  components: { Calendar, PickList, InputNumber },
  computed: {
    ...mapGetters([
      'available_products'
    ])
  }
}
</script>

<style lang="scss">
  .product-settings{
    margin: 0;
    .item{
      margin-bottom: 30px;
      .p-inputnumber{
        width: 100%;
      }
      input{
        width: 100%;
      }
    }
  }
  .source_list{
    position: relative;
    z-index: 3;
    .filter{
      position: absolute;
      bottom: -95px;
      left: 0;
      right: 15px;
    }
  }
  .p-picklist .p-picklist-list.p-picklist-source{
    padding-top: 75px !important;
  }
  .dart-form-group{
    max-width: 755px;
    &.picker-wrap{
      max-width: 100%;
    }
  }
  .profile-content__title{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .buttons_container{
    display: flex;
    align-items: center;
    .dart-btn + .dart-btn {
        margin-left: 5px;
    }
  }
</style>
