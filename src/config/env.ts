import dotenv from "dotenv";
dotenv.config();

export const config = {
  awsRegion: process.env.AWS_REGION || "us-east-1",
  awsProfile: process.env.AWS_PROFILE || "default",
  bedrockModelId: process.env.BEDROCK_MODEL_ID || "anthropic.claude-3.7",
};
