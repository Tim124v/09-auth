import React from "react";
import Link from "next/link";
import styles from "./SidebarNotes.module.css";

const TAGS = ["Todo", "Work", "Personal", "Meeting", "Shopping"];

const ICONS: Record<string, React.ReactNode> = {
  "All notes": (
    <svg className={styles.tagIcon} viewBox="0 0 20 20" fill="none"><rect x="3" y="5" width="14" height="2.5" rx="1.2" fill="#a084f7"/><rect x="3" y="9" width="14" height="2.5" rx="1.2" fill="#ff6bcb"/><rect x="3" y="13" width="14" height="2.5" rx="1.2" fill="#7f5af0"/></svg>
  ),
  Todo: (
    <svg className={styles.tagIcon} viewBox="0 0 20 20" fill="none"><rect x="3" y="9" width="14" height="2.5" rx="1.2" fill="#7f5af0"/><circle cx="6" cy="10.25" r="1.5" fill="#a084f7"/></svg>
  ),
  Work: (
    <svg className={styles.tagIcon} viewBox="0 0 20 20" fill="none"><rect x="4" y="7" width="12" height="7" rx="2" fill="#ff6bcb"/><rect x="7" y="5" width="6" height="3" rx="1.5" fill="#7f5af0"/></svg>
  ),
  Personal: (
    <svg className={styles.tagIcon} viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="3" fill="#a084f7"/><ellipse cx="10" cy="14" rx="6" ry="3" fill="#ff6bcb"/></svg>
  ),
  Meeting: (
    <svg className={styles.tagIcon} viewBox="0 0 20 20" fill="none"><rect x="4" y="7" width="12" height="7" rx="2" fill="#7f5af0"/><circle cx="7" cy="10.5" r="1.5" fill="#a084f7"/><circle cx="13" cy="10.5" r="1.5" fill="#ff6bcb"/></svg>
  ),
  Shopping: (
    <svg className={styles.tagIcon} viewBox="0 0 20 20" fill="none"><rect x="5" y="7" width="10" height="7" rx="2" fill="#a084f7"/><circle cx="8" cy="14.5" r="1.2" fill="#ff6bcb"/><circle cx="12" cy="14.5" r="1.2" fill="#7f5af0"/></svg>
  ),
};

export default function SidebarDefault() {
  return (
    <div className={styles.sidebar}>
      <nav className={styles.navigation}>
        <ul className={styles.tagList}>
          <li className={styles.tagItem}>
            <Link href="/notes/filter/All" className={styles.tagLink}>
              {ICONS["All notes"]}
              All notes
            </Link>
          </li>
          {TAGS.map((tag) => (
            <li key={tag} className={styles.tagItem}>
              <Link href={`/notes/filter/${tag}`} className={styles.tagLink}>
                {ICONS[tag]}
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 
