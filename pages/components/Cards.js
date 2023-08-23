'use client';
import Image from "next/image";


export default function Cards({services}) {
    
  return (
    <section className="container mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative bg-center bg-no-repeat bg-cover bg-opacity-80 bg-gray-900">
    {services.map((service, index) => (
      <div key={index} className="p-4 text-gray-800 bg-white shadow-md rounded-lg relative" style={{ margin: '10px' }}>
        <Image src={service.icon} alt={service.title} height={800} width={800} objectFit="cover" />
        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
        <p className="text-gray-600">{service.description}</p>
      </div>
    ))}
  </section>
  );
}