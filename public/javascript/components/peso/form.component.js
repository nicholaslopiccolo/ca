Vue.component('peso-form', {
    template: `
    <div class="peso-form">
        <h2 class="title">Form dei pesi</h2>
        <h2 class="subtitle">In questo spazio puoi aggiungere il tuo peso corporeo per tenerne traccia.</h2>
        <div class="field has-addons">
            <div class="control">
                <input class="input" type="number" pattern="([0-9]{1,3}).([0-9]{1,3})"
                    placeholder="Inserisci il peso..." v-model="peso.peso">
            </div>
            <div class="control">
                <button class="button is-info" @click="addPeso()" :disabled="!peso.peso">
                    Salva
                </button>
            </div>
        </div>
    </div>
    `,
    data: () => {
        return {
            peso:{
                dateTime: null,
                peso: null
            }
        }
    },
    methods: {
        addPeso() {
            //set Date (For charts and not)
            this.peso.dateTime = DateTime.now().toString();
            // send event back to the father
            this.$emit('add-peso',this.peso);
            // Reset
            this.peso = {
                dateTime: null,
                peso: null
            };
        },
    },
})