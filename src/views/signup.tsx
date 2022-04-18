// import { Layout } from "../components/layout";
// import { SignupForm } from "../components/signupForm";
import { treact } from "@treact";

// export function Signup() {
// 	return (
// 		<Layout>
// 			<SignupForm />
// 		</Layout>
// 	);
// }

type CountStore = {
	count: number;
	increment?: Function;
	decrement?: Function;
};

const useCountStore = treact.createStore((_, set): CountStore => {
	return {
		count: 0,
		increment: () => set((store: CountStore) => ({ ...store, count: store.count + 1 })),
		decrement: () => set((store: CountStore) => ({ ...store, count: store.count - 1 })),
	};
});

const Increment = () => {
	const { increment } = useCountStore() as CountStore;
	return <button onclick={increment}>increment</button>;
};

const Decrement = () => {
	const { decrement } = useCountStore() as CountStore;
	return <button onclick={decrement}>decrement</button>;
};

const Count = () => {
	const store = useCountStore() as CountStore;
	const { count } = store;
	return <h1>{count}</h1>;
};

export function Signup() {
	return (
		<div>
			<Count />
			<Increment />
			<Decrement />
		</div>
	);
}
