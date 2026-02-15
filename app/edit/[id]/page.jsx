'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/app/styles/shared.module.css';

const EditTaskPage = ({ params }) => {
    const [title, setTitle] = useState('');
    const router = useRouter();
    const { id } = use(params);

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
            <h1 className={styles.title}>Edit </h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input className={styles.input} type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
                <button className={styles.button} type='submit'>Update</button>
            </form>
        </div>
    )

}

export default EditTaskPage;