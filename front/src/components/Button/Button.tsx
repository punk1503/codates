import "./Button.css"
import { ComponentProps, ReactNode } from 'react'

export default function Button(props: ComponentProps<'button'>) {
    return (
        <button {...props} className="custom_button">{props.children}</button>
    )
}