import React from 'react';
import {AbsoluteFill, Audio, Img, OffthreadVideo, staticFile, interpolate, useCurrentFrame, spring, useVideoConfig} from 'remotion';

// Colores de Grupo Vivencia (azul del logo) + dorado para El Dorado
export const AZUL = '#1B2A9B';
export const AZUL_OSCURO = '#0E1652';
export const DORADO = '#E9B44C';
export const CREMA = '#FFF8EC';
// Letra gratuita (OFL) incluida en /public para que se vea igual en la Mac y en la nube.
import {loadFont} from '@remotion/fonts';
loadFont({family: 'Figtree', url: staticFile('Figtree.ttf'), weight: '300 900'});
export const FUENTE = 'Figtree, Arial, sans-serif';

// Material: renders del Drive (EL DORADO/Renders), dron real (DJI 29-ago) y un clip de Higgsfield.
export const IMG = {
	portada: 'render_1_4_ingreso.jpg', // letrero EL DORADO
	infantil: 'render_1_9_infantil.jpg',
	pistas: 'render_1_6_pistas.jpg',
};
export const CLIP = {
	dron: 'dron.mp4',
	ingreso: 'clip_ingreso.mp4', // Parque ingreso.mp4, seg 38–46
	infantil: 'clip_infantil.mp4', // Parque infantil.mp4, seg 24–30
	pistas: 'clip_pistas.mp4', // Parque ingreso.mp4, seg 7–13
	pareja: 'hf_pareja.mp4', // Higgsfield 03-nov
};

// Música: Mixkit «Motivating Mornings» (Stock Music Free License, sin atribución). Sube y baja suave.
// Con voz: volumen bajo mientras habla y sube a volumenFinal desde el cuadro `desde`.
export const Musica: React.FC<{volumen?: number; volumenFinal?: number; desde?: number}> = ({volumen = 0.55, volumenFinal, desde}) => {
	const {durationInFrames} = useVideoConfig();
	return (
		<Audio
			src={staticFile('musica.mp3')}
			volume={(f) => {
				const base =
					volumenFinal !== undefined && desde !== undefined
						? interpolate(f, [desde, desde + 15], [volumen, volumenFinal], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
						: volumen;
				return base * interpolate(f, [0, 15, durationInFrames - 45, durationInFrames - 1], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
			}}
		/>
	);
};

export const Referencial: React.FC<{style?: React.CSSProperties}> = ({style}) => (
	<div style={{position: 'absolute', fontFamily: FUENTE, fontSize: 22, color: 'white', opacity: 0.8, letterSpacing: 1, textShadow: '0 1px 6px rgba(0,0,0,0.6)', ...style}}>
		Imagen referencial
	</div>
);

// Video horizontal (render 16:9) dentro de un formato vertical: copia desenfocada de fondo + video a todo el ancho.
export const VideoHorizontal: React.FC<{src: string; top?: number}> = ({src, top = 620}) => (
	<AbsoluteFill style={{background: AZUL_OSCURO}}>
		<AbsoluteFill style={{filter: 'blur(40px) brightness(0.55)', transform: 'scale(1.3)'}}>
			<OffthreadVideo src={staticFile(src)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
		</AbsoluteFill>
		<div style={{position: 'absolute', top, left: 0, width: 1080, height: 608, boxShadow: '0 20px 60px rgba(0,0,0,0.45)'}}>
			<OffthreadVideo src={staticFile(src)} muted style={{width: '100%', height: '100%', objectFit: 'cover'}} />
			<Referencial style={{right: 24, bottom: 16}} />
		</div>
	</AbsoluteFill>
);

// Datos aprobados (marketing/el-dorado/datos.md). No agregar otros.
export const DATOS = {
	ubicacion: 'Chorrillos km 5, Puerto Maldonado',
	precio: 'S/ 35,000',
	inicial: 'S/ 5,000',
	plazo: 'Hasta 3 años',
	cierre: 'Escríbenos al WhatsApp',
	whatsapp: '982 825 054',
};

export const Logo: React.FC<{size: number}> = ({size}) => (
	<div
		style={{
			width: size,
			height: size,
			borderRadius: size * 0.12,
			background: 'white',
			overflow: 'hidden',
			boxShadow: '0 10px 40px rgba(0,0,0,0.25)',
		}}
	>
		<Img src={staticFile('logo.png')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
	</div>
);

// Foto de fondo con zoom lento (efecto Ken Burns)
export const FondoFoto: React.FC<{src: string; oscuro?: number}> = ({src, oscuro = 0.35}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const escala = interpolate(frame, [0, durationInFrames], [1.05, 1.18]);
	return (
		<AbsoluteFill>
			<Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${escala})`}} />
			<AbsoluteFill
				style={{background: `linear-gradient(180deg, rgba(14,22,82,${oscuro * 0.6}) 0%, rgba(14,22,82,0) 35%, rgba(14,22,82,${oscuro + 0.35}) 100%)`}}
			/>
		</AbsoluteFill>
	);
};

export const useEntrada = (retraso = 0) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame: frame - retraso, fps, config: {damping: 200}});
	return {opacity: s, transform: `translateY(${(1 - s) * 40}px)`};
};

export const Etiqueta: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
	<div
		style={{
			display: 'inline-block',
			alignSelf: 'flex-start',
			background: DORADO,
			color: AZUL_OSCURO,
			fontFamily: FUENTE,
			fontWeight: 800,
			letterSpacing: 3,
			textTransform: 'uppercase',
			padding: '10px 22px',
			borderRadius: 8,
			fontSize: 30,
			...style,
		}}
	>
		{children}
	</div>
);
