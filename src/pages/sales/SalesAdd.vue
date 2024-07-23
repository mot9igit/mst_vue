<template>
    <form @submit.prevent="formSubmit">
        <div class="profile-content__title sticky-element">
            <span class="maintitle">Настройка программы</span>
            <div class="buttons_container">
            <RouterLink :to="{ name: 'org_sales', params: { id: $route.params.id }}" class="dart-btn dart-btn-secondary btn-padding">Отменить</RouterLink>
            <button type="submit" class="dart-btn dart-btn-primary btn-padding" :class="{ 'dart-btn-loading': loading }" :disabled="loading">Добавить</button>
            </div>
        </div>
        <div>
            <div class="dart-form-group mb-4">
                <span class="ktitle">Наименование программы</span>
                <label for="name">Введите наименование, которое будет отражать смысл вашей программы.</label>
                <input v-model="this.form.name" type="text" name="name" placeholder="Укажите название программы" class="dart-form-control mt-2">
            </div>

            <div class="dart-form-group mb-4">
                <div class="upload-banner">
                <div class="upload-banner__text">
                    <span class="ktitle">Большой баннер</span>
                    <span>Загрузить изображение нужно размером не менее 1108х332, соблюдая пропорции. Чтобы не потерялось качество, желательно загружать изображение в два раза больше указанного размера.</span>
                </div>
                <!-- <div class="dart-btn dart-btn-secondary btn-padding">Загрузить</div> -->
                <FileUpload class="kenost-upload-button" mode="basic" name="banner[]" :url="'/rest/file_upload.php?banner=max'" accept="image/*" :maxFileSize="2000000" @upload="onUpload" :auto="true" chooseLabel="Загрузить" />
                </div>
                <div class="upload-banner__image">
                <img :src="files?.max?.original_href" v-if="files?.max?.original_href">
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <div class="upload-banner">
                <div class="upload-banner__text">
                    <span class="ktitle">Малый баннер</span>
                    <span>Загрузить изображение нужно размером не менее 324х161, соблюдая пропорции. Чтобы не потерялось качество, желательно загружать изображение в три раза больше указанного размера.</span>
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

            <div class="dart-form-group mb-4">
                <span class="ktitle">Описание</span>
                <input v-model="this.form.description" type="text" name="description" placeholder="Укажите описание программы" class="dart-form-control">
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Вознаграждение</span>
                <input v-model="this.form.award" type="text" name="award" placeholder="Укажите вознаграждение" class="dart-form-control">
            </div>

            <div class="dart-form-group mb-2">
                <span class="ktitle">Совместимость скидок</span>
                <div class="flex align-items-center mt-3">
                  <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-1" name="compatibilityDiscount" value="1"/>
                  <label for="compatibilityDiscount-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-2" name="compatibilityDiscount" value="2"/>
                <label for="compatibilityDiscount-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-3" name="compatibilityDiscount" value="3"/>
                <label for="compatibilityDiscount-3" class="ml-2 radioLabel">Применяется большая скидка</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityDiscount" inputId="compatibilityDiscount-4" name="compatibilityDiscount" value="4"/>
                <label for="compatibilityDiscount-4" class="ml-2 radioLabel">Складывается с выбранными акциями</label>
                </div>
            </div>

            <div class="dart-form-group mb-4" v-if="this.form.compatibilityDiscount == 3 || this.form.compatibilityDiscount == 4">
              <MultiSelect filter v-model="this.form.bigDiscount" display="chip" :options="this.allAction" optionLabel="name" placeholder="Выберите из списка" class="w-full md:w-20rem kenost-multiselect" />
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Совместимость отсрочек</span>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-1" name="compatibilityPost" value="1"/>
                <label for="compatibilityPost-1" class="ml-2 radioLabel">Совместим со всеми отсрочками</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-2" name="compatibilityPost" value="2"/>
                <label for="compatibilityPost-2" class="ml-2 radioLabel">Не совместим со всеми отсрочками</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-3" name="compatibilityPost" value="3"/>
                <label for="compatibilityPost-3" class="ml-2 radioLabel">Применяется большая отсрочка</label>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Даты проведения</span>
                <Calendar v-model="this.form.dates" selectionMode="range" placeholder="Выберите даты" :manualInput="false" showIcon/>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Срок отгрузки товаров</span>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.typeShipment" inputId="typeShipment-1" name="typeShipment" value="1"/>
                <label for="typeShipment-1" class="ml-2 radioLabel">Определяется данными из отгрузок</label>
                </div>
                <div class="flex align-items-center mt-3">
                  <RadioButton v-model="this.form.typeShipment" inputId="typeShipment-2" name="typeShipment" value="2"/>
                  <label for="typeShipment-2" class="ml-2 radioLabel">Определяется по расчету доставки СДЭК</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.typeShipment" inputId="typeShipment-3" name="typeShipment" value="3"/>
                <label for="typeShipment-3" class="ml-2 radioLabel">Рассчитывается СДЭК от выбранной даты отгрузки</label>
                </div>

                <Calendar class="mt-3" v-if="this.form.typeShipment == 3" v-model="this.form.dateShipment" placeholder="Выберите ближайшую дату отгрузки" :manualInput="false" showIcon/>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Условия отплаты доставки</span>
                <div class="kenost-wiget">
                    <p>Плательщик</p>
                    <Dropdown v-model="this.form.paymentDelivery" :options="this.paymentDelivery" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                </div>
                <div class="two-colums mt-2">
                    <div class="kenost-wiget">
                        <p>Выберите условие оплаты доставки</p>
                        <Dropdown v-model="this.form.conditionPaymentDelivery" :options="this.conditionPaymentDelivery" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                    </div>
                    <div class="kenost-wiget">
                        <p v-if="this.form.conditionPaymentDelivery.key == 1">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.conditionPaymentDelivery.key == 2">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.conditionPaymentDelivery.key == 1 || this.form.conditionPaymentDelivery.key == 2" v-model="this.form.conditionPaymentDeliveryValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Отсрочка</span>
                <div class="postponement">Срок отсрочки платежа: {{this.postponement_period}} дней <div class="postponement__settings" @click="this.modals.delay = !this.modals.delay">Настроить</div></div>
                <div class="postponement__graph">
                    <b>График платежей</b>
                    <p v-for="item in this.form.delay" :key="item.id">— {{item.percent}}% через {{item.day}} дней после отгрузки</p>
                </div>
                <div class="two-colums mt-2">
                    <div class="kenost-wiget">
                        <p>Выберите условие отсрочки</p>
                        <Dropdown v-model="this.form.postponementConditions" :options="this.postponementConditions" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                    </div>
                    <div class="kenost-wiget">
                        <p v-if="this.form.postponementConditions.key == 1">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.postponementConditions.key == 2">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.postponementConditions.key == 1 || this.form.postponementConditions.key == 2" v-model="this.form.postponementConditionsValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

            <div class="dart-form-group mb-4">
              <span class="ktitle">Условие акции</span>
              <div class="kenost-wiget">
                  <Dropdown v-model="this.form.condition" :options="this.condition" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
              </div>
              <div class="two-colums mt-2" v-if="this.form.condition.key == 3 || this.form.condition.key == 4">
                  <div class="kenost-wiget">
                    <p>Минимальная общая сумма</p>
                    <InputNumber
                      v-model="this.form.conditionMinSum"
                      inputId="horizontal-buttons"
                      :step="0.1"
                      min="0"
                      incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                  </div>
                  <div class="kenost-wiget">
                    <p>Минимальное общее кол-во SKU</p>
                    <InputNumber
                      v-model="this.form.conditionMinCount"
                      inputId="horizontal-buttons"
                      :step="0.1"
                      min="0"
                      incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                  </div>
              </div>
            </div>

            <div class="dart-form-group mb-4">
              <div class="flex align-items-center">
                <Checkbox v-model="this.form.not_sale_client" inputId="not_sale_client-1" name="not_sale_client-1" value="true" />
                <label for="not_sale_client-1" class="ml-2 mb-0">Не действует скидка клиента</label>
              </div>
            </div>

              <div class="dart-form-group picker-wrap">
                <span class="ktitle">Добавление товаров</span>
                <div class="flex align-items-center mt-2">
                  <RadioButton v-model="this.form.addProductType" inputId="addProductType-1" name="addProductType" value="1"/>
                  <label for="addProductType-1" class="ml-2 radioLabel">Добавить товары</label>
                </div>
                <div class="flex align-items-center mt-3">
                    <RadioButton v-model="this.form.addProductType" inputId="addProductType-2" name="addProductType" value="2"/>
                    <label for="addProductType-2" class="ml-2 radioLabel">Загрузить товары файлом</label>
                </div>
                <div class="flex align-items-center mt-3">
                    <RadioButton v-model="this.form.addProductType" inputId="addProductType-3" name="addProductType" value="3"/>
                    <label for="addProductType-3" class="ml-2 radioLabel">Добавить комплекты</label>
                </div>
              </div>

                <div v-if="this.form.addProductType == '2'" class="dart-form-group mb-4">
                  <DropZone
                    v-if="!this.upload_product"
                    class="kenost-dropzone"
                    :maxFiles="Number(1)"
                    url="/rest/file_upload.php?upload_products=xlsx"
                    :uploadOnDrop="true"
                    :multipleUpload="true"
                    :acceptedFiles="['xls', 'xlsx']"
                    :parallelUpload="1"
                    @sending="parseFile"
                    v-bind="args"
                    >
                    <template v-slot:message>
                      <div class="kenost-dropzone__custom">
                        <i class="pi pi-cloud-upload"></i>
                        <b>Перетащите файл в эту область</b>
                        <p>Вы также можете загрузить файл, <span>нажав сюда</span></p>
                      </div>
                    </template>
                  </DropZone>

                  <div class="kenost-upload-xlsx" v-if="this.upload_product">
                    <div class="kenost-upload-xlsx__file">
                      <img src="../../../public/img/files/xls.png" alt="">
                      <a targer="_blank" :href="files?.xlsx?.original_href">{{ files?.xlsx?.name }}</a>
                    </div>
                    <div class="kenost-upload-xlsx__info">
                      <p>Загружено товаров: {{Object.keys(this.selected).length}} шт</p>
                      <p>Всего товаров: {{Object.keys(this.selected).length + error_product.length}} шт</p>
                      <div class="kenost-link-blue" @click="this.modals.error_product = true">Список незагруженных товаров</div>
                    </div>
                  </div>

                  <a :href="site_url_prefix + '/assets/files/files/examples/ExampleLoadingProducts.xlsx'" class="kenost-link-blue mt-2">Скачать шаблон файла</a>
                </div>
                <div v-if="this.form.addProductType == '1'" class="flex align-items-center kenost-gray-p">
                  <Checkbox @change="setAllProducts" v-model="this.form.is_all_products" inputId="is_all_products-1" name="is_all_products-1" value="true" />
                  <label for="is_all_products-1" class="ml-2 mb-0">Добавить все товары</label>
                </div>

                <div v-if="this.form.addProductType == '1' && this.form.is_all_products.length == 0" class="PickList mt-3">
                    <div class="PickList__product" :style="{ width: '40%' }">
                        <div class="PickList__title">
                          <b>Доступные товары</b>
                        </div>
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
                            <img :src="item.image" alt="">
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

                    <div class="PickList__selected" :style="{ width: '40%' }">
                      <div class="PickList__title mb-4">
                      <b>Добавленные товары</b>
                      </div>
                      <div class="PickList__products">
                      <div class="PickList__el" v-for="(item) in this.selected" :key="item.id">
                          <img :src="item.image" alt="">
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

                <div v-if="this.form.addProductType == '3'" class="PickList mt-3">
                    <div class="PickList__product" :style="{ width: '40%' }">
                        <b class="PickList__title">Ваши комплекты</b>
                        <div class="PickList__filters">
                        <div class="form_input_group input_pl input-parent required">
                            <input
                            type="text"
                            id="filter_name"
                            placeholder="Введите артикул или название"
                            class="dart-form-control"
                            v-model="this.filter_complects"
                            @input="setFilterComplects()"
                            />
                            <label for="product_filter_name" class="s-complex-input__label">Введите название</label>
                            <div class="form_input_group__icon">
                                <i class="d_icon d_icon-search"></i>
                            </div>
                        </div>
                        </div>
                        <div class="PickList__products">
                          <div class="PickList__el" v-for="item in this.complects" :key="item.id">
                            <img :src="item.image" alt="">
                            <div class="PickList__product-info">
                              <div class="PickList__name">{{item.name}}</div>
                              <div class="PickList__article">{{item.articles}}</div>
                              <div class="PickList__price">{{Number(item.cost).toFixed(0)}} ₽</div>
                            </div>
                          <div @click="selectComplect(item.id)" class="PickList__select"><i class="pi pi-angle-right"></i></div>
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

                    <div class="PickList__selected" :style="{ width: '40%' }">
                      <div class="PickList__title mb-4">
                      <b>Добавленные комплекты</b>
                      </div>
                      <div class="PickList__products">
                      <div class="PickList__el" v-for="(item) in this.selected_complects" :key="item.id">
                        <img :src="item.image" alt="">
                          <div class="PickList__info">
                          <div class="PickList__product-info off">
                            <div class="PickList__name">{{item.name}}</div>
                              <div class="PickList__article">{{item.articles}}</div>
                              <div class="PickList__price">{{Number(item.cost).toFixed(0)}} ₽</div>
                          </div>
                          </div>
                          <div @click="deleteSelectComplect(item.id)" class="PickList__select"><i class="pi pi-times"></i></div>
                      </div>
                      </div>
                    </div>
                </div>

                <div v-if="this.form.addProductType != '3'" class="table-kenost mt-4" :class="{ loading: table_products_loading }">
                  <p class="table-kenost__title">Таблица добавленных товаров</p>
                  <div class="table-kenost__filters">
                    <div class="table-kenost__filters-left">
                      <div class="form_input_group input_pl input-parent required">
                          <input
                          type="text"
                          id="filter_table"
                          placeholder="Введите артикул или название"
                          class="dart-form-control"
                          v-model="filter_table.name"
                          @input="setFilter('filter')"
                          />
                          <label for="product_filter_name" class="s-complex-input__label">Введите артикул или название</label>
                          <div class="form_input_group__icon">
                              <i class="d_icon d_icon-search"></i>
                          </div>
                      </div>
                      <div class="dart-form-group">
                          <TreeSelect label="name" v-model="this.filter_table.category" :options="this.opt_catalog_tree" selectionMode="checkbox" placeholder="Выберите категорию" class="w-full" @change="setFilter"/>
                      </div>
                    </div>
                    <!-- <div @click="createSet" class="dart-btn dart-btn-primary btn-padding">Создать комплект</div> -->
                  </div>
                  <table class="table-kenost__table">
                    <thead>
                        <tr>
                            <th class="table-kenost__name table-kenost__name-checkbox"><Checkbox @update:modelValue="kenostTableCheckedAll" v-model="this.kenost_table_all" inputId="kenost_table_all" value="1" /></th>
                            <th class="table-kenost__name table-kenost__name-product">Товар</th>
                            <th class="table-kenost__name">РРЦ (₽)</th>
                            <th class="table-kenost__name">Скидка %</th>
                            <th class="table-kenost__name">Цена со скидкой за шт.</th>
                            <th class="table-kenost__name">Кратность</th>
                            <th class="table-kenost__name">Сумма</th>
                            <th class="table-kenost__name">Действие</th>
                        </tr>
                    </thead>
                    <tbody v-for="item in this.selected" :key="item.id">
                      <tr v-if="item.hide">
                        <td class="table-kenost__checkbox">
                          <Checkbox v-model="this.kenost_table" inputId="kenost_table" :value="item.id" />
                        </td>
                        <td class="table-kenost__product">
                          <img :src="item.image">
                          <div class="table-kenost__product-text">
                            <p>{{ item.name }}</p>
                            <span>{{item.article}}</span>
                          </div>
                        </td>
                        <td>
                          {{(Number(item.price).toFixed(0)).toLocaleString('ru')}} ₽
                        </td>
                        <td>
                          {{(Number(item.discountInterest).toFixed(2)).toLocaleString('ru')}}
                        </td>
                        <td>
                          {{(Number(item.finalPrice).toFixed(0)).toLocaleString('ru')}} ₽
                          <p class="table-kenost__settings" @click="this.modals.price = true; this.modals.product_id = item.id;">Настроить</p>
                        </td>
                        <td>
                          <Counter :key="new Date().getMilliseconds() + item.id" class="margin-auto" @ElemCount="ElemCount" :id="item.id" :min="1" :value="item.multiplicity"/>
                        </td>
                        <td>
                          {{(Number(item.finalPrice).toFixed(0)).toLocaleString('ru') * item.multiplicity}} ₽
                        </td>
                        <td>
                          <div class="kenost-basker-delete">
                            <div class="kenost-basker-delete__button" @click="deleteSelect(item.id)">
                              <i class="pi pi-trash"></i>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <paginate
                    :page-count="pagesCountSelect"
                    :click-handler="pagClickCallbackSelect"
                    :prev-text="'Пред'"
                    :next-text="'След'"
                    :container-class="'pagination justify-content-center'"
                    :initialPage="this.page_selected"
                    :forcePage="this.page_selected"
                    >
                  </paginate>
                </div>

                <div class="kenost-all-table-activity" v-if="this.form.addProductType == '1' || this.form.addProductType == '2'">
                  <div class="kenost-wiget">
                    <p>Массовое действие</p>
                    <Dropdown v-model="this.kenostActivityAll.type" :options="this.massAction" optionLabel="name" placeholder="Массовое действие" class="w-full md:w-14rem" />
                  </div>
                  <div class="kenost-wiget" v-if="this.kenostActivityAll.type.key == 0 || this.kenostActivityAll.type.key == 1">
                    <p>Тип цен</p>
                    <Dropdown v-model="this.kenostActivityAll.typePrice" :options="this.typePrice" optionLabel="name" placeholder="Тип цен" class="w-full md:w-14rem" />
                  </div>
                  <div class="kenost-wiget" v-if="this.kenostActivityAll.type.key == 0">
                    <p>Значение</p>
                    <InputNumber
                      v-model="this.kenostActivityAll.value"
                      inputId="horizontal-buttons"
                      :step="1"
                      min="0"
                      incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                  </div>
                  <div class="kenost-wiget" v-if="this.kenostActivityAll.type.key == 0">
                    <p>&nbsp;</p>
                    <Dropdown v-model="kenostActivityAll.typeFormul" :options="this.typeFormul" optionLabel="name" class="w-full md:w-14rem" />
                  </div>

                  <div class="kenost-wiget" v-if="this.kenostActivityAll.type.key == 3">
                    <p>Значение</p>
                    <InputNumber
                      v-model="this.kenostActivityAll.multiplicity"
                      inputId="horizontal-buttons"
                      :step="1"
                      min="1"
                      incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                  </div>

                  <div v-if="this.kenostActivityAll.type.key == 0 || this.kenostActivityAll.type.key == 1 || this.kenostActivityAll.type.key == 2 || this.kenostActivityAll.type.key == 3" @click="massActionTable" class="dart-btn dart-btn-primary mt-3"><i class="pi pi-check"></i></div>
                </div>

                <div class="dart-form-group mt-4">
                  <span class="ktitle">Участники</span>
                  <div class="flex align-items-center mt-2">
                    <RadioButton v-model="this.form.participantsType" inputId="participantsType-1" name="participantsType" value="1"/>
                    <label for="participantsType-1" class="ml-2 radioLabel">Выбрать регион</label>
                  </div>
                  <div class="flex align-items-center mt-3">
                    <RadioButton v-model="this.form.participantsType" inputId="participantsType-2" name="participantsType" value="2"/>
                    <label for="participantsType-2" class="ml-2 radioLabel">Выбрать отдельные компании</label>
                  </div>
                  <div class="flex align-items-center mt-3">
                    <RadioButton v-model="this.form.participantsType" inputId="participantsType-3" name="participantsType" value="3"/>
                    <label for="participantsType-3" class="ml-2 radioLabel">Неограниченный круг участников</label>
                  </div>
                </div>

                <div class="dart-form-group">
                  <div v-if="this.form.participantsType == '1'" class="kenost-select-reginos">
                    <p class="kenost-select-reginos__title">Выбор участников по регионам</p>
                    <p class="kenost-select-reginos__gray">Акция будет доступна в том числе для новых компаний из выбранного региона</p>
                    <div class="kenost-select-reginos__checkboxs">
                      <div class="flex align-items-center">
                        <Checkbox v-model="this.form.available_stores" inputId="access-1" name="access-1" value="true" />
                        <label for="access-1" class="ml-2"> Доступно для магазинов </label>
                      </div>
                      <div class="flex align-items-center">
                        <Checkbox v-model="this.form.available_opt" inputId="access-2" name="access-1" value="true" />
                        <label for="access-2" class="ml-2"> Доступно для оптовых компаний </label>
                      </div>
                      <div class="flex align-items-center">
                        <Checkbox v-model="this.form.available_vendors" inputId="access-3" name="access-1" value="true" />
                        <label for="access-3" class="ml-2"> Доступно для производителей </label>
                      </div>
                    </div>
                  <MultiSelect filter v-model="this.regions_select" display="chip" :options="this.regions_all" optionLabel="name" placeholder="Выберите регионы"
                   class="w-full md:w-20rem kenost-multiselect" />
                  </div>
                </div>

                <div class="PickList" v-if="this.form.participantsType == '2'">
                  <div class="PickList__product" :style="{ width: '40%' }">
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

                  <div class="PickList__selected" :style="{ width: '40%' }">
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

            <div class="dart-form-group mt-4">
              <span class="ktitle">Ограничения</span>
              <div class="flex align-items-center mt-2">
                <RadioButton v-model="this.form.limitations" inputId="limitations-1" name="limitations" value="1"/>
                <label for="limitations-1" class="ml-2 radioLabel">Без ограничений</label>
              </div>
              <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.limitations" inputId="limitations-2" name="limitations" value="2"/>
                <label for="limitations-2" class="ml-2 radioLabel">Ограничить по сумме</label>
              </div>
            </div>

            <div class="kenost-wiget" v-if="this.form.limitations == '2'">
              <p>Значение</p>
              <InputNumber
                v-model="this.form.limitationValue"
                inputId="horizontal-buttons"
                :step="0.1"
                min="0"
                incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
              />
            </div>
        </div>
    </form>
    <Dialog v-model:visible="this.modals.delay" header="Настройка отсрочки платежа" :style="{ width: '800px' }">
        <div class="kenost-modal-price">
            <div class="two-colums mt-2" v-for="(item, index) in this.form.delay" :key="item.id">
                <div class="kenost-wiget">
                    <p>Процент от суммы заказа</p>
                    <InputNumber
                        v-model="this.form.delay[index].percent"
                        inputId="horizontal-buttons"
                        :step="0.1"
                        min="0"
                        max="100"
                        suffix=" %"
                        @update:modelValue="delayUpdate"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                </div>
                <div class="kenost-wiget">
                    <p>Срок отсрочки платежа в календарных днях</p>
                    <InputNumber
                        v-model="this.form.delay[index].day"
                        inputId="horizontal-buttons"
                        :step="0.1"
                        min="0"
                        @update:modelValue="delayUpdate"
                        incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                    />
                </div>
            </div>
            <div class="kenost-modal-price__button kenost-modal-price__flex">
                <div class="kenost-add-button" @click="this.form.delay.push({percent: 0, day: 0})"><i class="pi pi-plus"></i> Добавить срок</div>
                <div class="dart-btn dart-btn-primary" :class="{ 'kenots-button-stop': delayPercentSum > 100 || delayPercentSum < 100 }" @click="delayPercentSum == 100 ? this.modals.delay = !this.modals.delay : ''">
                    Подтвердить
                    <div class="kenots-button-stop__text">Сумма процентов должна составлять 100</div>
                </div>
            </div>
        </div>
    </Dialog>

    <Dialog v-model:visible="this.modals.error_product" header="Список незагруженных товаров" :style="{ width: '640px' }">
        <div class="kenost-list-error">
          <table>
            <tr>
              <th>№</th>
              <th>Артикул</th>
            </tr>
            <tr v-for="item, index in this.error_product" :key="item.id">
              <td>{{index + 1}}</td>
              <td>{{item}}</td>
            </tr>
          </table>
        </div>
    </Dialog>

    <Dialog v-model:visible="this.modals.price" :header="this.modals.headers[this.modals.price_step]" :style="{ width: '600px' }">
        <div class="kenost-modal-price">
            <div class="product-kenost-card">
              <img :src="this.selected[this.modals.product_id]?.image">
              <div class="product-kenost-card__text">
                <p>{{ this.selected[this.modals.product_id]?.name }}</p>
                <span>{{this.selected[this.modals.product_id]?.article}}</span>
              </div>
            </div>
            <div class="kenost-method-edit-flex" v-if="this.modals.price_step == 0">
              <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.modals.type_price" inputId="type_price-1" name="type_price" value="1"/>
                <label for="type_price-1" class="ml-2 radioLabel">Скидка по формуле</label>
              </div>
              <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.modals.type_price" inputId="type_price-2" name="type_price" value="2"/>
                <label for="type_price-2" class="ml-2 radioLabel">Тип цен</label>
              </div>
              <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.modals.type_price" inputId="type_price-3" name="type_price" value="3"/>
                <label for="type_price-3" class="ml-2 radioLabel">Задать вручную</label>
              </div>
            </div>

            <div v-if="this.modals.price_step == 1" class="two-colums mt-3">
              <div class="kenost-wiget">
                  <p>Тип цены</p>
                  <Dropdown @change="setDiscountFormul(this.selected[this.modals.product_id].typeFormul, this.saleValue, this.selected[this.modals.product_id].typePrice)" v-model="this.selected[this.modals.product_id].typePrice" :options="this.selected[this.modals.product_id].prices" optionLabel="name" class="w-full md:w-14rem" />
              </div>
              <div class="kenost-wiget-two">
                <div class="kenost-wiget">
                  <p>Значение</p>
                  <InputNumber
                    v-model="this.saleValue"
                    inputId="horizontal-buttons"
                    :step="0.1"
                    min="0"
                    @update:modelValue="setDiscountFormul(this.selected[this.modals.product_id].typeFormul, this.saleValue, this.selected[this.modals.product_id].typePrice)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  />
                </div>
                <div class="kenost-wiget">
                  <p>&nbsp;</p>
                  <Dropdown @change="setDiscountFormul(this.selected[this.modals.product_id].typeFormul, this.saleValue, this.selected[this.modals.product_id].typePrice)" v-model="this.selected[this.modals.product_id].typeFormul" :options="this.typeFormul" optionLabel="name" class="w-full md:w-14rem" />
                </div>
              </div>
            </div>

            <div v-if="this.modals.price_step == 2" class="two-colums mt-3">
              <div class="kenost-wiget">
                  <p>Тип цены</p>
                  <Dropdown @change="setTypePrice()" v-model="this.selected[this.modals.product_id].typePrice" :options="this.selected[this.modals.product_id].prices" optionLabel="name" class="w-full md:w-14rem" />
              </div>
            </div>

            <div v-if="this.modals.price_step == 3" class="two-colums mt-3">
              <div class="kenost-wiget">
                <p>Скидка в %</p>
                <InputNumber
                    v-model="this.selected[this.modals.product_id].discountInterest"
                    inputId="horizontal-buttons"
                    :step="1"
                    min="0"
                    max="100"
                    suffix=" %"
                    @update:modelValue="setPrices(this.modals.product_id, 'discountInterest', this.selected[this.modals.product_id].discountInterest)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
              </div>
              <div class="kenost-wiget">
                <p>Скидка в ₽</p>
                <InputNumber
                    v-model="selected[this.modals.product_id].discountInRubles"
                    inputId="horizontal-buttons"
                    :step="1"
                    min="0"
                    :max="selected[this.modals.product_id].price"
                    mode="currency" currency="RUB"
                    @update:modelValue="setPrices(this.modals.product_id, 'discountInRubles', this.selected[this.modals.product_id].discountInRubles)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
              </div>
              <div class="kenost-wiget">
                <p>Цена со скидкой</p>
                <InputNumber
                    v-model="selected[this.modals.product_id].finalPrice"
                    inputId="horizontal-buttons"
                    :step="1"
                    :max="selected[this.modals.product_id].price"
                    mode="currency" currency="RUB"
                    min="0"
                    @update:modelValue="setPrices(this.modals.product_id, 'finalPrice', this.selected[this.modals.product_id].finalPrice)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
              </div>
            </div>

            <div class="kenost-info-line" v-if="this.modals.price_step != 0">
              <p>РРЦ: {{this.selected[this.modals.product_id]?.price}} ₽</p>
              <p>Скидка: {{(this.selected[this.modals.product_id]?.discountInterest).toFixed(2)}} %</p>
              <p>Цена со скидой: {{this.selected[this.modals.product_id]?.finalPrice}} ₽</p>
            </div>

            <div class="kenost-modal-price__button kenost-modal-price__flex">
                <span v-if="this.modals.price_step == 0"></span>
                <div v-if="this.modals.price_step != 0" class="dart-btn dart-btn-secondary btn-padding" @click="this.modals.price_step = 0">
                  Назад
                </div>
                <div class="dart-btn dart-btn-primary btn-padding" @click="closeDialogPrice">
                  {{this.modals.price_step == 0? 'Далее' : 'Готово'}}
                </div>
            </div>
        </div>
    </Dialog>
