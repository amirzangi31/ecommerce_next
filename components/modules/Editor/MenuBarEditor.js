import React, { useState } from 'react'
import {
  FaBold,
  FaItalic,
  FaRedo,
  FaListOl,
  FaListUl,
  FaStrikethrough,
  FaUnderline,
  FaUndo,
  FaFileImage,
  FaCode,
  FaQuoteLeft,
  FaHeading,
} from "react-icons/fa";
import {
  GrTextAlignCenter,
  GrTextAlignLeft,
  GrTextAlignRight,
} from "react-icons/gr";
import { BiCodeCurly } from "react-icons/bi";
import { BsJustify } from "react-icons/bs";
import { Oval } from 'react-loader-spinner';


function MenuBarEditor({ editor, changeImageHandler, loading }) {
  const [color, setColor] = useState("#000000")

  if (!editor) {
    return null
  }


  return (
    <div className="btns-editor">
      <div className="flex justify-between items-center pr-1">
        <div className="btn-editor-color ">
          <input
            type="color"

            onInput={(event) => {

              editor.chain().focus().setColor(event.target.value).run()
              setColor(editor.getAttributes("textStyle").color)
            }
            }
            // value={editor.getAttributes("textStyle").color}
            value={color}
          />
        </div>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={` ${editor.isActive("bold") ? "active" : " "}`}
        >
          <FaBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`  ${editor.isActive("italic") ? "active" : " "}`}
        >
          <FaItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={` ${editor.isActive("underline") ? "active" : " "}`}
        >
          <FaUnderline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`  ${editor.isActive("strike") ? "active" : " "}`}
        >
          <FaStrikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`  ${editor.isActive("code") ? "active" : " "}`}
        >
          <BiCodeCurly />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`  ${editor.isActive("heading", { level: 1 }) ? "active" : ""
            }`}
        >
          <FaHeading />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`  ${editor.isActive("bulletList") ? "active" : " "}`}
        >
          <FaListUl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`  ${editor.isActive("orderedList") ? "active" : " "}`}
        >
          <FaListOl />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`  ${editor.isActive("codeBlock") ? "active" : " "}`}
        >
          <FaCode />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`  ${editor.isActive("blockquote") ? "active" : " "}`}
        >
          <FaQuoteLeft />
        </button>
        {
          loading ? <div>
            <Oval
              height={20}
              width={20}
              color="#4fa94d"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel='oval-loading'
              secondaryColor="#4fa94d"
              strokeWidth={2}
              strokeWidthSecondary={2}

            />
          </div> : <label
            htmlFor="image"
            className={`  ${editor.isActive("image") ? "cursor-pointer active" : "cursor-pointer  "}`}
          >
            <input type="file" onChange={changeImageHandler} name="image" id="image" hidden />
            <FaFileImage />
          </label>
        }
      </div>
      <div>

        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={editor.isActive({ textAlign: "left" }) ? "active" : ""}
        >
          <GrTextAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={editor.isActive({ textAlign: "center" }) ? "active" : ""}
        >
          <GrTextAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={editor.isActive({ textAlign: "right" }) ? "active" : ""}
        >
          <GrTextAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={editor.isActive({ textAlign: "justify" }) ? "active" : ""}
        >
          <BsJustify />
        </button>
      </div>
      <div>
        <button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </button>
      </div>
    </div>
  )
}

export default MenuBarEditor