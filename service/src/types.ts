import type { FetchFn } from 'chatgpt'

export interface RequestProps {
  prompt: string
  modelId?: string
  options?: ChatContext
  systemMessage: string
  temperature?: number
  top_p?: number
}

export interface ChatContext {
  conversationId?: string
  parentMessageId?: string
}

export interface ChatGPTUnofficialProxyAPIOptions {
  accessToken: string
  apiReverseProxyUrl?: string
  model?: string
  debug?: boolean
  headers?: Record<string, string>
  fetch?: FetchFn
}

export interface ModelConfig {
  apiModel?: ApiModel
  reverseProxy?: string
  timeoutMs?: number
  socksProxy?: string
  httpsProxy?: string
  usage?: string
}

export type ApiModel = 'ChatGPTAPI' | 'ChatGPTUnofficialProxyAPI' | undefined

interface Chat {
	id?: string
	dateTime: string
	text: string
	inversion?: boolean
	error?: boolean
	loading?: boolean
	conversationOptions?: ConversationRequest | null
}

interface History {
	title: string
	isEdit: boolean
	uuid: number
}

export interface ChatState {
	active: number | null
  modelId: string
	usingContext: boolean;
	history: History[]
	chat: { uuid: number; data: Chat[] }[]
}

interface ConversationRequest {
	conversationId?: string
	parentMessageId?: string
}
