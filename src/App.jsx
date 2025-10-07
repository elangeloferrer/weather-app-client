import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);

	return (
		<>
			<div>
				<p className="text-6xl font-bold text-amber-300 drop-shadow-lg">
					🚀 Tailwind v4 Works!
				</p>
			</div>
		</>
	);
}

export default App;
