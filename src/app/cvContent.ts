// Compatibility facade for existing private/local application profiles.
// New public code imports the factual model and view overlays explicitly.
export type * from './cvTypes';
export { careerData, careerFacts, earlierRoles, education } from './careerData';
export { cvViews, cvRoutes, getCvContent, getCvRedirect } from './cvViews';
