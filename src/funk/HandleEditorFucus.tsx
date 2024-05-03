import { useState, useEffect, useRef } from "react";

function HandleEditorFocus(init: boolean) {
  const [isEditorFocused, setIsEditorFocused] = useState(init)
  const ref = useRef<any>(null)
  function handleClickOutsideEditor(event: any): void {

    console.log('wehe')
    if (ref.current && !ref.current.contains(event.target)) {
      console.log('wehe2')
      setIsEditorFocused(false)
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideEditor, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideEditor, true);
    };
  });
  return { ref, isEditorFocused, setIsEditorFocused };
}

export default HandleEditorFocus