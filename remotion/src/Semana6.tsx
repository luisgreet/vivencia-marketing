import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {AZUL, AZUL_OSCURO, CREMA, DATOS, DORADO, Logo, Musica, Referencial, VideoHorizontal, Etiqueta, FUENTE, useEntrada} from './marca';
import {CierreCarrusel, CierreReel, Pie, Texto} from './Semana';
import {Abajo, Check, Chip, Clip, CtaH, Cita, Lamina, Portada, Portada1, Tomas} from './Semana5';

const T = (s: number) => Math.round(s * 30);
const B = (n: string) => `biblioteca/${n}.mp4`;

/* ───────── REEL 16 — «Tus pistas, en obra» ───────── */
export const DUR_REEL16 = T(22);
export const Reel16: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.55} />
		<Tomas
			tomas={[
				[0, 3.5, <><Clip src="obra_6309.mp4" /><Portada pre="EL DORADO · EN OBRA" t="Así se trabaja" /></>],
				[3.5, 8, <><Clip src="obra_6591.mp4" /><Chip>TRABAJOS EN EL TERRENO</Chip><Abajo t="Motoniveladora en la calle" /></>],
				[8, 12.5, <><Clip src="obra_6594.mp4" /><Chip>PISTAS MEJORADAS</Chip><Abajo t="Se entrega con pistas mejoradas" /></>],
				[12.5, 17, <><Clip src="d117.mp4" /><Chip>TU LOTE SE ENTREGA CON</Chip><Abajo t="Agua, luz, parques y título" sub="Y áreas recreativas" /></>],
				[17, 22, <CierreReel />],
			]}
		/>
	</AbsoluteFill>
);

/* ───────── REEL 17 — «Para toda la familia» (renders) ───────── */
const FAM: [string, string, string][] = [
	['clip_infantil.mp4', 'PARQUE INFANTIL', 'Juegos para los niños'],
	['clip_parrillas.mp4', 'PARQUE DE PARRILLAS', 'Reúne a tu familia'],
	['clip_deportivo.mp4', 'BOULEVARD DEPORTIVO', 'Espacio para el deporte'],
	['clip_ingreso.mp4', 'INGRESO', 'Parques y áreas recreativas'],
];
const TomaFam: React.FC<{c: string; chip: string; t: string}> = ({c, chip, t}) => (
	<AbsoluteFill>
		<VideoHorizontal src={c} top={650} />
		<Chip top={220}>{chip}</Chip>
		<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 70px 330px'}}>
			<Texto size={84}>{t}</Texto>
		</AbsoluteFill>
	</AbsoluteFill>
);
export const DUR_REEL17 = T(23);
export const Reel17: React.FC = () => (
	<AbsoluteFill style={{background: AZUL_OSCURO}}>
		<Musica volumen={0.55} />
		<Tomas
			tomas={[
				[0, 3, <><VideoHorizontal src="clip_ingreso.mp4" top={650} /><AbsoluteFill style={{padding: '180px 70px 0'}}><Etiqueta>EL DORADO · PUERTO MALDONADO</Etiqueta><Texto size={120} style={{marginTop: 30}}>Para toda la familia</Texto></AbsoluteFill></>],
				...FAM.slice(0, 3).map(([c, chip, t], i): [number, number, React.ReactNode] => [3 + i * 3.7, 3 + (i + 1) * 3.7, <TomaFam c={c} chip={chip} t={t} />]),
				[14.1, 17.8, <TomaFam c={FAM[3][0]} chip={FAM[3][1]} t={FAM[3][2]} />],
				[17.8, 23, <CierreReel />],
			]}
		/>
	</AbsoluteFill>
);

