const BASE_SCRIPT_URL = (() => {
    const scriptUrl = document.currentScript?.src || document.baseURI;
    return new URL(".", scriptUrl);
})();

const NUMERO_CAJA = Number(
    new URLSearchParams(window.location.search).get("caja")
);

const ES_HOJA_CAJA = [1, 2, 3, 4].includes(NUMERO_CAJA);

const STORAGE_KEY = ES_HOJA_CAJA
    ? `pacha_control_caja_v3_caja_${NUMERO_CAJA}`
    : "pacha_control_caja_v2";
const CONSUMOS_STORAGE_KEY = "pacha_control_caja4_consumos_v1";
let registroCajaDanado = false;
let consumosCaja4Danados = false;
let avisoAlmacenamientoMostrado = false;

const productos = [
  { id: "fernet_branca", nombre: "Fernet Branca", precio: 380 },
  { id: "casa_real", nombre: "Casa Real", precio: 300 },
  { id: "don_lucho", nombre: "Don Lucho", precio: 400 },
  { id: "jager", nombre: "Jager", precio: 500 },
  { id: "gin_amazonico", nombre: "Gin Amazónico", precio: 380 },
  { id: "gin_frutilla", nombre: "Gin Frutilla", precio: 400 },
  { id: "gin_frutos_del_bosque", nombre: "Gin Frutos del Bosque", precio: 400 },
  { id: "gin_beefeater_pink", nombre: "Gin Beefeater Pink", precio: 550 },
  { id: "gin_andino", nombre: "Gin Andino", precio: 380 },
  { id: "vodka", nombre: "Vodka", precio: 380 },
  { id: "corona", nombre: "Corona", precio: 30 },
  { id: "huari", nombre: "Huari", precio: 30 },
  { id: "coca_cola_2l", nombre: "Coca-Cola 2L", precio: 30 },
  { id: "sprite_2l", nombre: "Sprite 2L", precio: 30 },
  { id: "schweppes", nombre: "Schweppes 1,5L", precio: 30 },
  { id: "schweppes_990ml", nombre: "Schweppes 990ml", precio: 15 },
  { id: "agua_tonica", nombre: "Agua Tónica", precio: 30 },
  { id: "agua_con_gas", nombre: "Agua con Gas", precio: 30 },
  { id: "red_bull", nombre: "Red Bull", precio: 35 },
  { id: "agua_pequena", nombre: "Agua Pequeña", precio: 15 },
  { id: "agua_2l", nombre: "Agua 2L", precio: 20 },
  { id: "wiston_grande", nombre: "Wiston Grande", precio: 50 },
  { id: "wiston_pequeno", nombre: "Wiston Pequeño", precio: 30 },
  { id: "encendedor", nombre: "Encendedor", precio: 5 },
  { id: "havana_especial", nombre: "Havana Especial", precio: 300 },
  { id: "havana_club_7_anos", nombre: "Havana Club 7 Años", precio: 400 },
  { id: "golden", nombre: "Golden", precio: 20 },
  { id: "pacenita", nombre: "Paceñita", precio: 20 },
  { id: "olmeca_chocolate", nombre: "Olmeca Chocolate", precio: 400 },
  { id: "olmeca_reposado", nombre: "Olmeca Reposado", precio: 450 },
  { id: "johnnie_walker_red_label", nombre: "Johnnie Walker Red Label", precio: 550 },
  { id: "johnnie_walker_black_label", nombre: "Johnnie Walker Black Label", precio: 750 },
  { id: "johnnie_walker_double_black", nombre: "Johnnie Walker Double Black", precio: 900 },
  { id: "johnnie_walker_blue_label", nombre: "Johnnie Walker Blue Label", precio: 4600 }
];

const ventasDirectas = [
  { id: "shots", nombre: "Shots", precio: 30 },
  { id: "jager_boom", nombre: "Gravity Bomb", precio: 60 },
  { id: "clasicos", nombre: "Clásicos", precio: 50 },
  { id: "pink_orbit", nombre: "Pink Orbit", precio: 60 },
  { id: "yarda_singanera", nombre: "Yarda Singanera", precio: 50 },
  { id: "yarda_XL", nombre: "Yarda XL", precio: 180 }
];

const combos = [
  { id: "combo_fernet_branca", nombre: "Combo Fernet Branca", base: "fernet_branca", mix: "coca_cola_2l", precio: 380 },
  { id: "combo_casa_real", nombre: "Combo Casa Real", base: "casa_real", mix: "sprite_2l", precio: 300, requiereMix: true },
  { id: "combo_don_lucho", nombre: "Combo Don Lucho", base: "don_lucho", mix: "sprite_2l", precio: 400, requiereMix: true },
  { id: "combo_vodka", nombre: "Combo Vodka", base: "vodka", mix: "sprite_2l", precio: 380 },
  { id: "combo_havana_especial", nombre: "Combo Havana Especial", base: "havana_especial", mix: "coca_cola_2l", precio: 300 },
  { id: "combo_havana_club_7_anos", nombre: "Combo Havana Club 7 Años", base: "havana_club_7_anos", mix: "coca_cola_2l", precio: 400 },
  { id: "combo_jager", nombre: "Combo Jager (+2 Red Bull)", base: "jager", mix: "red_bull", cantMix: 2, precio: 500 },
  { id: "combo_gin_amazonico", nombre: "Combo Gin Amazónico", base: "gin_amazonico", mix: "agua_tonica", cantMix: 1, precio: 380 },
  { id: "combo_gin_frutilla", nombre: "Combo Gin Frutilla", base: "gin_frutilla", mix: "agua_tonica", cantMix: 1, precio: 400 },
  { id: "combo_gin_frutos_del_bosque", nombre: "Combo Gin Frutos del Bosque", base: "gin_frutos_del_bosque", mix: "agua_tonica", cantMix: 1, precio: 400 },
  { id: "combo_gin_andino", nombre: "Combo Gin Andino", base: "gin_andino", mix: "agua_tonica", cantMix: 1, precio: 380 },
  { id: "combo_gin_beefeater_pink", nombre: "Combo Gin Beefeater Pink", base: "gin_beefeater_pink", mix: "agua_tonica", cantMix: 1, precio: 550 },
  { id: "combo_johnnie_walker_red_label", nombre: "Combo Johnnie Walker Red Label", base: "johnnie_walker_red_label", mix: "agua_2l", precio: 550 },
  { id: "combo_johnnie_walker_black_label", nombre: "Combo Johnnie Walker Black Label", base: "johnnie_walker_black_label", mix: "agua_2l", precio: 750 },
  { id: "combo_johnnie_walker_double_black", nombre: "Combo Johnnie Walker Double Black", base: "johnnie_walker_double_black", mix: "agua_2l", precio: 900 },
  { id: "combo_johnnie_walker_blue_label", nombre: "Combo Johnnie Walker Blue Label", base: "johnnie_walker_blue_label", mix: "agua_2l", precio: 4600 }
];
function mostrarNotificacion(mensaje, tipo="ok") {
  const noti = document.getElementById("notificacion");
  if (!noti) return;

  // Cambia el color según el tipo
  if(tipo === "ok") noti.style.backgroundColor = "#4CAF50"; // verde
  else if(tipo === "faltante") noti.style.backgroundColor = "#f44336"; // rojo
  else if(tipo === "sobrante") noti.style.backgroundColor = "#ff9800"; // naranja
  else noti.style.backgroundColor = "#2196F3"; // azul por defecto

  noti.innerText = mensaje;
  noti.style.display = "block";

  // Ocultar después de 4 segundos
  setTimeout(() => {
      noti.style.display = "none";
  }, 4000);
}

