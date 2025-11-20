export const imagePathMapping = (imageName: string) => {
    const imageMap: { [key: string]: any } = {
        //think
        'alcohol': require('../assets/pictogram/think/alcohol.png'),
        'competency': require('../assets/pictogram/think/competency.png'),
        'formation': require('../assets/pictogram/think/formation.png'),
        'materiel': require('../assets/pictogram/think/materiel.png'),
        'people': require('../assets/pictogram/think/people.png'),

        //organise
        'swp': require('../assets/pictogram/organise/swp.png'),
        'document': require('../assets/pictogram/organise/document.png'),
        'workpermit': require('../assets/pictogram/organise/workpermit.png'),
        'falling-rock': require('../assets/pictogram/organise/falling-rock.png'),
        'fire_warning': require('../assets/pictogram/organise/fire_warning.png'),
        'pelle': require('../assets/pictogram/organise/pelle.png'),

        //risk
        'biohazard': require('../assets/pictogram/hazard/biohazard.png'),
        'electricity': require('../assets/pictogram/hazard/electricity.png'),
        'fatal': require('../assets/pictogram/hazard/fatal.png'),
        //'fire_warning': require('../assets/pictogram/hazard/fire_warning.png'),
        'other-hazard': require('../assets/pictogram/hazard/other-hazard.png'),
        'slippery': require('../assets/pictogram/hazard/slippery.png'),
        'watch-steps': require('../assets/pictogram/hazard/watch-steps.png'),
        'unknown': require('../assets/pictogram/hazard/unknown.png'),

        //epi
        'antibruit': require('../assets/pictogram/epi/antibruit.png'),
        'face-protection': require('../assets/pictogram/epi/face-protection.png'),
        'mask2': require('../assets/pictogram/epi/mask2.png'),
        'gant': require('../assets/pictogram/epi/gant.png'),
        'gilet': require('../assets/pictogram/epi/gilet.png'),
        'gilet2': require('../assets/pictogram/epi/gilet2.png'),
        'helmet': require('../assets/pictogram/epi/helmet.png'),
        'mask': require('../assets/pictogram/epi/mask2.png'),
        'glass2': require('../assets/pictogram/epi/glass2.png'),
        'uniform': require('../assets/pictogram/epi/uniform.png'),
        'shoes': require('../assets/pictogram/epi/shoes.png'),

    };

    const source = imageMap[imageName];
    if (source) {
        return source;
    } else {
        console.warn(`Image not found: ${imageName}`);
        return require('../assets/pictogram/not_available.png');
    }
};