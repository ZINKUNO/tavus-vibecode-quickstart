// Tavus API integration
const TAVUS_API_BASE = 'https://tavusapi.com/v2';

export interface CreateConversationRequest {
  persona_id: string;
  replica_id?: string;
  custom_greeting?: string;
  conversational_context?: string;
}

export interface TavusConversation {
  conversation_id: string;
  conversation_url: string;
  status: 'active' | 'ended';
}

export class TavusAPI {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async createConversation(request: CreateConversationRequest): Promise<TavusConversation> {
    const response = await fetch(`${TAVUS_API_BASE}/conversations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create conversation: ${response.statusText}`);
    }

    return response.json();
  }

  async endConversation(conversationId: string): Promise<void> {
    const response = await fetch(`${TAVUS_API_BASE}/conversations/${conversationId}/end`, {
      method: 'POST',
      headers: {
        'x-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to end conversation: ${response.statusText}`);
    }
  }
}