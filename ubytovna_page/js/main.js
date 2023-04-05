$(document).ready(() => {
    dataTableFunctions();
    calendarFunc();
});

function dataTableFunctions() {
    const tableBodyContentBudovy = document.querySelector("#budovyTableBodyContent");

    fetch("http://localhost:5173/budovyData.json")
        .then((response) => response.json())
        .then((data) => {
            data.map((item, key) => {
                $(tableBodyContentBudovy).append(`
                    <tr class="table__row row-${key+1}">
                      <td class="table-column__title">${item.budovaName}</td>
                      <td class="table-column__stav">${item.status}</td>
                      <td class="table__occupancy">${item.occupancy}</td>
                      <td><button class="table__edit">Edit</button></td>
                    </tr>
                `)
            });
            $('#myTable').DataTable();

            myFunc();
        })
        .catch((error) => console.error(error));

    fetch("http://localhost:5173/najemniciBudovy.json")
        .then((response) => response.json())
        .then((data) => {
            data.map((item, key) => {
                $("#myTableNajemnici > tbody").append(`
                     <tr class="table__row row-${key+1}">
                         <td class="table__name_najemnika">${item.jmeno}</td>
                         <td class="table__budova_najemnika">${item.budova}</td>
                         <td class="table__pokoj_najemnika">${item.pokoj}</td>
                         <td><button class="table__edit">Edit</button></td>
                     </tr>
                `)
            });
            $('#myTableNajemnici').DataTable();
            myFunc();
        })
        .catch((error) => console.error(error));

    fetch("http://localhost:5173/dluzniciBudovy.json")
        .then((response) => response.json())
        .then((data) => {
            data.map((item, key) => {
                $("#myTableDluznici > tbody").append(`
                     <tr class="table__row row-${key+1}">
                        <td class="table__jmeno_dluznika">${item.jmeno}</td>
                        <td class="table__dluh_dluznika">${item.dluznaCastka} Kč</td>
                        <td class="table__dny">${item.dniOdSplatnosti}</td>
                        <td><button class="table__edit">Edit</button></td>
                     </tr>
                `)
            });
            $('#myTableDluznici').DataTable();
            myFunc();
        })
        .catch((error) => console.error(error));

    fetch("http://localhost:5173/obsazenostBudovy.json")
        .then ((response) => response.json())
        .then((data) => {
            chartFunction(data.flatMap((obj) => Object.values(obj)))
        });

    function myFunc() {
        const obsazenostBudovy = document.querySelectorAll('.table__occupancy');
        const tableRowValuesBudova = document.querySelectorAll("#myTable > tbody > tr.table__row")
        const tableRowValuesNajemnici = document.querySelectorAll("#myTableNajemnici > tbody > tr.table__row")
        const tableRowValuesDluznici = document.querySelectorAll("#myTableDluznici > tbody > tr.table__row")
        const modalBudova = document.querySelector("#exampleModal");
        const tableColumnTitle = document.querySelectorAll('.table-column__title');
        const tableColumnStavBudovy = document.querySelectorAll('.table-column__stav');
        const tableColumnObsazenost = document.querySelectorAll('.table__occupancy');

        const tableColumnNameNajemnika = document.querySelectorAll('.table__name_najemnika');
        const tableColumnBudovaNajemnika = document.querySelectorAll('.table__budova_najemnika');
        const tableColumnPokojNajemnika = document.querySelectorAll('.table__pokoj_najemnika');

        const tableColumnJmenoDluznika = document.querySelectorAll('.table__jmeno_dluznika');
        const tableColumnDluhDluznika = document.querySelectorAll('.table__dluh_dluznika');
        const tableColumnDnyDluznika = document.querySelectorAll('.table__dny');
        for (let [index, obsazenost] of Array.from(obsazenostBudovy).entries()) {
            let occupancy = ($(obsazenost).text()).split('/');
            let currentlyOccupancy = +occupancy[0];
            let maxOccupancy = +occupancy[1];
            let resultInPercents = currentlyOccupancy * 100 / maxOccupancy;
            if (resultInPercents > 0 && resultInPercents < 51) {
                // Yellow
                tableRowValuesBudova[index].style.background = "#FFE690";
            }
            if(resultInPercents > 50 && resultInPercents < 100) {
                // Orange
                tableRowValuesBudova[index].style.background = "#FFC47F";
            }
            if(resultInPercents == 0) {
                // Green
                tableRowValuesBudova[index].style.background = "#C6F3BD";
            }
            if(resultInPercents == 100) {
                // Red
                tableRowValuesBudova[index].style.background = "#FFB6B6";
            }
        }
        tableRowValuesBudova.forEach((el, key) => {
            el.addEventListener('click', function() {
                const exampleModalLabel = document.querySelector("#exampleModalLabel");
                const valueColumnTitle = $(tableColumnTitle[key]).text();
                const stavBudovy = document.querySelector('.modal__stav_budovy');
                const obsazenostBudovy = document.querySelector('.modal__obsazenost');
                $(modalBudova).modal('show');
                $(exampleModalLabel).text(valueColumnTitle);
                $(stavBudovy).text(`Stav budovy: ${$(tableColumnStavBudovy[key]).text()}`);
                $(obsazenostBudovy).text(`Obsazenost: ${$(tableColumnObsazenost[key]).text()}`);
            });
        });

        tableRowValuesNajemnici.forEach((el, key) => {
            el.addEventListener('click', function() {
                $('#sectionModalNajemnici').modal('show');
                $('.modal__jmeno_najemnika').text(`Jméno nájemníka: ${ $(tableColumnNameNajemnika[key]).text() }`)
                $('.modal__budova_najemnika').text(`Budova: ${ $(tableColumnBudovaNajemnika[key]).text() }`)
                $('.modal__pokoj_najemnika').text(`Číslo pokoje: ${ $(tableColumnPokojNajemnika[key]).text() }`)
            });
        });

        tableRowValuesDluznici.forEach((el, key) => {
            el.addEventListener('click', function() {
                $('#sectionModalDluznici').modal('show');
                $('.modal__jmeno_dluznika').text(`Jméno dlužníka: ${ $(tableColumnJmenoDluznika[key]).text() }`)
                $('.modal__dluh_dluznika').text(`Dluh: ${ $(tableColumnDluhDluznika[key]).text() }`)
                $('.modal__dny_dluznika').text(`Dny: ${ $(tableColumnDnyDluznika[key]).text() }`)
            });
        })
    }
}


