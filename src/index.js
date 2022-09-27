require("dotenv").config();
require("./database");
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`run server in: http://localhost:${PORT}`));
