import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {AZUL, AZUL_OSCURO, CREMA, DATOS, DORADO, Etiqueta, FUENTE, Logo, Musica, Referencial, useEntrada, VideoHorizontal} from './marca';

const T = (s: number) => Math.round(s * 30);

export type Sub = [number, number, string];
export const Subtitulos: React.FC<{subs: Sub[]}> = ({subs}) => {
	const f = useCurrentFrame();
	const t = f / 30;
	const s = subs.find(([a, b]) => t >= a && t < b);
	if (!s) return null;
	const local = f - Math.round(s[0] * 30);
	const pop = Math.min(1, 0.9 + local * 0.025);
	return (
		<AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 1560}}>
			<div style={{transform: `scale(${pop})`, fontFamily: FUENTE, fontWeight: 800, fontSize: 54, color: 'white', background: 'rgba(14,22,82,0.82)', padding: '14px 30px', borderRadius: 18, maxWidth: 900, textAlign: 'center'}}>
				{s[2]}
			</div>
		</AbsoluteFill>
	);
};
const VERDE_WA = '#25D366';

export const Texto: React.FC<{size: number; color?: string; peso?: number; retraso?: number; style?: React.CSSProperties; children: React.ReactNode}> = ({
	size,
	color = 'white',
	peso = 800,
	retraso = 0,
	style,
	children,
}) => (
	<div style={{...useEntrada(retraso), fontFamily: FUENTE, fontWeight: peso, fontSize: size, color, lineHeight: 1.06, textShadow: color === 'white' ? '0 4px 28px rgba(0,0,0,0.45)' : undefined, ...style}}>
		{children}
	</div>
);

export const DronVertical: React.FC<{src: string; desde?: number; oscuro?: boolean}> = ({src, desde = 0, oscuro}) => (
	<AbsoluteFill>
		<OffthreadVideo src={staticFile(src)} startFrom={desde} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
		<AbsoluteFill
			style={{
				background: oscuro
					? 'linear-gradient(180deg, rgba(14,22,82,0.75) 0%, rgba(14,22,82,0.25) 40%, rgba(14,22,82,0.85) 100%)'
					: 'linear-gradient(180deg, rgba(14,22,82,0.55) 0%, rgba(14,22,82,0) 40%)',
			}}
		/>
	</AbsoluteFill>
);

// Cierre común de los reels: precio, condiciones, logo y WhatsApp.
export const CierreReel = () => (
	<AbsoluteFill style={{background: CREMA, alignItems: 'center', justifyContent: 'center', gap: 34, textAlign: 'center'}}>
		<div style={useEntrada(0)}>
			<Logo size={300} />
		</div>
		<Texto size={92} color={AZUL_OSCURO} retraso={6}>
			Desde <span style={{color: '#C8901F'}}>{DATOS.precio}</span>
		</Texto>
		<Texto size={46} color={AZUL_OSCURO} peso={600} retraso={12}>
			Inicial {DATOS.inicial} · {DATOS.plazo}
		</Texto>
		<div style={{...useEntrada(18), fontFamily: FUENTE, fontWeight: 800, fontSize: 52, color: 'white', background: VERDE_WA, padding: '26px 50px', borderRadius: 60}}>
			WhatsApp {DATOS.whatsapp}
		</div>
		<Texto size={36} color={AZUL_OSCURO} peso={500} retraso={24} style={{opacity: 0.75}}>
			{DATOS.ubicacion}
		</Texto>
	</AbsoluteFill>
);

