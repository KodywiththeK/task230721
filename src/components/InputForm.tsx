'use client'
import React, { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import { Button, DatePicker, Form, Input, Select } from 'antd'
import { useRouter } from 'next/navigation'

const { RangePicker } = DatePicker
const { TextArea } = Input

type EventType = 'event' | '채용연계' | '전공무관' | '전액지원'
export interface NewContentType {
  title: string
  description: string
  company: string
  stack: string
  event: EventType
  deadline: string
  start: string | string[]
  end: string
  likes: string
}

export default function InputForm() {
  const router = useRouter()
  const initialData = {
    title: '',
    description: '',
    company: '',
    stack: '',
    event: '' as EventType,
    deadline: '',
    start: '',
    end: '',
    likes: 'false',
  }
  const [info, setInfo] = useState<NewContentType>(initialData)
  const eventTypes: EventType[] = ['event', '채용연계', '전공무관', '전액지원']

  const submitHandler = async () => {
    const data = { ...info, stack: info.stack.split(' ') }
    await fetch('/api/contents', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    router.push('/')
  }

  return (
    <section className="w-full max-w-3xl p-4">
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="horizontal" style={{ maxWidth: 800 }} onFinish={submitHandler}>
        <Form.Item label="교육과정 이름">
          <Input value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} required />
        </Form.Item>
        <Form.Item label="상세 설명">
          <TextArea rows={4} value={info.description} onChange={(e) => setInfo({ ...info, description: e.target.value })} required />
        </Form.Item>
        <Form.Item label="교육기관 이름">
          <Input value={info.company} onChange={(e) => setInfo({ ...info, company: e.target.value })} required />
        </Form.Item>
        <Form.Item label="교육과정 키워드">
          <Input placeholder="띄어쓰기로 구분해주세요" value={info.stack} onChange={(e) => setInfo({ ...info, stack: e.target.value })} required />
        </Form.Item>
        <Form.Item label="이벤트">
          <Select value={info.event} onChange={(value) => setInfo({ ...info, event: value })}>
            {eventTypes.map((event, idx) => (
              <Select.Option key={idx} value={event} required>
                {event}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="모집 마감 날짜">
          <Input value={info.deadline} onChange={(e) => setInfo({ ...info, deadline: e.target.value })} placeholder="yyyy/mm/dd" required />
        </Form.Item>
        <Form.Item label="개강일">
          <Input value={info.start} onChange={(e) => setInfo({ ...info, start: e.target.value })} placeholder="yyyy/mm/dd" required />
        </Form.Item>
        <Form.Item label="종강일">
          <Input value={info.end} onChange={(e) => setInfo({ ...info, end: e.target.value })} placeholder="yyyy/mm/dd" required />
        </Form.Item>
        <Button className="bg-green-500 w-full" type="primary" htmlType="submit" onSubmit={submitHandler}>
          Submit
        </Button>
      </Form>
    </section>
  )
}
