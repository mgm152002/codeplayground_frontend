'use client';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from 'next/navigation';
import AceEditor from 'react-ace';

// Import the required ACE editor mode and theme
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai'; // changed theme to monokai

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const [code, setCode] = useState('');
  const [lang, setLang] = useState('c');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleCompile = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('https://3.110.50.141:8000/compile', {
        code: code,
        lang: lang
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      setResult(data.out); // Assuming the compilation result is in the 'out' field of the response
    } catch (error) {
      console.error('Error compiling code:', error);
      setResult(error.response.data.details);
      // Handle error here
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    router.push('/');
  } else {
    return (
      user && (
        <>
          <div>
            <div className="text-center bg-base-100 p-8">
              <h1 className="text-3xl font-bold mb-4">Welcome</h1>
              <h2 className="text-xl mb-4">{user.name}</h2>
              <div className="avatar">
                <div className="w-24 rounded-full overflow-hidden mx-auto">
                  <img src={user.picture} alt={user.name} className="w-full h-full" />
                </div>
              </div>
            </div>
            <div className="bg-base-100 text-center pt-10">
              <AceEditor
                mode="c_cpp"
                theme="monokai" // changed theme to monokai
                value={code}
                onChange={setCode}
                name="code-editor"
                editorProps={{ $blockScrolling: true }}
                style={{ width: '60%', maxWidth: 'lg', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }} // added border and borderRadius
              />
              <div className="mt-4 flex flex-col items-center">
                <select
                  className="select select-bordered select-primary max-w-xs mb-2"
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                >
                  <option value="c">C</option>
                  <option disabled>JavaScript (Coming Soon)</option>
                  <option disabled>Python (Coming Soon)</option>
                  <option disabled>Java (Coming Soon)</option>
                  {/* Add more languages here */}
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
        </>
      )
    );
  }
}
