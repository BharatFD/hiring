import { useEffect, useState } from 'react';
import axios from 'axios';

export default function FAQList() {
    const [faqs, setFaqs] = useState([]);
    const [lang, setLang] = useState('');

    useEffect(()=> {
        fetchFaqs();
    },[lang]);

    async function fetchFaqs() {
        const response = await axios.get(`http://localhost:3000/api/faqs/get-faq/?lang=${lang}`);
        if(response.data.data) {
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
        <div>
            <h1>FAQ List</h1>
            <button onClick={()=> setLang('hi')}>hindi</button>
            <button onClick={()=> setLang('bn')}>Bengali</button>
            <button onClick={()=> setLang('mr')}>Marathi</button>
            <ul>
                {faqs.map((faq)=> (
                    <li key={faq._id}>
                        <h3>{faq.question}</h3>
                        <div dangerouslySetInnerHTML={{__html: faq.answer}}/>
                        {/* <Link to={`/edit/${faq._id}`}>Edit</Link> */}
                        <button onClick={()=> deleteFAQ(faq._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}