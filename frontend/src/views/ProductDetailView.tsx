import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct, Product } from "../services/products";

export default function ProductDetailView() {
  const { id } = useParams();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const load = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getProduct(Number(id));
        setItem(data);
      } catch (e) {
        setError("No se pudo cargar el producto.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!item) return <p>No encontrado.</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div>
        <img src={item.image} alt={item.name} className="w-full rounded-xl object-cover" />
      </div>
      <div className="space-y-3">
        <h1 className="text-2xl font-bold">{item.name}</h1>
        <p className="text-slate-600 dark:text-slate-300">{item.description}</p>
        <p className="text-emerald-600 text-xl font-semibold">${item.price}</p>
        <a
          href="/api/order-builder"
          className="inline-block px-4 py-2 rounded bg-emerald-600 text-white"
        >
          Agregar a mi orden
        </a>
      </div>
    </div>
  );
}
