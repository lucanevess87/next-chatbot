export type ChatGPTAgent = 'user' | 'system';

export type ChatGPTMessages = {
  role: ChatGPTAgent;
  content: string;
};

export type OpenAIStreamPayload = {
  model: string;
  messages: ChatGPTMessages[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  n: number;
};
