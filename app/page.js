'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import { FaCode, FaRobot, FaUsers, FaBolt, FaEdit } from 'react-icons/fa';
import { FaStar, FaCheckCircle, FaHeart } from 'react-icons/fa';

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);
  const router = useRouter();
  const { user } = useUser(); 
  


  const features = [
    {
      icon: <FaCode className="text-4xl text-primary" />,
      title: "Multi-Language Support",
      description: "Write, run, and compile code in a wide range of programming languages effortlessly.",
    },
    {
      icon: <FaRobot className="text-4xl text-primary" />,
      title: "AI-Powered Doubt Solving",
      description: "Get instant coding help with our integrated AI LLM, designed to answer your questions in real-time.",
    },
    {
      icon: <FaEdit className="text-4xl text-primary" />,
      title: "Intuitive Code Editor",
      description: "Work seamlessly with syntax highlighting, auto-completion, and debugging tools.",
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Collaborate in Real-Time",
      description: "Share code with teammates and work together efficiently.",
    },
    {
      icon: <FaBolt className="text-4xl text-primary" />,
      title: "Fast Execution",
      description: "Execute your code instantly and get accurate results without delays.",
    },
  ];

  // useEffect(() => {
  //   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  //   if (isMobile) {
  //     setShowWarning(true);
  //   }
  // }, []);

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
        <div className="card w-96 bg-primary shadow-xl">
          <div className="card-body text-black text-center">
            <h2 className="card-title">Warning!</h2>
            <p>This website is not supported on mobile devices!</p>
          </div>
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
      <div className="hero bg-base-200 py-20">
  <div className="hero-content text-center">
    <div className="max-w-md">
      <h1 className="text-5xl font-bold mr-3">CodePlayGround</h1>
      <p className="py-5">
      Your go-to platform to write, run, and compile code across multiple programming languages with ease. Experiment, test, and bring your ideas to life in a seamless and intuitive environment!”
      </p>
      <button className="btn btn-primary" onClick={()=>router.push('/api/auth/login')}>Get Started</button>
    </div>
  </div>

  
</div>
<div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 bg-base-200 ">
      {features.map((feature, index) => (
        <div key={index} className="card w-full bg-base-300 shadow-xl">
          <div className="card-body items-center text-center">
            <div className="mb-4">{feature.icon}</div>
            <h2 className="card-title text-lg">{feature.title}</h2>
            <p className="text-base-content">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>






    <div className="bg-base-200 py-12">
      <div className="container mx-auto px-5">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold">Why Developers Love CodePlayGround</h2>
          <p className="mt-4 text-lg text-gray-600">
            Trusted by developers worldwide for its speed, reliability, and innovative features.
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          
          <div className="card bg-base-300 shadow-xl p-6 text-center">
            <div className="text-primary mb-4">
              <FaStar className="text-4xl mx-auto" />
            </div>
            <h3 className="font-bold text-lg">Rated 5 Stars</h3>
            <p className="mt-2 text-gray-600">
              Developers love our platform for its simplicity, performance, and reliability.
            </p>
          </div>

          
          <div className="card bg-base-300 shadow-xl p-6 text-center">
            <div className="text-primary mb-4">
              <FaCheckCircle className="text-4xl mx-auto" />
            </div>
            <h3 className="font-bold text-lg">99.9% Uptime</h3>
            <p className="mt-2 text-gray-600">
              CodePlayGround ensures your coding environment is always available and secure.
            </p>
          </div>

          
          <div className="card bg-base-300 shadow-xl p-6 text-center">
            <div className="text-primary mb-4">
              <FaHeart className="text-4xl mx-auto" />
            </div>
            <h3 className="font-bold text-lg">Community Support</h3>
            <p className="mt-2 text-gray-600">
              Join a growing community of developers who share knowledge and inspiration.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="btn btn-primary btn-lg">Join the Community</button>
        </div>
      </div>
    </div>
    </div>
  );
}
