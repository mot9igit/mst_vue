<template>
    <tr>
      <v-table-cell
          v-for="(row, index) in keys"
          :key="index"
          :cell_data="row"
          :cell_key="index"
          :value="row_data"
          @deleteElem="deleteElem"
      />
    </tr>
    <slot name="add_data"></slot>
</template>

<script>
import vTableCell from './v-table-cell'

export default ({
  name: 'v-table-row',
  props: {
    row_data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    keys: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {
    deleteElem (data) {
      this.$emit('deleteElem', data)
    }
  },
  components: {
    vTableCell
  }
})
</script>

<style lang="scss" scoped>
  .img_abs{
    img{
      max-width: 100px;
      max-height: 70px;
    }
  }
  .name{
    text-align: left;
  }
</style>
