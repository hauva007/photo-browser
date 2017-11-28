const BASE_URL = 'https://jsonplaceholder.typicode.com';

const photos = (start, skip) => {
    const URL = `${BASE_URL}/photos?_start=${start}&_limit=${skip}`;
    let total = 0;
    return fetch(URL).then((response) => {
        total = response.headers.get('x-total-count');
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
    const URL = `${BASE_URL}/photos/${id}`;
    return fetch(URL).then((response) => response.json());
}

export { photos, photo }