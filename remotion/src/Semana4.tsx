import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig, interpolate} from 'remotion';
import {AZUL, AZUL_OSCURO, CREMA, DATOS, DORADO, Etiqueta, FUENTE, Logo, Musica, Referencial, useEntrada} from './marca';
import {CierreCarrusel, CierreReel, Pie, Sub, Subtitulos, Texto} from './Semana';

const T = (s: number) => Math.round(s * 30);
const B = (n: string) => `biblioteca/${n}.mp4`;

// Clip vertical de la biblioteca (con o sin audio)
const Clip: React.FC<{src: string; audio?: boolean; oscuro?: boolean}> = ({src, audio, oscuro = true}) => (
	<AbsoluteFill>
		<OffthreadVideo src={staticFile(src)} muted={!audio} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
		{oscuro ? <AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.7) 0%, rgba(14,22,82,0.05) 38%, rgba(14,22,82,0.1) 55%, rgba(14,22,82,0.85) 100%)'}} /> : null}
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
const Chip: React.FC<{children: React.ReactNode; top?: number}> = ({children, top = 170}) => (
	<AbsoluteFill style={{alignItems: 'center', paddingTop: top}}>
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 32, letterSpacing: 4, color: AZUL_OSCURO, background: DORADO, padding: '12px 28px', borderRadius: 10}}>{children}</div>
	</AbsoluteFill>
);
// Texto abajo (subtítulo / mensaje)
const Abajo: React.FC<{pre?: string; t: string; size?: number; sub?: string; pad?: number}> = ({pre, t, size = 92, sub, pad = 300}) => (
	<AbsoluteFill style={{justifyContent: 'flex-end', padding: `0 70px ${pad}px`}}>
		{pre ? <Texto size={36} color={DORADO} style={{letterSpacing: 5, marginBottom: 14}}>{pre}</Texto> : null}
		<Texto size={size} retraso={3}>{t}</Texto>
		{sub ? <Texto size={44} peso={600} color={CREMA} retraso={8} style={{marginTop: 16}}>{sub}</Texto> : null}
	</AbsoluteFill>
);
const Portada: React.FC<{pre: string; t: string}> = ({pre, t}) => (
	<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 330px'}}>
		<Texto size={46} color={DORADO} style={{letterSpacing: 4}}>{pre}</Texto>
		<Texto size={128} retraso={4} style={{marginTop: 20}}>{t}</Texto>
	</AbsoluteFill>
);
const Cifra: React.FC<{pre: string; grande: string; post?: string}> = ({pre, grande, post}) => (
	<AbsoluteFill style={{justifyContent: 'center', padding: '0 60px', textAlign: 'center', background: 'rgba(14,22,82,0.55)'}}>
		<Texto size={62} peso={700} color={CREMA}>{pre}</Texto>
		<Texto size={grande.length >= 12 ? 128 : 180} color={DORADO} retraso={5} style={{marginTop: 10, whiteSpace: 'nowrap', textShadow: '0 6px 30px rgba(0,0,0,0.5)'}}>{grande}</Texto>
		{post ? <Texto size={56} peso={700} color={CREMA} retraso={10} style={{marginTop: 14}}>{post}</Texto> : null}
	</AbsoluteFill>
);
// Subtítulo con lo que dice Luis (cita textual del clip)
const Cita: React.FC<{t: string}> = ({t}) => (
	<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', padding: '0 70px 330px', textAlign: 'center'}}>
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 64, lineHeight: 1.12, color: 'white', background: 'rgba(14,22,82,0.72)', padding: '24px 34px', borderRadius: 20}}>«{t}»</div>
	</AbsoluteFill>
);

/* ───────── REEL 10 — «Conoce El Dorado con Luis» (voz real de Luis) ───────── */
export const DUR_REEL10 = T(21.5);
export const Reel10: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.1} />
		<Tomas
			tomas={[
				[0, 4.8, <><Clip src={B('luis_0096')} audio /><Chip>CONOCE EL DORADO</Chip><Cita t="Aquí en Puerto Maldonado quiero mostrarte el siguiente proyecto, El Dorado" /></>],
				[4.8, 9.6, <><Clip src={B('luis_0093')} audio /><Chip>AVANCES DE OBRA</Chip><Cita t="Ya comenzamos con los avances de obra, parques" /></>],
				[9.6, 13.6, <><Clip src={B('luis_0095')} audio /><Chip>EN OBRA</Chip><Cita t="Ya comenzamos con la construcción de este parque" /></>],
				[13.6, 17, <><Clip src={B('obra_6202')} /><Chip>OBRA REAL</Chip><Abajo t="Se construye hoy" sub={DATOS.ubicacion} /></>],
				[17, 21.5, <CierreReel />],
			]}
		/>
	</AbsoluteFill>
);

