Vue.component('kcal-kxd', {
    props: ['dati'],
    template: `
    <div class="has-text-centered">
        <h4 class="title">Grafico Kcal su base giornaliera</h4>
        <h4 class="subtitle">Con questo grafico potrai capire a colpo d'occhio il tuo consumo di kcal giornaliero.</h4>
        <!--
        <div class="field has-addons is-centered has-text-center">
            <p class="control">
                <button class="button" :class="[tipo==0 ? 'is-info' : '']" @click="tipo=0;mapping()">
                    <span>Tutto</span>
                </button>
            </p>
            <p class="control">
                <button class="button" :class="[tipo==1 ? 'is-info' : '']" @click="tipo=1;mapping()">
                    <span>Settimana</span>
                </button>
            </p>
            <p class="control">
                <button class="button" :class="[tipo==2 ? 'is-info' : '']" @click="tipo=2;mapping();">
                    <span>Oggi</span>
                </button>
            </p>
        </div>
        -->

        <canvas id="kxd" style="padding:1rem;padding-top:0; text-align: center;"></canvas>
        <div class="field has-addons has-addons-centered">
            <p class="control">
                <button class="button is-rounded" @click="prevWeek()">
                    <span class="icon is-small left-arrow"></span>
                </button>
            </p>
            <p class="control">
                <button class="button is-rounded" @click="nextWeek()">
                    <span class="icon is-small right-arrow"></span>
                </button>
            </p>
        </div>
    </div>
        `,
    data() {
        return {
            //dati iniziali grafo Kcal x giorno
            calcKxd: {},
            kxd: {
                x: null,
                y: null
            },
            chart: null,
            // Tipo: 0=tutto,1=settimana,2=oggi
            //tipo: 0,

            dayIndex: DateTime.now(),
            weekNames: luxon.Info.weekdays(),
            week: [null, null, null, null, null, null, null]
        }
    },
    created() {
        this.$parent.$on('graphs-refresh', this.mapping);
        this.getWeek()
    },
    watch: {
        dayIndex(val) {
            this.dayIndex = val;
            this.getWeek()
            this.mapping()
        },
    },
    methods: {
        prevWeek() {
            let d = this.dayIndex
            this.dayIndex = d.plus({days:-7})
        },
        nextWeek() {
            let d = this.dayIndex
            this.dayIndex = d.plus({days:+7})
        },
        getWeek() {
            let self = this;

            let oggiIndex = this.dayIndex.weekday - 1 

            this.week.splice(0);

            for(let i=0;i<this.weekNames.length;i++){
                let day = this.dayIndex.plus({'days': - oggiIndex + i})
                self.week.push(date_string(day))
            }
        },
        allMapping() {
            let k_x_day = this.calcKxd = new Object();
            let kcal = this.dati.kcal;

            kcal.forEach(el => {
                let i = date_string(el.dateTime);
                if (typeof k_x_day[i] === 'undefined') {
                    k_x_day[i] = parseInt(el.kcal);
                } else {
                    k_x_day[i] += parseInt(el.kcal);
                }
            });
        },
        weekMapping() {
            let self = this;
            //Mappa contenente le kcal x day
            let k_x_day = this.calcKxd = new Object();
            let kcal = this.dati.kcal;


            kcal.forEach(el => {
                let d = date_string(el.dateTime)
                // Controllo se l'elemento è della settimana corrente
                if (self.week.indexOf(d) >= 0) {
                    if (typeof k_x_day[d] === 'undefined') {
                        k_x_day[d] = parseInt(el.kcal);
                    } else {
                        k_x_day[d] += parseInt(el.kcal);
                    }
                }
            });
        },
        dayMapping() {
            //Mappa contenente le kcal x day
            let k_x_day = this.calcKxd = new Object();
            let kcal = this.dati.kcal;

            kcal.forEach(el => {
                if (new Date(el.dateTime).getDate() == new Date().getDate()) {
                    let i = date_string(el.dateTime);
                    if (typeof k_x_day[i] === 'undefined') {
                        k_x_day[i] = parseInt(el.kcal);
                    } else {
                        k_x_day[i] += parseInt(el.kcal);
                    }
                }
            });
        },
        mapping() {
            this.destroyChart();

            this.weekMapping();

            this.dataChart();
        },
        dataChart() {
            // Creo la base dati per le Kcal x Giorno
            let chart = this.calcKxd;
            let dati = this.kxd.y = new Array();

            //let week = this.week.map(el=>date_string(el.dateTime))
            this.week.forEach(key=>{
                if(chart[key]) dati.unshift(chart[key]);
                else dati.unshift(0);
            })

            dati = dati.reverse()
            this.createChart(dati);
        },
        createChart(dati) {
            let self = this;

            var canvas = document.getElementById('kxd');
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            const data = {
                labels: self.weekNames,
                datasets: [{
                    axis: 'y',
                    label: 'calorie',
                    data: dati,
                    fill: false,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            };
            const config = {
                type: 'bar',
                data,
                options: {
                    responsive:true,
                    indexAxis: 'y',
                    plugins:{
                        legend:{
                            display:false
                        },
                        title: {
                            display: true,
                            text: self.week[0] + ' - ' + self.week[6]
                        }
                    }
                },
              };

            let chart = new Chart(document.getElementById('kxd'),config);

            /*
            let chart = new Chart(document.getElementById(id), {
                type: t,
                data: {
                    labels: xy.x,
                    datasets: [{
                        data: xy.y,
                        label: lab,
                        backgroundColor: palette(xy.x.length),
                        fill: false
                    }]
                },
                options: {
                    title: {
                        display: true,
                        text: name,
                        responsive: true,
                        responsiveAnimationDuration: 1000
                    },
                    scales: (t == 'horizontalBar') ? {
                        xAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    } : this
                }
            });*/
            this.chart = chart;
        },
        destroyChart() {
            if (this.chart)
                this.chart.destroy()
        }
    },
})