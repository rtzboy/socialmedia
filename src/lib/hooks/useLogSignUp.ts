import { useState } from 'react';

const InitialLoginState = { loading: false, error: '' };

const useLogSignUp = () => {
	const [logSignUp, setLogSignUp] = useState(InitialLoginState);

	const loadingLogSign = () => setLogSignUp({ error: '', loading: true });

	const errorLogSign = (error: string) => setLogSignUp({ loading: false, error });

	const resetLogSign = () => setLogSignUp({ ...InitialLoginState });

	return { logSignUp, loadingLogSign, errorLogSign, resetLogSign };
};

export default useLogSignUp;
