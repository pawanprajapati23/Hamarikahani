'use client'

import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Heart, Link as LinkIcon, Check, Share2, Facebook, Twitter, Instagram } from 'lucide-react'
import { cn } from '@/utils/cn'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title?: string
}

export function ShareModal({ isOpen, onClose, url, title = 'Check out this surprise!' }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HamariKahani',
          text: title,
          url: url
        })
      } catch (err) {
        console.error('Error sharing', err)
      }
    } else {
      handleCopy()
    }
  }

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const shareOptions = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      ),
      bg: 'bg-green-500',
      action: () => window.open(`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`, '_blank'),
    },
    {
      id: 'copy',
      name: 'Copy',
      icon: copied ? <Check className="w-6 h-6 text-white" /> : <LinkIcon className="w-6 h-6 text-white" />,
      bg: 'bg-zinc-600',
      action: handleCopy,
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6 text-white" />,
      bg: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500',
      action: () => {
        handleCopy()
        alert('Link copied! Open Instagram and paste it in your story.')
      },
    },
    {
      id: 'twitter',
      name: 'X',
      icon: <Twitter className="w-6 h-6 text-white fill-current" />,
      bg: 'bg-black',
      action: () => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank'),
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6 text-white fill-current" />,
      bg: 'bg-blue-600',
      action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank'),
    },
    {
      id: 'more',
      name: 'More',
      icon: <Share2 className="w-6 h-6 text-white" />,
      bg: 'bg-pink-500',
      action: handleNativeShare,
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[92vw] max-w-md rounded-[2rem] p-0 overflow-hidden bg-white/80 backdrop-blur-2xl border border-white/50 shadow-luxury sm:rounded-[2rem]">
        
        {/* Gradient Header */}
        <DialogHeader className="p-6 pb-5 bg-gradient-to-r from-pink-50 to-purple-50 border-b border-white/50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center shadow-sm">
              <Heart className="w-5 h-5 text-pink-500 fill-pink-500" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-serif text-zinc-800">
            Share the Magic
          </DialogTitle>
          <p className="text-center text-sm text-zinc-500 mt-1 font-sans">
            Send this surprise to make their day
          </p>
        </DialogHeader>

        <div className="p-6">
          {/* Grid Options */}
          <div className="grid grid-cols-3 gap-y-6 gap-x-2 mb-8">
            {shareOptions.map((option) => (
              <button
                key={option.id}
                onClick={option.action}
                className="flex flex-col items-center gap-2.5 group transition-transform active:scale-95 touch-manipulation"
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1",
                  option.bg
                )}>
                  {option.icon}
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-zinc-600">{option.name}</span>
              </button>
            ))}
          </div>

          {/* Direct Copy Section */}
          <div className="bg-white/60 rounded-2xl p-2 border border-white/60 flex items-center gap-2 shadow-sm">
            <div className="flex-1 overflow-hidden px-3">
              <p className="text-sm text-zinc-500 truncate font-mono">{url}</p>
            </div>
            <button
              onClick={handleCopy}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2 min-w-[100px] justify-center"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-zinc-400 font-sans">
              Powered by <span className="font-semibold text-pink-500/80">HamariKahani</span>
            </p>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
