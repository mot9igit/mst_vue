<template>
  <div class="block-header">
    <div class="dart-row dart-align-items-center">
      <div class="d-col-md-4">
        <span class="block-header__title">Отгрузки</span>
      </div>
      <div class="d-col-md-8">
        <div class="block-header__buttons">
          <a
            href="#"
            class="dart-btn dart-btn-primary-outline"
            @click.prevent="showShippingModal = true"
          >Добавить отгрузку</a>
          <teleport to="body">
            <custom-modal v-model="showShippingModal" @close="formReset">
              <template v-slot:title>Планирование отгрузки</template>
              <form action="#" @submit.prevent="formSubmit">
                <div class="shipping-form">
                  <div class="dart-form-group">
                    <label for="">Выберите магазины</label>
                    <AutoComplete
                      v-model="form.selectedStores"
                      :suggestions="form.filteredStores"
                      :multiple="true"
                      :dropdown="true"
                      optionLabel="label"
                      placeholder='Начните вводить наименование магазина'
                      @complete="searchStore($event)"
                    />
                  </div>
                  <div class="dart-row">
                    <div class="d-col-md-12">
                      <div class="dart-form-group">
                        <label for="">Повторять</label>
                        <Dropdown
                          v-model="form.timeSelected.repeater"
                          :options="form.timeSelect.repeater"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Выберите период повторения"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="dart-row" v-if="form.timeSelected.repeater != 0">
                    <div class="d-col-md-6" v-if="form.timeSelected.repeater == 'week'">
                      <div class="dart-form-group">
                        <label for="">В следующие дни</label>
                        <MultiSelect
                          v-model="form.timeSelected.days"
                          :options="form.timeSelect.days"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Выберите дни отгрузок"
                        />
                      </div>
                    </div>
                    <div class="d-col-md-6" v-if="form.timeSelected.repeater == 'week'">
                      <div class="dart-form-group">
                        <label for="">Каждую ... неделю</label>
                        <Dropdown
                          v-model="form.timeSelected.weeks"
                          :options="form.timeSelect.weeks"
                          optionLabel="label"
                          optionValue="value"
                          placeholder="Выберите неделю"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="dart-form-group">
                    <label for="">В период</label>
                    <DatePicker
                      v-model="form.timeSelected.range"
                      mode="date"
                      :masks="masks"
                      is-range
                    >
                      <template v-slot="{ inputValue, inputEvents, isDragging }">
                        <div class="dart-row">
                          <div class="d-col-md-6">
                            <input
                              class="dart-form-control"
                              :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                              :value="inputValue.start"
                              v-on="inputEvents.start"
                            />
                          </div>
                          <div class="d-col-md-6">
                            <input
                              class="dart-form-control"
                              :class="isDragging ? 'text-gray-600' : 'text-gray-900'"
                              :value="inputValue.end"
                              v-on="inputEvents.end"
                            />
                          </div>
                        </div>
                      </template>
                    </DatePicker>
                  </div>
                </div>
                <button class="dart-btn dart-btn-primary dart-btn-block dart-mt-1" type="submit">ДОБАВИТЬ ОТГРУЗКУ</button>
              </form>
            </custom-modal>
          </teleport>
        </div>
      </div>
    </div>
  </div>
  <div class="dart-row">
    <div class="d-col-md-8">
      <div class="profile-content b-wrap">
        <Calendar
          is-expanded
          title-position="left"
          :attributes="attributes"
          :masks="{ weekdays: 'WW' }"
          v-model="checkDate"
          @dayclick='dayClicked'
        />
      </div>
    </div>
    <div class="d-col-md-4">
      <div class="profile-content b-wrap">
        <div class="products">
          <v-table
            :items_data="shipping.shipment"
            :total="shipping.total"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
            :page="this.page"
            :table_data="this.table_data"
            :show_filter="false"
            title="Отгрузки"
            @filter="filter"
            @paginate="paginate"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import router from '@/router'
