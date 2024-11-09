'use client'
import { Button } from '@headlessui/react'
import { ServerActionGenerateSlug } from '../server-actions/ServerActionGenerateSlug'

function page() {
  return <Button onClick={() => ServerActionGenerateSlug()}> Test </Button>
}

export default page
