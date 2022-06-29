import { onBeforeUnmount, onMounted, ref } from "vue";
import { SMALLDEVICE } from "@/config/type";

export function useMobile(){
  const isMobile = ref(false)
  onMounted(() => {
    window.addEventListener('resize', resize)
    resize()
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
  })
  const resize = () => {
    const width = document.documentElement.clientWidth
    isMobile.value = width <= SMALLDEVICE
  }
  return isMobile
}