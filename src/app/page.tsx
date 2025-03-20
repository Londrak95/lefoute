'use client'

import Link from 'next/link'

export default function Home() {
  return (
    <div className="mx-2">
    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">P'tit projet vive lefoute</h2>
    <hr className="w-72 h-1 mx-2 my-4 bg-gray-900 border-0 rounded-sm md:my-5 dark:bg-gray-700"/>
    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
      <li> <Link href="/standings" target="_blank">Classements Ligue 1</Link> </li>
      <li> <Link href="/results" target="_blank">Résultats de l'OM</Link> </li>
      <li> <Link href="/performers" target="_blank">Meilleurs buteurs/passeurs de l'OM</Link> </li>
    </ul>
    </div>
  )
}