// Muestra texto escrito en un Markdown sencillo:
//   ## Título        ### Subtítulo        > Consejo
//   - lista          1. lista numerada    **negritas**   *cursivas*
// Se convierte a elementos de React (sin HTML crudo), así que es seguro.

function enLinea(texto) {
  const partes = texto.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return partes.map((parte, i) => {
    if (parte.startsWith("**") && parte.endsWith("**")) return <strong key={i} className="font-semibold text-gray-900">{parte.slice(2, -2)}</strong>;
    if (parte.startsWith("*") && parte.endsWith("*") && parte.length > 2) return <em key={i}>{parte.slice(1, -1)}</em>;
    return parte;
  });
}

// Separa el texto en bloques: títulos, párrafos, listas y consejos
function leerBloques(texto) {
  const bloques = [];
  for (const linea of texto.replace(/\r/g, "").split("\n")) {
    const l = linea.trim();
    const ultimo = bloques[bloques.length - 1];

    if (!l) { bloques.push({ tipo: "vacio" }); continue; }
    if (l.startsWith("### ")) { bloques.push({ tipo: "h3", texto: l.slice(4) }); continue; }
    if (l.startsWith("## ")) { bloques.push({ tipo: "h2", texto: l.slice(3) }); continue; }
    if (l.startsWith("> ")) { bloques.push({ tipo: "consejo", texto: l.slice(2) }); continue; }

    const vineta = l.match(/^[-*] (.*)/);
    const numero = l.match(/^\d+\. (.*)/);
    if (vineta || numero) {
      const tipo = vineta ? "ul" : "ol";
      const item = (vineta ?? numero)[1];
      if (ultimo?.tipo === tipo) ultimo.items.push(item);
      else bloques.push({ tipo, items: [item] });
      continue;
    }

    if (ultimo?.tipo === "p") ultimo.texto += " " + l;
    else bloques.push({ tipo: "p", texto: l });
  }
  return bloques.filter((b) => b.tipo !== "vacio");
}

export function TextoConFormato({ texto }) {
  return (
    <div className="space-y-4 leading-relaxed text-gray-700">
      {leerBloques(texto ?? "").map((b, i) => {
        switch (b.tipo) {
          case "h2":
            return <h2 key={i} className="pt-4 text-2xl font-bold text-gray-900">{enLinea(b.texto)}</h2>;
          case "h3":
            return <h3 key={i} className="pt-2 text-lg font-semibold text-gray-900">{enLinea(b.texto)}</h3>;
          case "consejo":
            return (
              <p key={i} className="rounded-lg border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 text-emerald-900">
                💡 {enLinea(b.texto)}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="list-disc space-y-1.5 pl-6 marker:text-emerald-600">
                {b.items.map((item, j) => <li key={j}>{enLinea(item)}</li>)}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-emerald-700">
                {b.items.map((item, j) => <li key={j}>{enLinea(item)}</li>)}
              </ol>
            );
          default:
            return <p key={i}>{enLinea(b.texto)}</p>;
        }
      })}
    </div>
  );
}

// Minutos aproximados de lectura (200 palabras por minuto)
export function minutosLectura(texto) {
  const palabras = (texto ?? "").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(palabras / 200));
}
