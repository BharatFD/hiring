import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FAQList() {
    const [faqs, setFaqs] = useState([]);
    const [lang, setLang] = useState('');

    useEffect(() => {
        fetchFaqs();
    }, [lang]);

    setTimeout(()=> {
        fetchFaqs();
    }, 60*1000);

    async function fetchFaqs() {
        const response = await axios.get(`http://localhost:3000/api/faqs/get-faq/?lang=${lang}`);
        if (response.data.data) {
            setFaqs(response.data.data);
        } else {
            setFaqs(response.data.translatedFAQS);
        }
    }

    async function deleteFAQ(id) {
        await axios.delete(`http://localhost:3000/api/faqs/delete-faq/${id}`);
        fetchFaqs();
    }

    return (
        <div style={{ padding: '20px', backgroundColor: '#fff' }}>
            <h1 style={{ color: '#333', marginBottom: '20px' }}>FAQ List</h1>
            <div style={{ marginBottom: '20px' }}>
                <button
                    onClick={() => setLang('hi')}
                    style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Hindi
                </button>
                <button
                    onClick={() => setLang('bn')}
                    style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Bengali
                </button>
                <button
                    onClick={() => setLang('mr')}
                    style={{ marginRight: '10px', padding: '8px 16px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Marathi
                </button>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {faqs.map((faq) => (
                    <li key={faq._id} style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '4px' }}>
                        <h3 style={{ color: '#333', marginBottom: '10px' }}>{faq.question}</h3>
                        <div dangerouslySetInnerHTML={{ __html: faq.answer }} style={{ color: '#555', marginBottom: '10px' }} />
                        <button
                            onClick={() => deleteFAQ(faq._id)}
                            style={{ padding: '8px 16px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}