function numeroSeguro(valor) {
  const numero = Number(valor);
  return Number.isFinite(numero) ? numero : 0;
}

function inicializar() {
  const tbodyInv = document.getElementById('tabla-body');
  if(tbodyInv) {
      tbodyInv.innerHTML = productos.map(p => `<tr id="row-${p.id}">
              <td class="prod-col">${p.nombre}</td>
              <td><div class="multi-cont">${Array(5).fill(0).map(() => `<input type="number" class="input-entrega" oninput="manejarInput()">`).join('')}</div></td>
              <td class="td-dev"><input type="number" class="input-dev" oninput="manejarInput()"></td>
              <td class="td-uti" id="uti-${p.id}"></td>
          </tr>`).join("");
  }


  const tbodyVentas = document.getElementById('ventas-directas-body');
  if(tbodyVentas) {
      tbodyVentas.innerHTML = ventasDirectas.map(v => `<tr>
              <td class="prod-col">${v.nombre}</td>
              <td style="width:50px; background:#f9f9f9;">${v.precio} Bs</td>
              <td><input type="number" class="input-venta" id="vd-${v.id}" oninput="manejarInputDirecta('${v.id}', ${v.precio})"></td>
              <td id="total-${v.id}" style="text-align:center; font-weight:bold;"></td>
          </tr>`).join("");
  }

  const tbodyRes = document.getElementById('resumen-body');
  if(tbodyRes) {
      const comboRows = combos.map(c => `<tr id="res-${c.id}"><td>${c.nombre}</td><td class="c-cant"></td><td>${c.precio}</td><td class="c-sub"></td></tr>`).join("");
      const idsBasesCombos = combos.flatMap(c => Array.isArray(c.base) ? c.base : [c.base]);
      const productRows = productos
          .filter(p => !idsBasesCombos.includes(p.id))
          .map(p => `<tr id="res-s-${p.id}"><td>${p.nombre}</td><td class="c-cant"></td><td>${p.precio}</td><td class="c-sub"></td></tr>`)
          .join("");
      tbodyRes.innerHTML = comboRows + productRows;
  }

  cargarDatos();
}

function manejarInputDirecta(id, precio) {
  const input = document.getElementById("vd-" + id);
  if(!input) return;

  const cantidad = Number(input.value) || 0;
  const total = cantidad * precio;
  const totalTd = document.getElementById("total-" + id);
  if(totalTd) totalTd.innerText = total ? total + " Bs" : "";

  const venta = ventasDirectas.find(v => v.id === id);
  if (venta && venta.mix) {
      const row = document.getElementById("row-" + venta.mix);
      if(row){
          const inputs = row.querySelectorAll('.input-entrega');
          let actual = Number(inputs[0].value) || 0;
          inputs[0].value = Math.max(0, actual - (cantidad * (venta.cantMix || 1)));
      }
  }
  calcular();
  guardarDatos();
}

function manejarInput() { calcular(); guardarDatos(); }

function calcular() {
  let utiReal = {}; let total = 0;
  productos.forEach(p => {
      const row = document.getElementById("row-" + p.id);
      if(!row) return;
       let ent = 0; row.querySelectorAll('.input-entrega').forEach(i => { if(i.value!="") ent+=numeroSeguro(i.value); });
       let dev = numeroSeguro(row.querySelector('.input-dev').value);
      utiReal[p.id] = Math.max(0, ent - dev);
      const utiTd = document.getElementById("uti-"+p.id);
      if(utiTd) utiTd.innerText = (ent===0 && row.querySelector('.input-dev').value==="") ? "" : utiReal[p.id];
  });

  let copia = {...utiReal};

  combos.forEach(c => {
      let n = 0;
      if(Array.isArray(c.base)) { c.base.forEach(b => { n+=copia[b]||0; copia[b]=0; }); }
      else { n=copia[c.base] || 0; copia[c.base]=0; }
      if(n>0){
          let mixUsado = n * (c.cantMix||1);
          if(copia[c.mix] !== undefined) copia[c.mix] = Math.max(0, copia[c.mix] - mixUsado);
      }
      const tr = document.getElementById("res-"+c.id);
      if(tr){
          tr.querySelector('.c-cant').innerText = n||"";
          tr.querySelector('.c-sub').innerText = n?(n*c.precio):"";
      }
      total += (n*c.precio);
  });

  const idsBasesCombos = combos.flatMap(c => Array.isArray(c.base) ? c.base : [c.base]);
  productos.forEach(p => {
      if (!idsBasesCombos.includes(p.id)){
          const tr = document.getElementById("res-s-"+p.id);
          if(!tr) return;
          let s = copia[p.id] || 0;
          tr.querySelector('.c-cant').innerText = s||"";
          tr.querySelector('.c-sub').innerText = s?(s*p.precio):"";
          total += s*p.precio;
      }
  });

  ventasDirectas.forEach(v => {
      const input = document.getElementById("vd-"+v.id);
      if(!input) return;
      let cant = Number(input.value) || 0;
      total += (cant * v.precio);
  });

  const descuentoInput = document.getElementById('descuento');
  const descuento = descuentoInput ? numeroSeguro(descuentoInput.value) : 0;
  const totalCaja = Math.max(0, total - descuento);

  const granTotal = document.getElementById('gran-total');
  if(granTotal) granTotal.innerText = totalCaja > 0 ? totalCaja + " " : "";
  mostrarEstadoCaja({notificar: false});
}

