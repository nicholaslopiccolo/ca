Vue.config.devtools = true;

var app = new Vue({
    el: "#sup",
    data: {
        error: {
            err: false,
            message: null,
        },
        post: {
            tipo: 'login',
            username: null,
            password: null,
            re_password: null

        }
    },
    computed: {
        checkPassword() {
            let self = this;
            return (self.post.password === self.post.re_password && (self.post.password!=null && self.post.password!=''));
        }
    },
    methods: {
        postForm() {
            let self = this;
            self.post.username = self.post.username.toLowerCase();
            if (self.checkPassword || self.post.tipo == "login"){
                axios.post('/login', self.post)
                .then(res => {
                    if (res.data.err == false) {
                        window.localStorage.setItem('token', res.data.token);
                        window.location = '/';
                    } else self.error = res.data;
                });
            }else{
                console.log('Condizione else');
            }
        },
        /*
                checkErrors() {
                    let self = this;
                    axios.get('/check_errors')
                        .then(res => {
                            res = res.data;
                            console.log(res);
                            if (typeof res.error !== 'undefined') {
                                if (res.error.err) {
                                    console.log('change')
                                    self.error = res.error.err;
                                    self.message = res.error.message
                                }
                            }

                        })
                        .catch(err => console.log(`Error: ${err}`));
                }*/
    }
})