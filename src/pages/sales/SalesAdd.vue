<template>
    <form @submit.prevent="formSubmit">
        <div class="profile-content__title">
            <span class="maintitle">Настройка программы</span>
            <div class="buttons_container">
            <RouterLink :to="{ name: 'org_sales', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary btn-padding">Отменить</RouterLink>
            <button type="submit" class="dart-btn dart-btn-primary btn-padding" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Добавить</button>
            </div>
        </div>
        <div>
            <div class="dart-form-group mb-4">
                <span class="ktitle">Наименование программы</span>
                <label for="name">Введите наименование, которое будет отражать смысл вашей программы.</label>
                <input v-model="this.form.name" type="text" name="name" placeholder="Укажите название программы" class="dart-form-control mt-2">
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
                <!-- <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div> -->
                <FileUpload class="kenost-upload-button" mode="basic" name="banner_small[]" :url="'/rest/file_upload.php?banner=min'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
                </div>
                <div class="upload-banner__image">
                <img :src="files?.min?.original_href" v-if="files?.min?.original_href">
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <div class="upload-banner">
                <div class="upload-banner__text">
                    <span class="ktitle">Иконка</span>
                    <span>Вы можете загрузить свое изображение или выбрать изображение из банка иконок</span>
                </div>
                <FileUpload class="kenost-upload-button" mode="basic" name="icon[]" :url="'/rest/file_upload.php?banner=icon'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
                </div>
                <div class="upload-icon__image">
                <img :src="files?.icon?.original_href" v-if="files?.icon?.original_href">
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Описание</span>
                <input v-model="this.form.description" type="text" name="description" placeholder="Укажите описание программы" class="dart-form-control">
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Совместимость скидок</span>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-1" name="compatibilityDiscount" value="1"/>
                <label for="compatibilityDiscount-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-2" name="compatibilityDiscount" value="2"/>
                <label for="compatibilityDiscount-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-3" name="compatibilityDiscount" value="3"/>
                <label for="compatibilityDiscount-3" class="ml-2 radioLabel">Применяется большая скидка</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-4" name="compatibilityDiscount" value="4"/>
                <label for="compatibilityDiscount-4" class="ml-2 radioLabel">Складывается с выбранными акциями</label>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Совместимость отсрочек</span>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-1" name="compatibilityPost" value="1"/>
                <label for="compatibilityPost-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-2" name="compatibilityPost" value="2"/>
                <label for="compatibilityPost-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-3" name="compatibilityPost" value="3"/>
                <label for="compatibilityPost-3" class="ml-2 radioLabel">Применяется большая отсрочка</label>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Даты проведения</span>
                <Calendar v-model="this.form.dates" selectionMode="range" placeholder="Выберите даты" :manualInput="false" showIcon/>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Срок отгрузки товаров</span>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.typeShipment" inputId="typeShipment-1" name="typeShipment" value="1"/>
                <label for="typeShipment-1" class="ml-2 radioLabel">Определяется данными из отгрузок</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.typeShipment" inputId="typeShipment-2" name="typeShipment" value="2"/>
                <label for="typeShipment-2" class="ml-2 radioLabel">Определяется по расчету доставки СДЭК</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.typeShipment" inputId="typeShipment-3" name="typeShipment" value="3"/>
                <label for="typeShipment-3" class="ml-2 radioLabel">Рассчитывается СДЭК от выбранной даты отгрузки</label>
                </div>

                <Calendar class="mt-3" v-if="this.form.typeShipment == 3" v-model="this.form.dateShipment" placeholder="Выберите ближайшую дату отгрузки" :manualInput="false" showIcon/>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Условия отплаты доставки</span>
                <div class="kenost-wiget">
                    <p>Плательщик</p>
                    <Dropdown v-model="this.form.paymentDelivery" :options="this.paymentDelivery" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                </div>
                <div class="two-colums mt-2">
                    <div class="kenost-wiget">
                        <p>Выберите условие оплаты доставки</p>
                        <Dropdown v-model="this.form.conditionPaymentDelivery" :options="this.conditionPaymentDelivery" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                    </div>
                    <div class="kenost-wiget">
                        <p v-if="this.form.conditionPaymentDelivery.key == 0">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.conditionPaymentDelivery.key == 1">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.conditionPaymentDelivery.key != undefined" v-model="this.form.conditionPaymentDeliveryValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Отсрочка</span>
                <div class="postponement">Срок отсрочки платежа: 50 дней <div class="postponement__settings" @click="this.modals.delay = !this.modals.delay">Настроить</div></div>
                <div class="postponement__graph">
                    <b>График платежей</b>
                    <p v-for="item in this.form.delay" :key="item.id">— {{item.percent}}% через {{item.day}} дней после отгрузки</p>
                </div>
                <div class="two-colums mt-2">
                    <div class="kenost-wiget">
                        <p>Выберите условие отсрочки</p>
                        <Dropdown v-model="this.form.postponementConditions" :options="this.postponementConditions" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                    </div>
                    <div class="kenost-wiget">
                        <p v-if="this.form.postponementConditions.key == 0">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.postponementConditions.key == 1">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.postponementConditions.key != undefined" v-model="this.form.postponementConditionsValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Условие акции</span>
                <div class="kenost-wiget">
                    <Dropdown v-model="this.form.condition" :options="this.condition" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                </div>
                <div class="two-colums mt-2">
                    <div class="kenost-wiget">
                        <p>Выберите условие оплаты доставки</p>
                        <Dropdown v-model="this.form.conditionPaymentDelivery" :options="this.conditionPaymentDelivery" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                    </div>
                    <div class="kenost-wiget">
                        <p v-if="this.form.conditionPaymentDelivery.key == 0">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.conditionPaymentDelivery.key == 1">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.conditionPaymentDelivery.key != undefined" v-model="this.form.conditionPaymentDeliveryValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

            <div class="dart-form-group picker-wrap">
                <span class="ktitle">Добавление товаров</span>
                <div class="flex align-items-center mt-2">
                    <RadioButton v-model="this.form.addProductType" inputId="addProductType-1" name="addProductType" value="1"/>
                    <label for="addProductType-1" class="ml-2 radioLabel">Добавить вручную</label>
                </div>
                <div class="flex align-items-center mt-3">
                    <RadioButton v-model="this.form.addProductType" inputId="addProductType-2" name="addProductType" value="2"/>
                    <label for="addProductType-2" class="ml-2 radioLabel">Загрузить файлом</label>
                </div>

                <div v-if="this.form.addProductType == '2'" class="dart-form-group mb-4">
                  <DropZone
                    class="kenost-dropzone"
                    :maxFiles="Number(10000000000)"
                    url="http://localhost:5000/item"
                    :uploadOnDrop="true"
                    :multipleUpload="true"
                    :acceptedFiles="['xlsx']"
                    :parallelUpload="1"
                    v-bind="args"
                    >
                    <template v-slot:message>
                      <div class="kenost-dropzone__custom">
                        <i class="pi pi-cloud-upload"></i>
                        <b>Перетащите файл в эту область</b>
                        <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
                      </div>
                    </template>
                  </DropZone>
                </div>

                <div v-if="this.form.addProductType == '1'" class="PickList mt-3">
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

        </div>
    </form>
    <Dialog v-model:visible="this.modals.delay" header="Настройка отсрочки платежа" :style="{ width: '800px' }">
        <div class="kenost-modal-price">
            <div class="two-colums mt-2" v-for="(item, index) in this.form.delay" :key="item.id">
                <div class="kenost-wiget">
                    <p>Процент от суммы заказа</p>
                    <InputNumber
                        v-model="this.form.delay[index].percent"
                        inputId="horizontal-buttons"
                        :step="0.1"
                        min="0"
                        max="100"
                        suffix=" %"
                        @update:modelValue="delayUpdate"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                </div>
                <div class="kenost-wiget">
                    <p>Срок отсрочки платежа в календарных днях</p>
                    <InputNumber
                        v-model="this.form.delay[index].day"
                        inputId="horizontal-buttons"
                        :step="0.1"
                        min="0"
                        @update:modelValue="delayUpdate"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                </div>
            </div>
            <div class="kenost-modal-price__button kenost-modal-price__flex">
                <div class="kenost-add-button" @click="this.form.delay.push({percent: 0, day: 0})"><i class="pi pi-plus"></i> Добавить срок</div>
                <div class="dart-btn dart-btn-primary" :class="{ 'kenots-button-stop': delayPercentSum > 100 || delayPercentSum < 100 }" @click="delayPercentSum == 100 ? this.modals.delay = !this.modals.delay : ''">
                    Подтвердить
                    <div class="kenots-button-stop__text">Сумма процентов должна составлять 100</div>
                </div>
            </div>
        </div>
    </Dialog>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import FileUpload from 'primevue/fileupload'
