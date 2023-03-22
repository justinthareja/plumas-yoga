import Head from "next/head";
import App from "../src/App";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Plumas Yoga</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <App />
      </main>

      <footer>
        <a
          href="https://github.com/justinthareja"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with ❤️ by Justin
        </a>
      </footer>
    </div>
  );
}
