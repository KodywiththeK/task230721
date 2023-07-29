'use client'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { Button } from 'antd'
import styles from '../styles/header.module.scss'
import '../app/globals.css'

const menu = [
  {
    href: '/',
    title: '⛺️ 부트텐트',
  },
  {
    href: '/search',
    title: '🔍 교육과정 찾기',
  },
  {
    href: '/new',
    title: '📋 새 교육과정 등록',
  },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header className={styles.header}>
      <Link href={'/'} aria-label="Home">
        <h1 className={`${styles.title} text-xl font-bold sm:text-2xl`}>부트텐트</h1>
      </Link>
      <nav>
        <ul className={styles.menuBar}>
          {menu.map((item) => (
            <li key={item.href} className="text-sm sm:text-[16px]" style={{ textDecorationLine: pathname === item.href ? 'underline' : '' }}>
              <Link href={item.href} aria-label={item.title}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
