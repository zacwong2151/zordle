import express, { Request, Response } from "express";
import cors from "cors";
import { words_to_guess } from "./words-to-guess";
import { words_to_accept } from "./words-to-accept";

const app = express();
const PORT = 8000;

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://zordle.fly.dev"] , // Allow requests from dev and prod frontends
  methods: "GET,POST,PUT,DELETE",
  credentials: true, // If using cookies or authentication
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

/**
 * Retrieves and returns a random word from wordsToGuess.
 */
app.get('/random-word', (req: Request, res: Response) => {
  const randomPos = Math.floor(Math.random() * words_to_guess.length)  
  const randomWord = words_to_guess[randomPos]

  res.status(200).send({
    word: randomWord
  })
});

/**
 * Checks if word is in wordsToAccept. Returns appropriate HTTP status code.
 */
app.get('/is-word-in-DB/:word', (req: Request, res: Response) => {
  const word = req.params.word

  if (typeof word !== 'string') {
    res.status(400).send({
      message: 'Query parameter must a string'
    });
  }

  if (words_to_accept.includes(word)) {
    res.status(200).send({
      message: 'Word found in database'
    })
  } else {
    res.status(404).send({
      message: 'Word is not found in database'
    })
  }
})

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});