/* ───────────── REEL 2 — «Así se vive en El Dorado» (recorrido de renders) ───────────── */
// Tiempos (s) sacados de la voz voz-reel-2.mp3
const TOMAS = [
	{clip: 'clip_ingreso.mp4', t: 'Ingreso', a: 2.2, b: 3.9},
	{clip: 'clip_comercial.mp4', t: 'Boulevard comercial', a: 3.9, b: 6.28},
	{clip: 'clip_parrillas.mp4', t: 'Parque de parrillas', a: 6.28, b: 8.59},
	{clip: 'clip_infantil.mp4', t: 'Parque infantil', a: 8.59, b: 10.64},
	{clip: 'clip_deportivo.mp4', t: 'Boulevard deportivo', a: 10.64, b: 12.4},
];
const SUBS2: Sub[] = [
	[0.18, 2.2, 'Así se vive en El Dorado'],
	[2.2, 3.43, 'El ingreso,'],
	[3.43, 6.28, 'el boulevard comercial,'],
	[6.28, 8.59, 'el parque de parrillas,'],
	[8.59, 10.64, 'el parque infantil'],
	[10.64, 12.0, 'y el boulevard deportivo.'],
	[12.0, 15.0, 'Lotes desde S/ 35,000.'],
	[15.0, 18.0, 'Escríbenos al WhatsApp'],
	[18.0, 21.8, '982 825 054'],
];
const Toma: React.FC<{clip: string; t: string; i: number; a?: number; b?: number}> = ({clip, t, i}) => (
	<AbsoluteFill>
		<VideoHorizontal src={clip} top={560} />
		<AbsoluteFill style={{padding: '1240px 80px 0'}}>
			<Texto size={34} color={DORADO} retraso={2} style={{letterSpacing: 5}}>
				0{i + 1} / 0{TOMAS.length}
			</Texto>
			<Texto size={96} retraso={5} style={{marginTop: 14}}>
				{t}
			</Texto>
		</AbsoluteFill>
	</AbsoluteFill>
);
export const DUR_REEL2 = T(24);
export const Reel2: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(21.8)} />
		<Audio src={staticFile('voz-reel-2.mp3')} />
		<Sequence durationInFrames={T(2.2)}>
			<DronVertical src="d117.mp4" />
			<AbsoluteFill style={{padding: '230px 80px 0'}}>
				<Texto size={44} color={DORADO} style={{letterSpacing: 4}}>
					EL DORADO · PUERTO MALDONADO
				</Texto>
				<Texto size={118} retraso={4} style={{marginTop: 20}}>
					Así se vive en El Dorado
				</Texto>
			</AbsoluteFill>
		</Sequence>
		{TOMAS.map((m, i) => (
			<Sequence key={m.t} from={T(m.a)} durationInFrames={T(m.b) - T(m.a)}>
				<Toma {...m} i={i} />
			</Sequence>
		))}
		<Sequence from={T(12.4)}>
			<CierreReel />
		</Sequence>
		<Subtitulos subs={SUBS2} />
	</AbsoluteFill>
);

