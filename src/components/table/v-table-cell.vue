<template>
  <td>
    <div class="cell_value" v-if="cell_data.type == 'image'">
      <div class="img_abs" v-if="value[cell_key]">
        <img :src="'https://mst.tools' + value[cell_key]" alt=""/>
      </div>
      <div class="img_abs" v-else>
        <img src="https://mst.tools/assets/files/img/nopic.png" alt=""/>
      </div>
    </div>
    <div class="cell_value" v-else-if="cell_data.type == 'text'">
      {{ value[cell_key] }}
    </div>
    <div class="cell_value" :class="cell_key == 'name' ? 'name' : ''" v-else-if="cell_data.type == 'link'">
      <router-link :to="{ name: cell_data.link_to, params: linkParams, props: cell_data.link_props}">
        {{ value[cell_key] }}
      </router-link>
    </div>
  </td>
</template>

<script>

export default ({
  name: 'v-table-cell',
  props: {
    cell_data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    cell_key: {
      type: String,
      default: null
    },
    value: null,
    link_params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    linkParams () {
      const linkparams = {}
      if (this.cell_data.type === 'link') {
        for (const key in this.cell_data.link_params) {
          if (this.cell_data.link_params[key] !== 'id') {
            linkparams[key] = this.cell_data.link_params[key]
          } else {
            linkparams[key] = this.value[this.cell_data.link_params[key]]
          }
        }
      }
      return linkparams
    }
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
