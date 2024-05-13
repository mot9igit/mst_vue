<template>
  <form @submit.prevent="formSubmit">
    <div class="profile-content__title">
        <span class="maintitle">Настройка программы</span>
        <div class="buttons_container">
          <RouterLink :to="{ name: 'org_matrix', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary btn-padding">Отменить</RouterLink>
          <button type="submit" class="dart-btn dart-btn-primary btn-padding" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Добавить</button>
        </div>
    </div>
    <div>
      <div class="dart-form-group mb-4">
        <span class="ktitle">Наименование программы</span>
        <label for="name">Введите наименование, которое будет отражать смысл вашей программы.</label>
        <input v-model="form.name" type="text" name="name" placeholder="Укажите название программы" class="dart-form-control">
      </div>

      <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Баннер</span>
            <span>Чтобы обложка выглядела качественно на всех устройствах, советуем загрузить изображение размером не менее 1920х1080 пикс. Размер файла - не более ?? МБ. Форматы файла - ???.</span>
          </div>
          <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div>
        </div>
        <div class="upload-banner__image">
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Иконка</span>
            <span>Вы можете загрузить свое изображение или выбрать изображение из банка иконок</span>
          </div>
          <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div>
        </div>
        <div class="upload-icon__image">
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Описание</span>
        <input v-model="form.percent" type="text" name="description" placeholder="Укажите описание программы" class="dart-form-control">
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Вознаграждение</span>
        <input v-model="form.percent" type="text" name="description" placeholder="Укажите вознаграждение" class="dart-form-control">
        <Dropdown v-model="selectedCity" :options="this.award" optionLabel="name" placeholder="Выберите тип цен" class="mt-2 w-full md:w-14rem" />
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Совместимость скидок</span>
        <div class="flex align-items-center mt-3">
          <Checkbox v-model="filtersdata" name="compatibility" value="1"/>
          <label for="compatibility" class="ml-2">Совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <Checkbox v-model="filtersdata" name="compatibility" value="2"/>
          <label for="compatibility" class="ml-2">Не совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <Checkbox v-model="filtersdata" name="compatibility" value="3"/>
          <label for="compatibility" class="ml-2">Применяется большая скидка</label>
        </div>
        <div class="flex align-items-center mt-3">
          <Checkbox v-model="filtersdata" name="compatibility" value="4"/>
          <label for="compatibility" class="ml-2">Складывается с выбранными акциями</label>
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Совместимость отсрочек</span>
        <div class="flex align-items-center mt-3">
          <Checkbox v-model="filtersdata" name="compatibility" value="1"/>
          <label for="compatibility" class="ml-2">Совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <Checkbox v-model="filtersdata" name="compatibility" value="2"/>
          <label for="compatibility" class="ml-2">Не совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <Checkbox v-model="filtersdata" name="compatibility" value="3"/>
          <label for="compatibility" class="ml-2">Применяется большая отсрочка</label>
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Даты проведения</span>
        <Calendar v-model="form.dates" selectionMode="range" placeholder="Выберите даты" :manualInput="false" showIcon/>
      </div>

      <div class="dart-form-group picker-wrap">
        <label for="name">Добавление товаров</label>

        <div class="PickList">
          <div class="PickList__product">
            <b class="PickList__title">Доступные товары</b>
            <div class="PickList__filters">
              <div class="form_input_group input_pl input-parent required">
                <input
                type="text"
                id="filter_name"
                placeholder="Введите артикул или название"
                class="dart-form-control"
                v-model="filter.name"
                @input="setFilter('filter')"
                />
                <label for="product_filter_name" class="s-complex-input__label">Введите артикул или название</label>
                <div class="form_input_group__icon">
                    <i class="d_icon d_icon-search"></i>
                </div>
              </div>
              <div class="dart-form-group">
                <TreeSelect v-model="this.filter.category" :options="this.get_catalog" selectionMode="checkbox" placeholder="Выберите категорию" class="w-full" @change="setFilter"/>
              </div>
            </div>
            <div class="PickList__products">
              <div class="PickList__el" v-for="item in this.products" :key="item.id">
                <img :src="'https://mst.tools' + item.image" alt="">
                <div class="PickList__product-info">
                  <div class="PickList__name">{{item.name}}</div>
                  <div class="PickList__article">{{item.article}}</div>
                  <div class="PickList__price">{{Number(item.price).toFixed(0)}} ₽</div>
                </div>
                <div @click="select(item.id)" class="PickList__select"><i class="pi pi-angle-right"></i></div>
              </div>
            </div>
          </div>

          <div class="PickList__selected">
            <div class="PickList__title mb-4">
              <b>Добавленные товары</b>
              <!-- <div class="PickList__title-left">
                <b>Скидка в %</b>
                <b>Скидка в ₽</b>
                <b>Итоговая цена в ₽</b>
              </div> -->
            </div>
            <div class="PickList__products">
              <div class="PickList__el" v-for="(item) in this.selected" :key="item.id">
                <img :src="'https://mst.tools' + item.image" alt="">
                  <div class="PickList__info">
                  <div class="PickList__product-info off">
                    <div class="PickList__name">{{item.name}}</div>
                    <div class="PickList__article">{{item.article}}</div>
                    <div class="PickList__price">{{Number(item.price).toFixed(0)}} ₽</div>
                  </div>
                </div>
                <div @click="deleteSelect(item.id)" class="PickList__select"><i class="pi pi-times"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="selectedProducts">
        <span class="title">Таблица добавленных товаров</span>
        <div class="selectedProductsTable">
          <v-table
            :total="10"
            :items_data="this.selected"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
            :page="this.page"
            :table_data="this.table_data"
            :filters="this.filters"
            @filter="filter"
            @sort="filter"
            @paginate="paginate"
          >
          </v-table>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Calendar from 'primevue/calendar'
