import { useState } from 'react';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';

const AddFAQ = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('Saving Response');
        try {
            await axios.post('http://localhost:3000/api/faqs/add-faq', {
                question,
                answer,
            });
            alert('FAQ added successfully');
        } catch (error) {
            console.error('Error adding FAQ:', error);
        }
    };

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff' }}>
            <h1 style={{ color: '#333', marginBottom: '20px' }}>Add FAQ</h1>
            <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
                <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
                    Question:
                </label>
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    required
                    style={{ width: '100%', padding: '8px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '4px' }}
                />
                <label style={{ display: 'block', marginBottom: '10px', color: '#333' }}>
                    Answer:
                </label>
                <CKEditor
                    editor={ClassicEditor}
                    data={answer}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setAnswer(data);
                    }}
                    config={{
                        licenseKey: 'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzk2NjM5OTksImp0aSI6IjAzYzhkN2NmLTg4MTgtNGE5NC1hZTE0LTZjNmU3YjQwYzUwNyIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6IjM2NWZmMGY3In0.HzWpjrjwOVJ7iGT5bo3BNzdw1MZDf228TY2ZGwukDQrGwtnjy5pg2IHtkpWfQsoQiMoTFltXOoYw_9gqIE995g',
                        plugins: [Essentials, Paragraph, Bold, Italic],
                        toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'formatPainter'],
                        initialData: '<p>Hello from CKEditor 5 in React!</p>',
                    }}
                />
                <button
                    type="submit"
                    style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Add FAQ
                </button>
            </form>
        </div>
    );
};

export default AddFAQ;