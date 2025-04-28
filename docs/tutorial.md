# Tiny Agents Educational Tutorial

This tutorial will guide you through:
- What agents are and how they work
- The architecture of this TypeScript tiny agent app
- Setting up AWS Bedrock and credentials
- Running and extending the agent

## 1. What Are Agents?
Agents are programs that use language models (LLMs) to reason, plan, and take actions by interacting with tools (like filesystems, browsers, etc.).

## 2. Architecture Overview
- **Agent**: Orchestrates the conversation loop and tool use
- **BedrockClaudeClient**: Handles communication with Claude 3.7 via AWS Bedrock
- **ToolClient**: Interface for tools (filesystem, browser, etc.)
- **CLI**: Command-line interface for user interaction

## 3. Setup Instructions
1. Clone the repo and install dependencies:
   ```bash
   git clone <this-repo-url>
   cd tiny-agents
   npm install
   ```
2. Configure AWS credentials and region in `.env` (see README)
3. Set the `BEDROCK_MODEL_ID` for Claude 3.7
4. Run the agent:
   ```bash
   npm run start
   ```

## 4. How the Agent Works (Step by Step)
1. Loads AWS credentials and Bedrock model config
2. Starts a conversation loop
3. For each user message:
    - Sends prompt to Claude 3.7 via Bedrock
    - Parses and executes tool calls if needed
    - Returns results and continues the loop

## 5. Extending the Agent
- Add new tools by implementing the ToolClient interface in TypeScript
- Register new tools in the agent

## 6. Further Reading
- [Hugging Face Tiny Agents Blog](https://huggingface.co/blog/tiny-agents)
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/)

---

For more details, see the inline comments in each source file!
