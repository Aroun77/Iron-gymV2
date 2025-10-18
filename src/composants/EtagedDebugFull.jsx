import { useEffect, useState } from "react";

/**
 * Debug Supabase Images
 * - Affiche les vars d'env
 * - Liste le dossier "etages" du bucket "gym-images"
 * - Construit les public URLs et effectue une requête HEAD pour vérifier l'accessibilité
 * - Affiche un aperçu <img> et le status HEAD
 *
 * Colle ce fichier, ajoute une route ou importe le composant dans ta page,
 * ouvre la console (F12) et regarde les logs + le rendu sur la page.
 */

export default function EtagesDebugFull() {
  const [envVars, setEnvVars] = useState({});
  const [listResponse, setListResponse] = useState(null);
  const [checkedUrls, setCheckedUrls] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function runAllChecks() {
      try {
        // 1) Vars d'environnement
        const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
        const VITE_SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
        setEnvVars({ VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY });
        console.log("ENV VARS:", { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY });

        // 2) Import dynamique du client (évite warnings "Multiple GoTrueClient instances")
        const { createClient } = await import("@supabase/supabase-js");
        const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

        // 3) Lister le dossier "etages"
        const { data, error: listErr } = await supabase
          .storage
          .from("gym-images")
          .list("etages", { limit: 100 });

        console.log("LIST RESPONSE:", { data, listErr });
        if (!mounted) return;
        setListResponse({ data, listErr });

        if (listErr) throw listErr;

        // 4) Filter and build URLs, then check accessibility via HEAD
        const validFiles = Array.isArray(data) ? data.filter(f => f?.name && !f.name.startsWith(".")) : [];
        const urls = await Promise.all(
          validFiles.map(async (file) => {
            const getUrlRes = supabase.storage.from("gym-images").getPublicUrl(`etages/${file.name}`);
            let publicUrl = getUrlRes?.data?.publicUrl || null;

            // Fallback construction if getPublicUrl didn't return one
            if (!publicUrl) {
              try {
                const urlObj = new URL(VITE_SUPABASE_URL);
                publicUrl = `${urlObj.origin}/storage/v1/object/public/gym-images/etages/${encodeURIComponent(file.name)}`;
              } catch (e) {
                // Last-resort fallback (string concat)
                publicUrl = `${VITE_SUPABASE_URL.replace(/\/$/, "")}/storage/v1/object/public/gym-images/etages/${encodeURIComponent(file.name)}`;
              }
            }

            // Try HEAD to check status
            let headStatus = null;
            let headOk = false;
            try {
              const res = await fetch(publicUrl, { method: "HEAD", mode: "cors" });
              headStatus = `${res.status} ${res.statusText}`;
              headOk = res.ok;
            } catch (fetchErr) {
              headStatus = `FETCH_ERROR: ${fetchErr.message}`;
            }

            console.log("CHECKED URL:", { name: file.name, publicUrl, headStatus, headOk });
            return { name: file.name, publicUrl, headStatus, headOk };
          })
        );

        if (!mounted) return;
        setCheckedUrls(urls);
      } catch (err) {
        console.error("RUN ALL CHECKS ERROR:", err);
        setError(err?.message || String(err));
      }
    }

    runAllChecks();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div style={{ padding: 16, color: "white", fontFamily: "system-ui, Arial" }}>
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>Debug Supabase Images</h1>

      <section style={{ background: "#111", padding: 12, borderRadius: 8, marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontWeight: 600 }}>1) Env vars (Vite)</h2>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{JSON.stringify(envVars, null, 2)}</pre>
        <div style={{ color: "#f7c948", marginTop: 6 }}>
          Si VITE_SUPABASE_URL ou ANON_KEY sont undefined → redémarre le serveur dev et vérifie ton .env.
        </div>
      </section>

      <section style={{ background: "#111", padding: 12, borderRadius: 8, marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontWeight: 600 }}>2) List response</h2>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{JSON.stringify(listResponse, null, 2)}</pre>
        <div style={{ color: "#f7c948", marginTop: 6 }}>
          Vérifie que "data" contient bien les objets fichier avec une propriété "name".
        </div>
      </section>

      <section style={{ background: "#111", padding: 12, borderRadius: 8, marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontWeight: 600 }}>3) URL checks (HEAD)</h2>
        {checkedUrls.length === 0 && <div style={{ marginTop: 8 }}>Aucun fichier trouvé ou vérification en cours.</div>}
        <ul style={{ paddingLeft: 18 }}>
          {checkedUrls.map(u => (
            <li key={u.name} style={{ marginBottom: 14 }}>
              <div><strong>{u.name}</strong></div>
              <div>URL: <a href={u.publicUrl} target="_blank" rel="noreferrer" style={{ color: "#8cc4ff", wordBreak: "break-all" }}>{u.publicUrl}</a></div>
              <div>Status: <span style={{ color: u.headOk ? "lightgreen" : "tomato" }}>{u.headStatus}</span></div>
              <div style={{ marginTop: 8 }}>
                <img
                  src={u.publicUrl}
                  alt={u.name}
                  style={{ width: 240, maxHeight: 160, objectFit: "cover", borderRadius: 8, display: "block" }}
                  onError={(e) => { e.currentTarget.style.opacity = 0.45; e.currentTarget.title = "Erreur affichage"; }}
                />
              </div>
            </li>
          ))}
        </ul>
      </section>

      {error && (
        <section style={{ background: "#400", padding: 12, borderRadius: 8 }}>
          <h2 style={{ margin: 0, fontWeight: 600 }}>Erreur détectée</h2>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>{String(error)}</pre>
        </section>
      )}

      <div style={{ color: "#aaa", marginTop: 12, fontSize: 13 }}>
        Après ouverture :
        <ol>
          <li>Copie ici le contenu complet de la console (les logs LIST RESPONSE et CHECKED URL).</li>
          <li>Si une URL donne 403/404, clique sur le lien et partage la capture d'écran de l'onglet Network.</li>
        </ol>
      </div>
    </div>
  );
}