import TreeSelect from 'primevue/treeselect'
import vTable from '../components/table/v-table'
import Dropdown from 'primevue/dropdown'
import Checkbox from 'primevue/checkbox'

export default {
  name: 'ProfileMatrixAdd',
  props: { },
  data () {
    return {
      pagination_items_per_page: 25,
      pagination_offset: 0,
      page: 1,
      loading: false,
      filter: {
        name: '',
        category: {}
      },
      selected: [],
      products: [],
      form: {
      },
      get_catalog: [],
      table_data: {
        checkbox: {
          type: 'checkbox'
        },
        image: {
          label: 'Фото',
          type: 'image'
        },
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_matrix_edit',
          link_params: {
            id: this.$route.params.id,
            matrix_id: 'id'
          }
        },
        price: {
          label: 'РРЦ (₽)',
          type: 'text'
        },
        article: {
          label: 'Скидка по формуле',
          type: 'text'
        }
      },
      award: [
        { name: 'New York' },
        { name: 'Rome' },
        { name: 'London' },
        { name: 'Istanbul' },
        { name: 'Paris' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'get_available_products_from_api',
      'set_matrix_to_api',
      'get_catalog_from_api'
    ]),
    select (id) {
      const product = this.products.find(r => r.id === id)
      this.selected.push(product)
      this.products = this.products.filter((r) => r.id !== id)
      const data = { filter: this.filter, selected: this.selected }
      this.get_available_products_from_api(data)
    },
    // setPrices (index, name, value) {
    //   switch (name) {
    //     case 'discount_proccent':
    //       this.selected[index].discount_money = (Number(this.selected[index].price) / 100) * value
    //       this.selected[index].final_price = Number(this.selected[index].price) - this.selected[index].discount_money
    //       break
    //     case 'discount_money':
    //       break
    //     case 'final_price':
    //       break
    //   }
    // },
    deleteSelect (id) {
      const product = this.selected.find(r => r.id === id)
      this.products.push(product)
      this.selected = this.selected.filter((r) => r.id !== id)
      const data = { filter: this.filter, selected: this.selected }
      this.get_available_products_from_api(data)
    },
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
    this.get_available_products_from_api({ filter: '', selected: [] }).then(
      this.products = this.available_products.products
    )
    this.get_catalog_from_api().then(
      this.get_catalog = this.getcatalog
    )
  },
  components: { Calendar, TreeSelect, vTable, Dropdown, Checkbox },
  computed: {
    ...mapGetters([
      'available_products',
      'getcatalog'
    ])
  },
  watch: {
    getcatalog: function (newVal, oldVal) {
      this.get_catalog = newVal
    },
    available_products: function (newVal, oldVal) {
      this.products = newVal.products
      this.seleselected = newVal.selected
    }
  }
}
</script>

<style lang="scss">

  .btn-padding{
    padding-left: 55px;
    padding-right: 55px;
  }

  .maintitle{
    font-size: 24px;
    font-weight: 400;
  }

  .ktitle{
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.3;
    color: #282828;
    margin-bottom: 8px;
  }

  .upload-icon__image{
    background: #D9D9D9;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 16px;
  }

  .upload-banner{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &__text{
      max-width: 450px;

      span{
        color: #ADADAD;
        font-size: 14px;
      }

      span.ktitle{
        display: block;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 1.3;
        color: #282828;
        margin-bottom: 8px;
      }
    }

    &__image{
      width: 287px;
      height: 160px;
      background: #D9D9D9;
      margin-top: 16px;
    }
  }

  .selectedProducts{
    .title{
      display: block;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 1.3;
      color: #282828;
      margin-top: 40px;
    }
  }
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

  .PickList{
    width: 100%;
    display: flex;
    gap: 40px;

    &__title{
      width: 100%;
      display: flex;
      padding: 16px 24px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 14px;
      font-weight: 500;
      line-height: 15px;
      justify-content: space-between;
      align-items: center;
    }

    &__product{
      width: 40%;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    &__selected{
      width: 40%;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    &__products{
      height: 550px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 0 24px 24px 24px;
    }

    &__el{
      display: flex;
      img{
        width: 85px;
        height: 50px !important;
        object-fit: contain;
      }
    }

    &__product-info{
      width: calc(100% - 85px);

      &.off{
        width: auto;
      }
    }

    &__title-left{
      display: flex;
      align-items: center;
      margin-right: 54px;
      gap: 16px;
      b{
        width: 90px;
        text-align: center;
      }
    }

    &__name{
      width: 80%;
      font-size: 14px;
      line-height: 16px;
      color: #282828;
      margin-bottom: 8px;
    }

    &__article{
      color: #ADADAD;
      font-size: 14px;
      line-height: 16px;
    }

    &__info{
      width: calc(100% - calc(85px + 54px));
      margin-right: 10px;
      display: flex;
      align-items: center;
      align-items: flex-start;
    }

    &__values{
      display: flex;
      gap: 16px;
      .p-inputnumber{
        width: 90px;
      }
    }

    &__select{
      border-radius: 5px;
      width: 44px;
      height: 44px;
      background: #282828;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      cursor: pointer;
    }

    &__price{
      font-size: 14px;
      font-weight: 500;
      color: #282828;
      line-height: 16px;
      margin-top: 8px;
    }

    &__filters{
      padding: 16px 24px;
      display: flex;
      align-items: center;
      gap: 8px;

      .dart-form-group{
        width: 50%;
      }

      .form_input_group {
        width: 50%;
      }

      .form_input_group__icon{
        padding: 0;
        top: 55%;
        right: 10px;
      }
    }
  }
</style>
