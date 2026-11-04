import React from 'react';
import {AbsoluteFill, Audio, OffthreadVideo, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {AZUL_OSCURO, CLIP, CREMA, DATOS, DORADO, Etiqueta, FUENTE, Logo, Musica, useEntrada, VideoHorizontal} from './marca';

const T = (s: number) => Math.round(s * 30);

const Titulo: React.FC<{children: React.ReactNode; size?: number; retraso?: number}> = ({children, size = 92, retraso = 0}) => {
	const e = useEntrada(retraso);
	return (
		<div style={{...e, fontFamily: FUENTE, fontWeight: 800, fontSize: size, lineHeight: 1.05, color: 'white', textShadow: '0 4px 30px rgba(0,0,0,0.45)'}}>
			{children}
		</div>
	);
};

// 1) 0–3 s: dron + gancho
const Escena1 = () => (
	<AbsoluteFill>
		<OffthreadVideo src={staticFile('dron.mp4')} muted />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.55), rgba(14,22,82,0) 45%)'}} />
		<AbsoluteFill style={{padding: '220px 80px 0'}}>
			<Titulo>¿Un lote propio en Puerto Maldonado?</Titulo>
		</AbsoluteFill>
	</AbsoluteFill>
);

// 2) 3–10 s: ingreso (render) + precio
const Escena2 = () => (
	<AbsoluteFill>
		<VideoHorizontal src={CLIP.ingreso} top={560} />
		<AbsoluteFill style={{padding: '300px 80px 0'}}>
			<div style={useEntrada(0)}>
				<Etiqueta>El Dorado · Chorrillos km 5</Etiqueta>
			</div>
		</AbsoluteFill>
		<AbsoluteFill style={{padding: '1240px 80px 0'}}>
			<Titulo size={64} retraso={8}>Lotes desde</Titulo>
			<Titulo size={150} retraso={14}>
				<span style={{color: DORADO}}>{DATOS.precio}</span>
			</Titulo>
		</AbsoluteFill>
	</AbsoluteFill>
);

// 3) 10–18 s: lo que incluye
const Item: React.FC<{texto: string; i: number}> = ({texto, i}) => {
	const e = useEntrada(10 + i * 10);
	return (
		<div style={{...e, display: 'flex', alignItems: 'center', gap: 24, marginBottom: 22}}>
			<div style={{width: 22, height: 22, borderRadius: 11, background: DORADO}} />
			<div style={{fontFamily: FUENTE, fontWeight: 700, fontSize: 70, color: 'white', textShadow: '0 4px 24px rgba(0,0,0,0.5)'}}>{texto}</div>
		</div>
	);
};
const Escena3 = () => (
	<AbsoluteFill>
		<Sequence durationInFrames={T(1.7)}>
			<VideoHorizontal src={CLIP.infantil} top={260} />
		</Sequence>
		<Sequence from={T(1.7)}>
			<VideoHorizontal src={CLIP.pistas} top={260} />
		</Sequence>
		<AbsoluteFill style={{padding: '960px 80px 0'}}>
			<Titulo size={56}>Se entrega con</Titulo>
			<div style={{height: 30}} />
			{['Agua', 'Luz', 'Parques', 'Pistas mejoradas'].map((t, i) => (
				<Item key={t} texto={t} i={i} />
			))}
		</AbsoluteFill>
	</AbsoluteFill>
);

