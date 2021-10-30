document.addEventListener('DOMContentLoaded', function () {
  let ids = [];
  let setIds = [];
  window.onscroll = function () {
    var header = document.getElementById('header');

    if (window.scrollY > 630) {
      header.classList.add('bg-gray-500');
    } else {
      header.classList.remove('bg-gray-500');
    }
  };
  const langs = ['en', 'ir', 'tr', 'ar'];

  const selectLang = document.getElementById('lang');
  let currentLang = 'en';

  // delete localStorage after ...  {1 day is set}
  const checkLocalStorage = () => {
    const data = localStorage.getItem('sgdrh-lang');

    if (data) {
      const dateNow = Date.now();
      const parseData = JSON.parse(data);
      let diffInMilliSeconds = Math.abs(parseData.time - dateNow) / 1000;

      // day
      const days = Math.floor(diffInMilliSeconds / 86400);
      diffInMilliSeconds -= days * 86400;
      // hour
      const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
      diffInMilliSeconds -= hours * 3600;
      // minute
      const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
      diffInMilliSeconds -= minutes * 60;

      if (days >= 1) {
        localStorage.removeItem('sgdrh-lang');
      }
    }
  };

  checkLocalStorage();

  // get lang from localStorage
  const getLang = () => {
    const data = localStorage.getItem('sgdrh-lang');

    if (data) {
      const parseData = JSON.parse(data);
      currentLang = parseData.lang;
    }
  };

  getLang();

  const elements = [];
  const resources = {};
  // get lang json file
  langs.forEach((lang) => {
    var request = new XMLHttpRequest();
    request.open('GET', `../lang/${lang}.json`, false);
    request.send(null);
    var my_JSON_object = JSON.parse(request.responseText);

    if (elements.length < 1) {
      Object.keys(my_JSON_object).forEach((el) => {
        elements.push(el);
      });
    }
    resources[lang] = {
      translation: my_JSON_object,
    };
  });

  i18next.init(
    {
      lng: currentLang,
      // debug: true,
      resources,
    },
    function (err, t) {
      if (err) console.log(err);
      selectLang.innerHTML = i18next.t(`${currentLang}`);
      langs.forEach((l) => selectLang.classList.remove(`${l}`));
      selectLang.classList.add(`${currentLang}`);
      languageChange();
    }
  );

  getLocalLang = async () => {
    try {
      const data = localStorage.getItem('sgdrh-lang');

      if (!data) {
        const local = await axios.get('https://geolocation-db.com/json/');

        const country = local.data.country_name.toLowerCase();
        if (country === 'iran') {
          currentLang = 'ir';
        } else if (country === 'turkey') {
          currentLang = 'tr';
        } else if (country === 'saudi arabia') {
          currentLang = 'ar';
        } else {
          currentLang = 'en';
        }
        i18next.changeLanguage(`${currentLang}`, (err, t) => {
          if (err) return console.log('something went wrong loading', err);

          selectLang.innerHTML = i18next.t(`${currentLang}`);
          langs.forEach((l) => selectLang.classList.remove(`${l}`));
          selectLang.classList.add(`${currentLang}`);
          languageChange();
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  getLocalLang();

  // lang click
  langs.forEach((lang) => {
    const langElement = document.getElementById(`${lang}`);
    if (langElement) {
      langElement.addEventListener('click', function () {
        i18next.changeLanguage(`${lang}`, (err, t) => {
          if (err) return console.log('something went wrong loading', err);
          selectLang.innerHTML = i18next.t(`${lang}`);
          langs.forEach((l) => selectLang.classList.remove(`${l}`));
          selectLang.classList.add(`${lang}`);
          localStorage.setItem('sgdrh-lang', JSON.stringify({ lang, time: Date.now() }));
          currentLang = lang;
          languageChange();
        });
      });
    }
  });

  const changeDirElement = ['hero-content'];

  // change lang
  function languageChange() {
    if (ids.length > 0) {
      ids.forEach((id) => window.clearInterval(id));
    }
    if (setIds.length > 0) {
      setIds.forEach((id) => clearTimeout(id));
    }

    ids = [];
    setIds = [];
    consoleText(
      [i18next.t('hero.title.1'), i18next.t('hero.title.2'), i18next.t('hero.title.3')],
      'text',
      ['white', 'white', 'white'],
      'console',
      [i18next.t('hero.text.1'), i18next.t('hero.text.2'), i18next.t('hero.text.3')],
      'text-2',
      'console-2',
      100,
      400
    );
    if (elements.length > 0) {
      elements.forEach((el) => {
        let doc = document.getElementById(el);
        if (doc) {
          doc.innerHTML = i18next.t(el);

          if (currentLang === 'ir' || currentLang === 'ar') {
            const packages = document.getElementsByClassName('packages');
            const footerH3 = document.getElementById('footer.contact');
            const footerlist = document.getElementsByClassName('list-c');
            const contact = document.getElementsByClassName('contact');
            if (contact) {
              contact[0].classList.add('rtlDir');
            }
            if (footerH3) {
              footerH3.classList.remove('ltrHUpdate');
              footerH3.classList.add('rtlHUpdate');
            }
            if (footerlist) {
              for (let index = 0; index < footerlist.length; index++) {
                footerlist[index].classList.remove('ltrUpdate');
                footerlist[index].classList.add('rtlUpdate');
              }
            }
            if (packages) {
              for (let index = 0; index < packages.length; index++) {
                packages[index].classList.add('rtlDir');
              }
            }
          } else {
            const packages = document.getElementsByClassName('packages');
            const footerH3 = document.getElementById('footer.contact');
            const footerlist = document.getElementsByClassName('list-c');
            const contact = document.getElementsByClassName('contact');
            if (contact) {
              contact[0].classList.remove('rtlDir');
            }
            if (footerH3) {
              footerH3.classList.remove('rtlHUpdate');
              footerH3.classList.add('ltrHUpdate');
            }
            if (footerlist) {
              for (let index = 0; index < footerlist.length; index++) {
                footerlist[index].classList.remove('rtlUpdate');
                footerlist[index].classList.add('ltrUpdate');
              }
            }
            if (packages) {
              for (let index = 0; index < packages.length; index++) {
                packages[index].classList.remove('rtlDir');
              }
            }
          }
        }
      });
    }
  }

  // slider

  function consoleText(words, id, colors, cId, words2, id2, cid2, t1, t2) {
    if (colors === undefined) colors = ['#fff'];
    var visible = true;
    var con = document.getElementById(cId);
    var con2 = document.getElementById(cid2);
    var letterCount = 1;
    var letterCount2 = 1;
    var x = 1;
    var waiting = false;
    var target = document.getElementById(id);
    var target2 = document.getElementById(id2);
    target.setAttribute('style', 'color:' + colors[0]);
    const firstId = window.setInterval(function () {
      if (letterCount === 0 && letterCount2 === 0 && waiting === false) {
        waiting = true;

        target.innerHTML = words[0].substring(0, letterCount);
        target2.innerHTML = words2[0].substring(0, letterCount2);
        const set1 = window.setTimeout(function () {
          var usedColor = colors.shift();
          colors.push(usedColor);
          var usedWord = words.shift();
          words.push(usedWord);
          var usedWord2 = words2.shift();
          words2.push(usedWord2);
          x = 1;
          target.setAttribute('style', 'color:' + colors[0]);
          target2.setAttribute('style', 'color:' + colors[0]);
          letterCount += x;
          letterCount2 += x;
          waiting = false;
        }, 1000);
        setIds.push(set1);
      } else if (
        letterCount === words[0].length + 1 &&
        letterCount2 === words2[0].length + 1 &&
        waiting === false
      ) {
        waiting = true;
        const set2 = window.setTimeout(function () {
          x = -1;
          letterCount += x;

          letterCount2 += x;

          waiting = false;
        }, 1000);
        setIds.push(set2);
      } else if (waiting === false) {
        if (letterCount <= words[0].length && letterCount >= 0) {
          target.innerHTML = words[0].substring(0, letterCount);
          if (letterCount !== 0) {
            letterCount += x;
          }
        }

        target2.innerHTML = words2[0].substring(0, letterCount2);
        letterCount2 += x;
      }
    }, t1);
    ids.push(firstId);
    const secId = window.setInterval(function () {
      // console.log(visible);
      if (visible === true) {
        con.className = 'console-underscore hidden';
        con2.className = 'console-underscore hidden';
        visible = false;
      } else {
        con.className = 'console-underscore';
        con2.className = 'console-underscore';

        visible = true;
      }
    }, t2);
    ids.push(secId);
  }

  // // nav
  // const menuBtn = document.getElementById('menuBtn');

  // menuBtn.addEventListener('click', (e) => {
  //   var btn = document.getElementById('menuBtn');
  //   var nav = document.getElementById('menu');

  //   btn.classList.toggle('open');
  //   nav.classList.toggle('flex');
  //   nav.classList.toggle('hidden');
  // });
});
