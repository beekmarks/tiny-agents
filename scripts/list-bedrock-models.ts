import { BedrockClient, ListFoundationModelsCommand } from "@aws-sdk/client-bedrock";
import dotenv from "dotenv";

dotenv.config();

const REGION = process.env.AWS_REGION || "us-east-1";

async function listModels() {
  const client = new BedrockClient({ region: REGION });
  const command = new ListFoundationModelsCommand({});
  try {
    const response = await client.send(command);
    if (response.modelSummaries) {
      console.log("Available Bedrock Models in region:", REGION);
      for (const model of response.modelSummaries) {
        console.log(`- Model ID: ${model.modelId} | Provider: ${model.providerName} | Name: ${model.modelName}`);
      }
    } else {
      console.log("No models found.");
    }
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();
