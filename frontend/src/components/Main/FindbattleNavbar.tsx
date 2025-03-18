import { IoHomeOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";
import { GiBattleGear } from "react-icons/gi";
import { Link } from "react-router-dom"
import { useUserContext } from "@/contexts/UserContext";
import UserStats from "./UserStats";

export default function FindbattleNavbar() {
    const { isAuth, picture, setIsUserStatsModalOpen } = useUserContext()

    const unauthenticatedUserProfile = !isAuth && (
        <div className="absolute right-8 rounded-full bg-slate-300 hover:brightness-90 w-10 h-10 flex items-center justify-center" >
            <CiUser
                className="text-2xl cursor-pointer"
                onClick={() => setIsUserStatsModalOpen(true)}
            />
        </div>
    )

    const authenticatedUserProfile = isAuth && (
        <img
            src={picture}
            alt="User Profile"
            className="rounded-full absolute right-8 w-10 cursor-pointer hover:brightness-90"
            onClick={() => setIsUserStatsModalOpen(true)}
        />
    )

    return (
        <>
            <UserStats />
            <nav className="bg-slate-200 text-gray-800 p-4 border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-center h-8 gap-x-24">
                    <Link 
                        to="/"
                        className="hover:text-blue-800 cursor-pointer text-2xl"
                    >
                        <IoHomeOutline />
                    </Link>
                    <Link
                        to="/battle"
                        className="hover:text-blue-800 cursor-pointer text-2xl"
                    >
                        <GiBattleGear />
                    </Link>
                    {isAuth ? authenticatedUserProfile : unauthenticatedUserProfile}
                </div>
            </nav>
        </>
    )
}