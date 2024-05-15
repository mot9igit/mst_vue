<template>
  <Toast />
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
            <span class="ktitle">Вертикальный баннер</span>
            <span>Чтобы обложка выглядела качественно на всех устройствах, советуем загрузить изображение размером не менее 1108х332 пикс. Размер файла - не более ?? МБ. Форматы файла - ???.</span>
          </div>
          <!-- <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div> -->
          <FileUpload mode="basic" name="banner[]" :url="'/rest/file_upload.php?banner=max'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
        </div>
        <div class="upload-banner__image upload-banner__banner">
          <img :src="files?.max?.original_href" v-if="files?.max?.original_href">
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Мобильный баннер</span>
            <span>Чтобы обложка выглядела качественно на всех устройствах, советуем загрузить изображение размером не менее 500х500 пикс. Размер файла - не более ?? МБ. Форматы файла - ???.</span>
          </div>
          <!-- <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div> -->
          <FileUpload mode="basic" name="banner_small[]" :url="'/rest/file_upload.php?banner=min'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
        </div>
        <div class="upload-banner__image">
          <img :src="files?.min?.original_href" v-if="files?.min?.original_href">
        </div>
      </div>

      <!-- <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Иконка</span>
            <span>Вы можете загрузить свое изображение или выбрать изображение из банка иконок</span>
          </div>
          <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div>
        </div>
        <div class="upload-icon__image">
        </div>
      </div> -->

      <div class="dart-form-group mb-4">
        <span class="ktitle">Описание</span>
        <input v-model="form.description" type="text" name="description" placeholder="Укажите описание программы" class="dart-form-control">
      </div>

      <!-- <div class="dart-form-group mb-4">
        <span class="ktitle">Вознаграждение</span>
        <input v-model="form.percent" type="text" name="description" placeholder="Укажите вознаграждение" class="dart-form-control">
        <Dropdown v-model="selectedCity" :options="this.award" optionLabel="name" placeholder="Выберите тип цен" class="mt-2 w-full md:w-14rem" />
      </div> -->

      <div class="dart-form-group mb-4">
        <span class="ktitle">Совместимость скидок</span>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-1" name="compatibilityDiscount" value="1"/>
          <label for="compatibilityDiscount-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-2" name="compatibilityDiscount" value="2"/>
          <label for="compatibilityDiscount-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-3" name="compatibilityDiscount" value="3"/>
          <label for="compatibilityDiscount-3" class="ml-2 radioLabel">Применяется большая скидка</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-4" name="compatibilityDiscount" value="4"/>
          <label for="compatibilityDiscount-4" class="ml-2 radioLabel">Складывается с выбранными акциями</label>
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Совместимость отсрочек</span>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityPost" inputId="compatibilityPost-1" name="compatibilityPost" value="1"/>
          <label for="compatibilityPost-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityPost" inputId="compatibilityPost-2" name="compatibilityPost" value="2"/>
          <label for="compatibilityPost-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityPost" inputId="compatibilityPost-3" name="compatibilityPost" value="3"/>
          <label for="compatibilityPost-3" class="ml-2 radioLabel">Применяется большая отсрочка</label>
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Даты проведения</span>
        <Calendar v-model="form.dates" selectionMode="range" placeholder="Выберите даты" :manualInput="false" showIcon/>
      </div>

      <div class="dart-form-group picker-wrap">
        <span class="ktitle">Добавление товаров</span>

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
              <paginate
                :page-count="pagesCount"
                :click-handler="pagClickCallback"
                :prev-text="'Пред'"
                :next-text="'След'"
                :container-class="'pagination justify-content-center'"
                :initialPage="this.page"
                :forcePage="this.page"
              >
              </paginate>
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
      <div class="selectedProducts mb-5">
        <span class="title">Таблица добавленных товаров</span>
        <div class="selectedProductsTable" v-if="this.total_selected > 0">
          <v-table
            :total="this.total_selected"
            :items_data="this.selected"
            :pagination_items_per_page="this.pagination_items_per_page_selected"
            :pagination_offset="this.pagination_offset_selected"
            :page="this.page_selected"
            :table_data="this.table_data"
            :filters="this.filters"
            :editMode="this.editMode"
            @filter="filter"
            @sort="filter"
            @paginate="paginate"
            @editNumber="editNumber"
          >
          </v-table>
        </div>
      </div>

      <div class="dart-form-group picker-wrap mt-4">
        <span class="ktitle">Участники</span>
        <span class="kgraytext mb-3">Выберите компании, которым будет доступна ваша программа</span>
        <!-- <div class="kenost-checkbox-container mb-3">
          <div class="flex align-items-center">
              <Checkbox v-model="availability" inputId="availability1" name="pizza" value="1" />
              <label for="availability1" class="ml-2"> Доступен для розницы </label>
          </div>
          <div class="flex align-items-center">
              <Checkbox v-model="availability" inputId="availability2" name="pizza" value="2" />
              <label for="availability2" class="ml-2"> Доступен для опта </label>
          </div>
        </div> -->

        <div class="PickList">
          <div class="PickList__product">
            <b class="PickList__title">Добавление отдельных компаний</b>
            <div class="PickList__filters">
              <div class="form_input_group input_pl input-parent required">
                <input
                type="text"
                id="filter_name"
                placeholder="Введите артикул или название"
                class="dart-form-control"
                v-model="filter_organizations.name"
                @input="setFilterOrganization('filter')"
                />
                <label for="product_filter_name" class="s-complex-input__label">Введите название компании</label>
                <div class="form_input_group__icon">
                    <i class="d_icon d_icon-search"></i>
                </div>
              </div>
            </div>
            <div class="PickList__products">
              <div class="PickList__el center" v-for="item in this.all_organizations" :key="item.id">
                <img :src="item.image" alt="">
                <div class="PickList__product-info">
                  <div>{{item.name}}</div>
                </div>
                <div @click="selectOrganization(item.id)" class="PickList__select"><i class="pi pi-angle-right"></i></div>
              </div>
            </div>
          </div>

          <div class="PickList__selected">
            <div class="PickList__title mb-4">
              <b>Добавленные компании</b>
            </div>
            <div class="PickList__products">
              <div class="PickList__el center" v-for="(item) in this.all_organizations_selected" :key="item.id">
                <img :src="item.image" alt="">
                  <div class="PickList__info">
                  <div class="PickList__product-info off">
                    <div>{{item.name}}</div>
                  </div>
                </div>
                <div @click="deleteSelectOrganization(item.id)" class="PickList__select"><i class="pi pi-times"></i></div>
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
import TreeSelect from 'primevue/treeselect'
import vTable from '../../components/table/v-table'
// import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
// import Checkbox from 'primevue/checkbox'
import Paginate from 'vuejs-paginate-next'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'

