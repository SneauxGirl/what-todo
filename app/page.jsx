import styles from "./page.module.css";
import TaskList from '@/components/TaskList';

export default async function Home() {
    // Deployment \\ Local fallback
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const response = await fetch(`${apiUrl}/api/tasks`, {
    cache: 'no-store'
  });

  const tasks = await response.json();
  
return (
  <div className={styles.main}>
    <div className={styles.content}>
      <h1>To Do List</h1>
      <TaskList tasks={tasks} />
    </div>
    <div className={styles.sidebar}></div>
  </div>
);
}