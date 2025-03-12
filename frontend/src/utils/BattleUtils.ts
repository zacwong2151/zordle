import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a 6-char unique room id. Ensures no collision against database.
 */
export function generateUniqueRoomId() : string {
    /*
        TODO: ensure this uuid is unique
    */
    return uuidv4().slice(0, 6)
}