/* ───────── REEL 18 — «Pide el título de propiedad» ───────── */
export const DUR_REEL18 = T(22);
export const Reel18: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.1} />
		<Tomas
			tomas={[
				[0, 3.5, <><Clip src="d115.mp4" /><Portada pre="ANTES DE COMPRAR UN LOTE" t="Pide el título de propiedad" /></>],
				[3.5, 9.03, <><Clip src={B('luis_0111')} audio /><Chip>EN EL DORADO</Chip><Cita t="Lotes con título de propiedad independizado, agua, luz en cada lote" /></>],
				[9.03, 13, <><Clip src="obra_6309.mp4" /><Chip>AGUA Y LUZ</Chip><Abajo t="Agua y luz en cada lote" /></>],
				[13, 17, <><Clip src="d117.mp4" /><Chip>CONÓCELO</Chip><Abajo t="Visita guiada o reunión en la oficina" /></>],
				[17, 22, <CierreReel />],
			]}
		/>
	</AbsoluteFill>
);

/* ───────── CARRUSEL 16 — «5 señales de un buen proyecto» ───────── */
const SENALES = [
	{t: 'Título de propiedad', d: 'Pregunta si está independizado.', e: 'Título de propiedad independizado'},
	{t: 'Agua y luz', d: 'Confirma qué servicios tiene cada lote.', e: 'Agua y luz en cada lote'},
	{t: 'Ubicación clara', d: 'Que puedas llegar y ubicarlo fácil.', e: 'Chorrillos km 5, al costado del circuito de manejo'},
	{t: 'Puedes visitarlo', d: 'Conócelo antes de decidir.', e: 'Visita guiada o reunión en la oficina'},
	{t: 'Financiamiento claro', d: 'Pide todo por escrito y sin letra chica.', e: 'Inicial S/ 5,000 · hasta 3 años · cero intereses'},
];
export const N_CARRUSEL16 = SENALES.length + 2;
export const Carrusel16: React.FC = () => {
	const f = useCurrentFrame();
	const barra = <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />;
	if (f === 0) return <Portada1 img="d117_6.jpg" etiqueta="Compra con seguridad" titulo="5 señales de un buen proyecto" sub="Revísalas antes de decidir · Desliza →" n={N_CARRUSEL16} />;
	if (f === N_CARRUSEL16 - 1) return <CierreCarrusel total={N_CARRUSEL16} titulo="Conoce El Dorado" />;
	const s = SENALES[f - 1];
	return (
		<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
			{barra}
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 280, color: DORADO, lineHeight: 0.95}}>{f}</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 100, color: AZUL_OSCURO, lineHeight: 1.04, marginTop: 16}}>{s.t}</div>
			<div style={{fontFamily: FUENTE, fontSize: 46, color: AZUL_OSCURO, opacity: 0.78, marginTop: 26, lineHeight: 1.3}}>{s.d}</div>
			<div style={{marginTop: 50, background: AZUL_OSCURO, borderRadius: 24, padding: '30px 36px'}}>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 28, letterSpacing: 4, color: DORADO}}>EN EL DORADO ✔</div>
				<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 44, color: 'white', marginTop: 10, lineHeight: 1.2}}>{s.e}</div>
			</div>
			<Pie n={f + 1} total={N_CARRUSEL16} />
		</AbsoluteFill>
	);
};

/* ───────── CARRUSEL 17 — «4 planes para tu fin de semana» (renders) ───────── */
const PLANES = [
	{img: 'render_1_13_parrillas.jpg', t: 'Parrilla en familia', d: 'Parque de parrillas.'},
	{img: 'render_1_9_infantil.jpg', t: 'Juegos para los niños', d: 'Parque infantil.'},
	{img: 'render_1_11_deportivo.jpg', t: 'Deporte al aire libre', d: 'Boulevard deportivo.'},
	{img: 'render_1_16_boulevard.jpg', t: 'Un paseo tranquilo', d: 'Boulevard.'},
];
export const N_CARRUSEL17 = PLANES.length + 2;
export const Carrusel17: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0) return <Portada1 img="render_1_34_aereo.jpg" etiqueta="El Dorado · Puerto Maldonado" titulo="4 planes para tu fin de semana" sub="Parques y áreas recreativas · Desliza →" n={N_CARRUSEL17} refer />;
	if (f === N_CARRUSEL17 - 1) return <CierreCarrusel total={N_CARRUSEL17} titulo="Conoce El Dorado" />;
	const p = PLANES[f - 1];
	return <Lamina img={p.img} t={p.t} d={p.d} n={f + 1} total={N_CARRUSEL17} refer />;
};

