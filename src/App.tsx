import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { SectionPage } from "./pages/SectionPage";

export function App() {
	return (
		<Routes>
			<Route element={<Layout />}>
				<Route index element={<Home />} />
				<Route path=":sectionId" element={<SectionPage />} />
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}
