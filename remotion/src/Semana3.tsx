import React from 'react';
import {AbsoluteFill, Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {AZUL, AZUL_OSCURO, CREMA, DATOS, DORADO, Etiqueta, FUENTE, Logo, Musica, Referencial, useEntrada, VideoHorizontal} from './marca';
import {CierreCarrusel, CierreReel, DronVertical, Pie, Sub, Subtitulos, Texto} from './Semana';

const T = (s: number) => Math.round(s * 30);

const Chip: React.FC<{children: React.ReactNode; top?: number; fondo?: string; color?: string}> = ({children, top = 170, fondo = DORADO, color = AZUL_OSCURO}) => (
	<AbsoluteFill style={{alignItems: 'center', paddingTop: top}}>
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 32, letterSpacing: 4, color, background: fondo, padding: '12px 28px', borderRadius: 10}}>{children}</div>
	</AbsoluteFill>
);

const Media: React.FC<{src: string; desde?: number; pos?: string; zoom?: boolean}> = ({src, desde = 0, pos = 'center', zoom}) => {
	const f = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const escala = zoom ? interpolate(f, [0, durationInFrames], [1.04, 1.14]) : 1;
	const estilo: React.CSSProperties = {width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `scale(${escala})`};
	return src.endsWith('.mp4') ? <OffthreadVideo src={staticFile(src)} startFrom={desde} muted style={estilo} /> : <Img src={staticFile(src)} style={estilo} />;
};

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

const Sombra = ({a = 0.7, b = 0.8}: {a?: number; b?: number}) => (
	<AbsoluteFill style={{background: `linear-gradient(180deg, rgba(14,22,82,${a}) 0%, rgba(14,22,82,0.1) 40%, rgba(14,22,82,0.1) 55%, rgba(14,22,82,${b}) 100%)`}} />
);

/* ───────────── REEL 7 — «Empieza con S/ 5,000» ───────────── */
export const DUR_REEL7 = T(17.5);
const SUBS7: Sub[] = [[0.07, 2.05, '¿Cuánto necesitas para empezar?'], [2.05, 4.04, 'En El Dorado, tu inicial es de S/ 5,000'], [4.04, 6.8, 'y tienes hasta 3 años para pagar tu lote, sin intereses.'], [6.8, 8.95, 'Lotes desde S/ 35,000'], [8.95, 11.36, 'en Chorrillos km 5, Puerto Maldonado.'], [11.36, 13.26, 'Escríbenos al WhatsApp'], [13.26, 16.0, '982 825 054']];
const Cifra: React.FC<{pre: string; grande: string; post?: string}> = ({pre, grande, post}) => (
	<AbsoluteFill style={{justifyContent: 'center', padding: '0 70px', textAlign: 'center'}}>
		<Texto size={64} peso={700} color={CREMA}>{pre}</Texto>
		<Texto size={grande.length >= 12 ? 132 : 190} color={DORADO} retraso={5} style={{marginTop: 10, whiteSpace: "nowrap", textShadow: '0 6px 30px rgba(0,0,0,0.5)'}}>{grande}</Texto>
		{post ? <Texto size={60} peso={700} color={CREMA} retraso={10} style={{marginTop: 14}}>{post}</Texto> : null}
	</AbsoluteFill>
);
export const Reel7: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(16)} />
		<Audio src={staticFile('voz-reel-7.mp3')} />
		<Tomas
			tomas={[
				[0, 2.05, <><DronVertical src="d115.mp4" oscuro /><AbsoluteFill style={{justifyContent: 'center', padding: '0 80px'}}><Texto size={46} color={DORADO} style={{letterSpacing: 4}}>EL DORADO · PUERTO MALDONADO</Texto><Texto size={124} retraso={3} style={{marginTop: 24}}>¿Cuánto necesitas para empezar?</Texto></AbsoluteFill></>],
				[2.05, 4.04, <><DronVertical src="d117.mp4" oscuro /><Cifra pre="Tu inicial es de" grande={DATOS.inicial} /></>],
				[4.04, 6.8, <><DronVertical src="dron.mp4" desde={T(14)} oscuro /><Cifra pre="Y tienes" grande="hasta 3 años" post="sin intereses" /></>],
				[6.8, 11.36, <><DronVertical src="d117.mp4" desde={T(4)} oscuro /><Cifra pre="Lotes desde" grande={DATOS.precio} post={DATOS.ubicacion} /></>],
				[11.36, 17.5, <CierreReel />],
			]}
		/>
		<Subtitulos subs={SUBS7} />
	</AbsoluteFill>
);

