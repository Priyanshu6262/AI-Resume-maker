import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import './RichTextEditor.css'; // Custom styles for dark mode

export let globalActiveQuill = null;

// Configure Quill to use inline styles instead of classes for size and font
// This ensures that the styles work across the preview without needing Quill's CSS
const SizeStyle = Quill.import('attributors/style/size');
SizeStyle.whitelist = ['10px', '12px', '14px', '16px', '18px', '20px', '24px', '30px'];
Quill.register(SizeStyle, true);

const FontStyle = Quill.import('attributors/style/font');
FontStyle.whitelist = ['sans-serif', 'serif', 'monospace'];
Quill.register(FontStyle, true);

const modules = {
    toolbar: false // Disable built-in toolbar module due to multi-instance bugs
};

const formats = [
    'bold', 'italic', 'underline',
    'color'
];

const RichTextEditor = ({ value, onChange, placeholder, onFocus, onBlur }) => {
    const quillRef = useRef(null);

    const handleFocus = (range, source, editor) => {
        if (quillRef.current) {
            globalActiveQuill = quillRef.current.getEditor();
        }
        if (onFocus) onFocus(range, source, editor);
    };

    return (
        <div className="quill-custom-headless bg-white rounded-lg overflow-hidden border border-slate-300 focus-within:ring-1 focus-within:ring-green-600 focus-within:border-green-600">
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value || ''}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                onFocus={handleFocus}
                onBlur={onBlur}
            />
        </div>
    );
};

export default RichTextEditor;
