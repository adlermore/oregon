// import Image from 'next/image';
import Link from 'next/link';
// import notfountImage from '@/public/images/logo.webp';

export default function NotFound() {
  return (
    <div className="relative h-full  min-h-[calc(100vh-247px)] -mb-10 flex items-center justify-center text-white overflow-hidden">
      {/* <Image
        src={notfountImage}
        alt="404 Not Found"
        fill
        style={{ objectFit: 'cover' }}
      /> */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-10"></div>
      <div className="relative z-20 max-w-xl text-center p-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-6">Looks like you are lost my friend... </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-siteColor text-white font-semibold rounded-xl hover:opacity-80 transition"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