/* ───────── REEL 11 — «Elige tu lote» (visita al proyecto) ───────── */
export const DUR_REEL11 = T(23);
const SUBS11: Sub[] = [[0.19, 2.33, 'Elige tu lote en El Dorado.'], [2.33, 5.32, 'Lotes desde S/ 35,000,'], [5.32, 8.72, 'en Chorrillos km 5, Puerto Maldonado.'], [8.72, 11.96, 'Con una inicial de S/ 5,000.'], [11.96, 16.18, 'Y hasta 3 años para pagar, sin intereses.'], [16.18, 17.96, 'Escríbenos al WhatsApp'], [17.96, 21.3, '982 825 054']];
export const Reel11: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(21.3)} />
		<Audio src={staticFile('voz-reel-11.mp3')} />
		<Tomas
			tomas={[
				[0, 2.33, <><Clip src={B('visita_2136')} /><Portada pre="EL DORADO · PUERTO MALDONADO" t="Elige tu lote" /></>],
				[2.33, 8.72, <><Clip src={B('visita_2152')} /><Cifra pre="Lotes desde" grande={DATOS.precio} post={DATOS.ubicacion} /></>],
				[8.72, 10.4, <><Clip src={B('visita_2150')} /><Cifra pre="Inicial de" grande={DATOS.inicial} /></>],
				[10.4, 11.96, <><Clip src={B('visita_2151')} /><Cifra pre="Inicial de" grande={DATOS.inicial} /></>],
				[11.96, 16.18, <><Clip src={B('visita_2169')} /><Cifra pre="Y tienes" grande="hasta 3 años" post="sin intereses" /></>],
				[16.18, 23, <CierreReel />],
			]}
		/>
		<Subtitulos subs={SUBS11} />
	</AbsoluteFill>
);

/* ───────── REEL 12 — «Mira cómo se trabaja» (obra real) ───────── */
export const DUR_REEL12 = T(18.5);
const SUBS12: Sub[] = [[0.4, 3.21, 'Así se trabaja hoy en El Dorado,'], [3.21, 6.13, 'maquinaria trabajando en el terreno,'], [6.13, 8.24, 'avanzan los trabajos'], [8.24, 11.74, 'y el vaciado de concreto de una plaza circular.'], [11.74, 13.72, 'Lotes desde S/ 35,000,'], [13.72, 15.4, 'escríbenos al WhatsApp'], [15.4, 17.6, '982 825 054']];
export const Reel12: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(17.6)} />
		<Audio src={staticFile('voz-reel-12.mp3')} />
		<Tomas
			tomas={[
				[0, 3.21, <><Clip src={B('obra_6592')} /><Portada pre="EL DORADO · OBRA REAL" t="Así se trabaja hoy" /></>],
				[3.21, 6.13, <><Clip src={B('obra_6202')} /><Chip>01 / 03</Chip><Abajo t="Maquinaria en el terreno" /></>],
				[6.13, 8.24, <><Clip src={B('obra_6419')} /><Chip>02 / 03</Chip><Abajo t="Trabajos en el terreno" /></>],
				[8.24, 11.74, <><Clip src={B('obra_concreto')} /><Chip>03 / 03</Chip><Abajo t="Vaciado de concreto" sub="en una plaza circular" /></>],
				[11.74, 18.5, <CierreReel />],
			]}
		/>
	</AbsoluteFill>
);

/* ───────── Utilidades de carrusel ───────── */
const Foto: React.FC<{src: string; pos?: string}> = ({src, pos = 'center'}) => (
	<Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos}} />
);
const Portada1: React.FC<{img: string; pos?: string; etiqueta: string; titulo: string; sub: string; n: number; refer?: boolean}> = ({img, pos, etiqueta, titulo, sub, n, refer}) => (
	<AbsoluteFill>
		<Foto src={img} pos={pos} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.1) 20%, rgba(14,22,82,0.94) 80%)'}} />
		{refer ? <Referencial style={{right: 28, top: 24}} /> : null}
		<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 150px'}}>
			<Etiqueta>{etiqueta}</Etiqueta>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 112, color: 'white', lineHeight: 1.03, marginTop: 28}}>{titulo}</div>
			<div style={{fontFamily: FUENTE, fontSize: 40, color: CREMA, marginTop: 22}}>{sub}</div>
		</AbsoluteFill>
		<Pie n={1} total={n} claro />
	</AbsoluteFill>
);
const Lamina: React.FC<{img: string; pos?: string; t: string; d: string; n: number; total: number; refer?: boolean}> = ({img, pos, t, d, n, total, refer}) => (
	<AbsoluteFill>
		<Foto src={img} pos={pos} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0) 55%, rgba(14,22,82,0.92) 100%)'}} />
		{refer ? <Referencial style={{right: 28, top: 24}} /> : null}
		<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 140px'}}>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 92, color: 'white', lineHeight: 1.04}}>{t}</div>
			<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 16}}>{d}</div>
		</AbsoluteFill>
		<Pie n={n} total={total} claro />
	</AbsoluteFill>
);

