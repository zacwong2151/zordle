import { v4 as uuidv4 } from 'uuid';
import { isRoomIdValid } from '@/apis/BattleApis';

/**
 * Generates a 6-char unique room id. Ensures no collision against database.
 */
export async function generateUniqueRoomId(): Promise<string> {
    const uuid = uuidv4().slice(0, 6).toUpperCase()
    if (await isRoomIdValid(uuid)) {
        return await generateUniqueRoomId()
    }
    return uuid
}
