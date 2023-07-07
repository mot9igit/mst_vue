<template>
  <v-table
    :items_data="matrixs.items"
    :total="matrixs.total"
    :pagination_items_per_page="this.pagination_items_per_page"
    :pagination_offset="this.pagination_offset"
    :page="this.page"
    :table_data="this.table_data"
    :filters="this.filters"
    title="Ключевые матрицы"
    @filter="filter"
    @sort="filter"
    @paginate="paginate"
  >
    <template v-slot:button>
      <RouterLink :to="{ name: 'org_matrix_add', params: { id: $route.params.id }}" class="dart-btn dart-btn-primary">Добавить матрицу</RouterLink>
    </template>
  </v-table>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'
import { RouterLink } from 'vue-router'

export default {
  name: 'ProfileMatrix',
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
      filters: {
        name: {
          name: 'Наименование, артикул',
          placeholder: 'Наименование, артикул',
          type: 'text'
        },
        range: {
          name: 'Период действия',
          placeholder: 'Период действия',
          type: 'range',
          range: 'all'
        }
      },
      table_data: {
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_matrix_edit',
          link_params: {
            id: this.$route.params.id,
            matrix_id: 'id'
          },
          sort: true
        },
        date_from: {
          label: 'Действует с',
          type: 'text',
          sort: true
        },
        date_to: {
          label: 'Действует до',
          type: 'text',
          sort: true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_matrixs_from_api'
    ]),
    filter (data) {
      this.get_matrixs_from_api(data)
    },
    paginate (data) {
      this.get_matrixs_from_api(data)
    }
  },
  mounted () {
    this.get_matrixs_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable, RouterLink },
  computed: {
    ...mapGetters([
      'matrixs'
    ])
  }
}
</script>

<style lang="scss">
</style>
