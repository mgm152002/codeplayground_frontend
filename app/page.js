'use client'
import { useUser } from '@clerk/nextjs';
import { useRouter } from "next/navigation";
import { FaCode, FaRobot, FaUsers, FaBolt, FaEdit } from 'react-icons/fa';
import { FaStar, FaCheckCircle, FaHeart } from 'react-icons/fa';

export default function Home() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser(); 
  
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

  

  return (
    <div className='min-h-screen bg-background text-foreground'>
      <nav className="flex items-center justify-between p-4 border-b border-border">
        <a className="text-2xl font-bold text-primary" href="/">CodePlayGround</a>
        <div>
          <a className='inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2' href='/sign-in'>Login/Signup</a>
        </div>
      </nav>
      <header className="py-20 text-center bg-card">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-extrabold text-card-foreground mb-4">CodePlayGround</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your go-to platform to write, run, and compile code across multiple programming languages with ease. Experiment, test, and bring your ideas to life in a seamless and intuitive environment!
          </p>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2" onClick={()=>router.push('/sign-up')}>Get Started</button>
        </div>
      </header>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-300 hover:scale-105">
                <div className="mb-4">{feature.icon}</div>
                <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-card-foreground">Why Developers Love CodePlayGround</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Trusted by developers worldwide for its speed, reliability, and innovative features.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background text-foreground shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="text-primary mb-4">
                <FaStar className="text-5xl mx-auto" />
              </div>
              <h3 className="font-bold text-xl mb-2">Rated 5 Stars</h3>
              <p className="text-muted-foreground">
                Developers love our platform for its simplicity, performance, and reliability.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background text-foreground shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="text-primary mb-4">
                <FaCheckCircle className="text-5xl mx-auto" />
              </div>
              <h3 className="font-bold text-xl mb-2">99.9% Uptime</h3>
              <p className="text-muted-foreground">
                CodePlayGround ensures your coding environment is always available and secure.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-lg border bg-background text-foreground shadow-sm transition-transform duration-300 hover:scale-105">
              <div className="text-primary mb-4">
                <FaHeart className="text-5xl mx-auto" />
              </div>
              <h3 className="font-bold text-xl mb-2">Community Support</h3>
              <p className="text-muted-foreground">
                Join a growing community of developers who share knowledge and inspiration.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Join the Community</button>
          </div>
        </div>
      </section>
    </div>
  );
}