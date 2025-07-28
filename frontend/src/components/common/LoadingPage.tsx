import React from 'react'
import Loader from '@/components/common/Loader'

function LoadingPage() {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <Loader />
    </div>
  )
}

export default LoadingPage
