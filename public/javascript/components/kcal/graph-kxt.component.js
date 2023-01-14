Vue.component('kcal-kxt',{
    props:['dati'],
    template:`
    <div class="has-text-centered">
        <h4 class="title">Grafico Kcal per il tipo di pasto</h4>
        <h4 class="subtitle">Il grafico nasce per aiutarti a capire in quali tipologie di pasti assumi un quantitativo errato di calorie.</h4>
        <h4>Il consiglio è quello di dimuire il quantitativo di kcal dovuti agli snack mangiando cibi più sani e meno calorici. <br> Ovviamente il quantitativo di calorie per tipo di pasto dipende dalla dieta che si sta seguendo.</h4>
        
        <div style="padding:1rem;height:400px">
            <canvas id="kxt" v-show="!emptyChart"></canvas>
            <div class="title has-text-grey" v-show="emptyChart" style="margin-top:40%">NON CI SONO DATI PER {{monthNames[dayIndex.month-1].toUpperCase()}} {{dayIndex.year}}</div>
        </div>

        <div class="field has-addons has-addons-centered" style="margin-bottom:1rem">
            <p class="control">
                <button class="button is-rounded" @click="prevMonth()">
                    <span class="icon is-small left-arrow"></span>&nbsp;{{prevMonthName}}
                </button>
            </p>
            <p class="control">
                <button class="button is-rounded" @click="nextMonth()">
                {{nextMonthName}}&nbsp;<span class="icon is-small right-arrow"></span>
                </button>
            </p>
        </div>
    </div>
        `,
    data() {
        return {
            //dati iniziali grafo Kcal x Tipologia di pasto
            calcKxt: {},
            kxt: {
                x: null,
                y: null
            },
            chart:null,
            emptyChart:false,

            dayIndex: DateTime.now(),
            weekNames: luxon.Info.weekdays(),
            week: [null, null, null, null, null, null, null],
            monthNames: luxon.Info.months()
        }
    },
    created(){
        this.$parent.$on('graphs-refresh',this.mapping)
        this.getWeek()
    },
    watch: {
        dayIndex(val) {
            this.dayIndex = val;
            //this.getWeek()
            this.mapping()
        },
    },
    computed:{
        prevMonthName(){
            let d = this.dayIndex
            return this.monthNames[d.plus({'months':-1}).month-1]
        },
        nextMonthName(){
            let d = this.dayIndex
            return this.monthNames[d.plus({'months':+1}).month-1]
        }
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
        prevMonth() {
            let d = this.dayIndex
            this.dayIndex = d.plus({'months':-1})
        },
        nextMonth() {
            let d = this.dayIndex
            this.dayIndex = d.plus({'months':+1})
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
        weekMapping() {
            let self = this;

            //Mappa contenente il kcal x pasto
            let supp = new Object();
            let k_x_tipo = this.calcKxt = new Object();

            this.dati.kcal.forEach(el => {
                let d = date_string(el.dateTime);
                // Controllo se l'elemento è della settimana selezionata
                if (self.week.indexOf(d) >= 0) {
                    let j = el.tipo;
                    let k = parseInt(el.kcal);
                    if (typeof supp[d] === 'undefined') {
                        supp[d] = new Object();
                        supp[d][j] = k;
                    } else {
                        supp[d][j] = (typeof supp[d][j] === 'undefined') ? k : supp[d][j] + k;
                    }
                }
            });

            for (let el in supp) {
                for (let i in supp[el]) {
                    let k = parseInt(supp[el][i])
                    if (typeof k_x_tipo[i] === 'undefined') {
                        k_x_tipo[i] = new Object({
                            tot: k,
                            i: 1
                        });
                    } else {
                        k_x_tipo[i].tot += k;
                        k_x_tipo[i].i++;
                    }
                }
            }
            Object.keys(k_x_tipo).map(key => k_x_tipo[key] = (k_x_tipo[key].tot / k_x_tipo[key].i).toFixed(1));
        },
        monthMapping() {
            let self = this;

            //Mappa contenente il kcal x pasto
            let supp = new Object();
            let k_x_tipo = this.calcKxt = new Object();

            this.dati.kcal.forEach(el => {
                let day = parse_date(el.dateTime);
                let d = day.toString();
                // Controllo se l'elemento è del mese selezionato
                if (self.dayIndex.month === day.month) {
                    let j = el.tipo;
                    let k = parseInt(el.kcal);
                    if (typeof supp[d] === 'undefined') {
                        supp[d] = new Object();
                        supp[d][j] = k;
                    } else {
                        supp[d][j] = (typeof supp[d][j] === 'undefined') ? k : supp[d][j] + k;
                    }
                }
            });

            for (let el in supp) {
                for (let i in supp[el]) {
                    let k = parseInt(supp[el][i])
                    if (typeof k_x_tipo[i] === 'undefined') {
                        k_x_tipo[i] = new Object({
                            tot: k,
                            i: 1
                        });
                    } else {
                        k_x_tipo[i].tot += k;
                        k_x_tipo[i].i++;
                    }
                }
            }
            Object.keys(k_x_tipo).map(key => k_x_tipo[key] = (k_x_tipo[key].tot / k_x_tipo[key].i).toFixed(1));
        },
        mapping(){
            this.destroyChart();

            this.monthMapping()

            this.dataChart();
        },
        dataChart(){
            // Creo la base dati per le Kcal x Pasto
            let chart = this.calcKxt;

            this.kxt.x = Object.values(chart)
            this.kxt.y = Object.keys(chart)

            this.createChart(this.kxt);
        },
        createChart(dati) {
            let self = this;

            if(dati.x.length > 0){
                var canvas = document.getElementById('kxt');
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);

                self.emptyChart = false;

                const data = {
                    labels: dati.y,
                    datasets: [{
                        label: 'calorie',
                        data: dati.x,
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
                    type: 'doughnut',
                    data:data,
                    options: {
                        responsive:true,
                        indexAxis: 'y',
                        plugins:{
                            legend:{
                                display:false
                            },
                            title: {
                                display: true,
                                text: self.monthNames[self.dayIndex.month-1] + " " + self.dayIndex.year
                            }
                        }
                    },
                };
                let chart = new Chart(document.getElementById('kxt'),config);
                this.chart = chart;
            } else {
                self.emptyChart = true;
            }
        },
        destroyChart(){
            if(this.chart)
                this.chart.destroy()
        }
    },
})