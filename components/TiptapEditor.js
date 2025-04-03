"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import HardBreak from "@tiptap/extension-hard-break";
import { useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignRight,
  FaAlignCenter,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaStrikethrough,
  FaMinus,
} from "react-icons/fa";
import { BsTypeH1, BsTypeH2, BsTypeH3 } from "react-icons/bs";

export default function TiptapEditor({ content, setContent }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
      }),
      Underline,
      TextAlign.configure({ types: ["paragraph"] }),
      HardBreak,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "p-4 border border-gray-300 rounded-lg",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content, false);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="py-4">
      {/* Formatting Toolbar */}
      <div className="mb-8 flex flex-col gap-2 rounded-lg shadow-lg py-6 bg-gray-100">
        <div className="font-bold text-center text-xl mb-2.5">
          <span className="border-b-2">ToolBar</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            {
              command: () => editor.chain().focus().toggleBold().run(),
              icon: <FaBold />,
              isActive: editor.isActive("bold"),
            },
            {
              command: () => editor.chain().focus().toggleItalic().run(),
              icon: <FaItalic />,
              isActive: editor.isActive("italic"),
            },
            {
              command: () => editor.chain().focus().toggleUnderline().run(),
              icon: <FaUnderline />,
              isActive: editor.isActive("underline"),
            },
            {
              command: () => editor.chain().focus().setTextAlign("left").run(),
              icon: <FaAlignLeft />,
              isActive: editor.isActive({ textAlign: "left" }),
            },
            {
              command: () =>
                editor.chain().focus().setTextAlign("center").run(),
              icon: <FaAlignCenter />,
              isActive: editor.isActive({ textAlign: "center" }),
            },
            {
              command: () => editor.chain().focus().setTextAlign("right").run(),
              icon: <FaAlignRight />,
              isActive: editor.isActive({ textAlign: "right" }),
            },
            {
              command: () =>
                editor.chain().focus().setTextAlign("justify").run(),
              icon: <FaAlignJustify />,
              isActive: editor.isActive({ textAlign: "justify" }),
            },
            {
              command: () => editor.chain().focus().toggleBulletList().run(),
              icon: <FaListUl />,
              isActive: editor.isActive("bulletList"),
            },
            {
              command: () => editor.chain().focus().toggleOrderedList().run(),
              icon: <FaListOl />,
              isActive: editor.isActive("orderedList"),
            },
            {
              command: () =>
                editor.chain().focus().toggleHeading({ level: 1 }).run(),
              icon: <BsTypeH1 />,
              isActive: editor.isActive("heading", { level: 1 }),
            },
            {
              command: () =>
                editor.chain().focus().toggleHeading({ level: 2 }).run(),
              icon: <BsTypeH2 />,
              isActive: editor.isActive("heading", { level: 2 }),
            },
            {
              command: () =>
                editor.chain().focus().toggleHeading({ level: 3 }).run(),
              icon: <BsTypeH3 />,
              isActive: editor.isActive("heading", { level: 3 }),
            },
            {
              command: () => editor.chain().focus().toggleStrike().run(),
              icon: <FaStrikethrough />,
              isActive: editor.isActive("strike"),
            },
            {
              command: () => editor.chain().focus().setHorizontalRule().run(),
              icon: <FaMinus />,
              isActive: false,
            },
          ].map(({ command, icon, isActive }, index) => (
            <button
              key={index}
              onClick={command}
              className={`px-3 py-1 border-2 font-bold rounded-lg shadow-md transition hover:-translate-y-1 cursor-pointer ${
                isActive
                  ? "bg-[var(--foreground)] text-[var(--background)]"
                  : ""
              }`}
            >
              {icon}
            </button>
          ))}
        </div>
      </div>

      {/* Tiptap Editor */}
      <div className="tiptap-editor">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}