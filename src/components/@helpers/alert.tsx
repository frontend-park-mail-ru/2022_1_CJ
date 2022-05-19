import { Component, treact } from "@treact";
import { useAlertStore } from "src/stores/alert";
import "/src/assets/styles/modules/alert.scss";

export const Alert: Component = () => {
	const [alertStore, modAlertStore] = useAlertStore();
	const [timeoutID, setTimeoutID] = treact.useState(null as number);

	if (alertStore) {
		treact.useEffect(() => {
			clearTimeout(timeoutID);
			setTimeoutID(setTimeout(() => modAlertStore.set(null), 2500));
		}, [alertStore]);

		const hide = () => {
			clearTimeout(timeoutID);
			modAlertStore.set(null);
		};

		return (
			<div onClick={hide} className={`alert alert-${alertStore.level}`}>
				<p>{alertStore.message}</p>
			</div>
		);
	}
	return null;
};
