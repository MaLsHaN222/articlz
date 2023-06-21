export const modules = {
    toolbar: [
        [{ 'header': [3,4, 5, 6 , false] }, 
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        { 'list':'ordered' }, { 'list': 'bullet' },'link','clean'],

    ],
    clipboard: {
        matchVisual: false,
        onPaste: function (e) {
            const clipboardData = e.clipboardData || window.clipboardData;
            const text = clipboardData.getData('text/plain');
            const delta = this.quill.clipboard.convert(text);
            this.quill.setContents(delta, 'silent');
            e.preventDefault();
        }
    } 
};

export const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
];


