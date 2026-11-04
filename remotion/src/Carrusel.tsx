import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {AZUL, AZUL_OSCURO, CREMA, DATOS, DORADO, Etiqueta, FUENTE, IMG, Logo, Referencial} from './marca';

// Carrusel 1 — «Todo lo que incluye tu lote». Cada cuadro (frame) = una lámina.
const s = {stroke: AZUL, strokeWidth: 7, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round'} as const;
const ICONOS: Record<string, React.ReactNode> = {
	agua: <path {...s} d="M60 12 C60 12 24 54 24 78 a36 36 0 0 0 72 0 C96 54 60 12 60 12 Z" />,
	luz: <path {...s} d="M68 10 L30 66 H58 L50 110 L90 50 H62 Z" />,
	parques: (
		<g {...s}>
			<path d="M60 80 C30 80 18 62 28 46 C22 28 40 14 54 20 C62 8 84 12 86 28 C102 34 100 60 86 66 C82 78 70 80 60 80 Z" />
			<path d="M60 80 V110 M60 92 L48 82 M60 98 L72 88 M40 110 H80" />
		</g>
	),
	pistas: (
		<g {...s}>
			<path d="M40 110 L52 12 M80 110 L68 12" />
			<path d="M60 24 V36 M60 54 V68 M60 86 V100" />
		</g>
	),
	titulo: (
		<g {...s}>
			<rect x="26" y="12" width="68" height="96" rx="8" />
			<path d="M40 38 H80 M40 56 H80 M40 74 H64" />
			<circle cx="78" cy="92" r="10" />
		</g>
	),
};

const LAMINAS: {k: string; t: string; d: string; foto?: string}[] = [
	{k: 'agua', t: 'Agua', d: 'Tu lote se entrega con agua.'},
	{k: 'luz', t: 'Luz', d: 'Tu lote se entrega con luz.'},
	{k: 'parques', t: 'Parques y áreas recreativas', d: 'Espacios para tu familia dentro de El Dorado.', foto: IMG.infantil},
	{k: 'pistas', t: 'Pistas mejoradas', d: 'Acceso cómodo a tu lote.', foto: IMG.pistas},
	{k: 'titulo', t: 'Título de propiedad', d: 'Tu lote, a tu nombre.'},
];
export const N_LAMINAS = LAMINAS.length + 2;

const Pie: React.FC<{n: number; claro?: boolean}> = ({n, claro}) => (
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
			opacity: 0.7,
		}}
	>
		<span>EL DORADO · GRUPO VIVENCIA</span>
		<span>
			{n}/{N_LAMINAS}
		</span>
	</div>
);

const Portada = () => (
	<AbsoluteFill>
		<Img src={staticFile(IMG.portada)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '8% center'}} />
		<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0) 30%, rgba(14,22,82,0.92) 85%)'}} />
		<Referencial style={{right: 28, top: 24}} />
		<AbsoluteFill style={{justifyContent: 'flex-end', padding: '0 80px 150px'}}>
			<Etiqueta>El Dorado · Puerto Maldonado</Etiqueta>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 110, color: 'white', lineHeight: 1.02, marginTop: 30}}>
				Todo lo que incluye tu lote
			</div>
			<div style={{fontFamily: FUENTE, fontSize: 40, color: CREMA, marginTop: 24}}>Desliza →</div>
		</AbsoluteFill>
		<Pie n={1} claro />
	</AbsoluteFill>
);

const LaminaFoto: React.FC<{i: number}> = ({i}) => {
	const l = LAMINAS[i];
	return (
		<AbsoluteFill style={{background: CREMA}}>
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 700, overflow: 'hidden'}}>
				<Img src={staticFile(l.foto!)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
				<Referencial style={{right: 28, bottom: 20}} />
			</div>
			<div style={{position: 'absolute', top: 640, left: 90, width: 130, height: 130, borderRadius: 30, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 40px rgba(27,42,155,0.18)'}}>
				<svg width="90" height="90" viewBox="0 0 120 120">
					{ICONOS[l.k]}
				</svg>
			</div>
			<div style={{position: 'absolute', top: 810, left: 90, right: 90}}>
				<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 84, color: AZUL_OSCURO, lineHeight: 1.05}}>{l.t}</div>
				<div style={{fontFamily: FUENTE, fontSize: 42, color: AZUL_OSCURO, opacity: 0.75, marginTop: 24, lineHeight: 1.3}}>{l.d}</div>
			</div>
			<Pie n={i + 2} />
		</AbsoluteFill>
	);
};

const Lamina: React.FC<{i: number}> = ({i}) => {
	const l = LAMINAS[i];
	if (l.foto) return <LaminaFoto i={i} />;
	return (
		<AbsoluteFill style={{background: CREMA, padding: '0 90px', justifyContent: 'center'}}>
			<div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 18, background: DORADO}} />
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 200, color: DORADO, opacity: 0.35, position: 'absolute', top: 70, right: 90}}>
				0{i + 1}
			</div>
			<div style={{width: 210, height: 210, borderRadius: 40, background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 12px 40px rgba(27,42,155,0.12)'}}>
				<svg width="140" height="140" viewBox="0 0 120 120">
					{ICONOS[l.k]}
				</svg>
			</div>
			<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 100, color: AZUL_OSCURO, lineHeight: 1.05, marginTop: 60}}>{l.t}</div>
			<div style={{fontFamily: FUENTE, fontSize: 46, color: AZUL_OSCURO, opacity: 0.75, marginTop: 30, lineHeight: 1.3}}>{l.d}</div>
			<Pie n={i + 2} />
		</AbsoluteFill>
	);
};

const Cierre = () => (
	<AbsoluteFill style={{background: AZUL_OSCURO, alignItems: 'center', justifyContent: 'center', padding: 80, textAlign: 'center'}}>
		<Logo size={300} />
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 84, color: 'white', marginTop: 60, lineHeight: 1.1}}>
			Desde <span style={{color: DORADO}}>{DATOS.precio}</span>
		</div>
		<div style={{fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 20}}>
			Inicial {DATOS.inicial} · {DATOS.plazo}
		</div>
		<div style={{fontFamily: FUENTE, fontWeight: 800, fontSize: 46, color: 'white', background: '#25D366', padding: '24px 48px', borderRadius: 60, marginTop: 60}}>
			WhatsApp {DATOS.whatsapp}
		</div>
		<div style={{fontFamily: FUENTE, fontSize: 34, color: CREMA, opacity: 0.8, marginTop: 36}}>{DATOS.ubicacion}</div>
		<Pie n={N_LAMINAS} claro />
	</AbsoluteFill>
);

export const Carrusel: React.FC = () => {
	const f = useCurrentFrame();
	if (f === 0) return <Portada />;
	if (f === N_LAMINAS - 1) return <Cierre />;
	return <Lamina i={f - 1} />;
};
