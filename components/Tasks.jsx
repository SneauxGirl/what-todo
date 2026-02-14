'use client';
import { useEffect, useState } from "react";
import styles from '@/app/page.module.css';
import Link from "next/link";

const Tasks = () => {
    const [tasks, setTasks] = useState ([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try{
                const response = await fetch('api/tasks', {
                    cache: 'no-store'
                });
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            } finally {
                setLoading(false)
            }
        };

        fetchTasks();
    }, []);

    const handleDelete = async (taskId) => {
        if (!confirm('Are you sure you want to delete this task?')) {
            return;
        }

        try {
            const response = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                // Remove the deleted task from the state
                setTasks(tasks.filter(task => task.id !== taskId));
            } else {
                console.error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    if (loading) {
        return <p>Loading tasks...</p>;
    }

    return (
            <ul>
                {
                    tasks.length > 0 ? (
                        tasks.map((task) => (
                            <li className={styles.task} key={task.id}>
                                <span>{task.title}</span>
                                <div className={styles.actions}>
                                    <Link className={styles.editButton} href={`/edit/${task.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
                                            <path d="M13 6L18 11" stroke="currentColor" strokeWidth="2" fill="none"></path>
                                            <path d="M8 21L21.5 7.5L16.5001 2.50006L3 16L3.00002 21L8 21Z" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" fill="none"></path>
                                            <path d="M22 22H11.2432L13.2441 20H22V22Z" fill="currentColor"></path>
                                        </svg>
                                    </Link>
                                    <button className={styles.deleteButton} onClick={() => handleDelete(task.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                                            <path d="M20 4L4 20" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" fill="none"></path>
                                            <path d="M4 4L20 20" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" fill="none"></path>
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No tasks found</li>
                    )
                }
            </ul>
    )
}

export default Tasks;