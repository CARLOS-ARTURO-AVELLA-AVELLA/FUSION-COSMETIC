import { useNavigate } from 'react-router-dom'

export default function CategoriesSection() {
  const navigate = useNavigate()

  const families = [
    {
      id: 'floral',
      nombre: 'Floral',
      descripcion: 'Fragancias florales',
      imagen: '/images/tousd.png'
    },
    {
      id: 'citrica',
      nombre: 'Cítrica',
      descripcion: 'Fragancias cítricas',
      imagen: '/images/Gchanel.png'
    },
    {
      id: 'amaderada',
      nombre: 'Amaderada',
      descripcion: 'Fragancias amaderadas',
      imagen: '/images/terre.png'
    },
    {
      id: 'oriental',
      nombre: 'Oriental',
      descripcion: 'Fragancias orientales',
      imagen: '/images/shalimar.png'
    },
    {
      id: 'chipre',
      nombre: 'Chipre',
      descripcion: 'Fragancias chipre',
      imagen: '/images/scandald.png'
    },
    {
      id: 'fougere',
      nombre: 'Fougère',
      descripcion: 'Fragancias fougère',
      imagen: '/images/impact.webp'
    },
    {
      id: 'gourmand',
      nombre: 'Gourmand',
      descripcion: 'Fragancias gourmand',
      imagen: '/images/angel.png'
    },
    {
      id: 'especiada',
      nombre: 'Especiada',
      descripcion: 'Fragancias especiadas',
      imagen: '/images/spicebomb.png'
    },
  ]

  return (
  <section className="py-20 bg-light-bg">
  <div className="max-w-7xl mx-auto px-4">
  <h2 className="text-4xl font-bold font-display text-center mb-12 text-dark">
    Categorías
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-10">
    {families.map((familia) => (
  <button
    key={familia.id}
    onClick={() => navigate(`/familias-olfativas/${familia.id}`)}
     className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer group"
  >
  <div className="relative h-56 overflow-hidden bg-light-bg">
    <img 
    src={familia.imagen} 
    alt={familia.nombre}
     className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
  />
  </div>

  <div className="p-1 text-center">
  <h3 className="font-display font-bold text-dark group-hover:text-turquoise transition mb-0.2">
    {familia.nombre}
    </h3>
    <p className="text-[11px] text-gray-800">
    {familia.descripcion}
       </p>
      </div>
     </button>
))}
    </div>
   </div>
  </section>
)
}