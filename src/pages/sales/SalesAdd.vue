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
                    <p>— 50% через 0 дней после отгрузки</p>
                    <p>— 50% через 30 дней после отгрузки</p>
                </div>
            </div>
        </div>
    </form>
    <Dialog v-model:visible="this.modals.delay" header="Настройка отсрочки платежа" :style="{ width: '800px' }">
        <div class="kenost-modal-price">
            <div class="two-colums mt-2" v-for="(item, index) in this.form.delay" :key="item.id">
                <div class="kenost-wiget">
                    <p>Процент от суммы заказа</p>
                    <input v-model="this.form.delay[index].percent" type="text" name="description" class="dart-form-control">
                </div>
                <div class="kenost-wiget">
                    <p>Срок отсрочки платежа в календарных днях</p>
                    <input v-model="this.form.delay[index].day" type="text" name="description" class="dart-form-control">
                </div>
            </div>
            <div class="kenost-modal-price__button">
                <div class="" @click="this.form.delay.push({percent: 0, day: 0})">Добавить срок</div>
                <div class="dart-btn dart-btn-primary" @click="this.modals.delay = !this.modals.delay">Подтвердить</div>
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

export default {
  name: 'ProfileSalesAdd',
  props: { },
  data () {
    return {
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
        delay: [
          {
            percent: 0,
            day: 0
          }
        ]
      },
      modals: {
        delay: true
      },
      files: {},
      paymentDelivery: [
        { name: 'Покупатель', key: 0 },
        { name: 'Поставщик', key: 1 }
      ],
      conditionPaymentDelivery: [
        { name: 'Купи на Х рублей', key: 0 },
        { name: 'При покупке Х шт товара', key: 1 }
      ]
    }
  },
  methods: {
    ...mapActions([
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
    }
  },
  mounted () {

  },
  components: {
    FileUpload,
    Calendar,
    RadioButton,
    Dropdown,
    Dialog
  },
  computed: {
    ...mapGetters([
    ])
  },
  watch: {
  }
}
</script>
<style lang="scss">
    .kenost-wiget{
        p{
        color: #A0A0A0;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
        }
    }

    .two-colums{
        display: flex;
        gap: 12px;

        .kenost-wiget{
            width: 100%;
        }

        .dart-form-control{
            height: 41.59px;
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
