<template>
  <div class="to__up">
    <router-link :to="{ name: 'org_reports', params: { id: $route.params.id } }">
      <mdicon name="arrow-left" />
      <span>Назад к отчетам</span>
    </router-link>
  </div>
  <div class="profile-content__title">
    <div>
      <span class="title">{{ getreport.name }}</span>
      <span class="desc__text">Тип отчета: Продажи понедельно</span>
      <span class="desc__text">Период:  с  {{ getreport.date_from }} по {{ getreport.date_to }}</span>
    </div>
    <a :href="getreport.file" class="dart-btn dart-btn-text" v-if="getreport.file" download>
      <img src="/img/xslx.svg" alt="">
      <span>Скачать файл</span>
    </a>
</div>
  <div class="dart-alert dart-alert-info">Более удобный формат в сгенерированном файле. </div>
  <TreeTable :value="getreports.items" :loading="loading" :tableProps="{ style: { minWidth: '650px' } }" scrollable scrollHeight="600px" scrollDirection="both">
    <template #header>
      <div class="sales-header">
        <div v-html="getreports.head" :style="'width: ' + getreports.head_width + 'px'"></div>
      </div>
    </template>
    <Column v-for="col of getreports.columns" :key="col.field" :field="col.field" :header="col.label" :expander="col.expander" :frozen="col.frozen" :style="'width: ' + col.width + 'px;'">
    </Column>
  </TreeTable>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TreeTable from 'primevue/treetable'
import Column from 'primevue/column'

export default {
  name: 'ReportSales',
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
      loading: true,
      reloading: false,
      filters: {
        region: {
          name: 'Регион',
          placeholder: 'Выберите регион',
          type: 'tree',
          values: this.getregions
        },
        stores: {
          name: 'Магазин',
          placeholder: 'Выберите магазин',
          type: 'dropdown',
          values: this.getstores
        }
      },
      table_data: {
        name: {
          label: '',
          type: 'text',
          sort: false
        },
        remain_avg: {
          label: 'Средний остаток на конец недели',
          type: 'text',
          sort: false
        },
        sales: {
          label: 'Сумма продаж',
          type: 'text',
          sort: false
        },
        sales_speed: {
          label: 'Средняя скорость продаж',
          type: 'text',
          sort: false
        },
        remain: {
          label: 'Остаток на конец периода',
          type: 'text',
          sort: false
        },
        days_out_of_stock: {
          label: 'Сумма дней out of stock',
          type: 'text',
          sort: false
        }
      }
    }
  },
  components: { TreeTable, Column },
  computed: {
    ...mapGetters([
      'getreports',
      'getreport'
    ])
  },
  mounted () {
    this.get_report_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
    this.get_report_data_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    }).then(
      result => {
        this.loading = false
        const element = document.querySelector('.p-treetable-scrollable .p-treetable-wrapper')
        element.addEventListener('scroll', this.handleScroll)
      },
      error => {
        // alert error
        console.log('Произошла ошибка' + error)
      }
    )
  },
  beforeUnmount () {
    const element = document.querySelector('.p-treetable-scrollable .p-treetable-wrapper')
    element.removeEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    this.unset_reports_data()
  },
  methods: {
    ...mapActions([
      'get_report_from_api',
      'get_report_data_from_api',
      'unset_reports_data'
    ]),
    filter (data) {
      this.true = false
      this.unset_reports_data()
      this.get_report_data_from_api(data).then(
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
      this.unset_reports_data()
      this.get_report_data_from_api(data).then(
        result => {
          this.loading = false
        },
        error => {
          // alert error
          console.log('Произошла ошибка ' + error)
        }
      )
    },
    handleScroll (event) {
      const element = document.querySelector('.p-treetable-scrollable .p-treetable-wrapper')
      console.log(element.scrollLeft)
      const header = document.querySelector('.sales-header')
      // header.style.transform = 'translate(-' + element.scrollLeft + 'px ,0)'
      header.scroll(element.scrollLeft, 0)
    }
  },
  watch: {}
}
</script>

<style lang="scss">
  .tree-table-header{
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .col{
      min-width: 150px;
      & + .col{
        border-left: 1px solid #dee2e6;
        padding: 15px 15px;
      }
    }
  }
  .p-treetable-tbody{
    td {
      button + *{
      }
    }
  }
  .profile .p-treetable .p-treetable-header,
  .profile .p-treetable .p-treetable-thead > tr > th{
    background: transparent;
  }
  .profile .p-treetable .lab{
    display: inline-block;
    border-radius: 5px;
    background: #DEE2E6;
    padding: 3px 5px;
    color: #282828;
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 1.3;
    letter-spacing: 0.25px;
  }
  .sales-header{
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .head-row{
      display: flex;
      flex-wrap: nowrap;
      & > div {
        flex-shrink: 0;
        text-align: center;
        padding: 5px 1rem;
        & + div{
          border-left: 1px solid #dee2e6;
        }
      }
      & > div:first-child{
        width: 350px;
        text-align: left;
        position: sticky;
        left: 0;
        background: transparent;
      }
    }
  }
</style>