/* ───────────── REEL 8 — «¿Mito o verdad?» ───────────── */
const MITOS = [
	{mito: 'Necesito mucho dinero para empezar', verdad: `Tu inicial es de ${DATOS.inicial.replace(" ", "\u00a0")}`, bg: 'd115.mp4', desde: 0},
	{mito: 'Tengo que pagar todo de golpe', verdad: 'Tienes hasta 3 años para pagar, sin intereses', bg: 'dron.mp4', desde: T(14)},
	{mito: 'Es solo un terreno vacío', verdad: 'Se entrega con agua, luz, parques, áreas recreativas y pistas mejoradas', bg: 'render_1_8_parque.jpg', desde: 0, ref: true},
	{mito: 'No me dan documentos', verdad: 'Tu lote se entrega con título de propiedad', bg: 'd117.mp4', desde: 0},
];
const Mito: React.FC<{i: number; revela?: number}> = ({i, revela = T(2)}) => {
	const m = MITOS[i];
	const f = useCurrentFrame();
	const verdad = f >= revela;
	const larga = m.verdad.length > 40;
	const entradaVerdad = useEntrada(revela);
	return (
		<AbsoluteFill>
			<Media src={m.bg} desde={m.desde} zoom={!m.bg.endsWith('.mp4')} pos="40% center" />
			<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.85) 0%, rgba(14,22,82,0.45) 50%, rgba(14,22,82,0.85) 100%)'}} />
			{m.ref ? <Referencial style={{right: 30, top: 40}} /> : null}
			<AbsoluteFill style={{padding: '230px 80px 0'}}>
				<Texto size={34} color={DORADO} style={{letterSpacing: 5}}>MITO {i + 1} DE {MITOS.length}</Texto>
				<Texto size={104} retraso={3} style={{marginTop: 16, opacity: verdad ? 0.55 : 1, textDecoration: verdad ? 'line-through' : 'none'}}>«{m.mito}»</Texto>
			</AbsoluteFill>
			{verdad ? (
				<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', padding: '0 60px 330px'}}>
					<div style={{...entradaVerdad, fontFamily: FUENTE, fontWeight: 800, fontSize: larga ? 56 : 82, lineHeight: 1.12, color: AZUL_OSCURO, background: DORADO, padding: '28px 40px', borderRadius: 24, textAlign: 'center', boxShadow: '0 16px 50px rgba(0,0,0,0.35)'}}>
						<div style={{fontSize: 30, letterSpacing: 6, marginBottom: 8}}>✔ VERDAD</div>
						{m.verdad}
					</div>
				</AbsoluteFill>
			) : null}
		</AbsoluteFill>
	);
};
export const DUR_REEL8 = T(31);
// [inicio, revela verdad, fin] según voz-reel-8.mp3
const TIEMPOS8: [number, number, number][] = [[1.21, 3.72, 6.2], [6.2, 8.78, 12.28], [12.28, 14.4, 18.66], [18.66, 21.2, 24.09]];
export const Reel8: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(29.3)} />
		<Audio src={staticFile('voz-reel-8.mp3')} />
		<Sequence durationInFrames={T(1.21)}>
			<DronVertical src="d117.mp4" desde={T(5)} oscuro />
			<AbsoluteFill style={{justifyContent: 'center', padding: '0 80px'}}>
				<Texto size={46} color={DORADO} style={{letterSpacing: 4}}>EL DORADO</Texto>
				<Texto size={150} retraso={2} style={{marginTop: 20}}>¿Mito o verdad?</Texto>
			</AbsoluteFill>
		</Sequence>
		{TIEMPOS8.map(([a, r, b], i) => (
			<Sequence key={i} from={T(a)} durationInFrames={T(b) - T(a)}>
				<Mito i={i} revela={T(r) - T(a)} />
			</Sequence>
		))}
		<Sequence from={T(24.09)}>
			<CierreReel />
		</Sequence>
	</AbsoluteFill>
);

