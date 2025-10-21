import { useEffect, useState } from "react";
import { getMe, getMyOrders, Me, MyOrder } from "../services/profile";

export default function ProfileView() {
  const [me, setMe] = useState<Me|null>(null);
  const [orders, setOrders] = useState<MyOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState<string|null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true); setError(null);
      try {
        const [u, o] = await Promise.all([getMe(), getMyOrders()]);
        setMe(u); setOrders(o);
      } catch (e:any) {
        setError(e?.status === 401 ? "No autorizado" : "Error cargando perfil");
      } finally { setLoading(false); }
    };
    load();
  }, []);

  if (loading) return <p>Cargando…</p>;
  if (error)   return <p className="text-red-600">{error}</p>;
  if (!me)     return <p>No hay datos.</p>;

  return (
    <div className="space-y-6">
      <section className="p-4 rounded border bg-white dark:bg-slate-800">
        <h2 className="text-lg font-semibold">Mi Usuario</h2>
        <p><b>Email:</b> {me.email}</p>
        <p><b>Rol:</b> {me.role}</p>
        <p><b>Desde:</b> {new Date(me.created_at).toLocaleString()}</p>
      </section>

      <section className="p-4 rounded border bg-white dark:bg-slate-800">
        <h2 className="text-lg font-semibold mb-2">Mis Órdenes</h2>
        {orders.length === 0 && <p>No tienes órdenes aún.</p>}
        <ul className="space-y-2">
          {orders.map(o => (
            <li key={o.id} className="rounded border p-3">
              <div><b>Orden #{o.id}</b></div>
              <div className="text-sm text-slate-500">Creada: {new Date(o.created_at).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
