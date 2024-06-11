<template>
    <Toast />
    <form @submit.prevent="formSubmit">
      <div class="profile-content__title">
          <span class="maintitle">Редактирование акции</span>
          <div class="buttons_container">
            <RouterLink :to="{ name: 'org_actions', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary btn-padding">Отменить</RouterLink>
            <button type="submit" class="dart-btn dart-btn-primary btn-padding" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Сохранить</button>
          </div>
      </div>
      <div>

        <div>
            <p class="kgraytext m-0">Статус: <span>{{this.status}}</span></p>
            <p class="kgraytext" v-if="this.moderator_comment != ''">Комментарий от модератора: {{ this.moderator_comment }}</p>
        </div>

        <div class="dart-form-group mt-2 mb-4">
          <span class="ktitle">Заголовок</span>
          <!-- <label for="name">Введите наименование, которое будет отражать смысл вашей акции</label> -->
          <input v-model="form.name" type="text" name="name" placeholder="Укажите название акции" class="dart-form-control" :class="{'kenost-error':this.validation.name.error}">
          <span v-if="this.validation.name.error" class="kenost-error-text">{{ this.validation.name.text }}</span>
        </div>

        <div class="dart-form-group mb-4">
          <div class="upload-banner">
            <div class="upload-banner__text">
              <span class="ktitle">Большой баннер</span>
              <span>Загрузить изображение нужно размером не менее 1108х332, соблюдая пропорции. Чтобы не потерялось качество, желательно загружать изображение в два раза больше указанного размера.</span>
            </div>
            <!-- <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div> -->
            <FileUpload class="kenost-upload-button" mode="basic" name="banner[]" :url="'/rest/file_upload.php?banner=max'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
          </div>
          <div class="upload-banner__image">
            <img :src="files?.max?.original_href" v-if="files?.max?.original_href">
          </div>
        </div>

        <div class="dart-form-group mb-4">
          <div class="upload-banner">
            <div class="upload-banner__text">
              <span class="ktitle">Малый баннер</span>
              <span>Загрузить изображение нужно размером не менее 324х161, соблюдая пропорции. Чтобы не потерялось качество, желательно загружать изображение в три раза больше указанного размера.</span>
            </div>
            <FileUpload class="kenost-upload-button" mode="basic" name="banner_small[]" :url="'/rest/file_upload.php?banner=min'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
          </div>
          <div class="upload-banner__image">
            <img :src="files?.min?.original_href" v-if="files?.min?.original_href">
          </div>
        </div>

        <div class="dart-form-group mb-4">
          <div class="upload-banner">
            <div class="upload-banner__text">
              <span class="ktitle">Квадратный баннер</span>
              <span>Загрузить изображение нужно размером не менее 459х459, соблюдая пропорции. Чтобы не потерялось качество, желательно загружать изображение в три раза больше указанного размера.</span>
            </div>
            <FileUpload class="kenost-upload-button" mode="basic" name="icon[]" :url="'/rest/file_upload.php?banner=icon'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
          </div>
          <div class="upload-banner__image">
            <img :src="files?.icon?.original_href" v-if="files?.icon?.original_href">
          </div>
        </div>

        <div class="dart-form-group mb-4">
          <span class="ktitle">Условия</span>
          <input v-model="form.conditions" type="text" name="conditions" placeholder="Укажите условия акции" class="dart-form-control" :class="{'kenost-error':this.validation.conditions.error}">
          <span v-if="this.validation.conditions.error" class="kenost-error-text">{{ this.validation.conditions.text }}</span>
        </div>

        <div class="dart-form-group mb-4">
            <div class="rules-container">
                <div class="rules-container__text">
                    <span class="ktitle">Правила акции</span>
                    <p class="kgraytext">Загрузите файл с подробными правилами акции</p>
                    <a target="_blank" :href="files?.file?.original_href" class="kenost-add-file" v-if="files?.file?.original_href">
                        <img src="../../../public/img/files/pdf.png" alt="">
                        <p>{{files?.file?.name? files?.file?.name : "Файл загружен!"}}</p>
                    </a>
                </div>
                <FileUpload class="kenost-upload-button" mode="basic" name="icon[]" :url="'/rest/file_upload.php?banner=file'" accept="application/pdf" :maxFileSize="20000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
            </div>
        </div>

        <div class="dart-form-group mb-4">
          <span class="ktitle">Сроки проведения</span>
          <Calendar v-model="form.dates" selectionMode="range" placeholder="Выберите даты" :manualInput="false" showIcon :class="{'kenost-error':this.validation.dates.error}"/>
          <span v-if="this.validation.dates.error" class="kenost-error-text">{{ this.validation.dates.text }}</span>
        </div>

        <div class="dart-form-group mb-4">
          <span class="ktitle">Регион</span>
          <div class="flex align-items-center mb-3">
              <Checkbox v-model="this.region_all" inputId="region_all" name="region_all" value="1" />
              <label for="region_all" class="ml-2"> Доступна для всех регионов </label>
          </div>
          <TreeSelect :class="{'kenost-error':this.validation.region.error}" v-if="this.region_all.length == 0" v-model="this.select_regions" :options="this.regions" selectionMode="checkbox" :placeholder="'Зависит от выбранного ценового предложения'" class="w-full"/>
          <span v-if="this.validation.region.error" class="kenost-error-text">{{ this.validation.region.text }}</span>
        </div>

        <div class="dart-form-group picker-wrap">
          <span class="ktitle">Добавление товаров</span>
          <span v-if="this.validation.selected.error" class="kenost-error-text">{{ this.validation.selected.text }}</span>
          <div class="PickList">
            <div class="PickList__product" :class="{'kenost-error':this.validation.selected.error}">
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
                <div class="PickList__title-left">
                  <b>Скидка в %</b>
                  <b>Скидка в ₽</b>
                  <b>Итоговая цена в ₽</b>
                </div>
              </div>
              <div class="PickList__products">
                <div class="PickList__el" v-for="(item, index) in this.selected" :key="item.id">
                  <img :src="'https://mst.tools' + item.image" alt="">
                    <div class="PickList__info">
                    <div class="PickList__product-info off">
                      <div class="PickList__name">{{item.name}}</div>
                      <div class="PickList__article">{{item.article}}</div>
                      <div class="PickList__price">{{Number(item.price).toFixed(0)}} ₽</div>
                    </div>
                    <div class="PickList__values">
                      <div class="PickList__valuer-inputs">
                        <InputNumber
                            v-model="this.selected[index].discountInterest"
                            inputId="horizontal-buttons"
                            :step="1"
                            min="0"
                            max="100"
                            suffix=" %"
                            @update:modelValue="setPrices(index, 'discountInterest', this.selected[index].discountInterest)"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        />
                        <InputNumber
                            v-model="selected[index].discountInRubles"
                            inputId="horizontal-buttons"
                            :step="1"
                            min="0"
                            :max="item.price"
                            mode="currency" currency="RUB"
                            @update:modelValue="setPrices(index, 'discountInRubles', this.selected[index].discountInRubles)"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        />
                        <InputNumber
                            v-model="selected[index].finalPrice"
                            inputId="horizontal-buttons"
                            :step="1"
                            :max="item.price"
                            mode="currency" currency="RUB"
                            min="0"
                            @update:modelValue="setPrices(index, 'finalPrice', this.selected[index].finalPrice)"
                            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                        />
                      </div>
                    </div>
                  </div>
                  <div @click="deleteSelect(item.id)" class="PickList__select"><i class="pi pi-times"></i></div>
                </div>
              </div>
              <!-- <div class="PickList__button">
                <div class="dart-btn dart-btn-secondary alert_change_btn">Задать скидку для всех</div>
              </div> -->
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
import Paginate from 'vuejs-paginate-next'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import InputNumber from 'primevue/inputnumber'
import Checkbox from 'primevue/checkbox'

