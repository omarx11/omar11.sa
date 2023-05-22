import React from 'react'
import Image from 'next/image'

const About = () => {
  return (
    <section className='flex flex-row items-start'>
      <Image
        src="/avatar.jpg"
        className='rounded-full object-cover bg-cover select-none drag-none'
        width={128}
        height={128}
        alt="/" />
      <div className='flex flex-col relative left-6'>
        <h1 className='text-2xl mb-[2px] font-bold'>
          Heyy selamlar, ben Sanctus
          <Image
            src="/icons/1f44b.png"
            className='inline ml-1 pb-2 select-none drag-none'
            width={24}
            height={24} />
          </h1>
        <p className='font-normal text-[1.1rem] leading-[1.4rem]'>
          Gerçek adım Eren ama internette insanlar beni Sanctus olarak bilir.
          3 yıldan uzun süredir discord botları geliştiriyorum.
          Kodlamanın mantığını ve yapısını seviyorum. Her zaman verimli ve
          düzenli kod yazmaya çalışıyorum. Discord botlarının yanında web
          geliştiriciliği de öğreniyorum. Ortak olabileceğim yeni projeler arıyorum.
          Eğer bir projen varsa benimle iletişime geçmekten çekinme ._.</p>
      </div>
    </section>
  )
}

export default About