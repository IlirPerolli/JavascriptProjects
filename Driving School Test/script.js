'use strict';
const next = document.querySelector('.next');
const previous = document.querySelector('.previous');
const complete = document.querySelector('.complete');
const questionsContainer = document.querySelector('.container');
const questionCounterLabel = document.querySelector('.question-counter');
const questionTitle = document.querySelector('.title');
const questions = document.querySelectorAll('.question');

const questionsLabel = document.querySelectorAll('#label-question');

const questionInput = document.querySelectorAll('.individual-question');
const questionPhoto = document.querySelector('.question-photo');
const result = document.querySelector('.result');
const resultTitle = document.querySelector('.result-title');
const pointsTitle = document.querySelector('.points');
const resultBody = document.querySelector('.result-body');
const modal = document.querySelector('.modal');
const modalHeading = document.querySelector('.modal-heading');
const modalBody = document.querySelector('.modal-body');
const overlay = document.querySelector('.overlay');
const modalQuestions = document.querySelectorAll('.modal-question');
const modalPhoto = document.querySelector('.modal-question-photo');
const btnCloseModal = document.querySelector('.close-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  result.classList.add('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  result.classList.remove('hidden');
};
const modalQuestionsLabel = document.querySelectorAll('.modal-label-question');
let questionCounter = 0;
let correctAnswers = 0;
let points = 0;

