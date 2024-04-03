<template>
    <nav aria-label="breadcrumb">
        <ol
            class="breadcrumb"
            itemscope=""
            itemtype="http://schema.org/BreadcrumbList"
        >
            <li
                class="breadcrumb-item"
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
            >
                <a itemprop="item" href="/"><span itemprop="name">Главная</span></a
                ><meta itemprop="position" content="1" />
            </li>
            <li
                class="breadcrumb-item"
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
            >
                <a itemprop="item" href="catalog/"
                    ><span itemprop="name">Каталог товаров</span></a
                ><meta itemprop="position" content="2" />
            </li>
            <li
                class="breadcrumb-item"
                itemprop="itemListElement"
                itemscope=""
                itemtype="http://schema.org/ListItem"
            >
                <a itemprop="item" href="catalog/benzotexnika/"
                    ><span itemprop="name">Бензотехника</span></a
                ><meta itemprop="position" content="3" />
            </li>
            <li class="breadcrumb-item active">Триммеры \ бензокосы</li>
        </ol>
    </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Basket',
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
      loading: true
    }
  },
  methods: {
    ...mapActions([
    ])
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
    .breadcrumbs{
        padding-top: 30px;
    }

    .breadcrumb-item{
        color: var(--text-color-dop) !important;
        margin-bottom: 20px !important;
        font-size: 14px;
    }

    .breadcrumb a{
        color: var(--text-color-dop) !important;
        font-size: 14px;
    }

    .breadcrumb{
        margin: 0 !important;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        overflow-x: auto;
        width: 100%;
        gap: 11px;

        &::-webkit-scrollbar {
            width: 0px;
        }

        li{
            white-space: nowrap;
        }

        a{
            color: var(--bs-secondary-color);
            text-decoration: none;
            &:hover{
                color: var(--secondary-color);
            }
        }
    }

    .breadcrumb-item+.breadcrumb-item{
        padding-left: 0;
        gap: 8px;
        display: flex;
    }

    .breadcrumb-item+.breadcrumb-item::before{
        padding: 0;
    }

</style>
