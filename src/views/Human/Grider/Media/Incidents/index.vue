<template>
  <div class="yx-human-media-incident">
    <div class="yx-human-media-incident-inner">
      <div class="yx-human-media-incident-search">
        <!-- <el-form size="large" inline>
          <el-form-item class="yx-human-media-incident-search-label" label="时间">
            <el-space>
              <el-select
                style="width: 10cqh"
                v-model="search.dateType"
                placeholder="请选择时间类型"
              >
                <el-option
                  v-for="item in dateTypes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-date-picker
                v-model="search.in_date"
                placeholder="请选择时间"
                :type="dataType.unit"
                :value-format="dataType.format"
              />
            </el-space>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="search.state" placeholder="请选择状态">
              <el-option
                v-for="item in statusTypes"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input
              style="width: 30cqh"
              v-model="search.caseDetail"
              placeholder="时间编号、名称、操作人"
            />
            <i @click="handleSearch" class="iconfont icon-icon-test icon-search" />
          </el-form-item>
        </el-form> -->
      </div>
      <div class="yx-human-media-incident-bd">
        <div class="yx-human-media-incident-pagination">
          <div class="total">
            共 <span style="color: #00bff7">{{ total ?? 0 }}</span> 条事件信息
          </div>
          <el-pagination
            size="large"
            v-model:current-page="search.pageNum"
            v-model:page-size="search.pageSize"
            layout="prev, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            prev-text="上一页"
            next-text="下一页"
          />
        </div>

        <div class="yx-human-media-incident-list">
          <div class="yx-table">
            <div class="yx-table-hd">
              <div class="yx-table-tr">
                <div class="yx-table-th">序号</div>
                <div class="yx-table-th">上报时间</div>
                <div class="yx-table-th">事件类型</div>
                <div class="yx-table-th">事件名称</div>
                <div class="yx-table-th">事件编号</div>
                <div class="yx-table-th">处理状态</div>
              </div>
            </div>
            <div class="yx-table-bd">
              <div v-for="(item, i) in list" class="yx-table-tr" :key="i" @click="handleRowClick(list, i)">
                <div class="yx-table-td">{{ i + 1 }}</div>
                <div class="yx-table-td">{{ item.ENTERTIME }}</div>
                <div class="yx-table-td">{{ item.SUBSERVICE }}</div>
                <div class="yx-table-td">{{ item.BUSITYPE3 }}</div>
                <div class="yx-table-td">{{ item.ANJIANBIANHAO }}</div>
                <div class="yx-table-td">{{ item.LINKNAME }}</div>
              </div>
            </div>
          </div>
          <!-- <el-table
            highlight-current-row
            @row-click="handleRowClick"
            height="100%"
            border
            size="large"
            :data="list"
            style="width: 100%"
          >
            <el-table-column type="index" label="序号" width="100" align="center" />
            <el-table-column prop="ENTERTIME" label="上报时间" align="center" />
            <el-table-column prop="SUBSERVICE" label="事件类型" align="center" />
            <el-table-column prop="BUSITYPE3" label="事件名称" align="center" />
            <el-table-column prop="ANJIANBIANHAO" label="事件编号" width="360" align="center" />
            <el-table-column prop="LINKNAME" label="处理状态" width="200" align="center" />
          </el-table> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, toRaw, onMounted } from 'vue'
import { AIProbe } from '@/api/modules'
import { useRoute } from 'vue-router'

const route = useRoute()

const search = reactive({
  dateType: 1,
  in_date: '',
  state: null,
  caseDetail: null,
  pageNum: 1,
  pageSize: 10,
  objId: ''
})

const dateTypes = [
  { label: '年', value: 1 },
  { label: '月', value: 2 },
  { label: '日', value: 3 }
]

const statusTypes = [
  { label: '上报', value: 1 },
  { label: '正在处理', value: 2 },
  { label: '办结', value: 3 }
]

const unit = {
  1: { unit: 'year', format: 'YYYY' },
  2: { unit: 'month', format: 'YYYY-MM' },
  3: { unit: 'date', format: 'YYYY-MM-DD' }
}
const dataType = computed(() => unit[search.dateType])
const total = ref(0)
const list = reactive([])

const asyncGetList = async () => {
  const query = route.query
  search.objId = query.gbNo
  const data = await AIProbe.GetEvents(search)
  if (data) {
    const { pageCount, datas } = data
    total.value = pageCount
    list.length = 0
    list.push(...(datas ?? []))
  }
}

const handleSearch = () => {
  search.pageNum = 1
  asyncGetList()
}

const handleCurrentChange = (page) => {
  asyncGetList()
}