function guardarDatos() {
  if (registroCajaDanado) return;

  const cajeroInput = document.getElementById('cajero');
  const barraInput = document.getElementById('barra');
  const fechaInput = document.getElementById('fecha');
  const descuentoInput = document.getElementById('descuento');
  const plataRealInput = document.getElementById('plata-real');

  const data = {
      header: {
          cajero: cajeroInput?.value || "",
          barra: barraInput?.value || "",
          fecha: fechaInput?.value || ""
      },
      suministros: {},
      ventasDirectas: {},
      caja: {
          descuento: descuentoInput?.value || "",
          plataReal: plataRealInput?.value || ""
      }
  };

  productos.forEach(p => {
      const row = document.getElementById("row-" + p.id);
      if(!row) return;
      data.suministros[p.id] = {
          entregas: Array.from(row.querySelectorAll('.input-entrega')).map(i => i.value),
          devolucion: row.querySelector('.input-dev').value
      };
  });

  ventasDirectas.forEach(v => {
      const input = document.getElementById("vd-"+v.id);
      if(input) data.ventasDirectas[v.id] = input.value;
  });

  try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      const estado = document.getElementById("estado-guardado");
      if (estado) {
          estado.textContent = "Cambios guardados automáticamente";
          estado.classList.remove("error");
      }
      avisoAlmacenamientoMostrado = false;
  } catch (error) {
      console.error("No se pudieron guardar los datos de esta caja:", error);
      const estado = document.getElementById("estado-guardado");
      if (estado) {
          estado.textContent = "No se pudo guardar. Revisa el almacenamiento del navegador.";
          estado.classList.add("error");
      }
      if (!avisoAlmacenamientoMostrado) {
          mostrarNotificacion("No se pudieron guardar los cambios en este dispositivo.", "faltante");
          avisoAlmacenamientoMostrado = true;
      }
  }
}

function cargarDatos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  let data;
  try {
      data = JSON.parse(stored);
  } catch {
      const claveRespaldo = `${STORAGE_KEY}_respaldo_${Date.now()}`;
      try {
          localStorage.setItem(claveRespaldo, stored);
      } catch (error) {
          console.error("No se pudo respaldar el registro dañado:", error);
      }
      registroCajaDanado = true;
      mostrarNotificacion(
          "No se pudo leer el registro. Se conservó; usa Limpiar solo si deseas borrarlo.",
          "faltante"
      );
      return;
  }

  const header = data && typeof data.header === "object" ? data.header : {};
  const suministros = data && typeof data.suministros === "object" ? data.suministros : {};
  const ventasGuardadas = data && typeof data.ventasDirectas === "object" ? data.ventasDirectas : {};
  const caja = data && typeof data.caja === "object" ? data.caja : {};

  const cajeroInput = document.getElementById('cajero');
  if(cajeroInput) cajeroInput.value = header.cajero || "";
  const barraInput = document.getElementById('barra');
  if(barraInput) barraInput.value = header.barra || "";
  const fechaInput = document.getElementById('fecha');
  if(fechaInput) fechaInput.value = header.fecha || "";

  productos.forEach(p => {
      const row = document.getElementById("row-" + p.id);
      if(!row) return;
      if (suministros[p.id]) {
          const inputs = row.querySelectorAll('.input-entrega');
          const entregas = Array.isArray(suministros[p.id].entregas) ? suministros[p.id].entregas : [];
          entregas.forEach((v, i) => { if(inputs[i]) inputs[i].value = v; });
          const devInput = row.querySelector('.input-dev');
          if(devInput) devInput.value = suministros[p.id].devolucion || "";
      }
  });

  ventasDirectas.forEach(v => {
      const input = document.getElementById("vd-"+v.id);
      if(input && ventasGuardadas[v.id] !== undefined) {
          input.value = ventasGuardadas[v.id];

          // 👇 recalcular total visual
          const cantidad = Number(input.value) || 0;
          const totalTd = document.getElementById("total-" + v.id);
          if(totalTd && cantidad > 0) {
              totalTd.innerText = (cantidad * v.precio) + " Bs";
          }
      }
  });

  const descuentoInput = document.getElementById('descuento');
  if(descuentoInput && caja.descuento !== undefined)
      descuentoInput.value = caja.descuento;

  const plataRealInput = document.getElementById('plata-real');
  if(plataRealInput && caja.plataReal !== undefined)
      plataRealInput.value = caja.plataReal;

  // ACTUALIZA TOTALES
  calcular();

}
function borrarTodo() {
  // Limpiar todos los inputs
  document.querySelectorAll('input').forEach(input => input.value = '');

  // Limpiar celdas de resultados
  document.querySelectorAll('.td-uti, .c-cant, .c-sub, #gran-total, #estado-caja, [id^="total-"]').forEach(td => td.innerText = '');

  // Limpiar localStorage
  localStorage.removeItem(STORAGE_KEY);
  registroCajaDanado = false;
  calcular();
  const estado = document.getElementById("estado-guardado");
  if (estado) {
      estado.textContent = "Hoja limpia. Los cambios se guardarán automáticamente.";
      estado.classList.remove("error");
  }
  mostrarNotificacion("Control de caja limpiado.", "info");
}

function dibujarCeldaPDF(pdf, x, y, ancho, alto, texto, opciones = {}) {
  const {
      fondo = [255, 255, 255],
      color = [20, 20, 20],
      tamano = 7,
      negrita = false,
      alineacion = "center"
  } = opciones;

  pdf.setFillColor(...fondo);
  pdf.setDrawColor(20, 20, 20);
  pdf.setLineWidth(0.35);
  pdf.rect(x, y, ancho, alto, "FD");

  const contenido = String(texto ?? "").replace(/\s+/g, " ").trim();
  if (!contenido) return;

  pdf.setFont("helvetica", negrita ? "bold" : "normal");
  let tamanoAjustado = tamano;
  pdf.setFontSize(tamanoAjustado);
  while (
      pdf.getTextWidth(contenido) > ancho - 6 &&
      tamanoAjustado > 4.5
  ) {
      tamanoAjustado = Math.max(4.5, tamanoAjustado - 0.25);
      pdf.setFontSize(tamanoAjustado);
  }
  pdf.setTextColor(...color);
  pdf.text(
      contenido,
      alineacion === "left" ? x + 3 : alineacion === "right" ? x + ancho - 3 : x + ancho / 2,
      y + alto / 2 + tamanoAjustado * 0.34,
      {
          align: alineacion,
          maxWidth: ancho - 6
      }
  );
}

