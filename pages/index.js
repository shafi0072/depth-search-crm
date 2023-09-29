import Image from 'next/image'
import { Inter } from 'next/font/google'
import Inbox from '@/src/components/app/Inbox'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <div>
    <Inbox/>
   </div>
  )
}
