import "./MatchingPage.css"
import UserCard from "../../components/UserCard"
import { CenteredBlock } from "../../components/Blocks"

export default function MatchingPage() {
    return (
        <CenteredBlock style={{marginTop: '5rem'}}>
            <UserCard name="Andrey"
                age={19}
                description="lorem ipsum"
                photos={["https://placehold.co/400x400", "https://placehold.co/600x400", "https://placehold.co/400x600", "https://placehold.co/600x600"]}
                technologies={[
                    {name: "React",
                        background_color: "rgb(0, 110, 230)",
                        font_color: "#ffffff"
                    }
                    ]} 
                code="print('Hello World')"
                theme="atom-one-dark"
            />
        </CenteredBlock>
    )
}