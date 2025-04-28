/**
 * Agent class orchestrates the conversation loop, LLM calls, and tool usage.
 * This version is enhanced to support tool registration and execution, and is heavily commented for educational clarity.
 */
import { BedrockClaudeClient } from "../aws/BedrockClaudeClient";
import { Tool, ToolRegistry, FilesystemTool } from "./ToolClient";
import { PlaywrightTool } from "./PlaywrightTool";

export class Agent {
  private llm: BedrockClaudeClient;
  private tools: ToolRegistry;

  constructor() {
    this.llm = new BedrockClaudeClient();
    this.tools = new ToolRegistry();
    // Educational callout: Register tools here. You can add more tools following the FilesystemTool example.
    this.tools.register(new FilesystemTool());
    // Educational callout: Register the PlaywrightTool for browser automation (requires Playwright dependency).
    this.tools.register(new PlaywrightTool());
  }

  /**
   * Main agent loop: interacts with the user, calls LLM, executes tools.
   * Educational callout: This loop demonstrates both LLM and direct tool usage.
   */
  async run() {
    console.log("Welcome to the Tiny Agent! Type 'exit' to quit.");
    const readline = await import("readline");
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    const ask = (q: string) => new Promise<string>(res => rl.question(q, res));
    while (true) {
      const userInput = await ask("You: ");
      if (userInput.trim().toLowerCase() === "exit") break;
      // Educational callout: Allow direct tool calls for demonstration, e.g. 'tool: filesystem_read ./README.md'
      if (userInput.startsWith("tool:")) {
        const [_, toolName, ...args] = userInput.split(" ");
        const tool = this.tools.get(toolName);
        if (!tool) {
          console.log(`No such tool: ${toolName}`);
        } else {
          const result = await tool.run(args.join(" "));
          console.log(`Tool result: ${result}`);
        }
        continue;
      }
      // Otherwise, send to LLM (future: parse tool calls from LLM output)
      const prompt = this.buildPrompt(userInput);
      const response = await this.llm.complete(prompt);
      console.log("Agent:", response.trim());
    }
    rl.close();
    console.log("Goodbye!");
  }

  /**
   * Builds the prompt for the LLM.
   * Educational callout: In a full agent, this would include tool descriptions and previous conversation.
   */
  buildPrompt(userInput: string): string {
    const toolList = this.tools.list().map(t => `- ${t.name}: ${t.description}`).join("\n");
    return `You are an agent that can use tools.\nAvailable tools:\n${toolList}\n\nUser: ${userInput}\nAgent:`;
  }
}
