Vue.component('peso-pxd',{
    props:['dati'],
    template:`
    <div class="has-text-centered">
        <h4 class="title">Grafico del peso</h4>
        <h4 class="subtitle">Con questo grafico potrai farti un'idea del variamento del tuo peso corporeo.</h4>

        <div class="field has-addons has-addons-centered">
            <p class="control">
                <button class="button is-small" :class="{'is-link':!type}" @click="type=0">
                mese
                </button>
            </p>
            <p class="control">
                <button class="button is-small" :class="{'is-link':type}" @click="type=1">
                anno
                </button>
            </p>
        </div>

        <canvas id="pxd" style="padding:1rem;text-align: center;"></canvas>

        <div class="field has-addons has-addons-centered" style="margin-bottom:1rem">
            <p class="control">
                <button class="button is-rounded" @click="prev()">
                    <span class="icon is-small left-arrow"></span>&nbsp;{{prevName}}
                </button>
            </p>
            <p class="control">
                <button class="button is-rounded" @click="next()">
                {{nextName}}&nbsp;<span class="icon is-small right-arrow"></span>
                </button>
            </p>
        </div>
    </div>
        `,
    data() {
        return {
            //dati iniziali grafo Peso x giorno
            calcPxd: {},
            pxd: {
                x: null,
                y: null
            },
            chart:null,

            type:0,// 0 = month, 1 = year

            dayIndex: DateTime.now(),
            weekNames: luxon.Info.weekdays(),
            week: [null, null, null, null, null, null, null],
            monthNames: luxon.Info.months()
        }
    },
    created(){
        this.$parent.$on('graphs-refresh',this.mapping)
    },
    watch: {
        dayIndex(val) {
            this.dayIndex = val;
            //this.getWeek()
            this.mapping()
        },
    },
    computed:{
        prevName(){
            let d = this.dayIndex

            if(this.type){
                return d.plus({'years':-1}).year
            }else{
                return this.monthNames[d.plus({'months':-1}).month-1]
            }
        },
        nextName(){
            let d = this.dayIndex

            if(this.type){
                return d.plus({'years':+1}).year
            }else{
                return this.monthNames[d.plus({'months':+1}).month-1]
            }
        }
    },
    methods: {
        prev(){
            let d = this.dayIndex
            
            if(this.type){
                this.dayIndex = d.plus({'years':-1})
            }else{
                this.dayIndex = d.plus({'months':-1})
            }
        },
        next(){
            let d = this.dayIndex
            
            if(this.type){
                this.dayIndex = d.plus({'years':+1})
            }else{
                this.dayIndex = d.plus({'months':+1})
            }
        },
        monthMapping() {
            let self = this;

            //Mappa contenente il Peso
            var p_x_day = this.calcPxd = new Object();
            var peso = this.dati.peso;

            peso.forEach(el => {
                let i = date_string(el.dateTime);
                let day = parse_date(el.dateTime);

                // Controllo se l'elemento è del mese selezionato
                if (self.dayIndex.month === day.month && self.dayIndex.year === day.year) {
                    if (typeof p_x_day[i] === 'undefined') {
                        p_x_day[i] = parseFloat(el.peso);
                    } else { //controllo nel caso in cui ci siano due pesate nello stesso giorno
                        //oarr[i] += parseInt(el.peso);>>za
                    }
                }
            });
        },
        yearMapping() {
            let self = this;

            //Mappa contenente il Peso
            var p_x_day = this.calcPxd = new Object();
            var peso = this.dati.peso;

            peso.forEach(el => {
                let i = date_string(el.dateTime);
                let day = parse_date(el.dateTime);
                
                // Controllo se l'elemento è dell'anno selezionato
                if (self.dayIndex.year === day.year) {
                    if (typeof p_x_day[i] === 'undefined') {
                        p_x_day[i] = parseFloat(el.peso);
                    } else { //controllo nel caso in cui ci siano due pesate nello stesso giorno
                        //oarr[i] += parseInt(el.peso);
                    }
                }
            });
        },
        mapping(){
            this.destroyChart();

            if(self.type) this.yearMapping()
            else this.monthMapping()

            this.dataChart();
        },
        dataChart(){

            // Creo la base dati per il Peso x Giorno
            let chart = this.calcPxd;
            let x = this.pxd.x = new Array();
            let y = this.pxd.y = new Array();

            for (let key in chart) {
                x.push(key);
                y.push(chart[key]);
            }

            this.createChart(this.pxd);
        },
        createChart(dati) {
            let self = this;

            var canvas = document.getElementById('pxd');
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);

            const data = {
                labels: dati.x,
                datasets: [{
                    label: 'calorie',
                    data: dati.y,
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
                type: 'line',
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
                            text: self.type ? self.dayIndex.year : self.monthNames[self.dayIndex.month-1] + " " + self.dayIndex.year
                        }
                    }
                },
            };
            let chart = new Chart(document.getElementById('pxd'),config);
            this.chart = chart;
        },
        destroyChart(){
            if(this.chart)
                this.chart.destroy()
        }
    },
})