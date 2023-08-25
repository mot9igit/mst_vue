<template>
  <div class="profile-content b-wrap">
    <div class="products">
      <v-table
        :items_data="dilers.dilers"
        :total="dilers.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        title="Мои магазины"
        @filter="filter"
        @paginate="paginate"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'

export default {
  name: 'ProfileDilers',
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
      table_data: {
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_diler',
          link_params: {
            diler_id: 'id'
          }
        },
        address: {
          label: 'Адрес',
          type: 'text'
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_dilers_from_api'
    ]),
    filter (data) {
      console.log(data)
      this.get_dilers_from_api(data)
    },
    paginate (data) {
      console.log(data)
      this.get_dilers_from_api(data)
    }
  },
  mounted () {
    this.get_dilers_from_api({
      type: 1,
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'dilers'
    ])
  }
}
</script>

<style lang="scss">
</style>
