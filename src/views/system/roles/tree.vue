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
const value = toRefs(props);
const emits = defineEmits(["update:value"]);
const selectedKeys = ref([]);
const checkedKeys = ref([]);

const treeData = ref([]);
onMounted(() => {
  getPermissions().then((res) => {
    const list = [];
    listToTree(res.data, list, 0);
    treeData.value = list;
  });
});

const initCheckedKeys = (data) => {
  const keys = [];
  const initKeys = unref(value.value);
  filterCheckedKeys(data, keys, initKeys);
  console.log('initKeys===>', initKeys)
  console.log('keys===>', keys)
  checkedKeys.value = keys
};

const filterCheckedKeys = (data, keys, initKeys) => {
  for (let i = 0; i < data.length; i++) {
    const { children } = data[i];
    if (data[i].pid !== 0 && children.every(child => initKeys.includes(child.id))) {
      keys.push(data[i].id)
    } 
    for (let j = 0; j < children.length; j++) {
      if (initKeys.includes(children[j].id)) {
        keys.push(children[i].id)
      }
      if (children[i].children) {
        filterCheckedKeys(children[i].children, keys, initKeys)
      }
    }
  }
};

watch(
  value.value,
  (newVal) => {
    newVal.length && initCheckedKeys(treeData.value);
  },
  {
    immediate: true,
  }
);



const onCheck = (checkedKeys, { halfCheckedKeys }) => {
  console.log("checkedKeys", [].concat(checkedKeys, halfCheckedKeys));
  emits("update:value", [].concat(checkedKeys, halfCheckedKeys));
  formItemContext.onFieldChange();
};
</script>

<style lang="less" scoped></style>
