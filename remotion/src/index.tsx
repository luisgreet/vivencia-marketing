import React from 'react';
import {Composition, registerRoot} from 'remotion';
import {DURACION_REEL, Reel} from './Reel';
import {Carrusel, N_LAMINAS} from './Carrusel';
import {Historia} from './Historia';
import {Carrusel4, Carrusel5, Carrusel6, DUR_REEL4, DUR_REEL5, DUR_REEL6, Historia4, Historia5, Historia6, N_CARRUSEL4, N_CARRUSEL5, N_CARRUSEL6, Reel4, Reel5, Reel6} from './Semana2';
import {Carrusel2, Carrusel3, DUR_REEL2, DUR_REEL3, Historia1, Historia3, N_CARRUSEL2, N_CARRUSEL3, Reel2, Reel3} from './Semana';

import {Carrusel7, Carrusel8, Carrusel9, DUR_REEL7, DUR_REEL8, DUR_REEL9, Historia7, Historia8, Historia9, N_CARRUSEL7, N_CARRUSEL8, N_CARRUSEL9, Reel7, Reel8, Reel9} from './Semana3';

const V = {fps: 30, width: 1080, height: 1920};
const C = {fps: 30, width: 1080, height: 1350};

const Root: React.FC = () => (
	<>
		<Composition id="Reel" component={Reel} durationInFrames={DURACION_REEL} {...V} />
		<Composition id="Reel2" component={Reel2} durationInFrames={DUR_REEL2} {...V} />
		<Composition id="Reel3" component={Reel3} durationInFrames={DUR_REEL3} {...V} />
		<Composition id="Carrusel" component={Carrusel} durationInFrames={N_LAMINAS} {...C} />
		<Composition id="Carrusel2" component={Carrusel2} durationInFrames={N_CARRUSEL2} {...C} />
		<Composition id="Carrusel3" component={Carrusel3} durationInFrames={N_CARRUSEL3} {...C} />
		<Composition id="Historia" component={Historia} durationInFrames={300} {...V} />
		<Composition id="Historia1" component={Historia1} durationInFrames={1} {...V} />
		<Composition id="Historia3" component={Historia3} durationInFrames={300} {...V} />
		<Composition id="Reel4" component={Reel4} durationInFrames={DUR_REEL4} {...V} />
		<Composition id="Reel5" component={Reel5} durationInFrames={DUR_REEL5} {...V} />
		<Composition id="Reel6" component={Reel6} durationInFrames={DUR_REEL6} {...V} />
		<Composition id="Carrusel4" component={Carrusel4} durationInFrames={N_CARRUSEL4} {...C} />
		<Composition id="Carrusel5" component={Carrusel5} durationInFrames={N_CARRUSEL5} {...C} />
		<Composition id="Carrusel6" component={Carrusel6} durationInFrames={N_CARRUSEL6} {...C} />
		<Composition id="Historia4" component={Historia4} durationInFrames={1} {...V} />
		<Composition id="Historia5" component={Historia5} durationInFrames={300} {...V} />
		<Composition id="Historia6" component={Historia6} durationInFrames={1} {...V} />
		<Composition id="Reel7" component={Reel7} durationInFrames={DUR_REEL7} {...V} />
		<Composition id="Reel8" component={Reel8} durationInFrames={DUR_REEL8} {...V} />
		<Composition id="Reel9" component={Reel9} durationInFrames={DUR_REEL9} {...V} />
		<Composition id="Carrusel7" component={Carrusel7} durationInFrames={N_CARRUSEL7} {...C} />
		<Composition id="Carrusel8" component={Carrusel8} durationInFrames={N_CARRUSEL8} {...C} />
		<Composition id="Carrusel9" component={Carrusel9} durationInFrames={N_CARRUSEL9} {...C} />
		<Composition id="Historia7" component={Historia7} durationInFrames={300} {...V} />
		<Composition id="Historia8" component={Historia8} durationInFrames={300} {...V} />
		<Composition id="Historia9" component={Historia9} durationInFrames={1} {...V} />
	</>
);

registerRoot(Root);
