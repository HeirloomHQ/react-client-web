import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Heirloom</title>
      </Head>

      <main className={styles.main}>
        <p>Hello world!</p>
      </main>

      <footer className={styles.footer}>Heirloom</footer>
    </div>
  );
}
