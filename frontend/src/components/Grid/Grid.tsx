import Row from "./Row";
import Popup from "./Popup";

export default function Grid() {
    return (
        <>
            <div className="grid gap-2">
                <Row rowPos={0} />
                <Row rowPos={1} />
                <Row rowPos={2} />
                <Row rowPos={3} />
                <Row rowPos={4} />
                <Row rowPos={5} />
            </div>
            <Popup />
        </>
    )
}