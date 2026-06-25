'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import { useEffect, useRef } from 'react'

interface Props {
  content: string
  onChange: (html: string) => void
  onImageUpload?: (file: File) => Promise<string>
}

export default function RichTextEditor({ content, onChange, onImageUpload }: Props) {
  const imageInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && editor.getHTML() !== content && content !== undefined) {
      editor.commands.setContent(content || '')
    }
  }, [content, editor])

  async function handleImageFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !editor || !onImageUpload) return
    e.target.value = ''
    try {
      const url = await onImageUpload(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch {
      alert('Görsel yüklenemedi. Lütfen tekrar deneyin.')
    }
  }

  if (!editor) return null

  const toolbarButtons = [
    { label: <b>K</b>, title: 'Kalın', action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
    { label: <i>İ</i>, title: 'İtalik', action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
    { label: 'H2', title: 'Başlık 2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
    { label: 'H3', title: 'Başlık 3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }) },
    { label: 'Liste', title: 'Madde listesi', action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
    { label: 'Alıntı', title: 'Alıntı', action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
  ]

  return (
    <div className="border border-outline-variant rounded-lg overflow-hidden">
      <div className="flex gap-1 p-2 bg-surface-container-low border-b border-outline-variant flex-wrap">
        {toolbarButtons.map((btn, i) => (
          <button
            key={i}
            type="button"
            title={btn.title}
            onClick={btn.action}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              btn.isActive
                ? 'bg-primary text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            {btn.label}
          </button>
        ))}

        {onImageUpload && (
          <>
            <div className="w-px bg-outline-variant mx-1" />
            <button
              type="button"
              title="İçeriğe görsel ekle"
              onClick={() => imageInputRef.current?.click()}
              className="flex items-center gap-1 px-3 py-1 rounded text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-base">image</span>
              Görsel
            </button>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageFileChange}
            />
          </>
        )}
      </div>
      <EditorContent
        editor={editor}
        className="tiptap-content p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  )
}