/* ───────── CARRUSEL 10 — «Recorre El Dorado» (renders) ───────── */
const RECORRIDO = [
	{img: 'render_1_4_ingreso.jpg', t: 'El ingreso', d: 'Así te recibe El Dorado.', pos: 'center'},
	{img: 'render_1_16_boulevard.jpg', t: 'El boulevard', d: 'Un paseo con áreas verdes.', pos: 'center'},
	{img: 'render_1_6_pistas.jpg', t: 'Pistas mejoradas', d: 'Calles listas para tu lote.', pos: 'center'},
	{img: 'render_1_8_parque.jpg', t: 'Parques', d: 'Espacios para toda la familia.', pos: '40% center'},
	{img: 'render_1_2_vista.jpg', t: 'Áreas recreativas', d: 'Lugares para disfrutar cerca de casa.', pos: 'center'},
];
export const N_CARRUSEL10 = RECORRIDO.length + 2;
export const Carrusel10: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0) return <Portada1 img="render_1_34_aereo.jpg" etiqueta="El Dorado · Puerto Maldonado" titulo="Recorre El Dorado" sub="Del ingreso a las áreas recreativas · Desliza →" n={N_CARRUSEL10} refer />;
	if (f === N_CARRUSEL10 - 1) return <CierreCarrusel total={N_CARRUSEL10} titulo="Ven a conocerlo" />;
	const p = RECORRIDO[f - 1];
	return <Lamina img={p.img} pos={p.pos} t={p.t} d={p.d} n={f + 1} total={N_CARRUSEL10} refer />;
};

/* ───────── CARRUSEL 11 — «Antes de ir a ver un terreno» (educativo) ───────── */
const LISTA = [
	{t: 'Lleva tus preguntas anotadas', d: 'Así no olvidas nada cuando estés en el lugar.'},
	{t: 'Fíjate cómo es la zona', d: 'Mira cómo llegar y qué hay alrededor.'},
	{t: 'Pregunta qué servicios incluye', d: 'Agua, luz, pistas: que te digan qué trae el lote.'},
	{t: 'Pide las condiciones claras', d: 'Inicial, plazo y forma de pago, bien explicados.'},
];
export const N_CARRUSEL11 = LISTA.length + 3;
const Check: React.FC<{texto: string}> = ({texto}) => (
	<div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 28}}>
		<svg width="58" height="58" viewBox="0 0 58 58">
			<circle cx="29" cy="29" r="29" fill={DORADO} />
			<path d="M16 30 L25 39 L43 20" stroke={AZUL_OSCURO} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
		<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 48, color: 'white'}}>{texto}</div>
	</div>
);
export const Carrusel11: React.FC = () => {
	const f = useCurrentFrame();
	const barra = <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />;
	if (f === 0)
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				{barra}
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: AZUL}}>LISTA PARA TU VISITA</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 112, color: AZUL_OSCURO, lineHeight: 1.02, marginTop: 20}}>Antes de ir a ver un terreno</div>
				<div style={{fontFamily: FUENTE, fontSize: 44, color: AZUL_OSCURO, opacity: 0.75, marginTop: 34}}>4 consejos →</div>
				<Pie n={1} total={N_CARRUSEL11} />
			</AbsoluteFill>
		);
	if (f <= LISTA.length) {
		const c = LISTA[f - 1];
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				{barra}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 320, color: DORADO, lineHeight: 0.95}}>{f}</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 96, color: AZUL_OSCURO, lineHeight: 1.04, marginTop: 20}}>{c.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 46, color: AZUL_OSCURO, opacity: 0.78, marginTop: 30, lineHeight: 1.3}}>{c.d}</div>
				<Pie n={f + 1} total={N_CARRUSEL11} />
			</AbsoluteFill>
		);
	}
	if (f === LISTA.length + 1)
		return (
			<AbsoluteFill style={{background: AZUL_OSCURO, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: DORADO}}>EN EL DORADO</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 88, color: 'white', lineHeight: 1.05, marginTop: 16, marginBottom: 20}}>Esto te ofrecemos</div>
				<Check texto="Título de propiedad" />
				<Check texto="Agua, luz y pistas mejoradas" />
				<Check texto={`Inicial ${DATOS.inicial}`} />
				<Check texto="Hasta 3 años para pagar" />
				<Pie n={f + 1} total={N_CARRUSEL11} claro />
			</AbsoluteFill>
		);
	return <CierreCarrusel total={N_CARRUSEL11} titulo="Pregunta sin compromiso" />;
};

