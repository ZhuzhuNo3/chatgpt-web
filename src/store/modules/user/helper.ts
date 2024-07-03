import { ss } from '@/utils/storage'

const LOCAL_NAME = 'userStorage'

export interface UserInfo {
  avatar: string
  name: string
  description: string
  syncKey: string
}

export interface UserState {
  userInfo: UserInfo
}

export function defaultSetting(): UserState {
  return {
    userInfo: {
      avatar: 'https://raw.githubusercontent.com/ZhuzhuNo3/chatgpt-web/main/src/assets/avatar.png',
      name: '0w0',
      description: 'Star on <a href="https://github.com/ZhuzhuNo3/chatgpt-web" class="text-blue-500" target="_blank" >GitHub</a>',
      syncKey: '',
    },
  }
}

export function getLocalState(): UserState {
  const localSetting: UserState | undefined = ss.get(LOCAL_NAME)
  return { ...defaultSetting(), ...localSetting }
}

export function getSyncKey(): string {
  return getLocalState().userInfo.syncKey
}

export function setLocalState(setting: UserState): void {
  ss.set(LOCAL_NAME, setting)
}