/* ───────────── REEL 9 — «Imagina tus domingos» ───────────── */
const DOMINGOS = [
	{clip: 'clip_parrillas.mp4', t: 'Una parrillada en familia'},
	{clip: 'clip_infantil.mp4', t: 'Los niños, jugando'},
	{clip: 'clip_deportivo.mp4', t: 'Deporte al aire libre'},
];
export const DUR_REEL9 = T(22);
const T9: [number, number][] = [[2.27, 5.44], [5.44, 7.7], [7.7, 9.4]];
const SUBS9: Sub[] = [[0.04, 2.27, 'Imagina tus domingos en El Dorado'], [2.27, 5.44, 'Una parrillada en familia'], [5.44, 7.7, 'Los niños, jugando'], [7.7, 8.64, 'Deporte al aire libre'], [8.64, 13.26, 'Parques y áreas recreativas en tu nuevo barrio'], [13.26, 16.55, 'Lotes desde S/ 35,000'], [16.55, 18.24, 'Escríbenos al WhatsApp'], [18.24, 21.0, '982 825 054']];
export const Reel9: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(21)} />
		<Audio src={staticFile('voz-reel-9.mp3')} />
		<Sequence durationInFrames={T(2.27)}>
			<DronVertical src="dron.mp4" desde={T(2)} oscuro />
			<AbsoluteFill style={{justifyContent: 'center', padding: '0 80px'}}>
				<Texto size={46} color={DORADO} style={{letterSpacing: 4}}>EL DORADO · PUERTO MALDONADO</Texto>
				<Texto size={140} retraso={4} style={{marginTop: 20}}>Imagina tus domingos</Texto>
			</AbsoluteFill>
		</Sequence>
		{DOMINGOS.map((d, i) => (
			<Sequence key={d.t} from={T(T9[i][0])} durationInFrames={T(T9[i][1]) - T(T9[i][0])}>
				<VideoHorizontal src={d.clip} top={560} />
				<AbsoluteFill style={{padding: '1240px 80px 0'}}>
					<Texto size={34} color={DORADO} retraso={2} style={{letterSpacing: 5}}>0{i + 1} / 0{DOMINGOS.length}</Texto>
					<Texto size={88} retraso={5} style={{marginTop: 14}}>{d.t}</Texto>
				</AbsoluteFill>
				<AbsoluteFill style={{alignItems: 'center', paddingTop: 200}}>
					<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 36, color: 'white', letterSpacing: 2}}>Así será tu espacio en El Dorado</div>
				</AbsoluteFill>
			</Sequence>
		))}
		<Sequence from={T(9.4)} durationInFrames={T(13.26) - T(9.4)}>
			<AbsoluteFill>
				<Media src="render_1_2_vista.jpg" zoom />
				<Sombra a={0.6} b={0.85} />
				<Referencial style={{right: 30, top: 40}} />
				<AbsoluteFill style={{justifyContent: 'center', padding: '0 80px'}}>
					<Texto size={100}>Parques y áreas recreativas</Texto>
					<Texto size={56} peso={700} color={CREMA} retraso={6} style={{marginTop: 20}}>en tu nuevo barrio</Texto>
				</AbsoluteFill>
			</AbsoluteFill>
		</Sequence>
		<Sequence from={T(13.26)}>
			<CierreReel />
		</Sequence>
		<Subtitulos subs={SUBS9} />
	</AbsoluteFill>
);

