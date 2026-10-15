const STORAGE_KEY = "pacha_control_caja_v2";

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
  // El catálogo anterior usaba otra estructura y no debe mezclarse con este.
  localStorage.removeItem("pacha_vFinal_Full");

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

  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function cargarDatos() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return;

  let data;
  try {
      data = JSON.parse(stored);
  } catch {
      localStorage.removeItem(STORAGE_KEY);
      mostrarNotificacion("Los datos guardados estaban dañados y fueron reiniciados.", "faltante");
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
  calcular();
  mostrarNotificacion("Control de caja limpiado.", "info");
}
function descargarPDF() {
  const element = document.getElementById('documento');
  if (!element) return;
  if (typeof window.html2pdf !== "function") {
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

  const opt = {
      margin: 0,
      filename: nombreArchivo,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
          scale: 2,
          scrollY: 0,
          useCORS: true
      },
      jsPDF: {
          unit: 'mm',
          format: 'a4',
          orientation: 'portrait'
      }
  };

  window.html2pdf().set(opt).from(element).save();
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

// Inicializa la tabla
window.onload = inicializar;
