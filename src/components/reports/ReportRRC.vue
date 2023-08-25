<template>
  <div>
    <div v-if="getrrcreport.store_name">
      <v-table
        :items_data="getrrcreport.items"
        :total="getrrcreport.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        :title="'Отчет соблюдения РРЦ ' + getrrcreport.store_name + ' с ' + getrrcreport.date_from + ' по ' + getrrcreport.date_to"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
        @clickElem="clickElem"
      />
    </div>
    <div v-else>
      <v-table
        :items_data="getrrcreport.items"
        :total="getrrcreport.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        :title="'Отчет соблюдения РРЦ'"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
        @clickElem="clickElem"
      />
    </div>
    <teleport to="body">
      <custom-modal v-model="showPlanModal" @cancel="closePlanModal" class="plan-modal">
        <template v-slot:title>Данные по товару</template>
        <div class="linked_product">
          <div class="image">
            <img :src="modal.image" :alt="modal.name">
          </div>
          <div class="text">
            <span class="title">{{ modal.name }}</span>
            <span class="desc"><b class="lb">Артикул производителя:</b> {{ modal.vendor_article }}</span>
            <span class="desc"><b class="lb">РРЦ:</b> {{ modal.rrc }} ₽ </span>
          </div>
        </div>
        <div class="dart-mt-3">
          <v-table
            :items_data="getrrcdata.items"
            :total="getrrcdata.total"
            :pagination_items_per_page="this.pagination_items_per_page"
            :pagination_offset="this.pagination_offset"
            :page="this.page"
            :table_data="this.table_modal_data"
            :title="'Изменение цены с ' + getrrcreport.date_from + ' по ' + getrrcreport.date_to"
            @paginate="paginateModal"
          />
        </div>
      </custom-modal>
    </teleport>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import customModal from '@/components/popup/CustomModal'
import vTable from '@/components/table/v-table.vue'

export default {
  name: 'ReportRRC',
  props: {
    store_id: {
      type: Number,
      default: 0
    },
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
    },
    page_m: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      loading: false,
      showPlanModal: false,
      modal: {
        name: '',
        vendor_article: '',
        image: ''
      },
      filters: {
        /* name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        } */
      },
      table_data: {
        product_image: {
          label: 'Фото',
          type: 'image'
        },
        product_vendor_article: {
          label: 'Артикул',
          type: 'clickevent',
          sort: true
        },
        product_name: {
          label: 'Наименование товара',
          type: 'clickevent',
          sort: true
        },
        price_now: {
          label: 'Цена на полке в данный момент, ₽',
          type: 'text',
          sort: true
        },
        price_rrc: {
          label: 'РРЦ, ₽',
          type: 'text',
          sort: true
        },
        avg_price: {
          label: 'Средняя цена, ₽',
          type: 'text',
          sort: true
        },
        avg_variation_percent: {
          label: 'Среднее отклонение, %',
          type: 'text',
          sort: true
        },
        avg_variation_money: {
          label: 'Среднее отклонение, ₽',
          type: 'text',
          sort: true
        },
        avg_weighted_price: {
          label: 'Средневзв. цена, ₽',
          type: 'text',
          sort: true
        },
        /* avg_weighted_price_variation_percent: {
          label: 'Среднее отклонение средневзв., %',
          type: 'text',
          sort: true
        },
        avg_weighted_price_variation_money: {
          label: 'Среднее отклонение средневзв., ₽',
          type: 'text',
          sort: true
        }, */
        non_rrc: {
          label: 'Кол-во дней не в РРЦ',
          type: 'text',
          sort: true
        },
        price_max: {
          label: 'Макс. цена, ₽',
          type: 'text',
          sort: true
        },
        price_min: {
          label: 'Мин. цена, ₽',
          type: 'text',
          sort: true
        },
        violation: {
          label: 'Нарушение РРЦ',
          type: 'boolean',
          calc: 'negative',
          sort: true
        }
      },
      table_modal_data: {
        date: {
          label: 'Дата',
          type: 'text',
          sort: true
        },
        price: {
          label: 'Цена на полке',
          type: 'text',
          sort: true
        },
        variation_percent: {
          label: 'Отклонение в %',
          type: 'text',
          sort: false
        },
        variation_money: {
          label: 'Отклонение в ₽',
          type: 'text',
          sort: false
        }
      }
    }
  },
  components: { vTable, customModal },
  computed: {
    ...mapGetters([
      'getrrcreport',
      'getrrcdata'
    ])
  },
  mounted () {
    this.get_report_rrc_from_api({
      storeId: this.store_id,
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  unmounted () {
    // очищаем репорт
    this.unset_report_rrc()
  },
  methods: {
    ...mapActions([
      'get_report_rrc_from_api',
      'get_report_rrc_data',
      'unset_report_rrc',
      'unset_report_rrc_data'
    ]),
    clickElem (data) {
      console.log(data)
      this.get_report_rrc_data({
        remainId: data.remain_id,
        page: this.page_m,
        perpage: this.pagination_items_per_page
      })
      this.modal.name = data.product_name
      this.modal.image = 'https://mst.tools' + data.product_image
      this.modal.vendor_article = data.product_vendor_article
      this.modal.rrc = data.price_rrc
      this.showPlanModal = true
    },
    filter (data) {
      this.get_report_rrc_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка' + error)
        }
      )
    },
    paginate (data) {
      this.loading = true
      this.get_report_rrc_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    paginateModal (data) {
      this.unset_products_remains_data()
      this.loading = true
      this.get_products_remains_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    }
  },
  watch: {}
}
</script>

<style lang="scss">
</style>
