import React from 'react'
import { Link } from 'react-router-dom';


export function MyApplications(props) {
    const postlist = props.postlist;
  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-8 py-12">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-lg font-semibold">My Applications</h2>
           
          </div>
          

            <Link to={"/"}>
                <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                
                >
                Home
                </button>
            </Link>
                
          
        </div>
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-black md:rounded-lg">
                <table className="min-w-full divide-y divide-black">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-black">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-black"
                      >
                        <span>Post</span>
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-bold text-black"
                      >
                        Details
                      </th>


                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-black"
                      >
                        Role
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-bold text-black"
                      >
                        Status
                      </th>
                     
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black bg-white">
                    {postlist.map((post) => (
                      <tr key={post._id} className="divide-x divide-black">
                        <td className="whitespace-nowrap px-4 py-4">
                          <center>
                          <div className="flex-inline items-center">
                            <div className="h-10 w-10 flex-shrink-0">

                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={post.url}
                                alt=""
                                />
                            </div>
                            <div className="mt-2">
                              <div className="text-sm font-medium text-gray-900">Vacancy : {post.vacancy}</div>
                            
                            </div>
                          </div>
                                </center>
                        </td>

                        <td className="whitespace-nowrap px-12 py-4">
                          <div className="text-sm font-medium text-blue-700">{post.title}</div>
                          <div className="text-sm font-medium text-red-500">Applications : {post.applied.length}</div>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-black">
                          {post.role}
                        </td>
                        <td className="whitespace-nowrap px-4 py-4">
                          <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                            -
                          </span>
                        </td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full border-gray-300">
          <div className="mt-2 flex items-center justify-end">
            <div className="space-x-2">
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                &larr; Previous
              </button>
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
