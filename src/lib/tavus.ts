// Tavus API integration
const TAVUS_API_BASE = 'https://tavusapi.com/v2';

export interface CreateConversationRequest {
  replica_id: string;
  custom_greeting?: string;
  conversational_context?: string;
}

export interface CreateVideoRequest {
  replica_id: string;
  script: string;
}

export interface TavusConversation {
  conversation_id: string;
  conversation_url: string;
  status: 'active' | 'ended';
}

export interface TavusVideo {
  video_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  download_url?: string;
  hosted_url?: string;
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

  async createVideo(request: CreateVideoRequest): Promise<TavusVideo> {
    const response = await fetch(`${TAVUS_API_BASE}/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create video: ${response.statusText}`);
    }

    return response.json();
  }

  async getVideo(videoId: string): Promise<TavusVideo> {
    const response = await fetch(`${TAVUS_API_BASE}/videos/${videoId}`, {
      method: 'GET',
      headers: {
        'x-api-key': this.apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get video: ${response.statusText}`);
    }

    return response.json();
  }
}