/* ───────────── REEL 3 — «3 razones para invertir en El Dorado» ───────────── */
const RAZONES = [
	{src: 'd117.mp4', desde: 0, t: 'Título de propiedad', d: 'Tu lote se entrega con título.'},
	{src: 'd115.mp4', desde: 0, t: `Inicial de ${DATOS.inicial.replace(" ", "\u00a0")}`, d: 'Y hasta 3 años para pagar.'},
	{src: 'dron.mp4', desde: T(14), t: 'Agua, luz y áreas recreativas', d: 'Además de parques y pistas mejoradas.'},
];
// Tiempos (s) sacados de la voz voz-reel-3.mp3
const TIEMPOS3 = [3.3, 5.88, 11.04, 14.32];
const SUBS3: Sub[] = [
	[0, 3.3, 'Tres razones para invertir en El Dorado.'],
	[3.3, 5.88, 'Uno: tu lote se entrega con título de propiedad.'],
	[5.88, 9.62, 'Dos: separa con una inicial de S/ 5,000'],
	[9.62, 11.04, 'y paga hasta en 3 años.'],
	[11.04, 14.32, 'Tres: agua, luz y áreas recreativas.'],
	[14.32, 16.1, 'Escríbenos al WhatsApp'],
	[16.1, 19.8, '982 825 054'],
];
const Razon: React.FC<{src: string; desde: number; t: string; d: string; i: number}> = ({src, desde, t, d, i}) => (
	<AbsoluteFill>
		<DronVertical src={src} desde={desde} oscuro />
		<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 470px'}}>
			<Texto size={300} color={DORADO} style={{lineHeight: 0.9, textShadow: 'none'}}>
				{i + 1}
			</Texto>
			<Texto size={104} retraso={6} style={{marginTop: 10}}>
				{t}
			</Texto>
			<Texto size={50} peso={600} color={CREMA} retraso={14} style={{marginTop: 22}}>
				{d}
			</Texto>
		</AbsoluteFill>
	</AbsoluteFill>
);
export const DUR_REEL3 = T(22);
export const Reel3: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(19.8)} />
		<Audio src={staticFile('voz-reel-3.mp3')} />
		<Sequence durationInFrames={T(TIEMPOS3[0])}>
			<DronVertical src="dron.mp4" desde={T(2)} oscuro />
			<AbsoluteFill style={{justifyContent: 'center', padding: '0 80px'}}>
				<Texto size={250} color={DORADO} style={{lineHeight: 0.9, textShadow: 'none'}}>
					3
				</Texto>
				<Texto size={110} retraso={5}>
					razones para invertir en El Dorado
				</Texto>
			</AbsoluteFill>
		</Sequence>
		{RAZONES.map((r, i) => (
			<Sequence key={r.t} from={T(TIEMPOS3[i])} durationInFrames={T(TIEMPOS3[i + 1]) - T(TIEMPOS3[i])}>
				<Razon {...r} i={i} />
			</Sequence>
		))}
		<Sequence from={T(TIEMPOS3[3])}>
			<CierreReel />
		</Sequence>
		<Subtitulos subs={SUBS3} />
	</AbsoluteFill>
);

/* ───────────── Piezas comunes de carrusel (1080×1350) ───────────── */
export const Pie: React.FC<{n: number; total: number; claro?: boolean}> = ({n, total, claro}) => (
	<div
		style={{
			position: 'absolute',
			bottom: 50,
			left: 80,
			right: 80,
			display: 'flex',
			justifyContent: 'space-between',
			fontFamily: FUENTE,
			fontSize: 26,
			fontWeight: 700,
			letterSpacing: 3,
			color: claro ? 'white' : AZUL_OSCURO,
			opacity: 0.75,
		}}
	>
		<span>EL DORADO · GRUPO VIVENCIA</span>
		<span>
			{n}/{total}
		</span>
	</div>
);
export const PortadaFoto: React.FC<{foto: string; etiqueta: string; titulo: string; total: number; pos?: string}> = ({foto, etiqueta, titulo, total, pos = 'center'}) => (
	<AbsoluteFill>
		<Img src={staticFile(foto)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0) 30%, rgba(14,22,82,0.92) 85%)'}} />
		<Referencial style={{right: 28, top: 24}} />
		<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 150px'}}>
			<Etiqueta>{etiqueta}</Etiqueta>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 104, color: 'white', lineHeight: 1.03, marginTop: 28}}>{titulo}</div>
			<div style={{fontFamily: FUENTE, fontSize: 40, color: CREMA, marginTop: 22}}>Desliza →</div>
		</AbsoluteFill>
		<Pie n={1} total={total} claro />
	</AbsoluteFill>
);
export const CierreCarrusel: React.FC<{total: number; titulo?: string}> = ({total, titulo}) => (
	<AbsoluteFill style={{background: AZUL_OSCURO, alignItems: 'center', justifyContent: 'center', padding: 80, textAlign: 'center'}}>
		<Logo size={260} />
		{titulo ? <div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 64, color: 'white', marginTop: 50, lineHeight: 1.1}}>{titulo}</div> : null}
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 80, color: 'white', marginTop: titulo ? 24 : 56, lineHeight: 1.1}}>
			Desde <span style={{color: DORADO}}>{DATOS.precio}</span>
		</div>
		<div style={{fontFamily: FUENTE, fontSize: 42, color: CREMA, marginTop: 18}}>
			Inicial {DATOS.inicial} · {DATOS.plazo}
		</div>
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: 'white', background: VERDE_WA, padding: '24px 48px', borderRadius: 60, marginTop: 52}}>
			WhatsApp {DATOS.whatsapp}
		</div>
		<div style={{fontFamily: FUENTE, fontSize: 34, color: CREMA, opacity: 0.85, marginTop: 32}}>{DATOS.ubicacion}</div>
		<Pie n={total} total={total} claro />
	</AbsoluteFill>
);

