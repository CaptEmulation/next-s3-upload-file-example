import { useRef, useCallback, useState } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [imageUrl, setImageUrl] = useState()
  const [error, setError] = useState()

  const inputTitleRef = useRef()
  const inputFileRef = useRef()

  const uploadFile = useCallback(() => {
    setError()
    const fileInput = inputFileRef.current;
    const titleInput = inputTitleRef.current;
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', titleInput.value)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);
    xhr.addEventListener('loadend', ({ currentTarget }) => {
      const { status, response } = currentTarget
      if (status === 200) {
        const { location } = JSON.parse(response)
        setImageUrl(location)
      } else {
        setError('Something went wrong')
      }
    });
    xhr.send(formData);
  }, [inputFileRef.current, inputTitleRef.current])

  const onFileChange = useCallback(({ currentTarget }) => {
    inputTitleRef.current.value = currentTarget.files[0].name
  }, [inputTitleRef.current])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <input ref={inputTitleRef} type="text" name="title"></input>
        <input ref={inputFileRef} type="file" name="upload" onChange={onFileChange}></input>
        <button onClick={uploadFile}>Submit</button>
        {error && <span>{error}</span>}
        {imageUrl && <img src={imageUrl}/>}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
