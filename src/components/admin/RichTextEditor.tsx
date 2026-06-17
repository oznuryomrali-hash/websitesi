'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

interface Props {
  content: string
  onChange: (html: string) => void
}

export default function RichTextEditor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
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

  if (!editor) return null

  const toolbarButtons = [
    { label: <b>B</b>, action: () => editor.chain().focus().toggleBold().run(), isActive: editor.isActive('bold') },
    { label: <i>I</i>, action: () => editor.chain().focus().toggleItalic().run(), isActive: editor.isActive('italic') },
    { label: 'H2', action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), isActive: editor.isActive('heading', { level: 2 }) },
    { label: 'H3', action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(), isActive: editor.isActive('heading', { level: 3 }) },
    { label: 'Liste', action: () => editor.chain().focus().toggleBulletList().run(), isActive: editor.isActive('bulletList') },
    { label: 'Alıntı', action: () => editor.chain().focus().toggleBlockquote().run(), isActive: editor.isActive('blockquote') },
  ]

  return (
    <div className="border border-outline-variant rounded-lg overflow-hidden">
      <div className="flex gap-1 p-2 bg-surface-container-low border-b border-outline-variant flex-wrap">
        {toolbarButtons.map((btn, i) => (
          <button
            key={i}
            type="button"
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
      </div>
      <EditorContent
        editor={editor}
        className="tiptap-content p-4 min-h-[300px] focus:outline-none"
      />
    </div>
  )
}
