import Link from 'next/link'
import styles from '@/styles/About.module.css'

export default function About() {
    return (
        <>
        <h1>About Page</h1>
        <Link href="/">
          <h2>Go Back</h2>
        </Link>
        <div id='boxArea' className={styles.background__style}></div>
        <button type="submit" disabled>Button Click</button>
        </>
    )
}