const handleSizeChange = () => {
  asyncGetList()
}

const emit = defineEmits(['changeIncident'])
const handleRowClick = (item, i) => {
  emit('changeIncident', item[i])
}

onMounted(() => {
  handleSearch()
})
</script>

<style lang="scss" scoped>
@include yx(human-media-incident) {
  width: 2474px;
  height: 1118px;
  background: url(/src/assets/images/panel_03.png) no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;

  &-inner {
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &-search {
    padding: 70px 0 0 202px;
    flex-shrink: 0;
    height: 80px;
    :deep() {
      .el-form-item__label {
        width: 106px;
        height: 63px;
        font-size: 42px;
        font-family: MicrosoftYaHei;
        color: rgba(255, 255, 255, 0.8);
        line-height: 56px;
      }
      .select-trigger {
        width: 270px;
        height: 80px;
        border-radius: 6px;
        border: 2px solid #00bff7;
        .el-input {
          height: 80px;
        }
      }
      .el-space__item {
        width: 338px;
        height: 80px;
        border-radius: 6px;
        border: 2px solid #00bff7;
        .el-input {
          height: 80px;
        }
      }
    }
  }

  &-bd {
    flex: 1;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  &-pagination {
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    margin: 61px 0 0 223px;

    .total {
      font-size: 42px;
      color: #fff;
      font-family: MicrosoftYaHei;
      letter-spacing: 1px;
    }
  }

  &-list {
    margin: 19px 0 0 195px;
    width: 2134px;
    height: 756px;
    border-radius: 12px;
    border: 4px solid #2979ff;
  }
}

:deep() {
  .el-form {
    display: flex;
    align-items: center;

    &-item {
      margin-right: 2cqh !important;

      .icon-search {
        font-size: 3.2cqh;
        color: #fff;
        margin-left: 1cqh;
        cursor: pointer;
      }
    }
  }

  .el-pagination {
    margin-right: 142px;
    .btn-next,
    .btn-prev {
      font-size: 42px;
      font-family: MicrosoftYaHei;
      color: #ffffff;
      background-color: unset;
      letter-spacing: 1px;
      margin-right: 49px;
      width: 167px;
      height: 63px;
    }
    .btn-next {
      margin-right: 52px;
    }
    .el-pagination__jump {
      .el-pagination__classifier,
      .el-pagination__goto {
        font-size: 42px;
        font-family: MicrosoftYaHei;
        color: #ffffff;
      }
      .el-input {
        width: 89px;
        height: 61px;
        .el-input__wrapper {
          border-radius: 6px;
          border: 1px solid #00bff7;
          background-color: unset;
          .el-input__inner {
            font-size: 42px;
            font-family: MicrosoftYaHei;
            color: #ffffff;
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@include yx(table) {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  &-hd {
    flex-shrink: 0;
    width: 100%;
    height: 111px;
    border-radius: 12px 12px 0px 0px;
    border: 4px solid #2979ff;
    box-sizing: border-box;
    background-color: rgba(41, 120, 253, 0.5);
  }

  &-bd {
    display: block;
    // flex: 1;
    overflow: auto;
    width: 102%;
    /* height: 100%; */
    // border: 4px solid #2979ff;
    border-radius: 12px;
    border-top-left-radius: unset;
    border-top-right-radius: unset;
    border-top: unset;
    box-sizing: border-box;
  }

  &-tr {
    width: 100%;
    flex-shrink: 0;
    display: flex;
    &:hover {
      background: rgba(41, 120, 253, 0.16);
    }
  }

  &-th {
    height: 111px;
    font-size: 44px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    line-height: 58px;
    // flex: 1;
    border-right: 1px solid #2979ff;
    display: flex;
    align-items: center;
    justify-content: center;

    &:last-child {
      border-right: 0px;
    }
  }

  &-td {
    font-size: 42px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
    // flex: 1;
    border: 1px solid #2979ff;
    height: 111px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: unset;
    box-sizing: border-box;
    cursor: pointer;
    &:last-child {
      border-right: 0px;
    }
  }

  &-th:nth-child(1),
  &-td:nth-child(1) {
    width: 176px;
  }
  &-th:nth-child(2),
  &-td:nth-child(2) {
    width: 511px;
  }
  &-th:nth-child(3),
  &-td:nth-child(3) {
    width: 337px;
  }
  &-th:nth-child(4),
  &-td:nth-child(4) {
    width: 336px;
  }
  &-th:nth-child(5),
  &-td:nth-child(5) {
    width: 466px;
  }
  &-th:nth-child(6),
  &-td:nth-child(6) {
    width: 305px;
  }
}
</style>