function chartFunction(dataValues) {
    const data = {
        labels: ['Le', 'Ún', 'Bř', 'Du', 'Kv', 'Črv', 'Črvc', 'Sr', 'Zá', 'Ří', 'Li', 'Pr'],
        datasets: [{
            label: 'Sales',
            data: dataValues,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            pointStyle: 'circle',
            pointRadius: 10,
            pointHoverRadius: 15,
            pointBackgroundColor: 'rgba(255, 99, 132, 0.5)', // set point background color
            pointBorderColor: '#fff', // set point border color
            pointBorderWidth: 2 // set point border width
        }]
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    const chart = new Chart(document.getElementById('myChart'), {
        type: 'line',
        data: data,
        options: options
    });

}


function calendarFunc() {
    const monthNames = ['leden', 'unor', 'brezen', 'duben', 'kveten', 'cerven', 'cervenec', 'srpen', 'Zari', 'rijen', 'listopad', 'prosinec'];

    $('.calendar-container').calendar({
        date:new Date(),
        weekDayLength: 2,
        onClickDate:function (date) {
            const currentDate = new Date(date);
            const month = String(currentDate.getMonth() + 1);
            const day = String(currentDate.getDate());
            const year = currentDate.getFullYear();

            fetch("http://localhost:5173/calendarOccupancyDay.json")
                .then ((response) => response.json())
                .then((data) => {
                    data.map((item) => {
                        if (item.hasOwnProperty(year)) {
                            item[year].map((arrayMonth) => {
                                if(arrayMonth.hasOwnProperty(monthNames[month-1])) {
                                    Swal.fire('Obsazenost ' + item.budovaName + " = " + String(arrayMonth[monthNames[month-1]][0][day]) + "/" + item.maxObsazenost)
                                }
                            })
                        }
                    });
                });
        },
        monthMap: {
            1: "Leden",
            2: "Únor",
            3: "Březen",
            4: "Duben",
            5: "Květen",
            6: "Červen",
            7: "Červenec",
            8: "Srpen",
            9: "Září",
            10: "Říjen",
            11: "Listopad",
            12: "Prosinec",
        },

        // map the week number to a string
        alternateDayMap: {
            0: "pondělí",
            1: "úterý",
            2: "středa",
            3: "čtvrtek",
            4: "pátek",
            5: "sobota",
            6: "neděle",

        },
        startOnMonday: true,

        onClickMonthNext:function (date) {
            const currentDate = new Date(date);
            const month = String(currentDate.getMonth() + 1);
            const year = currentDate.getFullYear();

            getDataForCalendar(currentDate, month, year)
        },
        onClickMonthPrev:function (date) {
            const currentDate = new Date(date);
            const month = String(currentDate.getMonth() + 1);
            const year = currentDate.getFullYear();

            getDataForCalendar(currentDate, month, year)
        },


    });

    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();
    getDataForCalendar(currentDate, month, year)



    function getDataForCalendar(currentDate, month, year) {
        fetch("http://localhost:5173/calendarOccupancyDay.json")
            .then ((response) => response.json())
            .then((data) => {
                data.map((item) => {

                    if (item.hasOwnProperty(year)) {
                        item[year].map((arrayMonth) => {

                            if(arrayMonth.hasOwnProperty(monthNames[month-1])) {

                                const days = document.querySelectorAll("div.month-day:not(.disabled)")
                                days.forEach((day, key) => {
                                    let currentlyOccupancy = arrayMonth[monthNames[month-1]][0][key+1];
                                    let maxOccupancy = item.maxObsazenost;
                                    let resultInPercents = currentlyOccupancy * 100 / maxOccupancy;
                                    if (resultInPercents > 0 && resultInPercents < 51) {
                                        // Yellow
                                        day.style.background = "#FFE690";
                                    }
                                    if(resultInPercents > 50 && resultInPercents < 100) {
                                        // Orange
                                        day.style.background = "#FFC47F";
                                    }
                                    if(resultInPercents == 0) {
                                        // Green
                                        day.style.background = "#C6F3BD";
                                    }
                                    if(resultInPercents == 100) {
                                        // Red
                                        day.style.background = "#FFB6B6";
                                    }
                                })
                            }
                        })
                    }
                });
            });
    }
}