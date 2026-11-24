-- Datos de ejemplo del catálogo de ByteMarket (productos reales del mercado).
-- Precios en MXN, aproximados al mercado mexicano (nov 2026); revisarlos antes de producción.
-- Idempotente: se puede ejecutar varias veces sin duplicar (compara por nombre/título).

begin;

-- ---------- categoría nueva ----------
insert into categorias (nombre, identificador_url, icono, activo)
values ('Enfriamiento', 'enfriamiento', '❄️', true)
on conflict (identificador_url) do nothing;

-- ---------- productos ----------
with nuevos (cat, nombre, descripcion, precio, precio_anterior, existencias, emoji, especificaciones, compatibilidad, destacado) as (values
-- Procesadores
('procesadores','AMD Ryzen 7 9800X3D','8 núcleos Zen 5 con 3D V-Cache de segunda generación (96 MB de L3). Hoy es el procesador más rápido para gaming en plataforma AM5.',9999,null,9,'🧠',
 '{"Socket":"AM5","Núcleos / hilos":"8 / 16","Frecuencia máx.":"5.2 GHz","Caché L3":"96 MB","TDP":"120W","Memoria":"DDR5","Gráficos integrados":"Radeon (2 CU)"}','{"component_type":"cpu","socket":"AM5","tdp_watts":120,"memory_type":"DDR5"}',true),
('procesadores','AMD Ryzen 9 9950X3D','16 núcleos y 32 hilos con 3D V-Cache. Pensado para quien juega y además renderiza, compila o edita video.',14499,null,4,'🧠',
 '{"Socket":"AM5","Núcleos / hilos":"16 / 32","Frecuencia máx.":"5.7 GHz","Caché L3":"128 MB","TDP":"170W","Memoria":"DDR5"}','{"component_type":"cpu","socket":"AM5","tdp_watts":170,"memory_type":"DDR5"}',false),
('procesadores','AMD Ryzen 7 9700X','8 núcleos Zen 5 con TDP de 65 W: buen rendimiento por watt y fácil de enfriar.',5699,null,12,'🧠',
 '{"Socket":"AM5","Núcleos / hilos":"8 / 16","Frecuencia máx.":"5.5 GHz","Caché L3":"32 MB","TDP":"65W","Memoria":"DDR5"}','{"component_type":"cpu","socket":"AM5","tdp_watts":65,"memory_type":"DDR5"}',false),
('procesadores','AMD Ryzen 5 9600X','6 núcleos Zen 5, la entrada a AM5 para gaming en 1080p y 1440p.',4299,null,15,'🧠',
 '{"Socket":"AM5","Núcleos / hilos":"6 / 12","Frecuencia máx.":"5.4 GHz","Caché L3":"32 MB","TDP":"65W","Memoria":"DDR5"}','{"component_type":"cpu","socket":"AM5","tdp_watts":65,"memory_type":"DDR5"}',false),
('procesadores','AMD Ryzen 5 5600','Opción económica para AM4 con DDR4. Incluye disipador Wraith Stealth.',1799,2099,25,'🧠',
 '{"Socket":"AM4","Núcleos / hilos":"6 / 12","Frecuencia máx.":"4.4 GHz","Caché L3":"32 MB","TDP":"65W","Memoria":"DDR4","Disipador incluido":"Sí (Wraith Stealth)"}','{"component_type":"cpu","socket":"AM4","tdp_watts":65,"memory_type":"DDR4"}',false),
('procesadores','Intel Core Ultra 9 285K','Tope de gama de Intel Arrow Lake: 24 núcleos (8P + 16E) para cargas de trabajo pesadas. Sin disipador incluido.',11499,null,5,'🧠',
 '{"Socket":"LGA1851","Núcleos / hilos":"24 (8P + 16E) / 24","Frecuencia máx.":"5.7 GHz","Caché L3":"36 MB","Potencia base":"125W","Memoria":"DDR5"}','{"component_type":"cpu","socket":"LGA1851","tdp_watts":125,"memory_type":"DDR5"}',false),
('procesadores','Intel Core Ultra 7 265K','20 núcleos (8P + 12E) en socket LGA1851. Muy fuerte en productividad multinúcleo.',6999,7999,8,'🧠',
 '{"Socket":"LGA1851","Núcleos / hilos":"20 (8P + 12E) / 20","Frecuencia máx.":"5.5 GHz","Caché L3":"30 MB","Potencia base":"125W","Memoria":"DDR5"}','{"component_type":"cpu","socket":"LGA1851","tdp_watts":125,"memory_type":"DDR5"}',false),
('procesadores','Intel Core Ultra 5 245K','14 núcleos (6P + 8E) para equipos de gama media en LGA1851; buen equilibrio entre juegos y productividad.',4999,null,10,'🧠',
 '{"Socket":"LGA1851","Núcleos / hilos":"14 (6P + 8E) / 14","Frecuencia máx.":"5.2 GHz","Caché L3":"24 MB","Potencia base":"125W","Memoria":"DDR5"}','{"component_type":"cpu","socket":"LGA1851","tdp_watts":125,"memory_type":"DDR5"}',false),
('procesadores','Intel Core i5-14600K','14 núcleos (6P + 8E) y 20 hilos en LGA1700. Compatible con DDR4 y DDR5.',4799,null,9,'🧠',
 '{"Socket":"LGA1700","Núcleos / hilos":"14 (6P + 8E) / 20","Frecuencia máx.":"5.3 GHz","Caché L3":"24 MB","Potencia base":"125W","Memoria":"DDR4 / DDR5"}','{"component_type":"cpu","socket":"LGA1700","tdp_watts":125,"memory_type":"DDR4/DDR5"}',false),
-- Tarjetas gráficas
('gpu','NVIDIA GeForce RTX 5090 Founders Edition','La GPU de consumo más potente de NVIDIA: 32 GB de GDDR7, DLSS 4 con Multi Frame Generation. Requiere fuente de 1000 W.',52999,null,2,'🎮',
 '{"Núcleos CUDA":"21760","VRAM":"32 GB GDDR7","Bus":"512 bits","Interfaz":"PCIe 5.0 x16","TGP":"575W","Conector":"16 pines (12V-2x6)","Fuente recomendada":"1000W"}','{"component_type":"gpu","interface":"PCIe 5.0 x16","tdp_watts":575}',true),
('gpu','NVIDIA GeForce RTX 5080 Founders Edition','16 GB de GDDR7 para 4K con ray tracing y DLSS 4.',24999,null,4,'🎮',
 '{"Núcleos CUDA":"10752","VRAM":"16 GB GDDR7","Bus":"256 bits","Interfaz":"PCIe 5.0 x16","TGP":"360W","Fuente recomendada":"850W"}','{"component_type":"gpu","interface":"PCIe 5.0 x16","tdp_watts":360}',false),
('gpu','ASUS TUF Gaming GeForce RTX 5070 Ti OC 16GB','RTX 5070 Ti con disipador de triple ventilador TUF y construcción reforzada. Excelente para 1440p alto y 4K.',17999,null,6,'🎮',
 '{"Núcleos CUDA":"8960","VRAM":"16 GB GDDR7","Bus":"256 bits","Interfaz":"PCIe 5.0 x16","TGP":"300W","Fuente recomendada":"750W"}','{"component_type":"gpu","interface":"PCIe 5.0 x16","tdp_watts":300}',false),
('gpu','MSI GeForce RTX 5070 12G VENTUS 2X OC','RTX 5070 compacta de doble ventilador, cabe en casi cualquier gabinete.',12499,13499,9,'🎮',
 '{"Núcleos CUDA":"6144","VRAM":"12 GB GDDR7","Bus":"192 bits","Interfaz":"PCIe 5.0 x16","TGP":"250W","Fuente recomendada":"650W"}','{"component_type":"gpu","interface":"PCIe 5.0 x16","tdp_watts":250}',false),
('gpu','GIGABYTE GeForce RTX 5060 Ti WINDFORCE OC 16G','Versión de 16 GB de la 5060 Ti: VRAM suficiente para 1440p y juegos recientes.',9299,null,11,'🎮',
 '{"Núcleos CUDA":"4608","VRAM":"16 GB GDDR7","Bus":"128 bits","Interfaz":"PCIe 5.0 x8","TGP":"180W","Fuente recomendada":"600W"}','{"component_type":"gpu","interface":"PCIe 5.0 x8","tdp_watts":180}',false),
('gpu','ZOTAC GAMING GeForce RTX 5060 Twin Edge','GPU de entrada para 1080p con DLSS 4. Solo 8 GB de VRAM: puede quedarse corta en juegos muy exigentes.',6499,null,14,'🎮',
 '{"Núcleos CUDA":"3840","VRAM":"8 GB GDDR7","Bus":"128 bits","Interfaz":"PCIe 5.0 x8","TGP":"145W","Fuente recomendada":"550W"}','{"component_type":"gpu","interface":"PCIe 5.0 x8","tdp_watts":145}',false),
('gpu','Sapphire PULSE Radeon RX 9070 XT 16GB','RDNA 4 con 16 GB y FSR 4. Rival directo de la RTX 5070 Ti en rasterizado.',14499,15999,7,'🎮',
 '{"Unidades de cómputo":"64","VRAM":"16 GB GDDR6","Bus":"256 bits","Interfaz":"PCIe 5.0 x16","TBP":"304W","Fuente recomendada":"750W"}','{"component_type":"gpu","interface":"PCIe 5.0 x16","tdp_watts":304}',true),
('gpu','PowerColor Reaper Radeon RX 9070 16GB','RX 9070 de doble ventilador y tamaño reducido, eficiente para 1440p.',12499,null,6,'🎮',
 '{"Unidades de cómputo":"56","VRAM":"16 GB GDDR6","Bus":"256 bits","Interfaz":"PCIe 5.0 x16","TBP":"220W","Fuente recomendada":"650W"}','{"component_type":"gpu","interface":"PCIe 5.0 x16","tdp_watts":220}',false),
('gpu','Sapphire PULSE Radeon RX 9060 XT 16GB','16 GB de VRAM a precio de gama media; buena opción para 1080p alto y 1440p.',7999,null,10,'🎮',
 '{"Unidades de cómputo":"32","VRAM":"16 GB GDDR6","Bus":"128 bits","Interfaz":"PCIe 5.0 x16","TBP":"160W","Fuente recomendada":"500W"}','{"component_type":"gpu","interface":"PCIe 5.0 x16","tdp_watts":160}',false),
('gpu','Intel Arc B580 Limited Edition','12 GB de VRAM a precio de entrada. Requiere Resizable BAR activado en BIOS.',5499,null,8,'🎮',
 '{"Núcleos Xe":"20","VRAM":"12 GB GDDR6","Bus":"192 bits","Interfaz":"PCIe 4.0 x8","TBP":"190W","Fuente recomendada":"600W"}','{"component_type":"gpu","interface":"PCIe 4.0 x8","tdp_watts":190}',false),
-- Memorias RAM
('ram','G.Skill Trident Z5 Neo RGB 32GB (2x16GB) DDR5-6000 CL30','Kit optimizado para AMD EXPO; 6000 MT/s CL30 es el punto ideal para Ryzen 7000/9000.',2499,null,18,'💾',
 '{"Tipo":"DDR5","Capacidad":"32 GB (2x16 GB)","Velocidad":"6000 MT/s","Latencia":"CL30","Perfil":"AMD EXPO","Voltaje":"1.35V","RGB":"Sí"}','{"component_type":"ram","memory_type":"DDR5","capacity_gb":32,"speed_mts":6000,"modules":2}',false),
('ram','G.Skill Flare X5 64GB (2x32GB) DDR5-6000 CL30','64 GB para edición de video, máquinas virtuales o modelos de IA locales. Perfil bajo, sin RGB.',4499,null,7,'💾',
 '{"Tipo":"DDR5","Capacidad":"64 GB (2x32 GB)","Velocidad":"6000 MT/s","Latencia":"CL30","Perfil":"AMD EXPO","Voltaje":"1.35V","RGB":"No"}','{"component_type":"ram","memory_type":"DDR5","capacity_gb":64,"speed_mts":6000,"modules":2}',false),
('ram','Kingston FURY Beast 32GB (2x16GB) DDR5-5600 CL36','Kit DDR5 confiable con perfiles Intel XMP 3.0 y AMD EXPO.',1999,null,20,'💾',
 '{"Tipo":"DDR5","Capacidad":"32 GB (2x16 GB)","Velocidad":"5600 MT/s","Latencia":"CL36","Perfil":"XMP 3.0 / EXPO","Voltaje":"1.25V"}','{"component_type":"ram","memory_type":"DDR5","capacity_gb":32,"speed_mts":5600,"modules":2}',false),
('ram','Corsair Vengeance LPX 16GB (2x8GB) DDR4-3200 CL16','El kit DDR4 clásico para AM4 y LGA1700 con DDR4. Disipador de perfil bajo.',749,899,30,'💾',
 '{"Tipo":"DDR4","Capacidad":"16 GB (2x8 GB)","Velocidad":"3200 MT/s","Latencia":"CL16","Perfil":"XMP 2.0","Voltaje":"1.35V"}','{"component_type":"ram","memory_type":"DDR4","capacity_gb":16,"speed_mts":3200,"modules":2}',false),
('ram','Kingston FURY Beast 32GB (2x16GB) DDR4-3200 CL16','32 GB en DDR4 para plataformas AM4 a buen precio.',1299,null,16,'💾',
 '{"Tipo":"DDR4","Capacidad":"32 GB (2x16 GB)","Velocidad":"3200 MT/s","Latencia":"CL16","Perfil":"XMP 2.0","Voltaje":"1.35V"}','{"component_type":"ram","memory_type":"DDR4","capacity_gb":32,"speed_mts":3200,"modules":2}',false),
-- Almacenamiento
('almacenamiento','Samsung 990 EVO Plus 1TB','NVMe sin DRAM pero rápido: hasta 7150 MB/s. Funciona en PCIe 4.0 x4 y 5.0 x2.',1599,null,20,'💿',
 '{"Capacidad":"1 TB","Formato":"M.2 2280","Interfaz":"NVMe PCIe 4.0 x4 / 5.0 x2","Lectura":"7150 MB/s","Escritura":"6300 MB/s","Durabilidad":"600 TBW","Garantía":"5 años"}','{"component_type":"storage","interface":"M.2 NVMe"}',false),
('almacenamiento','Crucial T705 2TB PCIe 5.0','Uno de los SSD PCIe 5.0 más rápidos: hasta 14 500 MB/s. Necesita ranura M.2 Gen5 y buen flujo de aire.',5499,null,5,'💿',
 '{"Capacidad":"2 TB","Formato":"M.2 2280","Interfaz":"NVMe PCIe 5.0 x4","Lectura":"14500 MB/s","Escritura":"12700 MB/s","Durabilidad":"1200 TBW","Garantía":"5 años"}','{"component_type":"storage","interface":"M.2 NVMe"}',false),
('almacenamiento','Crucial P3 Plus 1TB','SSD PCIe 4.0 económico, buena opción como unidad principal de un equipo básico.',1099,1299,22,'💿',
 '{"Capacidad":"1 TB","Formato":"M.2 2280","Interfaz":"NVMe PCIe 4.0 x4","Lectura":"5000 MB/s","Escritura":"3600 MB/s","Durabilidad":"220 TBW","Garantía":"5 años"}','{"component_type":"storage","interface":"M.2 NVMe"}',false),
('almacenamiento','WD Blue SN580 1TB','NVMe PCIe 4.0 de bajo consumo, ideal para laptops y equipos de oficina.',999,null,18,'💿',
 '{"Capacidad":"1 TB","Formato":"M.2 2280","Interfaz":"NVMe PCIe 4.0 x4","Lectura":"4150 MB/s","Escritura":"4150 MB/s","Durabilidad":"600 TBW","Garantía":"5 años"}','{"component_type":"storage","interface":"M.2 NVMe"}',false),
('almacenamiento','Kingston NV3 1TB','SSD de entrada PCIe 4.0 con hasta 6000 MB/s de lectura.',999,null,25,'💿',
 '{"Capacidad":"1 TB","Formato":"M.2 2280","Interfaz":"NVMe PCIe 4.0 x4","Lectura":"6000 MB/s","Escritura":"4000 MB/s","Durabilidad":"320 TBW","Garantía":"3 años"}','{"component_type":"storage","interface":"M.2 NVMe"}',false),
('almacenamiento','Samsung 870 EVO 1TB SATA','SSD de 2.5" SATA para revivir equipos viejos o sumar almacenamiento sin ranura M.2.',1699,null,12,'💿',
 '{"Capacidad":"1 TB","Formato":"2.5 pulgadas","Interfaz":"SATA III 6 Gb/s","Lectura":"560 MB/s","Escritura":"530 MB/s","Durabilidad":"600 TBW","Garantía":"5 años"}','{"component_type":"storage","interface":"SATA"}',false),
('almacenamiento','Seagate BarraCuda 2TB HDD','Disco duro de 3.5" y 7200 RPM para respaldos y bibliotecas de juegos o fotos.',1199,null,15,'💿',
 '{"Capacidad":"2 TB","Formato":"3.5 pulgadas","Interfaz":"SATA III 6 Gb/s","Velocidad de giro":"7200 RPM","Transferencia":"Hasta 220 MB/s","Caché":"256 MB"}','{"component_type":"storage","interface":"SATA"}',false),
-- Fuentes de poder
('fuentes','Corsair RM850e 850W 80+ Gold','Totalmente modular, ATX 3.1 con conector 12V-2x6 nativo. Suficiente para RTX 5070 Ti / RX 9070 XT.',2499,null,12,'⚡',
 '{"Potencia":"850W","Certificación":"80+ Gold","Modular":"Total","Estándar":"ATX 3.1","Conector GPU":"12V-2x6","Garantía":"7 años"}','{"component_type":"psu","wattage":850,"form_factor":"ATX"}',false),
('fuentes','Corsair RM1000x 1000W 80+ Gold','1000 W totalmente modular para RTX 5090 o equipos de gama extrema.',3799,null,6,'⚡',
 '{"Potencia":"1000W","Certificación":"80+ Gold","Modular":"Total","Estándar":"ATX 3.1","Conector GPU":"12V-2x6","Garantía":"10 años"}','{"component_type":"psu","wattage":1000,"form_factor":"ATX"}',false),
('fuentes','be quiet! Pure Power 12 M 850W 80+ Gold','Silenciosa, modular y ATX 3.0 con conector 12VHPWR.',2599,2899,8,'⚡',
 '{"Potencia":"850W","Certificación":"80+ Gold","Modular":"Total","Estándar":"ATX 3.0","Conector GPU":"12VHPWR","Garantía":"10 años"}','{"component_type":"psu","wattage":850,"form_factor":"ATX"}',false),
('fuentes','Seasonic FOCUS GX-750 750W 80+ Gold','Fuente de referencia en calidad: totalmente modular y con ventilador híbrido.',2199,null,10,'⚡',
 '{"Potencia":"750W","Certificación":"80+ Gold","Modular":"Total","Ventilador":"120 mm, modo híbrido","Garantía":"10 años"}','{"component_type":"psu","wattage":750,"form_factor":"ATX"}',false),
('fuentes','MSI MAG A650BN 650W 80+ Bronze','Fuente básica no modular para equipos de oficina o gaming de entrada.',899,null,20,'⚡',
 '{"Potencia":"650W","Certificación":"80+ Bronze","Modular":"No","Garantía":"5 años"}','{"component_type":"psu","wattage":650,"form_factor":"ATX"}',false),
('fuentes','Corsair SF750 750W 80+ Platinum (SFX)','Fuente SFX compacta para gabinetes Mini-ITX sin sacrificar potencia.',3499,null,4,'⚡',
 '{"Potencia":"750W","Certificación":"80+ Platinum","Modular":"Total","Formato":"SFX","Garantía":"7 años"}','{"component_type":"psu","wattage":750,"form_factor":"SFX"}',false),
-- Tarjetas madre
('tarjetas-madre','ASUS TUF GAMING B650-PLUS WIFI','Tarjeta AM5 ATX robusta, con Wi-Fi 6 y dos ranuras M.2 PCIe 4.0. Lista para Ryzen 7000 y 9000 (con BIOS actualizada).',4299,null,9,'🔧',
 '{"Socket":"AM5","Chipset":"AMD B650","Formato":"ATX","Memoria":"DDR5, 4 ranuras, hasta 192 GB","M.2":"2 (PCIe 4.0)","Red":"Wi-Fi 6 + 2.5 GbE"}','{"component_type":"motherboard","socket":"AM5","memory_type":"DDR5","form_factor":"ATX","memory_slots":4}',false),
('tarjetas-madre','MSI MAG B650 TOMAHAWK WIFI','Excelente VRM para su precio; aguanta un Ryzen 9 sin problemas.',4499,4999,7,'🔧',
 '{"Socket":"AM5","Chipset":"AMD B650","Formato":"ATX","Memoria":"DDR5, 4 ranuras, hasta 256 GB","M.2":"3 (PCIe 4.0)","Red":"Wi-Fi 6E + 2.5 GbE"}','{"component_type":"motherboard","socket":"AM5","memory_type":"DDR5","form_factor":"ATX","memory_slots":4}',false),
('tarjetas-madre','GIGABYTE B650M AORUS ELITE AX','Micro-ATX para AM5 con Wi-Fi 6E: buena opción para equipos compactos.',3699,null,10,'🔧',
 '{"Socket":"AM5","Chipset":"AMD B650","Formato":"Micro-ATX","Memoria":"DDR5, 4 ranuras","M.2":"2","Red":"Wi-Fi 6E + 2.5 GbE"}','{"component_type":"motherboard","socket":"AM5","memory_type":"DDR5","form_factor":"Micro-ATX","memory_slots":4}',false),
('tarjetas-madre','GIGABYTE B850 AORUS ELITE WIFI7','Chipset B850 con ranura M.2 PCIe 5.0, USB4 y Wi-Fi 7.',5299,null,6,'🔧',
 '{"Socket":"AM5","Chipset":"AMD B850","Formato":"ATX","Memoria":"DDR5, 4 ranuras","M.2":"3 (1 PCIe 5.0)","Red":"Wi-Fi 7 + 2.5 GbE"}','{"component_type":"motherboard","socket":"AM5","memory_type":"DDR5","form_factor":"ATX","memory_slots":4}',false),
('tarjetas-madre','ASUS ROG STRIX X870E-E GAMING WIFI','Gama alta AM5: PCIe 5.0 en GPU y M.2, USB4 doble y Wi-Fi 7.',10999,null,3,'🔧',
 '{"Socket":"AM5","Chipset":"AMD X870E","Formato":"ATX","Memoria":"DDR5, 4 ranuras","M.2":"5 (PCIe 5.0 y 4.0)","Red":"Wi-Fi 7 + 5 GbE"}','{"component_type":"motherboard","socket":"AM5","memory_type":"DDR5","form_factor":"ATX","memory_slots":4}',false),
('tarjetas-madre','MSI PRO Z890-P WIFI','ATX para Intel Core Ultra (LGA1851) con soporte de overclock en CPUs K.',5299,null,6,'🔧',
 '{"Socket":"LGA1851","Chipset":"Intel Z890","Formato":"ATX","Memoria":"DDR5, 4 ranuras","M.2":"4","Red":"Wi-Fi 7 + 5 GbE"}','{"component_type":"motherboard","socket":"LGA1851","memory_type":"DDR5","form_factor":"ATX","memory_slots":4}',false),
('tarjetas-madre','ASUS PRIME B760M-A WIFI D4','Micro-ATX para Intel 12.ª a 14.ª gen con memoria DDR4: aprovecha RAM que ya tengas.',2999,null,8,'🔧',
 '{"Socket":"LGA1700","Chipset":"Intel B760","Formato":"Micro-ATX","Memoria":"DDR4, 4 ranuras","M.2":"2","Red":"Wi-Fi 6 + 2.5 GbE"}','{"component_type":"motherboard","socket":"LGA1700","memory_type":"DDR4","form_factor":"Micro-ATX","memory_slots":4}',false),
('tarjetas-madre','MSI MAG B550 TOMAHAWK','Clásica de AM4 con PCIe 4.0 y buen VRM para Ryzen 5000.',2799,3199,7,'🔧',
 '{"Socket":"AM4","Chipset":"AMD B550","Formato":"ATX","Memoria":"DDR4, 4 ranuras","M.2":"2","Red":"2.5 GbE + 1 GbE"}','{"component_type":"motherboard","socket":"AM4","memory_type":"DDR4","form_factor":"ATX","memory_slots":4}',false),
-- Gabinetes
('gabinetes','Lian Li O11 Dynamic EVO','Diseño de acuario con vidrio templado en dos caras y espacio para tres radiadores de 360 mm.',3299,null,5,'🖥️',
 '{"Formato":"Mid tower","Tarjetas madre":"E-ATX, ATX, Micro-ATX, Mini-ITX","GPU máx.":"426 mm","Radiadores":"Hasta 3x 360 mm","Ventiladores incluidos":"0"}','{"component_type":"case","motherboard_form_factors":["E-ATX","ATX","Micro-ATX","Mini-ITX"],"max_gpu_mm":426}',false),
('gabinetes','Lian Li LANCOOL 216','Excelente flujo de aire con dos ventiladores frontales de 160 mm incluidos.',2099,null,8,'🖥️',
 '{"Formato":"Mid tower","Tarjetas madre":"E-ATX, ATX, Micro-ATX, Mini-ITX","GPU máx.":"392 mm","Ventiladores incluidos":"2x 160 mm + 1x 140 mm"}','{"component_type":"case","motherboard_form_factors":["E-ATX","ATX","Micro-ATX","Mini-ITX"],"max_gpu_mm":392}',false),
('gabinetes','Fractal Design North','Frente de madera de nogal o roble y malla; estética de mueble con buen flujo de aire.',3199,null,4,'🖥️',
 '{"Formato":"Mid tower","Tarjetas madre":"ATX, Micro-ATX, Mini-ITX","GPU máx.":"355 mm","Ventiladores incluidos":"2x 140 mm"}','{"component_type":"case","motherboard_form_factors":["ATX","Micro-ATX","Mini-ITX"],"max_gpu_mm":355}',false),
('gabinetes','Corsair 4000D Airflow','Uno de los gabinetes más vendidos: frente de malla, buen manejo de cables y precio razonable.',1899,2199,10,'🖥️',
 '{"Formato":"Mid tower","Tarjetas madre":"ATX, Micro-ATX, Mini-ITX","GPU máx.":"360 mm","Ventiladores incluidos":"2x 120 mm"}','{"component_type":"case","motherboard_form_factors":["ATX","Micro-ATX","Mini-ITX"],"max_gpu_mm":360}',false),
('gabinetes','NZXT H5 Flow','Mid tower compacto con malla frontal y ventilador dedicado a la GPU.',1799,null,9,'🖥️',
 '{"Formato":"Mid tower","Tarjetas madre":"ATX, Micro-ATX, Mini-ITX","GPU máx.":"365 mm","Ventiladores incluidos":"2x 120 mm"}','{"component_type":"case","motherboard_form_factors":["ATX","Micro-ATX","Mini-ITX"],"max_gpu_mm":365}',false),
('gabinetes','Cooler Master MasterBox Q300L','Gabinete Micro-ATX económico con filtros magnéticos.',999,null,14,'🖥️',
 '{"Formato":"Mini tower","Tarjetas madre":"Micro-ATX, Mini-ITX","GPU máx.":"360 mm","Ventiladores incluidos":"1x 120 mm"}','{"component_type":"case","motherboard_form_factors":["Micro-ATX","Mini-ITX"],"max_gpu_mm":360}',false),
-- Enfriamiento
('enfriamiento','Thermalright Peerless Assassin 120 SE','Disipador de doble torre con 6 heatpipes; rinde como modelos que cuestan el triple.',799,null,25,'❄️',
 '{"Tipo":"Aire, doble torre","Ventiladores":"2x 120 mm","Altura":"155 mm","Sockets":"AM4, AM5, LGA1700, LGA1851"}','{"component_type":"cooler","cooler_type":"air","sockets":["AM4","AM5","LGA1700","LGA1851"],"height_mm":155}',false),
('enfriamiento','DeepCool AK620','Doble torre silencioso para procesadores de hasta ~260 W.',1299,null,12,'❄️',
 '{"Tipo":"Aire, doble torre","Ventiladores":"2x 120 mm","Altura":"160 mm","Sockets":"AM4, AM5, LGA1700"}','{"component_type":"cooler","cooler_type":"air","sockets":["AM4","AM5","LGA1700"],"height_mm":160}',false),
('enfriamiento','Noctua NH-D15 G2','El disipador de aire de referencia, ahora con dos ventiladores NF-A14x25r G2. Muy alto: revisa el espacio del gabinete.',3299,null,4,'❄️',
 '{"Tipo":"Aire, doble torre","Ventiladores":"2x 140 mm","Altura":"168 mm","Sockets":"AM4, AM5, LGA1700, LGA1851","Garantía":"6 años"}','{"component_type":"cooler","cooler_type":"air","sockets":["AM4","AM5","LGA1700","LGA1851"],"height_mm":168}',false),
('enfriamiento','Cooler Master Hyper 212 Black Edition','El disipador de torre sencilla más conocido; suficiente para CPUs de 65 W.',699,null,20,'❄️',
 '{"Tipo":"Aire, torre sencilla","Ventiladores":"1x 120 mm","Altura":"158.8 mm","Sockets":"AM4, AM5, LGA1700"}','{"component_type":"cooler","cooler_type":"air","sockets":["AM4","AM5","LGA1700"],"height_mm":159}',false),
('enfriamiento','ARCTIC Liquid Freezer III 360','Enfriamiento líquido AIO de 360 mm con excelente rendimiento y ventilador de VRM integrado.',2299,2699,8,'❄️',
 '{"Tipo":"Líquido AIO","Radiador":"360 mm","Ventiladores":"3x 120 mm P12 PWM PST","Sockets":"AM4, AM5, LGA1700, LGA1851","Garantía":"6 años"}','{"component_type":"cooler","cooler_type":"aio","sockets":["AM4","AM5","LGA1700","LGA1851"],"radiator_mm":360}',false),
('enfriamiento','NZXT Kraken 360 (2023)','AIO de 360 mm con pantalla LCD en la bomba para mostrar temperaturas o imágenes.',3799,null,5,'❄️',
 '{"Tipo":"Líquido AIO","Radiador":"360 mm","Ventiladores":"3x 120 mm","Pantalla":"LCD 1.54\"","Sockets":"AM4, AM5, LGA1700"}','{"component_type":"cooler","cooler_type":"aio","sockets":["AM4","AM5","LGA1700"],"radiator_mm":360}',false)
)
insert into productos (id_categoria, nombre, descripcion, precio, precio_anterior, existencias, emoji, especificaciones, compatibilidad, destacado, activo)
select c.id, n.nombre, n.descripcion, n.precio, n.precio_anterior, n.existencias, n.emoji, n.especificaciones::jsonb, n.compatibilidad::jsonb, n.destacado, true
from nuevos n
join categorias c on c.identificador_url = n.cat
where not exists (select 1 from productos p where p.nombre = n.nombre);

