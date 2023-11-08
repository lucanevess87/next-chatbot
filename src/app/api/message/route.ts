import { MessageArraySchema } from '@/components/ChatInput/validator';
import { promptMessage } from '@/utils/open-ai/open-ai.prompts';
import { OpenAIStream } from '@/utils/open-ai/open-ai.stream';
import { ChatGPTMessages, OpenAIStreamPayload } from '@/utils/open-ai/open-ai.types';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const parseMessages = MessageArraySchema.parse(messages);

  const outboundMessages: ChatGPTMessages[] = parseMessages.map((message) => ({
    content: message.text,
    role: message.isUserMessage ? 'user' : 'system',
  }));

  outboundMessages.unshift({ role: 'system', content: promptMessage });

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo',
    messages: outboundMessages,
    temperature: 0.4,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 150,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);

  return new Response(stream);
}
