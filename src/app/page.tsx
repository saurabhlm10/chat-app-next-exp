import { db } from "@/lib/db"

export default async function Home() {
  await db.set('hello', 'HELLOIUUBJHD')

  return (
    <div className='text-red-500'>Hello There</div>
  )
}
