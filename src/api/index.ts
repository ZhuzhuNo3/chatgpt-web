import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'
import { post, get } from '@/utils/request'
import { useAuthStore, useSettingStore } from '@/store'

export function fetchChatAPI<T = any>(
  prompt: string,
  options?: { conversationId?: string; parentMessageId?: string },
  signal?: GenericAbortSignal,
) {
  return post<T>({
    url: '/chat',
    data: { prompt, options },
    signal,
  })
}

export function fetchChatConfig<T = any>() {
  return post<T>({
    url: '/config',
  })
}

export function fetchChatAPIProcess<T = any>(
  params: {
    prompt: string
    modelId: string
    options?: { conversationId?: string; parentMessageId?: string }
    signal?: GenericAbortSignal
    onDownloadProgress?: (progressEvent: AxiosProgressEvent) => void },
) {
  const settingStore = useSettingStore()
  const authStore = useAuthStore()

  let data: Record<string, any> = {
    prompt: params.prompt,
    options: params.options,
    modelId: params.modelId,
  }

  if (authStore.isChatGPTAPI) {
    data = {
      ...data,
      systemMessage: settingStore.systemMessage,
      temperature: settingStore.temperature,
      top_p: settingStore.top_p,
    }
  }

  return post<T>({
    url: '/chat-process',
    data,
    signal: params.signal,
    onDownloadProgress: params.onDownloadProgress,
  })
}

export function updateChatMessage<T>(
  params: {
    id: string
    newId?: string
    role?: string
    text?: string
    conversationId?: string
    parentMessageId?: string
  }
) {
  return post<T>({
    url: '/chat-update',
    data: params,
  })
}

export function getSyncState<T>(
  params: {
    key: string
  }
) {
  return get<T>({
    url: '/state',
    data: params,
  })
}

export function setSyncState<T>(
  params: {
    key: string
    state: Chat.ChatState
  }
) {
  return post<T>({
    url: '/state/' + params.key,
    data: params.state,
  })
}

export function fetchSession<T>() {
  return post<T>({
    url: '/session',
  })
}

export function fetchVerify<T>(token: string) {
  return post<T>({
    url: '/verify',
    data: { token },
  })
}