export default {
  name: 'ProfileSalesAdd',
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
      regions: this.getregions,
      select_regions: {},
      validation: {
        name: {
          error: false,
          text: 'Пожалуйста, заполните наименование!'
        },
        conditions: {
          error: false,
          text: 'Пожалуйста, заполните условия!'
        },
        dates: {
          error: false,
          text: 'Пожалуйста, укажите даты проведения!'
        },
        selected: {
          error: false,
          text: 'Пожалуйста, добавьте хотя бы 1 товар!'
        },
        region: {
          error: false,
          text: 'Пожалуйста, укажите регион!'
        }
      },
      region_all: [],
      files: {
        max: {
          original_href: ''
        },
        min: {
          original_href: ''
        },
        icon: {
          original_href: ''
        },
        file: {
          original_href: ''
        }
      },
      filter: {
        name: '',
        category: {}
      },
      filter_organizations: {
        name: '',
        type: [1, 2]
      },
      selected: [],
      products: [],
      total_products: 0,
      per_page: 25,
      form: {
      },
      editMode: true,
      get_catalog: []
    }
  },
  methods: {
    ...mapActions([
      'get_available_products_from_api',
      'set_sales_to_api',
      'get_catalog_from_api',
      'get_regions_from_api',
      'get_sales_to_api'
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
          } else if (response.data.files[0].type_banner === 'icon') {
            this.files.icon = response.data.files[0]
          } else if (response.data.files[0].type_banner === 'file') {
            this.files.file = response.data.files[0]
          }
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    },
    setPrices (index, name, value) {
      switch (name) {
        case 'discountInterest':
          this.selected[index].discountInRubles = (Number(this.selected[index].price) / 100) * value
          this.selected[index].finalPrice = Number(this.selected[index].price) - this.selected[index].discountInRubles
          break
        case 'discountInRubles':
          this.selected[index].discountInterest = value / (Number(this.selected[index].price) / 100)
          this.selected[index].finalPrice = Number(this.selected[index].price) - this.selected[index].discountInRubles
          break
        case 'finalPrice':
          this.selected[index].discountInRubles = Number(this.selected[index].price) - value
          this.selected[index].discountInterest = this.selected[index].discountInRubles / (Number(this.selected[index].price) / 100)
          break
      }
    },
    select (id) {
      const product = this.products.find(r => r.id === id)
      product.discountInterest = 0
      product.discountInRubles = 0
      product.finalPrice = Number(product.price)
      console.log(product)
      this.selected.push(product)
      this.products = this.products.filter((r) => r.id !== id)
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
      this.total_selected++
    },
    deleteSelect (id) {
      const product = this.selected.find(r => r.id === id)
      this.products.push(product)
      this.selected = this.selected.filter((r) => r.id !== id)

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
    setFilter () {
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    saveData () {
      this.selected = this.available_products.products[1]
    },
    formSubmit (event) {
      let stop = false

      if (!this.form.name) {
        this.validation.name.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.name.error = false
      }

      if (!this.form.conditions) {
        this.validation.conditions.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.conditions.error = false
      }

      if (!this.form.dates) {
        this.validation.dates.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.dates.error = false
      }

      if (this.total_selected === 0) {
        this.validation.selected.error = true
        stop = true
      } else {
        this.validation.selected.error = false
      }

      if (this.region_all.length === 0 && Object.keys(this.select_regions).length === 0) {
        this.validation.region.error = true
        stop = true
      } else {
        this.validation.region.error = false
      }

      if (!stop) {
        this.$load(async () => {
          let reginsall = false
          if (this.region_all.length > 0) {
            // eslint-disable-next-line no-unused-vars
            reginsall = true
          }
          await this.set_sales_to_api({
            action: 'set',
            type: 'b2c',
            id: router.currentRoute._value.params.id,
            name: this.form.name,
            conditions: this.form.conditions,
            dates: [this.form.dates[0].toDateString(), this.form.dates[1].toDateString()],
            products: this.selected,
            files: this.files,
            regins: this.select_regions,
            region_all: reginsall,
            action_id: router.currentRoute._value.params.action_id
          })
            .then((result) => {
              this.loading = false
              router.push({ name: 'org_actions', params: { id: router.currentRoute._value.params.id } })
            })
            .catch((result) => {
              console.log(result)
            })
        })
        this.loading = true
      }
    }
  },
  mounted () {
    this.get_available_products_from_api({ filter: '', selected: [], page: this.page }).then(
      this.products = this.available_products.products
    )
    this.get_catalog_from_api().then(
      this.get_catalog = this.getcatalog
    )
    this.get_regions_from_api().then(
      this.regions = this.getregions
    )
    this.get_sales_to_api({ id: router.currentRoute._value.params.sales_id, actionid: router.currentRoute._value.params.action_id })
  },
  components: { Calendar, TreeSelect, Paginate, FileUpload, Toast, InputNumber, Checkbox },
  computed: {
    ...mapGetters([
      'available_products',
      'getcatalog',
      'getregions',
      'actions'
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
      this.total_products = newVal.total
    },
    getregions: function (newVal, oldVal) {
      this.regions = this.getregions
    },
    actions: function (newVal, oldVal) {
      this.form.name = newVal.name
      if (newVal.image) {
        this.files.max.original_href = this.site_url_prefix + newVal.image
      }
      if (newVal.image_inner) {
        this.files.min.original_href = this.site_url_prefix + newVal.image_inner
      }
      if (newVal.icon) {
        this.files.icon.original_href = this.site_url_prefix + newVal.icon
      }
      if (newVal.rules_file) {
        this.files.file.original_href = this.site_url_prefix + newVal.rules_file
      }
      const dateto = new Date(newVal.date_to)
      const datefrom = new Date(newVal.date_from)
      this.form.dates = [datefrom, dateto]
      this.selected = newVal.products
      this.total_selected = newVal.total_products
      this.form.conditions = newVal.conditions
      this.status = newVal.status
      this.moderator_comment = newVal.moderator_comment

      if (newVal.global) {
        this.region_all = ['1']
      } else {
        this.select_regions = newVal.regions_and_sities
      }

      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    }
  }
}
</script>

<style lang="scss">

    .kenost-upload-button{
      background: #F8F8F8 !important;
      border: 1px solid #F8F8F8 !important;
      color: #282828 !important;
      box-shadow: 0px 1px 5px 0px #00000033 !important;
      box-shadow: 0px 3px 1px 0px #0000001F !important;
      box-shadow: 0px 2px 2px 0px #00000024 !important;
    }

    .kenost-add-file{
        display: flex;
        align-items: center;
        text-decoration: none;
        p{
            margin: 0 0 0 10px;
        }
    }

    .rules-container{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    .kenost-error{
      border: 1px solid #FF0000 !important;
    }

    .kenost-error-text{
      color: #FF0000;
      font-size: 14px;
      margin-top: 4px;
    }

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
      overflow: hidden;
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

      &__valuer-inputs{
        width: 302px;
        display: flex;
        gap: 16px;
      }

      &__button{
        display: flex;
        justify-content: flex-end;
        padding: 12px 24px 12px 0;
      }

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
        width: 55%;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.12);
      }

      &__products{
        height: 350px;
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
        justify-content: space-between;
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
