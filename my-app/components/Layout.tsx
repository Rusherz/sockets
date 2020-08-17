import Link from "next/link"
import Head from "next/head"
import React, { ReactNode } from "react"
import Grid from "@material-ui/core/Grid"
import AppBar from "@material-ui/core/AppBar"
import Button from "@material-ui/core/Button"
import MenuIcon from "@material-ui/icons/Menu"
import Toolbar from "@material-ui/core/Toolbar"
import IconButton from "@material-ui/core/IconButton"

type Props = {
	children?: ReactNode
	title?: string
}

const Layout = ({ children, title = "This is the default title" }: Props) => (
	<div>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta
				name="viewport"
				content="initial-scale=1.0, width=device-width"
			/>
		</Head>
		<header>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<span
						style={{
							flexGrow: 1,
						}}
					></span>
					<Link href="/users">
						<Button color="inherit">Login</Button>
					</Link>
				</Toolbar>
			</AppBar>
		</header>
		<Grid
			item
			xs={12}
			container
			justify="space-around"
			spacing={1}
		>
			{children}
		</Grid>
		<footer>
			<hr />
			<span>I'm here to stay (Footer)</span>
		</footer>
	</div>
)

export default Layout
