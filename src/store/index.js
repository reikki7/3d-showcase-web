import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#fa1e1b",
  isLogoTexture: true,
  isFullTexture: true,
  logoDecal: "./logo_default.png",
  fullDecal: "./texture_default.png",
});

export default state;
