import {create} from 'twrnc';

import {tailwindConfig} from './tailwind.config';

// create the customized version of tw using our tailwind config
// should be used across the app instead of the default tw from twrnc.
export const tw = create(tailwindConfig);
