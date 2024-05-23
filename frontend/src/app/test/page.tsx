import { use } from 'react';

async function fetchMessage() {
    const res = await fetch('http://backend:7001');
    if (!res.ok) {
        throw new Error('Failed to fetch message');
    }
    return res.json();
}

export default function Home() {
    const data = use(fetchMessage());

    return (
        <div>
            <h1>Message from backend:</h1>
            <p>{data.Hello}</p>
        </div>
    );
}