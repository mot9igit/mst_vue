<template>
    <form @submit.prevent="formSubmit">
        <div class="profile-content__title">
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

            <div class="dart-form-group mb-4">
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

            <div class="dart-form-group mb-4">
                <span class="ktitle">Совместимость отсрочек</span>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-1" name="compatibilityPost" value="1"/>
                <label for="compatibilityPost-1" class="ml-2 radioLabel">Совместим со всеми акциями</label>
                </div>
                <div class="flex align-items-center mt-3">
                <RadioButton v-model="this.form.compatibilityPost" inputId="compatibilityPost-2" name="compatibilityPost" value="2"/>
                <label for="compatibilityPost-2" class="ml-2 radioLabel">Не совместим со всеми акциями</label>
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
                        <p v-if="this.form.conditionPaymentDelivery.key == 0">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.conditionPaymentDelivery.key == 1">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.conditionPaymentDelivery.key != undefined" v-model="this.form.conditionPaymentDeliveryValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Отсрочка</span>
                <div class="postponement">Срок отсрочки платежа: 50 дней <div class="postponement__settings" @click="this.modals.delay = !this.modals.delay">Настроить</div></div>
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
                        <p v-if="this.form.postponementConditions.key == 0">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.postponementConditions.key == 1">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.postponementConditions.key != undefined" v-model="this.form.postponementConditionsValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

            <div class="dart-form-group mb-4">
                <span class="ktitle">Условие акции</span>
                <div class="kenost-wiget">
                    <Dropdown v-model="this.form.condition" :options="this.condition" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                </div>
                <div class="two-colums mt-2">
                    <div class="kenost-wiget">
                        <p>Выберите условие оплаты доставки</p>
                        <Dropdown v-model="this.form.conditionPaymentDelivery" :options="this.conditionPaymentDelivery" optionLabel="name" placeholder="Оплата доставки" class="w-full md:w-14rem" />
                    </div>
                    <div class="kenost-wiget">
                        <p v-if="this.form.conditionPaymentDelivery.key == 0">Минимальная общая сумма заказа в ₽</p>
                        <p v-if="this.form.conditionPaymentDelivery.key == 1">Минимальное количество товаров в шт</p>
                        <input v-if="this.form.conditionPaymentDelivery.key != undefined" v-model="this.form.conditionPaymentDeliveryValue" type="text" name="description" class="dart-form-control">
                    </div>
                </div>
            </div>

              <div class="dart-form-group picker-wrap">
                <span class="ktitle">Добавление товаров</span>
                <div class="flex align-items-center mt-2">
                    <RadioButton v-model="this.form.addProductType" inputId="addProductType-1" name="addProductType" value="1"/>
                    <label for="addProductType-1" class="ml-2 radioLabel">Добавить вручную</label>
                </div>
                <div class="flex align-items-center mt-3">
                    <RadioButton v-model="this.form.addProductType" inputId="addProductType-2" name="addProductType" value="2"/>
                    <label for="addProductType-2" class="ml-2 radioLabel">Загрузить файлом</label>
                </div>
              </div>

                <div v-if="this.form.addProductType == '2'" class="dart-form-group mb-4">
                  <DropZone
                    class="kenost-dropzone"
                    :maxFiles="Number(10000000000)"
                    url="http://localhost:5000/item"
                    :uploadOnDrop="true"
                    :multipleUpload="true"
                    :acceptedFiles="['xlsx']"
                    :parallelUpload="1"
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

                  <div class="kenost-link-blue mt-2">Скачать шаблон файла</div>
                </div>

                <div v-if="this.form.addProductType == '1'" class="PickList mt-3">
                    <div class="PickList__product" :style="{ width: '40%' }">
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

                    <div class="PickList__selected" :style="{ width: '40%' }">
                      <div class="PickList__title mb-4">
                      <b>Добавленные товары</b>
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

                <div class="table-kenost mt-4">
                  <p class="table-kenost__title">Таблица добавленных товаров</p>
                  <div class="table-kenost__filters">
                    <div class="table-kenost__filters-left">
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
                    <button type="submit" class="dart-btn dart-btn-primary btn-padding">Создать комплект</button>
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
                        </tr>
                    </thead>
                    <tbody v-for="(item, index) in this.selected" :key="item.id">
                        <tr >
                          <td class="table-kenost__checkbox">
                            <Checkbox v-model="this.kenost_table" inputId="kenost_table" :value="item.id" />
                          </td>
                          <td class="table-kenost__product">
                            <img :src="'https://mst.tools' + item.image">
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
                            <p class="table-kenost__settings" @click="this.modals.price = true; this.modals.product_index = index" >Настроить</p>
                          </td>
                          <td>
                            <Counter class="margin-auto" @ElemCount="ElemCount" :id="item.id" :min="1" :value="item.multiplicity"/>
                          </td>
                          <td>
                            {{(Number(item.finalPrice).toFixed(0)).toLocaleString('ru') * item.multiplicity}} ₽
                          </td>
                        </tr>
                    </tbody>
                  </table>
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
                </div>

                <div class="dart-form-group">
                  <div v-if="this.form.participantsType == '1'" class="kenost-select-reginos">
                    <p class="kenost-select-reginos__title">Выбор участников по регионам</p>
                    <p class="kenost-select-reginos__gray">Акция будет доступна в том числе для новых компаний из выбранного региона</p>
                    <div class="kenost-select-reginos__checkboxs">
                      <div class="flex align-items-center">
                        <Checkbox v-model="this.form.access" inputId="access-1" name="access-1" value="1" />
                        <label for="access-1" class="ml-2"> Доступно для магазинов </label>
                      </div>
                      <div class="flex align-items-center">
                        <Checkbox v-model="this.form.access" inputId="access-2" name="access-1" value="2" />
                        <label for="access-2" class="ml-2"> Доступно для оптовых компаний </label>
                      </div>
                      <div class="flex align-items-center">
                        <Checkbox v-model="this.form.access" inputId="access-3" name="access-1" value="3" />
                        <label for="access-3" class="ml-2"> Доступно для производителей </label>
                      </div>
                    </div>
                  <MultiSelect v-model="selectedCities" display="chip" :options="this.regions" optionLabel="name" placeholder="Select Cities"
                  :maxSelectedLabels="3" class="w-full md:w-20rem" />
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

    <Dialog v-model:visible="this.modals.price" :header="this.modals.headers[this.modals.price_step]" :style="{ width: '600px' }">
        <div class="kenost-modal-price">
            <div class="product-kenost-card">
              <img :src="'https://mst.tools' + this.selected[this.modals.product_index]?.image">
              <div class="product-kenost-card__text">
                <p>{{ this.selected[this.modals.product_index]?.name }}</p>
                <span>{{this.selected[this.modals.product_index]?.article}}</span>
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
                  <Dropdown v-model="this.selected[this.modals.product_index].typePrice" :options="this.typePrice" optionLabel="name" class="w-full md:w-14rem" />
              </div>
              <div class="kenost-wiget-two">
                <div class="kenost-wiget">
                  <p>Значение</p>
                  <InputNumber
                    v-model="this.saleValue"
                    inputId="horizontal-buttons"
                    :step="0.1"
                    min="0"
                    @update:modelValue="setDiscountFormul(this.selected[this.modals.product_index].typeFormul, this.saleValue)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                  />
                </div>
                <div class="kenost-wiget">
                  <p>&nbsp;</p>
                  <Dropdown @change="setDiscountFormul(this.selected[this.modals.product_index].typeFormul, this.saleValue)" v-model="this.selected[this.modals.product_index].typeFormul" :options="this.typeFormul" optionLabel="name" class="w-full md:w-14rem" />
                </div>
              </div>
            </div>

            <div v-if="this.modals.price_step == 2" class="two-colums mt-3">
              <div class="kenost-wiget">
                  <p>Тип цены</p>
                  <Dropdown v-model="this.selected[this.modals.product_index].typePrice" :options="this.typePrice" optionLabel="name" class="w-full md:w-14rem" />
              </div>
            </div>

            <div v-if="this.modals.price_step == 3" class="two-colums mt-3">
              <div class="kenost-wiget">
                <p>Скидка в %</p>
                <InputNumber
                    v-model="this.selected[this.modals.product_index].discountInterest"
                    inputId="horizontal-buttons"
                    :step="1"
                    min="0"
                    max="100"
                    suffix=" %"
                    @update:modelValue="setPrices(this.modals.product_index, 'discountInterest', this.selected[this.modals.product_index].discountInterest)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
              </div>
              <div class="kenost-wiget">
                <p>Скидка в ₽</p>
                <InputNumber
                    v-model="selected[this.modals.product_index].discountInRubles"
                    inputId="horizontal-buttons"
                    :step="1"
                    min="0"
                    :max="selected[this.modals.product_index].price"
                    mode="currency" currency="RUB"
                    @update:modelValue="setPrices(this.modals.product_index, 'discountInRubles', this.selected[this.modals.product_index].discountInRubles)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
              </div>
              <div class="kenost-wiget">
                <p>Цена со скидкой</p>
                <InputNumber
                    v-model="selected[this.modals.product_index].finalPrice"
                    inputId="horizontal-buttons"
                    :step="1"
                    :max="selected[this.modals.product_index].price"
                    mode="currency" currency="RUB"
                    min="0"
                    @update:modelValue="setPrices(this.modals.product_index, 'finalPrice', this.selected[this.modals.product_index].finalPrice)"
                    incrementButtonIcon="pi pi-plus" decrementButtonIcon="pi pi-minus"
                />
              </div>
            </div>

            <div class="kenost-info-line" v-if="this.modals.price_step != 0">
              <p>РРЦ: {{this.selected[this.modals.product_index]?.price}} ₽</p>
              <p>Скидка: {{(this.selected[this.modals.product_index]?.discountInterest).toFixed(2)}} %</p>
              <p>Цена со скидой: {{this.selected[this.modals.product_index]?.finalPrice}} ₽</p>
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

