import express from "express";
import { body, validationResult } from "express-validator";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());
const port = 3000;

const data = [
  { email: "jim@gmail.com", number: "221122" },
  { email: "jam@gmail.com", number: "830347" },
  { email: "john@gmail.com", number: "221122" },
  { email: "jams@gmail.com", number: "349425" },
  { email: "jams@gmail.com", number: "141424" },
  { email: "jill@gmail.com", number: "822287" },
  { email: "jill@gmail.com", number: "822286" },
];
let currentTimeout: NodeJS.Timeout;

app.post(
  "/search",
  body("email").isEmail().withMessage("Invalid email format"),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ err: errors.array() });
    }
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    currentTimeout = setTimeout(() => {
      const { email, number } = req.body;
      const results = data.filter(
        (user) =>
          user.email.includes(email) &&
          (!number || user.number.includes(number))
      );
      res.json(results);
    }, 5000);
  }
);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
