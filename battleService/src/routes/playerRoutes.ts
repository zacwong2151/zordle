import mongoose from "mongoose";
import { Router, Request, Response } from "express";
import { Player } from "../models/Player";
import { Game } from "../models/Game";
import { PlayerType } from "../models/Player";
import { GameType } from "../models/Game";

const DUPLICATE_KEY_CODE = 11000

const router = Router()

/**
 * Get player
 */
router.get("/:email", async (req: Request, res: Response) => {
    const email = req.params.email

    if (!email) {
        res.status(400).send({
            data: null,
            message: "Email cannot be null or blank",
            success: false
        })
        return
    }

    try {
        const player = await Player.findOne({ _id: email })

        if (player) {
            res.status(200).send({
                data: player,
                message: `Successfully retrieved player: ${email}`,
                success: true
            })
        } else {
            res.status(404).send({
                data: null,
                message: `Player: ${email} not found`,
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
 * Create player
*/
router.post("/", async (req: Request, res: Response) => {
    const { email, roomId } = req.body

    if (!email || !roomId) {
        res.status(400).send({
            data: null,
            message: `Email and roomId cannot be null or blank`,
            success: false
        })
        return
    }

    const player = new Player({
        _id: email,
        roomId: roomId
    })

    try {
        await player.save()
        res.status(201).send({
            data: player,
            message: `Successfully created player: ${email}`,
            success: true
        })
    } catch (error: any) {
        if (error.code === DUPLICATE_KEY_CODE) {
            res.status(409).send({
                data: null,
                message: `Player: ${email} already exists`,
                success: false
            })
        } else {
            res.status(500).send({
                data: null,
                message: "Internal server error",
                success: false
            })
        }
    }
})

/**
 * Delete player and remove it from corresponding game (with transaction)
 */
router.delete("/:email", async (req: Request, res: Response) => {
    const email = req.params.email

    if (!email) {
        res.status(400).send({
            success: false,
            message: "Email cannot be blank or null",
        })
        return
    }

    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const player: PlayerType | null = await Player.findOneAndDelete({ _id: email }).session(session)

        if (!player) {
            await session.abortTransaction()
            session.endSession()
            res.status(404).send({
                success: false,
                message: `Player with email: ${email} does not exist`,
            })
            return
        }

        const roomId = player.roomId

        const game: GameType | null = await Game.findOne({ _id: roomId }).session(session)

        if (!game) {
            await session.abortTransaction()
            session.endSession()
            res.status(404).send({
                success: false,
                message: `Game of id: ${roomId} does not exist`,
            })
            return
        }

        if (game.player1Email === email) {
            game.player1Email = null
        } else if (game.player2Email === email) {
            game.player2Email = null
        } else {
            console.error("should not reach here")
        }

        if (!game.player1Email && !game.player2Email) {
            await Game.findOneAndDelete({ _id: roomId }).session(session)
        } else {
            await game.save({ session });
        }

        await session.commitTransaction()
        session.endSession()

        res.status(200).send({
            success: true,
            message: `Player ${email} removed successfully. Game: ${roomId} modified/deleted successfully`,
        })

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        res.status(500).send({
            success: false,
            message: "Internal server error",
        })
    }
})

export default router