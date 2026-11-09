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

const Check: React.FC<{texto: string}> = ({texto}) => (
	<div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 28}}>
		<svg width="58" height="58" viewBox="0 0 58 58">
			<circle cx="29" cy="29" r="29" fill={DORADO} />
			<path d="M16 30 L25 39 L43 20" stroke={AZUL_OSCURO} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
		<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 48, color: 'white'}}>{texto}</div>
	</div>
);

/* ───────── REEL 13 — «¿Dónde queda El Dorado?» (voz real de Luis) ───────── */
export const DUR_REEL13 = T(25);
export const Reel13: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.1} />
		<Tomas
			tomas={[
				[0, 6.2, <><Clip src={B('luis_0105')} audio /><Chip>¿DÓNDE QUEDA?</Chip><Cita t="Ubicado en la zona de Chorrillos km 5, al costado del circuito de manejo" /></>],
				[6.2, 9.8, <><Clip src={B('luis_0107')} audio /><Chip>UBICACIÓN</Chip><Cita t="A pasos de la vía principal" /></>],
				[9.8, 14.4, <><Clip src={B('luis_0108')} audio /><Chip>ZONA EN CRECIMIENTO</Chip><Cita t="En una zona en constante crecimiento y desarrollo" /></>],
				[14.4, 20, <><Clip src={B('luis_0110')} audio /><Chip>EXPANSIÓN URBANA</Chip><Cita t="Un proyecto dentro de la expansión urbana" /></>],
				[20, 25, <CierreReel />],
			]}
		/>
	</AbsoluteFill>
);

/* ───────── REEL 14 — «Tu lote, con todo» (voz real de Luis) ───────── */
export const DUR_REEL14 = T(24);
export const Reel14: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.1} />
		<Tomas
			tomas={[
				[0, 3.5, <><Clip src="d115.mp4" /><Portada pre="EL DORADO · PUERTO MALDONADO" t="Tu lote, con todo" /></>],
				[3.5, 9.03, <><Clip src={B('luis_0111')} audio /><Chip>TÍTULO, AGUA Y LUZ</Chip><Cita t="Lotes con título de propiedad independizado, agua, luz en cada lote" /></>],
				[9.03, 16, <><Clip src={B('luis_0112')} audio /><Chip>FINANCIAMIENTO</Chip><Cita t="Te lo financiamos por tres años, cero intereses, con tan solo inicial de 5 mil soles" /></>],
				[16, 24, <CierreReel />],
			]}
		/>
	</AbsoluteFill>
);

/* ───────── REEL 15 — «Ven a conocerlo» (tercera etapa + visita) ───────── */
export const DUR_REEL15 = T(23);
export const Reel15: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.1} />
		<Tomas
			tomas={[
				[0, 2.8, <><Clip src={B('visita_2136')} /><Portada pre="EL DORADO · TERCERA ETAPA" t="Ven a conocerlo" /></>],
				[2.8, 7.3, <><Clip src={B('visita_2152')} /><Cifra pre="Más de" grande="1000 familias" post="ya adquirieron su lote en la 1.ª y 2.ª etapa" /></>],
				[7.3, 14.3, <><Clip src={B('luis_0114')} audio /><Chip>VISITA GUIADA</Chip><Cita t="Descúbrelo tú mismo en una visita guiada o una reunión en mi oficina" /></>],
				[14.3, 17.5, <><Clip src={B('visita_2150')} /><Chip>AGENDA POR WHATSAPP</Chip><Abajo t="Visita guiada o reunión en la oficina" /></>],
				[17.5, 23, <CierreReel />],
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


/* ───────── CARRUSEL 13 — «¿Dónde queda El Dorado?» (fotos reales de dron) ───────── */
const UBIC = [
	{img: 'dron_14.jpg', t: 'Chorrillos km 5', d: 'Puerto Maldonado.', pos: 'center'},
	{img: 'dron_22.jpg', t: 'Al costado del circuito de manejo', d: 'Fácil de ubicar.', pos: 'center'},
	{img: 'dron_1.jpg', t: 'A pasos de la vía principal', d: 'Con acceso cómodo.', pos: 'center'},
	{img: 'dron_28.jpg', t: 'Zona en crecimiento', d: 'Dentro de la expansión urbana.', pos: 'center'},
];
export const N_CARRUSEL13 = UBIC.length + 2;
export const Carrusel13: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0) return <Portada1 img="d117_6.jpg" etiqueta="Fotos reales de dron" titulo="¿Dónde queda El Dorado?" sub="Chorrillos km 5 · Desliza →" n={N_CARRUSEL13} />;
	if (f === N_CARRUSEL13 - 1) return <CierreCarrusel total={N_CARRUSEL13} titulo="Visítalo con nosotros" />;
	const p = UBIC[f - 1];
	return <Lamina img={p.img} pos={p.pos} t={p.t} d={p.d} n={f + 1} total={N_CARRUSEL13} />;
};

