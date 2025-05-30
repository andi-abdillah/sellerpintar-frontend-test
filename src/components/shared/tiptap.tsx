'use client'

import { useEffect } from 'react'
import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import {
  Bold,
  Italic,
  Undo2,
  Redo2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from 'lucide-react'
import clsx from 'clsx'

interface TiptapProps {
  value: string
  onChange: (value: string) => void
}

const Tiptap = ({ value, onChange }: TiptapProps) => {
  const editor = useEditor({
    extensions: [
      Placeholder.configure({
        placeholder: 'Write something …',
      }),
      StarterKit.configure({ history: {} }),
      Image,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: value,
    onUpdate({ editor }) {
      onChange(editor.getHTML())
    },
    immediatelyRender: false,
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [editor, value])

  if (!editor) return null

  return (
    <div className="border rounded-md p-4 space-y-2">
      <div className="flex items-center flex-wrap gap-2 border-b pb-2">
        <button type="button" onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 size={16} />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 size={16} />
        </button>

        <Separator />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(editor.isActive('bold') && 'text-blue-500')}
        >
          <Bold size={16} />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(editor.isActive('italic') && 'text-blue-500')}
        >
          <Italic size={16} />
        </button>

        <Separator />

        <div className="flex gap-1">
          <AlignButton editor={editor} alignment="left" Icon={AlignLeft} />
          <AlignButton editor={editor} alignment="center" Icon={AlignCenter} />
          <AlignButton editor={editor} alignment="right" Icon={AlignRight} />
          <AlignButton editor={editor} alignment="justify" Icon={AlignJustify} />
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="min-h-24"
      />

    </div>
  )
}

const Separator = () => (
  <span className="mx-2 h-4 border-l border-gray-300" aria-hidden />
)

interface AlignButtonProps {
  editor: Editor
  alignment: 'left' | 'center' | 'right' | 'justify'
  Icon: React.ElementType
}

const AlignButton = ({ editor, alignment, Icon }: AlignButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => editor.chain().focus().setTextAlign(alignment).run()}
      className={clsx(
        'p-1',
        editor.isActive({ textAlign: alignment }) && 'text-blue-500'
      )}
    >
      <Icon size={16} />
    </button>
  )
}

export default Tiptap
