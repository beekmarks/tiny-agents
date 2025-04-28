import { Agent } from "../agent/Agent";

(async () => {
  const agent = new Agent();
  await agent.run();
})();
