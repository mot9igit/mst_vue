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
    <div class="cell_value" v-else-if="cell_data.type == 'editmode' && editMode">
      <Checkbox v-model="check" :binary="true" @input="checkRow"/>
    </div>
    <div class="cell_value" v-else-if="cell_data.type == 'text'">
      {{ value[cell_key] }}
    </div>
    <div class="cell_value" v-else-if="cell_data.type == 'boolean'">
      <div v-if="value[cell_key] == 0">
        <span class="cell__error" v-if="cell_data.calc == 'positive'">Нет</span>
        <span class="cell__success" v-else>Нет</span>
      </div>
      <div v-else>
        <span class="cell__error" v-if="cell_data.calc == 'negative'">Да</span>
        <span class="cell__success" v-else>Да</span>
      </div>
    </div>
    <div class="cell_value" :class="cell_key == 'name' ? 'name' : ''" v-else-if="cell_data.type == 'link'">
      <router-link :to="{ name: cell_data.link_to, params: linkParams, props: cell_data.link_props}">
        {{ value[cell_key] }}
      </router-link>
    </div>
    <div class="cell_value" :class="cell_key == 'name' ? 'name' : ''" v-else-if="cell_data.type == 'clickevent'">
      <a href="#" @click.prevent="actionElem('click')">
        {{ value[cell_key] }}
      </a>
    </div>
    <div class="cell_value" :class="cell_key == 'name' ? 'name' : ''" v-else-if="cell_data.type == 'downloadhref'">
      <a :href="value[cell_key]" download target="_blank">
        Скачать
      </a>
    </div>
    <div class="cell_value" :class="cell_key == 'status' ? 'status' : ''" v-else-if="cell_data.type == 'status'">
      <span :style="'font-size: 12px;padding: 3px 5px;border-radius: 3px;white-space: nowrap;color: #fff;background-color: #' + value.status_color">
        {{ value['status_name'] }}
      </span>
    </div>
    <div class="cell_value" :class="cell_key == 'actions' ? 'actions' : ''" v-else-if="cell_data.type == 'actions'">
      <span class="p-buttonset">
        <Button
          :title="row.label"
          :label="row.label" :icon="row.icon"
          v-for="(row, index) in blank.available"
          :key="index" severity="secondary"
          text
          @click="actionElem(index)"
          >
          <i :class="row.icon"></i>
        </Button>
      </span>
    </div>
  </td>
</template>

<script>
import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'

export default ({
  name: 'v-table-cell',
  emits: ['deleteElem', 'updateElem', 'editElem', 'clickElem', 'checkElem', 'approveElem', 'disapproveElem'],
  props: {
    editMode: {
      type: Boolean,
      default: false
    },
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
    value: {
      type: Object,
      default: () => {
        return {}
      }
    },
    link_params: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      check: false,
      blank: {}
    }
  },
  methods: {
    actionElem (action) {
      // console.log(action)
      // console.log(this.value)
      if (action === 'delete') {
        this.$emit('deleteElem', this.value)
      }
      if (action === 'update') {
        this.$emit('updateElem', this.value)
      }
      if (action === 'edit') {
        this.$emit('editElem', this.value)
      }
      if (action === 'click') {
        this.$emit('clickElem', this.value)
      }
      if (action === 'approve') {
        this.$emit('approveElem', this.value)
      }
      if (action === 'disapprove') {
        this.$emit('disapproveElem', this.value)
      }
    },
    checkRow (data) {
      const val = this.value
      val.checked = data
      this.$emit('checkElem', val)
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
  },
  mounted () {
    this.blank = this.cell_data
    if (this.cell_data.type === 'editmode') {
      if (this.value.checked) {
        this.check = true
      } else {
        this.check = false
      }
    }
    if (this.blank.type === 'actions') {
      for (const key in this.blank.available) {
        if (Object.prototype.hasOwnProperty.call(this.blank.available[key], 'link') && Object.prototype.hasOwnProperty.call(this.blank.available[key], 'link_values')) {
          if (this.blank.available[key].link && this.blank.available[key].link_values) {
            const link = this.blank.available[key].link
            const values = this.blank.available[key].link_values
            if (!values.includes(Number(this.value[link]))) {
              delete this.blank.available[key]
            }
          }
        }
      }
    }
  },
  components: {
    Button,
    Checkbox
  },
  watch: {
    cell_data: function (newVal, oldVal) {
      if (newVal.type === 'editmode') {
        if (this.value.checked) {
          this.check = true
        } else {
          this.check = false
        }
      }
    },
    value: function (newVal, oldVal) {
      if (this.cell_data.type === 'editmode') {
        this.check = newVal.checked
      }
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
.p-button{
  color: #343434;
  background: transparent;
  border-color: transparent;
  &:enabled:hover{
    background: transparent;
    border-color: transparent;
    color: #343434;
  }
  &:hover{
    color: #343434;
  }
}
.cell__error{
  color: #f00;
}
.cell__success{
  color: #0f0;
}
.name{
  text-align: left;
}
</style>
