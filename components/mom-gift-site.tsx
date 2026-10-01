'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Check, ChevronDown, ChevronUp, ExternalLink, Instagram, MapPin, Menu, MessageCircle, Phone, Star, X } from 'lucide-react'

const PHONE = 'tel:+918798845028'
const WHATSAPP = 'https://wa.me/918798845028'
const MAPS = 'https://maps.app.goo.gl/otTq2pemBBjm63cH8'
const images = [
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-30%20122300-aTFlDFFCnhs9MpqkyXG7muOMUQzagO.png', alt: 'Mom Gift homestay overlooking misty Meghalaya hills at sunset', label: 'Homestay at sunset' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-30%20122327-pZsm8XUTkIhzV6snwjkGusalsNlHmF.png', alt: 'Open gazebo overlooking green Meghalaya hills at sunset', label: 'Gazebo and valley view' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-30%20122312-z07Lx2yja0noVnwCfZW3TIi8QT14VN.png', alt: 'Nighttime campfire beside a gazebo', label: 'Evening campfire' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-30%20122337-RQwlZYwDQJpiGFqsXFlB0LTyX3xTbR.png', alt: 'Green lawn and homestay building under a blue sky', label: 'Open hillside lawn' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-30%20122351-Cf86k3ACGi7jLfRsqsKPRo0vlzYV8s.png', alt: 'Yellow homestay cottage in rolling green hills', label: 'Cottage in the hills' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-30%20122415-nlogsdzBLJxbVVbzrJIB2zXYsQxVlv.png', alt: 'Small homestay cabin with a wide blue sky', label: 'Quiet cabin view' },
  { src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-09-30%20122519-9tyAKFE18Q4TWzzA5RP0c7N4qY2fJK.png', alt: 'Gazebo silhouetted against glowing sunset clouds', label: 'Sunset gazebo' },
]

function waLink(message = 'Hello Mom Gift, I would like to make an inquiry about staying at your homestay.') {
  return `${WHATSAPP}?text=${encodeURIComponent(message)}`
}

