import { Component, treact } from "@treact";
import { useAlertStore } from "src/stores/alert";
import "/src/assets/styles/modules/alert.scss";

export const Alert: Component = () => {
	const [alertStore] = useAlertStore();
	const [active, setActive] = treact.useState(true);
	const [timeoutID, setTimeoutID] = treact.useState(NaN as number);

	if (alertStore) {
		const hide = () => {
			clearTimeout(timeoutID);
			setActive(false);
		};

		treact.useEffect(() => {
			setActive(true);
			clearTimeout(timeoutID);
			setTimeoutID(window.setTimeout(hide, 3000));
		}, [alertStore]);

		if (!active) {
			return null;
		}

		return (
			<div onClick={hide} className={`alert alert-${alertStore.level}`}>
				<p>{alertStore.message}</p>
			</div>
		);
	}

	return null;
};
