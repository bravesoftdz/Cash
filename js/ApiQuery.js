let keys = ['txt', 'cc', 'rate'];
let card = document.querySelector('.currency-card');
let row = card.parentNode;
card.remove();

document.querySelector('#refresh-btn').addEventListener('click', ()=>getDataFromApi('#spinner-btn'));
getDataFromApi('#spinner-main');

function getDataFromApi(spinner) {
    document.querySelector(spinner).hidden = false;
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json').
        then(res => {        
            // console.log(res);
            if (res.ok) {
                return res.json()
            } else {
                alert(`Что-то  пошло не так. Статус ${res.status}`);
                document.querySelector(spinner).hidden = true;
            }
        }).then(data => {
            // console.log(data);
            drawCards(data);
          document.querySelector(spinner).hidden = true;
        }
        ).catch(err => console.log(err));
};
function drawCards(json) {
    row.innerHTML = '';
    json.forEach(currency => {
        let currentCard = card.cloneNode(true);
        row.append(currentCard)
        // console.log(currency);
        keys.forEach(key => {
            // console.log(currentCard);
            currentCard.querySelector(`.${key}`).innerText =
                currency[key];
        });
    }
    )
}



