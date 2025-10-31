export class GradientGenerator {
  constructor() {
    this.direccion = "to right";
    this.mode = "linear"; // linear o radial
    this.color1 = "#84994F";
    this.color2 = "#B45253";
    this.color3 = "#FCB53B";

    // Referencias al DOM
    this.previewElement = document.getElementById("gradientPreview");
    this.codeElement = document.getElementById("cssCode");
    this.colorPicker1 = document.getElementById("color1");
    this.colorPicker2 = document.getElementById("color2");
    this.directionsRoot = document.getElementById("directions");
    this.circular = document.getElementById("circular");
    this.codeInput1 = document.getElementById("color1-code");
    this.codeInput2 = document.getElementById("color2-code");
    this.colorPicker3 = document.getElementById("color3");
    this.codeInput3 = document.getElementById("color3-code");
  }

  init() {
    // Pintar al inicio con los valores por defecto
    this.render();

    // FIRST COLOR
    this.colorPicker1.addEventListener("input", () => {
      // Leer el nuevo valor
      let nuevoColor = this.colorPicker1.value;
      // Actualizar estado interno
      this.color1 = nuevoColor;
      // Llamar a la funcion que se ecarga de pintar el preview
      this.render();
    });

    // Pasar de texto a color en el primer color
    this.codeInput1.addEventListener("input", () => {
      this.handleCodeInput(1, this.codeInput1.value);
    });
    this.codeInput1.addEventListener("blur", () => {
      this.formatCodeInput(1);
    });

    //SECOND COLOR
    this.colorPicker2.addEventListener("input", () => {
      // Leer el nuevo valor
      let nuevoColor2 = this.colorPicker2.value;
      // Actualizar estado interno
      this.color2 = nuevoColor2;
      // Llamar a la funcion que se ecarga de pintar el preview
      this.render();
    });

    //// Pasar de texto a color en el segiundo color
    this.codeInput2.addEventListener("input", () => {
      this.handleCodeInput(2, this.codeInput2.value);
    });
    this.codeInput2.addEventListener("blur", () => {
      this.formatCodeInput(2);
    });

    // Tercer color si es que existe en el nodo
    if (this.colorPicker3) {
      this.colorPicker3.addEventListener("input", () => {
        // igualamos el color al valor del picker
        this.color3 = this.colorPicker3.value;
        // Pintamos
        this.render();
      });
    }

    if (this.codeInput3) {
      this.codeInput3.addEventListener("input", () => {
        this.handleCodeInput(3, this.codeInput3.value);
      });

      this.codeInput3.addEventListener("blur", () => {
        this.formatCodeInput(3);
      });
    }

    this.gradientDirections();
  }

  render() {
    // generar el string CSS
    // Se aplican los cvalores por defecto puestos en el constructor.
    //Construimos la lista de colores (stops) que van dentro del gradiente.
    // Si existe el tercer color en el dom
    const stops =
      this.colorPicker3 || this.codeInput3
        ? // Usamos los tres colores si no existe solo usamos los otros 2
          `${this.color1}, ${this.color2}, ${this.color3}`
        : `${this.color1}, ${this.color2}`;

    // Comprobamos si el modo de pintar es el lineal o el radial
    if (this.mode === "linear") {
      // generamos Css del gradiante lineal en la direccion seleccionada y los colores
      // es decir 2 o 3 colores
      const cssCode = `linear-gradient(${this.direccion}, ${stops})`;

      //Aplicamos el fondo del gradiante generado en el preview de la pagina
      this.previewElement.style.background = cssCode;

      // Mostramos el resultado en el apartado del css
      this.codeElement.textContent = `background-image: ${cssCode}`;

      // En caso de que sea ralial
    } else {
      //Contruimods un gradiante circiular con 2 o 3 colores
      const cssCircularCode = `radial-gradient(${stops})`;

      // Lo aplicamos al preview
      this.previewElement.style.background = cssCircularCode;

      // Lo imprimimos en el apartado del css
      this.codeElement.textContent = `background-image: ${cssCircularCode}`;
    }
    // Actualizamos los pickers para que reflejen el estado (color) actual seleccionados.
    this.updateColorPickers();
  }

  updateColorPickers() {
    // Función que sincroniza los inputs (color picker + texto) con el estado actual.
    // Refresca el color mostrado en los displays y el valor escrito en los inputs
    //Repintar el picker
    const newPickerColor1 = this.color1;
    //Repintamos el fondo de los color-picker del mismo color
    // LLamamos al display
    let displayColor = document.getElementById("color-display");
    // Le asignamos el color que se ha elegido
    displayColor.style.backgroundColor = newPickerColor1;
    // cambiamos el codigo del imput
    const PickerCode1 = document.getElementById("color1-code");
    PickerCode1.value = newPickerColor1;

    //Repintar el picker 2
    const newPickerColor2 = this.color2;
    let displayColor2 = document.getElementById("color-display-2");
    displayColor2.style.backgroundColor = newPickerColor2;
    const PickerCode2 = document.getElementById("color2-code");
    PickerCode2.value = newPickerColor2;

    // En caso de un tercer color
    if (this.colorPicker3) {
      const newPickerColor3 = this.color3;
      let displayColor3 = document.getElementById("color-display-3");
      if (displayColor3) displayColor3.style.backgroundColor = newPickerColor3;
      const PickerCode3 = document.getElementById("color3-code");
      if (PickerCode3) PickerCode3.value = newPickerColor3;
    }
  }

  gradientDirections() {
    // SI ES LINEAL
    // Solo un listener en el contenedoir de las direcciones para tratarlas todas excepto el circular
    this.directionsRoot.addEventListener("click", (e) => {
      // accedemos a la direccion de data dir del elemento mas cercano por si pinchamos en un lugar erroneo
      const clickedElement = e.target.closest("[data-dir]");
      // si no hay objetivo válido, sal
      if (!clickedElement) return;
      //cambiamos el mode de lienar a radial solo si hay obkjeto valido
      this.mode = "linear";
      // llamamos a la funcion de las direcciones
      this.handleDirectionChange(clickedElement.dataset.dir);
    });

    // SI ES RADIAL
    this.circular.addEventListener("click", (e) => {
      const circularClickedEl = e.target.closest("[data-kind]");
      // si no se encuentra ningun data dir dejamo paramos
      if (!circularClickedEl) return;
      //llamamos a la funcion de pintar el circular
      this.handleCircularDirection();
    });
  }

  handleDirectionChange(nuevaDireccion) {
    // actualizamos el estado
    this.direccion = nuevaDireccion;
    // repintamos
    this.render();
  }

  handleCircularDirection() {
    this.mode = "radial";
    // repintamos pero circular
    this.render();
  }

  normalizeHex(variableRecibida) {
    // Normaliza el hex de cada color.
    // Devuelve el HEX en mayúsculas si es válido o null si no lo es.
    // Si el valor que llega es null undefined o una cadena vacía devuelve null
    if (!variableRecibida) return null;
    // Elimina espacios en blanco al inicio y al final
    let sinEspacios = variableRecibida.trim();
    // Si el texto no empieza por # se lo añade.
    if (!sinEspacios.startsWith("#")) {
      sinEspacios = "#" + sinEspacios;
    }
    // Se comprueba que el formato es correcto .
    const ok = /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(sinEspacios);
    return ok ? sinEspacios.toUpperCase() : null;
  }

  handleCodeInput(colorIndex, inputValue) {
    //Esta funcion conecta lo que escribes en el input de texto con el picker, el estado interno de la clase y el preview.
    //Toma el valor escrito y lo pasa por mnormlaize
    const newHexColor = this.normalizeHex(inputValue);
    // si el valor no es valido se marca como invalido y se sale de la funcion
    if (!newHexColor) {
      this.setInvalid(colorIndex, true);
      return; // hasta que sea válido no repintamos
    }

    // si es vaalido se marca como tal
    this.setInvalid(colorIndex, false);

    // Si el color es el 1
    if (colorIndex === 1) {
      // Se guarda el hex del nuevo color en el color primero
      this.color1 = newHexColor;
      // Se sincroniza el input
      this.colorPicker1.value = newHexColor;
    } else if (colorIndex === 2) {
      this.color2 = newHexColor;
      this.colorPicker2.value = newHexColor;
    } else if (colorIndex === 3 && this.colorPicker3) {
      this.color3 = newHexColor;
      this.colorPicker3.value = newHexColor;
    }

    // Repintamos el preview y el css
    this.render();
  }

  setInvalid(colorIndex, isInvalid) {
    //Controla si el input de texto del color  debe verse como inválido (cuando escribes un valor que no es un HEX correcto)
    //la funcion un switch visual de error para los campos de texto de los colores

    // Segun el numero que llegue 1 o 2 se selecciona el color 1 o el dos
    const targetInput =
      colorIndex === 1
        ? this.codeInput1
        : colorIndex === 2
        ? this.codeInput2
        : this.codeInput3;
    // Si el parametro isInvalid es verdadero añade la clase css invalido al input elejido
    if (!targetInput) return;
    // si es faslo se elimina y vuelve a la normalidad
    if (isInvalid) targetInput.classList.add("is-invalid");
    else targetInput.classList.remove("is-invalid");
  }

  formatCodeInput(colorIndex) {
    //Se encarga de formatear el texto escrito en el input de color (el 1 o el 2) para que quede en un formato estándar HEX si es válido. Normaliza el valor no repinta el gradiente.
    //sirve para que cuando el input pierda el foco (por ejemplo al salir del campo) el valor escrito quede limpio y normalizado en formato HEX estándar.
    //segun el indice selecciona el color 1 o 2
    const targetInput = colorIndex === 1 ? this.codeInput1 : this.codeInput2;
    //Toma lo que el usuario escribió en ese input (targetInput.value).
    //Lo pasa por normalizeHex, que lo intenta transformar en un código HEX válido.
    //Si es válido, devuelve algo como "#FF0000".
    //Si no lo es, devuelve null.
    const normalizedHex = this.normalizeHex(targetInput.value);
    // normaliza (añade # y mayúsculas)
    if (normalizedHex) targetInput.value = normalizedHex;
  }
}
