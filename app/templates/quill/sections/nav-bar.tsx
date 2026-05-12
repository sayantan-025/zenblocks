"use client"

import React from "react"
import { QuillNavbar } from "../components/zenblocks/navbar"
import { NAV_DATA } from "../data"

export function NavBar() {
  return (
    <QuillNavbar
      items={NAV_DATA.links}
      cta={NAV_DATA.cta}
    />
  )
}
