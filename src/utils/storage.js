export function setItem(key, value, expire) {
  if ((expire && isNaN(expire)) || !parseInt(expire)) {
    throw new Error("过期时间非法");
  }
  window.localStorage.setItem(key, JSON.stringify(value));
  if (expire) {
    window.localStorage.setItem(`${key}_expire`, new Date().getTime() + expire * 1000);
  }
}

export function getItem(key) {
  const expireKey = `${key}_expire`;
  const expire = window.localStorage.getItem(expireKey);
  if (expire && new Date().getTime() >= expire) {
    removeItem(key)
    removeItem(expireKey)
    return undefined;
  } else {
    return JSON.parse(window.localStorage.getItem(key));
  }
}

export function removeItem(key) {
  window.localStorage.removeItem(key);
}