const mistakes = [];
questionsContainer.classList.remove('hidden');
const questionsDict = {
  question_0: {
    title: 'A lejohet parkimi i mjetit në trotuar, në këtë situatë?',
    questions: [
      'Jo, pasi pengohet dhe rrezikohet trafiku',
      'Po.',
      ' Po, sepse nuk ka këmbësorë në rrugë.',
    ],
  },
  question_1: {
    title: ' A ju lejohet tejkalimi i dy mjeteve njëkohësisht?',
    questions: [
      'Jo, në asnjë rast.',
      'Po, nëse rruga nga kahu i kundërt është e lirë dhe me shenja të trafikut nuk është i ndaluar.',
      'Jo, vetëm jashtë zonave urbane.',
    ],
  },
  question_2: {
    title:
      ' Në semafor është e ndezur shigjeta e gjelbër. A ju lejohet lëvizja në këtë situatë? ',
    questions: [
      'Po, djathtas duke iu dhënë përparësi kalimi të gjithë pjesëmarrësve në trafik.',
      'Jo, në asnjë drejtim.',
      'Po, djathtas, drejtë ose majtas.',
    ],
  },
  question_3: {
    title:
      'Cilat janë rreziqet e mundshme gjatë ngasjes si në këtë situatë (me shi)?',
    questions: [
      'Zvogëlohet (dobësohet) dukshmëria.',
      'Kontakti i gomave me rrugën zvogëlohet dukshëm.',
      'Në rast të frenimit zgjatet koha e reagimit.',
    ],
  },
  question_4: {
    title: ' Çka tregon kjo shenjë e trafikut? ',
    questions: [
      'Pjesën e rrugës ku ndalohet kalërimi.',
      'Shtegun për kalorës.',
      'Mbarimin e shtegut për kalorës.',
    ],
  },
  question_5: {
    title: ' Çka paralajmëron kjo shenjë e trafikut? ',
    questions: [
      'Vendkalimin hekurudhor të pasiguruar.',
      'Stacionin e tramvajit.',
      'Rrugë tramvaji.',
    ],
  },
  question_6: {
    title: 'Çka tregon kjo shenjë e trafikut? ',
    questions: [
      'Vendndaljen për autobus.',
      'Vendndaljen për tramvaj.',
      'Vendndaljen për trena.',
    ],
  },
  question_7: {
    title: ' Çka na tregon kjo shenjë e trafikut? ',
    questions: [
      'Vendin e rrugës në të cilën fëmijët lëvizin shpesh ose në numër të madh.',
      'Shtegun për këmbësorë.',
      'Vendkalimin e shënuar për këmbësorë.',
    ],
  },
  question_8: {
    title: ' Si do të veproni nëse gjysmëbarrierat kanë filluar të ngriten?',
    questions: [
      'Duhet të ndalem para vendkalimit hekurudhor deri sa të përfundojë ngritja e gjysmëbarrierave.',
      'Duhet ta kaloj vendkalimin hekurudhor në pjesën e majtë të rrugës.',
      'Nëse nuk ka mjet nga kahu i kundërt e kaloj vendkalimin hekurudhor nga ana e majtë e rrugës.',
    ],
  },
  question_9: {
    title:
      'Pas një kohe ngasjeje (udhëtimi) të gjatë, doni të dilni nga autoudha. Çka duhet pasur parasysh në këtë rast?',
    questions: [
      'Do të kontrolloj shpejtësinë.',
      'Do të zvogloj shpejtësinë në shiritin për ngadalsim sipas nevojës.',
      'Daljen nga autoudha e sinjalizoj me treguesin e drejtimit.',
    ],
  },
  question_10: {
    title:
      'Çka duhet të keni parasysh gjatë ngasjes në “Zonën e trafikut të qetë”?',
    questions: [
      'Mund të has në fëmijët duke luajtur me top në rrugë.',
      'Më lejohet lëvizja jo më shpejt se shpejtësia e lëvizjës së këmbësorëve.',
      'Duhet t’i ndezi të gjithë treguesit e drejtimit.',
    ],
  },
  question_11: {
    title: 'Kur duhet të përdoret rripi i sigurisë? ',
    questions: [
      'Gjatë ngasjes brenda zonës urbane.',
      'Gjatë ngasjes jashtë zonës urbane.',
      'Vetëm nëse zhvillohet shpejtësia mbi 30 km/h.',
    ],
  },
  question_12: {
    title: ' Kur duhet rritur distanca e sigurisë ndërmjetë mjeteve? ',
    questions: [
      'Nëse shpejtësia është e madhe.',
      'Nëse rruga është e rrëshqitëshme.',
      'Vetëm gjatë lëvizjes brenda zonës urbane.',
    ],
  },
  question_13: {
    title:
      '  Çka duhet të keni prasysh nëse keni hasur shenjën “Afërsia e tunelit”?',
    questions: [
      'Do ta përshtati shpejtësinë e lëvizjes sipas nevojës do ta zvogëloj.',
      'Do t’i përdori dritat e shkurtëra për ndriçimin e rrugës.',
      'Nëse tuneli është i ndriçuar mirë, nuk kam nevojë t’i ndez dritat e shkurtëra.',
    ],
  },
  question_14: {
    title: ' A lejohet tejkalimi në afërësi të qafë së malit? ',
    questions: [
      'Jo, nëse rruga ka vetëm një shirit të trafikut për një kah.',
      'Po, vetëm nëse nuk ka mjete tjera në rrugë.',
      'Po, nëse rruga ka së paku dy shirita të trafikut për një kah.',
    ],
  },
  question_15: {
    title: 'Si do të ngitni nëpër autoudhë?',
    questions: [
      'Do të ngas në shiritin e djathtë të skajshëm nëse nuk është i zënë në kolonë.',
      'Kohë pas kohe do të vështroj trafikun nga prapa.',
      'Me shpejtësi maksimale që zhvillon automjeti.',
    ],
  },
  question_16: {
    title:
      ' Çka duhet të keni parasysh kur i afroheni një kryqëzimi me rrugë me rëndësi të njëjtë?  ',
    questions: [
      'Respektimin e rregullës së krahut të djathtë.',
      'Tramvaji ka përparësi kalimi pa marrë parasysh nga cila anë vjen.',
      'Mjeti nën përcjellje ka përparësi kalimi kur është në intervenim.',
    ],
  },
  question_17: {
    title:
      '  Ngarkesa në mjetin e udhëtarëve (veturë) kalon pikën më të skajshme më tepër se 1m në anën e pasme. Si duhet të shënohet? ',
    questions: [
      'Me trekëndësh të sigurisë.',
      'Me pëlhurë të kuqe.',
      'Me tabelë 40 x50cm.',
    ],
  },
  question_18: {
    title:
      ' Nga cila anë mund ta anashkalojë shoferi ishullin për këmbësorë i cili gjendet në mes të rrugës me një kah? ',
    questions: [
      'Nga ana e djathtë.',
      'Nga ana e majtë.',
      'Vetëm nga ana e mjatë.',
    ],
  },
  question_19: {
    title: 'Në çka duhet të përqëndrojë vëmendjen shoferi gjatë ngasjes?  ',
    questions: [
      'Në këmbësorë.',
      'Në reklama të cilat gjenden përgjatë rrugës.',
      'Në shenjat e trafikut.',
    ],
  },
  question_20: {
    title: ' Si do të veproni para se të ndërroni shiritin e trafikut? ',
    questions: [
      'Duhet vështruar trafikun nga prapa.',
      'Me kohë e paralajmroj veprimin me tregues të drejtimit.',
      'Duhet shikuar në këndin e vdekur.',
    ],
  },
  question_21: {
    title:
      ' A lejohet terëheqja e mjetit me defekt nëse sistemi i drejtimit nuk funksionon?',
    questions: [
      'Po, nëse pajisjet për sinjalizim janë në rregull.',
      'Po, duke u mbështetur ose varur në mjetin tërheqës.',
      'Po, me lidhje të fortë (bigë).',
    ],
  },
  question_22: {
    title:
      ' Cila shenjë ndalon trafikun për të gjitha mjetet me veprim motorik?  ',
    questions: ['A.', 'B.', 'C.'],
  },
  question_23: {
    title: 'Si duhet vepruar në këtë situatë?',
    questions: [
      'Unë kam përparësi kalimi në raport me biçiklistin.',
      'Biçiklisti lëviz i pari.',
      'Unë lëviz nëpër rrugë me përparësi kalimi.',
    ],
  },
  question_24: {
    title: ' Çka duhet të keni parasysh në këtë situatë? ',
    questions: [
      'Do të vazhdoj lëvizjen pa u ndalur.',
      'Duhet të respektoj domethënien e shenjës së trafikut.',
      'Do të respektoj domethënien e semaforit.',
    ],
  },
  question_25: {
    title: ' Çfarë domethënie ka shenja e dhënë nga polici si në foto? ',
    questions: [
      'Rritje e shpejtësisë së lëvizjes.',
      'Ngadalësim i shpejtësisë së lëvizjes.',
      'Ndalje e obligueshme.',
    ],
  },
  question_26: {
    title: ' Çfarë lajmëron drita e semaforit si në foto?',
    questions: [
      'Ndalim kalimi për këmbësorë.',
      'Kalim i lirë për këmbësorë.',
      'Semafori nuk funksionon.',
    ],
  },
  question_27: {
    title: 'Nën cilat kushte do të veprojë alkooli më shpejtë te shoferi?  ',
    questions: [
      'Nëse shoferi është i lodhur.',
      'Nëse shoferi konsumom alkool në lukth të zbrazët.',
      'Nëse shoferi nuk ka patentë shofer.',
    ],
  },
  question_28: {
    title:
      'Cilat janë pasojat e shtypjes së ulët të ajrit në pneumatikë (goma)? ',
    questions: [
      'Zvogëlohet stabiliteti i mjetit.',
      'Dëmtohen pneumatikët.',
      'Rriten shpenzimet e karburantit.',
    ],
  },
  question_29: {
    title: '  Për çka shërben “Kartoni i Gjelbër”?  ',
    questions: [
      'Për sigurimin e mjetit për udhëtim jashtë vendit.',
      'Për kryrjen e kontrollit teknik të mjetit.',
      'Për sigurimin e mjetit vetëm brenda vendit.',
    ],
  },

  answers: [
    [true, false, false],
    [false, true, false],
    [true, false, false],
    [true, true, false],
    [false, false, true],
    [true, false, false],
    [true, false, false],
    [true, false, false],
    [true, false, false],
    [true, true, true],
    [true, true, false],
    [true, true, false],
    [true, true, false],
    [true, true, false],
    [true, false, true],
    [true, true, false],
    [true, true, true],
    [false, true, false],
    [true, true, false],
    [true, false, true],
    [true, true, true],
    [false, true, false],
    [false, false, true],
    [false, true, false],
    [false, false, true],
    [false, true, false],
    [true, false, false],
    [true, true, false],
    [true, true, true],
    [true, false, false],
  ],
  points: [
    4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4,
    4, 4, 2, 2, 2,
  ],
};
const userAnswers = {};
let answers = [];

