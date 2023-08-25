<template>
  <div class="participants mt-5">
    <div class="dart-form-group">
      <v-table
        :items_data="bonus_participants.items"
        :total="bonus_participants.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        :filters="this.filters"
        title="Участники программы"
        @filter="filter"
        @sort="filter"
        @paginate="paginate"
      >
      </v-table>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../table/v-table'

export default {
  name: 'bonusParticipants',
  props: {
    pagination_items_per_page: {
      type: Number,
      default: 25
    },
    pagination_offset: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: true,
      page: 1,
      filters: {
        filter: {
          name: 'Наименование',
          placeholder: 'Наименование',
          type: 'text'
        },
        date: {
          name: 'Выберите период',
          placeholder: 'Выберите период',
          type: 'range'
        }
      },
      table_data: {
        name: {
          label: 'Наименование',
          type: 'text',
          sort: true
        },
        date: {
          label: 'Дата присоединения',
          type: 'text',
          sort: true
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'get_bonus_participants_from_api',
      'unset_bonus_participants'
    ]),
    filter (data) {
      this.loading = true
      this.unset_bonus_participants()
      this.get_bonus_participants_from_api(data).then(
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
      this.page = data.page
      this.unset_bonus_participants()
      this.get_bonus_participants_from_api(data).then(
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
  mounted () {
    this.get_bonus_participants_from_api({
      page: this.page,
      perpage: this.pagination_items_per_page
    })
  },
  components: { vTable },
  computed: {
    ...mapGetters([
      'bonus_participants'
    ])
  }
}
</script>
<style lang="scss">
</style>
