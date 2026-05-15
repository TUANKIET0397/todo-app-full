import Image from 'next/image'
import { Button } from 'antd'

export default function Page() {
  return (
    <>
        <h1>Hello, Next.js!</h1>

        <div>
          <Button type="primary" >Click me</Button>
        </div>
        <Image src="/img.png" loading="eager" alt="Description of image" width={300} height={300} />
    </>
  )
}