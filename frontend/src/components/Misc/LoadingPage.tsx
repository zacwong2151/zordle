import ReactLoading from 'react-loading'

/*
    Available types: blank, balls, bars, bubbles, cubes, cylon, spin, spinningBubbles, spokes
*/
export default function LoadingPage() {
    return (
        <div className="flex flex-col justify-center items-center py-64 gap-12">
            <ReactLoading type="spin" color="blue" width={100} height={100} />
            <div className="font-bold text-2xl">Loading...</div>
        </div>
    )
}