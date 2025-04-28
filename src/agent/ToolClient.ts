/**
 * Tool interface for Tiny Agents
 *
 * Tools allow the agent to take actions in the real world, such as reading files or browsing the web.
 * Each tool implements the Tool interface and provides a name, description, and a run method.
 *
 * This design makes it easy to add new tools by simply implementing the interface and registering the tool.
 *
 * Example tools: FilesystemTool, BrowserTool, CalculatorTool, etc.
 */

export interface Tool {
  /**
   * The name of the tool (used in prompts and tool calls)
   */
  name: string;

  /**
   * A short description of what the tool does (for the agent's prompt)
   */
  description: string;

  /**
   * Run the tool with the given input. Returns a Promise of the tool's output as a string.
   * @param input - The input string (arguments, query, etc.)
   */
  run(input: string): Promise<string>;
}

/**
 * ToolRegistry manages available tools and allows lookup by name.
 *
 * This makes it easy for the agent to find and use tools dynamically.
 */
export class ToolRegistry {
  private tools: Map<string, Tool> = new Map();

  /**
   * Register a new tool
   */
  register(tool: Tool) {
    this.tools.set(tool.name, tool);
  }

  /**
   * Get a tool by name
   */
  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  /**
   * List all registered tools
   */
  list(): Tool[] {
    return Array.from(this.tools.values());
  }
}

/**
 * Example: FilesystemTool (reads a file from disk)
 *
 * This demonstrates how to implement a concrete tool.
 * In a real application, you would add error handling and security checks.
 */
import { promises as fs } from "fs";

export class FilesystemTool implements Tool {
  name = "filesystem_read";
  description = "Read the contents of a file from disk. Input: file path.";

  async run(input: string): Promise<string> {
    try {
      const content = await fs.readFile(input.trim(), "utf-8");
      return content;
    } catch (err: any) {
      return `Error reading file: ${err.message}`;
    }
  }
}
