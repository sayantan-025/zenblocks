export type NavbarItem = {
  label: string
  href: string
}

export type NavbarCTA = {
  label: string
  href: string
}

export type LogoItem = {
  src?: string
  node?: React.ReactNode
  alt?: string
  name?: string
}

export type Testimonial = {
  text: string
  name: string
  role: string
  image?: string
  rating?: number
}