'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);
  const router = useRouter();
  const { user } = useUser(); 

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setShowWarning(true);
    }
  }, []);

  const handleCloseWarning = () => {
    // Do nothing when the warning is closed
  };

  if (user) {
    router.push("/profile")
  }

  return (
    <div className='bg-base-500'>
      {showWarning && (
        <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Warning!</h2>
            <p className="mb-4">You are viewing this page on a mobile device. For the best experience, please use a desktop or laptop computer.</p>
            <button className="btn btn-primary" onClick={handleCloseWarning} disabled>OK</button>
          </div>
        </div>
      )}
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">CodePlayGround</a>
        </div>
        <div className="flex-none">
          <a className='btn btn-primary' href='/api/auth/login'>Login/Signup</a>
        </div>
      </div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://th.bing.com/th/id/OIG3.lG5l3d0awnok0rpKZL8Y?pid=ImgGn" className="max-w-sm rounded-lg shadow-2xl lg:max-w-none lg:w-1/2" alt="Compiler Image" />
          <div className="flex flex-col justify-center lg:pl-12 transition-transform duration-500 transform hover:scale-110">
            <h1 className="text-5xl font-bold">Compile your code Online</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen bg-base-300">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://th.bing.com/th/id/OIG3.zgvdL3eXbt1G0hZu7Mgt?w=1024&h=1024&rs=1&pid=ImgDetMain" className="max-w-sm rounded-lg shadow-2xl lg:max-w-none lg:w-1/2" alt="Compiler Image" />
          <div className="flex flex-col justify-center lg:pl-12 transition-transform duration-500 transform hover:scale-110">
            <h1 className="text-5xl font-bold">Write, Compile, Run</h1>
            <p className="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu justo nec sapien ullamcorper hendrerit et eget nulla.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen bg-base-400">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://th.bing.com/th/id/OIG2.QIBtHhvXnHaExwBCTWL.?pid=ImgGn" className="max-w-sm rounded-lg shadow-2xl lg:max-w-none lg:w-1/2" alt="Compiler Image" />
          <div className="flex flex-col justify-center lg:pl-12 transition-transform duration-500 transform hover:scale-110">
            <h1 className="text-5xl font-bold">Fast and Efficient</h1>
            <p className="py-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
            <button className="btn btn-primary">Start Coding</button>
          </div>
        </div>
      </div>
    </div>
  );
}