import AutoComplete from 'primevue/autocomplete'
import Dropdown from 'primevue/dropdown'
import MultiSelect from 'primevue/multiselect'
import { Calendar, DatePicker } from 'v-calendar'
import customModal from '@/components/popup/CustomModal'
import vTable from '../components/table/v-table'
import 'v-calendar/dist/style.css'

export default {
  name: 'ProfileShipping',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      selectedDay: null,
      table_data: {
        dilers: {
          label: 'Дилер',
          type: 'text'
        },
        date: {
          label: 'Дата',
          type: 'text'
        }
      },
      attributes: [
        {
          key: 'today',
          highlight: 'red',
          dates: new Date()
        }
        // this.shipping.dates
      ],
      showShippingModal: false,
      form: {
        selectedStores: null,
        filteredStores: null,
        filter: '',
        timeSelect: {
          repeater: [{
            label: 'Не повторять',
            value: 0
          }, {
            label: 'Ежедневно',
            value: 'day'
          }, {
            label: 'Еженедельно',
            value: 'week'
          }],
          weeks: [{
            label: '1',
            value: 1
          }, {
            label: '2',
            value: 2
          }, {
            label: '3',
            value: 3
          }, {
            label: '4',
            value: 4
          }],
          days: [{
            label: 'Пн',
            value: 1
          }, {
            label: 'Вт',
            value: 2
          }, {
            label: 'Ср',
            value: 3
          }, {
            label: 'Чт',
            value: 4
          }, {
            label: 'Пт',
            value: 5
          }, {
            label: 'Сб',
            value: 6
          }, {
            label: 'Вс',
            value: 7
          }]
        },
        timeSelected: {
          repeater: null,
          weeks: null,
          days: null,
          range: null
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_shipping_from_api',
      'set_shipping_to_api'
    ]),
    ...mapMutations([
      'SET_SHIPPING'
    ]),
    searchStore (event) {
      this.$load(async () => {
        const data = await this.$api.getStores.get({
          filter: event.query,
          stores: this.form.selectedStores,
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type
        })
        this.form.filteredStores = data.data.data.stores
      })
    },
    formSubmit (event) {
      this.$load(async () => {
        await this.set_shipping_to_api({
          action: 'set',
          id: router.currentRoute._value.params.id,
          type: router.currentRoute._value.params.type,
          timing: this.form.timeSelected,
          stores: this.form.selectedStores
        })
        this.attributes.pop()
        this.attributes.push(this.shipping.dates)
        this.showShippingModal = false
        this.formReset()
      })
    },
    formReset () {
      this.form.timeSelected.repeater = null
      this.form.timeSelected.weeks = null
      this.form.timeSelected.days = null
      this.form.timeSelected.range = null
      this.form.selectedStores = null
    },
    dayClicked (day) {
      this.form.timeSelected.range = {
        start: day,
        end: day
      }
      this.showShippingModal = true
    }
  },
  mounted () {
    this.$load(async () => {
      await this.get_shipping_from_api()
      this.attributes.push(this.shipping.dates)
    })
    this.$load(async () => {
      const data = await this.$api.getStores.get({
        id: router.currentRoute._value.params.id,
        type: router.currentRoute._value.params.type
      })
      this.form.filteredStores = data.data.data.stores
    })
  },
  components: {
    Dropdown,
    MultiSelect,
    AutoComplete,
    Calendar,
    DatePicker,
    customModal,
    vTable
  },
  computed: {
    ...mapGetters([
      'shipping'
    ])
  }
}
</script>

<style lang="scss">
.shipping-form{
  overflow: hidden;
}
.dart-form-group{
  display: flex;
  flex-wrap: wrap;
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
.p-autocomplete {
    width: 100%;
    display: flex;
}
.p-dropdown{
  width: 100%;
}
.p-multiselect .p-multiselect-label,
.p-inputtext,
.p-autocomplete .p-autocomplete-multiple-container{
  padding: 10px 15px !important;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-input-token{
  padding: 0 !important;
}
.p-autocomplete .p-autocomplete-multiple-container{
  width: 100%;
}
.p-component{
  font-size: 14px !important;
  line-height: 106%;
}
.profile-content{
  margin-bottom: 30px;
}
</style>
