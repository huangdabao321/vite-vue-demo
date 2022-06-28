import router from "@/router";
import { TOKEN } from "@/config/type";
import { getItem } from "@/utils/storage";
import { setDocumentTitle } from "@/utils/tools";

const whiteList = ["login"];
const LOGINPATH = "/user/login";
const defaultRootPath = "/welcome";
const token = getItem(TOKEN);

router.beforeEach((to, from, next) => {
  // 设置title
  to.meta &&
    typeof to.meta.title !== "undefined" &&
    setDocumentTitle(to.meta.title);
  if (token) {
    if (to.fullPath === LOGINPATH) {
      next({ path: defaultRootPath });
    } else {
      next();
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
