import "./MatchingPage.css"
import UserCard from "../../components/UserCard"
import { CenteredBlock } from "../../components/Blocks"

export default function MatchingPage() {
    return (
        <CenteredBlock style={{marginTop: '5rem'}}>
            <UserCard
            />
        </CenteredBlock>
    )
}