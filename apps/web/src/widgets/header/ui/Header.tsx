import Link from "next/link";
import styles from "./styles.module.scss";

export function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.brandLink} href="/">
        Pogonyalis
      </Link>
      <nav className={styles.nav} aria-label="Основная навигация">
        <Link href="/debriefings">Дебрифинги</Link>
        <Link href="/debriefings/new">Новая запись</Link>
      </nav>
    </header>
  );
}
