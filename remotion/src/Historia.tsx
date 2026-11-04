import React from 'react';
import {AbsoluteFill, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {AZUL_OSCURO, CREMA, DATOS, DORADO, Etiqueta, FUENTE, Logo, Musica, useEntrada} from './marca';

// Historia 2 — Precio: dron + «Desde S/ 35,000 · Inicial S/ 5,000» + botón «Escríbenos». 10 s.
export const Historia: React.FC = () => {
	const f = useCurrentFrame();
	const pulso = 1 + 0.04 * Math.sin((f / 30) * Math.PI * 2) * interpolate(f, [90, 120], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	return (
		<AbsoluteFill style={{background: 'black'}}>
			<Musica />
			<OffthreadVideo src={staticFile('dron.mp4')} startFrom={150} muted />
			<AbsoluteFill style={{background: 'linear-gradient(180deg, rgba(14,22,82,0.6) 0%, rgba(14,22,82,0) 30%, rgba(14,22,82,0) 45%, rgba(14,22,82,0.9) 80%)'}} />
			<AbsoluteFill style={{alignItems: 'center', paddingTop: 170}}>
				<div style={useEntrada(0)}>
					<Logo size={170} />
				</div>
				<div style={{...useEntrada(6), marginTop: 30}}>
					<Etiqueta>El Dorado · Chorrillos km 5</Etiqueta>
				</div>
			</AbsoluteFill>
			<AbsoluteFill style={{justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 260, textAlign: 'center'}}>
				<div style={{...useEntrada(15), fontFamily: FUENTE, fontSize: 60, fontWeight: 700, color: CREMA}}>Lotes desde</div>
				<div style={{...useEntrada(22), fontFamily: FUENTE, fontSize: 170, fontWeight: 800, color: DORADO, lineHeight: 1}}>{DATOS.precio}</div>
				<div style={{...useEntrada(32), fontFamily: FUENTE, fontSize: 56, fontWeight: 700, color: 'white', marginTop: 24}}>Inicial {DATOS.inicial}</div>
				<div style={{...useEntrada(40), fontFamily: FUENTE, fontSize: 44, color: CREMA, marginTop: 10}}>{DATOS.plazo} para pagar</div>
				<div style={{...useEntrada(55), marginTop: 70}}>
					<div
						style={{
							transform: `scale(${pulso})`,
							fontFamily: FUENTE,
							fontWeight: 800,
							fontSize: 58,
							color: AZUL_OSCURO,
							background: 'white',
							padding: '30px 80px',
							borderRadius: 70,
							boxShadow: '0 10px 40px rgba(0,0,0,0.35)',
						}}
					>
						Escríbenos
					</div>
				</div>
				<div style={{...useEntrada(62), fontFamily: FUENTE, fontSize: 46, fontWeight: 700, color: 'white', marginTop: 30}}>WhatsApp {DATOS.whatsapp}</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