// 4) 18–25 s: condiciones
const Bloque: React.FC<{arriba: string; abajo: string; i: number}> = ({arriba, abajo, i}) => {
	const e = useEntrada(6 + i * 12);
	return (
		<div style={{...e, marginBottom: 64}}>
			<div style={{fontFamily: FUENTE, fontSize: 40, color: DORADO, fontWeight: 800, letterSpacing: 4, textTransform: 'uppercase'}}>{arriba}</div>
			<div style={{fontFamily: FUENTE, fontSize: 104, color: 'white', fontWeight: 800, lineHeight: 1.05}}>{abajo}</div>
		</div>
	);
};
const Escena4 = () => (
	<AbsoluteFill style={{background: AZUL_OSCURO}}>
		<AbsoluteFill style={{opacity: 0.4}}>
			<OffthreadVideo src={staticFile(CLIP.pareja)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
		</AbsoluteFill>
		<AbsoluteFill style={{background: 'linear-gradient(90deg, rgba(14,22,82,0.85) 0%, rgba(14,22,82,0.3) 100%)'}} />
		<AbsoluteFill style={{justifyContent: 'center', padding: '0 90px'}}>
			<Bloque arriba="Inicial" abajo={DATOS.inicial} i={0} />
			<Bloque arriba="Financiamiento" abajo={DATOS.plazo} i={1} />
			<Bloque arriba="Con" abajo="Título de propiedad" i={2} />
		</AbsoluteFill>
	</AbsoluteFill>
);

// 5) 25–30 s: logo + WhatsApp
const Escena5 = () => (
	<AbsoluteFill style={{background: CREMA, alignItems: 'center', justifyContent: 'center', gap: 50}}>
		<div style={useEntrada(0)}>
			<Logo size={420} />
		</div>
		<div style={{...useEntrada(10), fontFamily: FUENTE, fontWeight: 800, fontSize: 64, color: AZUL_OSCURO, textAlign: 'center'}}>
			Grupo Vivencia
		</div>
		<div
			style={{
				...useEntrada(18),
				fontFamily: FUENTE,
				fontWeight: 800,
				fontSize: 50,
				color: 'white',
				background: '#25D366',
				padding: '26px 50px',
				borderRadius: 60,
			}}
		>
			WhatsApp {DATOS.whatsapp}
		</div>
		<div style={{...useEntrada(24), fontFamily: FUENTE, fontSize: 38, color: AZUL_OSCURO, opacity: 0.75}}>{DATOS.ubicacion}</div>
	</AbsoluteFill>
);

// Subtítulos: tiempos sacados de la voz (Whisper), texto corregido a mano.
const SUBS: [number, number, string][] = [
	[0.1, 1.69, '¿Un lote propio'],
	[1.69, 4.1, 'en Puerto Maldonado?'],
	[4.12, 5.4, 'En El Dorado,'],
	[5.44, 7.04, 'Chorrillos km 5,'],
	[7.05, 8.13, 'los lotes están desde'],
	[8.13, 10.0, 'S/ 35,000'],
	[10.04, 11.66, 'con agua, luz, parques'],
	[11.66, 13.35, 'y pistas mejoradas.'],
	[13.35, 15.55, 'Separa con una inicial de S/ 5,000'],
	[15.55, 17.09, 'y paga hasta en 3 años'],
	[17.09, 18.79, 'con título de propiedad.'],
	[18.79, 20.38, 'Escríbenos al WhatsApp'],
	[20.38, 23.6, '982 825 054'],
];
const Subtitulos = () => {
	const f = useCurrentFrame();
	const t = f / 30;
	const s = SUBS.find(([a, b]) => t >= a && t < b);
	if (!s) return null;
	const local = f - Math.round(s[0] * 30);
	const pop = interpolate(local, [0, 4], [0.9, 1], {extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill style={{justifyContent: 'flex-start', alignItems: 'center', paddingTop: 1560}}>
			<div
				style={{
					transform: `scale(${pop})`,
					fontFamily: FUENTE,
					fontWeight: 800,
					fontSize: 54,
					color: 'white',
					background: 'rgba(14,22,82,0.82)',
					padding: '14px 30px',
					borderRadius: 18,
					maxWidth: 900,
					textAlign: 'center',
				}}
			>
				{s[2]}
			</div>
		</AbsoluteFill>
	);
};

export const DURACION_REEL = T(26);

export const Reel: React.FC = () => (
	<AbsoluteFill style={{background: 'black'}}>
		<Musica volumen={0.16} volumenFinal={0.5} desde={T(23.6)} />
		<Audio src={staticFile('voz-reel-1.mp3')} volume={1} />
		<Sequence durationInFrames={T(4.1)}>
			<Escena1 />
		</Sequence>
		<Sequence from={T(4.1)} durationInFrames={T(5.95)}>
			<Escena2 />
		</Sequence>
		<Sequence from={T(10.05)} durationInFrames={T(3.3)}>
			<Escena3 />
		</Sequence>
		<Sequence from={T(13.35)} durationInFrames={T(5.45)}>
			<Escena4 />
		</Sequence>
		<Sequence from={T(18.8)}>
			<Escena5 />
		</Sequence>
		<Subtitulos />
	</AbsoluteFill>
);
