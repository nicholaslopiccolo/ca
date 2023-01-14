Vue.config.devtools = true;

var app = new Vue({
    el: "#vue",
    components: {
        vuejsDatepicker
    },
    data: {
        forms:true,
        dati: {
            peso: [],
            kcal: [],
        },
        charts: {
            charts:[],
        },
        listPeso:null,
        listKcal:null,
    },
    created() {
        this.leggi();
    },
    computed: {
        getToken() {// get token from localstorage
            return window.localStorage.getItem('token');
        },
        isMobile(){
            console.log(window.mobileAndTabletcheck())
            return !window.mobileAndTabletcheck();
        },
        totalToday(){
            let results = this.dati.kcal.filter(el=>date_string(el.dateTime) == date_string(DateTime.now().toString()));
            return results.reduce((a,b)=>a+parseInt(b.kcal),0)
        }
    },
    methods: {
        updateDatiPeso(list){
            this.listPeso = list;
        },
        updateDatiKcal(list){
            this.listKcal = list;
        },
        addPeso(peso){
            this.dati.peso.push(peso);
            this.scrivi();
        },
        addKcal(kcal){
            this.dati.kcal.push(kcal);
            this.scrivi();
        },
        del(toUpdate) {

            var self = this;
            let index = toUpdate.i;

            switch (toUpdate.tipo) {
                case 'kcal':
                    self.dati.kcal.splice(index, 1);
                    break;
                case 'peso':
                    self.dati.peso.splice(index, 1);
                    break;
            }
            this.scrivi();
        },
        upd(toUpdate) {
            let self = this;
            let index = toUpdate.i;

            toUpdate.dato.dateTime = parse_date(toUpdate.dato.dateTime).toString();

            switch (toUpdate.tipo) {
                case 'kcal':
                    self.dati.kcal.splice(index, 1, toUpdate.dato);
                    break;
                case 'peso':
                    self.dati.peso.splice(index, 1, toUpdate.dato);
                    break;
            }
            this.scrivi();
            //toUpdate.dato = null;
        },
        scrivi() {
            console.log('scrivo...');
            let self = this;

            let data = {
                dati: self.dati,
                token: self.getToken
            }
            axios.post('/send_data', data).then((res) => {
                self.$emit('graphs-refresh');
            });
        },
        leggi() {
            console.log('Leggo...');
            let self = this;

            axios.post('/get_data', {
                token: self.getToken
            }).then((res) => {
                if (res.data != 'err') {
                    self.dati = res.data; // For first usage
                    setTimeout(()=>{
                        self.$emit('graphs-refresh');
                    },100);
                }
            });
        }
    }
});

/*      SAREBBE BELLO CAZZO
function takeKcal() {
    var param = {
        "strKeywords": "Cannolo+siciliano+-+uno+-",
        "suggest": "1",
        "x": "36",
        "y": "16"
    }
    axios.post('https://www.calorie.it/search', param)
    .then(res => console.log(res))
    .catch(e => console.log(e))
}
*/