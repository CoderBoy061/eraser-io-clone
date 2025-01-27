import { Button } from '@/components/ui/button'
import { Search, Send } from 'lucide-react'
import React from 'react'


const DashboardHeader = () => {
  return (
    <div className="flex justify-end w-full gap-2 items-center mt-10 px-5 mb-5">
    <div className="flex gap-2 items-center border rounded-md p-1">
      <Search className="h-4 w-4 " />
      <input type="text" placeholder="Search" className='outline-none' />
    </div>
    <div>
      {/* <Image src={user?.picture} alt='user'
          width={30}
          height={30}
          className='rounded-full'
          /> */}
    </div>
    <Button
      className="gap-2 flex text-sm
      h-8 hover:bg-blue-700 bg-blue-600
      "
    >
      {" "}
      <Send className="h-4 w-4" /> Invite
    </Button>
  </div>
  )
}

export default DashboardHeader