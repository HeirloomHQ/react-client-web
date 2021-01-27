import Head from 'next/head'
import Error from 'next/error'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home({ errorCode, message }) {
  if (!!errorCode) {
    return <Error statusCode={errorCode} />
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Heirloom</title>
      </Head>

      <main className={styles.main}>
        <p>
          Message from the server: <b>{message}</b>
        </p>
      </main>

      <footer className={styles.footer}>
        Heirloom
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const { data } = await axios.get("http://localhost:5000");
    return { props: { message: data.message } };
  } catch (e) {
    const ret = { props: {} };
    if (e.isAxiosError) {
      Object.assign(ret.props, { errorCode: e.response.status });
    }
    return ret;
  }
}