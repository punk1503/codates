import { ReactNode } from "react";
import "./CenteredBlock.css"

export default function CenteredBlock({children, style} : {children: ReactNode, style?: React.CSSProperties }) {
    return (
        <div className="centered_block" style={style}>
            {children}
        </div>
    )
}