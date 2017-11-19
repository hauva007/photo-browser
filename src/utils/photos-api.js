const BASE_URL = 'https://jsonplaceholder.typicode.com';

const photos = (start, skip) => {
	const url = `${BASE_URL}/photos?_start=${start}&_limit=${skip}`;
	let total = 0;
	return fetch(url).then((response) => {
		total = response.headers.get('x-total-count')
		return response.json()
	})
	.then((json) => {
		return {
			photos: json,
			total: total
		}
	});
}

const photo = (id) => {
	const url = `${BASE_URL}/photos/${id}`;	
	return fetch(url).then((response) => response.json());
}

export { photos, photo }