/* ───────────── CARRUSEL 7 — «El Dorado desde el aire» (fotos reales de dron) ───────────── */
const AEREAS = [
	{img: 'dron_1.jpg', t: 'La lotización', d: 'Vista de El Dorado desde el dron.', pos: 'center'},
	{img: 'dron_8.jpg', t: 'Trabajos en las calles', d: 'Maquinaria trabajando en las pistas.', pos: 'center 60%'},
	{img: 'd115_3.jpg', t: 'Las pistas', d: 'Así se forman las calles de El Dorado.', pos: 'center 65%'},
	{img: 'dron_28.jpg', t: 'Calles y manzanas', d: 'El trazo de la lotización.', pos: 'center 40%'},
	{img: 'd117_6.jpg', t: 'Chorrillos km 5', d: 'Puerto Maldonado, Madre de Dios.', pos: 'center 55%'},
];
export const N_CARRUSEL7 = AEREAS.length + 2;
export const Carrusel7: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0)
		return (
			<AbsoluteFill>
				<Img src={staticFile('dron_14.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%'}} />
				<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.05) 20%, rgba(14,22,82,0.94) 80%)'}} />
				<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 150px'}}>
					<Etiqueta>Fotos reales de dron</Etiqueta>
					<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 112, color: 'white', lineHeight: 1.03, marginTop: 28}}>El Dorado desde el aire</div>
					<div style={{fontFamily: FUENTE, fontSize: 40, color: CREMA, marginTop: 22}}>Desliza →</div>
				</AbsoluteFill>
				<Pie n={1} total={N_CARRUSEL7} claro />
			</AbsoluteFill>
		);
	if (f === N_CARRUSEL7 - 1) return <CierreCarrusel total={N_CARRUSEL7} titulo="Ven a conocerlo" />;
	const p = AEREAS[f - 1];
	return (
		<AbsoluteFill>
			<Img src={staticFile(p.img)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos}} />
			<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0) 55%, rgba(14,22,82,0.92) 100%)'}} />
			<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 140px'}}>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 90, color: 'white', lineHeight: 1.04}}>{p.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 42, color: CREMA, marginTop: 16}}>{p.d}</div>
			</AbsoluteFill>
			<Pie n={f + 1} total={N_CARRUSEL7} claro />
		</AbsoluteFill>
	);
};

/* ───────────── CARRUSEL 8 — «Elige tu espacio favorito» ───────────── */
const ESPACIOS = [
	{t: 'Parque infantil', img: 'render_1_9_infantil.jpg', d: 'Para que los niños jueguen.', pos: '40% center'},
	{t: 'Parque de parrillas', img: 'render_1_13_parrillas.jpg', d: 'Para reunirte con tu familia.', pos: 'center'},
	{t: 'Boulevard deportivo', img: 'render_1_11_deportivo.jpg', d: 'Para hacer deporte al aire libre.', pos: 'center'},
];
export const N_CARRUSEL8 = ESPACIOS.length + 3;
export const Carrusel8: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0)
		return (
			<AbsoluteFill>
				<Img src={staticFile('render_1_3_arco.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
				<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.1) 20%, rgba(14,22,82,0.94) 80%)'}} />
				<Referencial style={{right: 28, top: 24}} />
				<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 150px'}}>
					<Etiqueta>El Dorado · Puerto Maldonado</Etiqueta>
					<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 112, color: 'white', lineHeight: 1.03, marginTop: 28}}>¿Cuál es tu espacio favorito?</div>
					<div style={{fontFamily: FUENTE, fontSize: 40, color: CREMA, marginTop: 22}}>Elige uno · Desliza →</div>
				</AbsoluteFill>
				<Pie n={1} total={N_CARRUSEL8} claro />
			</AbsoluteFill>
		);
	if (f === N_CARRUSEL8 - 1) return <CierreCarrusel total={N_CARRUSEL8} titulo="Tu espacio te espera" />;
	if (f === N_CARRUSEL8 - 2)
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: AZUL}}>TU TURNO</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 104, color: AZUL_OSCURO, lineHeight: 1.04, marginTop: 20}}>¿Cuál elegirías tú?</div>
				<div style={{fontFamily: FUENTE, fontSize: 48, color: AZUL_OSCURO, opacity: 0.8, marginTop: 30, lineHeight: 1.3}}>Cuéntanos en los comentarios: infantil, parrillas o deportivo 👇</div>
				<Pie n={f + 1} total={N_CARRUSEL8} />
			</AbsoluteFill>
		);
	const p = ESPACIOS[f - 1];
	return (
		<AbsoluteFill>
			<Img src={staticFile(p.img)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos}} />
			<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.55) 0%, rgba(14,22,82,0) 30%, rgba(14,22,82,0) 55%, rgba(14,22,82,0.92) 100%)'}} />
			<Referencial style={{right: 28, top: 24}} />
			<AbsoluteFill style={{padding: '70px 80px 0'}}>
				<Etiqueta>Opción {f} de {ESPACIOS.length}</Etiqueta>
			</AbsoluteFill>
			<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 140px'}}>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 104, color: 'white', lineHeight: 1.04}}>{p.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 46, color: CREMA, marginTop: 16}}>{p.d}</div>
			</AbsoluteFill>
			<Pie n={f + 1} total={N_CARRUSEL8} claro />
		</AbsoluteFill>
	);
};

