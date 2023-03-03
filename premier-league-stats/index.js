let search = document.querySelector('.search-box button');
let container = document.querySelector('.container');
let err404 = document.querySelector('.not-found');
let charBox = document.querySelector('.character-box');
let charExtraInfo = document.querySelector('.character-extra-info');
let chooseChar = document.querySelector('.choose-char-container');

search.addEventListener('click', () => {
  console.log('clicking');

  const name = document.querySelector('.search-box input').value;
  console.log(name.length);

  if (name.length === 0) return;

  fetch(`https://api.disneyapi.dev/character?name=${name}`)
    .then((response) => response.json())

    .then((response) => {
      console.log(response.data);
      console.log(response.count);
      if (response.count === 0) {
        container.style.height = '400px';
        err404.style.display = 'block';
        charBox.style.display = 'none';
        charExtraInfo.style.display = 'none';
        return;
      }

      // if more than 1 result display clickable option
      if (response.count >= 2) {
        charBox.style.display = 'none';
        charExtraInfo.style.display = 'none';
        err404.style.display = 'none';
        chooseChar.style.display = 'block';

        var resLength = response.data.length;
        var temp;

        for (i = 0; i < resLength; i++) {
          temp = document.createElement('div');
          temp.className = 'results';
          temp.innerHTML = response.data[i].name;
          document.querySelector('.choose-char-options').appendChild(temp);
        }

        let results = document.getElementsByClassName('results');
        console.log(results);
        for (let i = 0; i < results.length; i++) {
          results[i].addEventListener('click', () => {
            console.log('I can click');
            
          });
        }
        // results.forEach((el) => {
        //   el.addEventListener('click', () => {
        //     console.log('Please let me click');
        //   });
        // });
      }

      err404.style.display = 'none';
      container.style.height = '800px';

      if (response.count !== 0) {
        const charName = document.querySelector(
          '.character-box .character-name'
        );
        charBox.style.display = 'inline';
        document.getElementById(
          'character-pic'
        ).src = `${response.data[0].imageUrl}`;
        charName.innerHTML = `${response.data[0].name}`;
      }
    })
    .catch((err) => console.error('request failed', err));
});
