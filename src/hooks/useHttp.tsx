import { useCallback, useState } from 'react';

interface SendRequestTypes {
	url: string;
	requestConfig: RequestInit;
	dataTransformer: DataTransformType;
}

export interface UseHttpTypes {
	isLoading: boolean;
	isError: boolean;
	sendRequest: ({
		url,
		requestConfig,
		dataTransformer,
	}: SendRequestTypes) => Promise<void>;
}

type DataTransformType = (data: any) => void;

const useHttp = (): UseHttpTypes => {
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const sendRequest = useCallback(
		async ({ url, requestConfig, dataTransformer }: SendRequestTypes) => {
			setIsloading(true);
			try {
				const response = await fetch(url, {
					method: requestConfig.method,
					body: requestConfig.body,
					headers: requestConfig.headers,
				});

				if (!response.ok) {
					throw new Error('Something went wrong');
				}

				const data = await response.json();
				dataTransformer(data);
			} catch (err) {
				setIsError(true);
			}
			setIsloading(false);
		},
		[]
	);

	return {
		isLoading,
		isError,
		sendRequest,
	};
};

export default useHttp;
