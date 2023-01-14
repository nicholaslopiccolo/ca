Vue.component('kcal-form', {
    props:['total'],
    template: `
    <div class="kcal-form">
        <h2 class="title">Form dei pasti</h2>
        <h2 class="subtitle">In questo spazio puoi aggiungere i pasti della tua giornata.
        <div class="tooltip">
            <span class="icon">
                <i class="fas fa-question-circle"></i>
            </span>
            <span class="tooltiptext">
                sito consigliato:<br><a href="https://www.calorie.it">calorie.it</a>
            </span>
        </div>
        </h2>
        <div class="field">
            <textarea class="textarea" id="desc" placeholder="Panino con mortadella e formaggio..."
                v-model="kcal.desc"></textarea>
        </div>
        <div id="calcolatore" class="field">
            <div @click="calcolatore = !calcolatore">
                <span class="icon">
                    <i class="fas fa-caret-right" v-if="!calcolatore"></i>
                    <i class="fas fa-caret-down" v-else></i>
                </span>
                <strong>Calcolatore delle calorie</strong>
            </div>

            <div v-if="calcolatore">
                <label class="label">Scatola</label>
                <div class="field has-addons">
                    <p class="control">
                        <input v-model.number="scatolaQ" placeholder="quantità (g, Kg, ml...)" class="input" type="number" pattern="([0-9]{1,3}).([0-9]{1,3})">
                    </p>
                    <p class="control">
                        <input v-model.number="scatolaK" placeholder="calorie (kcal)" class="input" type="number" pattern="([0-9]{1,3}).([0-9]{1,3})">
                    </p>
                </div>
                <label class="label">Porzione assunta</label>
                <div class="field has-addons">
                    <p class="control">
                        <input v-model.number="porzioneQ" placeholder="quantità (g, Kg, ml...)" class="input" type="number" pattern="([0-9]{1,3}).([0-9]{1,3})">
                    </p>
                    <p class="control">
                        <input v-model.number="porzioneK" placeholder="calorie (kcal)" class="input is-success" type="number" pattern="([0-9]{1,3}).([0-9]{1,3})" disabled>
                    </p>
                </div>
            </div>
        </div>
        <div class="field has-addons">
            <p class="control has-icons-left">
                <span class="select">
                    <select v-model="kcal.tipo">
                        <option>Snack</option>
                        <option>Colazione</option>
                        <option>Pranzo</option>
                        <option>Cena</option>
                    </select>
                    <span class="icon is-small">
                        <img :src="type_icon(kcal.tipo)" aria-hidden="true">
                    </span>
                </span>
            </p>
            <p class="control">
                <input class="input" type="number" pattern="([0-9]{1,3}).([0-9]{1,3})"
                    placeholder="Kcal..." v-model="kcal.kcal">
            </p>
            <p class="control">
                <button class="button is-warning" @click="addKcal()" :disabled="isKBD">
                    Salva
                </button>
            </p>
        </div>
        <h2 class="has-text-centered"><strong>Calorie consumate oggi: {{total}}</strong></h2>
    </div>
    `,
    data: () => {
        return {
            // Variabili per il calcolo delle kcal
            calcolatore:false,
            scatolaQ:null,
            scatolaK:null,
            porzioneQ:null,
            porzioneK:null,

            kcal: {
                dateTime: null,
                kcal: null,
                desc: null,
                tipo: 'Snack'
            }
        }
    },
    computed:{
        isKBD(){// is kcal button disabled ?
            return (!this.kcal.kcal || !this.kcal.desc)
        }
    },
    watch:{
        scatolaQ(val){
            this.scatolaQ=val
            this.calcolaKcal()
        },
        scatolaK(val){
            this.scatolaK=val
            this.calcolaKcal()
        },
        porzioneQ(val){
            this.porzioneQ=val
            this.calcolaKcal()
        },
    },
    methods: {
        calcolaKcal(){
            //console.log(this.scatolaQ, this.scatolaK, this.porzioneQ, this.scatolaK*this.porzioneQ/this.scatolaQ)
            if(this.scatolaQ && this.scatolaK && this.porzioneQ)
                this.porzioneK = this.scatolaK*this.porzioneQ/this.scatolaQ
        },
        type_icon(tipo) {
            let path = 'icons/';

            switch (tipo) {
                case 'Snack':
                    return `${path}snack.png`;
                case 'Colazione':
                    return `${path}colazione.png`;
                case 'Pranzo':
                    return `${path}pranzo.png`;
                case 'Cena':
                    return `${path}cena.png`;
            }
        },
        addKcal() {
            //set Date (For charts)
            this.kcal.dateTime = DateTime.now().toString();
            this.$emit('add-kcal',this.kcal);
            // Reset
            this.kcal = {
                dateTime: null,
                kcal: null,
                desc: null,
                tipo: 'Snack'
            };
        },
    },
})