/* ───────────── CARRUSEL 2 — «¿Cómo comprar tu lote en El Dorado?» ───────────── */
const PASOS = [
	{t: 'Elige tu lote', d: `Escríbenos al WhatsApp ${DATOS.whatsapp} y elige tu lote en El Dorado.`},
	{t: 'Separa con tu inicial', d: `Tu inicial es de ${DATOS.inicial}.`},
	{t: 'Paga hasta en 3 años', d: 'Financiamiento de hasta 3 años.'},
	{t: 'Recibe tu título', d: 'Tu lote se entrega con título de propiedad.'},
];
export const N_CARRUSEL2 = PASOS.length + 2;
const Paso: React.FC<{i: number}> = ({i}) => {
	const p = PASOS[i];
	return (
		<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />
			<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: AZUL}}>PASO {i + 1} DE {PASOS.length}</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 340, color: DORADO, lineHeight: 0.95, marginTop: 10}}>{i + 1}</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 104, color: AZUL_OSCURO, lineHeight: 1.04, marginTop: 20}}>{p.t}</div>
			<div style={{fontFamily: FUENTE, fontSize: 46, color: AZUL_OSCURO, opacity: 0.78, marginTop: 30, lineHeight: 1.3}}>{p.d}</div>
			{/* camino de puntos */}
			<div style={{position: 'absolute', top: 120, right: 90, display: 'flex', gap: 14}}>
				{PASOS.map((_, k) => (
					<div key={k} style={{width: k === i ? 56 : 18, height: 18, borderRadius: 9, background: k <= i ? AZUL : 'rgba(27,42,155,0.18)'}} />
				))}
			</div>
			<Pie n={i + 2} total={N_CARRUSEL2} />
		</AbsoluteFill>
	);
};
export const Carrusel2: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0) return <PortadaFoto foto="render_1_3_arco.jpg" etiqueta="El Dorado · Paso a paso" titulo="¿Cómo comprar tu lote en El Dorado?" total={N_CARRUSEL2} pos="30% center" />;
	if (f === N_CARRUSEL2 - 1) return <CierreCarrusel total={N_CARRUSEL2} titulo="Empieza hoy" />;
	return <Paso i={f - 1} />;
};

/* ───────────── CARRUSEL 3 — «Conoce El Dorado por dentro» ───────────── */
const LUGARES = [
	{foto: 'render_1_4_ingreso.jpg', t: 'Ingreso', d: 'La bienvenida a El Dorado.', pos: '8% center'},
	{foto: 'render_1_16_boulevard.jpg', t: 'Boulevard comercial', d: 'Áreas verdes a lo largo de la avenida.', pos: 'center'},
	{foto: 'render_1_13_parrillas.jpg', t: 'Parque de parrillas', d: 'Para compartir en familia.', pos: '30% center'},
	{foto: 'render_1_9_infantil.jpg', t: 'Parque infantil', d: 'Juegos para los más pequeños.', pos: '40% center'},
	{foto: 'render_1_11_deportivo.jpg', t: 'Boulevard deportivo', d: 'Máquinas para hacer ejercicio al aire libre.', pos: '40% center'},
];
export const N_CARRUSEL3 = LUGARES.length + 2;
const Lugar: React.FC<{i: number}> = ({i}) => {
	const l = LUGARES[i];
	return (
		<AbsoluteFill>
			<Img src={staticFile(l.foto)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: l.pos}} />
			<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0) 45%, rgba(14,22,82,0.9) 88%)'}} />
			<Referencial style={{right: 28, top: 24}} />
			<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 140px'}}>
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: DORADO}}>
					0{i + 1} / 0{LUGARES.length}
				</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 96, color: 'white', lineHeight: 1.04, marginTop: 14}}>{l.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 42, color: CREMA, marginTop: 18}}>{l.d}</div>
			</AbsoluteFill>
			<Pie n={i + 2} total={N_CARRUSEL3} claro />
		</AbsoluteFill>
	);
};
export const Carrusel3: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0)
		return (
			<AbsoluteFill>
				<Img src={staticFile('d117_6.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
				<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0) 30%, rgba(14,22,82,0.92) 85%)'}} />
				<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 150px'}}>
					<Etiqueta>Chorrillos km 5 · Puerto Maldonado</Etiqueta>
					<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 110, color: 'white', lineHeight: 1.03, marginTop: 28}}>Conoce El Dorado por dentro</div>
					<div style={{fontFamily: FUENTE, fontSize: 40, color: CREMA, marginTop: 22}}>Desliza →</div>
				</AbsoluteFill>
				<Pie n={1} total={N_CARRUSEL3} claro />
			</AbsoluteFill>
		);
	if (f === N_CARRUSEL3 - 1) return <CierreCarrusel total={N_CARRUSEL3} titulo={DATOS.ubicacion} />;
	return <Lugar i={f - 1} />;
};

