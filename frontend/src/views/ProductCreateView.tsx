import { useState } from "react";
import { createProduct, ProductDTO } from "../services/products";

export default function ProductCreateView() {
  const [form, setForm] = useState<ProductDTO>({
    name: "",
    image: "",
    description: "",
    price: 0,
    categoryId: 1,
  });
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<string|null>(null);
  const [err, setErr] = useState<string|null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'categoryId' ? Number(value) : value
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setErr(null);
    try {
      await createProduct(form);
      setOk("Producto creado correctamente.");
    } catch (e: any) {
      setErr(e?.data?.message || "No se pudo crear el producto.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-semibold mb-4">Crear Producto</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input name="name" value={form.name} onChange={onChange} placeholder="Nombre"
               className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        <input name="image" value={form.image} onChange={onChange} placeholder="URL de imagen"
               className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        <textarea name="description" value={form.description} onChange={onChange} placeholder="Descripción"
               className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        <input name="price" type="number" value={form.price} onChange={onChange} placeholder="Precio"
               className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        <input name="categoryId" type="number" value={form.categoryId} onChange={onChange} placeholder="ID Categoría"
               className="w-full border rounded px-3 py-2 bg-white dark:bg-slate-900" required />
        {ok && <p className="text-emerald-600">{ok}</p>}
        {err && <p className="text-red-600">{err}</p>}
        <button type="submit" disabled={loading}
                className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-60">
          {loading ? 'Guardando…' : 'Crear'}
        </button>
      </form>
    </div>
  );
}
