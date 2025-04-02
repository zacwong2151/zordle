import { Router, Request, Response } from "express";
import { Game } from "../models/Game";

const DUPLICATE_KEY_CODE = 11000

const router = Router()

/**
 * Get game
 */
router.get("/:roomId", async (req: Request, res: Response) => {
    const roomId = req.params.roomId

    if (!roomId) {
        res.status(400).send({
            data: null,
            message: "roomId cannot be null or blank",
            success: false
        })
        return
    }

    try {
        const game = await Game.findOne({ _id: roomId })

        if (game) {
            res.status(200).send({
                data: game,
                message: `Successfully retrieved game: ${roomId}`,
                success: true
            })
        } else {
            res.status(404).send({
                data: null,
                message: `Game: ${roomId} not found`,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send({
            data: null,
            message: "Internal server error",
            success: false
        })
    }
})

/**
 * Create game
 */
router.post("/", async (req: Request, res: Response) => {
    const {
        roomId,
        atReadyPage,
        selectedWord,
        timer,

        player1Email,
        isPlayer1Ready,
        player1_words,
        player1_wordIdx,
        player1_gridColourState,
        player1_keyboardColourState,
        player1_isGameOver,

        player2Email,
        isPlayer2Ready,
        player2_words,
        player2_wordIdx,
        player2_gridColourState,
        player2_keyboardColourState,
        player2_isGameOver,
    } = req.body

    if (!roomId || !player1Email || !player2Email) {
        res.status(400).send({
            message: `roomId, player1Id, player2Id cannot be null or blank`,
            success: false
        })
        return
    }

    const game = new Game({
        _id: roomId,
        atReadyPage: atReadyPage,
        selectedWord: selectedWord,
        timer: timer,
        
        player1Email: player1Email,
        isPlayer1Ready: isPlayer1Ready,
        player1_words: player1_words,
        player1_wordIdx: player1_wordIdx,
        player1_gridColourState: player1_gridColourState,
        player1_keyboardColourState: player1_keyboardColourState,
        player1_isGameOver: player1_isGameOver,
        
        player2Email: player2Email,
        isPlayer2Ready: isPlayer2Ready,
        player2_words: player2_words,
        player2_wordIdx: player2_wordIdx,
        player2_gridColourState: player2_gridColourState,
        player2_keyboardColourState: player2_keyboardColourState,
        player2_isGameOver: player2_isGameOver,
    })

    try {
        await game.save()
        res.status(201).send({
            message: `Successfully created game: ${roomId}`,
            success: true
        })
    } catch (error: any) {
        if (error.code === DUPLICATE_KEY_CODE) {
            res.status(409).send({
                message: `Game: ${roomId} already exists`,
                success: false
            })
        } else {
            res.status(500).send({
                message: "Internal server error",
                success: false
            })
        }
    }
})

/**
 * Delete game
 */
router.delete("/:roomId", async (req: Request, res: Response) => {
    const roomId = req.params.roomId

    if (!roomId) {
        res.status(400).send({
            message: "roomId cannot be null or blank",
            success: false
        })
        return
    }

    try {
        const game = await Game.findOneAndDelete({ _id: roomId })

        if (game) {
            res.status(200).send({
                message: `Successfully delete game: ${roomId}`,
                success: true
            })
        } else {
            res.status(404).send({
                message: `Game: ${roomId} does not exist`,
                success: false
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            success: false
        })
    }
})

/**
 * Update game. Do not put roomId in req body!
 */
router.put("/:roomId", async (req: Request, res: Response) => {
    const roomId = req.params.roomId
    const message = req.body // TODO: use zod library to define UpdateGameSchema and validate request body

    if (!roomId || Object.keys(message).length === 0) {
        res.status(400).send({
            message: "roomId and request body cannot be blank",
            success: false
        })
        return
    }

    try {
        const result = await Game.updateOne(
            { _id: roomId },
            { $set: message } // Updates only provided fields
        )

        if (result.modifiedCount === 0) {
            res.status(404).send({
                message: "Room not found or no changes made",
                success: false
            })
        } else {
            res.status(200).send({
                message: `Game: ${roomId} updated successfully`,
                success: true
            })
        }
    } catch (error) {
        res.status(500).send({
            message: "Internal server error",
            success: false
        })
    }
})

export default router