import { useEffect, useState } from "react";
import { listCategories, Category } from "../services/categories";

export default function CategoriesView() {
  const [items, setItems] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const data = await listCategories();
        setItems(data);
      } catch (e:any) {
        setError(e?.status === 401 ? "No autorizado" : "Error cargando categorías");
      } finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Categorías (JWT)</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map(c => (
          <div key={c.id} className="border rounded p-3 bg-white dark:bg-slate-800">
            <img src={c.image} className="w-full h-32 object-cover rounded" />
            <div className="mt-2 font-medium">{c.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