/* ───────────── CARRUSEL 9 — «Compara antes de elegir» (educativo) ───────────── */
const PREG9 = [
	{t: '¿Tiene título de propiedad?', d: 'Pregunta si tu lote se entrega con título.'},
	{t: '¿Incluye agua y luz?', d: 'Revisa qué servicios trae tu lote.'},
	{t: '¿Cuánto es la inicial?', d: 'Compara con cuánto necesitas para empezar.'},
	{t: '¿En cuánto tiempo pagas?', d: 'Mira el plazo que te dan para pagar.'},
];
export const N_CARRUSEL9 = PREG9.length + 3;
const Check9: React.FC<{texto: string}> = ({texto}) => (
	<div style={{display: 'flex', alignItems: 'center', gap: 26, marginTop: 28}}>
		<svg width="58" height="58" viewBox="0 0 58 58">
			<circle cx="29" cy="29" r="29" fill={DORADO} />
			<path d="M16 30 L25 39 L43 20" stroke={AZUL_OSCURO} strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
		</svg>
		<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 48, color: 'white'}}>{texto}</div>
	</div>
);
export const Carrusel9: React.FC = () => {
	const f = useCurrentFrame();
	const barra = <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />;
	if (f === 0)
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				{barra}
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: AZUL}}>GUÍA PARA COMPARAR</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 118, color: AZUL_OSCURO, lineHeight: 1.02, marginTop: 20}}>Antes de elegir tu lote, compara</div>
				<div style={{fontFamily: FUENTE, fontSize: 44, color: AZUL_OSCURO, opacity: 0.75, marginTop: 34}}>4 preguntas clave →</div>
				<Pie n={1} total={N_CARRUSEL9} />
			</AbsoluteFill>
		);
	if (f <= PREG9.length) {
		const c = PREG9[f - 1];
		return (
			<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
				{barra}
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 320, color: DORADO, lineHeight: 0.95}}>{f}</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 98, color: AZUL_OSCURO, lineHeight: 1.04, marginTop: 20}}>{c.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 46, color: AZUL_OSCURO, opacity: 0.78, marginTop: 30, lineHeight: 1.3}}>{c.d}</div>
				<Pie n={f + 1} total={N_CARRUSEL9} />
			</AbsoluteFill>
		);
	}
	if (f === PREG9.length + 1)
		return (
			<AbsoluteFill style={{background: AZUL_OSCURO, padding: '0 90px', justifyContent: 'center'}}>
				<div style={{fontFamily: FUENTE, fontSize: 32, fontWeight: 800, letterSpacing: 5, color: DORADO}}>ASÍ RESPONDE EL DORADO</div>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 88, color: 'white', lineHeight: 1.05, marginTop: 16, marginBottom: 20}}>Nuestras respuestas</div>
				<Check9 texto="Título de propiedad" />
				<Check9 texto="Agua y luz" />
				<Check9 texto={`Inicial ${DATOS.inicial}`} />
				<Check9 texto="Hasta 3 años para pagar" />
				<Pie n={f + 1} total={N_CARRUSEL9} claro />
			</AbsoluteFill>
		);
	return <CierreCarrusel total={N_CARRUSEL9} titulo="Compara y decide" />;
};

