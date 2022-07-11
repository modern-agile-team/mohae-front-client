const useResizeTextArea = (
  textareaRef: React.RefObject<HTMLTextAreaElement>,
) => {
  const resizeTextArea = () => {
    if (!textareaRef.current) return;
    textareaRef.current.style.height = 'auto';
    const height = textareaRef.current.scrollHeight;
    textareaRef.current.style.height = `${height + 8}px`;
  };
  return resizeTextArea;
};

export default useResizeTextArea;