export default {
  name: 'ProfileMatrixAdd',
  props: { },
  data () {
    return {
      pagination_items_per_page_selected: 25,
      pagination_offset_selected: 0,
      page: 1,
      page_selected: 1,
      total_selected: 0,
      loading: false,
      compatibilityDiscount: 0,
      compatibilityPost: 0,
      availability: [],
      files: {},
      filter: {
        name: '',
        category: {}
      },
      filter_organizations: {
        name: '',
        type: [1, 2]
      },
      selected: {},
      products: [],
      total_products: 1000,
      per_page: 25,
      all_organizations: [],
      all_organizations_selected: {},
      form: {
      },
      editMode: true,
      get_catalog: [],
      table_data: {
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
        article: {
          label: 'Артикул',
          type: 'text'
        },
        price: {
          label: 'РРЦ (₽)',
          type: 'text'
        },
        discountInterest: {
          label: 'Скидка в %',
          type: 'number'
        },
        discountInRubles: {
          label: 'Скидка в ₽',
          type: 'number'
        },
        finalPrice: {
          label: 'Цена со скидкой',
          type: 'number'
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
      'set_sales_to_api',
      'get_catalog_from_api',
      'get_all_organizations_from_api'
    ]),
    paginate (obj) {
      this.page_selected = obj.page
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    onUpload (data) {
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          // перечень загруженныйх файлов

          if (response.data.files[0].type_banner === 'max') {
            this.files.max = response.data.files[0]
          } else if (response.data.files[0].type_banner === 'min') {
            this.files.min = response.data.files[0]
          }
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    },
    editNumber (object) {
      this.selected[object.id][object.name] = object.value
      switch (object.name) {
        case 'discountInterest':
          this.selected[object.id].discountInRubles = this.selected[object.id].price / 100 * object.value
          this.selected[object.id].finalPrice = this.selected[object.id].price - this.selected[object.id].discountInRubles
          break
        case 'discountInRubles':
          this.selected[object.id].discountInterest = object.value / this.selected[object.id].price / 100
          this.selected[object.id].finalPrice = this.selected[object.id].price - this.selected[object.id].discountInRubles
          break
        case 'finalPrice':
          this.selected[object.id].discountInRubles = this.selected[object.id].price - object.value
          this.selected[object.id].discountInterest = this.selected[object.id].discountInRubles / this.selected[object.id].price / 100
          break
      }
    },
    select (id) {
      const product = this.products.find(r => r.id === id)
      product.discountInRubles = 0
      product.discountInterest = 0
      product.finalPrice = Number(product.price)

      this.selected[product.id] = product
      this.products = this.products.filter((r) => r.id !== id)
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
      this.total_selected++
    },
    deleteSelect (id) {
      this.products.push(this.selected[id])

      // eslint-disable-next-line camelcase
      const new_selected = {}

      for (let i = 0; i < Object.keys(this.selected).length; i++) {
        if (this.selected[Object.keys(this.selected)[i]].id !== id) {
          new_selected[Object.keys(this.selected)[i]] = this.selected[Object.keys(this.selected)[i]]
        }
      }

      // eslint-disable-next-line camelcase
      this.selected = new_selected

      // this.selected = this.selected.filter((r) => r.id !== id)
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
      this.total_selected--
    },
    pagClickCallback (pageNum) {
      this.page = pageNum
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    selectOrganization (id) {
      const organization = this.all_organizations.find(r => r.id === id)
      this.all_organizations_selected[organization.id] = organization
      this.all_organizations = this.all_organizations.filter((r) => r.id !== id)
    },
    deleteSelectOrganization (id) {
      this.all_organizations.push(this.all_organizations_selected[id])
      // eslint-disable-next-line camelcase
      const new_all_organizations_selected = {}

      for (let i = 0; i < Object.keys(this.all_organizations_selected).length; i++) {
        if (this.all_organizations_selected[Object.keys(this.all_organizations_selected)[i]].id !== id) {
          new_all_organizations_selected[Object.keys(this.all_organizations_selected)[i]] = this.all_organizations_selected[Object.keys(this.all_organizations_selected)[i]]
        }
      }

      // eslint-disable-next-line camelcase
      this.all_organizations_selected = new_all_organizations_selected
    },
    setFilter () {
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    setFilterOrganization () {
      const data = { filter: this.filter_organizations }
      this.get_all_organizations_from_api(data).then(
        this.all_organizations = this.allorganizations
      )
    },
    saveData () {
      this.selected = this.available_products.products[1]
    },
    formSubmit (event) {
      // this.loading = true
      this.$load(async () => {
        await this.set_sales_to_api({
          action: 'set',
          id: router.currentRoute._value.params.id,
          name: this.form.name,
          description: this.form.description,
          compatibilityDiscount: this.compatibilityDiscount,
          compatibilityPost: this.compatibilityPost,
          dates: this.form.dates,
          products: this.selected,
          organizations: this.all_organizations_selected,
          files: this.files
        })
          .then((result) => {
            // this.loading = false
            // router.push({ name: 'org_sales', params: { id: router.currentRoute._value.params.id } })
          })
          .catch((result) => {
            console.log(result)
          })
      })
    }
  },
  mounted () {
    this.get_available_products_from_api({ filter: '', selected: [], page: this.page }).then(
      this.products = this.available_products.products
    )
    this.get_catalog_from_api().then(
      this.get_catalog = this.getcatalog
    )
    const data = { filter: this.filter_organizations }
    this.get_all_organizations_from_api(data).then(
      this.all_organizations = this.allorganizations
    )
  },
  components: { Calendar, TreeSelect, vTable, RadioButton, Paginate, FileUpload, Toast },
  computed: {
    ...mapGetters([
      'available_products',
      'getcatalog',
      'allorganizations'
    ]),
    pagesCount () {
      let pages = Math.round(this.total_products / this.per_page)
      if (pages === 0) {
        pages = 1
      }
      return pages
    }
  },
  watch: {
    getcatalog: function (newVal, oldVal) {
      this.get_catalog = newVal
    },
    available_products: function (newVal, oldVal) {
      this.products = newVal.products
    },
    allorganizations: function (newVal, oldVal) {
      this.all_organizations = newVal
    }
  }
}
</script>

<style lang="scss">

  .kenost-checkbox-container{
    display: flex;
    gap: 16px;
  }

  .kgraytext{
    color: #ADADAD;
    font-size: 14px;
  }

  .radioLabel{
    margin-bottom: 0 !important;
    cursor: pointer;
  }

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
      width: 250px;
      height: 250px;
      background: #D9D9D9;
      margin-top: 16px;
      overflow: hidden;

      img{
        width: 100%;
        height: 100% !important;
        object-fit: cover;
      }
    }

    &__banner{
      width: 100%;
      height: 200px;
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

      &.center{
        align-items: center
      }

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
        width: 100%;
      }

      .form_input_group__icon{
        padding: 0;
        top: 55%;
        right: 10px;
      }
    }
  }
</style>
