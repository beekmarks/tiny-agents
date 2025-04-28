import { fromIni } from "@aws-sdk/credential-providers";
import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";
import dotenv from "dotenv";

dotenv.config();

const REGION = process.env.AWS_REGION || "us-east-1";
const MODEL_ID = process.env.BEDROCK_MODEL_ID || "anthropic.claude-3.7";

// Credentials will be loaded using fromIni (profile from .env or default)
const credentials = fromIni({ profile: process.env.AWS_PROFILE });

export class BedrockClaudeClient {
  private client: BedrockRuntimeClient;
  private modelId: string;

  constructor() {
    this.client = new BedrockRuntimeClient({ region: REGION, credentials });
    this.modelId = MODEL_ID;
  }

  async complete(prompt: string, maxTokens: number = 1024): Promise<string> {
    // Remove any accidental leading/trailing whitespace from the prompt
    // TEMPORARY: Test with the absolute minimal valid prompt to isolate errors
    const formattedPrompt = `"Human: Hello\n\nAssistant:"`;
    // Debug log to verify prompt formatting
    console.log("DEBUG - Prompt sent to Bedrock:", formattedPrompt);
    const body = JSON.stringify({
      prompt: formattedPrompt,
      max_tokens_to_sample: maxTokens,
      stop_sequences: ["\nObservation:", "\nHuman:"],
    });
    const command = new InvokeModelCommand({
      modelId: this.modelId,
      contentType: "application/json",
      accept: "application/json",
      body,
    });
    const response = await this.client.send(command);
    if (!response.body) throw new Error("No response body from Bedrock");
    const decoder = new TextDecoder();
    const responseBody = decoder.decode(response.body);
    const parsed = JSON.parse(responseBody);
    return parsed.completion || parsed.output || responseBody;
  }
}
