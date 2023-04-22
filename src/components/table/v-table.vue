<template>
  <div class="v-table">
    <div class="profile-content__title">
        <span class="title">{{ title }} ({{ total }})</span>
    </div>
    <!--
    <v-table-filter
      :filters="this.filters"
      @filter="setFilter"
    />
    -->
    <div class="dart-row dart-align-items-center" v-if="show_filter">
        <div class="d-col-md-6">
            <div class="form_input_group input_pl input-parent required">
                <input
                type="text"
                id="filter_name"
                placeholder="Наименование, артикул"
                name="name"
                class="dart-form-control"
                v-model="filter"
                @input="setFilter"
                />
                <label for="product_filter_name" class="s-complex-input__label">Наименование, артикул</label>
                <div class="form_input_group__icon">
                    <i class="d_icon d_icon-search"></i>
                </div>
            </div>
        </div>
        <div class="d-col-md-6" v-for="(filter, i) in filters" :key="i">
          <div class="dart-form-group">
            <!-- <label>{{ filter.name }}</label> -->
            <select
              :name=i
              :id="'filter_' + i"
              class="dart-form-control"
              v-model="filtersdata[i]"
              @change="setFilter"
              >
              <option v-for="(opt, opt_i) in filter.values" :key="opt_i" :value=opt>{{ opt_i }}</option>
            </select>
          </div>
        </div>
    </div>
    <div class="profile-products__products">
        <table class="profile-table">
            <thead class="text-center">
                <tr>
                    <th
                    v-for="(row, index) in table_data"
                    :key="index"
                    >
                      {{ row.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <v-table-row
                    v-for="row in items_data"
                    :key="row.id"
                    :row_data="row"
                    :keys="table_data"
                />
            </tbody>
        </table>
    </div>
    <paginate
      :page-count="pagesCount"
      :click-handler="pagClickCallback"
      :prev-text="'Пред'"
      :next-text="'След'"
      :container-class="'pagination justify-content-center'"
    >
    </paginate>
  </div>
</template>

<script>
import { toRaw } from 'vue'
import vTableRow from './v-table-row'
// import vTableFilter from './v-table-filter'
import Paginate from 'vuejs-paginate-next'

export default ({
  name: 'v-table',
  components: {
    vTableRow,
    // vTableFilter,
    Paginate
  },
  props: {
    items_data: {
      type: Array,
      default: () => {
        return []
      }
    },
    filters: {
      type: Object,
      default: () => {
        return {}
      }
    },
    table_data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    title: {
      type: String,
      default: null
    },
    total: {
      type: Number,
      default: 0
    },
    pagination_items_per_page: {
      type: Number,
      default: 5
    },
    pagination_offset: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    show_filter: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      filter: '',
      filtersdata: { },
      per_page: this.pagination_items_per_page
    }
  },
  computed: {
    pagesCount () {
      let pages = Math.round(this.total / this.per_page)
      if (pages === 0) {
        pages = 1
      }
      return pages
    }
  },
  methods: {
    setFilter () {
      // console.log(toRaw(this.filtersdata))
      this.$emit('filter', {
        filter: this.filter,
        filtersdata: toRaw(this.filtersdata),
        page: 1,
        perpage: this.pagination_items_per_page
      })
    },
    pagClickCallback (pageNum) {
      this.$emit('paginate', {
        filter: this.filter,
        page: pageNum,
        perpage: this.pagination_items_per_page
      })
    }
  }
})
</script>

<style>
  .page-item .page-link{
    cursor: pointer;
  }
</style>
