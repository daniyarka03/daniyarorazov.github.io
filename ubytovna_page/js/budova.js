$(document).ready(function() {
    fetchAllRooms();
});

function fetchAllRooms () {
    const roomsRowTableFloor1 = document.querySelector('.budova-floor-1');
    const roomsRowTableFloor2 = document.querySelector('.budova-floor-2');
    const navigationBudova = document.querySelector('.navigation__budova');

    let roomsData = [];
    fetch("http://localhost:5173/pokojeBudovy.json")
        .then((response) => response.json())
        .then((data) => {
            data.map((item, key) => {
                roomsData.push(item)
                if (item.patro === "1") {
                    if (item.problemy) {
                        $(roomsRowTableFloor1).append(`
                        <div class="content-room">
                            <span class="notification">!</span>    
                            ${item.cisloPokoje}
                        </div>
                    `)
                    } else {
                        $(roomsRowTableFloor1).append(`
                        <div class="content-room">
                            ${item.cisloPokoje}
                        </div>
                    `)
                    }

                } else if (item.patro === "2") {
                    if (item.problemy) {
                        $(roomsRowTableFloor2).append(`
                            <div class="content-room">
                                <span class="notification">!</span>    
                                ${item.cisloPokoje}
                            </div>
                    `)
                    } else {
                        $(roomsRowTableFloor2).append(`
                            <div class="content-room">${item.cisloPokoje}
                        </div>
                    `)
                    }

                }
            });
            navigationBudova.addEventListener('click', showRoomsGrid);
            showRoomView(roomsData);
        })
        .catch((error) => console.error(error));
}

function showRoomsGrid() {

    const roomsContentTable = document.querySelector('.section-rooms__content');
    const roomView = document.querySelector('.section-room__view');
    const roomUbytovniky = document.querySelectorAll('.room-ubytovnik');
    const contentRow = document.querySelectorAll('.content-row');
    contentRow.forEach((el) => {
        $(el).show()
    })
    $(roomsContentTable).show();
    $(roomView).hide();
    $('.navigation__patro').text('')
    $('.navigation__pokoj').text('')
    $('.arrow-2').hide()
    $('.arrow-3').hide()
    $('.alert-problems').hide();
    $('.alert-problems').text('');
    roomUbytovniky.forEach((el) => {
        $(el).remove();
    });
}
function showRoomPatro(patroPokoje) {
    const contentRow = document.querySelectorAll('.content-row');
    showRoomsGrid();
    $('.arrow-2').show()
    $('.navigation__patro').text(`Patro ${patroPokoje}`)


    contentRow.forEach((el) => {
        if (!(el.classList.contains(`budova-floor-${patroPokoje}`))) {
            $(el).hide();
        }
    })


}
function showRoomView(roomsData) {
    const rooms = document.querySelectorAll('.content-room');
    rooms.forEach((room, key) => {
        room.addEventListener('click', (event) => {
            const buttonText = event.target.innerText;
            let spanText = '';

            if (event.target.querySelector('span')) {
                spanText = event.target.querySelector('span').innerText;
            }
            let itemCisloPokoje = buttonText.replace(spanText, '').trim();


            const roomData = roomsData.find(item => item.cisloPokoje === itemCisloPokoje);

            if (roomData.problemy) {
                $('.alert-problems').show();
                roomData.problemy.forEach((el) => {
                    $('.alert-problems').append(`
                        ${el.nazevProblemu}
                    `)
                })


            }


            const pokojData = roomsData.find(item => item.cisloPokoje === itemCisloPokoje);

            let patroPokoje = (event.target.parentElement.className).match(/\d+/)[0];
            const roomsContentTable = document.querySelector('.section-rooms__content');
            const roomView = document.querySelector('.section-room__view');
            const roomPatro = document.querySelector('.navigation__patro');
            const roomNumber = document.querySelector('.navigation__pokoj');
            let roomViewTable = document.querySelector('.room-view__table');
            let roomViewVybaveni = document.querySelector('.room-view__vybaveni');
            let roomViewHistorie = document.querySelector('.room-view__historie');

            $(roomsContentTable).hide();
            $(roomView).show();
            $(roomPatro).text(`Patro ${patroPokoje}`)
            $(roomNumber).text(`Pokoj ${itemCisloPokoje}`);
            $('.arrow-2').show()
            $('.arrow-3').show()
            $(roomPatro).click(() => {
                if ($(roomPatro).text()) {
                    showRoomPatro($(roomPatro).text().match(/\d+/)[0])
                }
            })


            pokojData.ubytovniky.forEach((el) => {
                $(roomViewTable).append(`<tr class="room-ubytovnik">
                        <td class="ubytovnik__jmeno">${el.jmeno}</td>
                        <td class="ubytovnik__prijmeni">${el.prijmeni}</td>
                        <td class="ubytovnik__datumPrijezdu">${el.datumPrijezdu}</td>
                        <td class="ubytovnik__datumOdjezdu">${el.datumOdjezdu}</td>
                        <td class="ubytovnik__dluh">${el.dluh}</td>
                    </tr>`)


            })

            pokojData.vybaveni.forEach((el) => {
                $(roomViewVybaveni).append(`<tr class="room-ubytovnik">
                        <td class="vybaveni__nazev">${el.nazev}</td>
                        <td class="vybaveni__pocet">${el.pocet}</td>
                        <td class="vybaveni__stav">${el.stav}</td>
                    </tr>`)
            })

            pokojData.historiePokoje.forEach((el) => {
                $(roomViewHistorie).append(`<tr class="room-ubytovnik">
                        <td class="historie__druh">${el.druhUkonu}</td>
                        <td class="historie__datum">${el.datumUkonu}</td>
                        <td class="historie__stav">${el.stavUkonu}</td>
                    </tr>`)
            })
        });
    })
}