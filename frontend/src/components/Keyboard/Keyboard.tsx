import KeyboardRow from "./KeyboardRow";
import KeyboardSymbol from "./KeyBoardSymbol";
import KeyboardListener from "./KeyboardListener";

export default function Keyboard() {
    return (
        <div className="flex flex-col items-center">
            <KeyboardListener />
            <KeyboardRow>
                <KeyboardSymbol symbol={"Q"} />
                <KeyboardSymbol symbol={"W"} />
                <KeyboardSymbol symbol={"E"} />
                <KeyboardSymbol symbol={"R"} />
                <KeyboardSymbol symbol={"T"} />
                <KeyboardSymbol symbol={"Y"} />
                <KeyboardSymbol symbol={"U"} />
                <KeyboardSymbol symbol={"I"} />
                <KeyboardSymbol symbol={"O"} />
                <KeyboardSymbol symbol={"P"} />
            </KeyboardRow> 
            <KeyboardRow>
                <KeyboardSymbol symbol={"A"} />
                <KeyboardSymbol symbol={"S"} />
                <KeyboardSymbol symbol={"D"} />
                <KeyboardSymbol symbol={"F"} />
                <KeyboardSymbol symbol={"G"} />
                <KeyboardSymbol symbol={"H"} />
                <KeyboardSymbol symbol={"J"} />
                <KeyboardSymbol symbol={"K"} />
                <KeyboardSymbol symbol={"L"} />
            </KeyboardRow> 
            <KeyboardRow>
                <KeyboardSymbol symbol={"ENTER"} />
                <KeyboardSymbol symbol={"Z"} />
                <KeyboardSymbol symbol={"X"} />
                <KeyboardSymbol symbol={"C"} />
                <KeyboardSymbol symbol={"V"} />
                <KeyboardSymbol symbol={"B"} />
                <KeyboardSymbol symbol={"N"} />
                <KeyboardSymbol symbol={"M"} />
                <KeyboardSymbol symbol={"BACKSPACE"} />
            </KeyboardRow> 
        </div>
    )
}