/* ───────────── HISTORIA 7 — «Así se ve desde el aire» (video 10 s) ───────────── */
export const Historia7: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.6} />
		<Tomas
			tomas={[
				[0, 5, <DronVertical src="dron.mp4" desde={T(8)} />],
				[5, 10, <DronVertical src="d115.mp4" />],
			]}
		/>
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.7) 0%, rgba(14,22,82,0) 35%, rgba(14,22,82,0) 55%, rgba(14,22,82,0.85) 100%)'}} />
		<Chip top={170}>VISTA DE DRON</Chip>
		<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260, textAlign: 'center'}}>
			<Texto size={110}>El Dorado desde el aire</Texto>
			<Texto size={46} peso={600} color={CREMA} retraso={10} style={{marginTop: 18}}>{DATOS.ubicacion}</Texto>
			<div style={{...useEntrada(24), marginTop: 50, fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: AZUL_OSCURO, background: 'white', padding: '24px 56px', borderRadius: 60}}>WhatsApp {DATOS.whatsapp}</div>
		</AbsoluteFill>
	</AbsoluteFill>
);

/* ───────────── HISTORIA 8 — «Tus domingos» (video 10 s, renders) ───────────── */
export const Historia8: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.6} />
		<Tomas
			tomas={[
				[0, 3.3, <VideoHorizontal src="clip_parrillas.mp4" top={660} />],
				[3.3, 6.6, <VideoHorizontal src="clip_infantil.mp4" top={660} />],
				[6.6, 10, <VideoHorizontal src="clip_deportivo.mp4" top={660} />],
			]}
		/>
		<Chip top={170}>ASÍ SERÁ</Chip>
		<AbsoluteFill style={{padding: '1360px 70px 0', textAlign: 'center', alignItems: 'center'}}>
			<Texto size={96}>Imagina tus domingos</Texto>
			<Texto size={46} peso={600} color={CREMA} retraso={10} style={{marginTop: 14}}>en El Dorado · Puerto Maldonado</Texto>
		</AbsoluteFill>
		<AbsoluteFill style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 120}}>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 40, color: AZUL_OSCURO, background: 'white', padding: '18px 44px', borderRadius: 60}}>WhatsApp {DATOS.whatsapp}</div>
		</AbsoluteFill>
	</AbsoluteFill>
);

/* ───────────── HISTORIA 9 — Encuesta (lámina fija, la sube Luis) ───────────── */
export const Historia9: React.FC = () => (
	<AbsoluteFill>
		<Img src={staticFile('render_1_8_parque.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '40% center', filter: 'blur(6px) brightness(0.75)', transform: 'scale(1.05)'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.88) 0%, rgba(14,22,82,0.4) 50%, rgba(14,22,82,0.88) 100%)'}} />
		<Referencial style={{right: 30, top: 60}} />
		<AbsoluteFill style={{alignItems: 'center', paddingTop: 200, textAlign: 'center'}}>
			<Logo size={150} />
			<div style={{marginTop: 30}}>
				<Etiqueta>Encuesta · El Dorado</Etiqueta>
			</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 104, color: 'white', lineHeight: 1.06, marginTop: 60, padding: '0 70px'}}>¿Para qué quieres tu lote?</div>
			<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 30}}>Vota aquí abajo 👇</div>
		</AbsoluteFill>
		<div style={{position: 'absolute', bottom: 120, left: 0, right: 0, textAlign: 'center', fontFamily: FUENTE, fontSize: 34, fontWeight: 700, color: 'white', opacity: 0.85}}>
			Grupo Vivencia · WhatsApp {DATOS.whatsapp}
		</div>
	</AbsoluteFill>
);