-- ---------- completar productos existentes que tenían datos mínimos ----------
update productos set
  descripcion = 'Procesador AMD de 8 núcleos con 3D V-Cache (96 MB de L3). Generación anterior al 9800X3D, sigue siendo excelente para gaming en AM5.',
  especificaciones = '{"Socket":"AM5","Núcleos / hilos":"8 / 16","Frecuencia máx.":"5.0 GHz","Caché L3":"96 MB","TDP":"120W","Memoria":"DDR5"}'
where nombre = 'Ryzen 7 7800X3D';
update productos set
  especificaciones = '{"Socket":"AM5","Núcleos / hilos":"6 / 12","Frecuencia máx.":"5.3 GHz","Caché L3":"32 MB","TDP":"105W","Memoria":"DDR5"}'
where nombre = 'Ryzen 5 7600X';
update productos set
  descripcion = 'Kit Kingston FURY Beast DDR5 de 32 GB (2x16 GB) a 6000 MT/s, con perfiles XMP 3.0 y AMD EXPO.',
  especificaciones = '{"Tipo":"DDR5","Capacidad":"32 GB (2x16 GB)","Velocidad":"6000 MT/s","Latencia":"CL36","Formato":"DIMM"}'
where nombre = 'Kingston Fury 32GB DDR5';
update productos set
  descripcion = 'SSD NVMe PCIe 4.0 tope de gama de Samsung: hasta 7450 MB/s de lectura.',
  especificaciones = '{"Capacidad":"2 TB","Formato":"M.2 2280","Interfaz":"NVMe PCIe 4.0 x4","Lectura":"7450 MB/s","Escritura":"6900 MB/s","Durabilidad":"1200 TBW","Garantía":"5 años"}'