/* ───────── CARRUSEL 18 — «Preparando las pistas» (fotos reales de obra) ───────── */
const OBRA = [
	{img: 'obra_fotos/obra_6309.jpg', t: 'Motoniveladora en la calle', d: 'Trabajos en El Dorado.'},
	{img: 'obra_fotos/obra_6591.jpg', t: 'Trabajo en las vías', d: 'Maquinaria en el terreno.'},
	{img: 'obra_fotos/obra_6593.jpg', t: 'Volquete y maquinaria', d: 'Más trabajos en obra.'},
];
export const N_CARRUSEL18 = OBRA.length + 3;
export const Carrusel18: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0) return <Portada1 img="obra_fotos/obra_6591.jpg" etiqueta="Fotos reales de obra" titulo="Así se trabajan las pistas" sub="El Dorado · Desliza →" n={N_CARRUSEL18} />;
	if (f === N_CARRUSEL18 - 1) return <CierreCarrusel total={N_CARRUSEL18} titulo="Visítalo con nosotros" />;
	if (f === N_CARRUSEL18 - 2)
		return (
			<AbsoluteFill style={{background: AZUL_OSCURO, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: DORADO}}>TU LOTE SE ENTREGA CON</div>
				<Check texto="Pistas mejoradas" />
				<Check texto="Agua y luz" />
				<Check texto="Parques y áreas recreativas" />
				<Check texto="Título de propiedad" />
				<Pie n={f + 1} total={N_CARRUSEL18} claro />
			</AbsoluteFill>
		);
	const p = OBRA[f - 1];
	return <Lamina img={p.img} t={p.t} d={p.d} n={f + 1} total={N_CARRUSEL18} />;
};

/* ───────── HISTORIAS ───────── */
export const Historia16: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.6} />
		<Tomas tomas={[[0, 5, <Clip src="obra_6591.mp4" />], [5, 10, <Clip src="obra_6594.mp4" />]]} />
		<Chip>EN OBRA</Chip>
		<CtaH t="Pistas mejoradas" sub="Se entregan junto con tu lote" />
	</AbsoluteFill>
);
export const Historia17: React.FC = () => (
	<AbsoluteFill style={{background: AZUL_OSCURO}}>
		<Musica volumen={0.6} />
		<Tomas tomas={[[0, 5, <VideoHorizontal src="clip_parrillas.mp4" top={650} />], [5, 10, <VideoHorizontal src="clip_infantil.mp4" top={650} />]]} />
		<Chip top={220}>PARQUES Y ÁREAS RECREATIVAS</Chip>
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260, textAlign: 'center'}}>
			<Texto size={96}>Para toda la familia</Texto>
			<div style={{...useEntrada(20), marginTop: 40, fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: AZUL_OSCURO, background: 'white', padding: '24px 56px', borderRadius: 60}}>WhatsApp {DATOS.whatsapp}</div>
		</AbsoluteFill>
	</AbsoluteFill>
);
export const Historia18: React.FC = () => (
	<AbsoluteFill>
		<Img src={staticFile('obra_fotos/d115_dron.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(6px) brightness(0.75)', transform: 'scale(1.05)'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.88) 0%, rgba(14,22,82,0.4) 50%, rgba(14,22,82,0.88) 100%)'}} />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 200, textAlign: 'center'}}>
			<Logo size={150} />
			<div style={{marginTop: 30}}><Etiqueta>Quiz · El Dorado</Etiqueta></div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 92, color: 'white', lineHeight: 1.06, marginTop: 60, padding: '0 70px'}}>¿Hasta cuántos años puedes pagar tu lote?</div>
			<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 30}}>Elige tu respuesta 👇</div>
		</AbsoluteFill>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FUENTE, fontSize: 34, fontWeight: 700, color: 'white', opacity: 0.85}}>Grupo Vivencia · WhatsApp {DATOS.whatsapp}</div>
	</AbsoluteFill>
);
