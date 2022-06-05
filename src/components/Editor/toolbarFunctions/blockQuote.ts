import { Editor } from '@tiptap/react'

export default (editor: Editor | null) => () => {
    if (!editor) return

    editor.chain().focus().toggleBlockquote().run()
}