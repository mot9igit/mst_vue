<template>
  <Toast />
  <ConfirmDialog></ConfirmDialog>
  <div class="profile-content b-wrap">
    <div class="products" v-if="organization.store">
      <div>
        <v-opts
          :items_data="opts.items"
          :total="opts.total"
          :pagination_items_per_page="this.pagination_items_per_page"
          :pagination_offset="this.pagination_offset"
          :page="this.optpage"
          :filters="this.optfilters"
          title="Доступные поставщики"
          @update="optUpdate"
          @filter="optfilter"
          @sort="optfilter"
          @paginate="optpaginate"
        >
          <template v-slot:desc>
            <span class="desc">Отметьте организации, которые являются вашими поставщиками.</span>
          </template>
        </v-opts>
      </div>
    </div>
    <div class="products" v-if="organization.vendor">
      <v-table
        :items_data="dilers.dilers"
        :total="dilers.total"
        :pagination_items_per_page="this.pagination_items_per_page"
        :pagination_offset="this.pagination_offset"
        :page="this.page"
        :table_data="this.table_data"
        title="Мои оптовики"
        @filter="filter"
        @paginate="paginate"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vTable from '../components/table/v-table'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import vOpts from '@/components/table/v-opts'

export default {
  name: 'ProfileDilersOpts',
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
      page: 1,
      optpage: 1,
      optfilters: {
        filter: {
          name: 'Наименование, адрес',
          placeholder: 'Введите наименование или адрес',
          type: 'text'
        },
        region: {
          name: 'Регион',
          placeholder: 'Выберите регион',
          type: 'tree',
          values: this.getregions
        },
        our: {
          name: 'Мои поставщики',
          placeholder: 'Мои поставщики',
          type: 'checkbox',
          values: 1
        }
      },
      table_data: {
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_opt',
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
      'get_organization_from_api',
      'get_regions_from_api',
      'get_dilers_from_api',
      'get_opts_from_api',
      'unset_opts'
    ]),
    filter (data) {
      this.get_dilers_from_api(data)
    },
    paginate (data) {
      this.get_dilers_from_api(data)
    },
    optfilter (data) {
      this.get_opts_from_api(data)
    },
    optpaginate (data) {
      this.get_opts_from_api(data)
    },
    optUpdate (data) {
      this.get_opts_from_api({
        page: this.optpage,
        perpage: this.pagination_items_per_page
      })
    }
  },
  mounted () {
    this.get_organization_from_api().then(() => {
      if (this.organization.vendor) {
        this.get_dilers_from_api({
          type: 2,
          page: this.page,
          perpage: this.pagination_items_per_page
        })
      }
      if (this.organization.store) {
        this.get_regions_from_api().then(
          this.optfilters.region.values = this.getregions
        )
        this.get_opts_from_api({
          page: this.optpage,
          perpage: this.pagination_items_per_page
        })
      }
    })
  },
  components: { vTable, ConfirmDialog, Toast, vOpts },
  computed: {
    ...mapGetters([
      'dilers',
      'organization',
      'getregions',
      'opts'
    ])
  },
  watch: {
    getregions: function (newVal, oldVal) {
      this.optfilters.region.values = newVal
    }
  }
}
</script>

<style lang="scss">
</style>