/* ───────── CARRUSEL 14 — «Tercera etapa» ───────── */
export const N_CARRUSEL14 = 6;
export const Carrusel14: React.FC = () => {
	const f = useCurrentFrame();
	const barra = <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />;
	const base = {padding: '0 90px', justifyContent: 'center'} as const;
	const eti = (t: string, c = AZUL) => <div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: c}}>{t}</div>;
	if (f === 0)
		return (
			<AbsoluteFill style={{background: CREMA, ...base}}>
				{barra}
				{eti('EL DORADO · PUERTO MALDONADO')}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 124, color: AZUL_OSCURO, lineHeight: 1.02, marginTop: 20}}>Llegó la tercera etapa</div>
				<div style={{fontFamily: FUENTE, fontSize: 44, color: AZUL_OSCURO, opacity: 0.75, marginTop: 34}}>Desliza →</div>
				<Pie n={1} total={N_CARRUSEL14} />
			</AbsoluteFill>
		);
	if (f === 1)
		return (
			<AbsoluteFill style={{background: AZUL_OSCURO, ...base}}>
				{eti('PRIMERA Y SEGUNDA ETAPA', DORADO)}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 104, color: 'white', lineHeight: 1.04, marginTop: 20}}>Fueron un éxito</div>
				<div style={{fontFamily: FUENTE, fontSize: 48, color: CREMA, marginTop: 30, lineHeight: 1.3}}>Y ahora seguimos creciendo en Chorrillos km 5.</div>
				<Pie n={2} total={N_CARRUSEL14} claro />
			</AbsoluteFill>
		);
	if (f === 2)
		return (
			<AbsoluteFill style={{background: CREMA, ...base, textAlign: 'center'}}>
				{barra}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 60, color: AZUL_OSCURO}}>Más de</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 250, color: '#C8901F', lineHeight: 1}}>1000</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 76, color: AZUL_OSCURO, lineHeight: 1.05}}>familias</div>
				<div style={{fontFamily: FUENTE, fontSize: 44, color: AZUL_OSCURO, opacity: 0.8, marginTop: 30}}>ya adquirieron su lote.</div>
				<Pie n={3} total={N_CARRUSEL14} />
			</AbsoluteFill>
		);
	if (f === 3)
		return (
			<AbsoluteFill style={{background: AZUL_OSCURO, ...base}}>
				{eti('TERCERA ETAPA', DORADO)}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 80, color: 'white', lineHeight: 1.05, marginTop: 16, marginBottom: 20}}>Así empiezas</div>
				<Check texto={`Lotes desde ${DATOS.precio}`} />
				<Check texto={`Inicial ${DATOS.inicial}`} />
				<Check texto="Hasta 3 años para pagar" />
				<Check texto="Cero intereses" />
				<Pie n={4} total={N_CARRUSEL14} claro />
			</AbsoluteFill>
		);
	if (f === 4)
		return (
			<AbsoluteFill style={{background: CREMA, ...base}}>
				{barra}
				{eti('INCLUYE')}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 84, color: AZUL_OSCURO, lineHeight: 1.05, marginTop: 16, marginBottom: 14}}>Tu lote con</div>
				{[ 'Título de propiedad independizado', 'Agua y luz en cada lote', 'Parques y áreas recreativas', 'Pistas mejoradas'].map((t) => (
					<div key={t} style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 28}}>
						<svg width="58" height="58" viewBox="0 0 58 58"><circle cx="29" cy="29" r="29" fill={DORADO} /><path d="M16 30 L25 39 L43 20" stroke={AZUL_OSCURO} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
						<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 48, color: AZUL_OSCURO}}>{t}</div>
					</div>
				))}
				<Pie n={5} total={N_CARRUSEL14} />
			</AbsoluteFill>
		);
	return <CierreCarrusel total={N_CARRUSEL14} titulo="Separa tu visita" />;
};

