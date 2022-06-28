import router from "@/router";
import { TOKEN } from "@/config/type";
import { getItem } from "@/utils/storage";
import { setDocumentTitle } from "@/utils/tools";
import { useUserStoreWithOut } from "@/store/user";
import { message } from "ant-design-vue";
import { notFoundRouter } from "./router";

const userStore = useUserStoreWithOut();
const whiteList = ["login"];
const LOGINPATH = "/user/login";
const defaultRootPath = "/welcome";

router.beforeEach((to, from, next) => {
  const token = getItem(TOKEN);
  // 设置title
  to.meta &&
    typeof to.meta.title !== "undefined" &&
    setDocumentTitle(to.meta.title);
  if (token) {
    if (to.fullPath === LOGINPATH) {
      next({ path: defaultRootPath });
    } else {
      if (!userStore.userInfo) {
        const redirect = decodeURIComponent(from.query.redirect || to.path);
        userStore
          .getUserInfo()
          .then((res) => {
            const roles = res.data && res.data.roles;
            userStore.generateRoutes(roles).then(() => {
              userStore.addRoutes.forEach((route) => {
                router.addRoute(route);
              });
              router.addRoute(notFoundRouter)
              if (to.path === redirect) {
                next({ ...to, replace: true });
              } else {
                next({ path: redirect });
              }
            });
          })
          .catch((error) => {
            message.error(error);
            console.log('error', error)
            // todo 获取用户信息失败 清空信息
          });
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      next();
    } else {
      next({ path: LOGINPATH, query: { redirect: to.fullPath } });
    }
  }
});

router.afterEach(() => {
  console.log("done");
});
