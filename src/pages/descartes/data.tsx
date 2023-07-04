import SliderImage1 from  './../../assets/lab-descartes/descartes01.jpg';
import SliderImage2 from  './../../assets/lab-descartes/descartes02.png';
import SliderImage3 from  './../../assets/lab-descartes/descartes03.jpg';
import SliderImage4 from  './../../assets/lab-descartes/descartes04.jpg';

export const sliderData = [
    {
      id: 1,
      img: SliderImage1,
      text: "Al ver el ecosistema de la playa..."
    },
    {
      id: 2,
      img: SliderImage2,
      text: "Se preguntó qué pasaría al sacar el depredador principal, la estrella de mar..."
    },
    {
      id: 3,
      img: SliderImage3,
      text: "Pensó que el resto de las especies deberían prosperar..."
    },
    {
      id: 4,
      img: SliderImage4,
      text: "E hizo la prueba hacienda las estrellas de las pozas durante meses..."
    }
    
  ];

  export const questionsData = [

    {
      id: 1,
      header: "¿Cuál método sería más efectivo para probar la hipótesis de Paine?",
      goto: "/descartes-q2",
      quizId : "descartes",
      options:  [
        {
          id: 1,
          text: "Que la diversidad de especies es menor cuando se elimina el depredador principal de un ecosistema",
          correct: true
        },
        {
          id: 2,
          text: "Contar todos los animales en el ecosistema",
          correct: false
        },
        {
          id: 3,
          text: "Contar las nuevas crías de cada especie durante un año",
          correct: false
        },
        {
          id: 4,
          text: "Reducir las fuentes de alimentación en las piscinas",
          correct: false
        }
      ]
    },
    {
      id: 2,
      header: "Con base en el estado final del ecosistema, ¿qué demostró el experimento de Paine?",
      goto: "/dashboard",
      quizId : "descartes",
      options:  [
        {
          id: 1,
          text: "Que la diversidad de especies es menor cuando se elimina el depredador principal de un ecosistema",
          correct: true
        },
        {
          id: 2,
          text: "Que el segundo depredador del sistema se comerá todas las demás species",
          correct: false
        },
        {
          id: 3,
          text: "Que cuando se elimina el depredador principal emergerá otro depredador para crear un ecosistema igual de balanceado que el original",
          correct: false
        },
        {
          id: 4,
          text: "Que un ecosistema con varias especies puede prosperar sin la necesidad de un depredador principal",
          correct: false
        },
      ]
    }
  ];