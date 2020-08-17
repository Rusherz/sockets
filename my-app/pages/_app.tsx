import "../styles/main.scss"
import { wrapper } from "../store/store"
import Layout from "../components/Layout"

const WrappedApp = ({ Component, pageProps }: any) => {
	return (
		<Layout title="Users List | Next.js + TypeScript Example">
			<Component {...pageProps} />
		</Layout>
	)
}

export default wrapper.withRedux(WrappedApp)