async function descargarPDF() {
  const element = document.getElementById('documento');
  if (!element) return;
  const JsPDF = window.jspdf?.jsPDF;
  if (typeof JsPDF !== "function") {
      mostrarNotificacion("No cargó el generador PDF. Revisa la conexión e inténtalo de nuevo.", "faltante");
      return;
  }

  // Tomar valores tal cual los escribió el usuario (aunque estén vacíos o incompletos)
  const barra = document.getElementById('barra')?.value.trim() || "";
  const fecha = document.getElementById('fecha')?.value.trim() || "";

  // Limpiar caracteres no válidos para nombre de archivo
  const limpiar = (txt) =>
      txt
          .replace(/\s+/g, "_")
          .replace(/[\/\\:*?"<>|]/g, "");

  // Armar nombre con lo que haya — si algo está vacío, simplemente no aparece
  const partes = ["caja", limpiar(barra), limpiar(fecha)].filter(Boolean);
  const nombreArchivo = partes.join("_") + ".pdf";

  try {
      const pdf = new JsPDF({
          orientation: "portrait",
          unit: "pt",
          format: "letter",
          compress: true
      });
      const anchoPagina = pdf.internal.pageSize.getWidth();
      const altoPagina = pdf.internal.pageSize.getHeight();
      const margen = 18;
      const anchoContenido = anchoPagina - margen * 2;
      const separacion = 12;
      const anchoIzquierdo = 268;
      const anchoDerecho = anchoContenido - anchoIzquierdo - separacion;
      const inicioY = 68;
      const altoCabecera = 18;
      const altoPie = 18;
      const espacioEntreTablas = 8;
      const filasInventario = Array.from(
          document.querySelectorAll("#tabla-body > tr")
      );
      const filasVentas = Array.from(
          document.querySelectorAll("#ventas-directas-body > tr")
      );
      const filasResumen = Array.from(
          document.querySelectorAll("#resumen-body > tr")
      );
      const filasTotales = Array.from(
          document.querySelectorAll(".res-table tfoot > tr")
      );
      const altoDisponibleIzquierda =
          altoPagina - margen - inicioY -
          altoCabecera * 2 - espacioEntreTablas;
      const altoDisponibleDerecha =
          altoPagina - margen - inicioY -
          altoCabecera - filasTotales.length * altoPie;
      const altoFila = Math.max(
          6,
          Math.min(
              15.5,
              altoDisponibleIzquierda /
                  Math.max(1, filasInventario.length + filasVentas.length),
              altoDisponibleDerecha / Math.max(1, filasResumen.length)
          )
      );
      const tamanoTexto = Math.min(8, Math.max(6.5, altoFila - 5));
      const tamanoCabecera = 7.5;
      const xIzquierda = margen;
      const xDerecha = margen + anchoIzquierdo + separacion;
      const normalizar = elemento =>
          String(elemento?.textContent || "").replace(/\s+/g, " ").trim();

      pdf.setProperties({
          title: "Control de Caja - Mamá Potosí",
          author: "Mamá Potosí",
          creator: "Control de cajas y suministros"
      });

      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(15);
      pdf.setTextColor(15, 15, 15);
      pdf.text("MAMA POTOSI", anchoPagina / 2, 23, { align: "center" });
      pdf.setFontSize(8);
      pdf.text(
          "CONTROL DE CAJA Y SUMINISTROS",
          anchoPagina / 2,
          35,
          { align: "center" }
      );

      const dibujarCampo = (etiqueta, valor, x, ancho) => {
          pdf.setFont("helvetica", "bold");
          pdf.setFontSize(9.5);
          pdf.setTextColor(15, 15, 15);
          pdf.text(etiqueta, x, 55);
          const inicioValor = x + pdf.getTextWidth(etiqueta) + 5;
          pdf.setFont("helvetica", "bold");
          const textoValor = String(valor || "");
          if (textoValor) {
              const anchoValor = Math.max(10, x + ancho - inicioValor);
              let tamanoValor = 11;
              pdf.setFontSize(tamanoValor);
              while (pdf.getTextWidth(textoValor) > anchoValor && tamanoValor > 9) {
                  tamanoValor = Math.max(9, tamanoValor - 0.25);
                  pdf.setFontSize(tamanoValor);
              }
              pdf.text(textoValor, inicioValor, 55, { maxWidth: anchoValor });
          }
          pdf.setDrawColor(20, 20, 20);
          pdf.setLineWidth(0.5);
          pdf.line(inicioValor, 60, x + ancho, 60);
      };

      dibujarCampo(
          "CAJERO:",
          document.getElementById("cajero")?.value,
          margen + 6,
          170
      );
      dibujarCampo(
          "BARRA:",
          document.getElementById("barra")?.value,
          margen + 193,
          170
      );
      dibujarCampo(
          "FECHA:",
          document.getElementById("fecha")?.value,
          margen + 380,
          190
      );

      const inventarioAnchos = [108, 22, 22, 22, 22, 22, 25, 25];
      let inventarioX = xIzquierda;
      dibujarCeldaPDF(
          pdf, inventarioX, inicioY, inventarioAnchos[0], altoCabecera,
          "PRODUCTO", { fondo: [235, 235, 235], tamano: tamanoCabecera, negrita: true }
      );
      inventarioX += inventarioAnchos[0];
      dibujarCeldaPDF(
          pdf, inventarioX, inicioY,
          inventarioAnchos.slice(1, 6).reduce((a, b) => a + b, 0),
          altoCabecera, "ENTREGAS",
          { fondo: [235, 235, 235], tamano: tamanoCabecera, negrita: true }
      );
      inventarioX += inventarioAnchos.slice(1, 6).reduce((a, b) => a + b, 0);
      dibujarCeldaPDF(
          pdf, inventarioX, inicioY, inventarioAnchos[6], altoCabecera,
          "DEV.", { fondo: [235, 235, 235], tamano: tamanoCabecera, negrita: true }
      );
      inventarioX += inventarioAnchos[6];
      dibujarCeldaPDF(
          pdf, inventarioX, inicioY, inventarioAnchos[7], altoCabecera,
          "UTI.", { fondo: [235, 235, 235], tamano: tamanoCabecera, negrita: true }
      );

      filasInventario.forEach((fila, indice) => {
          const y = inicioY + altoCabecera + indice * altoFila;
          const valores = [
              normalizar(fila.querySelector(".prod-col")),
              ...Array.from(fila.querySelectorAll(".input-entrega"))
                  .map(input => input.value),
              fila.querySelector(".input-dev")?.value || "",
              normalizar(fila.querySelector(".td-uti"))
          ];
          let x = xIzquierda;
          valores.forEach((valor, columna) => {
              dibujarCeldaPDF(
                  pdf, x, y, inventarioAnchos[columna], altoFila, valor,
                  {
                      tamano: tamanoTexto,
                      alineacion: columna === 0 ? "left" : "center"
                  }
              );
              x += inventarioAnchos[columna];
          });
      });

      const ventasY = inicioY + altoCabecera +
          filasInventario.length * altoFila + espacioEntreTablas;
      const ventasAnchos = [124, 42, 45, 57];
      let ventasX = xIzquierda;
      ["VENTAS DIRECTAS", "PRECIO", "CANT.", "TOTAL"].forEach((titulo, indice) => {
          dibujarCeldaPDF(
              pdf, ventasX, ventasY, ventasAnchos[indice], altoCabecera,
              titulo,
              { fondo: [235, 235, 235], tamano: tamanoCabecera, negrita: true }
          );
          ventasX += ventasAnchos[indice];
      });
      filasVentas.forEach((fila, indice) => {
          const celdas = fila.querySelectorAll("td");
          const y = ventasY + altoCabecera + indice * altoFila;
          const valores = [
              normalizar(celdas[0]),
              normalizar(celdas[1]),
              fila.querySelector("input")?.value || "",
              normalizar(celdas[3])
          ];
          let x = xIzquierda;
          valores.forEach((valor, columna) => {
              dibujarCeldaPDF(
                  pdf, x, y, ventasAnchos[columna], altoFila, valor,
                  { tamano: tamanoTexto, alineacion: columna === 0 ? "left" : "center" }
              );
              x += ventasAnchos[columna];
          });
      });

      const resumenAnchos = [148, 44, 48, anchoDerecho - 240];
      let resumenX = xDerecha;
      ["DETALLE VENTAS (COMBOS Y OTROS)", "CANT.", "PRECIO", "SUBTOTAL"]
          .forEach((titulo, indice) => {
              dibujarCeldaPDF(
                  pdf, resumenX, inicioY, resumenAnchos[indice], altoCabecera,
                  titulo,
                  {
                      fondo: [235, 235, 235],
                      tamano: indice === 0 ? 6.5 : tamanoCabecera,
                      negrita: true
                  }
              );
              resumenX += resumenAnchos[indice];
          });

      filasResumen.forEach((fila, indice) => {
          const y = inicioY + altoCabecera + indice * altoFila;
          const valores = Array.from(fila.querySelectorAll("td"))
              .map(celda => normalizar(celda));
          let x = xDerecha;
          valores.forEach((valor, columna) => {
              dibujarCeldaPDF(
                  pdf, x, y, resumenAnchos[columna], altoFila, valor,
                  {
                      tamano: tamanoTexto,
                      alineacion: columna === 0 ? "left" : "center"
                  }
              );
              x += resumenAnchos[columna];
          });
      });

      const totalesY = inicioY + altoCabecera +
          filasResumen.length * altoFila;
      filasTotales.forEach((fila, indice) => {
          const y = totalesY + indice * altoPie;
          const etiqueta = normalizar(fila.querySelector(".total-etiqueta"));
          const entrada = fila.querySelector("input");
          const valor = entrada
              ? entrada.value
              : normalizar(fila.querySelector("#gran-total, #estado-caja"));
          const estadoNormalizado = valor.toUpperCase();
          const esEstado = indice === filasTotales.length - 1;
          const colorEstado = estadoNormalizado.includes("FALTANTE")
              ? { texto: [183, 28, 28], fondo: [255, 235, 238] }
              : estadoNormalizado.includes("SOBRANTE")
                  ? { texto: [173, 95, 0], fondo: [255, 243, 224] }
                  : estadoNormalizado.includes("CUADRA")
                      ? { texto: [27, 94, 32], fondo: [232, 245, 233] }
                      : { texto: [30, 30, 30], fondo: [245, 245, 245] };
          dibujarCeldaPDF(
              pdf, xDerecha, y,
              resumenAnchos[0] + resumenAnchos[1], altoPie, etiqueta,
              {
                  fondo: esEstado ? colorEstado.fondo : indice === 2 ? [235, 235, 235] : [255, 253, 231],
                  tamano: esEstado ? 10.5 : 10,
                  negrita: true,
                  alineacion: "right"
              }
          );
          dibujarCeldaPDF(
              pdf,
              xDerecha + resumenAnchos[0] + resumenAnchos[1],
              y,
              resumenAnchos[2] + resumenAnchos[3],
              altoPie,
              valor.replace(/✔/g, "OK"),
              {
                  fondo: esEstado ? colorEstado.fondo : indice === 2 ? [245, 245, 245] : [255, 253, 231],
                  color: esEstado ? colorEstado.texto : [20, 20, 20],
                  tamano: esEstado || indice === 2 ? 11.5 : 10.5,
                  negrita: true
              }
          );
      });

      pdf.save(nombreArchivo);
  } catch (error) {
      console.error("No se pudo generar el PDF de la caja:", error);
      mostrarNotificacion("No se pudo generar el PDF. Inténtalo nuevamente.", "faltante");
  }
}

function crearHojaConsumosCaja4() {
    const hoja = document.createElement("section");
    hoja.className = "hoja-consumos-caja4";
    hoja.id = "hoja-consumos-caja4";
    hoja.innerHTML = `
        <div class="encabezado-consumos">
            <div>
                <h2>CONSUMO DE BARTENDER Y MESAS</h2>
                <p>Ingresa la cantidad total utilizada de cada producto.</p>
            </div>
            <button class="btn-borrar-consumos" type="button" onclick="limpiarConsumosCaja4()">
                Limpiar
            </button>
        </div>
        <div class="tablas-consumos">
            ${crearTablaConsumos("bartender", "BARTENDER")}
            ${crearTablaConsumos("mesas", "MESAS")}
        </div>
        <p class="estado-consumos" id="estado-consumos" aria-live="polite">
            Las cantidades se guardan automáticamente en este dispositivo.
        </p>
    `;
    return hoja;
}

function crearTablaConsumos(tipo, titulo) {
    const filas = productos.map(producto => `
        <tr>
            <td class="consumo-producto">${producto.nombre}</td>
            <td>
                <input
                    type="number"
                    min="0"
                    step="1"
                    inputmode="numeric"
                    class="consumo-cantidad"
                    data-tipo="${tipo}"
                    data-producto="${producto.id}"
                    aria-label="Cantidad de ${producto.nombre} usada por ${titulo.toLowerCase()}"
                    oninput="manejarCambioConsumoCaja4(this)"
                >
            </td>
        </tr>
    `).join("");

    return `
        <div class="tabla-consumos-wrap">
            <h3>${titulo}</h3>
            <table class="tabla-consumos">
                <thead>
                    <tr>
                        <th>PRODUCTO</th>
                        <th>TOTAL</th>
                    </tr>
                </thead>
                <tbody>${filas}</tbody>
            </table>
        </div>
    `;
}

function guardarConsumosCaja4() {
    if (consumosCaja4Danados) return;
    const hoja = document.getElementById("hoja-consumos-caja4");
    if (!hoja) return;

    const datos = { bartender: {}, mesas: {} };
    hoja.querySelectorAll(".consumo-cantidad").forEach(input => {
        const tipo = input.dataset.tipo;
        const producto = input.dataset.producto;
        if (datos[tipo] && producto) datos[tipo][producto] = input.value;
    });

    try {
        localStorage.setItem(CONSUMOS_STORAGE_KEY, JSON.stringify(datos));
        const estado = document.getElementById("estado-consumos");
        if (estado) {
            estado.textContent = "Cambios guardados automáticamente.";
            estado.classList.remove("error");
        }
    } catch (error) {
        console.error("No se pudieron guardar los consumos de Caja 4:", error);
        const estado = document.getElementById("estado-consumos");
        if (estado) {
            estado.textContent = "No se pudo guardar. Revisa el almacenamiento del navegador.";
            estado.classList.add("error");
        }
    }
}

function cargarConsumosCaja4() {
    const almacenado = localStorage.getItem(CONSUMOS_STORAGE_KEY);
    if (!almacenado) return;

    let datos;
    try {
        datos = JSON.parse(almacenado);
    } catch (error) {
        console.error("No se pudieron leer los consumos de Caja 4:", error);
        consumosCaja4Danados = true;
        const estado = document.getElementById("estado-consumos");
        if (estado) {
            estado.textContent = "Registro ilegible conservado. Pulsa Limpiar solo si deseas borrarlo.";
            estado.classList.add("error");
        }
        return;
    }

    ["bartender", "mesas"].forEach(tipo => {
        const cantidades = datos?.[tipo] || {};
        Object.entries(cantidades).forEach(([producto, cantidad]) => {
            const input = document.querySelector(
                `.consumo-cantidad[data-tipo="${tipo}"][data-producto="${producto}"]`
            );
            if (input) input.value = cantidad;
        });
    });
}

function manejarCambioConsumoCaja4() {
    guardarConsumosCaja4();
}

function limpiarConsumosCaja4() {
    if (!window.confirm("¿Quieres borrar las cantidades de Bartender y Mesas?")) return;
    document.querySelectorAll(".consumo-cantidad").forEach(input => {
        input.value = "";
    });
    localStorage.removeItem(CONSUMOS_STORAGE_KEY);
    consumosCaja4Danados = false;
    const estado = document.getElementById("estado-consumos");
    if (estado) {
        estado.textContent = "Hoja limpia. Los cambios se guardarán automáticamente.";
        estado.classList.remove("error");
    }
}


async function cargarLogoPDF() {
    const nombres = [
        "350C8440-E7BF-457F-8DA3-CE39BB2AF3B6.PNG",
        "350C8440-E7BF-457F-8DA3-CE39BB2AF3B6.png",
        "350c8440-e7bf-457f-8da3-ce39bb2af3b6.png"
    ];
    const carpetas = [
        "",
        "public/",
        "client/",
        "client/public/",
        "assets/",
        "images/"
    ];
    const bases = [...new Set([
        BASE_SCRIPT_URL.href,
        new URL(".", document.baseURI).href
    ])];
    const rutas = bases.flatMap(base =>
        carpetas.flatMap(carpeta =>
            nombres.map(nombre => new URL(carpeta + nombre, base).href)
        )
    );
    const errores = [];

    for (const ruta of [...new Set(rutas)]) {
        try {
            const respuesta = await fetch(ruta, { cache: "no-cache" });
            if (!respuesta.ok) {
                errores.push(`${ruta}: ${respuesta.status}`);
                continue;
            }

            const archivo = await respuesta.blob();
            const encabezado = new Uint8Array(
                await archivo.slice(0, 8).arrayBuffer()
            );
            const firmaPNG = [137, 80, 78, 71, 13, 10, 26, 10];
            if (!firmaPNG.every((byte, indice) => encabezado[indice] === byte)) {
                errores.push(`${ruta}: el archivo no es un PNG válido`);
                continue;
            }

            return await new Promise((resolve, reject) => {
                const lector = new FileReader();
                lector.onload = () => resolve(lector.result);
                lector.onerror = () =>
                    reject(new Error("No se pudo leer el logo de Mamá Potosí."));
                lector.readAsDataURL(archivo);
            });
        } catch (error) {
            errores.push(`${ruta}: ${error.message || "error de lectura"}`);
        }
    }

    console.error("No se encontró el logo en las rutas probadas:", errores);
    throw new Error("No se encontró el archivo del logo de Mamá Potosí.");
}

async function descargarPDFUtilizados() {
    const JsPDF = window.jspdf?.jsPDF;
    if (typeof JsPDF !== "function") {
        alert("No se pudo cargar el generador de PDF. Revisa tu conexión e inténtalo de nuevo.");
        return;
    }

    let consumosGuardados = { bartender: {}, mesas: {} };
    const consumoAlmacenado = localStorage.getItem(CONSUMOS_STORAGE_KEY);
    if (consumoAlmacenado) {
        try {
            const leido = JSON.parse(consumoAlmacenado);
            consumosGuardados = {
                bartender: leido?.bartender || {},
                mesas: leido?.mesas || {}
            };
        } catch (error) {
            console.error("El registro de consumos no se pudo leer:", error);
            alert("El registro de consumos no se pudo leer. Se conservó sin cambios y no se generó un PDF incompleto.");
            return;
        }
    }

    const cajas = [];

    for (let numero = 1; numero <= 4; numero++) {
        const guardado = localStorage.getItem(
            `pacha_control_caja_v3_caja_${numero}`
        );
        if (!guardado) continue;

        let datos;
        try {
            datos = JSON.parse(guardado);
        } catch (error) {
            console.error(`El registro de Caja ${numero} no se pudo leer:`, error);
            alert(`El registro de Caja ${numero} no se pudo leer. Se conservó sin cambios y no se generó un PDF incompleto.`);
            return;
        }

        const suministros = datos?.suministros || {};
        const utilizados = {};
        let tieneActividad = false;

        productos.forEach(producto => {
            const registro = suministros[producto.id] || {};
            const entregas = Array.isArray(registro.entregas)
                ? registro.entregas
                : [];
            if (
                entregas.some(valor => String(valor).trim() !== "") ||
                String(registro.devolucion ?? "").trim() !== ""
            ) {
                tieneActividad = true;
            }

            const cantidadEntregada = entregas.reduce(
                (suma, valor) => suma + numeroSeguro(valor),
                0
            );
            utilizados[producto.id] = Math.max(
                0,
                cantidadEntregada - numeroSeguro(registro.devolucion)
            );
        });

        if (tieneActividad) {
            cajas.push({
                fecha: String(datos.header?.fecha || "").trim(),
                utilizados
            });
        }
    }

    const cantidadDeConsumo = (tipo, id) =>
        Math.max(0, numeroSeguro(consumosGuardados?.[tipo]?.[id]));
    const tieneConsumosExtra = productos.some(producto =>
        cantidadDeConsumo("bartender", producto.id) > 0 ||
        cantidadDeConsumo("mesas", producto.id) > 0
    );

    if (!cajas.length && !tieneConsumosExtra) {
        alert("Todavía no hay cantidades registradas para generar el PDF.");
        return;
    }

    const fechas = [...new Set(
        cajas.map(caja => caja.fecha).filter(Boolean)
    )];
    if (fechas.length > 1) {
        alert(
            "Las cajas tienen fechas diferentes: " +
            fechas.join(", ") +
            ". Corrige las fechas antes de generar el reporte."
        );
        return;
    }

    const ahora = new Date();
    const fecha = fechas[0] || ahora.toLocaleDateString("es-BO");
    const hora = ahora.toLocaleTimeString("es-BO", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
    const dosDigitos = valor => String(valor).padStart(2, "0");
    const selloFecha = [
        ahora.getFullYear(),
        dosDigitos(ahora.getMonth() + 1),
        dosDigitos(ahora.getDate())
    ].join("");
    const selloHora = [
        dosDigitos(ahora.getHours()),
        dosDigitos(ahora.getMinutes()),
        dosDigitos(ahora.getSeconds())
    ].join("");
    const codigoReferencia = Math.random()
        .toString(36)
        .slice(2, 7)
        .toUpperCase()
        .padEnd(5, "0");
    const referencia = `REF-${selloFecha}-${selloHora}-${codigoReferencia}`;
    const fechaArchivo = fecha
        .replace(/[\/\\:*?"<>|]/g, "-")
        .replace(/\s+/g, "_");
    const nombreArchivo = `MAMA_POTOSI_UTILIZADOS_${fechaArchivo}_${referencia}.pdf`;

    try {
        const logo = await cargarLogoPDF();
        const pdf = new JsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
            compress: true
        });
        const anchoPagina = pdf.internal.pageSize.getWidth();
        const altoPagina = pdf.internal.pageSize.getHeight();
        const margen = 12;
        const anchoTabla = anchoPagina - margen * 2;
        const anchoProducto = 134;
        const anchoTotal = anchoTabla - anchoProducto;
        const tablaY = 46;
        const altoEncabezado = 12;
        const altoFila = 12;
        const altoFilaTotal = 12;
        const filasPorPagina = 17;
        const paginas = Math.ceil(productos.length / filasPorPagina);
        const totalUtilizado = productos.reduce((total, producto) => {
            const porCajas = cajas.reduce(
                (suma, caja) => suma + numeroSeguro(caja.utilizados[producto.id]),
                0
            );
            return total +
                porCajas +
                cantidadDeConsumo("bartender", producto.id) +
                cantidadDeConsumo("mesas", producto.id);
        }, 0);

        pdf.setProperties({
            title: "Mamá Potosí - Uso total",
            subject: `Uso total del ${fecha}`,
            author: "Mamá Potosí",
            creator: "Control de cajas y suministros"
        });

        for (let numeroPagina = 0; numeroPagina < paginas; numeroPagina++) {
            if (numeroPagina > 0) pdf.addPage("a4", "portrait");

            pdf.setTextColor(30, 35, 40);
            pdf.addImage(logo, "PNG", 6, 4, 29, 29);
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(16);
            pdf.text("MAMÁ POTOSÍ", 39, 16.5);
            pdf.setFontSize(8.5);
            pdf.text("USO TOTAL", 39, 27);

            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(7.5);
            pdf.text(`FECHA: ${fecha}`, anchoPagina - margen, 15.5, {
                align: "right"
            });
            pdf.text(`HORA: ${hora}`, anchoPagina - margen, 22, {
                align: "right"
            });
            pdf.setFontSize(6.8);
            pdf.text(`REFERENCIA: ${referencia}`, anchoPagina - margen, 28.5, {
                align: "right"
            });

            pdf.setFillColor(0, 0, 0);
            pdf.rect(margen, tablaY, anchoTabla, altoEncabezado, "F");
            pdf.setFont("helvetica", "bold");
            pdf.setFontSize(9);
            pdf.setTextColor(255, 255, 255);
            pdf.text(
                "PRODUCTO",
                margen + anchoProducto / 2,
                tablaY + 7.5,
                { align: "center" }
            );
            pdf.text(
                "TOTAL",
                margen + anchoProducto + anchoTotal / 2,
                tablaY + 7.5,
                { align: "center" }
            );

            const inicio = numeroPagina * filasPorPagina;
            const fin = Math.min(inicio + filasPorPagina, productos.length);
            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(9);

            for (let indice = inicio; indice < fin; indice++) {
                const producto = productos[indice];
                const filaEnPagina = indice - inicio;
                const y = tablaY + altoEncabezado + filaEnPagina * altoFila;
                const porCajas = cajas.reduce(
                    (suma, caja) => suma + numeroSeguro(caja.utilizados[producto.id]),
                    0
                );
                const total = porCajas +
                    cantidadDeConsumo("bartender", producto.id) +
                    cantidadDeConsumo("mesas", producto.id);

                pdf.setFillColor(
                    ...(filaEnPagina % 2 === 0 ? [255, 255, 255] : [235, 235, 235])
                );
                pdf.rect(margen, y, anchoTabla, altoFila, "F");
                pdf.setTextColor(40, 40, 40);
                pdf.text(
                    producto.nombre,
                    margen + anchoProducto / 2,
                    y + 7.6,
                    { align: "center", maxWidth: anchoProducto - 6 }
                );
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(10);
                pdf.text(
                    String(total),
                    margen + anchoProducto + anchoTotal / 2,
                    y + 7.6,
                    { align: "center" }
                );
                pdf.setFont("helvetica", "normal");
                pdf.setFontSize(9);
            }

            if (numeroPagina === paginas - 1) {
                const filasEnPagina = fin - inicio;
                const totalY = tablaY + altoEncabezado + filasEnPagina * altoFila;
                pdf.setFillColor(225, 225, 225);
                pdf.rect(margen, totalY, anchoTabla, altoFilaTotal, "F");
                pdf.setFont("helvetica", "bold");
                pdf.setFontSize(9);
                pdf.setTextColor(35, 35, 35);
                pdf.text(
                    "TOTAL GENERAL",
                    margen + anchoProducto / 2,
                    totalY + 7.6,
                    { align: "center" }
                );
                pdf.setFontSize(10);
                pdf.text(
                    String(totalUtilizado),
                    margen + anchoProducto + anchoTotal / 2,
                    totalY + 7.6,
                    { align: "center" }
                );
            }

            pdf.setFont("helvetica", "normal");
            pdf.setFontSize(7);
            pdf.setTextColor(120, 120, 120);
            pdf.text(`REFERENCIA: ${referencia}`, margen, altoPagina - 10);
            pdf.text(
                `PÁGINA ${numeroPagina + 1} DE ${paginas}`,
                anchoPagina - margen,
                altoPagina - 10,
                { align: "right" }
            );
        }

        pdf.save(nombreArchivo);
    } catch (error) {
        console.error("No se pudo generar el PDF de utilizados:", error);
        if (error instanceof Error && error.message.includes("No se encontró el archivo del logo")) {
            alert(
                "No se encontró el logo del PDF. Publica el archivo 350C8440-E7BF-457F-8DA3-CE39BB2AF3B6.PNG junto a index.html o dentro de public/ y vuelve a cargar la página."
            );
        } else {
            alert("No se pudo generar el PDF. Recarga la página e inténtalo nuevamente.");
        }
    }
}


function mostrarEstadoCaja({notificar = true} = {}) {
  const plataRealInput = document.getElementById('plata-real');
  const granTotal = document.getElementById('gran-total');
  const estado = document.getElementById('estado-caja');
  const cajero = document.getElementById('cajero')?.value || "Cajero";

  if(!plataRealInput || !granTotal || !estado) return;

  if (plataRealInput.value.trim() === "") {
      estado.innerText = "";
      return;
  }

  const plataReal = numeroSeguro(plataRealInput.value);
  const totalCaja = numeroSeguro(granTotal.innerText);
  const dif = plataReal - totalCaja;
  const cuadra = Math.abs(dif) < 0.01;

  if (cuadra) {
      estado.innerHTML = "<span style='color:green'>CUADRA ✔</span>";
      if (notificar) mostrarNotificacion(`¡Felicidades ${cajero}! Cuadraste a la perfección.`, "ok");
  } else {
      if(dif > 0){
          estado.innerHTML = "<span style='color:orange'>SOBRANTE  (+" + dif + " Bs)</span>";
          if (notificar) mostrarNotificacion(`No es preocupante ${cajero}, tienes sobrante de ${dif} Bs.`, "sobrante");
      } else {
          estado.innerHTML = "<span style='color:red'>FALTANTE  (" + Math.abs(dif) + " Bs)</span>";
          if (notificar) mostrarNotificacion(`Qué mal ${cajero}, tienes un faltante de ${Math.abs(dif)} Bs.`, "faltante");
      }
  }
}

function iniciarSistema() {
    if (ES_HOJA_CAJA) {
        // Esta página funciona como una caja independiente.
        inicializar();

        const barra = document.getElementById("barra");
        if (barra && !barra.value.trim()) {
            barra.value = "Caja " + NUMERO_CAJA;
            guardarDatos();
        }

        // Ajustar la altura de cada hoja dentro de la página.
        const actualizarAltura = () => {
            const alto = Math.ceil(
                document.documentElement.scrollHeight
            );

            window.parent.postMessage({
                tipo: "altura-caja-mama",
                caja: NUMERO_CAJA,
                altura: alto
            }, window.location.origin);
        };

        if (window.ResizeObserver) {
            const observer = new ResizeObserver(actualizarAltura);
            observer.observe(document.body);
        }

        window.addEventListener("load", actualizarAltura);
        actualizarAltura();

        return;
    }

    // Página principal: mostrar las 4 hojas.
    document.body.innerHTML = `
        <main class="sistema-cuatro-cajas">
            <header class="panel-principal">
                <div>
                    <h1>MAMÁ POTOSÍ</h1>
                    <p>CONTROL DE CAJAS Y SUMINISTROS</p>
                </div>
                <button
                    class="btn-pdf-utilizados"
                    onclick="descargarPDFUtilizados()"
                >
                    Descargar PDF Utilizados
                </button>
            </header>

            <div id="contenedor-cuatro-cajas"></div>
        </main>
    `;

    const contenedor = document.getElementById(
        "contenedor-cuatro-cajas"
    );

    for (let numero = 1; numero <= 4; numero++) {
        const seccion = document.createElement("section");
        seccion.className = "seccion-caja";

        const titulo = document.createElement("h2");
        titulo.textContent = "CAJA " + numero;

        const iframe = document.createElement("iframe");
        iframe.id = "iframe-caja-" + numero;
        iframe.title = "Hoja de Caja " + numero;
        iframe.className = "iframe-caja";

        const direccion = new URL(window.location.href);
        direccion.searchParams.set("caja", numero);

        iframe.src = direccion.href;

        seccion.appendChild(titulo);
        seccion.appendChild(iframe);
        if (numero === 4) {
            seccion.appendChild(crearHojaConsumosCaja4());
        }
        contenedor.appendChild(seccion);
    }

    cargarConsumosCaja4();
}

window.addEventListener("message", function(evento) {
    if (evento.origin !== window.location.origin) return;

    const datos = evento.data;

    if (datos?.tipo !== "altura-caja-mama") return;

    const numero = Number(datos.caja);

    if (![1, 2, 3, 4].includes(numero)) return;

    const iframe = document.getElementById(
        "iframe-caja-" + numero
    );

    if (!iframe || evento.source !== iframe.contentWindow) return;

    const altura = Number(datos.altura);

    if (Number.isFinite(altura) && altura > 0) {
        iframe.style.height = Math.ceil(altura + 10) + "px";
    }
});

window.onload = iniciarSistema;

window.addEventListener("pagehide", () => {
    if (ES_HOJA_CAJA) guardarDatos();
    else guardarConsumosCaja4();
});

