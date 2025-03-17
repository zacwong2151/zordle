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
            data: "Missing information"
        })
        return
    }

    try {
        const game = await Game.findOne({ _id: roomId })

        if (game) {
            res.status(200).send({
                data: game,
            })
        } else {
            res.status(404).send({
                data: null,
            })
        }
    } catch (error) {
        res.status(500).send({
            data: "Internal server error"
        })
    }
})

/**
 * Create game
 */
router.post("/", async (req: Request, res: Response) => {
    const {
        roomId,
        player1Email,
        player2Email,
        selectedWord,
        timer,
        words,
        wordIdx,
        gridColourState,
        keyboardColourState,
        isGameOver,
        popupMessage,
        triggerWordShakeAnimation,
        triggerLettersFlipAnimation,
        isKeyboardDisabled
    } = req.body

    if (!roomId || !player1Email || !player2Email || !selectedWord || timer === null || !words
        || wordIdx === null || !gridColourState || !keyboardColourState || isGameOver === null || !popupMessage
        || triggerWordShakeAnimation === null || triggerLettersFlipAnimation === null || isKeyboardDisabled === null
    ) {
        res.status(400).send({
            data: "Missing information"
        })
        return
    }

    const game = new Game({
        _id: roomId,
        player1Email: player1Email,
        player2Email: player2Email,
        selectedWord: selectedWord,
        timer: timer,
        words: words,
        wordIdx: wordIdx,
        gridColourState: gridColourState,
        keyboardColourState: keyboardColourState,
        isGameOver: isGameOver,
        popupMessage: popupMessage,
        triggerWordShakeAnimation: triggerWordShakeAnimation,
        triggerLettersFlipAnimation: triggerLettersFlipAnimation,
        isKeyboardDisabled: isKeyboardDisabled
    })

    try {
        await game.save()
        res.status(201).send({
            data: game
        })
    } catch (error: any) {
        if (error.code === DUPLICATE_KEY_CODE) {
            res.status(409).send({
                data: `Game with roomId: ${roomId} already exists`
            })
        } else {
            res.status(500).send({
                data: "Internal server error "
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
            data: "Missing information"
        })
        return
    }

    try {
        const game = await Game.findOneAndDelete({ _id: roomId })

        if (game) {
            res.status(200).send({
                data: `Successfully delete game: ${roomId}`,
            })
        } else {
            res.status(404).send({
                data: `Game with roomId: ${roomId} does not exist`,
            })
        }
    } catch (error) {
        res.status(500).send({
            data: "Internal server error "
        })
    }
})

/**
 * Update game. Do not put roomId in req body!
 */
router.put("/:roomId", async (req: Request, res: Response) => {
    const roomId = req.params.roomId
    const data = req.body

    if (!roomId || Object.keys(data).length === 0) {
        res.status(400).send({
            data: "Missing information"
        })
        return
    }

    try {
        const result = await Game.updateOne(
            { _id: roomId }, 
            { $set: data } // Updates only provided fields
        )

        if (result.modifiedCount === 0) {
            res.status(404).send({
                data: "Room not found or no changes made"
            })
            return
        }

        res.status(200).send({
            data: "Game updated successfully"
        })

    } catch (error) {
        res.status(500).send({
            data: "Internal server error "
        })
    }
})

export default router