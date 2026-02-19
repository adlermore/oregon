// import { getPermitOptions } from "@/lib/data";
// import { fetchRequest } from "@/lib/fetchRequest";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

import Link from "next/link"

async function DashboardPage() {
  // const cookieStore = await cookies()
  // const { value: id } = cookieStore.get('certificate_id') || { value: 0 };
  // const res = await fetchRequest(`certificate?id=${id}`);
  // const options = await getPermitOptions();
  // console.log('options', options);

  // if (!res.success) {
  //   redirect('/')
  // }

  return (
    <div className="py-10">
      <div className="custom_container">
        <h1 className="text-2xl text-tertiary font-bold mb-4">Dashboard</h1>
        <div className='bg-white w-full sm:p-8 p-4 rounded-lg shadow-lg'>
          <div className='mb-10'>
            <h2 className='text-tertiary sm:text-xl text-lg font-bold'>Get Your Oregon Permit Now</h2>
            <p className='text-secondary text-sm mt-2'>Apply for your Oregon permit in just a few minutes and get on the road faster.</p>
          </div>
          <div className='flex items-center'>
            <Link href="/apply" className='bg-siteColor text-white px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300'>New  Report</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage