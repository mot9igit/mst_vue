<template>
    <div class="k-quantity">
        <form method="post" class="ms2_form form-inline" role="form">
            <input type="hidden" name="key">
            <div class="k-quantity__btn" @click="onMinus">
                <i class="pi pi-minus"></i>
            </div>
            <input class="k-quantity__counter" :min="this.d_min" :max="this.d_max" name="count" :value="this.d_value">
            <div class="k-quantity__btn pls" @click="onPlus">
                <i class="pi pi-plus"></i>
            </div>
        </form>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Counter',
  emits: ['ElemCount'],
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1000
    },
    value: {
      type: Number,
      default: 0
    },
    id: {
      type: Number,
      default: 0
    },
    store_id: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      loading: true,
      d_min: this.min,
      d_max: this.max,
      d_value: this.value
    }
  },
  methods: {
    ...mapActions([
    ]),
    onMinus () {
      if (this.d_value > this.d_min) {
        this.d_value = this.d_value - 1
      }
      const data = {
        value: this.d_value,
        id: this.id,
        store_id: this.store_id
      }
      this.$emit('ElemCount', data)
    },
    onPlus () {
      if (this.d_value < this.d_max) {
        this.d_value = this.d_value + 1
      }
      const data = {
        value: this.d_value,
        id: this.id,
        store_id: this.store_id
      }
      this.$emit('ElemCount', data)
    }
  },
  mounted () {
  },
  components: { },
  computed: {
    ...mapGetters([
    ])
  }
}
</script>
<style lang="scss">
    .k-quantity{
        width: 86px;
        height: 34px;
        form{
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;
            background: #F8F7F5;
        }

        &__btn{
            height: 100%;
            width: 33%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }

        &__counter{
            height: 100%;
            width: 34%;
            text-align: center;
            background: #F8F7F5;
            border: none;
            outline: none;
        }
    }
</style>
