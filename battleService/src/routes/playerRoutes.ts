import { Router, Request, Response } from "express";
import { Player } from "../models/Player";

const DUPLICATE_KEY_CODE = 11000

const router = Router()

/**
 * Get player
 */
router.get("/:email", async (req: Request, res: Response) => {
    const email = req.params.email

    if (!email) {
        res.status(400).send({
            data: "Missing information"
        })
        return
    }

    try {
        const player = await Player.findOne({ _id: email })

        if (player) {
            res.status(200).send({
                data: player,
            })
        } else {
            res.status(404).send({
                data: "Player not found",
            })
        }
    } catch (error) {
        res.status(500).send({
            data: "Internal server error"
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
            data: "Missing information"
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
            data: player
        })
    } catch (error: any) {
        if (error.code === DUPLICATE_KEY_CODE) {
            res.status(409).send({
                data: `Player with email: ${email} already exists` 
            })
        } else {
            res.status(500).send({
                data: "Internal server error "
            })
        }
    }
})

/**
 * Delete player
 */
router.delete("/:email", async (req: Request, res: Response) => {
    const email = req.params.email

    if (!email) {
        res.status(400).send({
            data: "Missing information"
        })
        return
    }

    try {
        const player = await Player.findOneAndDelete({ _id: email })

        if (player) {
            res.status(200).send({
                data: `Successfully delete player: ${email}`,
            })
        } else {
            res.status(404).send({
                data: `Player with email: ${email} does not exist`,
            })
        }
    } catch (error) {
        res.status(500).send({
            data: "Internal server error "
        })
    }
})

export default router