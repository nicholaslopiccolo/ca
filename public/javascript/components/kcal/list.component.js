Vue.component('kcal-list',{
    props:['dati'],
    components: {
        vuejsDatepicker
    },
    template:`
    <div class="kcal-list">
        <h2 class="title">Lista delle kcal</h2>
        <h2 class="subtitle">Qui puoi trovare la lista di tutti i pasti annotati, la data ed il tipo di pasto.</h2>
        <table class="table is-fullwidth" style="margin: 0 auto">
            <thead>
                <tr class="is-fullwidth">
                    <th><abbr title="Tipo">Tipo</abbr></th>
                    <th><abbr title="Data">Date</abbr></th>
                    <th><abbr title="Kcal">Kcal</abbr></th>
                    <th><abbr title="Desc">Desc.</abbr></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(dato,i) in list" :key="i"
                    v-on:click="beforeUpd(dato,'kcal',dati.kcal.indexOf(dato))">
                    <td>
                        <span class="icon is-medium">
                            <img :src="type_icon(dato.tipo)" aria-hidden="true">
                        </span>
                    </td>
                    <td>{{ date_string(dato.dateTime) }}</td>
                    <td>{{ dato.kcal }}</td>
                    <td>{{ trim_desc(dato.desc,15) }}</td>
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

        
        <!--MODAL Kcal-->
        <div class="modal is-active" style="height:30hv" v-if="toUpdate.dato != null">
            <div class="modal-background"></div>
            <div class="modal-card">
                <header class="modal-card-head">
                    <p class="modal-card-title">Modifica Kcal</p>
                    <button class="delete" aria-label="close" @click="toUpdate.dato = null"></button>
                </header>
                <section class="modal-card-body">
                    <div class="content">
                        <div>
                            <label class="label">Kcal</label>
                            <div class="field has-addons">
                                <p class="control">
                                    <input class="input" type="number" pattern="([0-9]{1,3}).([0-9]{1,3})"
                                        placeholder="Kcal..." v-model="toUpdate.dato.kcal">
                                </p>
                                <p class="control has-icons-left">
                                    <span class="select">
                                        <select v-model="toUpdate.dato.tipo">
                                            <option>Snack</option>
                                            <option>Colazione</option>
                                            <option>Pranzo</option>
                                            <option>Cena</option>
                                        </select>
                                        <span class="icon is-small">
                                            <img :src="type_icon(toUpdate.dato.tipo)" aria-hidden="true">
                                        </span>
                                    </span>
                                </p>
                            </div>
                            <div clas="field">
                                <label class="label">Description</label>
                                <textarea class="textarea" v-model="toUpdate.dato.desc"></textarea>
                            </div>
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
            let kcal = this.dati.kcal.slice().reverse()
            return kcal.slice((this.page - 1) * this.page_size, this.page * this.page_size);
        },
        maxPage(){
            return Math.ceil(this.dati.kcal.length/this.page_size)
        }
    },
    methods: {
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
                kcal: dato.kcal
            });
            this.toUpdate.tipo = tipo;
            this.toUpdate.i = i;
        },
        beforeDelete(dato, tipo) {
            console.log('beforeDelete kcal')
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
        },
        trim_desc(str, d) {
            try{
                return (str.length > d) ? str.substring(0, d) + '...' : str;
            }catch(e){
                return '';
            }
        },  
    },
})