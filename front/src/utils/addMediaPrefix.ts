import { backendAdress } from "./env"

export default function addMediaPrefix(woPrefix: string) {
    return backendAdress + woPrefix
}