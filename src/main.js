//Esto debo desmarcarlo el dia que quiera hacer cambios.
//Tambien en el index debo quitar el enlace del css y con descomentar esto ya
//puedo usar scss
// import "../sass/style.scss";
import { GradientGenerator } from "./components/GradientGenerator.js";

// Solo inicializa GradientGenerator si existe el elemento
const preview = document.getElementById("gradientPreview");
if (preview) {
  const gradient = new GradientGenerator();
  gradient.init();
}