import Calendar from 'primevue/calendar'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import TreeSelect from 'primevue/treeselect'
import DropZone from 'dropzone-vue'

export default {
  name: 'ProfileSalesAdd',
  props: { },
  data () {
    return {
      page: 1,
      filter: {
        name: '',
        category: {}
      },
      selected: {},
      products: [],
      total_products: 0,
      per_page: 25,
      page_selected: 1,
      form: {
        name: '',
        description: '',
        dates: [],
        compatibilityDiscount: 0,
        compatibilityPost: 0,
        typeShipment: 0,
        dateShipment: '',
        paymentDelivery: 0,
        conditionPaymentDelivery: 0,
        conditionPaymentDeliveryValue: 0,
        postponementConditions: 0,
        postponementConditionsValue: 0,
        condition: 0,
        addProductType: '1',
        delay: [
          {
            percent: 100,
            day: 0
          }
        ],
        delayPercentSum: 0
      },
      modals: {
        delay: false
      },
      files: {},
      paymentDelivery: [
        { name: 'Покупатель', key: 0 },
        { name: 'Поставщик', key: 1 }
      ],
      conditionPaymentDelivery: [
        { name: 'Купи на Х рублей', key: 0 },
        { name: 'При покупке Х шт товара', key: 1 }
      ],
      postponementConditions: [
        { name: 'При покупке на Х рублей получи отсрочку', key: 0 },
        { name: 'При покупке Х товара получи отсрочку на него', key: 1 }
      ],
      condition: [
        { name: 'Купи Х товаров по цене Y', key: 0 },
        { name: 'Получи подарок при покупке Х товаров', key: 1 },
        { name: 'Купи на Х рублей - получи Y скидку на выбранный товар', key: 2 },
        { name: 'Купи на Х рублей - получи скидку на Y %', key: 3 }
      ]
    }
  },
  methods: {
    ...mapActions([
      'get_available_products_from_api'
    ]),
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
          }
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    },
    delayUpdate () {
      this.delayPercentSum = 0
      for (let i = 0; i < this.form.delay.length; i++) {
        this.delayPercentSum += this.form.delay[i].percent
      }
    },
    setFilter () {
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    select (id) {
      const product = this.products.find(r => r.id === id)
      product.discountInRubles = 0
      product.discountInterest = 0
      product.finalPrice = Number(product.price)
      product.typePrice = ''
      product.condition = ''
      product.conditionInfo = {
        multiplicity: 0, // Кратность
        multiplicityTwo: 0, // Кратность
        productType: 0, // Тип товара
        productTypeTwo: 0, // Тип товара
        quantity: 0, // Количество
        minTotalAmount: 0, // Мин общая сумма
        minTotalAmountTwo: 0, // Мин общая сумма
        minTotalSKU: 0, // Мин общее кол-во SKU
        minTotalSKUTwo: 0 // Мин общее кол-во SKU
      }
      product.delay = 0
      product.postponementConditions = ''
      product.postponementConditionsValue = 0
      product.paymentDelivery = ''
      product.conditionPaymentDelivery = 0
      product.shipmentCondition = 0
      product.conditionPaymentDeliveryValue = 0
      product.select_regions = {}
      product.shipmentConditionValue = 0

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
    }
  },
  mounted () {
    this.get_available_products_from_api({ filter: '', selected: [], page: this.page }).then(
      this.products = this.available_products.products
    )
  },
  components: {
    FileUpload,
    Calendar,
    RadioButton,
    Dropdown,
    Dialog,
    InputNumber,
    TreeSelect,
    DropZone
  },
  computed: {
    ...mapGetters([
      'available_products'
    ])
  },
  watch: {
    available_products: function (newVal, oldVal) {
      this.products = newVal.products
      this.total_products = newVal.total
    }
  }
}
</script>
<style lang="scss">

    .kenost-dropzone{
      border: 2px dashed  #E2E2E2 !important;
      margin-top: 10px
    }

    .kenost-wiget{
        p{
        color: #A0A0A0;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
        }
    }

    .kenost-dropzone__custom{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;

      i{
        font-size: 72px;
        color: #E2E2E2;
      }

      b{
        font-size: 14px;
        margin-top: 18px;
      }

      p{
        color: #A0A0A0;
        font-size: 14px;
        margin: 0;

        span{
          color: #1874CF;
          text-decoration: underline;
        }
      }
    }

    .kenots-button-stop{
        cursor: unset;
        position: relative;
        background: #ff000067 !important;
        border: none !important;
        transition: all 0.5s;
        overflow: unset;

        &__text{
            opacity: 0;
            pointer-events: none;
            display: block;
            position: absolute;
            padding: 12px;
            background: #282828;
            white-space: nowrap;
            font-size: 12px;
            font-weight: 400;
            right: 0;
            border-radius: 5px;
            letter-spacing: 0.7px;
            top: calc(-100% - 6px);

            &::before{
                width: 20px;
                height: 20px;
                content: "";
                border-radius: 5px;
                background: #282828;
                position: absolute;
                right: 40px;
                bottom: -8px;
                rotate: 45deg;
            }
            // display: none;
        }

        &:hover{
            .kenots-button-stop__text{
                opacity: 1;
                pointer-events: all;
            }
        }
    }

    .two-colums{
        display: flex;
        gap: 12px;

        .kenost-wiget{
            width: 100%;
        }

        .p-inputnumber{
            width: 100%;
        }
    }

    .kenost-modal-price__flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
    }

    .kenost-add-button{
        display: flex;
        gap: 8px;
        color: #282828;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.4s;

        &:hover{
            color: #444444;
        }
    }

    .postponement{
        color: #282828;
        font-size: 14px;
        display: flex;
        gap: 12px;

        &__settings{
            color: #0070F4;
            cursor: pointer;
            transition: all 0.4s;

            &:hover{
                color: #3993fa
            }
        }

        &__graph{
            background: #F8F7F5;
            border-radius: 5px;
            padding: 16px;
            width: 370px;
            margin-top: 16px;

            b{
                color: #5E5E5E;
                font-size: 14px;
                line-height: 1.1;
            }

            p{
                color: #282828;
                margin-top: 16px;
                font-size: 14px;
                line-height: 1;
            }
        }
    }
</style>
