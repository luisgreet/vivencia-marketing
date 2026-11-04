import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AZUL, AZUL_OSCURO, CREMA, DATOS, DORADO, Etiqueta, FUENTE, Logo, Musica, Referencial, useEntrada} from './marca';
import {TIEMPOS6, SUBS6, FIN_VOZ6} from './tiempos6';
import {CierreCarrusel, CierreReel, DronVertical, Pie, Sub, Subtitulos, Texto} from './Semana';

const T = (s: number) => Math.round(s * 30);

/* ───────────── piezas comunes ───────────── */
const Chip: React.FC<{children: React.ReactNode; top?: number}> = ({children, top = 170}) => (
	<AbsoluteFill style={{alignItems: 'center', paddingTop: top}}>
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 30, letterSpacing: 4, color: AZUL_OSCURO, background: DORADO, padding: '12px 26px', borderRadius: 10}}>{children}</div>
	</AbsoluteFill>
);

const Media: React.FC<{src: string; desde?: number; pos?: string; zoom?: boolean}> = ({src, desde = 0, pos = 'center', zoom}) => {
	const f = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const esVideo = src.endsWith('.mp4');
	const escala = zoom ? interpolate(f, [0, durationInFrames], [1.04, 1.14]) : 1;
	const estilo: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${escala})`};
	return esVideo ? <OffthreadVideo src={staticFile(src)} startFrom={desde} muted style={estilo} /> : <Img src={staticFile(src)} style={estilo} />;
};

// Pantalla partida: arriba HOY (real), abajo ASÍ SERÁ (render). Sirve para 1080×1920 y 1080×1350.
const Partida: React.FC<{hoy: string; hoyDesde?: number; sera: string; titulo?: string; posHoy?: string; posSera?: string}> = ({hoy, hoyDesde, sera, titulo, posHoy, posSera}) => (
	<AbsoluteFill style={{background: AZUL_OSCURO}}>
		<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: '50%', overflow: 'hidden'}}>
			<Media src={hoy} desde={hoyDesde} pos={posHoy} />
			<div style={{position: 'absolute', left: 40, top: 40, fontFamily: FUENTE, fontWeight: 800, fontSize: 34, letterSpacing: 4, color: AZUL_OSCURO, background: 'white', padding: '10px 22px', borderRadius: 10}}>HOY</div>
		</div>
		<div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', overflow: 'hidden'}}>
			<Media src={sera} pos={posSera} zoom />
			<div style={{position: 'absolute', left: 40, bottom: 40, fontFamily: FUENTE, fontWeight: 800, fontSize: 34, letterSpacing: 4, color: AZUL_OSCURO, background: DORADO, padding: '10px 22px', borderRadius: 10}}>ASÍ SERÁ</div>
			<Referencial style={{right: 28, bottom: 48}} />
		</div>
		<div style={{position: 'absolute', top: 'calc(50% - 4px)', left: 0, right: 0, height: 8, background: DORADO}} />
		{titulo ? (
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 56, color: AZUL_OSCURO, background: 'white', padding: '14px 34px', borderRadius: 16, boxShadow: '0 10px 30px rgba(0,0,0,0.3)'}}>{titulo}</div>
			</AbsoluteFill>
		) : null}
	</AbsoluteFill>
);

type Toma = [number, number, React.ReactNode];
const Tomas: React.FC<{tomas: Toma[]}> = ({tomas}) => (
	<>
		{tomas.map(([a, b, n], i) => (
			<Sequence key={i} from={T(a)} durationInFrames={T(b) - T(a)}>
				{n}
			</Sequence>
		))}
	</>
);

/* ───────────── REEL 4 — «Así avanza El Dorado» (obra real) ───────────── */
const SUBS4: Sub[] = [
	[0.27, 1.33, 'Así avanza El Dorado,'],
	[1.33, 3.62, 'máquinas trabajando en las calles,'],
	[3.62, 5.12, 'así se forman las pistas'],
	[5.12, 6.91, 'y así se ve hoy desde el aire.'],
	[6.91, 8.81, 'Lotes desde S/ 35,000.'],
	[8.81, 10.88, 'Escríbenos al WhatsApp'],
	[10.88, 13.8, '982 825 054'],
];
export const DUR_REEL4 = T(16);
export const Reel4: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(13.8)} />
		<Audio src={staticFile('voz-reel-4.mp3')} />
		<Tomas
			tomas={[
				[0, 1.33, <><Media src="obra_6593.mp4" /><AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.75), rgba(14,22,82,0) 45%)'}} /><AbsoluteFill style={{padding: '280px 80px 0'}}><Texto size={120}>Así avanza El Dorado</Texto></AbsoluteFill></>],
				[1.33, 2.3, <Media src="obra_6591.mp4" />],
				[2.3, 3.62, <Media src="obra_6594.mp4" />],
				[3.62, 4.4, <Media src="obra_0098.mp4" />],
				[4.4, 5.12, <Media src="obra_6311.mp4" />],
				[5.12, 6.91, <DronVertical src="d117.mp4" />],
				[6.91, 8.81, <><Media src="obra_0096.mp4" /><AbsoluteFill style={{background: 'rgba(14,22,82,0.45)'}} /><AbsoluteFill style={{justifyContent: 'center', padding: '0 80px'}}><Texto size={64}>Lotes desde</Texto><Texto size={170} color={DORADO} style={{textShadow: 'none'}}>{DATOS.precio}</Texto></AbsoluteFill></>],
				[8.81, 16, <CierreReel />],
			]}
		/>
		<Sequence durationInFrames={T(6.91)}>
			<Chip top={150}>AVANCE REAL · CHORRILLOS KM 5</Chip>
		</Sequence>
		<Subtitulos subs={SUBS4} />
	</AbsoluteFill>
);

/* ───────────── REEL 5 — «Hoy y así será» (real vs. render) ───────────── */
const SUBS5: Sub[] = [
	[0.53, 3.43, 'Así está El Dorado hoy…'],
	[3.43, 5.93, '…y así será.'],
	[5.93, 7.93, 'Las calles.'],
	[7.93, 10.08, 'Las áreas verdes.'],
	[10.08, 12.68, 'Y toda la lotización.'],
	[12.68, 15.37, 'Lotes desde S/ 35,000.'],
	[15.37, 16.53, 'Escríbenos al WhatsApp'],
	[16.53, 19.6, '982 825 054'],
];
export const DUR_REEL5 = T(22);
export const Reel5: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(19.6)} />
		<Audio src={staticFile('voz-reel-5.mp3')} />
		<Tomas
			tomas={[
				[0, 3.43, <><DronVertical src="d117.mp4" /><Chip>HOY</Chip></>],
				[3.43, 5.93, <><Media src="render_1_34_aereo.jpg" zoom pos="45% center" /><Chip>ASÍ SERÁ</Chip><Referencial style={{right: 30, top: 240}} /></>],
				[5.93, 7.93, <Partida hoy="d115.mp4" sera="render_1_6_pistas.jpg" posSera="40% center" />],
				[7.93, 10.08, <Partida hoy="dron.mp4" hoyDesde={T(14)} sera="render_1_8_parque.jpg" />],
				[10.08, 12.68, <Partida hoy="d117.mp4" hoyDesde={T(4)} sera="render_1_2_vista.jpg" />],
				[12.68, 22, <CierreReel />],
			]}
		/>
		<Subtitulos subs={SUBS5} />
	</AbsoluteFill>
);

/* ───────────── REEL 6 — «Preguntas rápidas sobre El Dorado» ───────────── */
// [inicio pregunta, inicio respuesta, fin] en segundos — sacados de voz-reel-6.mp3
export const PREGUNTAS = [
	{q: '¿Dónde queda?', r: 'Chorrillos km 5, Puerto Maldonado', bg: 'd117.mp4', desde: 0},
	{q: '¿Desde cuánto?', r: `Desde ${DATOS.precio}`, bg: 'render_1_4_ingreso.jpg', desde: 0, ref: true},
	{q: '¿Cuánto es la inicial?', r: DATOS.inicial, bg: 'd115.mp4', desde: 0},
	{q: '¿En cuánto tiempo pago?', r: 'Hasta en 3 años', bg: 'dron.mp4', desde: T(10)},
	{q: '¿Qué incluye?', r: 'Agua, luz, parques, áreas recreativas, pistas mejoradas y título de propiedad', bg: 'render_1_9_infantil.jpg', desde: 0, ref: true},
];
const Pregunta: React.FC<{i: number; respuestaEn: number}> = ({i, respuestaEn}) => {
	const p = PREGUNTAS[i];
	const largo = p.r.length > 30;
	return (
		<AbsoluteFill>
			<Media src={p.bg} desde={p.desde} zoom={!p.bg.endsWith('.mp4')} pos="40% center" />
			<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.8) 0%, rgba(14,22,82,0.35) 45%, rgba(14,22,82,0.8) 100%)'}} />
			{p.ref ? <Referencial style={{right: 30, top: 40}} /> : null}
			<AbsoluteFill style={{padding: '250px 80px 0'}}>
				<Texto size={34} color={DORADO} style={{letterSpacing: 5}}>
					PREGUNTA {i + 1} DE {PREGUNTAS.length}
				</Texto>
				<Texto size={112} retraso={3} style={{marginTop: 16}}>
					{p.q}
				</Texto>
			</AbsoluteFill>
			<Sequence from={respuestaEn}>
				<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center', padding: '300px 70px 0'}}>
					<div style={{...useEntrada(0), fontFamily: FUENTE, fontWeight: 800, fontSize: largo ? 58 : 96, lineHeight: 1.15, color: AZUL_OSCURO, background: DORADO, padding: '30px 44px', borderRadius: 24, textAlign: 'center', boxShadow: '0 16px 50px rgba(0,0,0,0.35)'}}>{p.r}</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
export const DUR_REEL6 = T(FIN_VOZ6 + 2.5);
export const Reel6: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(FIN_VOZ6)} />
		<Audio src={staticFile('voz-reel-6.mp3')} />
		<Sequence durationInFrames={T(TIEMPOS6[0][0])}>
			<DronVertical src="d117.mp4" desde={T(5)} oscuro />
			<AbsoluteFill style={{justifyContent: 'center', padding: '0 80px'}}>
				<Texto size={120}>Preguntas rápidas sobre El Dorado</Texto>
			</AbsoluteFill>
		</Sequence>
		{TIEMPOS6.map(([a, r, b], i) => (
			<Sequence key={i} from={T(a)} durationInFrames={T(b) - T(a)}>
				<Pregunta i={i} respuestaEn={T(r) - T(a)} />
			</Sequence>
		))}
		<Sequence from={T(TIEMPOS6[4][2])}>
			<CierreReel />
		</Sequence>
		<Subtitulos subs={SUBS6} />
	</AbsoluteFill>
);

/* ───────────── CARRUSEL 4 — «Preguntas frecuentes» ───────────── */
export const N_CARRUSEL4 = PREGUNTAS.length + 2;
export const Carrusel4: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0)
		return (
			<AbsoluteFill>
				<Img src={staticFile('render_1_34_aereo.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '45% center'}} />
				<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.1) 20%, rgba(14,22,82,0.94) 80%)'}} />
				<Referencial style={{right: 28, top: 24}} />
				<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 150px'}}>
					<Etiqueta>El Dorado · Puerto Maldonado</Etiqueta>
					<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 112, color: 'white', lineHeight: 1.03, marginTop: 28}}>Preguntas frecuentes</div>
					<div style={{fontFamily: FUENTE, fontSize: 40, color: CREMA, marginTop: 22}}>Las 5 que más nos hacen · Desliza →</div>
				</AbsoluteFill>
				<Pie n={1} total={N_CARRUSEL4} claro />
			</AbsoluteFill>
		);
	if (f === N_CARRUSEL4 - 1) return <CierreCarrusel total={N_CARRUSEL4} titulo="¿Más dudas? Escríbenos" />;
	const p = PREGUNTAS[f - 1];
	return (
		<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />
			<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: AZUL}}>PREGUNTA {f} DE {PREGUNTAS.length}</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 96, color: AZUL_OSCURO, lineHeight: 1.05, marginTop: 24}}>{p.q}</div>
			<div style={{marginTop: 60, background: AZUL_OSCURO, borderRadius: 28, padding: '44px 50px'}}>
				<div style={{fontFamily: FUENTE, fontSize: 30, fontWeight: 800, letterSpacing: 5, color: DORADO}}>RESPUESTA</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: p.r.length > 30 ? 52 : 80, color: 'white', lineHeight: 1.15, marginTop: 14}}>{p.r}</div>
			</div>
			<Pie n={f + 1} total={N_CARRUSEL4} />
		</AbsoluteFill>
	);
};

/* ───────────── CARRUSEL 5 — «Hoy y así será» ───────────── */
const PARES = [
	{t: 'Vista general', hoy: 'd117_6.jpg', sera: 'render_1_34_aereo.jpg', posSera: '45% center'},
	{t: 'Las calles', hoy: 'd115_3.jpg', sera: 'render_1_6_pistas.jpg', posSera: '40% center'},
	{t: 'Áreas verdes', hoy: 'dron_14.jpg', sera: 'render_1_8_parque.jpg'},
	{t: 'Trabajos en las calles', hoy: 'obra_0098.jpg', sera: 'render_1_16_boulevard.jpg', posHoy: 'center 70%'},
];
export const N_CARRUSEL5 = PARES.length + 2;
export const Carrusel5: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0)
		return (
			<AbsoluteFill>
				<Partida hoy="d117_6.jpg" sera="render_1_34_aereo.jpg" posSera="45% center" />
				<AbsoluteFill style={{justifyContent: 'center', alignItems: 'center'}}>
					<div style={{background: AZUL_OSCURO, padding: '34px 56px', borderRadius: 26, textAlign: 'center', boxShadow: '0 16px 50px rgba(0,0,0,0.4)'}}>
						<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 28, letterSpacing: 5, color: DORADO}}>EL DORADO</div>
						<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 92, color: 'white', lineHeight: 1.05, marginTop: 8}}>Hoy y así será</div>
						<div style={{fontFamily: FUENTE, fontSize: 34, color: CREMA, marginTop: 10}}>Desliza →</div>
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		);
	if (f === N_CARRUSEL5 - 1) return <CierreCarrusel total={N_CARRUSEL5} titulo="Asegura tu lote hoy" />;
	const p = PARES[f - 1];
	return (
		<AbsoluteFill>
			<Partida hoy={p.hoy} sera={p.sera} titulo={p.t} posHoy={p.posHoy} posSera={p.posSera} />
			<div style={{position: 'absolute', top: 24, right: 30, fontFamily: FUENTE, fontWeight: 800, fontSize: 26, color: 'white', textShadow: '0 1px 6px rgba(0,0,0,0.6)'}}>
				{f + 1}/{N_CARRUSEL5}
			</div>
		</AbsoluteFill>
	);
};

/* ───────────── CARRUSEL 6 — «Antes de comprar un lote, revisa esto» ───────────── */
const CONSEJOS = [
	{t: 'Que tenga título de propiedad', d: 'Es lo que te asegura que el lote es tuyo.'},
	{t: 'Que tenga agua y luz', d: 'Pregunta qué servicios incluye tu lote.'},
	{t: 'Que las condiciones de pago estén claras', d: 'Cuánto es la inicial y en cuánto tiempo pagas.'},
];
export const N_CARRUSEL6 = CONSEJOS.length + 3;
const Check: React.FC<{texto: string}> = ({texto}) => (
	<div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 30}}>
		<svg width="58" height="58" viewBox="0 0 58 58">
			<circle cx="29" cy="29" r="29" fill={DORADO} />
			<path d="M16 30 L25 39 L43 20" stroke={AZUL_OSCURO} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
		<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 50, color: 'white'}}>{texto}</div>
	</div>
);
export const Carrusel6: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0)
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: AZUL}}>GUÍA RÁPIDA</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 118, color: AZUL_OSCURO, lineHeight: 1.02, marginTop: 20}}>Antes de comprar un lote, revisa esto</div>
				<div style={{fontFamily: FUENTE, fontSize: 44, color: AZUL_OSCURO, opacity: 0.75, marginTop: 34}}>3 cosas que no pueden faltar →</div>
				<Pie n={1} total={N_CARRUSEL6} />
			</AbsoluteFill>
		);
	if (f <= CONSEJOS.length) {
		const c = CONSEJOS[f - 1];
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 340, color: DORADO, lineHeight: 0.95}}>{f}</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 100, color: AZUL_OSCURO, lineHeight: 1.04, marginTop: 20}}>{c.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 46, color: AZUL_OSCURO, opacity: 0.78, marginTop: 30, lineHeight: 1.3}}>{c.d}</div>
				<Pie n={f + 1} total={N_CARRUSEL6} />
			</AbsoluteFill>
		);
	}
	if (f === CONSEJOS.length + 1)
		return (
			<AbsoluteFill style={{background: AZUL_OSCURO, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: DORADO}}>EN EL DORADO</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 92, color: 'white', lineHeight: 1.05, marginTop: 16, marginBottom: 20}}>Así es tu lote</div>
				<Check texto="Título de propiedad" />
				<Check texto="Agua y luz" />
				<Check texto={`Inicial ${DATOS.inicial}`} />
				<Check texto="Hasta 3 años para pagar" />
				<Pie n={f + 1} total={N_CARRUSEL6} claro />
			</AbsoluteFill>
		);
	return <CierreCarrusel total={N_CARRUSEL6} />;
};

/* ───────────── HISTORIA 4 — Quiz (lámina fija) ───────────── */
export const Historia4: React.FC = () => (
	<AbsoluteFill>
		<Img src={staticFile('render_1_9_infantil.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% center', filter: 'blur(6px) brightness(0.75)', transform: 'scale(1.05)'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.88) 0%, rgba(14,22,82,0.4) 50%, rgba(14,22,82,0.88) 100%)'}} />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 200, textAlign: 'center'}}>
			<Logo size={150} />
			<div style={{marginTop: 30}}>
				<Etiqueta>Quiz · El Dorado</Etiqueta>
			</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 100, color: 'white', lineHeight: 1.06, marginTop: 60, padding: '0 70px'}}>¿Cuánto es la inicial para tu lote en El Dorado?</div>
			<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 30}}>Adivina aquí abajo 👇</div>
		</AbsoluteFill>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FUENTE, fontSize: 34, fontWeight: 700, color: 'white', opacity: 0.85}}>
			Grupo Vivencia · WhatsApp {DATOS.whatsapp}
		</div>
	</AbsoluteFill>
);

/* ───────────── HISTORIA 5 — Avance de obra (10 s) ───────────── */
export const Historia5: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica />
		<Tomas
			tomas={[
				[0, 2.5, <Media src="obra_6593.mp4" />],
				[2.5, 5, <Media src="obra_6394.mp4" />],
				[5, 7.5, <Media src="obra_0098.mp4" />],
				[7.5, 10, <Media src="obra_6311.mp4" />],
			]}
		/>
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.7) 0%, rgba(14,22,82,0) 35%, rgba(14,22,82,0) 55%, rgba(14,22,82,0.85) 100%)'}} />
		<Chip top={170}>AVANCE REAL</Chip>
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260, textAlign: 'center'}}>
			<Texto size={110}>Así avanza El Dorado</Texto>
			<Texto size={46} peso={600} color={CREMA} retraso={10} style={{marginTop: 18}}>
				{DATOS.ubicacion}
			</Texto>
			<div style={{...useEntrada(24), marginTop: 50, fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: AZUL_OSCURO, background: 'white', padding: '24px 56px', borderRadius: 60}}>WhatsApp {DATOS.whatsapp}</div>
		</AbsoluteFill>
	</AbsoluteFill>
);

/* ───────────── HISTORIA 6 — Caja de preguntas (lámina fija) ───────────── */
export const Historia6: React.FC = () => (
	<AbsoluteFill>
		<Img src={staticFile('d117_6.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.9) 0%, rgba(14,22,82,0.55) 50%, rgba(14,22,82,0.9) 100%)'}} />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 200, textAlign: 'center'}}>
			<Logo size={150} />
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 108, color: 'white', lineHeight: 1.05, marginTop: 70, padding: '0 70px'}}>¿Tienes dudas sobre El Dorado?</div>
			<div style={{fontFamily: FUENTE, fontSize: 48, fontWeight: 700, color: DORADO, marginTop: 30}}>Pregúntanos aquí 👇</div>
		</AbsoluteFill>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FUENTE, fontSize: 34, fontWeight: 700, color: 'white', opacity: 0.85}}>
			O escríbenos al WhatsApp {DATOS.whatsapp}
		</div>
	</AbsoluteFill>
);
