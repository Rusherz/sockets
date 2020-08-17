import Link from "next/link"
import Chat from "../components/Chat"

const IndexPage = () => (
	<>
		<Chat />
		<h1>Hello Next.js 👋</h1>
		<p>
			<Link href="/about">
				<a>About</a>
			</Link>
		</p>
	</>
)

export default IndexPage
