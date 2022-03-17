export abstract class BaseService {
	protected readonly apiUrl: string;

	protected constructor(
		apiUrl: string)
	{
		this.apiUrl = apiUrl;
	}

	protected Request<Result>(
		method: string,
		url: string,
		callback: (result: Result) => void,
		body: Document | XMLHttpRequestBodyInit | null = null
	): void {
		const xhr = new XMLHttpRequest();
		xhr.onload = () => callback(JSON.parse(xhr.response));
		xhr.open(method, url);
		xhr.send(body);
	}
}