/* ───────── CARRUSEL 15 — «Cómo agendar tu visita» ───────── */
const PASOS = [
	{t: 'Escríbenos por WhatsApp', d: `Al ${DATOS.whatsapp}.`},
	{t: 'Elige cómo conocerlo', d: 'Visita guiada al proyecto o reunión en la oficina.'},
	{t: 'Conoce El Dorado', d: 'Resuelve tus dudas y mira el proyecto.'},
];
export const N_CARRUSEL15 = 7;
export const Carrusel15: React.FC = () => {
	const f = useCurrentFrame();
	const barra = <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />;
	if (f === 0) return <Portada1 img="obra_fotos/visita_2152.jpg" etiqueta="Visita guiada" titulo="Cómo agendar tu visita" sub="3 pasos sencillos · Desliza →" n={N_CARRUSEL15} />;
	if (f <= 3) {
		const c = PASOS[f - 1];
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				{barra}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 320, color: DORADO, lineHeight: 0.95}}>{f}</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 96, color: AZUL_OSCURO, lineHeight: 1.04, marginTop: 20}}>{c.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 46, color: AZUL_OSCURO, opacity: 0.78, marginTop: 30, lineHeight: 1.3}}>{c.d}</div>
				<Pie n={f + 1} total={N_CARRUSEL15} />
			</AbsoluteFill>
		);
	}
	if (f === 4) return <Lamina img="obra_fotos/visita_2150.jpg" t="Elige tu lote en el plano" d="Te explicamos el proyecto paso a paso." n={5} total={N_CARRUSEL15} />;
	if (f === 5)
		return (
			<AbsoluteFill style={{background: AZUL_OSCURO, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: DORADO}}>EN EL DORADO</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 88, color: 'white', lineHeight: 1.05, marginTop: 16, marginBottom: 20}}>Esto te ofrecemos</div>
				<Check texto="Título de propiedad" />
				<Check texto="Agua y luz en cada lote" />
				<Check texto={`Inicial ${DATOS.inicial}`} />
				<Check texto="Hasta 3 años, cero intereses" />
				<Pie n={6} total={N_CARRUSEL15} claro />
			</AbsoluteFill>
		);
	return <CierreCarrusel total={N_CARRUSEL15} titulo="Agenda tu visita" />;
};

/* ───────── HISTORIAS ───────── */
const CtaH: React.FC<{t: string; sub: string}> = ({t, sub}) => (
	<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260, textAlign: 'center'}}>
		<Texto size={100}>{t}</Texto>
		<Texto size={46} peso={600} color={CREMA} retraso={10} style={{marginTop: 18}}>{sub}</Texto>
		<div style={{...useEntrada(24), marginTop: 50, fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: AZUL_OSCURO, background: 'white', padding: '24px 56px', borderRadius: 60}}>WhatsApp {DATOS.whatsapp}</div>
	</AbsoluteFill>
);
export const Historia13: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.6} />
		<Tomas tomas={[[0, 5, <Clip src="d117.mp4" />], [5, 10, <Clip src="d115.mp4" />]]} />
		<Chip>VISTA DE DRON</Chip>
		<CtaH t="Junto al circuito de manejo" sub={DATOS.ubicacion} />
	</AbsoluteFill>
);
export const Historia14: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.6} />
		<Tomas tomas={[[0, 4, <Clip src={B('visita_2152')} />], [4, 7, <Clip src={B('visita_2136')} />], [7, 10, <Clip src={B('visita_2169')} />]]} />
		<Chip>VISITA GUIADA</Chip>
		<CtaH t="Conócelo en persona" sub="Visita guiada o reunión en la oficina" />
	</AbsoluteFill>
);
export const Historia15: React.FC = () => (
	<AbsoluteFill>
		<Img src={staticFile('obra_fotos/d115_dron.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(6px) brightness(0.75)', transform: 'scale(1.05)'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.88) 0%, rgba(14,22,82,0.4) 50%, rgba(14,22,82,0.88) 100%)'}} />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 200, textAlign: 'center'}}>
			<Logo size={150} />
			<div style={{marginTop: 30}}><Etiqueta>Encuesta · El Dorado</Etiqueta></div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 100, color: 'white', lineHeight: 1.06, marginTop: 60, padding: '0 70px'}}>¿Cómo prefieres conocerlo?</div>
			<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 30}}>Vota aquí abajo 👇</div>
		</AbsoluteFill>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FUENTE, fontSize: 34, fontWeight: 700, color: 'white', opacity: 0.85}}>Grupo Vivencia · WhatsApp {DATOS.whatsapp}</div>
	</AbsoluteFill>
);