export default {
  name: 'ProfileSalesAdd',
  props: { },
  data () {
    return {
      page: 1,
      filter: {
        name: '',
        category: {}
      },
      selected: {},
      kenost_table_all: [],
      kenost_table: [],
      products: [],
      get_catalog: [],
      total_products: 0,
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
      form: {
        name: '',
        description: '',
        award: '',
        dates: [],
        compatibilityDiscount: 0,
        compatibilityPost: 0,
        typeShipment: 0,
        dateShipment: '',
        paymentDelivery: 0,
        conditionPaymentDelivery: 0,
        conditionPaymentDeliveryValue: 0,
        postponementConditions: 0,
        postponementConditionsValue: 0,
        condition: 0,
        addProductType: '1',
        delay: [
          {
            percent: 100,
            day: 0
          }
        ],
        delayPercentSum: 0,
        participantsType: '1',
        access: []
      },
      modals: {
        delay: false,
        price: false,
        price_step: 0,
        type_price: '1',
        product_index: -1,
        headers: [
          'Метод редактирования цены',
          'Скидка по формуле',
          'Тип цен',
          'Скидка вручную'
        ]
      },
      files: {},
      paymentDelivery: [
        { name: 'Покупатель', key: 0 },
        { name: 'Поставщик', key: 1 }
      ],
      conditionPaymentDelivery: [
        { name: 'Купи на Х рублей', key: 0 },
        { name: 'При покупке Х шт товара', key: 1 }
      ],
      postponementConditions: [
        { name: 'При покупке на Х рублей получи отсрочку', key: 0 },
        { name: 'При покупке Х товара получи отсрочку на него', key: 1 }
      ],
      condition: [
        { name: 'Купи Х товаров по цене Y', key: 0 },
        { name: 'Получи подарок при покупке Х товаров', key: 1 },
        { name: 'Купи на Х рублей - получи Y скидку на выбранный товар', key: 2 },
        { name: 'Купи на Х рублей - получи скидку на Y %', key: 3 }
      ],
      typeFormul: [
        { name: '₽', key: 0 },
        { name: '%', key: 1 }
      ],
      typePrice: [
        { name: 'Заданная', key: 0 }
      ]
    }
  },
  methods: {
    ...mapActions([
      'get_available_products_from_api',
      'get_catalog_from_api',
      'get_all_organizations_from_api',
      'get_regions_from_api'
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
    delayUpdate () {
      this.delayPercentSum = 0
      for (let i = 0; i < this.form.delay.length; i++) {
        this.delayPercentSum += this.form.delay[i].percent
      }
    },
    setFilter () {
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
    },
    select (id) {
      const product = this.products.find(r => r.id === id)
      product.discountInterest = 0
      product.discountInRubles = 0
      product.multiplicity = 1
      product.finalPrice = Number(product.price)
      product.typeFormul = {}
      product.typePrice = ''

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
      const data = { filter: this.filter, selected: this.selected, pageselected: this.page_selected, page: this.page, perpage: this.per_page }
      this.get_available_products_from_api(data)
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
    setDiscountFormul (type, value) {
      if (type && value !== 0) {
        if (type.key === 0) {
          value = Number(value)
          this.selected[this.modals.product_index].discountInRubles = value
          this.selected[this.modals.product_index].discountInterest = value / (this.selected[this.modals.product_index].price / 100)
          this.selected[this.modals.product_index].finalPrice = this.selected[this.modals.product_index].price - value
        } else if (type.key === 1) {
          this.selected[this.modals.product_index].discountInRubles = (this.selected[this.modals.product_index].price / 100) * value
          this.selected[this.modals.product_index].discountInterest = value
          this.selected[this.modals.product_index].finalPrice = this.selected[this.modals.product_index].price - (this.selected[this.modals.product_index].price / 100) * value
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
      console.log(Object.keys(this.regions).length)
      console.log(this.regions)
      // console.log(Object.keys(this.regions).length)
      // for (let i = 0; Object.keys(this.regions).length; i++) {
      //   if (this.regions[Object.keys(this.regions)[i]]) {
      //     this.regions_all.push(this.regions[Object.keys(this.regions)[i]])
      //   }
      // }

      // console.log(this.regions_all)
    })
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
    MultiSelect
  },
  computed: {
    ...mapGetters([
      'available_products',
      'getcatalog',
      'allorganizations',
      'getregions'
    ])
  },
  watch: {
    available_products: function (newVal, oldVal) {
      this.products = newVal.products
      this.total_products = newVal.total
    },
    getcatalog: function (newVal, oldVal) {
      this.get_catalog = newVal
    },
    allorganizations: function (newVal, oldVal) {
      this.all_organizations = newVal
    },
    getregions: function (newVal, oldVal) {
      this.regions = this.getregions
    }
  }
}
</script>
<style lang="scss">

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
