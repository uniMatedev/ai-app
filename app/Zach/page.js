import Head from "next/head";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Zach Banks' Portfolio</title>
      </Head>

      <header className="text-center py-10">
        <h1 className="text-4xl font-bold">Welcome to Zach Banks Portfolio</h1>
      </header>
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-gray-200 p-4">Project 1</div>
          <div className="bg-gray-200 p-4">Project 2</div>
          <div className="bg-gray-200 p-4">Project 3</div>
        </div>
      </section>
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold">Resume</h2>
        <p className="mt-4">Peruse the annals of my professional life...</p>
      </section>
      <section className="text-center py-10">
        <h2 className="text-3xl font-bold">Contact</h2>
        <form className="mt-4">
          <input
            type="text"
            placeholder="Your Name"
            className="p-2 mb-2 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="p-2 mb-2 border rounded"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            Submit
          </button>
        </form>
      </section>

      {/* Add other sections here */}
    </div>
  );
}
