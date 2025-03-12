/*
    One schema: 

    - roomId (unique): 6 digit code 
    - player1_id: email
    - player2: email
- 
    generic game state:
    - selectedWord
    - timer
- 
    individual game state (repeated for each player):
    - words
    - wordIdx
    - gridColourState
    - keyboardColourState
    - isGameOver
    - popupMessage
    - triggerWordShakeAnimation
    - triggerLettersFlipAnimation
    - isKeyboardDisabled
*/

/**
 * Checks if user is currently playing a game or not
 */
export function isUserInGame(email: string) : boolean {
    return false
}