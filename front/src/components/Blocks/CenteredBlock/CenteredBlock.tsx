import { ReactNode } from "react";
import "./CenteredBlock.css"

export default function CenteredBlock({children} : {children: ReactNode}) {
    return (
        <div className="centered_block">
            {children}
        </div>
    )
}