const rememberInputs = function () {
  for (let [counter, question] of questions.entries()) {
    //fshij ato te kaluarat
    if (question.checked) {
      question.checked = false;
    }
    // console.log(questionCounter);
    //nese ate pyetje e ka bere check atehere beje
    if (
      //nese ekziston counteri, dmth nese behet next
      userAnswers[`question_${questionCounter}`]?.[counter] &&
      userAnswers[`question_${questionCounter}`][counter] == true
    ) {
      question.checked = true;
    }
  }
};
const disableButtons = function () {
  if (questionCounter <= 0) {
    previous.disabled = true;
  } else {
    previous.disabled = false;
  }
  if (questionCounter > 29) {
    next.disabled = true;
  } else {
    next.disabled = false;
  }
};
const checkAnswers = function () {
  storeInputs();

  questionsContainer.classList.add('hidden');
  correctAnswers = 0;
  points = 0;
  let counter = 0;
  console.log(userAnswers);
  for (let answers of Object.values(userAnswers)) {
    const question = document.createElement('div');
    question.setAttribute('id', `question-${counter}`);
    question.classList.add(`userAnswer`);
    // question.classList.add(`question-${counter}`);

    question.textContent = counter + 1;
    if (
      questionsDict.answers[counter][0] == answers[0] &&
      questionsDict.answers[counter][1] == answers[1] &&
      questionsDict.answers[counter][2] == answers[2]
    ) {
      question.style.color = 'green';
      correctAnswers++;
      points += questionsDict.points[counter];
    } else {
      question.style.color = 'red';
      mistakes.push(counter);
    }

    resultBody.append(question);
    counter++;
  }

  result.classList.remove('hidden');
  pointsTitle.textContent = `Piket e fituara: ${points}`;
  if (points >= 85) {
    resultTitle.textContent = `Urime keni kaluar. Keni qelluar ${correctAnswers} pyetje!`;
    resultTitle.style.color = '#28a745';
  } else {
    resultTitle.textContent = `Keni deshtuar. Keni qelluar ${correctAnswers} pyetje!`;
    resultTitle.style.color = '#dc3545';
  }
  console.log(mistakes);
};
const storeInputs = function () {
  //Shiko checkboxat dhe merr pergjigjet
  for (let [counter, question] of questions.entries()) {
    answers.push(question.checked);
    question.checked = false;
  }
  //futi ne dictionary per ti ruajtur
  userAnswers[`question_${questionCounter}`] = answers;
  //reseto
  answers = [];
  //   console.log(questionCounter);
  //   console.log(userAnswers);
};
const changeQuestions = function () {
  if (questionCounter < 30 && questionCounter >= 0) {
    questionTitle.textContent =
      questionsDict[`question_${questionCounter}`].title +
      ' ' +
      questionsDict.points[questionCounter] +
      ' pikë.';

    questionPhoto.src = `exam1/${questionCounter + 1}.jpg`;
    for (let [counter, question] of questionsLabel.entries()) {
      question.textContent =
        questionsDict[`question_${questionCounter}`].questions[counter];
    }

    // console.log(userAnswers);
  }
};
disableButtons();
changeQuestions();
next.addEventListener('click', function () {
  if (questionCounter >= 0 && questionCounter < 30) {
    storeInputs();
    questionCounter++;
    questionCounterLabel.textContent = questionCounter + 1;
    disableButtons();

    changeQuestions();
    rememberInputs();
  }
  //   console.log(questionCounter);
  if (questionCounter == 29) {
    next.classList.toggle('hidden');
    complete.classList.toggle('hidden');
  }
});

