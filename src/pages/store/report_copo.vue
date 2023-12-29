<template>
  <div class="copo">
    <div class="to__up">
      <router-link :to="{ name: 'org_products', params: { id: $route.params.id } }">
        <mdicon name="arrow-left" />
        <span>Назад к товарам</span>
      </router-link>
    </div>
    <div class="products">
      <v-table
        :items_data="report_copo.items"
        :total="report_copo.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Сопоставление по брендам"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      >
        <template v-slot:desc>
          <div class="dart-alert dart-alert-info dart-mt-1">
            <span>На данной странице представлены бренды, найденые в вашем каталоге и статус сопоставления. Более подробный отчет по бренду вы можете посмотреть, кликнув на наименование бренда.</span>
          </div>
        </template>
      </v-table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '@/components/table/v-table'

export default {
  name: 'ReportCopo',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    org: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      page: 1,
      filters: {
        name: {
          name: 'Наименование бренда',
          placeholder: 'Наименование бренда',
          type: 'text'
        },
        instock: {
          name: 'В наличии',
          placeholder: 'В наличии',
          type: 'checkbox',
          values: 1
        }
      },
      table_data: {
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'report_copo_details',
          link_params: {
            id: this.$route.params.id,
            brand_id: 'id'
          },
          sort: true
        },
        find: {
          label: 'Найдено',
          type: 'text',
          sort: true
        },
        identified: {
          label: 'Идентифицировано',
          type: 'text',
          sort: true
        },
        cards: {
          label: 'Карточек создано',
          type: 'text',
          sort: true
        },
        percent_identified: {
          label: 'Процент идентификации',
          type: 'text',
          sort: true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_report_copo_from_api'
    ]),
    filter (data) {
      this.get_report_copo_from_api(data)
    },
    paginate (data) {
      this.page = data.page
      this.get_report_copo_from_api(data)
    }
  },
  mounted () {
    this.get_report_copo_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'report_copo'
    ])
  }
}
</script>

<style lang="scss">
</style>
