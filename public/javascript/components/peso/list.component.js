Vue.component('peso-list',{
    props:['dati'],
    components: {
        vuejsDatepicker
    },
    template:`
    <div class="peso-list">
        <h2 class="title">Lista dei pesi</h2>
        <h2 class="subtitle">Qui puoi trovare la lista dei pesi e il giorno in cui ne hai preso nota.</h2>
        
        <table class="table is-fullwidth" style="margin: 1rem auto">
            <thead>
                <tr class="is-fullwidth">
                    <th><abbr title="Data">Date</abbr></th>
                    <th><abbr title="Peso">Peso</abbr></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dato,i) in list" :key="i"
                    @click="beforeUpd(dato,'peso',dati.peso.indexOf(dato))">
                    <td>{{ date_string(dato.dateTime) }}</td>
                    <td>{{ dato.peso }}</td>
                </tr>
            </tbody>
        </table>
        <nav class="pagination is-right" role="navigation" aria-label="pagination" v-if="maxPage>1">
            <button class="pagination-previous" @click="prevPage()" :disabled="page==1">Previous</button>
            <ul class="pagination-list">
                <li><strong>{{page}}/{{maxPage}}</strong></li>
            </ul>
            <button class="pagination-next" @click="nextPage()" :disabled="page==maxPage">Next page</button>
        </nav>

        <!--MODAL peso-->
        <div class="modal is-active" style="height:30hv" v-if="toUpdate.dato != null">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modifica Peso</p>
                    <button class="delete" aria-label="close" @click="toUpdate.dato = null"></button>
                </header>
                <section class="modal-card-body">
                    <div class="content">
                        <div class="field">
                            <label class="label">Peso</label>
                            <input type="number" class="input" v-model="toUpdate.dato.peso">
                        </div>
                        <div class="field">
                            <label class="label">Date</label>
                            <datetime locale="it" v-model="toUpdate.dato.dateTime"/>
                        </div>
                    </div>
                </section>
                <footer class="modal-card-foot">
                    <button class="button is-success" @click="update()">Save changes</button>
                    <button class="button is-danger" @click="beforeDelete(toUpdate.dato,toUpdate.tipo)">Delete</button>
                </footer>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            // Updating
            toUpdate: {
                dato: null,
                i: null,
                tipo: null
            },
            // Pagination
            page:1,
            page_size:5
        }
    },
    computed:{
        list(){
            // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
            let pesi = this.dati.peso.slice().reverse()
            return pesi.slice((this.page - 1) * this.page_size, this.page * this.page_size);
        },
        maxPage(){
            return Math.ceil(this.dati.peso.length/this.page_size)
        }
    },
    methods: {
        prevPage(){
            this.page -= 1;
        },
        nextPage(){
            this.page += 1;
        },
        beforeUpd(dato, tipo, i) {
            //this.toUpdate.dato = dato;
            if (tipo == 'kcal') this.toUpdate.dato = new Object({
                dateTime: dato.dateTime,
                kcal: dato.kcal,
                desc: dato.desc,
                tipo: dato.tipo
            });
            else this.toUpdate.dato = new Object({
                dateTime: dato.dateTime,
                peso: dato.peso
            });
            this.toUpdate.tipo = tipo;
            this.toUpdate.i = i;
        },
        beforeDelete(dato, tipo) {
            console.log('beforeDelete peso')
            this.toUpdate.tipo = tipo;
            this.toUpdate.dato = dato;

            if (confirm(buildString(dato))) {
                this.$emit('del',this.toUpdate);
                this.toUpdate.dato = null;
            }
        },
        update(){
            this.$emit('update',this.toUpdate);
            this.toUpdate.dato = null
        }
    },
})