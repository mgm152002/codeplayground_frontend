'use client'
import { useUser } from '@auth0/nextjs-auth0/client';
import { useRouter } from "next/navigation";
import NavbarComp from '../components/NavbarComp';
export default  function Home() {
 
  const router=useRouter();
  const{user} = useUser(); 
  if(user){
    router.push("/profile")
  }
  return (
    <div className='bg-base-500'>
      <NavbarComp/>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://th.bing.com/th/id/OIG3.lG5l3d0awnok0rpKZL8Y?pid=ImgGn" className="max-w-sm rounded-lg shadow-2xl lg:max-w-none lg:w-1/2" alt="Compiler Image" />
          <div className="flex flex-col justify-center lg:pl-12">
            <h1 className="text-5xl font-bold">Compile your code Online</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen bg-base-300">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://th.bing.com/th/id/OIG3.zgvdL3eXbt1G0hZu7Mgt?w=1024&h=1024&rs=1&pid=ImgDetMain" className="max-w-sm rounded-lg shadow-2xl lg:max-w-none lg:w-1/2" alt="Compiler Image" />
          <div className="flex flex-col justify-center lg:pl-12">
            <h1 className="text-5xl font-bold">Write, Compile, Run</h1>
            <p className="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu justo nec sapien ullamcorper hendrerit et eget nulla.</p>
            <button className="btn btn-primary">Learn More</button>
          </div>
        </div>
      </div>

      <div className="hero min-h-screen bg-base-400">
        <div className="hero-content flex-col lg:flex-row">
          <img src="https://th.bing.com/th/id/OIG2.QIBtHhvXnHaExwBCTWL.?pid=ImgGn" className="max-w-sm rounded-lg shadow-2xl lg:max-w-none lg:w-1/2" alt="Compiler Image" />
          <div className="flex flex-col justify-center lg:pl-12">
            <h1 className="text-5xl font-bold">Fast and Efficient</h1>
            <p className="py-6">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.</p>
            <button className="btn btn-primary">Start Coding</button>
          </div>
        </div>
      </div>
    </div>
  );
}
