'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar, FaPlay, FaRobot, FaSave } from "react-icons/fa";
import Editor from '@monaco-editor/react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function ProfileSlug({ params }) {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [code, setCode] = useState('');
  const [lang, setLang] = useState('c');
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [result, setResult] = useState('');
  const [prompt, setPrompt] = useState('');
  
  const { slug } = params;
  const [showModal, setShowModal] = useState(false);

  const getCodeValue = async () => {
    try {
      const { data } = await axios.get(`https://code-playground.duckdns.org/getCodeValue/?email=${user?.primaryEmailAddress?.emailAddress}&fname=${slug}`);
      setCode(data.content);
    } catch (error) {
      console.error('Error fetching code:', error);
      toast.error('Failed to fetch code.');
    }
  };

  useEffect(() => {
    getCodeValue();
  }, [slug]);

  const filename = slug.substring(0, slug.lastIndexOf('.'));

  const handleCompile = async () => {
    const compilePromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const { data } = await axios.post('https://code-playground.duckdns.org/compile', {
          code: code,
          lang: lang,
          fname: filename,
          email: user?.primaryEmailAddress?.emailAddress
        }, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
        });
        setResult(data.out);
        resolve('Code compiled successfully!');
      } catch (error) {
        console.error('Error compiling code:', error);
        setResult(error.response.data.details);
        reject('Failed to compile code.');
      } finally {
        setLoading(false);
      }
    });
    toast.promise(compilePromise, {
      loading: 'Compiling code...',
      success: 'Compilation successful!',
      error: 'Compilation failed.',
    });
  };

  const handleSendPrompt = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: 'user', text: prompt };
    setChatHistory((prev) => [...prev, userMessage]);
    setPrompt('');

    const aiPromise = new Promise(async (resolve, reject) => {
      const data = new URLSearchParams();
      data.append('prompt', `${prompt}\nCode:\n${code}`);

      try {
        setLoading1(true);
        const response = await axios.post('https://code-playground.duckdns.org/codeAi', data.toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        const aiMessage = { sender: 'ai', text: response.data };
        setChatHistory((prev) => [...prev, aiMessage]);
        resolve('AI response received!');
      } catch (error) {
        console.error('Error sending prompt:', error);
        const errorMessage = { sender: 'ai', text: 'Error: Unable to get response from CodeAI.' };
        setChatHistory((prev) => [...prev, errorMessage]);
        reject('Failed to get AI response.');
      } finally {
        setLoading1(false);
      }
    });
    toast.promise(aiPromise, {
      loading: 'Getting AI response...',
      success: 'AI response received!',
      error: 'Failed to get AI response.',
    });
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn && process.env.SKIP_AUTH !== 'true') {
      router.push("/");
    }
  }, [isLoaded, isSignedIn, router]);

  const getLanguageMode = (lang) => {
    switch (lang) {
      case 'c':
      case 'cpp':
        return 'cpp';
      case 'js':
        return 'javascript';
      case 'py':
        return 'python';
      case 'go':
        return 'go';
      case 'rs':
        return 'rust';
      default:
        return 'plaintext';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <nav className="flex items-center justify-between p-4 border-b border-border">
        <Link href="/dashboard">
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Back to Dashboard
          </button>
        </Link>
        <h1 className="text-xl font-bold">{slug}</h1>
        <div className="flex items-center space-x-4">
          <select
            className="flex h-10 w-32 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="c">C</option>
            <option value="js">JavaScript</option>
            <option value="py">Python</option>
            <option value="cpp">C++</option>
            <option value="go">Go</option>
            <option value="rs">Rust</option>
          </select>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2"
            onClick={() => setShowModal(true)}
          >
            <FaRobot className="mr-2" /> CodeAI
          </button>
          <button
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            onClick={handleCompile}
            disabled={loading}
          >
            {loading ? 'Running...' : <><FaPlay className="mr-2" /> Run Code</>}
          </button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 flex flex-col border-r border-border">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Code Editor</h2>
          </div>
          <Editor
            height="100%"
            language={getLanguageMode(lang)}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
        <div className="w-1/2 flex flex-col">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Output</h2>
          </div>
          <div className="flex-1 p-4 overflow-auto bg-muted text-muted-foreground">
            <pre>{result}</pre>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="relative z-50 w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-4">Chat with CodeAI</h3>
            <div className="flex flex-col h-96">
              <div className="flex-1 overflow-y-auto p-4 border border-input rounded-md mb-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
                  >
                    <span
                      className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
                    >
                      {msg.text}
                    </span>
                  </div>
                ))}
              </div>
              <input
                type="text"
                placeholder="Type your prompt here"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mb-4"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleSendPrompt();
                }}
              />
              <div className="flex justify-between">
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-1/3"
                  onClick={handleSendPrompt}
                  disabled={loading1}
                >
                  {loading1 ? 'Sending...' : 'Send'}
                </button>
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-1/3"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}