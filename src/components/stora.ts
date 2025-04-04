import { VectorStore, Document } from 'llamaindex';
import { StoracheClient } from 'storacha-client';

interface AIAgentDataComponents {
  input?: any;
  output?: any;
  chainOfThought?: string[];
  codeArtifacts?: string[];
  executionArtifacts?: Record<string, any>;
  modelArtifacts?: Record<string, any>;
  trainingData?: any[];
  metadata?: Record<string, any>;
  annotations?: Record<string, string>;
}

class StoracheAIAgentVectorStore implements VectorStore {
  private client: StoracheClient;
  private namespace: string;

  constructor(client: StoracheClient, namespace: string = 'ai-agent-data') {
    this.client = client;
    this.namespace = namespace;
  }

  // Method to store comprehensive AI agent data
  async storeAgentData(agentId: string, data: AIAgentDataComponents): Promise<void> {
    // Create a vector representation of the agent's data
    const vectorRepresentation = this.createVectorRepresentation(agentId, data);

    await this.client.insertVectors(this.namespace, [vectorRepresentation]);
  }

  // Convert agent data into a vector-friendly format
  private createVectorRepresentation(agentId: string, data: AIAgentDataComponents) {
    return {
      id: agentId,
      vector: this.computeSemanticVector(data),
      metadata: {
        input: JSON.stringify(data.input),
        output: JSON.stringify(data.output),
        chainOfThought: data.chainOfThought,
        codeArtifacts: data.codeArtifacts,
        executionArtifacts: JSON.stringify(data.executionArtifacts),
        modelArtifacts: JSON.stringify(data.modelArtifacts),
        trainingData: JSON.stringify(data.trainingData),
        metadata: data.metadata,
        annotations: data.annotations
      }
    };
  }

  // Simplified vector computation (you'd replace with a real embedding method)
  private computeSemanticVector(data: AIAgentDataComponents): number[] {
    // Example: Create a simple vector based on data properties
    const vectorSize = 128; // Example vector size
    return new Array(vectorSize).fill(0).map((_, i) => {
      // Simple deterministic vector generation based on data
      const seed = JSON.stringify(data).length + i;
      return Math.sin(seed) * 0.5;
    });
  }

  // Implement other VectorStore interface methods
  async add(documents: Document[]): Promise<void> {
    // Convert documents to Storacha format
    const vectors = documents.map(doc => ({
      id: doc.id,
      vector: doc.embedding || this.computeSemanticVector(doc),
      metadata: doc.metadata
    }));

    await this.client.insertVectors(this.namespace, vectors);
  }

  async query(queryEmbedding: number[], options?: { topK?: number }): Promise<Document[]> {
    const results = await this.client.searchVectors(this.namespace, {
      queryVector: queryEmbedding,
      topK: options?.topK || 10
    });

    return results.map(result => ({
      id: result.id,
      text: result.metadata?.input || '',
      metadata: result.metadata,
      embedding: result.vector
    }));
  }

  // Additional method to retrieve full agent data
  async getAgentData(agentId: string): Promise<AIAgentDataComponents | null> {
    const result = await this.client.getVector(this.namespace, agentId);
    
    if (!result) return null;

    return {
      input: JSON.parse(result.metadata.input),
      output: JSON.parse(result.metadata.output),
      chainOfThought: result.metadata.chainOfThought,
      codeArtifacts: result.metadata.codeArtifacts,
      executionArtifacts: JSON.parse(result.metadata.executionArtifacts),
      modelArtifacts: JSON.parse(result.metadata.modelArtifacts),
      trainingData: JSON.parse(result.metadata.trainingData),
      metadata: result.metadata.metadata,
      annotations: result.metadata.annotations
    };
  }
}

// Example usage
async function setupStoracheAIAgentStore() {
  const storachaClient = new StoracheClient({
    endpoint: 'https://your-storacha-endpoint.com',
    apiKey: process.env.STORACHA_API_KEY
  });

  const vectorStore = new StoracheAIAgentVectorStore(storachaClient);

  // Store a sample AI agent's data
  await vectorStore.storeAgentData('agent-123', {
    input: { query: 'Solve a math problem' },
    output: { solution: '42' },
    chainOfThought: ['identify problem', 'break down steps', 'compute solution'],
    codeArtifacts: ['def solve(): return 42'],
    executionArtifacts: { runtime: '0.5s' },
    modelArtifacts: { model: 'GPT-like', version: '1.0' },
    trainingData: [{ input: 'example1', output: 'result1' }],
    metadata: { category: 'math-solver' },
    annotations: { difficulty: 'easy' }
  });

  return vectorStore;
}

export { 
  StoracheAIAgentVectorStore, 
  setupStoracheAIAgentStore,
  AIAgentDataComponents
};