previous.addEventListener('click', function () {
  if (questionCounter >= 0 && questionCounter < 30) {
    questionCounter--;
    questionCounterLabel.textContent = questionCounter + 1;
    disableButtons();

    changeQuestions();

    rememberInputs();
    storeInputs();
    rememberInputs();
  }
  if (questionCounter < 30 && next.classList.contains('hidden')) {
    next.classList.remove('hidden');
    complete.classList.add('hidden');
  }
  console.log(questionCounter);
  //   if (questionCounter > 29) {
  //     checkAnswers();
  //   }
});
complete.addEventListener('click', checkAnswers);

for (let [counter, input] of questionInput.entries()) {
  input.addEventListener('click', function (e) {
    if (document.querySelector(`#question-${counter + 1}`).checked == true) {
      document.querySelector(`#question-${counter + 1}`).checked = false;
    } else {
      document.querySelector(`#question-${counter + 1}`).checked = true;
    }
  });
}
for (let [counter, input] of questions.entries()) {
  input.addEventListener('click', function (e) {
    if (document.querySelector(`#question-${counter + 1}`).checked == true) {
      document.querySelector(`#question-${counter + 1}`).checked = false;
    } else {
      document.querySelector(`#question-${counter + 1}`).checked = true;
    }
  });
}
document.addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('userAnswer')) {
    const number = e.target.getAttribute('id');
    const questionNumber = Number(number.split('-')[1]); //sepse nis prej 0
    modalHeading.textContent =
      questionsDict[`question_${questionNumber}`].title +
      ' ' +
      questionsDict.points[questionNumber] +
      ' pikë.';
    console.log(questionNumber);
    modalPhoto.src = `exam1/${questionNumber + 1}.jpg`;

    //caktoj pyetjet
    for (let [counter, question] of modalQuestionsLabel.entries()) {
      if (question.style.color == 'green' || question.style.color == 'red') {
        question.style.color = 'black';
      }
      question.textContent =
        questionsDict[`question_${questionNumber}`].questions[counter];
      if (questionsDict.answers[questionNumber][counter] == true) {
        question.style.color = 'green';
      }
      if (
        questionsDict.answers[questionNumber][counter] == false &&
        userAnswers[`question_${questionNumber}`]?.[counter] &&
        userAnswers[`question_${questionNumber}`][counter] == true
      ) {
        question.style.color = 'red';
      }
    }
    //bej tickat neper pyetje
    for (let [counter, question] of modalQuestions.entries()) {
      if (question.checked) {
        question.checked = false;
      }
      if (
        userAnswers[`question_${questionNumber}`]?.[counter] &&
        userAnswers[`question_${questionNumber}`][counter] == true
      ) {
        question.checked = true;
      }
    }

    openModal();
  }
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
