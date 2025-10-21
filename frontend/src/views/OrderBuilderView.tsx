import { useEffect, useState } from "react";
import { listProducts, Product } from "../services/products";
import { createOrder, addItemToOrder } from "../services/orders";

export default function OrderBuilderView() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orderId, setOrderId]   = useState<number|null>(null);
  const [selected, setSelected] = useState<Record<number, number>>({}); // productId -> amount
  const [loading, setLoading]   = useState(false);
  const [msg, setMsg] = useState<string|null>(null);
  const [err, setErr] = useState<string|null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listProducts({ limit: 30, offset: 0 });
        setProducts(data);
      } catch {
        setErr("No se pudieron cargar productos.");
      }
    };
    load();
  }, []);

  const ensureOrder = async () => {
    if (orderId) return orderId;
    const o = await createOrder();
    setOrderId(o.id);
    return o.id;
    // Nota: El backend podría crear automáticamente el customer en base al JWT.
  };

  const add = (id: number, delta: number) => {
    setSelected(prev => {
      const next = { ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) };
      if (next[id] === 0) delete next[id];
      return next;
    });
  };

  const submit = async () => {
    setLoading(true); setMsg(null); setErr(null);
    try {
      const oid = await ensureOrder();
      const entries = Object.entries(selected);
      for (const [pId, amount] of entries) {
        if (amount > 0) await addItemToOrder(oid, Number(pId), amount);
      }
      setMsg(`¡Orden #${oid} registrada!`);
      setSelected({});
    } catch (e:any) {
      setErr(e?.data?.message || "No se pudo registrar la orden.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Crear mi Orden</h1>
      {msg && <p className="text-emerald-600">{msg}</p>}
      {err && <p className="text-red-600">{err}</p>}
      <div className="grid gap-4 md:grid-cols-3">
        {products.map(p => (
          <div key={p.id} className="border rounded p-3 bg-white dark:bg-slate-800">
            <img src={p.image} alt={p.name} className="w-full h-36 object-cover rounded" />
            <div className="mt-2 font-medium">{p.name}</div>
            <div className="text-emerald-600">${p.price}</div>
            <div className="mt-2 flex items-center gap-2">
              <button onClick={() => add(p.id, -1)} className="px-2 py-1 rounded bg-slate-200 dark:bg-slate-700">-</button>
              <span className="min-w-6 text-center">{selected[p.id] || 0}</span>
              <button onClick={() => add(p.id, 1)} className="px-2 py-1 rounded bg-slate-900 text-white">+</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          disabled={loading || Object.keys(selected).length === 0}
          onClick={submit}
          className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-60"
        >
          {loading ? "Registrando…" : "Registrar Orden"}
        </button>
        {orderId && <span className="text-sm text-slate-500">Orden actual: #{orderId}</span>}
      </div>
    </div>
  );
}
