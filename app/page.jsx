import styles from "./page.module.css";
import Tasks from '@/components/Tasks';

export default function Home() {
  
return (
  <div className={styles.main}>
    <div className={styles.content}>
      <h1>To Do List</h1>
      <Tasks />
    </div>
    <div className={styles.sidebar}></div>
  </div>
);
}