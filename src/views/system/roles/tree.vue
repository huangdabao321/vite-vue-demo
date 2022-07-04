<template>
  <a-tree
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
    :tree-data="treeData"
    :fieldNames="{ key: 'id', title: 'title', children: 'children' }"
    :height="300"
    checkable
    default-expand-all
    @check="onCheck"
  >
  </a-tree>
</template>

<script setup>
import { getPermissions } from "@/api/permission";
import {
  onMounted,
  ref,
  defineEmits,
  defineProps,
  toRefs,
  watch,
  unref,
} from "vue";
import { Form } from "ant-design-vue";
import { listToTree } from "@/store/utils";

const formItemContext = Form.useInjectFormItemContext();
const props = defineProps({
  value: {
    type: Array,
    default: () => [],
  },
});
const { value } = toRefs(props);
const emits = defineEmits(["update:value"]);
const selectedKeys = ref([]);
const checkedKeys = ref([]);

const treeData = ref([]);
onMounted(() => {
  getPermissions().then((res) => {
    const list = [];
    listToTree(res.data, list, 0);
    treeData.value = list;
    initCheckedKeys()
  });
});

const initCheckedKeys = () => {
  const keys = [];
  const initKeys = unref(value.value);
  const data = treeData.value;
  filterCheckedKeys(data, keys, initKeys);
  checkedKeys.value = keys;
};

const filterCheckedKeys = (data, keys, initKeys) => {
  data.forEach(item => {
    const { children } = item
    if (children && children.length) {
      if (children.every(child => initKeys.includes(child.id))) {
        keys.push(item.id)
      } else {
        filterCheckedKeys(children, keys, initKeys)
      }
    } else if (initKeys.includes(item.id)) {
      keys.push(item.id)
    }
  })
};

watch(value.value, (newVal) => {
  newVal.length && initCheckedKeys();
});

const onCheck = (checkedKeys, { halfCheckedKeys }) => {
  emits("update:value", [].concat(checkedKeys, halfCheckedKeys));
  formItemContext.onFieldChange();
};
</script>

<style lang="less" scoped></style>
