import { Component, treact } from "@treact";
import { useAlertStore } from "src/stores/alert";
import "/src/assets/styles/modules/alert.scss";

export const Alert: Component = () => {
	const [alertStore, modAlertStore] = useAlertStore();
	const [timeoutID, setTimeoutID] = treact.useState(NaN as number);

	if (alertStore) {
		treact.useEffect(() => {
			clearTimeout(timeoutID);
			setTimeoutID(window.setTimeout(() => modAlertStore.set(undefined), 4000));
		}, [alertStore]);

		const hide = () => {
			clearTimeout(timeoutID);
			modAlertStore.set(undefined);
		};

		return (
			<div onClick={hide} className={`alert alert-${alertStore.level}`}>
				<p>{alertStore.message}</p>
			</div>
		);
	}

	return null;
};