/* ───────── CARRUSEL 12 — «El Dorado en obra» (fotos reales) ───────── */
const OBRA = [
	{img: 'obra_fotos/luis_0095.jpg', t: 'Construcción del parque', d: 'Ya comenzamos los trabajos.', pos: 'center'},
	{img: 'obra_fotos/obra_6592.jpg', t: 'Trabajos en la calle', d: 'Motoniveladora en las pistas.', pos: 'center'},
	{img: 'obra_fotos/obra_6202.jpg', t: 'Maquinaria en el terreno', d: 'Volquete y máquina trabajando.', pos: 'center'},
	{img: 'obra_fotos/obra_6419.jpg', t: 'Zanja y terreno', d: 'Movimiento de tierra en obra.', pos: 'center'},
	{img: 'obra_fotos/obra_concreto.jpg', t: 'Vaciado de concreto', d: 'En una plaza circular.', pos: 'center'},
];
export const N_CARRUSEL12 = OBRA.length + 2;
export const Carrusel12: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0) return <Portada1 img="obra_fotos/obra_6592.jpg" etiqueta="Fotos reales de obra" titulo="El Dorado en obra" sub="Mira cómo se trabaja · Desliza →" n={N_CARRUSEL12} />;
	if (f === N_CARRUSEL12 - 1) return <CierreCarrusel total={N_CARRUSEL12} titulo="Ven a conocerlo" />;
	const p = OBRA[f - 1];
	return <Lamina img={p.img} pos={p.pos} t={p.t} d={p.d} n={f + 1} total={N_CARRUSEL12} />;
};

/* ───────── HISTORIA 10 — obra (video 10 s) ───────── */
export const Historia10: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.6} />
		<Tomas
			tomas={[
				[0, 3.4, <Clip src={B('obra_6592')} />],
				[3.4, 6.7, <Clip src={B('obra_concreto')} />],
				[6.7, 10, <Clip src={B('obra_6202')} />],
			]}
		/>
		<Chip>OBRA REAL</Chip>
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260, textAlign: 'center'}}>
			<Texto size={104}>Trabajando en El Dorado</Texto>
			<Texto size={46} peso={600} color={CREMA} retraso={10} style={{marginTop: 18}}>{DATOS.ubicacion}</Texto>
			<div style={{...useEntrada(24), marginTop: 50, fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: AZUL_OSCURO, background: 'white', padding: '24px 56px', borderRadius: 60}}>WhatsApp {DATOS.whatsapp}</div>
		</AbsoluteFill>
	</AbsoluteFill>
);

/* ───────── HISTORIA 11 — elige tu lote (video 10 s) ───────── */
export const Historia11: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.6} />
		<Tomas
			tomas={[
				[0, 4.7, <Clip src={B('visita_2152')} />],
				[4.7, 6.6, <Clip src={B('visita_2150')} />],
				[6.6, 8.2, <Clip src={B('visita_2151')} />],
				[8.2, 10, <Clip src={B('visita_2169')} />],
			]}
		/>
		<Chip>ELIGE TU LOTE</Chip>
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260, textAlign: 'center'}}>
			<Texto size={104}>Empieza con {DATOS.inicial}</Texto>
			<Texto size={46} peso={600} color={CREMA} retraso={10} style={{marginTop: 18}}>Lotes desde {DATOS.precio} · hasta 3 años</Texto>
			<div style={{...useEntrada(24), marginTop: 50, fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: AZUL_OSCURO, background: 'white', padding: '24px 56px', borderRadius: 60}}>WhatsApp {DATOS.whatsapp}</div>
		</AbsoluteFill>
	</AbsoluteFill>
);

/* ───────── HISTORIA 12 — encuesta (lámina fija, la sube Luis) ───────── */
export const Historia12: React.FC = () => (
	<AbsoluteFill>
		<Img src={staticFile('obra_fotos/obra_6592.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(6px) brightness(0.75)', transform: 'scale(1.05)'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.88) 0%, rgba(14,22,82,0.4) 50%, rgba(14,22,82,0.88) 100%)'}} />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 200, textAlign: 'center'}}>
			<Logo size={150} />
			<div style={{marginTop: 30}}>
				<Etiqueta>Encuesta · El Dorado</Etiqueta>
			</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 100, color: 'white', lineHeight: 1.06, marginTop: 60, padding: '0 70px'}}>¿Qué quieres ver la próxima semana?</div>
			<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 30}}>Vota aquí abajo 👇</div>
		</AbsoluteFill>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FUENTE, fontSize: 34, fontWeight: 700, color: 'white', opacity: 0.85}}>
			Grupo Vivencia · WhatsApp {DATOS.whatsapp}
		</div>
	</AbsoluteFill>
);