function Button({ children, href, secondary = false, onClick, className = '' }: { children: React.ReactNode; href?: string; secondary?: boolean; onClick?: () => void; className?: string }) {
  const style = secondary ? 'border border-white/30 bg-white/10 text-white hover:bg-white/20' : 'bg-[#d9a441] text-[#17241d] hover:bg-[#e6b755]'
  if (href) {
    const isExternal = href.startsWith('http')
    return <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener noreferrer' : undefined} onClick={onClick} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[11px] font-bold uppercase tracking-[.16em] transition ${style} ${className}`}>{children}</a>
  }
  return <button type="button" onClick={onClick} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-[11px] font-bold uppercase tracking-[.16em] transition ${style} ${className}`}>{children}</button>
}

export function MomGiftSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showAllImages, setShowAllImages] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowRight') setLightbox((i) => i === null ? 0 : (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setLightbox((i) => i === null ? 0 : (i - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [lightbox])

  const goInquiry = () => document.getElementById('inquiry')?.scrollIntoView({ behavior: 'smooth' })
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); setError(''); setSent(false)
    const form = new FormData(e.currentTarget)
    const name = String(form.get('name') || '').trim(), phone = String(form.get('phone') || '').trim(), email = String(form.get('email') || '').trim()
    const checkin = String(form.get('checkin') || ''), checkout = String(form.get('checkout') || ''), guests = Number(form.get('guests') || 0), message = String(form.get('message') || '').trim()
    if (!name || !phone || !checkin || !checkout || guests < 1) return setError('Please complete all required fields.')
    if (!/^[+\d][\d\s()-]{7,}$/.test(phone)) return setError('Please enter a valid phone number.')
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return setError('Please enter a valid email address.')
    if (new Date(checkout) <= new Date(checkin)) return setError('Check-out must be after check-in.')
    const text = `Hello Mom Gift,\n\nI would like to make an inquiry.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nCheck-in: ${checkin}\nCheck-out: ${checkout}\nGuests: ${guests}\n\nMessage:\n${message || 'None'}\n\nThank you.`
    window.open(waLink(text), '_blank', 'noopener,noreferrer'); setSent(true); e.currentTarget.reset()
  }

  return <div className="min-h-screen bg-[#f5f1e9] text-[#22352a] pb-16 md:pb-0">
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#17241d]/90 text-white backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#top" className="font-serif text-2xl tracking-tight">Mom Gift<span className="text-[#d9a441]">.</span></a>
        <nav className="hidden items-center gap-6 text-[11px] font-semibold uppercase tracking-[.13em] lg:flex">
          {['about','gallery','amenities','location','reviews','contact'].map((item) => <a key={item} href={`#${item}`} className="opacity-80 transition hover:text-[#e4b552] hover:opacity-100">{item}</a>)}
          <Button href="#inquiry" className="ml-2 px-5">Book / inquire</Button>
        </nav>
        <button aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)} className="flex min-h-11 min-w-11 items-center justify-center lg:hidden">{menuOpen ? <X /> : <Menu />}</button>
      </div>
      {menuOpen && <nav className="border-t border-white/10 bg-[#17241d] px-5 pb-5 pt-2 lg:hidden">{['about','gallery','amenities','location','reviews','inquiry'].map((item) => <a onClick={() => setMenuOpen(false)} key={item} href={`#${item}`} className="block border-b border-white/10 py-3 text-xs font-semibold uppercase tracking-[.15em]">{item}</a>)}</nav>}
    </header>

    <main id="top">
      <section className="relative flex min-h-[680px] items-end overflow-hidden bg-[#273f32] px-5 pb-20 pt-32 text-white md:min-h-[740px] lg:px-8">
        <img src={images[0].src} alt="Mom Gift homestay overlooking misty Meghalaya hills at sunset" className="absolute inset-0 h-full w-full object-cover object-center opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#102019] via-[#102019]/45 to-[#102019]/20" />
        <div className="relative mx-auto w-full max-w-7xl">
          <p className="mb-5 text-[11px] font-bold uppercase tracking-[.28em] text-[#edc56e]">Meghalaya <span className="mx-2 text-white/40">•</span> Homestay</p>
          <h1 className="max-w-3xl font-serif text-6xl leading-[.95] tracking-[-.04em] sm:text-8xl">A slower stay<br /><em className="font-light text-[#eac878]">in Meghalaya.</em></h1>
          <p className="mt-7 max-w-md text-base leading-7 text-white/75">Mom Gift is a homestay in Mawphlanlur, Markasa — a peaceful base for taking in the quiet beauty of the region.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button onClick={goInquiry}>Book / send inquiry <ArrowRight size={15} /></Button><Button href={PHONE} secondary><Phone size={15} /> Call now</Button><Button href={waLink()} secondary><MessageCircle size={15} /> WhatsApp</Button></div>
          <a href="#about" className="mt-16 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/60 hover:text-white"><ArrowDown size={15} /> Explore Mom Gift</a>
        </div>
      </section>

      <section className="relative z-10 mx-auto -mt-8 max-w-6xl px-5 lg:px-8"><div className="grid overflow-hidden rounded-2xl bg-[#fffdf8] shadow-xl shadow-[#23352a]/10 sm:grid-cols-2 lg:grid-cols-4">{[['Location','Mawphlanlur, Markasa'],['Rating','4.8 / 5'],['Reviews','84 Google reviews'],['Property','Homestay']].map(([label,value],i) => <div key={label} className="flex items-center gap-3 border-b border-[#e8e2d7] px-5 py-5 last:border-0 sm:nth-[2]:border-0 lg:border-b-0 lg:border-r lg:last:border-0"><span className="text-[#c58b20]">{i===0?<MapPin size={19}/>:i===1?<Star size={19}/>:i===2?<MessageCircle size={19}/>:<CalendarDays size={19}/>}</span><div><p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#748077]">{label}</p><p className="mt-1 text-sm font-medium">{value}</p></div></div>)}</div></section>

      <section id="about" className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-8 lg:py-32"><div><p className="eyebrow">The feeling of place</p><h2 className="section-title mt-4">A peaceful stay<br /><em>in Meghalaya</em></h2></div><div><p className="max-w-xl text-lg leading-8 text-[#516057]">Take a slower pace, enjoy the quiet surroundings, and use Mom Gift as your base while exploring Meghalaya. The address is simple: Mawphlanlur, Markasa, Meghalaya 793119, India.</p><button onClick={goInquiry} className="mt-7 inline-flex items-center gap-2 border-b border-[#c58b20] pb-2 text-xs font-bold uppercase tracking-[.16em] text-[#22352a]">Plan your stay <ArrowRight size={15}/></button></div></section>

      <section id="gallery" className="bg-[#e8eee5] px-5 py-24 lg:px-8"><div className="mx-auto max-w-6xl"><div className="flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow">A sense of place</p><h2 className="section-title mt-4">See the <em>surroundings</em></h2></div><p className="max-w-sm text-sm leading-6 text-[#647168]">Illustrative Meghalaya and homestay imagery. These images are not presented as photographs of the Mom Gift property.</p></div><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">{images.slice(0, showAllImages ? images.length : 5).map((image,i) => <button key={image.src} onClick={() => setLightbox(i)} className={`group relative overflow-hidden rounded-xl text-left ${i===0?'col-span-2 row-span-2 min-h-[360px] md:min-h-[500px]':'min-h-[175px] md:min-h-[240px]'}`}><img src={image.src} alt={image.alt} loading={i===0?'eager':'lazy'} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 pt-12 text-[10px] uppercase tracking-[.12em] text-white opacity-0 transition group-hover:opacity-100">{image.label}</span></button>)}</div>{!showAllImages && <button type="button" onClick={() => setShowAllImages(true)} className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full border border-[#20352a]/25 px-5 text-[11px] font-bold uppercase tracking-[.16em] text-[#20352a] transition hover:bg-[#20352a] hover:text-white">View more <ChevronDown size={15} /></button>}</div></section>

      <section id="amenities" className="mx-auto max-w-6xl px-5 py-24 lg:px-8"><div className="rounded-2xl bg-[#20352a] p-8 text-white md:p-12"><div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-end"><div><p className="eyebrow text-[#dcb65c]">Good to know</p><h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">Made for a<br /><em className="text-[#e4bf68]">quieter pace.</em></h2></div><div><p className="max-w-lg text-base leading-7 text-white/70">Contact Mom Gift directly to confirm available facilities, services, room details, and current availability before planning your stay.</p><div className="mt-7 flex flex-wrap gap-3"><Button href={PHONE}><Phone size={15}/> Call Mom Gift</Button><Button href={waLink()} secondary><MessageCircle size={15}/> Ask on WhatsApp</Button></div></div></div></div></section>

      <section id="location" className="bg-[#fffdf8] px-5 py-24 lg:px-8"><div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center"><div><p className="eyebrow">Find your way here</p><h2 className="section-title mt-4">A quiet corner of<br /><em>Markasa</em></h2><p className="mt-6 max-w-md leading-7 text-[#647168]">Mom Gift<br/>Mawphlanlur, Markasa<br/>Meghalaya 793119, India</p><div className="mt-7 flex flex-wrap gap-3"><Button href={MAPS}>Open in Google Maps <ExternalLink size={14}/></Button><Button href={PHONE} secondary className="!border-[#22352a]/20 !bg-transparent !text-[#22352a]"><Phone size={15}/> Call</Button></div></div><div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-[#dce7da]"><iframe title="Mom Gift location on Google Maps" src="https://www.google.com/maps?q=25.5463354,91.4465269&z=15&output=embed" className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade"/><a href={MAPS} target="_blank" rel="noopener noreferrer" aria-label="Open Mom Gift location in Google Maps" className="absolute bottom-5 left-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#20352a] px-5 py-3 text-xs font-bold text-white shadow-lg transition hover:bg-[#31533e]"><MapPin size={15}/> Open in Google Maps <ExternalLink size={13}/></a></div></div></section>

      <section id="reviews" className="mx-auto max-w-6xl px-5 py-24 text-center lg:px-8"><p className="eyebrow">From Google Maps</p><div className="mt-5 flex justify-center gap-1 text-[#d09a2c]">{[1,2,3,4,5].map((n)=><Star key={n} size={22} fill="currentColor"/>)}</div><p className="mt-4 font-serif text-7xl text-[#20352a]">4.8</p><p className="mt-2 text-sm text-[#68736b]">Based on 84 Google reviews</p><a href={MAPS} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.16em] text-[#20352a] underline decoration-[#d09a2c] underline-offset-8">View on Google Maps <ExternalLink size={14}/></a></section>

      <section id="inquiry" className="bg-[#e4eadf] px-5 py-24 lg:px-8"><div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="eyebrow">Start a conversation</p><h2 className="section-title mt-4">Plan your<br /><em>stay</em></h2><p className="mt-6 max-w-sm leading-7 text-[#647168]">Send your details and WhatsApp will open with a ready-to-send inquiry for Mom Gift. Availability is confirmed directly by the host.</p><div className="mt-7 flex flex-wrap gap-3"><Button href={PHONE} secondary className="!border-[#22352a]/20 !bg-transparent !text-[#22352a]"><Phone size={15}/> Call Mom Gift</Button><Button href={waLink()} secondary className="!border-[#22352a]/20 !bg-transparent !text-[#22352a]"><MessageCircle size={15}/> WhatsApp</Button></div></div><form onSubmit={submit} className="rounded-2xl bg-[#fffdf8] p-6 shadow-sm md:p-8"><div className="grid gap-5 sm:grid-cols-2"><label>Full name *<input name="name" required placeholder="Your name" /></label><label>Phone number *<input name="phone" required placeholder="+91 ..." /></label><label>Email address<input name="email" type="email" placeholder="you@example.com" /></label><label>Guests *<input name="guests" required type="number" min="1" step="1" placeholder="1" /></label><label>Check-in date *<input name="checkin" required type="date" /></label><label>Check-out date *<input name="checkout" required type="date" /></label></div><label className="mt-5 block">Message / special request<textarea name="message" rows={4} placeholder="Tell us a little about your stay..." /></label>{error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}{sent && <p role="status" className="mt-4 flex items-center gap-2 text-sm text-[#3e6b49]"><Check size={16}/> WhatsApp opened with your inquiry.</p>}<button className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#20352a] px-6 text-xs font-bold uppercase tracking-[.16em] text-white transition hover:bg-[#31533e]" type="submit">Send inquiry via WhatsApp <ArrowRight size={15}/></button></form></div></section>
    </main>

    <footer id="contact" className="bg-[#17241d] px-5 py-12 text-white lg:px-8"><div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between"><div><p className="font-serif text-3xl">Mom Gift<span className="text-[#d9a441]">.</span></p><p className="mt-3 text-sm leading-6 text-white/60">Mawphlanlur, Markasa<br/>Meghalaya 793119, India</p></div><div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[.12em]"><a href="#about">About</a><a href="#gallery">Gallery</a><a href="#location">Location</a><a href="#inquiry">Contact</a><a href={PHONE} className="text-[#e3b658]">Call now</a><a href={waLink()} target="_blank" rel="noopener noreferrer" className="text-[#e3b658]">WhatsApp</a></div></div><div className="mx-auto mt-10 max-w-6xl border-t border-white/10 pt-5 text-xs text-white/40">© 2026 Mom Gift. All rights reserved.</div></footer>

    <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-3 overflow-hidden rounded-2xl bg-[#20352a] p-1 shadow-2xl md:hidden"><a href={PHONE} className="flex min-h-12 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-[.12em] text-white"><Phone size={16}/><span>Call</span></a><a href={waLink()} target="_blank" rel="noopener noreferrer" className="flex min-h-12 flex-col items-center justify-center gap-1 border-x border-white/10 text-[9px] font-bold uppercase tracking-[.12em] text-white"><MessageCircle size={16}/><span>WhatsApp</span></a><button onClick={goInquiry} className="flex min-h-12 flex-col items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#e4bd63]"><CalendarDays size={16}/><span>Inquire</span></button></div>

    {lightbox !== null && <div role="dialog" aria-modal="true" aria-label="Image gallery" className="fixed inset-0 z-50 flex items-center justify-center bg-[#101b15]/95 p-5" onClick={() => setLightbox(null)}><button aria-label="Close gallery" onClick={() => setLightbox(null)} className="absolute right-5 top-5 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white"><X/></button><button aria-label="Previous image" onClick={(e) => {e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length)}} className="absolute left-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white md:left-8"><ArrowLeft/></button><figure onClick={(e) => e.stopPropagation()} className="max-w-5xl text-center"><img src={images[lightbox].src} alt={images[lightbox].alt} className="max-h-[78vh] w-auto rounded-lg object-contain"/><figcaption className="mt-4 text-sm text-white/70">{images[lightbox].label} · {lightbox + 1} / {images.length}</figcaption></figure><button aria-label="Next image" onClick={(e) => {e.stopPropagation(); setLightbox((lightbox + 1) % images.length)}} className="absolute right-3 flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/10 text-white md:right-8"><ArrowRight/></button></div>}
  </div>
}

export function SiteStyles() { return null }
