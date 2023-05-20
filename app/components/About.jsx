import Avatar from './Avatar'
import React from 'react'

const About = () => {
  return (
    <section className='flex flex-row items-start font-bold'>
      <Avatar />
      <div className='flex flex-col relative left-6'>
        <h1 className='text-2xl mb-1'>Hi there i'm Omar 👋</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit nam, aspernatur ducimus natus nesciunt quisquam asperiores, explicabo accusamus sequi aperiam fuga hic voluptates error deleniti molestias non nihil. Necessitatibus, qui.</p>
      </div>
    </section>
  )
}

export default About