where nombre = 'Samsung 990 Pro 2TB';
update productos set
  especificaciones = '{"Potencia":"750W","Certificación":"80+ Gold","Modular":"Total","Garantía":"10 años"}'
where nombre = 'EVGA 750W 80+ Gold';
update productos set
  especificaciones = '{"Formato":"Mid tower","Tarjetas madre":"ATX, Micro-ATX, Mini-ITX","GPU máx.":"400 mm","Ventiladores incluidos":"4x 140 mm","Panel":"Frontal de malla"}'
where nombre = 'NZXT H7 Flow';
update productos set
  descripcion = 'GeForce RTX 4060 Ti de 8 GB (generación Ada Lovelace) para gaming en 1080p con DLSS 3.',
  especificaciones = '{"Núcleos CUDA":"4352","VRAM":"8 GB GDDR6","Bus":"128 bits","Interfaz":"PCIe 4.0 x8","TGP":"160W"}',
  compatibilidad = '{"component_type":"gpu","interface":"PCIe 4.0 x8","tdp_watts":160}'
where nombre = 'RTX 4060 Ti';
update productos set
  especificaciones = '{"Tipo":"DDR5","Capacidad":"32 GB (2x16 GB)","Velocidad":"5600 MT/s","Latencia":"CL36","Perfil":"XMP 3.0"}'
