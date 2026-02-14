'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EditTaskPage = ({ params }) => {
    const [title, setTitle] = useState('');
    const router = useRouter();
    const { id } = params;

    useEffect(() => {
    const fetchTask = async () => {
            const response = await fetch(`/api/tasks/${id}`);
            if (!response.ok) {
                console.error('Failed to fetch task');
                return;
            }
            const data = await response.json();
            setTitle(data.title);
        }
        fetchTask();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const response = await fetch(`/api/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });

        if (response.ok) {
            router.push('/');
        } else {
            alert('Failed to update task');
        }
    }

    return (
        <div>
            <h1>Edit </h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                <button type='submit'>Update</button>
            </form>
        </div>
    )

}