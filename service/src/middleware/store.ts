import Keyv from "keyv";
import QuickLRU from "quick-lru";

// 最多同时记录 1000 个 key
const store = new Keyv({
  store: new QuickLRU({ maxSize: 1e3 })
})

export async function getStore(k: string) {
  const res = await store.get(k)
  return res
}

export async function setStore(k: string, v: any) {
  await store.set(k, v)
}
