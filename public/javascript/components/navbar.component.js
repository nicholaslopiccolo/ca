Vue.component('nav-bar', {
    template: `
    <section class="hero is-info" id="nav">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">
                        Controllo Alimentare
                    </h1>
                    <h2 class="subtitle" v-if=configs.username>
                        {{ configs.username.capitalize() }} - {{ date_string(DateTime.now()) }}
                    </h2>
                </div>
            </div>
            <div class="hero-foot">
                <nav class="navbar">
                    <div class="container">
                        <div class="navbar-brand">
                            <span class="navbar-burger burger" @click="toggleActive('burger');toggleActive('navbar-menu');">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                        <div class="navbar-menu">
                            <div class="navbar-end">
                                <a id="home" class="navbar-item" href="/" rel="dofollow">
                                    Home
                                </a>
                                <a id="logout" class="navbar-item" href="/Logout" rel="dofollow">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    `,
    data() {
        return {
            paths: {
                Home: {
                    'link': '/',
                    'subLinks': []
                },
                Login: {
                    'link': '/Login',
                    'subLinks': []
                },
                Logout: {
                    'link': '/Logout',
                    'subLinks': []
                }
            },
            configs:{}
        }
    },
    created(){
        let self = this;

        axios.get('/configurations').then(res=>{
            let config = res.data;

            self.configs = config;
        })
    },
    mounted() {
        this.setActive();
    },
    methods: {
        setActive: function () {
            var self = this;
            var url_string = window.location.href;
            var url = new URL(url_string);
            var result = url.pathname.replace('/', '').toLowerCase();

            if(result == '')self.active('home');
            else self.active(result);
        },
        active: function (val) {
            try{
            let el = document.getElementById(val);
            el.className += el.className ? ' is-active' : '';
            }catch(e){
                console.log(`${val}: non è una voce del menù`);
            }
        },
        toggleActive(val){
            let el = document.getElementsByClassName(val)[0];
            el.classList.toggle('is-active');
        }
    },
});