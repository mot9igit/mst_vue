<template>
  <Toast />
  <form @submit.prevent="formSubmit">
    <div class="profile-content__title">
        <span class="maintitle">Настройка акции</span>
        <div class="buttons_container">
          <RouterLink :to="{ name: 'org_sales', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary btn-padding">Отменить</RouterLink>
          <button type="submit" class="dart-btn dart-btn-primary btn-padding" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Добавить</button>
        </div>
    </div>
    <div>
      <div class="dart-form-group mb-4">
        <span class="ktitle">Наименование акции</span>
        <label for="name">Введите наименование, которое будет отражать смысл вашей акции</label>
        <input v-model="form.name" type="text" name="name" placeholder="Укажите название акции" class="dart-form-control" :class="{'kenost-error':this.validation.name.error}">
        <span v-if="this.validation.name.error" class="kenost-error-text">{{ this.validation.name.text }}</span>
      </div>

      <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Вертикальный баннер</span>
            <span>Чтобы обложка выглядела качественно на всех устройствах, советуем загрузить изображение размером не менее 1108х332 пикс. Размер файла - не более ?? МБ. Форматы файла - ???.</span>
          </div>
          <!-- <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div> -->
          <FileUpload class="kenost-upload-button" mode="basic" name="banner[]" :url="'/rest/file_upload.php?banner=max'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
        </div>
        <div class="upload-banner__image upload-banner__banner">
          <img :src="files?.max?.original_href" v-if="files?.max?.original_href">
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Мобильный баннер</span>
            <span>Чтобы обложка выглядела качественно на всех устройствах, советуем загрузить изображение размером не менее 500х500 пикс. Размер файла - не более ?? МБ. Форматы файла - ???.</span>
          </div>
          <!-- <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div> -->
          <FileUpload class="kenost-upload-button" mode="basic" name="banner_small[]" :url="'/rest/file_upload.php?banner=min'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
        </div>
        <div class="upload-banner__image">
          <img :src="files?.min?.original_href" v-if="files?.min?.original_href">
        </div>
      </div>

      <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Иконка</span>
            <span>Вы можете загрузить свое изображение или выбрать изображение из банка иконок</span>
          </div>
          <FileUpload class="kenost-upload-button" mode="basic" name="icon[]" :url="'/rest/file_upload.php?banner=icon'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
        </div>
        <div class="upload-icon__image">
          <img :src="files?.icon?.original_href" v-if="files?.icon?.original_href">
        </div>
      </div>

      <!-- <div class="dart-form-group mb-4">
        <div class="upload-banner">
          <div class="upload-banner__text">
            <span class="ktitle">Иконка</span>
            <span>Вы можете загрузить свое изображение или выбрать изображение из банка иконок</span>
          </div>
          <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div>
        </div>
        <div class="upload-icon__image">
        </div>
      </div> -->

      <div class="dart-form-group mb-4">
        <span class="ktitle">Описание</span>
        <input v-model="form.description" type="text" name="description" placeholder="Укажите описание акции" class="dart-form-control" :class="{'kenost-error':this.validation.description.error}">
        <span v-if="this.validation.description.error" class="kenost-error-text">{{ this.validation.description.text }}</span>
      </div>

      <!-- <div class="dart-form-group mb-4">
        <span class="ktitle">Вознаграждение</span>
        <input v-model="form.percent" type="text" name="description" placeholder="Укажите вознаграждение" class="dart-form-control">
        <Dropdown v-model="selectedCity" :options="this.award" optionLabel="name" placeholder="Выберите тип цен" class="mt-2 w-full md:w-14rem" />
      </div> -->

      <div class="dart-form-group mb-4">
        <span class="ktitle">Совместимость скидок</span>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-1" name="compatibilityDiscount" value="1"/>
          <label for="compatibilityDiscount-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-2" name="compatibilityDiscount" value="2"/>
          <label for="compatibilityDiscount-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-3" name="compatibilityDiscount" value="3"/>
          <label for="compatibilityDiscount-3" class="ml-2 radioLabel">Применяется большая скидка</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityDiscount" inputId="compatibilityDiscount-4" name="compatibilityDiscount" value="4"/>
          <label for="compatibilityDiscount-4" class="ml-2 radioLabel">Складывается с выбранными акциями</label>
        </div>
        <span v-if="this.validation.compatibilityDiscount.error" class="kenost-error-text">{{ this.validation.compatibilityDiscount.text }}</span>
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Совместимость отсрочек</span>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityPost" inputId="compatibilityPost-1" name="compatibilityPost" value="1"/>
          <label for="compatibilityPost-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityPost" inputId="compatibilityPost-2" name="compatibilityPost" value="2"/>
          <label for="compatibilityPost-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
        </div>
        <div class="flex align-items-center mt-3">
          <RadioButton v-model="this.compatibilityPost" inputId="compatibilityPost-3" name="compatibilityPost" value="3"/>
          <label for="compatibilityPost-3" class="ml-2 radioLabel">Применяется большая отсрочка</label>
        </div>
        <span v-if="this.validation.compatibilityPost.error" class="kenost-error-text">{{ this.validation.compatibilityPost.text }}</span>
      </div>

      <div class="dart-form-group mb-4">
        <span class="ktitle">Даты проведения</span>
        <Calendar v-model="form.dates" selectionMode="range" placeholder="Выберите даты" :manualInput="false" showIcon :class="{'kenost-error':this.validation.dates.error}"/>
        <span v-if="this.validation.dates.error" class="kenost-error-text">{{ this.validation.dates.text }}</span>
      </div>

      <div class="dart-form-group picker-wrap">
        <span class="ktitle">Добавление товаров</span>
        <div class="flex align-items-center mb-3">
          <Checkbox v-model="this.all_product" inputId="all_product" name="region_all" value="1" />
          <label for="all_product" class="ml-2"> Доступна для всех товаров </label>
        </div>
        <span v-if="this.validation.selected.error" class="kenost-error-text">{{ this.validation.selected.text }}</span>
        <div v-if="this.all_product.length == 0" class="PickList">
          <div class="PickList__product" :class="{'kenost-error':this.validation.selected.error}">
            <b class="PickList__title">Доступные товары</b>
            <div class="PickList__filters">
              <div class="form_input_group input_pl input-parent required">
                <input
                type="text"
                id="filter_name"
                placeholder="Введите артикул или название"
                class="dart-form-control"
                v-model="filter.name"
                @input="setFilter('filter')"
                />
                <label for="product_filter_name" class="s-complex-input__label">Введите артикул или название</label>
                <div class="form_input_group__icon">
                    <i class="d_icon d_icon-search"></i>
                </div>
              </div>
              <div class="dart-form-group">
                <TreeSelect v-model="this.filter.category" :options="this.get_catalog" selectionMode="checkbox" placeholder="Выберите категорию" class="w-full" @change="setFilter"/>
              </div>
            </div>
            <div class="PickList__products">
              <div class="PickList__el" v-for="item in this.products" :key="item.id">
                <img :src="'https://mst.tools' + item.image" alt="">
                <div class="PickList__product-info">
                  <div class="PickList__name">{{item.name}}</div>
                  <div class="PickList__article">{{item.article}}</div>
                  <div class="PickList__price">{{Number(item.price).toFixed(0)}} ₽</div>
                </div>
                <div @click="select(item.id)" class="PickList__select"><i class="pi pi-angle-right"></i></div>
              </div>
              <paginate
                :page-count="pagesCount"
                :click-handler="pagClickCallback"
                :prev-text="'Пред'"
                :next-text="'След'"
                :container-class="'pagination justify-content-center'"
                :initialPage="this.page"
                :forcePage="this.page"
              >
              </paginate>
            </div>
          </div>

          <div class="PickList__selected">
            <div class="PickList__title mb-4">
              <b>Добавленные товары</b>
              <!-- <div class="PickList__title-left">
                <b>Скидка в %</b>
                <b>Скидка в ₽</b>
                <b>Итоговая цена в ₽</b>
              </div> -->
            </div>
            <div class="PickList__products">
              <div class="PickList__el" v-for="(item) in this.selected" :key="item.id">
                <img :src="'https://mst.tools' + item.image" alt="">
                  <div class="PickList__info">
                  <div class="PickList__product-info off">
                    <div class="PickList__name">{{item.name}}</div>
                    <div class="PickList__article">{{item.article}}</div>
                    <div class="PickList__price">{{Number(item.price).toFixed(0)}} ₽</div>
                  </div>
                </div>
                <div @click="deleteSelect(item.id)" class="PickList__select"><i class="pi pi-times"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="Object.keys(this.selected).length > 0 && this.all_product.length == 0" class="selectedProducts mb-5">
        <span class="title">Таблица добавленных товаров</span>
        <div class="selectedProductsTable" >
          <table class="kenost-action-table">
            <thead>
                <tr>
                    <th class="kenost-action-table__name center kenost-th__сheckbox"><Checkbox @update:modelValue="kenostTableCheckedAll" v-model="this.kenost_table_all" inputId="kenost_table_all" value="1" /></th>
                    <th class="kenost-action-table__name kenost-th__name">Товар</th>
                    <th class="kenost-action-table__name center kenost-th__price">РРЦ (₽)</th>
                    <th class="kenost-action-table__name center kenost-th__formula">Скидка по формуле</th>
                    <th class="kenost-action-table__name kenost-th__typePrice">Тип цен</th>
                    <th class="kenost-action-table__name center kenost-th__number">Скидка в %</th>
                    <th class="kenost-action-table__name center kenost-th__number">Скидка в ₽</th>
                    <th class="kenost-action-table__name center kenost-th__number">Цена со скидкой</th>
                    <th class="kenost-action-table__name kenost-th__discount-condition">Условие скидки</th>
                    <th class="kenost-action-table__name kenost-th__discount-condition"></th>
                    <th class="kenost-action-table__name"></th>
                    <th class="kenost-action-table__name"></th>
                    <th class="kenost-action-table__name center kenost-th__number">Отсрочка (дн)</th>
                    <th class="kenost-action-table__name kenost-th__discount-condition">Условие отсрочки</th>
                    <th class="kenost-action-table__name kenost-th__number"></th>
                    <th class="kenost-action-table__name kenost-th__discount-condition">Оплата доставки</th>
                    <th class="kenost-action-table__name kenost-th__discount-condition">Условие оплаты доставки</th>
                    <th class="kenost-action-table__name"></th>
                    <th class="kenost-action-table__name kenost-th__discount-condition">Регион доставки</th>
                    <th class="kenost-action-table__name kenost-th__discount-condition">Условие отгрузки</th>
                    <th class="kenost-action-table__name"></th>
                </tr>
            </thead>
            <tbody v-for="(item, index) in this.selected" :key="item.id">
                <tr >
                  <td class="center kenost-action-table-td__сheckbox">
                    <Checkbox v-model="this.kenost_table" inputId="kenost_table" :value="item.id" />
                  </td>
                  <td class="kenost-action-table-td__name">
                    <img class="mt-4" :src="'https://mst.tools' + item.image">
                    <div class="kenost-action-table-td__text mt-4">
                      <p>{{ item.name }}</p>
                      <span>{{item.article}}</span>
                    </div>
                  </td>
                  <td class="center mt-4">
                    {{ (Number(item.price).toFixed(0)).toLocaleString('ru') }}
                  </td>
                  <td class="center">
                    <div @click="this.visible = true, this.discountFormul.index = index, this.discountFormul.price = Number(item.price)" class="dart-btn dart-btn-secondary mt-4">Задать скидку по формуле</div>
                  </td>
                  <td class="">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <Dropdown v-model="item.typePrice" :options="this.typePrice" optionLabel="name" placeholder="Тип цены" class="mt-2 w-full md:w-14rem" />
                    </div>
                  </td>
                  <td class="center kenost-action-table-td__number">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <InputNumber
                          v-model="this.selected[index].discountInterest"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          max="100"
                          suffix=" %"
                          @update:modelValue="setPrices(index, 'discountInterest', this.selected[index].discountInterest)"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="center kenost-action-table-td__number">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <InputNumber
                          v-model="selected[index].discountInRubles"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          :max="item.price"
                          mode="currency" currency="RUB"
                          @update:modelValue="setPrices(index, 'discountInRubles', this.selected[index].discountInRubles)"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="center kenost-action-table-td__number">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <InputNumber
                          v-model="selected[index].finalPrice"
                          inputId="horizontal-buttons"
                          :step="1"
                          :max="item.price"
                          mode="currency" currency="RUB"
                          min="0"
                          @update:modelValue="setPrices(index, 'finalPrice', this.selected[index].finalPrice)"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__discount-condition">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <Dropdown v-model="item.condition" :options="this.condition" optionLabel="name" placeholder="Условие скидки" class="w-full md:w-14rem" />
                    </div>
                  </td>
                  <td :class="{'kenost-action-table-td__discount-condition' : item.condition.key == 1 || item.condition.key == 2, 'kenost-action-table-td__num' : item.condition.key == 0 || item.condition.key == 3}">
                    <div class="kenost-wiget" v-if="item.condition.key == 1 || item.condition.key == 2">
                      <p>Тип товара</p>
                      <Dropdown v-model="item.conditionInfo.productType" :options="this.productType" optionLabel="name" placeholder="Тип товара" class="w-full md:w-14rem" />
                    </div>
                    <div class="kenost-wiget" v-if="item.condition.key == 0">
                      <p>Кратность</p>
                      <InputNumber
                        v-model="selected[index].conditionInfo.multiplicity"
                        inputId="horizontal-buttons"
                        :step="1"
                        min="0"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                    <div class="kenost-wiget" v-if="item.condition.key == 3">
                      <p>Мин общая сумма</p>
                      <InputNumber
                          v-model="selected[index].conditionInfo.minTotalAmount"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__num">
                    <div class="kenost-wiget" v-if="item.condition.key == 1">
                      <p>Кратность</p>
                      <InputNumber
                          v-model="selected[index].conditionInfo.multiplicity"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                    <div class="kenost-wiget" v-if="item.condition.key == 2">
                      <p>Мин общая сумма</p>
                      <InputNumber
                          v-model="selected[index].conditionInfo.minTotalAmount"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__num">
                    <div class="kenost-wiget" v-if="item.condition.key == 2">
                      <p>Мин общее кол-во SKU</p>
                      <InputNumber
                          v-model="selected[index].conditionInfo.minTotalSKU"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="center kenost-action-table-td__number">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <InputNumber
                          v-model="selected[index].delay"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__discount-condition">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <Dropdown v-model="item.postponementConditions" :options="this.postponementConditions" optionLabel="name" placeholder="Условие отсрочки" class="w-full md:w-14rem" />
                    </div>
                    </td>
                  <td class="kenost-action-table-td__number">
                    <div class="kenost-wiget" v-if="item.postponementConditions.key == 0">
                      <p>Мин общая сумма</p>
                      <InputNumber
                          v-model="selected[index].postponementConditionsInfo.minTotalAmount"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                    <div class="kenost-wiget" v-if="item.postponementConditions.key == 1">
                      <p>Мин кол-во товара</p>
                      <InputNumber
                          v-model="selected[index].postponementConditionsInfo.minQuantity"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__discount-condition">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <Dropdown v-model="item.paymentDelivery" :options="this.paymentDelivery" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                    </div>
                    </td>
                  <td class="kenost-action-table-td__discount-condition">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <Dropdown v-model="item.conditionPaymentDelivery" :options="this.conditionPaymentDelivery" optionLabel="name" placeholder="Условие оплаты доставки" class="w-full md:w-14rem" />
                    </div>
                    </td>
                  <td class="kenost-action-table-td__number">
                    <div class="kenost-wiget">
                      <p>Минимальная общая сумма</p>
                      <InputNumber
                          v-model="selected[index].postponementConditionsInfo.minTotalAmount"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__discount-condition">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <Dropdown v-model="item.conditionPaymentDelivery" :options="this.conditionPaymentDelivery" optionLabel="name" placeholder="Условие оплаты доставки" class="w-full md:w-14rem" />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__discount-condition">
                    <div class="kenost-wiget">
                      <p>&nbsp;</p>
                      <Dropdown v-model="item.shipmentCondition" :options="this.shipmentCondition" optionLabel="name" placeholder="Условие отгрузки" class="w-full md:w-14rem" />
                    </div>
                  </td>
                  <td class="kenost-action-table-td__number">
                    <div class="kenost-wiget">
                      <p>Значение в ₽</p>
                      <InputNumber
                          v-model="selected[index].postponementConditionsInfo.minTotalAmount"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
              </tr>
              <tr>
                  <td class="not-padding center"></td>
                  <td class="not-padding kenost-action-table-td__name"></td>
                  <td class="not-padding center"></td>
                  <td class="not-padding center"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding center kenost-action-table-td__number"></td>
                  <td class="not-padding center kenost-action-table-td__number"></td>
                  <td class="not-padding center kenost-action-table-td__number"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding kenost-action-table-td__discount-condition">
                    <div class="kenost-wiget" v-if="item.condition.key == 1 || item.condition.key == 2">
                      <p>Тип товара</p>
                      <Dropdown v-model="item.conditionInfo.productTypeTwo" :options="this.productType" optionLabel="name" placeholder="Тип товара" class="w-full md:w-14rem" />
                    </div>
                  </td>
                  <td class="not-padding kenost-action-table-td__num">
                    <div class="kenost-wiget" v-if="item.condition.key == 1">
                      <p>Кол-во</p>
                      <InputNumber
                          v-model="selected[index].conditionInfo.quantity"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                    <div class="kenost-wiget" v-if="item.condition.key == 2">
                      <p>Мин общая сумма</p>
                      <InputNumber
                          v-model="selected[index].conditionInfo.minTotalAmountTwo"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="not-padding kenost-action-table-td__num">
                    <div class="kenost-wiget" v-if="item.condition.key == 2">
                      <p>Мин общее кол-во SKU</p>
                      <InputNumber
                          v-model="selected[index].conditionInfo.minTotalAmountTwo"
                          inputId="horizontal-buttons"
                          :step="1"
                          min="0"
                          incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                      />
                    </div>
                  </td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
                  <td class="not-padding"></td>
              </tr>
            </tbody>
        </table>
        </div>
      </div>

      <div class="kenost-all-table-activity">
        <div class="kenost-wiget">
          <p>Массовое действие</p>
          <Dropdown v-model="this.kenostActivityAll.type" :options="this.massAction" optionLabel="name" placeholder="Массовое действие" class="w-full md:w-14rem" />
        </div>
        <div class="kenost-wiget">
          <p>Тип цен</p>
          <Dropdown v-model="this.kenostActivityAll.type_price" :options="this.typePrice" optionLabel="name" placeholder="Тип цен" class="w-full md:w-14rem" />
        </div>
        <div class="kenost-wiget">
          <p>%</p>
          <InputNumber
              v-model="this.kenostActivityAll.value"
              inputId="horizontal-buttons"
              :step="1"
              min="0"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
          />
        </div>
        <div class="kenost-wiget">
          <p>Условие скидки к выбранным товарам</p>
          <Dropdown v-model="this.kenostActivityAll.condition" :options="this.condition" optionLabel="name" placeholder="Условие скидки к выбранным товарам" class="w-full md:w-14rem" />
        </div>
        <div class="kenost-wiget" v-if="this.kenostActivityAll.condition.key == 0">
          <p>Кратность</p>
          <InputNumber
            v-model="this.kenostActivityAll.multiplicity"
            inputId="horizontal-buttons"
            :step="1"
            min="0"
            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
          />
        </div>

        <div v-if="this.kenostActivityAll.condition.key == 1 || this.kenostActivityAll.condition.key == 2">
          <div class="kenost-wiget">
            <p>Тип товара</p>
            <Dropdown v-model="this.kenostActivityAll.productType" :options="this.productType" optionLabel="name" placeholder="Тип товара" class="w-full md:w-14rem" />
          </div>
          <div class="kenost-wiget mt-2">
            <p>Тип товара</p>
            <Dropdown v-model="this.kenostActivityAll.productTypeTwo" :options="this.productType" optionLabel="name" placeholder="Тип товара" class="w-full md:w-14rem" />
          </div>
        </div>
        <div v-if="this.kenostActivityAll.condition.key == 1">
          <div class="kenost-wiget">
            <p>Кратность</p>
            <InputNumber
              v-model="this.kenostActivityAll.multiplicity"
              inputId="horizontal-buttons"
              :step="1"
              min="0"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div class="kenost-wiget mt-2">
            <p>Кол-во</p>
            <InputNumber
              v-model="this.kenostActivityAll.quantity"
              inputId="horizontal-buttons"
              :step="1"
              min="0"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            />
          </div>
        </div>
        <div v-if="this.kenostActivityAll.condition.key == 2">
          <div class="kenost-wiget">
            <p>Мин общая сумма</p>
            <InputNumber
              v-model="this.kenostActivityAll.minTotalAmount"
              inputId="horizontal-buttons"
              :step="1"
              min="0"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div class="kenost-wiget mt-2">
            <p>Мин общая сумма</p>
            <InputNumber
              v-model="this.kenostActivityAll.minTotalAmountTwo"
              inputId="horizontal-buttons"
              :step="1"
              min="0"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            />
          </div>
        </div>
        <div v-if="this.kenostActivityAll.condition.key == 2">
          <div class="kenost-wiget">
            <p>Мин общее кол-во SKU</p>
            <InputNumber
              v-model="this.kenostActivityAll.minTotalSKU"
              inputId="horizontal-buttons"
              :step="1"
              min="0"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            />
          </div>
          <div class="kenost-wiget mt-2">
            <p>Мин общее кол-во SKU</p>
            <InputNumber
              v-model="this.kenostActivityAll.minTotalSKUTwo"
              inputId="horizontal-buttons"
              :step="1"
              min="0"
              incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
            />
          </div>
        </div>
        <div class="kenost-wiget" v-if="this.kenostActivityAll.condition.key == 3">
          <p>Мин общая сумма</p>
          <InputNumber
            v-model="this.kenostActivityAll.minTotalAmount"
            inputId="horizontal-buttons"
            :step="1"
            min="0"
            incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
          />
        </div>
        <div @click="massActionTable" class="dart-btn dart-btn-primary mt-3"><i class="pi pi-check"></i></div>
      </div>

      <Dialog v-model:visible="this.visible" header="Скидка по формуле" :style="{ width: '25rem' }">
          <div class="kenost-modal-price">
            <div class="kenost-wiget">
              <p>Базовая цена</p>
              <InputNumber
                  v-model="this.discountFormul.price"
                  inputId="horizontal-buttons"
                  :step="1"
                  min="0"
                  disabled
                  mode="currency" currency="RUB"
                  incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              />
            </div>
            <div class="mt-2">—</div>
            <div class="kenost-wiget">
              <p>Значение</p>
              <InputNumber
                  v-model="this.discountFormul.value"
                  inputId="horizontal-buttons"
                  :step="1"
                  min="0"
                  incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              />
            </div>
            <div class="kenost-wiget">
              <p>&nbsp;</p>
              <Dropdown v-model="this.discountFormul.type" :options="this.typeFormul" optionLabel="name" placeholder="" class="w-full md:w-14rem" />
            </div>
          </div>
          <div class="kenost-modal-price__button">
            <div class="dart-btn dart-btn-primary" @click="setDiscountFormul">Подтвердить</div>
          </div>
      </Dialog>

      <div class="dart-form-group picker-wrap mt-4">
        <span class="ktitle">Участники</span>
        <span class="kgraytext mb-3">Выберите компании, которым будет доступна ваша акция</span>
        <!-- <div class="kenost-checkbox-container mb-3">
          <div class="flex align-items-center">
              <Checkbox v-model="availability" inputId="availability1" name="pizza" value="1" />
              <label for="availability1" class="ml-2"> Доступен для розницы </label>
          </div>
          <div class="flex align-items-center">
              <Checkbox v-model="availability" inputId="availability2" name="pizza" value="2" />
              <label for="availability2" class="ml-2"> Доступен для опта </label>
          </div>
        </div> -->

        <div class="PickList">
          <div class="PickList__product">
            <b class="PickList__title">Добавление отдельных компаний</b>
            <div class="PickList__filters">
              <div class="form_input_group input_pl input-parent required">
                <input
                type="text"
                id="filter_name"
                placeholder="Введите артикул или название"
                class="dart-form-control"
                v-model="filter_organizations.name"
                @input="setFilterOrganization('filter')"
                />
                <label for="product_filter_name" class="s-complex-input__label">Введите название компании</label>
                <div class="form_input_group__icon">
                    <i class="d_icon d_icon-search"></i>
                </div>
              </div>
            </div>
            <div class="PickList__products">
              <div class="PickList__el center" v-for="item in this.all_organizations" :key="item.id">
                <img :src="item.image" alt="">
                <div class="PickList__product-info">
                  <div>{{item.name}}</div>
                </div>
                <div @click="selectOrganization(item.id)" class="PickList__select"><i class="pi pi-angle-right"></i></div>
              </div>
            </div>
          </div>

          <div class="PickList__selected">
            <div class="PickList__title mb-4">
              <b>Добавленные компании</b>
            </div>
            <div class="PickList__products">
              <div class="PickList__el center" v-for="(item) in this.all_organizations_selected" :key="item.id">
                <img :src="item.image" alt="">
                  <div class="PickList__info">
                  <div class="PickList__product-info off">
                    <div>{{item.name}}</div>
                  </div>
                </div>
                <div @click="deleteSelectOrganization(item.id)" class="PickList__select"><i class="pi pi-times"></i></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '@/router'