</template>
<script>

import { mapActions, mapGetters } from 'vuex'
import FileUpload from 'primevue/fileupload'
import Calendar from 'primevue/calendar'
import RadioButton from 'primevue/radiobutton'
import Dropdown from 'primevue/dropdown'
import Dialog from 'primevue/dialog'
import InputNumber from 'primevue/inputnumber'
import TreeSelect from 'primevue/treeselect'
import DropZone from 'dropzone-vue'
import Checkbox from 'primevue/checkbox'
import Counter from '../../components/opt/Counter.vue'
import MultiSelect from 'primevue/multiselect'
import router from '@/router'
import Paginate from 'vuejs-paginate-next'

export default {
  name: 'ProfileSalesAdd',
  props: { },
  data () {
    return {
      table_products_loading: false,
      page: 1,
      page_complects: 1,
      per_complects: 25,
      filter: {
        name: '',
        category: {}
      },
      filter_complects: '',
      filter_table: {
        name: '',
        category: {}
      },
      error_product: [],
      upload_product: false,
      postponement_period: 0,
      selected: {},
      total_selected: -1,
      kenost_table_all: [],
      kenost_table: [],
      products: [],
      complects: [],
      selected_complects: {},
      get_catalog: [],
      opt_catalog_tree: [],
      total_products: 0,
      total_complects: 0,
      saleValue: 0,
      per_page: 25,
      filter_organizations: {
        name: '',
        type: [1, 2]
      },
      all_organizations: [],
      all_organizations_selected: {},
      page_selected: 1,
      regions: [],
      regions_all: [],
      regions_select: [],
      form: {
        name: '',
        description: '',
        award: '',
        dates: [],
        compatibilityDiscount: 0,
        compatibilityPost: 0,
        typeShipment: 0,
        dateShipment: '',
        paymentDelivery: { name: 'Покупатель', key: 0 },
        conditionPaymentDelivery: { name: 'Без условий', key: 0 },
        conditionPaymentDeliveryValue: 0,
        postponementConditions: { name: 'Без условий', key: 0 },
        postponementConditionsValue: 0,
        condition: { name: 'Скидка без условий', key: 0 },
        addProductType: '1',
        limitations: '1',
        limitationValue: 0,
        delay: [
          {
            percent: 100,
            day: 0
          }
        ],
        delayPercentSum: 0,
        participantsType: '3',
        available_stores: [],
        available_vendors: [],
        available_opt: [],
        conditionMinCount: 0,
        conditionMinSum: 0,
        bigDiscount: [],
        not_sale_client: [],
        is_all_products: []
      },
      kenostActivityAll: {
        type: {},
        typePrice: {},
        value: 0,
        typeFormul: {},
        discountInterest: 0,
        multiplicity: 1
      },
      modals: {
        delay: false,
        price: false,
        error_product: false,
        price_step: 0,
        type_price: '1',
        product_id: -1,
        headers: [
          'Метод редактирования цены',
          'Скидка по формуле',
          'Тип цен',
          'Скидка вручную'
        ]
      },
      listAction: {},
      files: {
        xlsx: null
      },
      paymentDelivery: [
        { name: 'Покупатель', key: 0 },
        { name: 'Поставщик', key: 1 }
      ],
      conditionPaymentDelivery: [
        { name: 'Без условий', key: 0 },
        { name: 'Купи на Х рублей', key: 1 },
        { name: 'При покупке Х шт товара', key: 2 }
      ],
      postponementConditions: [
        { name: 'Без условий', key: 0 },
        { name: 'При покупке на Х рублей получи отсрочку', key: 1 },
        { name: 'При покупке Х товара получи отсрочку на него', key: 2 }
      ],
      condition: [
        { name: 'Скидка без условий', key: 0 },
        { name: 'Купи Х товаров по цене Y', key: 1 },
        { name: 'Получи подарок при покупке Х товаров', key: 2 },
        { name: 'Купи на Х рублей - получи Y скидку на выбранный товар', key: 3 },
        { name: 'Купи на Х рублей - получи скидку на Y %', key: 4 }
      ],
      typeFormul: [
        { name: '₽', key: 0 },
        { name: '%', key: 1 }
      ],
      typePrice: [
      ],
      massAction: [
        { name: 'Скидка по формуле', key: 0 },
        { name: 'Тип цен', key: 1 },
        { name: 'Кратность', key: 3 }
      ]
    }
  },
  methods: {
    ...mapActions([
      'get_available_products_from_api',
      'get_catalog_from_api',
      'get_all_organizations_from_api',
      'get_regions_from_api',
      'set_sales_to_api',
      'opt_get_complects',
      'opt_upload_products_file',
      'get_all_sales_to_api',
      'opt_get_prices',
      'opt_get_remain_prices',
      'get_opt_catalog_tree_from_api'
    ]),
    onUpload (data) {
      if (data.xhr.response) {
        const response = JSON.parse(data.xhr.response)
        if (Object.prototype.hasOwnProperty.call(response.data, 'files')) {
          // перечень загруженныйх файлов

          if (response.data.files[0].type_banner === 'max') {
            this.files.max = response.data.files[0]
          } else if (response.data.files[0].type_banner === 'min') {
            this.files.min = response.data.files[0]
          } else if (response.data.files[0].type_banner === 'icon') {
            this.files.icon = response.data.files[0]
          }
        }
      }
      this.$toast.add({ severity: 'info', summary: 'Файлы загружены', detail: 'Файл был успешно загружен', life: 3000 })
    },
    massActionTable () {
      for (let i = 0; i < this.kenost_table.length; i++) {
        switch (this.kenostActivityAll.type.key) {
          case 0:
            this.selected[this.kenost_table[i]].typePrice = this.kenostActivityAll.typePrice
            if (this.kenostActivityAll.typeFormul.key === 0) {
              this.selected[this.kenost_table[i]].finalPrice = Number(this.selected[this.kenost_table[i]].price) - this.kenostActivityAll.value
              this.selected[this.kenost_table[i]].discountInRubles = this.kenostActivityAll.value
              this.selected[this.kenost_table[i]].discountInterest = this.kenostActivityAll.value / (Number(this.selected[this.kenost_table[i]].price) / 100)
            } else {
              this.selected[this.kenost_table[i]].finalPrice = Number(this.selected[this.kenost_table[i]].price) - ((Number(this.selected[this.kenost_table[i]].price) / 100) * this.kenostActivityAll.value)
              this.selected[this.kenost_table[i]].discountInRubles = this.selected[this.kenost_table[i]].finalPrice - Number(this.selected[this.kenost_table[i]].price)
              this.selected[this.kenost_table[i]].discountInterest = this.kenostActivityAll.value
            }
            break
          case 1:
            // this.selected[this.kenost_table[i]].typePrice = this.kenostActivityAll.typePrice
            // eslint-disable-next-line no-case-declarations
            const isPrice = this.selected[this.kenost_table[i]].prices.find(r => r.guid === this.kenostActivityAll.typePrice.key)

            if (isPrice) {
              console.log(this.selected[this.kenost_table[i]])
              this.selected[this.kenost_table[i]].typePrice = this.kenostActivityAll.typePrice
              this.selected[this.kenost_table[i]].finalPrice = isPrice.price
              this.selected[this.kenost_table[i]].discountInRubles = Number(this.selected[this.kenost_table[i]].price) - this.selected[this.kenost_table[i]].finalPrice
              this.selected[this.kenost_table[i]].discountInterest = isPrice.price / (Number(this.selected[this.kenost_table[i]].price) / 100)
            }
            break
          case 3:
            this.selected[this.kenost_table[i]].multiplicity = this.kenostActivityAll.multiplicity
            break
        }
      }
    },
    delayUpdate () {
      this.delayPercentSum = 0
      this.postponement_period = 0
      for (let i = 0; i < this.form.delay.length; i++) {
        this.delayPercentSum += this.form.delay[i].percent
        this.postponement_period = this.postponement_period + (this.form.delay[i].day * (this.form.delay[i].percent / 100))
      }
    },
    parseFile (files, xhr, formData) {
      this.table_products_loading = true
      const callback = (e) => {
        const res = JSON.parse(e)
        this.files.xlsx = res.data.files[0]
        const data = {
          action: 'upload/products/file',
          store_id: router.currentRoute._value.params.id,
          file: res.data.files[0].original,
          type: 'b2b'
        }
        this.opt_upload_products_file(data).then((response) => {
          const productsList = response.data.data.data
          this.selected = {}
          // Бежим по всем элементам и добавляем их в select
          for (let i = 1; i < Object.keys(productsList).length; i++) {
            const tempProduct = productsList[Object.keys(productsList)[i]]
            if (!tempProduct.error) {
              const product = {}
              product.article = tempProduct.A
              if (tempProduct.E === 0 || tempProduct.E === null) {
                product.discountInterest = 100
                product.discountInRubles = '-'
              } else {
                product.discountInRubles = tempProduct.E - tempProduct.D
                product.discountInterest = (tempProduct.E - tempProduct.D) / (tempProduct.E / 100)
              }
              product.finalPrice = tempProduct.D
              product.price = tempProduct.E
              product.id = tempProduct.remain.id
              product.multiplicity = tempProduct.F
              product.image = tempProduct.remain.image
              product.name = tempProduct.remain.name
              product.typeFormul = {}
              product.typePrice = ''
              this.selected[tempProduct.remain.id] = product
              this.total_selected++
            } else {
              this.error_product.push(tempProduct.A)
            }
          }
          this.upload_product = true
          this.table_products_loading = false
        })
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          callback(xhr.response)
        }
      }
    },
    setFilter () {
      this.page_selected = 1
      const data = {
        filter: this.filter,
        filterselected: this.filter_table,
        selected: this.selected,
        pageselected: this.page_selected,
        page: this.page,
        perpage: this.per_page
      }
      this.get_available_products_from_api(data).then((res) => {
        this.kenostTableCheckedAllCheck()
      })
    },
    setAllProducts () {
      const data = {
        filter: this.filter,
        filterselected: this.filter_table,
        selected: this.selected,
        pageselected: this.page_selected,
        page: this.page,
        perpage: this.per_page,
        isallproducts: this.form.is_all_products.length !== 0
      }
      this.get_available_products_from_api(data)
    },
    setFilterComplects () {
      const data = {
        action: 'complects/get',
        filter: this.filter_complects,
        page: this.page_complects,
        perpage: this.pagination_items_per_page_complects,
        store_id: router.currentRoute._value.params.id,
        selected: this.selected_complects
      }
      this.opt_get_complects(data)
    },
    formSubmit (event) {
      this.$load(async () => {
        await this.set_sales_to_api({
          action: 'set',
          type: 'b2b',
          id: router.currentRoute._value.params.id,
          name: this.form.name,
          files: this.files,
          description: this.form.description,
          award: this.form.award,
          compatibilityDiscount: this.form.compatibilityDiscount,
          compatibilityPost: this.form.compatibilityPost,
          dates: [this.form.dates[0].toDateString(), this.form.dates[1].toDateString()],
          shipment_type: this.form.typeShipment,
          shipment_date: this.form.dateShipment,
          payer: this.form.paymentDelivery.key,
          delivery_payment_terms: this.form.conditionPaymentDelivery.key,
          delivery_payment_value: this.form.conditionPaymentDeliveryValue,
          delay: this.postponement_period,
          delay_graph: this.form.delay,
          delay_condition: this.form.postponementConditions.key,
          delay_condition_value: this.form.postponementConditionsValue,
          condition_type: this.form.condition.key,
          condition_min_sum: this.form.conditionMinSum,
          condition_SKU: this.form.conditionMinCount,
          participants_type: this.form.participantsType,
          products: this.selected,
          regions_select: this.regions_select,
          big_sale_actions: this.form.bigDiscount,
          organizations: this.all_organizations_selected,
          method_adding_products: this.form.addProductType,
          complects: this.selected_complects,
          available_stores: this.form.available_stores[0] === 'true',
          available_vendors: this.form.available_vendors[0] === 'true',
          available_opt: this.form.available_opt[0] === 'true',
          not_sale_client: this.form.not_sale_client[0] === 'true',
          is_all_products: this.form.is_all_products.length !== 0,
          limit_sum: this.form.limitationValue,
          limit_type: this.form.limitations
        })
          .then((result) => {
            this.loading = false
            router.push({ name: 'org_sales', params: { id: router.currentRoute._value.params.id } })
          })
          .catch((result) => {
          })
      })
      this.loading = true
      // }
    },
    select (id) {
      const product = this.products.find(r => r.id === id)
      product.discountInterest = 0
      product.discountInRubles = 0
      product.multiplicity = 1
      product.finalPrice = Number(product.price)
      product.typeFormul = {}
      product.typePrice = ''

      const dataProduct = {
        action: 'get/product/prices',
        remain_id: product.id
      }

      this.opt_get_remain_prices(dataProduct).then((res) => {
        product.prices = res.data.data

        this.selected[product.id] = product
        this.products = this.products.filter((r) => r.id !== id)
        const data = {
          filter: this.filter,
          filterselected: this.filter_table,
          selected: this.selected,
          pageselected: this.page_selected,
          page: this.page,
          perpage: this.per_page
        }
        this.get_available_products_from_api(data)
        this.total_selected++
      })
    },
    selectComplect (id) {
      const complect = this.complects.find(r => r.id === id)
      this.selected_complects[complect.id] = complect
      this.complects = this.complects.filter((r) => r.id !== id)
      const data = {
        action: 'complects/get',
        filter: this.filter_complects,
        page: this.page_complects,
        perpage: this.pagination_items_per_page_complects,
        store_id: router.currentRoute._value.params.id,
        selected: this.selected_complects
      }
      this.opt_get_complects(data)
      // this.total_selected++
    },
    deleteSelectComplect (id) {
      this.complects.push(this.selected_complects[id])

      // eslint-disable-next-line camelcase
      const new_selected = {}

      for (let i = 0; i < Object.keys(this.selected_complects).length; i++) {
        if (this.selected_complects[Object.keys(this.selected_complects)[i]].id !== id) {
          new_selected[Object.keys(this.selected_complects)[i]] = this.selected_complects[Object.keys(this.selected_complects)[i]]
        }
      }

      // eslint-disable-next-line camelcase
      this.selected_complects = new_selected

      const data = {
        action: 'complects/get',
        filter: this.filter_complects,
        page: this.page_complects,
        perpage: this.pagination_items_per_page_complects,
        store_id: router.currentRoute._value.params.id,
        selected: this.selected_complects
      }
      this.opt_get_complects(data)
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
      const data = {
        filter: this.filter,
        filterselected: this.filter_table,
        selected: this.selected,
        pageselected: this.page_selected,
        page: this.page,
        perpage: this.per_page
      }
      this.get_available_products_from_api(data)
      this.total_selected--
    },
    setTypePrice () {
      const getPrice = this.selected[this.modals.product_id].prices.find(r => r.guid === this.selected[this.modals.product_id].typePrice.guid).price
      this.selected[this.modals.product_id].finalPrice = Number(getPrice)
      this.selected[this.modals.product_id].discountInRubles = Number(this.selected[this.modals.product_id].price) - Number(getPrice)
      this.selected[this.modals.product_id].discountInterest = (Number(this.selected[this.modals.product_id].price) - Number(getPrice)) / (Number(this.selected[this.modals.product_id].price) / 100)
    },
    selectOrganization (id) {
      const organization = this.all_organizations.find(r => r.id === id)
      this.all_organizations_selected[organization.id] = organization
      this.all_organizations = this.all_organizations.filter((r) => r.id !== id)
    },
    setFilterOrganization () {
      const data = { filter: this.filter_organizations }
      this.get_all_organizations_from_api(data).then(
        this.all_organizations = this.allorganizations
      )
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
    pagClickCallback (pageNum) {
      this.page = pageNum
      const data = {
        filter: this.filter,
        filterselected: this.filter_table,
        selected: this.selected,
        pageselected: this.page_selected,
        page: this.page,
        perpage: this.per_page
      }
      this.get_available_products_from_api(data)
    },
    pagClickCallbackSelect (pageNum) {
      this.page_selected = pageNum
      const data = {
        filter: this.filter,
        filterselected: this.filter_table,
        selected: this.selected,
        pageselected: this.page_selected,
        page: this.page,
        perpage: this.per_page
      }
      this.get_available_products_from_api(data).then((res) => {
        this.kenostTableCheckedAllCheck()
      })
    },
    kenostTableCheckedAllCheck () {
      let count = 0
      for (let i = 0; i < Object.keys(this.selected).length; i++) {
        if (this.selected[Object.keys(this.selected)[i]].hide) {
          console.log(this.kenost_table.indexOf(this.selected[Object.keys(this.selected)[i]].id))
          if (this.kenost_table.indexOf(this.selected[Object.keys(this.selected)[i]].id) !== -1) {
            count++
          } else {
            this.kenost_table_all = []
            break
          }
        }
        if (count === 25) {
          this.kenost_table_all = ['1']
          break
        }
      }
    },
    kenostTableCheckedAll () {
      if (this.kenost_table_all.length === 0) {
        // this.kenost_table = Object.keys(this.selected)
        let count = 0
        for (let i = 0; i < Object.keys(this.selected).length; i++) {
          if (this.selected[Object.keys(this.selected)[i]].hide) {
            this.kenost_table.push(this.selected[Object.keys(this.selected)[i]].id)
            count++
          }
          if (count === 25) {
            break
          }
        }
      } else {
        let count = 0
        for (let i = 0; i < Object.keys(this.selected).length; i++) {
          if (this.selected[Object.keys(this.selected)[i]].hide) {
            this.kenost_table.filter((el) => el !== this.selected[Object.keys(this.selected)[i]].id)
            count++
          }
          if (count === 25) {
            break
          }
        }
      }
    },
    ElemCount (obj) {
      this.selected[obj.id].multiplicity = obj.value
    },
    closeDialogPrice () {
      if (this.modals.price_step === 0) {
        this.modals.price_step = Number(this.modals.type_price)
      } else {
        this.modals.price_step = 0
        this.modals.price = false
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
    setDiscountFormul (type, value, typePrice) {
      if (type && value >= 0 && typePrice) {
        this.setTypePrice()
        value = Number(value)
        let getPrice = Number(this.selected[this.modals.product_id].price)

        if (this.selected[this.modals.product_id].typePrice) {
          // eslint-disable-next-line no-unused-vars
          getPrice = Number(this.selected[this.modals.product_id].prices.find(r => r.guid === this.selected[this.modals.product_id].typePrice.guid).price)
        }
        if (type.key === 0) {
          this.selected[this.modals.product_id].discountInRubles = Number(this.selected[this.modals.product_id].price) - (getPrice - value)
          this.selected[this.modals.product_id].discountInterest = (Number(this.selected[this.modals.product_id].price) - (getPrice - value)) / (Number(this.selected[this.modals.product_id].price) / 100)
          this.selected[this.modals.product_id].finalPrice = getPrice - value
        } else if (type.key === 1) {
          this.selected[this.modals.product_id].discountInRubles = Number(this.selected[this.modals.product_id].price) - (getPrice - (value * (getPrice / 100)))
          this.selected[this.modals.product_id].discountInterest = (value * (getPrice / 100)) / (Number(this.selected[this.modals.product_id].price) / 100)
          this.selected[this.modals.product_id].finalPrice = getPrice - (value * (getPrice / 100))
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
    this.get_regions_from_api().then(() => {
      this.regions = this.getregions
      this.regions_all = this.regions.map(function (el) {
        return { name: el.label, code: el.key }
      })
    })
    this.get_all_sales_to_api({
      id: router.currentRoute._value.params.id,
      action: 'get/all'
    })
    this.opt_get_complects({
      action: 'complects/get',
      page: this.page_complects,
      perpage: this.pagination_items_per_page_complects,
      store_id: router.currentRoute._value.params.id
    })
    this.opt_get_prices({
      action: 'get/type/prices',
      store_id: router.currentRoute._value.params.id
    })
    this.get_opt_catalog_tree_from_api()
  },
  components: {
    FileUpload,
    Calendar,
    RadioButton,
    Dropdown,
    Dialog,
    InputNumber,
    TreeSelect,
    DropZone,
    Checkbox,
    Counter,
    MultiSelect,
    Paginate
  },
  computed: {
    ...mapGetters([
      'available_products',
      'getcatalog',
      'allorganizations',
      'getregions',
      'optcomplects',
      'optproductsfile',
      'allactions',
      'oprprices',
      'oprpricesremain',
      'optcatalogtree'
    ]),
    pagesCountSelect () {
      let pages = Math.round(this.total_selected / this.per_page)
      if (pages === 0) {
        pages = 1
      }
      return pages
    }
  },
  watch: {
    available_products: function (newVal, oldVal) {
      this.products = newVal.products
      // this.selected = newVal.selected
      if (newVal.selected) {
        this.selected = newVal.selected
      }
      this.total_products = newVal.total
      this.total_selected = newVal.total_selected
    },
    getcatalog: function (newVal, oldVal) {
      this.get_catalog = newVal
    },
    optcatalogtree: function (newVal, oldVal) {
      // for (let i = 0; i < newVal.length; i++) {

      // }
      this.opt_catalog_tree = newVal
    },
    allorganizations: function (newVal, oldVal) {
      this.all_organizations = newVal
    },
    getregions: function (newVal, oldVal) {
      this.regions = this.getregions
    },
    optcomplects: function (newVal, oldVal) {
      this.complects = newVal.complects
      this.total_complects = newVal.total
    },
    allactions: function (newVal, oldVal) {
      this.allAction = this.allactions.items.map(function (el) {
        return { name: el.name, code: el.id }
      })
    },
    oprprices: function (newVal, oldVal) {
      this.typePrice = []
      for (let i = 0; i < newVal.length; i++) {
        this.typePrice.push({ key: newVal[i].guid, name: newVal[i].name })
      }
    }
  }
}
</script>
<style lang="scss">

.kenost-basker-delete{
  width: 100%;
  display: flex;
  justify-content: center;
  &__button{
    width: 34px;
    height: 34px;
    border: 1px solid transparent;
    cursor: pointer;
    background: #F8F8F8 !important;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px;
    display: flex;
    border-radius: 5px;
    align-items: center;
    transition: all 0.4s;
    justify-content: center;

    &:hover{
      border: 1px solid #64748B;
    }

    .pi-trash{
      color: #64748B;
    }
  }
}

.kenost-gray-p{
  color: #ADADAD;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
}

  .upload-icon__image{
    background: #D9D9D9;
    width: 100px !important;
    height: 100px !important;
    border-radius: 50%;
    margin-top: 16px;
    overflow: hidden;
  }

  .kenost-all-table-activity{
    display: flex;
    gap: 8px;
    margin-top: 10px
  }

  .kenost-list-error{
    table{
      width: 100%;

      th{
        background-color: #F8F7F5;
        padding: 16px;
        color: #5E5E5E;
        font-weight: 400;
        font-size: 14px;
      }

      td{
        padding: 16px;
        color: #282828;
        font-weight: 400;
        font-size: 14px;
      }
    }
  }

  .kenost-upload-xlsx{
    &__file{
      border-radius: 5px;
      border: 1px solid #E2E2E2;
      display: flex;
      align-items: center;
      padding: 16px;
      gap: 20px;

      img{
        height: 45px !important;
      }

      a{
        margin: 0;
        font-size: 14px;
        text-decoration: none;
      }
    }

    &__info{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;

      p{
        margin: 0;
        color: #A0A0A0;
        font-size: 12px;
      }
    }
  }

  .p-multiselect-filter-icon{
    top: 50%;
    transform: translate(0, -50%);
  }

  .kenost-multiselect{
    margin-top: 16px;
    width: 100%;
    .p-multiselect-label{
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .p-multiselect-trigger{
      display: flex;
      align-items: flex-start;
      padding-top: 12px;
    }
  }

  .kenost-select-reginos{
    border: 1px solid #E2E2E2;
    padding: 24px;
    border-radius: 5px;

    &__title{
      font-size: 14px;
      font-weight: 500;
      color: #282828;
      letter-spacing: 0.25px;
    }

    &__gray{
      color: #ADADAD;
      font-size: 14px;
      font-weight: 400px;
      margin: 8px 0 16px 0;
    }

    &__checkboxs{
      display: flex;
      flex-wrap: wrap;
      gap: 16px 100px;
    }
  }

  .kenost-link-blue{
    color: #1874CF;
    font-size: 14px;
    cursor: pointer;

    &:hover{
      color: #4d8dcc;
    }
  }

    .kenost-info-line{
      display: flex;
      padding: 12px 16px;
      background: #F8F7F5;
      justify-content: space-between;
      align-items: center;
      border-radius: 5px;
      margin-top: 8px;

      p{
        color: #A0A0A0;
        font-size: 12px;
        margin: 0;
      }
    }

    .kenost-wiget-two{
      display: flex;
      width: 100%;
      gap: 8px;
    }

    .margin-auto{
      margin: auto;
    }

    .kenost-method-edit-flex{
      display: flex;
      gap: 40px;
    }

    .product-kenost-card{
        max-width: 400px;
        display: flex;
        gap: 8px;
        img{
          width: 38px;
          height: 38px !important;
          object-fit: contain;
          border-radius: 5px;
          margin: 0;
        }

        &__text{
          display: flex;
          flex-direction: column;
          margin: 0;
          p{
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            color: #282828;
            line-height: 1;
            text-align: left;
            margin-bottom: 8px;
            // display: -webkit-box;
            // -webkit-line-clamp: 2;
            // -webkit-box-orient: vertical;
            // overflow: hidden;
          }

          span{
            font-size: 14px;
            font-weight: 400;
            color: #ADADAD;
            line-height: 1;
            text-align: left;
          }
        }
    }

    .table-kenost{
      border: 1px solid #E2E2E2;
      border-radius: 5px;
      padding: 24px;

      &__complect{
        background: #F8F7F5;
      }

      &__title{
        color: #282828;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.1;
        letter-spacing: 0.25px;
        margin-bottom: 24px;
      }

      &__filters{
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-left{
          display: flex;
          align-items: center;
          width: 60%;
          gap: 12px;

          .input_pl{
            width: 50%;
          }

          .dart-form-group{
            width: 40%;
          }
        }
      }

      &__settings{
        color: #0070F4;
        font-size: 14px;
        margin: 0;
        cursor: pointer;
        opacity: 0;
        pointer-events: none;
        transition: all 0.4s;
      }

      &__product{
        display: flex;
        gap: 8px;
        img{
          width: 38px;
          height: 38px !important;
          object-fit: contain;
          border-radius: 5px;
          margin: 0;
        }

        &-text{
          display: flex;
          flex-direction: column;
          margin: 0;
          p{
            margin: 0;
            font-size: 14px;
            font-weight: 400;
            color: #282828;
            line-height: 1;
            text-align: left;
            margin-bottom: 8px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          span{
            font-size: 14px;
            font-weight: 400;
            color: #ADADAD;
            line-height: 1;
            text-align: left;
          }
        }
      }

      &__checkbox{
        text-align: left !important;
      }

      &__table{
        width: 100%;
        margin-top: 24px;

        tbody + tbody{
          border-top: 1px solid #E2E2E2
        }

        tr:hover{
          .table-kenost__settings{
            opacity: 1;
            pointer-events: all;
          }
        }

        td{
          text-align: center;
          padding: 16px 0;
        }

        th{
          padding: 12px;
          background: #F8F7F5;
        }

        td:first-child{
          padding: 0 0 0 12px;
        }

        td:last-child{
          padding: 0 12px 0 0;
        }

        th:first-child{
          border-radius: 5px 0 0 0;
        }

        th:last-child{
          border-radius: 0 5px 0 0;
        }
      }

      &__name{
        color: #5E5E5E;
        font-size: 14px;
        font-weight: 400;
        text-align: center;

        &-checkbox{
          width: 40px;
          text-align: left;
        }

        &-product{
          width: 300px;
          text-align: left;
        }
      }
    }

    .kenost-dropzone{
      border: 2px dashed  #E2E2E2 !important;
      margin-top: 10px
    }

    .kenost-wiget{
        p{
        color: #A0A0A0;
        font-weight: 400;
        font-size: 12px;
        margin: 0;
        }
    }

    .kenost-dropzone__custom{
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;

      i{
        font-size: 72px;
        color: #E2E2E2;
      }

      b{
        font-size: 14px;
        margin-top: 18px;
      }

      p{
        color: #A0A0A0;
        font-size: 14px;
        margin: 0;

        span{
          color: #1874CF;
          text-decoration: underline;
        }
      }
    }

    .kenots-button-stop{
        cursor: unset;
        position: relative;
        background: #ff000067 !important;
        border: none !important;
        transition: all 0.5s;
        overflow: unset;

        &__text{
            opacity: 0;
            pointer-events: none;
            display: block;
            position: absolute;
            padding: 12px;
            background: #282828;
            white-space: nowrap;
            font-size: 12px;
            font-weight: 400;
            right: 0;
            border-radius: 5px;
            letter-spacing: 0.7px;
            top: calc(-100% - 6px);

            &::before{
                width: 20px;
                height: 20px;
                content: "";
                border-radius: 5px;
                background: #282828;
                position: absolute;
                right: 40px;
                bottom: -8px;
                rotate: 45deg;
            }
            // display: none;
        }

        &:hover{
            .kenots-button-stop__text{
                opacity: 1;
                pointer-events: all;
            }
        }
    }

    .two-colums{
        display: flex;
        gap: 12px;

        .kenost-wiget{
            width: 100%;
        }

        .p-inputnumber{
            width: 100%;
        }
    }

    .kenost-modal-price__flex{
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
    }

    .kenost-add-button{
        display: flex;
        gap: 8px;
        color: #282828;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.4s;

        &:hover{
            color: #444444;
        }
    }

    .postponement{
        color: #282828;
        font-size: 14px;
        display: flex;
        gap: 12px;

        &__settings{
            color: #0070F4;
            cursor: pointer;
            transition: all 0.4s;

            &:hover{
                color: #3993fa
            }
        }

        &__graph{
            background: #F8F7F5;
            border-radius: 5px;
            padding: 16px;
            width: 370px;
            margin-top: 16px;

            b{
                color: #5E5E5E;
                font-size: 14px;
                line-height: 1.1;
            }

            p{
                color: #282828;
                margin-top: 16px;
                font-size: 14px;
                line-height: 1;
            }
        }
    }
</style>
