import { Button } from "../ui/button"
import { useNavigate } from "react-router-dom"

export default function Battle() {
    const navigate = useNavigate()

    return (
        <>
            <div>welcome to the battle page</div>
            <Button
                className="bg-black text-white rounded-3xl"
                size="lg"
                onClick={() => navigate("/")}
            >
                back
            </Button>
        </>
    )
}