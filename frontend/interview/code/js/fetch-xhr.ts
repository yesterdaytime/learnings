/***
 *
 *
 */
const response = fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'GET',
    headers: { 'Content-type': 'application/json' },
    mode: 'cors',
    credentials: 'include',
}).then((res) => res.json());
