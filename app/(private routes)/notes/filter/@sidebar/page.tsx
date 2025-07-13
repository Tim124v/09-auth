import Link from "next/link";
import styles from "./SidebarNotes.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

export default function SidebarNotes() {
  return (
    <ul className={styles.tagList}>
      <li className={styles.tagItem}>
        <Link href="/notes/filter/All" className={styles.tagLink}>
          All notes
        </Link>
      </li>
      {TAGS.map((tag) => (
        <li key={tag} className={styles.tagItem}>
          <Link href={`/notes/filter/${tag}`} className={styles.tagLink}>
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
}
