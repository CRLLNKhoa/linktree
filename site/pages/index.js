import Link from 'next/link'
import MyHead from '../components/MyHead'

export default function Home() {
  return (
    <>
       <MyHead
        title="Welcome"
        description="Tạo linktree của bản thân"
        image="https://www.gosite.com/hubfs/GoSite_LinkTreeExamples.png"
        url="https://linktree-crllnkhoa.vercel.app/"
      />

      <main className="w-full min-h-screen  bg-sky-100 flex flex-col justify-center items-center">
        <h1 className='text-center'> Welcome to <br/><span className='text-indigo-600 font-semibold'>My Website</span></h1>
        <Link title='Notice the page loader' className='bg-indigo-600 rounded-sm inline-block my-2 p-1 px-2 text-white' href="/login">Link to a page</Link>
      </main>
    </>
  )
}
