import React from 'react'

export default function OperatedOn({ company }: { company: string }) {
  return (
    <section className="w-full bg-slate-200 rounded-lg p-8 font-semibold text-lg text-center">
      <p>
        이 교육과정은 <span className="p-1 underline text-purple-500">{`"${company}"`}</span>에서 운영합니다.
      </p>
    </section>
  )
}
