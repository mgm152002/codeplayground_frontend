'use client';

import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from '@auth0/nextjs-auth0/client';
import { FaStar } from "react-icons/fa";
import 'ace-builds/src-noconflict/ace';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';
import AceEditor from 'react-ace';
import { useUser } from '@auth0/nextjs-auth0/client';

import { useRouter } from 'next/navigation';


export default function ProfileSlug({ params }) {
    const router = useRouter();
    
  const { user, error, isLoading } = useUser();
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('c');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [result1, setResult1] = useState('');
  const [result, setResult] = useState('');
  const [prompt, setPrompt] = useState('');
  const { slug } = params;

  const getCodeValue = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8000/getCodeValue/?email=mgm@mail.com&fname=${slug}`);
      setCode(data.content);
    } catch (error) {
      console.error('Error fetching code:', error);
    }
  };

  useEffect(() => {
    getCodeValue();
  }, [slug]);

  const filename = slug.substring(0, slug.lastIndexOf('.'));

  const handleCompile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:8000/compile', {
        code: code,
        lang: lang,
        fname: filename,
        email: user.name
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      });
      setResult(data.out); // Assuming the compilation result is in the 'out' field of the response
    } catch (error) {
      console.error('Error compiling code:', error);
      setResult(error.response.data.details);
    } finally {
      setLoading(false);
    }
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;
    const data = new URLSearchParams();
    data.append('prompt', `${prompt}\nCode:\n${code}`);

    try {
        setLoading1(true)
      const response = await axios.post('http://localhost:8000/codeAi', data.toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setLoading1(false)
      setResult1(response.data); // Display the response from the API in the result field
      
    } catch (error) {
      console.error('Error sending prompt:', error);
    }
  };

  if(!user){
    router.push('/')
  }
  else{

  return (
    
    <div className="bg-base-100">
      <h1 className="text-center text-3xl font-thin mt-5 bg-base-100">{slug}</h1>
      <div className="items-center text-center mt-5">
        <button className="btn btn-primary" onClick={() => document.getElementById('my_modal_5').showModal()}>
          <FaStar /> CodeAI
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Chat with codeAI</h3>
            <div className="flex flex-col">
                <div className="items-center mt-3 mb-3">
                <input
                type="text"
                id="prompt-input"
                placeholder="Type your prompt here"
                className="input input-bordered input-primary w-full max-w-xs  mb-4 "
                value={prompt}
                
                onChange={(e) => setPrompt(e.target.value)}
              />

                </div>
              
              <div className="flex justify-between">
                <button
                  id="send-btn"
                  className="btn btn-primary w-1/3"
                  onClick={handleSendPrompt}
                >
                  {loading1 ? <span className="loading loading-dots loading-lg"></span> : 'Send'}
                </button>
                <button
                  className="btn w-1/3"
                  onClick={() => document.getElementById('my_modal_5').close()}
                >
                  Close
                </button>
              </div>
            </div>
            {result1 && (
              <div className="mt-4">
                <label className="block text-lg font-semibold mb-2">Response:</label>
                <textarea
                  readOnly
                  value={result1}
                  className="textarea textarea-bordered textarea-primary w-full h-48 max-w-lg"
                  placeholder="The response from CodeAI will appear here..."
                />
              </div>
            )}
          </div>
        </dialog>
      </div>

      <div className="bg-base-100 text-center pt-10">
        <AceEditor
          mode="c_cpp"
          theme="monokai"
          value={code}
          onChange={setCode}
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          style={{ width: '60%', maxWidth: 'lg', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}
        />
        <div className="mt-4 flex flex-col items-center">
          <select
            className="select select-bordered select-primary max-w-xs mb-2"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="c" onClick={() => setLang('c')}>C</option>
            <option value="js" onClick={() => setLang('js')}>JavaScript</option>
            <option value="py" onClick={() => setLang('py')}>Python</option>
            <option disabled>Java (Coming Soon)</option>
          </select>
          <button className="btn btn-primary" onClick={handleCompile}>
            {loading ? <span className="loading loading-dots loading-lg"></span> : 'Compile'}
          </button>
        </div>
        <div className="text-red-600 mt-2">Please write some code. Remember to include driver code.</div>
        {result && (
                        <AceEditor
                          mode="text"
                          theme="monokai" // changed theme to monokai
                          value={result}
                          name="result-editor"
                          readOnly={true}
                          editorProps={{ $blockScrolling: Infinity }}
                          style={{ width: '50%', maxWidth: 'lg', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px', marginTop: '10px' }} // added border and borderRadius
                        />
                      )}
      </div>
    </div>
  );
}
}