import Calendar from 'primevue/calendar'
import TreeSelect from 'primevue/treeselect'
// import vTable from '../../components/table/v-table'
import Dropdown from 'primevue/dropdown'
import RadioButton from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import Paginate from 'vuejs-paginate-next'
import FileUpload from 'primevue/fileupload'
import Toast from 'primevue/toast'
import InputNumber from 'primevue/inputnumber'
import Dialog from 'primevue/dialog'

export default {
  name: 'ProfileSalesAdd',
  props: { },
  data () {
    return {
      pagination_items_per_page_selected: 25,
      pagination_offset_selected: 0,
      page: 1,
      page_selected: 1,
      total_selected: 0,
      loading: false,
      compatibilityDiscount: 0,
      compatibilityPost: 0,
      availability: [],
      kenost_table_all: [],
      kenost_table: [],
      all_product: [],
      discountFormul: {
        index: 0,
        price: 0,
        value: 0,
        type: { name: '₽', key: 0 }
      },
      visible: false,
      kenostActivityAll: {
        type_price: '',
        value: 0,
        condition: '',
        multiplicity: 0, // Кратность
        multiplicityTwo: 0, // Кратность
        productType: 0, // Тип товара
        productTypeTwo: 0, // Тип товара
        quantity: 0, // Количество
        minTotalAmount: 0, // Мин общая сумма
        minTotalAmountTwo: 0, // Мин общая сумма
        minTotalSKU: 0, // Мин общее кол-во SKU
        minTotalSKUTwo: 0 // Мин общее кол-во SKU
      },
      validation: {
        name: {
          error: false,
          text: 'Пожалуйста, заполните наименование!'
        },
        description: {
          error: false,
          text: 'Пожалуйста, заполните описание!'
        },
        compatibilityDiscount: {
          error: false,
          text: 'Пожалуйста, выберите cовместимость скидок!'
        },
        compatibilityPost: {
          error: false,
          text: 'Пожалуйста, выберите cовместимость отсрочек!'
        },
        dates: {
          error: false,
          text: 'Пожалуйста, укажите даты проведения!'
        },
        selected: {
          error: false,
          text: 'Пожалуйста, добавьте хотя бы 1 товар!'
        }
      },
      files: {},
      filter: {
        name: '',
        category: {}
      },
      filter_organizations: {
        name: '',
        type: [1, 2]
      },
      selected: {},
      products: [],
      total_products: 0,
      per_page: 25,
      all_organizations: [],
      all_organizations_selected: {},
      form: {
      },
      editMode: true,
      get_catalog: [],
      table_data: {
        image: {
          label: 'Фото',
          type: 'image'
        },
        name: {
          label: 'Наименование',
          type: 'link',
          link_to: 'org_matrix_edit',
          link_params: {
            id: this.$route.params.id,
            matrix_id: 'id'
          }
        },
        article: {
          label: 'Артикул',
          type: 'text'
        },
        price: {
          label: 'РРЦ (₽)',
          type: 'text'
        },
        discountInterest: {
          label: 'Скидка в %',
          type: 'number'
        },
        discountInRubles: {
          label: 'Скидка в ₽',
          type: 'number'
        },
        finalPrice: {
          label: 'Цена со скидкой',
          type: 'number'
        }
      },
      award: [
        { name: 'New York' },
        { name: 'Rome' },
        { name: 'London' },
        { name: 'Istanbul' },
        { name: 'Paris' }
      ],
      typePrice: [
        { name: 'Заданная', key: 0 },
        { name: 'Заданная', key: 1 },
        { name: 'Заданная', key: 2 },
        { name: 'Заданная', key: 3 },
        { name: 'Заданная', key: 4 }
      ],
      condition: [
        { name: 'Купи Х товаров по цене Y', key: 0 },
        { name: 'Получи подарок при покупке Х товаров', key: 1 },
        { name: 'Купи на Х рублей - получи Y скидку на выбранный товар', key: 2 },
        { name: 'Купи на Х рублей - получи скидку на Y %', key: 3 }
      ],
      productType: [
        { name: 'Условие', key: 0 },
        { name: 'Подарок', key: 1 },
        { name: 'Товар со скидкой', key: 2 }
      ],
      postponementConditions: [
        { name: 'При покупке на Х рублей получи отсрочку', key: 0 },
        { name: 'При покупке Х товара получи отсрочку на него', key: 1 }
      ],
      paymentDelivery: [
        { name: 'Покупатель', key: 0 },
        { name: 'Компания', key: 1 }
      ],
      conditionPaymentDelivery: [
        { name: 'Купи на Х рублей', key: 0 },
        { name: 'Купи на Х рублей', key: 1 }
      ],
      shipmentCondition: [
        { name: 'Минимальная сумма заказа', key: 0 },
        { name: 'Минимальная сумма заказа', key: 1 }
      ],
      massAction: [
        { name: 'Добавить скидку к выбранным товарам', key: 0 },
        { name: 'Добавить скидку к выбранным товарам', key: 1 }
      ],
      typeFormul: [
        { name: '₽', key: 0 },
        { name: '%', key: 1 }
      ]
    }
  },
  methods: {
    ...mapActions([
      'get_available_products_from_api',
      'set_sales_to_api',
      'get_catalog_from_api',
      'get_all_organizations_from_api'
    ]),
    paginate (obj) {
      this.page_selected = obj.page
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    onUpload (data) {
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          // перечень загруженныйх файлов

          if (response.data.files[0].type_banner === 'max') {
            this.files.max = response.data.files[0]
          } else if (response.data.files[0].type_banner === 'min') {
            this.files.min = response.data.files[0]
          }
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    },
    editNumber (object) {
      this.selected[object.id][object.name] = object.value
      switch (object.name) {
        case 'discountInterest':
          this.selected[object.id].discountInRubles = this.selected[object.id].price / 100 * object.value
          this.selected[object.id].finalPrice = this.selected[object.id].price - this.selected[object.id].discountInRubles
          break
        case 'discountInRubles':
          this.selected[object.id].discountInterest = object.value / this.selected[object.id].price / 100
          this.selected[object.id].finalPrice = this.selected[object.id].price - this.selected[object.id].discountInRubles
          break
        case 'finalPrice':
          this.selected[object.id].discountInRubles = this.selected[object.id].price - object.value
          this.selected[object.id].discountInterest = this.selected[object.id].discountInRubles / this.selected[object.id].price / 100
          break
      }
    },
    setPrices (index, name, value) {
      switch (name) {
        case 'discountInterest':
          this.selected[index].discountInRubles = (Number(this.selected[index].price) / 100) * value
          this.selected[index].finalPrice = Number(this.selected[index].price) - this.selected[index].discountInRubles
          break
        case 'discountInRubles':
          this.selected[index].discountInterest = value / (Number(this.selected[index].price) / 100)
          this.selected[index].finalPrice = Number(this.selected[index].price) - this.selected[index].discountInRubles
          break
        case 'finalPrice':
          this.selected[index].discountInRubles = Number(this.selected[index].price) - value
          this.selected[index].discountInterest = this.selected[index].discountInRubles / (Number(this.selected[index].price) / 100)
          break
      }
    },
    select (id) {
      const product = this.products.find(r => r.id === id)
      product.discountInRubles = 0
      product.discountInterest = 0
      product.finalPrice = Number(product.price)
      product.typePrice = ''
      product.condition = ''
      product.conditionInfo = {
        multiplicity: 0, // Кратность
        multiplicityTwo: 0, // Кратность
        productType: 0, // Тип товара
        productTypeTwo: 0, // Тип товара
        quantity: 0, // Количество
        minTotalAmount: 0, // Мин общая сумма
        minTotalAmountTwo: 0, // Мин общая сумма
        minTotalSKU: 0, // Мин общее кол-во SKU
        minTotalSKUTwo: 0 // Мин общее кол-во SKU
      }
      product.delay = 0
      product.postponementConditions = ''
      product.postponementConditionsInfo = {
        minTotalAmount: 0,
        minQuantity: 0
      }
      product.paymentDelivery = ''
      product.conditionPaymentDelivery = 0
      product.shipmentCondition = 0

      this.selected[product.id] = product
      this.products = this.products.filter((r) => r.id !== id)
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
      this.total_selected++
    },
    deleteSelect (id) {
      this.products.push(this.selected[id])

      // eslint-disable-next-line camelcase
      const new_selected = {}

      for (let i = 0; i < Object.keys(this.selected).length; i++) {
        if (this.selected[Object.keys(this.selected)[i]].id !== id) {
          new_selected[Object.keys(this.selected)[i]] = this.selected[Object.keys(this.selected)[i]]
        }
      }

      // eslint-disable-next-line camelcase
      this.selected = new_selected

      // this.selected = this.selected.filter((r) => r.id !== id)
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
      this.total_selected--
    },
    pagClickCallback (pageNum) {
      this.page = pageNum
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    selectOrganization (id) {
      const organization = this.all_organizations.find(r => r.id === id)
      this.all_organizations_selected[organization.id] = organization
      this.all_organizations = this.all_organizations.filter((r) => r.id !== id)
    },
    deleteSelectOrganization (id) {
      this.all_organizations.push(this.all_organizations_selected[id])
      // eslint-disable-next-line camelcase
      const new_all_organizations_selected = {}

      for (let i = 0; i < Object.keys(this.all_organizations_selected).length; i++) {
        if (this.all_organizations_selected[Object.keys(this.all_organizations_selected)[i]].id !== id) {
          new_all_organizations_selected[Object.keys(this.all_organizations_selected)[i]] = this.all_organizations_selected[Object.keys(this.all_organizations_selected)[i]]
        }
      }

      // eslint-disable-next-line camelcase
      this.all_organizations_selected = new_all_organizations_selected
    },
    setFilter () {
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    setFilterOrganization () {
      const data = { filter: this.filter_organizations }
      this.get_all_organizations_from_api(data).then(
        this.all_organizations = this.allorganizations
      )
    },
    saveData () {
      this.selected = this.available_products.products[1]
    },
    formSubmit (event) {
      let stop = false

      if (!this.form.name) {
        this.validation.name.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.name.error = false
      }

      if (!this.form.description) {
        this.validation.description.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.description.error = false
      }

      if (this.compatibilityDiscount === 0) {
        this.validation.compatibilityDiscount.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.compatibilityDiscount.error = false
      }

      if (this.compatibilityPost === 0) {
        this.validation.compatibilityPost.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.compatibilityPost.error = false
      }

      if (!this.form.dates) {
        this.validation.dates.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.dates.error = false
      }

      if (this.total_selected === 0) {
        this.validation.selected.error = true
        // eslint-disable-next-line no-unused-vars
        stop = true
      } else {
        this.validation.selected.error = false
      }

      if (!stop) {
        this.$load(async () => {
          await this.set_sales_to_api({
            action: 'set',
            type: 'b2b',
            id: router.currentRoute._value.params.id,
            name: this.form.name,
            description: this.form.description,
            compatibilityDiscount: this.compatibilityDiscount,
            compatibilityPost: this.compatibilityPost,
            dates: this.form.dates,
            products: this.selected,
            organizations: this.all_organizations_selected,
            files: this.files
          })
            .then((result) => {
              this.loading = false
              router.push({ name: 'org_sales', params: { id: router.currentRoute._value.params.id } })
            })
            .catch((result) => {
              console.log(result)
            })
        })
        this.loading = true
      }
    },
    kenostTableCheckedAll () {
      if (this.kenost_table_all.length === 0) {
        this.kenost_table = []
        for (let i = 0; i < Object.keys(this.selected).length; i++) {
          this.kenost_table.push(this.selected[Object.keys(this.selected)[i]].id)
          // console.log(this.selected[Object.keys(this.selected)[i]])
        }
      } else {
        this.kenost_table = []
      }
    },
    setDiscountFormul () {
      if (this.discountFormul.type) {
        if (this.discountFormul.type.key === 0) {
          if (this.discountFormul.value) {
            this.selected[this.discountFormul.index].discountInRubles = this.discountFormul.value
            this.selected[this.discountFormul.index].discountInterest = this.discountFormul.value / (this.discountFormul.price / 100)
            this.selected[this.discountFormul.index].finalPrice = this.discountFormul.price - this.discountFormul.value
          }
        } else if (this.discountFormul.type.key === 1) {
          if (this.discountFormul.value) {
            this.selected[this.discountFormul.index].discountInRubles = (this.discountFormul.price / 100) * this.discountFormul.value
            this.selected[this.discountFormul.index].discountInterest = this.discountFormul.value
            this.selected[this.discountFormul.index].finalPrice = this.discountFormul.price - (this.discountFormul.price / 100) * this.discountFormul.value
          }
        }
        this.visible = false
      }
    },
    massActionTable () {
      console.log(this.kenost_table)
      console.log(this.kenostActivityAll.type)
      for (let i = 0; i < this.kenost_table.length; i++) {
        this.selected[this.kenost_table[i]].condition = this.kenostActivityAll.condition
        this.selected[this.kenost_table[i]].typePrice = this.kenostActivityAll.type_price

        this.selected[this.kenost_table[i]].discountInterest = this.kenostActivityAll.value
        this.selected[this.kenost_table[i]].discountInRubles = (Number(this.selected[this.kenost_table[i]].price) / 100) * this.kenostActivityAll.value
        this.selected[this.kenost_table[i]].finalPrice = Number(this.selected[this.kenost_table[i]].price) - (Number(this.selected[this.kenost_table[i]].price) / 100) * this.kenostActivityAll.value

        this.selected[this.kenost_table[i]].conditionInfo = {
          multiplicity: this.kenostActivityAll.multiplicity, // Кратность
          multiplicityTwo: this.kenostActivityAll.multiplicityTwo, // Кратность
          productType: this.kenostActivityAll.productType, // Тип товара
          productTypeTwo: this.kenostActivityAll.productTypeTwo, // Тип товара
          quantity: this.kenostActivityAll.quantity, // Количество
          minTotalAmount: this.kenostActivityAll.minTotalAmount, // Мин общая сумма
          minTotalAmountTwo: this.kenostActivityAll.minTotalAmountTwo, // Мин общая сумма
          minTotalSKU: this.kenostActivityAll.minTotalSKU, // Мин общее кол-во SKU
          minTotalSKUTwo: this.kenostActivityAll.minTotalSKUTwo // Мин общее кол-во SKU
        }
      }
    }
  },
  mounted () {
    this.get_available_products_from_api({ filter: '', selected: [], page: this.page }).then(
      this.products = this.available_products.products
    )
    this.get_catalog_from_api().then(
      this.get_catalog = this.getcatalog
    )
    const data = { filter: this.filter_organizations }
    this.get_all_organizations_from_api(data).then(
      this.all_organizations = this.allorganizations
    )
  },
  components: { Calendar, TreeSelect, RadioButton, Paginate, FileUpload, Toast, Checkbox, Dropdown, InputNumber, Dialog },
  computed: {
    ...mapGetters([
      'available_products',
      'getcatalog',
      'allorganizations'
    ]),
    pagesCount () {
      let pages = Math.round(this.total_products / this.per_page)
      if (pages === 0) {
        pages = 1
      }
      return pages
    }
  },
  watch: {
    getcatalog: function (newVal, oldVal) {
      this.get_catalog = newVal
    },
    available_products: function (newVal, oldVal) {
      this.products = newVal.products
      this.total_products = newVal.total
    },
    allorganizations: function (newVal, oldVal) {
      this.all_organizations = newVal
    }
  }
}
</script>

<style lang="scss">

  .kenost-modal-price{
    display: flex;
    align-items: center;
    gap: 10px;

    .p-inputnumber{
      width: 104px;
    }

    .p-dropdown{
      width: 74px;
    }

    &__button{
      display: flex;
      justify-content: flex-end;
      margin-top: 24px;
    }
  }

  .kenost-wiget{
    p{
      color: #A0A0A0;
      font-weight: 400;
      font-size: 12px;
      margin: 0;
    }
  }

  .kenost-all-table-activity{
    display: flex;
    gap: 8px;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;

    .p-dropdown{
      width: 290px;
    }

    .p-inputnumber{
      width: 104px;
    }
  }

  .selectedProductsTable{
    width: 100%;
    overflow-x: auto;
  }

  .kenost-th{
    &__name{
      width: 300px;
    }

    &__price{
      width: 70px;
    }

    &__formula{
      width: 255px;
    }

    &__typePrice{
      width: 115px;
    }

    &__number{
      width: 135px;
    }

    &__discount-condition{
      width: 300px;
    }

    &__сheckbox{
      width: 30px;
    }
  }

  .kenost-action-table{
    width: 4252px;

    tbody + tbody{
      border-top: 1px solid #ADADAD;
    }

    .p-dropdown{
      margin: 0 !important;
    }

    td:not(.not-padding){
      padding: 16px 0 0 0;
    }

    td.not-padding{
      padding: 8px 0 16px 0;
    }

    td{
      &.center{
        text-align: center;
      }
    }

    &__name{
      color: #282828;
      font-size: 14px;
      font-weight: 500px;
      padding: 8px 0 24px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1215686275);

      &.center{
        text-align: center;
      }
    }
  }

  .kenost-action-table-td{
    &__name{
      width: 300px;
      display: flex;
      gap: 8px;
      img{
        width: 38px;
        height: 38px !important;
        object-fit: contain;
        border-radius: 5px;
      }
    }

    &__number{
      .p-component{
        width: 85%;
      }
    }

    &__text{
      p{
        margin: 0;
        font-size: 14px;
        font-weight: 400;
        color: #282828;
        line-height: 1;
      }

      span{
        font-size: 12px;
        font-weight: 400;
        color: #ADADAD;
        line-height: 1;
      }
    }

    &__discount-condition{
      .p-dropdown{
        width: 290px !important;
      }
    }

    &__num{
      width: 170px;
      padding: 16px 8px 0 8px !important;

      &.not-padding{
        padding: 0 8px 0 8px !important;
      }
    }
  }

  .kenost-error{
    border: 1px solid #FF0000 !important;
  }

  .kenost-error-text{
    color: #FF0000;
    font-size: 14px;
    margin-top: 4px;
  }

  .kenost-checkbox-container{
    display: flex;
    gap: 16px;
  }

  .kgraytext{
    color: #ADADAD;
    font-size: 14px;
  }

  .radioLabel{
    margin-bottom: 0 !important;
    cursor: pointer;
  }

  .btn-padding{
    padding-left: 55px;
    padding-right: 55px;
  }

  .maintitle{
    font-size: 24px;
    font-weight: 400;
  }

  .ktitle{
    display: block;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 1.3;
    color: #282828;
    margin-bottom: 8px;
  }

  .upload-icon__image{
    background: #D9D9D9;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-top: 16px;
  }

  .upload-banner{
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &__text{
      max-width: 450px;

      span{
        color: #ADADAD;
        font-size: 14px;
      }

      span.ktitle{
        display: block;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 1.3;
        color: #282828;
        margin-bottom: 8px;
      }
    }

    &__image{
      width: 250px;
      height: 250px;
      background: #D9D9D9;
      margin-top: 16px;
      overflow: hidden;

      img{
        width: 100%;
        height: 100% !important;
        object-fit: cover;
      }
    }

    &__banner{
      width: 100%;
      height: 200px;
    }
  }

  .selectedProducts{
    .title{
      display: block;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 1.3;
      color: #282828;
      margin-top: 40px;
    }
  }
  .product-settings{
    margin: 0;
    .item{
      margin-bottom: 30px;
      .p-inputnumber{
        width: 100%;
      }
      input{
        width: 100%;
      }
    }
  }
  .source_list{
    position: relative;
    z-index: 3;
    .filter{
      position: absolute;
      bottom: -95px;
      left: 0;
      right: 15px;
    }
  }
  .p-picklist .p-picklist-list.p-picklist-source{
    padding-top: 75px !important;
  }
  .dart-form-group{
    max-width: 755px;
    &.picker-wrap{
      max-width: 100%;
    }
  }
  .profile-content__title{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .buttons_container{
    display: flex;
    align-items: center;
    .dart-btn + .dart-btn {
        margin-left: 5px;
    }
  }

  .PickList{
    width: 100%;
    display: flex;
    gap: 40px;

    &__title{
      width: 100%;
      display: flex;
      padding: 16px 24px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      font-size: 14px;
      font-weight: 500;
      line-height: 15px;
      justify-content: space-between;
      align-items: center;
    }

    &__product{
      width: 40%;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    &__selected{
      width: 40%;
      border-radius: 5px;
      border: 1px solid rgba(0, 0, 0, 0.12);
    }

    &__products{
      height: 550px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 0 24px 24px 24px;
    }

    &__el{
      display: flex;

      &.center{
        align-items: center
      }

      img{
        width: 85px;
        height: 50px !important;
        object-fit: contain;
      }
    }

    &__product-info{
      width: calc(100% - 85px);

      &.off{
        width: auto;
      }
    }

    &__title-left{
      display: flex;
      align-items: center;
      margin-right: 54px;
      gap: 16px;
      b{
        width: 90px;
        text-align: center;
      }
    }

    &__name{
      width: 80%;
      font-size: 14px;
      line-height: 16px;
      color: #282828;
      margin-bottom: 8px;
    }

    &__article{
      color: #ADADAD;
      font-size: 14px;
      line-height: 16px;
    }

    &__info{
      width: calc(100% - calc(85px + 54px));
      margin-right: 10px;
      display: flex;
      align-items: center;
      align-items: flex-start;
    }

    &__values{
      display: flex;
      gap: 16px;
      .p-inputnumber{
        width: 90px;
      }
    }

    &__select{
      border-radius: 5px;
      width: 44px;
      height: 44px;
      background: #282828;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #FFF;
      cursor: pointer;
    }

    &__price{
      font-size: 14px;
      font-weight: 500;
      color: #282828;
      line-height: 16px;
      margin-top: 8px;
    }

    &__filters{
      padding: 16px 24px;
      display: flex;
      align-items: center;
      gap: 8px;

      .dart-form-group{
        width: 50%;
      }

      .form_input_group {
        width: 100%;
      }

      .form_input_group__icon{
        padding: 0;
        top: 55%;
        right: 10px;
      }
    }
  }
</style>
