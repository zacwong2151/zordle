import { useWordleContext } from "@/contexts/WordleContext";

export default function Popup() {
  const { popupMessage } = useWordleContext()
  if (!popupMessage) return null

  return (
    <div className="absolute top-28 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="bg-slate-950 border border-gray-300 rounded-md shadow-md p-3 text-center">
        <p className="text-sm font-medium text-white">{popupMessage}</p>
      </div>
    </div>
  )
}

