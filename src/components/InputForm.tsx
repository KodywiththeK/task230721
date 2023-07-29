'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useContents } from '@/hooks/contents'
import { Content } from '@/service/content'
import DatePicker from './ui/DatePicker'
import RangePicker from './ui/RangePicker'

type EventType = 'event' | '채용연계' | '전공무관' | '전액지원'
export interface NewContentType {
  title: string
  description: string
  company: string
  stack: string[]
  event: EventType
  deadline: string
  start: string
  end: string
  likes: boolean
}

export type Props = {
  content?: Content
  id?: string
}

export default function InputForm({ content, id }: Props) {
  const router = useRouter()
  const initialData = {
    title: '',
    description: '',
    company: '',
    stack: [],
    event: '' as EventType,
    deadline: '',
    start: '',
    end: '',
    likes: false,
  }

  const [info, setInfo] = useState<NewContentType>(initialData)
  const [keywordInput, setKeywordInput] = useState<string>('')
  useEffect(() => {
    content &&
      setInfo({
        title: content?.title,
        description: content?.description,
        company: content?.company,
        stack: content?.stack,
        event: content?.event as EventType,
        deadline: content?.deadline,
        start: content?.start,
        end: content?.end,
        likes: content?.likes,
      })
  }, [content])
  const eventTypes: EventType[] = ['event', '채용연계', '전공무관', '전액지원']

  const { setCamp, editCamp, refetchContents } = useContents()
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (content === undefined && id === undefined) {
      await setCamp(info)
    } else {
      await editCamp({ id: Number(id), info: info })
    }
    await refetchContents()
    router.push('/')
  }

  const handleSetKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      setInfo({ ...info, stack: [...info.stack, keywordInput] })
      setKeywordInput('')
    }
  }
  const handleRemoveKeyword = (e: React.MouseEvent<HTMLLIElement>, idx: number) => {
    e.preventDefault()
    setInfo({ ...info, stack: info.stack.filter((_, i) => i !== idx) })
  }

  const handleDateChange = (date: string) => {
    setInfo({ ...info, deadline: date })
  }

  const handleRangeChange = (startDate: string, endDate: string) => {
    console.log('Selected date range:', startDate, 'to', endDate)
    setInfo({ ...info, start: startDate, end: endDate })
  }

  return (
    <section className="w-full max-w-3xl p-4">
      <form onSubmit={(e) => submitHandler(e)} className="form-control flex flex-col gap-8">
        <div className="w-full sm:flex gap-2 items-center">
          <label className="label w-auto sm:w-32 sm:flex sm:justify-end">
            <span className="label-text">교육과정 이름</span>
          </label>
          <input type="text" placeholder="Type here" value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} required className="input sm:grow w-full sm:w-auto max-w-xl input-sm md:input-md" />
        </div>
        <div className="w-full sm:flex sm:flex-row gap-2 flex-col sm:items-start">
          <label className="label w-auto sm:w-32 sm:flex sm:justify-end">
            <span className="label-text">상세설명</span>
          </label>
          <textarea placeholder="Type here" value={info.description} onChange={(e) => setInfo({ ...info, description: e.target.value })} required className="textarea grow w-full sm:w-auto max-w-xl textarea-sm md:textarea-md h-32 " />
        </div>
        <div className="w-full sm:flex gap-2 items-center ">
          <label className="label w-auto sm:w-32 sm:flex sm:justify-end">
            <span className="label-text">교육기관 이름</span>
          </label>
          <input type="text" value={info.company} onChange={(e) => setInfo({ ...info, company: e.target.value })} required placeholder="Type here" className="input grow w-full sm:w-auto max-w-xl input-sm md:input-md" />
        </div>
        <div className="w-full sm:flex-row flex flex-col gap-2 sm:items-center  ">
          <label className="label w-auto sm:w-32 sm:flex sm:justify-end">
            <span className="label-text">교육과정 키워드</span>
          </label>
          <div className="grow">
            {info.stack.length > 0 && (
              <ul className="flex items-center gap-2 py-2 flex-wrap">
                {info.stack.map((item, idx) => (
                  <li key={idx} onClick={(e) => handleRemoveKeyword(e, idx)} className=" cursor-pointer bg-green-100 shadow rounded-lg p-2">
                    {item}
                  </li>
                ))}
              </ul>
            )}
            <input type="text" placeholder="띄어쓰기로 구분해주세요" onKeyDown={(e) => handleSetKeyword(e)} value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} className="input w-full max-w-xl input-sm md:input-md" />
          </div>
        </div>
        <div className="w-full sm:flex gap-2 items-center ">
          <label className="label w-auto sm:w-32 sm:flex sm:justify-end">
            <span className="label-text">이벤트</span>
          </label>
          <select value={info.event} onChange={(e) => setInfo({ ...info, event: e.target.value as EventType })} className="select select-sm md:select-md grow w-full sm:w-auto max-w-xl">
            <option disabled value="">
              이벤트를 선택해주세요
            </option>
            {eventTypes.map((event, idx) => (
              <option key={idx} value={event}>
                {event}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:flex gap-2 items-center ">
          <label className="label w-auto sm:w-32 sm:flex sm:justify-end">
            <span className="label-text">모집 마감 날짜</span>
          </label>
          <DatePicker originalData={info.deadline} onDateChange={handleDateChange} />
        </div>
        <div className="w-full sm:flex gap-2 items-center ">
          <label className="label w-auto sm:w-32 sm:flex sm:justify-end">
            <span className="label-text">수업기간</span>
          </label>
          <RangePicker originStartDate={info.start} originEndDate={info.end} onRangeChange={handleRangeChange} />
        </div>
        <button className="btn btn-success" type="submit">
          교육과정 등록하기
        </button>
      </form>
    </section>
  )
}
