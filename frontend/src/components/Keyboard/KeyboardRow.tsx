import React from "react";

export default function KeyboardRow({ children } : { children: React.ReactNode} ) {
    return (
        <div className="gap-2 flex my-2">
            {children}
        </div>
    )
}