where nombre = 'Corsair 32GB DDR5';
update productos set
  especificaciones = '{"Capacidad":"1 TB","Formato":"M.2 2280","Interfaz":"NVMe PCIe 4.0 x4","Lectura":"7300 MB/s","Escritura":"6300 MB/s","Durabilidad":"600 TBW","Garantía":"5 años"}'
where nombre = 'WD Black SN850X 1TB';

-- ---------- promociones (precio_oferta = precio actual, precio_anterior = precio normal) ----------
insert into promociones (id_producto, precio_oferta, inicio_en, fin_en, activo)
select p.id, p.precio, '2026-11-20T00:00:00-06:00', '2026-12-07T23:59:59-06:00', true
from productos p
where p.precio_anterior is not null and p.precio_anterior > p.precio
  and not exists (select 1 from promociones x where x.id_producto = p.id);

-- ---------- guías ----------
insert into guias (titulo, descripcion, nivel, emoji, publicada, contenido)
select * from (values
('Cómo elegir tarjeta madre según tu procesador','Socket, chipset y formato: lo que debes revisar para que CPU, RAM y gabinete encajen.','Principiante','🔧',true,
$md$## El socket manda

La tarjeta madre debe tener el **mismo socket** que el procesador:

- **AM5**: Ryzen 7000 y 9000 (solo DDR5).
- **AM4**: Ryzen 1000 a 5000 (solo DDR4).
- **LGA1851**: Intel Core Ultra 200S (solo DDR5).
- **LGA1700**: Intel 12.ª, 13.ª y 14.ª gen (hay tarjetas DDR4 y DDR5; no ambas en la misma).

## El chipset define las funciones

### AMD
- **A620**: básico, sin overclock de CPU.
- **B650 / B850**: el punto ideal para la mayoría.
- **X870 / X870E**: más PCIe 5.0, USB4 y conectividad.

### Intel
- **B760 / B860**: sin overclock de CPU.
- **Z790 / Z890**: necesarios para aprovechar procesadores con sufijo **K**.

## Formato y gabinete

- **ATX**: tamaño completo, más ranuras.
- **Micro-ATX**: más compacta y barata.
- **Mini-ITX**: para equipos pequeños, solo 2 ranuras de RAM.

Revisa que tu gabinete soporte el formato de la tarjeta.

## Ojo con el BIOS

Una tarjeta B650 fabricada antes de 2024 puede necesitar **actualizar el BIOS** para reconocer un Ryzen 9000. Muchas tienen *BIOS Flashback*, que permite actualizar sin CPU instalado.$md$),
('Disipador de aire o enfriamiento líquido','Cuándo vale la pena un AIO y cuándo basta un buen disipador de torre.','Intermedio','❄️',true,
$md$## Lo que realmente importa

El enfriamiento debe poder disipar el **TDP** de tu procesador con margen.

- **65 W** (Ryzen 5 9600X, Ryzen 7 9700X): torre sencilla de 120 mm.
- **105–125 W** (Core Ultra 7 265K, Ryzen 7 9800X3D): doble torre o AIO de 240 mm.
- **170 W o más** (Ryzen 9 9950X3D, Core Ultra 9 285K): doble torre grande o AIO de 360 mm.

## Ventajas del aire

- **Más barato**: un Thermalright Peerless Assassin 120 SE cuesta menos de $800.
- **Sin bomba** que pueda fallar.
- Dura años sin mantenimiento.

## Ventajas del líquido (AIO)

- Saca el calor directo por el radiador.
- Deja libre el espacio alrededor del socket.
- Mejor estética.

## Revisa antes de comprar

1. **Altura del disipador** contra la altura máxima del gabinete.
2. **Tamaño del radiador** contra los soportes del gabinete.
3. Que incluya el **kit de montaje** para tu socket.$md$),
('Armar una PC gamer para 1440p en 2026','Configuración equilibrada para jugar en 1440p a altas tasas de cuadros sin gastar de más.','Avanzado','🖥️',true,
$md$## La configuración

- **CPU**: AMD Ryzen 7 9800X3D
- **Tarjeta madre**: MSI MAG B650 TOMAHAWK WIFI
- **RAM**: 32 GB DDR5-6000 CL30
- **GPU**: Radeon RX 9070 XT o GeForce RTX 5070 Ti
- **SSD**: 2 TB NVMe PCIe 4.0
- **Fuente**: 850 W 80+ Gold ATX 3.1
- **Disipador**: doble torre o AIO de 360 mm
- **Gabinete**: mid tower con frente de malla

## Por qué estas piezas

### Procesador
La 3D V-Cache del 9800X3D da la mayor ventaja en juegos que dependen del CPU (simuladores, estrategia, shooters competitivos).

### RAM
En AM5, **6000 MT/s CL30** es el punto ideal: más velocidad casi no aporta y puede dar inestabilidad.

### GPU
Ambas tienen **16 GB de VRAM**, que en 1440p ya no es un lujo. La RTX 5070 Ti gana en ray tracing y DLSS; la RX 9070 XT suele costar menos.

### Fuente
850 W deja margen para picos de consumo y para una mejora futura de GPU.

## Después de armar

1. Activa el perfil **EXPO** en el BIOS.
2. Actualiza el BIOS a la versión más reciente.
3. Instala los drivers de chipset y GPU desde el sitio del fabricante.$md$)
) as g(titulo, descripcion, nivel, emoji, publicada, contenido)
where not exists (select 1 from guias x where x.titulo = g.titulo);

commit;
