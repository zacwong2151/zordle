import React from "react";

export default function KeyboardRow({ children } : { children: React.ReactNode} ) {
    return (
        <div className="flex w-full justify-center gap-1 md:gap-2 my-1 md:my-2">
            {children}
        </div>
    )
}