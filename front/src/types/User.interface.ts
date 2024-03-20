import { Technology } from "./Technology.interface"
import { Image } from "./Image.interface"

export type User = {
    id: number,
    username: string,
    name: string,
    first_name: string,
    age: number,
    description: string,
    images: Image[],
    technologies:Technology[],
    code_snippet: string,
    code_theme: string,
    theme: string,
}