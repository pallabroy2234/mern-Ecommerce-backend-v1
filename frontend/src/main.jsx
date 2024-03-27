import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {Provider} from "react-redux";
import store from "./store/index.js";
import {Toaster} from "react-hot-toast";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev/index.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<>
		<Provider store={store}>
			<DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
				<App />
			</DevSupport>
			<Toaster
				toastOptions={{
					position: "bottom-center",
					style: {
						background: "white",
						color: "black",
						animationDuration: "0.5s",
					},
				}}
			/>
		</Provider>
	</>,
);
