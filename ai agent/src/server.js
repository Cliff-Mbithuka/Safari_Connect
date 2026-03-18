const app = require("./app");
const { port } = require("./config/env");

app.listen(port, () => {
  console.log(`AI agent listening on port ${port}`);
});
