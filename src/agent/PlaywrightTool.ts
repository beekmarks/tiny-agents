/**
 * PlaywrightTool: Example tool for browser automation/search using Playwright
 *
 * This tool demonstrates how an agent can interact with a web browser.
 * For simplicity, this version launches a headless browser, navigates to a URL,
 * and returns the page title and a snippet of text content.
 *
 * Educational callout: In a real-world agent, you might expose more browser actions
 * (click, fill, scrape, etc.) or connect to a Playwright MCP server for richer tool APIs.
 *
 * Usage: 'tool: playwright_browse <url>'
 */
import { Tool } from "./ToolClient";

export class PlaywrightTool implements Tool {
  name = "playwright_browse";
  description = "Browse a URL using Playwright and return the page title and snippet. Input: URL.";

  async run(input: string): Promise<string> {
    // Import Playwright dynamically so the dependency is optional
    let browser;
    try {
      const { chromium } = await import("playwright");
      browser = await chromium.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(input.trim(), { timeout: 15000 });
      const title = await page.title();
      const snippet = await page.textContent("body");
      await browser.close();
      // Educational callout: Limit snippet length for readability
      return `Title: ${title}\nSnippet: ${(snippet || "").slice(0, 300)}...`;
    } catch (err: any) {
      if (browser) await browser.close();
      return `Error browsing URL: ${err.message}`;
    }
  }
}
