
# Tiny Agents with Claude 3.7 on AWS Bedrock (TypeScript)

Welcome! This project is an educational implementation of the "tiny agents" concept from the [Hugging Face blog post](https://huggingface.co/blog/tiny-agents), using the Claude 3.7 model on AWS Bedrock as the LLM. It is written entirely in TypeScript, and is designed to help developers understand how agents work and how to build them in a modern cloud environment.

## Features
- **Agent loop and tool interface** based on the Hugging Face example
- **Claude 3.7 via AWS Bedrock** for local inference
- **AWS authentication** using `@aws-sdk/credential-providers` (`fromIni`)
- **Extensible tool system** (filesystem, browser, etc.)
- **Educational documentation** and step-by-step tutorial

---

## Quick Start

### 1. Prerequisites
- Node.js (v18+ recommended)
- AWS account with Bedrock access (Claude 3.7 model)
- AWS credentials configured (see below)

### 2. Clone and Install
```bash
git clone <this-repo-url>
cd tiny-agents
npm install
```

### 3. Configure AWS Credentials
This app uses the AWS SDK's `fromIni` credential provider, so you can use your `~/.aws/credentials` file or set environment variables.

- **Option 1: Use AWS Profile**
  - Edit `.env` and set `AWS_PROFILE=your-profile-name`
- **Option 2: Use Access Keys**
  - Edit `.env` and set `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, and `AWS_REGION`

### 4. Configure Bedrock Model
- Edit `.env` and set `BEDROCK_MODEL_ID` to the Claude 3.7 model ID (e.g., `anthropic.claude-3.7`)

### 5. Run the Agent
```bash
npm run start
```

---

## Documentation
- See [docs/tutorial.md](docs/tutorial.md) for a step-by-step walkthrough of the agent architecture, code, and extension points.
- Inline comments and educational callouts are included throughout the codebase.

## References
- [Hugging Face Tiny Agents Blog](https://huggingface.co/blog/tiny-agents)
- [AWS Bedrock Documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/)
- [Anthropic Claude on AWS Bedrock](https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html)

---

## License
MIT

