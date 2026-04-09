/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Allow CSS side-effect imports
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}