/* ───────────── HISTORIA 1 — Encuesta (lámina fija, el sticker se pone en Instagram) ───────────── */
export const Historia1: React.FC = () => (
	<AbsoluteFill>
		<Img src={staticFile('render_1_8_parque.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% center', filter: 'blur(6px) brightness(0.75)', transform: 'scale(1.05)'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.85) 0%, rgba(14,22,82,0.35) 50%, rgba(14,22,82,0.85) 100%)'}} />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 200, textAlign: 'center'}}>
			<Logo size={150} />
			<div style={{marginTop: 30}}>
				<Etiqueta>El Dorado · Puerto Maldonado</Etiqueta>
			</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 118, color: 'white', lineHeight: 1.04, marginTop: 70, padding: '0 70px'}}>¿Qué buscas en un lote?</div>
			<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 30}}>Vota aquí abajo 👇</div>
		</AbsoluteFill>
		{/* espacio libre (y≈1000–1500) para el sticker de encuesta de Instagram */}
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FUENTE, fontSize: 34, fontWeight: 700, color: 'white', opacity: 0.85}}>
			Grupo Vivencia · WhatsApp {DATOS.whatsapp}
		</div>
	</AbsoluteFill>
);

/* ───────────── HISTORIA 3 — Ubicación (10 s) ───────────── */
export const Historia3: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica />
		<DronVertical src="d117.mp4" oscuro />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 170, textAlign: 'center'}}>
			<div style={useEntrada(0)}>
				<Logo size={150} />
			</div>
			<Texto size={40} color={DORADO} retraso={6} style={{marginTop: 34, letterSpacing: 5}}>
				¿DÓNDE QUEDA?
			</Texto>
		</AbsoluteFill>
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 280, textAlign: 'center'}}>
			<div style={useEntrada(12)}>
				<svg width="110" height="140" viewBox="0 0 110 140">
					<path d="M55 6 C28 6 8 26 8 52 C8 88 55 134 55 134 C55 134 102 88 102 52 C102 26 82 6 55 6 Z" fill={DORADO} />
					<circle cx="55" cy="52" r="18" fill={AZUL_OSCURO} />
				</svg>
			</div>
			<Texto size={120} retraso={18} style={{marginTop: 16}}>
				Chorrillos km 5
			</Texto>
			<Texto size={60} peso={600} color={CREMA} retraso={26} style={{marginTop: 10}}>
				Puerto Maldonado
			</Texto>
			<div style={{...useEntrada(40), marginTop: 60, fontFamily: FUENTE, fontWeight: 800, fontSize: 48, color: AZUL_OSCURO, background: 'white', padding: '26px 60px', borderRadius: 60}}>
				WhatsApp {DATOS.whatsapp}
			</div>
		</AbsoluteFill>
	</AbsoluteFill>
);
